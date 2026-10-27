#!/usr/bin/env python3
"""Build the monthly State of Slop pages from their data files.

    python3 .github/scripts/state_of_slop/build.py            # every month in state-of-slop/data/
    python3 .github/scripts/state_of_slop/build.py 2026-10    # one month

Each month is two files in state-of-slop/data/:
  YYYY-MM.json       the numbers, as shares and flags only (no raw post counts)
  YYYY-MM.copy.json  the words: headline, dek, a few paragraphs per section, and the FAQ

It writes state-of-slop/<slug>.html, the archive at state-of-slop/index.html, and the
share image state-of-slop/<slug>.png (1200x630), and adds each report to sitemap.xml. The image needs `pip install cairosvg`
and the Archivo and JetBrains Mono fonts installed locally; without them the PNG step
is skipped and says so. The header, footer and analytics tags are copied from
how-it-works.html, so the report pages stay in step with the rest of the site.

Percentages show rounded to whole numbers, and scale is given in tokens read,
never in post counts. Sections render only when their data is there, so a later month can add sources
(email, images, video, attachments, other networks) by listing them in "sources" and,
when there's more than one, filling "by_source". Nothing else has to change.
"""
from decimal import Decimal, ROUND_HALF_UP
import html
import json
import math
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
DIR = os.path.join(ROOT, "state-of-slop")
DATA = os.path.join(DIR, "data")
SITE = "https://slopmop.lol"

e = html.escape
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


def date_long(iso):
    y, m, d = (int(x) for x in iso[:10].split("-"))
    return "%d %s %d" % (d, MONTHS[m - 1], y)


def date_short(iso):
    y, m, d = (int(x) for x in iso[:10].split("-"))
    return "%d %s" % (d, MONTHS[m - 1][:3].lower())


def range_long(w):
    """'27 September to 27 October 2026', with the year once when both ends share it."""
    a, b = date_long(w["from"]), date_long(w["to"])
    return "%s to %s" % (a[:-5] if a[-4:] == b[-4:] else a, b)


def range_short(w):
    a, b = date_short(w["from"]), date_short(w["to"])
    return "%s to %s %s" % (a, b, w["to"][:4]) if w["from"][:4] == w["to"][:4] else "%s %s to %s %s" % (a, w["from"][:4], b, w["to"][:4])


def r0(x):
    """Round half up to a whole number: reports show whole percentages."""
    return int(Decimal(str(x)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))


def pct(x):
    return "%d%%" % r0(x)


def one_in(x):
    """19.5 -> 'One in 5'-style ratio for a share of posts."""
    return "1 in %d" % r0(100 / x)


def tokens_short(n):
    return "%dM" % r0(n / 1e6) if n >= 1e6 else "{:,}".format(n)


def num(n):
    return "{:,}".format(n)


def para(text):
    out = e(text)
    out = re.sub(r"([\w.+-]+@slopmop\.lol)", r'<a href="mailto:\1">\1</a>', out)
    return "<p>%s</p>" % out


def paras(copy, key):
    return "\n".join(para(t) for t in copy.get("sections", {}).get(key, []))


# ---------- shared chrome, lifted from how-it-works.html ----------

def chrome():
    src = open(os.path.join(ROOT, "how-it-works.html"), encoding="utf-8").read()
    head = src[src.index("<head>") + len("<head>"):src.index("<title>")]
    header = src[src.index('<a class="skip"'):src.index("<main")]
    footer = src[src.index('<footer class="footer"'):src.index("</footer>") + len("</footer>")]
    header = header.replace(' aria-current="page"', "")
    return head, rel(header), rel(footer)


def rel(fragment):
    """Point the shared header and footer back up one folder."""
    def fix(m):
        attr, url = m.group(1), m.group(2)
        if re.match(r"^(https?:|mailto:|#|/|data:)", url):
            return m.group(0)
        return '%s="../%s"' % (attr, url)
    return re.sub(r'\b(href|src)="([^"]*)"', fix, fragment)


# ---------- charts (static HTML, coloured by design-system tokens) ----------

TIP_IDS = iter(range(1, 1000))


def token_tip(n):
    """A small (i) button with a dismissible panel saying what a token is."""
    i = next(TIP_IDS)
    words = n * 0.75
    novels = words / 90000
    return ('<span class="sos-info"><button type="button" class="sos-info-btn" aria-label="What is a token?" aria-expanded="false" aria-controls="sos-tip-%d">i</button>'
            '<span class="sos-tip" id="sos-tip-%d" role="tooltip"><b>What\'s a token?</b> A token is a small chunk of text, about three quarters of an English word. '
            'Language tools count text in tokens. %s tokens is roughly %s million words, or about %s novels.'
            '<button type="button" class="sos-tip-x" aria-label="Close">&times;</button></span></span>') % (
        i, i, tokens_short(n), r0(words / 1e6), "{:,}".format(int(round(novels, -2)) or r0(novels)))


def verdict_bar(v, label):
    segs = [("fine", "Looks fine", v["looks_fine"]), ("possibly", "Possibly slop", v["possibly"]), ("likely", "Likely slop", v["likely"])]
    if v.get("not_sure"):
        segs.append(("unsure", "Not sure", v["not_sure"]))
    bar = "".join('<i class="sos-seg sos-%s" style="width:%s%%"></i>' % (k, x) for k, _, x in segs if x > 0)
    legend = "".join('<span><i class="sos-key sos-%s"></i><b>%s</b> %s</span>' % (k, pct(x), n) for k, n, x in segs)
    return '<div class="sos-verdicts" role="img" aria-label="%s"><div class="sos-stack">%s</div><div class="sos-legend">%s</div></div>' % (
        e(label + ": " + ", ".join("%s %s" % (pct(x), n) for _, n, x in segs)), bar, legend)


def sensitivity_table(verdicts, current):
    rows = []
    for k, name in (("mild", "Mild"), ("moderate", "Moderate"), ("aggressive", "Aggressive")):
        if k not in verdicts:
            continue
        v = verdicts[k]
        cur = ' class="sos-current"' if k == current else ""
        rows.append("<tr%s><th scope=\"row\">%s%s</th><td><b>%s</b></td><td>%s</td></tr>" % (
            cur, name, " <span class=\"mono\">default</span>" if k == "moderate" else "", pct(v["possibly"] + v["likely"]), pct(v["likely"])))
    return ('<div class="sos-table-wrap"><table class="sos-table"><thead><tr><th scope="col">Sensitivity</th><th scope="col">Slop</th>'
            '<th scope="col">Likely slop</th></tr></thead><tbody>%s</tbody></table></div>') % "".join(rows)


def callout(co):
    head = "".join("<th scope=\"col\">%s</th>" % e(x) for x in co["cols"])
    rows = "".join("<tr><th scope=\"row\">%s</th>%s</tr>" % (e(r[0]), "".join(
        '<td><span class="sos-pill sos-pill-%s">%s</span></td>' % ("shown" if x == "Shown" else "folded", e(x)) for x in r[1:])) for r in co["rows"])
    return ('<aside class="sos-callout" aria-labelledby="sos-callout-h"><h2 id="sos-callout-h">%s</h2><p class="sos-callout-lead">%s</p>'
            '<div class="sos-table-wrap"><table class="sos-matrix"><thead><tr><td></td>%s</tr></thead><tbody>%s</tbody></table></div>'
            '<p class="sos-callout-note">%s <a href="#ai-note">How AI fits in</a></p></aside>') % (
        e(co["title"]), e(co["lead"]), head, rows, e(co["note"]))


def tell_rows(tells):
    top = max(t["strongest_percent"] for t in tells) or 1
    rows = []
    for i, t in enumerate(tells):
        lead = " sos-lead" if i < 2 else ""
        rows.append('<li class="sos-row%s"><span class="sos-row-l">%s</span><span class="sos-row-bar"><i style="width:%.1f%%"></i></span>'
                    '<span class="sos-row-v mono">%s</span><span class="sos-row-s mono">%s</span></li>' % (
                        lead, e(t["name"]), 100 * t["strongest_percent"] / top, pct(t["strongest_percent"]), pct(t["strong_in_slop_percent"])))
    return ('<div class="sos-rows-head mono"><span>strongest sign in</span><span>strong in slop</span></div>'
            '<ol class="sos-rows" aria-label="Share of posts where each tell was the strongest sign">%s</ol>') % "".join(rows)


def example_pair(ex):
    return ('<div class="sos-ex"><figure class="sos-ex-card sos-ex-slop"><figcaption class="mono">reads as slop</figcaption><blockquote>%s</blockquote></figure>'
            '<figure class="sos-ex-card sos-ex-fine"><figcaption class="mono">worth your time</figcaption><blockquote>%s</blockquote></figure></div>') % (
        e(ex["slop"]), e(ex["fine"]))


def column_chart(points, label_every, title, fmt_label):
    top = max(p["slop_percent"] for p in points if not p.get("low_sample"))
    cols = []
    for i, p in enumerate(points):
        faint = " sos-faint" if p.get("low_sample") else ""
        lab = fmt_label(p["label"]) if i % label_every == 0 else ""
        cols.append('<div class="sos-col%s" title="%s: %s slop"><i style="height:%.1f%%"><s style="height:%.1f%%"></s></i><span class="mono">%s</span></div>' % (
            faint, e(fmt_label(p["label"])), pct(p["slop_percent"]),
            100 * p["slop_percent"] / top, 100 * p["likely_percent"] / max(p["slop_percent"], 0.01), e(lab)))
    return '<div class="sos-cols" role="img" aria-label="%s">%s</div>' % (e(title), "".join(cols))


def dow_rows(days):
    top = max(d["slop_percent"] for d in days)
    peak = max(days, key=lambda d: d["slop_percent"])["label"]
    low = min(days, key=lambda d: d["slop_percent"])["label"]
    rows = []
    for d in days:
        cls = " sos-lead" if d["label"] == peak else (" sos-low" if d["label"] == low else "")
        rows.append('<li class="sos-row sos-row-dow%s"><span class="sos-row-l">%s</span><span class="sos-row-bar"><i style="width:%.1f%%"></i></span><span class="sos-row-v mono">%s</span></li>' % (
            cls, d["label"], 100 * d["slop_percent"] / top, pct(d["slop_percent"])))
    return '<ol class="sos-rows" aria-label="Share of what people scrolled past that was slop, by day of the week">%s</ol>' % "".join(rows)


def figure(t):
    path = os.path.join(ROOT, "assets", "figures", t["id"] + ".html")
    if not os.path.exists(path):
        return ""
    return ('<figure class="tell-fig"><iframe src="../assets/figures/%s.html" loading="lazy" scrolling="no" '
            'title="%s: interactive figure. Drag across it, or use the arrow keys, to go from clean to sloppy."></iframe></figure>') % (t["id"], e(t["name"]))


# ---------- the report page ----------

def report(d, c, head, header, footer, months):
    slug = d["slug"]
    url = "%s/state-of-slop/%s" % (SITE, slug)
    h = d["headline"]
    tot = d["totals"]
    w = d["window"]
    named = [s for s in d["sources"] if s.get("in_copy")]
    others = [s for s in d["sources"] if not s.get("in_copy")]
    src_label = " and ".join(s["label"] for s in named)
    title = d["title"]
    img = "%s/state-of-slop/%s.png" % (SITE, slug)
    tells = d["tells"]
    ex = c.get("examples", {})
    sens = d.get("sensitivity", "moderate")
    tm = d.get("timing") or {}

    sections = []
    toc = []

    def add(id_, name, body):
        toc.append('<a href="#%s">%s</a>' % (id_, e(name)))
        sections.append('<section id="%s">\n<h2>%s</h2>\n%s\n</section>' % (id_, e(name), body))

    add("overview", "One post in five",
        paras(c, "overview") + verdict_bar(d["verdicts"][sens], "Verdicts per post at %s sensitivity" % sens) +
        '<div class="sos-stats">%s</div>' % "".join(
            '<div class="sos-stat"><span class="mono">%s</span><b>%s</b></div>' % (a, b) for a, b in (
                ("average score", "%d<small> / 100</small>" % r0(d["score"]["average"])),
                ("median score", "%d<small> / 100</small>" % r0(d["score"]["median"])),
                ("scored 70 or more", pct(d["score"]["share_scoring_70_plus"]))))
        + "<h3>The same posts at each sensitivity</h3>" + sensitivity_table(d["verdicts"], sens))

    if c.get("callout"):
        toc.append('<a href="#judges-writing">%s</a>' % e(c["callout"]["title"]))
        sections.append('<div id="judges-writing">%s</div>' % callout(c["callout"]))

    body = paras(c, "tells") + tell_rows(tells) + (
        '<p class="sos-note">“Strongest sign in” is the share of all posts where that sign scored highest. '
        '“Strong in slop” is the share of slop posts where it scored %s or more.</p>' % d["thresholds"]["strong_tell"])
    shown = [t for t in tells if t["id"] in ex]
    if shown:
        body += "<h3>What they look like</h3>"
        if c.get("sections", {}).get("examples_intro"):
            body += para(c["sections"]["examples_intro"])
        for i, t in enumerate(shown):
            body += '<h4>%s <span class="mono">%s of posts</span></h4><p>%s</p>%s%s' % (
                e(t["name"]), pct(t["strongest_percent"]), e(t["description"]), example_pair(ex[t["id"]]), figure(t) if i < 2 else "")
    body += '<p><a href="../how-it-works.html#tells">All nine signs, with examples</a></p>'
    add("tells", "The signs that showed up most", body)

    if tm:
        body = paras(c, "timing")
        if tm.get("by_day_of_week"):
            body += "<h3>By day of the week</h3>" + dow_rows(tm["by_day_of_week"])
        if tm.get("by_hour"):
            body += "<h3>By hour (%s)</h3>" % tm["tz"] + column_chart(tm["by_hour"], 3, "Share of what people scrolled past that was slop, by hour " + tm["tz"], hour12)
            body += ('<p class="sos-note"><i class="sos-key sos-possibly"></i> slop share &nbsp; <i class="sos-key sos-likely"></i> the likely-slop part of it. '
                     'Faded columns had too little reading to call.</p>')
        add("when", "When slop peaks", body)

    r = d.get("readers")
    if r:
        add("readers", "Calibrated, and you get the last word",
            paras(c, "readers") +
            '<div class="sos-stats sos-stats-1"><div class="sos-stat"><span class="mono">voters who agreed with the verdict</span><b>%s</b></div></div>' % pct(r["agree_with_verdict_percent"]))

    bs = d.get("by_source")
    if bs:
        rows = "".join("<tr><th scope=\"row\">%s</th><td>%s</td><td>%s</td></tr>" % (
            e(s["label"]), pct(s["slop_percent"]), pct(s["likely_percent"])) for s in bs)
        add("sources", "By source", '<div class="sos-table-wrap"><table class="sos-table"><thead><tr><th scope="col">Source</th>'
            '<th scope="col">Slop</th><th scope="col">Likely slop</th></tr></thead><tbody>%s</tbody></table></div>' % rows)

    src = "<li><strong>Source.</strong> %s posts.%s</li>" % (e(src_label), (
        " About %s came from early testing on other sites. That's too little to report on separately, so it's included in the totals." % pct(sum(s["share_percent"] for s in others))
        if others else ""))
    method = (
        '<ul>'
        "<li><strong>Window.</strong> %s, %d days. %s</li>"
        '<li><strong>Text read.</strong> %s tokens of post text. %s</li>%s'
        "<li><strong>Sensitivity.</strong> %s, the default, unless a chart says otherwise. Slop means Possibly or Likely slop.</li>"
        "<li><strong>Calibrated decisions.</strong> Each sign gets a strength from 0 to 1 and counts as strong at %s or more. Verdicts are probabilistic, and any reader can override one in their own feed.</li>"
        "<li><strong>Content only.</strong> Slop Mop scores the writing in a post. It never scores the person who wrote it or the person reading it.</li>"
        "<li><strong>Rounding.</strong> Percentages are rounded to whole numbers, so some sets don't add up to exactly 100.</li>"
        "<li><strong>Left out.</strong> About %s of posts, seen at the very end of the window, weren't scored in time for this report.</li>"
        "</ul>") % (
        range_long(w), w["days"], e(w["basis"]), tokens_short(tot["tokens_read"]), token_tip(tot["tokens_read"]), src,
        sens.capitalize(), d["thresholds"]["strong_tell"], pct(tot["not_yet_scored_percent"]))
    ai = ""
    if c.get("sections", {}).get("ai"):
        ai = '<h3 id="ai-note">How AI fits in</h3>' + paras(c, "ai") + (
            '<p class="sos-note">AI-likely means an AI-likelihood of %s or more on a 0 to 1 scale.</p>' % d["ai"]["threshold"])
    add("method", "How this was measured", method + ai + "<h3>Where the mop misses</h3>" + paras(c, "misses"))

    faq = [(g["group"], q, a) for g in c.get("faq", []) for q, a in g["items"]]
    if faq:
        body = ""
        for g in c["faq"]:
            body += "<h3>%s</h3>" % e(g["group"]) + '<div class="faq">%s</div>' % "".join(
                "<details><summary>%s</summary><div class=\"a\"><p>%s</p></div></details>" % (e(q), e(a)) for q, a in g["items"])
        add("faq", "Questions and answers", body)

    past = [m for m in months if m["slug"] != slug]
    more = ""
    if past:
        more = '<h3>Earlier reports</h3><ul>%s</ul>' % "".join('<li><a href="%s">%s</a></li>' % (m["slug"], e(m["period_label"])) for m in past)
    add("next", "Next month",
        "<p>A new State of Slop comes out every month. Get it by email with the form below, or bookmark the <a href=\"./\">archive</a>.</p>" + more)

    t0 = tells[0]
    tiles = [("slop", one_in(h["slop_percent"]), "posts that reached the feed were slop", ""),
             ("top sign", e(t0["name"]), "the strongest sign in %s of posts" % pct(t0["strongest_percent"]), "")]
    if tm.get("by_day_of_week"):
        days = [x for x in tm["by_day_of_week"] if not x.get("low_sample")]
        hi, lo = max(days, key=lambda x: x["slop_percent"]), min(days, key=lambda x: x["slop_percent"])
        tiles.append(("worst day", hi["label"], "%s slop, against %s on %s" % (pct(hi["slop_percent"]), pct(lo["slop_percent"]), lo["label"]), ""))
    elif tm.get("by_hour"):
        hours = [x for x in tm["by_hour"] if not x.get("low_sample")]
        hi, lo = max(hours, key=lambda x: x["slop_percent"]), min(hours, key=lambda x: x["slop_percent"])
        tiles.append(("worst hour", "%s %s" % (hour12(hi["label"]), e(tm["tz"])), "%s slop, against %s at %s" % (pct(hi["slop_percent"]), pct(lo["slop_percent"]), hour12(lo["label"])), ""))
    tiles.append(("text read", "%s tokens" % tokens_short(tot["tokens_read"]), "of %s posts" % e(src_label), token_tip(tot["tokens_read"])))
    glance = "".join('<div class="glance-tile"><span class="mono">%s</span><b>%s%s</b><span>%s</span></div>' % (a, b, tip, cc) for a, b, cc, tip in tiles)

    modified = d.get("modified", d["published"])
    org = {"@type": "Organization", "@id": SITE + "/#org", "name": "Artimovo LLC", "url": SITE + "/",
           "logo": {"@type": "ImageObject", "url": SITE + "/icon-512.png", "width": 512, "height": 512}, "brand": {"@type": "Brand", "name": "Slop Mop"}}
    tom = {"@type": "Person", "@id": SITE + "/#tom", "name": "Tom Frazier", "url": "https://tomfrazier.com", "sameAs": ["https://linkedin.com/in/tomfrazier"]}
    graph = [
        {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": "%s: %s" % (title, c["headline"]), "description": c["description"],
         "inLanguage": "en", "isPartOf": {"@id": SITE + "/#website"}, "primaryImageOfPage": {"@id": img + "#image"},
         "breadcrumb": {"@id": url + "#breadcrumb"}, "datePublished": d["published"], "dateModified": modified},
        {"@type": "Article", "@id": url + "#article", "url": url, "mainEntityOfPage": {"@id": url + "#webpage"},
         "headline": "%s: %s" % (title, c["headline"]), "description": c["description"], "articleSection": "State of Slop",
         "image": {"@type": "ImageObject", "@id": img + "#image", "url": img, "width": 1200, "height": 630, "caption": c["hero_alt"]},
         "datePublished": d["published"], "dateModified": modified, "inLanguage": "en", "isAccessibleForFree": True,
         "temporalCoverage": "%s/%s" % (w["from"][:10], w["to"][:10]),
         "keywords": ["slop", "State of Slop", "Slop Mop", "bad writing"] + [s["label"] for s in named] + [t["name"] for t in tells[:3]],
         "about": [{"@type": "Thing", "name": "Slop", "description": "Writing that takes the reader's attention and gives little back, whoever or whatever wrote it."},
                   {"@id": SITE + "/#app"}],
         "author": tom, "publisher": org, "isPartOf": {"@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "Slop Mop"}},
        {"@type": "SoftwareApplication", "@id": SITE + "/#app", "name": "Slop Mop", "applicationCategory": "BrowserApplication",
         "operatingSystem": "Chrome, Chromium browsers", "url": SITE + "/",
         "description": "A browser extension that reads your feed ahead of you and folds away low-value writing, with its reasoning shown. A bad-writing detector, not an AI detector."},
        {"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Slop Mop", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "State of Slop", "item": SITE + "/state-of-slop/"},
            {"@type": "ListItem", "position": 3, "name": title, "item": url}]}]
    if faq:
        graph.append({"@type": "FAQPage", "@id": url + "#faq", "url": url + "#faq", "isPartOf": {"@id": url + "#webpage"}, "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for _, q, a in faq]})
    ld = {"@context": "https://schema.org", "@graph": graph}

    meta = (
        "<title>{t} — Slop Mop</title>\n"
        '<meta name="description" content="{desc}">\n'
        '<link rel="canonical" href="{url}">\n'
        '<meta name="robots" content="index, follow, max-image-preview:large">\n'
        '<meta property="og:type" content="article">\n'
        '<meta property="og:site_name" content="Slop Mop">\n'
        '<meta property="og:url" content="{url}">\n'
        '<meta property="og:title" content="{t}">\n'
        '<meta property="og:description" content="{desc}">\n'
        '<meta property="og:image" content="{img}">\n'
        '<meta property="og:image:width" content="1200">\n'
        '<meta property="og:image:height" content="630">\n'
        '<meta property="og:image:type" content="image/png">\n'
        '<meta property="og:image:alt" content="{alt}">\n'
        '<meta property="og:locale" content="en_US">\n'
        '<meta property="article:published_time" content="{pub}">\n'
        '<meta property="article:modified_time" content="{mod}">\n'
        '<meta property="article:author" content="https://tomfrazier.com">\n'
        '<meta property="article:section" content="State of Slop">\n'
        '{tags}'
        '<meta name="twitter:card" content="summary_large_image">\n'
        '<meta name="twitter:title" content="{t}">\n'
        '<meta name="twitter:description" content="{desc}">\n'
        '<meta name="twitter:image" content="{img}">\n'
        '<meta name="twitter:image:alt" content="{alt}">\n'
        '<meta name="author" content="Tom Frazier">\n'
        '<link rel="alternate" type="text/markdown" href="../ask-ai.md" title="Slop Mop in brief, for AI assistants">\n'
        '<link rel="icon" href="../favicon.svg" type="image/svg+xml">\n'
        '<link rel="icon" href="../favicon-32.png" sizes="32x32" type="image/png">\n'
        '<link rel="apple-touch-icon" href="../apple-touch-icon.png">\n'
        '<link rel="manifest" href="../site.webmanifest">\n'
        '<meta name="theme-color" content="#16181A">\n'
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link rel="stylesheet" href="../_ds/slopmop/styles.css">\n'
        '<link rel="stylesheet" href="../assets/site.css">\n'
        '<link rel="stylesheet" href="../assets/state-of-slop.css">\n'
        '<script type="application/ld+json">\n{ld}\n</script>\n').format(
        t=e(title), desc=e(c["description"]), url=url, img=img, alt=e(c["hero_alt"]), pub=d["published"], mod=modified, ld=json.dumps(ld, indent=1, ensure_ascii=False),
        tags="".join('<meta property="article:tag" content="%s">\n' % e(k) for k in ["Slop"] + [s["label"] for s in named]))

    return """<!DOCTYPE html>
<html lang="en">
<head>{head}{meta}</head>
<body>
{header}<main id="main">
<section class="page-head ph-dark sos-head" data-theme="dark">
  <div class="wrap ph-grid">
    <div class="ph-copy">
      <span class="eyebrow">state of slop · {period} · {sources}</span>
      <h1 class="h-1">{headline}</h1>
      <p class="lede">{dek}</p>
      <p class="sos-byline mono">covers {window}</p>
    </div>
    <div class="ph-visual sos-hero"><img src="{slug}.png" width="1200" height="630" alt="{alt}"></div>
  </div>
  <div class="wrap"><div class="glance">{glance}</div></div>
</section>
<div class="page-body">
  <div class="wrap page-grid">
    <nav class="toc" aria-label="On this page">
      <b>on this page</b>
      {toc}
    </nav>
    <div class="prose sos">
{sections}
    </div>
  </div>
</div>
</main>
{footer}
<script src="../assets/site.js"></script>
<script src="../assets/state-of-slop.js"></script>
</body>
</html>
""".format(head=head, meta=meta, header=header, footer=footer, period=e(range_short(w)), sources=e(src_label.lower()),
           headline=e(c["headline"]), dek=e(c["dek"]), window=range_long(w),
           slug=slug, alt=e(c["hero_alt"]), glance=glance, toc="\n      ".join(toc), sections="\n".join(sections))


def archive(months, head, header, footer):
    items = "".join(
        '<li class="sos-arch"><a href="{slug}"><img src="{slug}.png" width="1200" height="630" alt="" loading="lazy"><span class="mono">{period}</span><b>{headline}</b><span>{dek}</span></a></li>'.format(
            slug=m["slug"], period=e(range_short(m["data"]["window"])), headline=e(m["headline"]), dek=e(m["dek"])) for m in months)
    desc = "Every month, Slop Mop publishes what it found in the feeds it read: how much was slop, the signs that showed up most, and when slop peaked."
    url = SITE + "/state-of-slop/"
    img = "%s/state-of-slop/%s.png" % (SITE, months[0]["slug"])
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "@id": url + "#webpage", "url": url, "name": "State of Slop", "description": desc, "inLanguage": "en",
         "isPartOf": {"@id": SITE + "/#website"}, "breadcrumb": {"@id": url + "#breadcrumb"},
         "mainEntity": {"@type": "ItemList", "itemListElement": [
             {"@type": "ListItem", "position": i + 1, "url": "%s%s" % (url, m["slug"]), "name": "%s: %s" % (m["data"]["title"], m["headline"])}
             for i, m in enumerate(months)]}},
        {"@type": "BreadcrumbList", "@id": url + "#breadcrumb", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Slop Mop", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "State of Slop", "item": url}]}]}
    meta = ('<title>State of Slop — Slop Mop</title>\n<meta name="description" content="{d}">\n<link rel="canonical" href="{u}">\n'
            '<meta name="robots" content="index, follow, max-image-preview:large">\n'
            '<meta property="og:type" content="website">\n<meta property="og:site_name" content="Slop Mop">\n<meta property="og:url" content="{u}">\n'
            '<meta property="og:title" content="State of Slop — Slop Mop">\n<meta property="og:description" content="{d}">\n'
            '<meta property="og:image" content="{i}">\n<meta property="og:image:type" content="image/png">\n'
            '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:locale" content="en_US">\n'
            '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="State of Slop — Slop Mop">\n'
            '<meta name="twitter:description" content="{d}">\n<meta name="twitter:image" content="{i}">\n'
            '<link rel="icon" href="../favicon.svg" type="image/svg+xml">\n<link rel="icon" href="../favicon-32.png" sizes="32x32" type="image/png">\n'
            '<link rel="apple-touch-icon" href="../apple-touch-icon.png">\n<meta name="theme-color" content="#16181A">\n'
            '<link rel="stylesheet" href="../_ds/slopmop/styles.css">\n<link rel="stylesheet" href="../assets/site.css">\n<link rel="stylesheet" href="../assets/state-of-slop.css">\n'
            '<script type="application/ld+json">\n{ld}\n</script>\n').format(d=e(desc), u=url, i=img, ld=json.dumps(ld, indent=1, ensure_ascii=False))
    return """<!DOCTYPE html>
<html lang="en">
<head>{head}{meta}</head>
<body>
{header}<main id="main">
<section class="page-head ph-dark" data-theme="dark"><div class="wrap">
  <span class="eyebrow">state of slop</span>
  <h1 class="h-1">State of Slop</h1>
  <p class="lede">{desc}</p>
</div></section>
<div class="page-body"><div class="wrap"><ol class="sos-archive">{items}</ol></div></div>
</main>
{footer}
<script src="../assets/site.js"></script>
</body>
</html>
""".format(head=head, meta=meta, header=header, footer=footer, desc=e(desc), items=items)


# ---------- the share image ----------

MOP = ('<g transform="translate({x} {y}) scale({k})"><rect x="10.6" y="2" width="2.8" height="12" rx="1.4" fill="{c}"/>'
       '<path d="M5.2 13.6h13.6l-1.6 8.2H6.8z" fill="{c}"/><path d="M8.6 16.6v4.6M12 16.6v4.6M15.4 16.6v4.6" stroke="{bg}" stroke-width="1.15" stroke-linecap="round"/></g>')


def hour12(label):
    hr = int(label)
    return "%d%s" % (hr % 12 or 12, "am" if hr < 12 else "pm")


def hero_svg(d, c):
    """The share image: what a reader runs into, not the numbers behind it."""
    w = d["window"]
    sh = c.get("share", {})
    named = " and ".join(s["label"] for s in d["sources"] if s.get("in_copy"))
    kicker = "state of slop · %s · %s" % (range_short(w), named.lower())
    foot = "%s tokens read · slopmop.lol/state-of-slop" % tokens_short(d["totals"]["tokens_read"])
    out = ['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">',
           '<rect width="1200" height="630" fill="#F7F8F9"/>', '<rect width="1200" height="8" fill="#F5B400"/>',
           '<text x="64" y="72" font-family="JetBrains Mono" font-size="19" fill="#6E757D">%s</text>' % e(kicker)]

    # left: one post in N, as a row of N posts with the slop one folded
    n = r0(100 / d["headline"]["slop_percent"])
    out.append('<text x="60" y="206" font-family="Archivo" font-weight="700" font-size="150" letter-spacing="-3" fill="#16181A">%s</text>' % e(sh.get("big", one_in(d["headline"]["slop_percent"]))))
    for i, line in enumerate(sh.get("lines", [])):
        out.append('<text x="64" y="%d" font-family="Archivo" font-weight="600" font-size="40" letter-spacing="-0.4" fill="#16181A">%s</text>' % (262 + 48 * i, e(line)))
    cw, gap, y0, ch = 100, 14, 352, 116
    for i in range(n):
        x = 64 + i * (cw + gap)
        slop = i == n - 2
        if slop:
            out.append('<rect x="%d" y="%d" width="%d" height="%d" rx="10" fill="#FDF3D3" stroke="#F5B400" stroke-width="2"/>' % (x, y0, cw, ch))
            out.append('<rect x="%d" y="%d" width="56" height="22" rx="11" fill="#F5B400"/>' % (x + 14, y0 + 16))
            out.append('<text x="%d" y="%d" text-anchor="middle" font-family="JetBrains Mono" font-weight="500" font-size="13" fill="#16181A">slop</text>' % (x + 42, y0 + 32))
            out.append('<text x="%d" y="%d" font-family="Archivo" font-weight="500" font-size="14" fill="#7A5A00">folded</text>' % (x + 14, y0 + 66))
            out.append('<path d="M%d %d h%d" stroke="#E9C766" stroke-width="6" stroke-linecap="round"/>' % (x + 14, y0 + 88, 58))
        else:
            out.append('<rect x="%d" y="%d" width="%d" height="%d" rx="10" fill="#FFFFFF" stroke="#E6E9EC" stroke-width="1.5"/>' % (x, y0, cw, ch))
            out.append('<circle cx="%d" cy="%d" r="9" fill="#E6E9EC"/>' % (x + 23, y0 + 26))
            out.append('<path d="M%d %d h34" stroke="#E6E9EC" stroke-width="6" stroke-linecap="round"/>' % (x + 40, y0 + 26))
            for j, ln in enumerate((72, 62, 44)):
                out.append('<path d="M%d %d h%d" stroke="#D5DADF" stroke-width="6" stroke-linecap="round"/>' % (x + 14, y0 + 56 + 17 * j, ln))
    if sh.get("footnote"):
        out.append('<text x="64" y="512" font-family="JetBrains Mono" font-size="15" fill="#6E757D">* %s</text>' % e(sh["footnote"]))

    # right: one clock, red hand on the worst hour, blue on the best
    tm = d.get("timing") or {}
    hours = [x for x in tm.get("by_hour", []) if not x.get("low_sample")]
    if hours:
        hi, lo = max(hours, key=lambda x: x["slop_percent"]), min(hours, key=lambda x: x["slop_percent"])
        cx, cy, rad = 920, 268, 118
        out.append('<rect x="716" y="104" width="420" height="420" rx="16" fill="#FFFFFF" stroke="#E6E9EC"/>')
        out.append('<text x="744" y="140" font-family="JetBrains Mono" font-size="16" fill="#6E757D">when slop peaks · %s</text>' % e(tm["tz"].lower()))
        out.append('<circle cx="%d" cy="%d" r="%d" fill="#F7F8F9" stroke="#16181A" stroke-width="4"/>' % (cx, cy, rad))
        for k in range(12):
            ang = math.radians(k * 30)
            r1 = rad - (16 if k % 3 == 0 else 10)
            out.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="#16181A" stroke-width="%s" stroke-linecap="round"/>' % (
                cx + r1 * math.sin(ang), cy - r1 * math.cos(ang), cx + (rad - 5) * math.sin(ang), cy - (rad - 5) * math.cos(ang), 4 if k % 3 == 0 else 2))
        for k, lab in ((0, "12"), (3, "3"), (6, "6"), (9, "9")):
            ang = math.radians(k * 30)
            out.append('<text x="%.1f" y="%.1f" text-anchor="middle" font-family="Archivo" font-weight="600" font-size="20" fill="#3B4045">%s</text>' % (
                cx + (rad - 36) * math.sin(ang), cy - (rad - 36) * math.cos(ang) + 7, lab))

        def hand(label, color, length):
            hr = int(label) % 12
            ang = math.radians(hr * 30)
            return '<line x1="%d" y1="%d" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="10" stroke-linecap="round"/>' % (
                cx, cy, cx + length * math.sin(ang), cy - length * math.cos(ang), color)
        out.append(hand(lo["label"], "#2F6FBF", 62))
        out.append(hand(hi["label"], "#D93025", 62))
        out.append('<circle cx="%d" cy="%d" r="9" fill="#16181A"/>' % (cx, cy))
        out.append('<rect x="744" y="418" width="14" height="14" rx="3" fill="#D93025"/>')
        out.append('<text x="768" y="431" font-family="Archivo" font-size="21" fill="#16181A"><tspan font-weight="700">Worst hour</tspan> %s %s</text>' % (hour12(hi["label"]), e(tm["tz"])))
        out.append('<rect x="744" y="452" width="14" height="14" rx="3" fill="#2F6FBF"/>')
        out.append('<text x="768" y="465" font-family="Archivo" font-size="21" fill="#16181A"><tspan font-weight="700">Best hour</tspan> %s %s</text>' % (hour12(lo["label"]), e(tm["tz"])))
        days = [x for x in tm.get("by_day_of_week", []) if not x.get("low_sample")]
        if days:
            dh = max(days, key=lambda x: x["slop_percent"])
            out.append('<text x="744" y="499" font-family="Archivo" font-size="21" fill="#565C63">%ss are the sloppiest day.</text>' % e(dh["label"]))
        elif sh.get("clock_note"):
            out.append('<text x="744" y="499" font-family="Archivo" font-size="21" fill="#565C63">%s</text>' % e(sh["clock_note"]))

    out.append('<rect y="550" width="1200" height="80" fill="#16181A"/>')
    out.append(MOP.format(x=58, y=567, k=1.9, c="#F5B400", bg="#16181A"))
    out.append('<text x="112" y="600" font-family="Archivo" font-weight="600" font-size="28" fill="#FFFFFF">Slop Mop<tspan font-family="JetBrains Mono" font-weight="400" font-size="20" fill="#B2B8BE"> .lol</tspan></text>')
    out.append('<text x="1136" y="598" text-anchor="end" font-family="JetBrains Mono" font-size="19" fill="#B2B8BE">%s</text>' % e(foot))
    out.append("</svg>")
    return "\n".join(out)


def write_png(svg, out):
    try:
        import cairosvg
    except ImportError:
        print("  skipped %s: pip install cairosvg to make the share image" % os.path.relpath(out, ROOT))
        return
    cairosvg.svg2png(bytestring=svg.encode("utf-8"), write_to=out, output_width=1200, output_height=630)
    print("  wrote", os.path.relpath(out, ROOT))


# ---------- main ----------

def load_months():
    months = []
    for fn in sorted(os.listdir(DATA), reverse=True):
        m = re.match(r"^(\d{4}-\d{2})\.json$", fn)
        if not m:
            continue
        d = json.load(open(os.path.join(DATA, fn), encoding="utf-8"))
        cp = os.path.join(DATA, m.group(1) + ".copy.json")
        c = json.load(open(cp, encoding="utf-8")) if os.path.exists(cp) else {}
        d["month"] = m.group(1)
        months.append({"data": d, "copy": c, "slug": d["slug"], "period_label": d["period_label"], "headline": c.get("headline", d["title"]), "dek": c.get("dek", "")})
    return months


def update_sitemap(months):
    """Add or refresh each report, and the archive, in sitemap.xml, with the share image for image search."""
    path = os.path.join(ROOT, "sitemap.xml")
    xml = open(path, encoding="utf-8").read()
    if "xmlns:image=" not in xml:
        xml = xml.replace('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">', 1)
    latest = max(m["data"].get("modified", m["data"]["published"]) for m in months)
    entries = [("%s/state-of-slop/" % SITE, latest, "monthly", "0.7", "%s/state-of-slop/%s.png" % (SITE, months[0]["slug"]))]
    entries += [("%s/state-of-slop/%s" % (SITE, m["slug"]), m["data"].get("modified", m["data"]["published"]), "yearly", "0.8",
                 "%s/state-of-slop/%s.png" % (SITE, m["slug"])) for m in reversed(months)]
    for loc, mod, freq, prio, image in entries:
        line = ("  <url><loc>%s</loc><lastmod>%s</lastmod><changefreq>%s</changefreq><priority>%s</priority>"
                "<image:image><image:loc>%s</image:loc></image:image></url>") % (loc, mod, freq, prio, image)
        pat = re.compile(r"  <url><loc>%s</loc>.*?</url>" % re.escape(loc))
        xml = pat.sub(lambda _: line, xml, 1) if pat.search(xml) else xml.replace("</urlset>", line + "\n</urlset>", 1)
    open(path, "w", encoding="utf-8").write(xml)
    print("  updated sitemap.xml")


def main(argv):
    months = load_months()
    if not months:
        sys.exit("No data files in state-of-slop/data/")
    head, header, footer = chrome()
    only = argv[1] if len(argv) > 1 else None
    for m in months:
        d, c = m["data"], m["copy"]
        if only and d["month"] != only:
            continue
        out = os.path.join(DIR, d["slug"] + ".html")
        open(out, "w", encoding="utf-8").write(report(d, c, head, header, footer, months))
        print("  wrote", os.path.relpath(out, ROOT))
        svg = hero_svg(d, c)
        open(os.path.join(DIR, d["slug"] + ".svg"), "w", encoding="utf-8").write(svg)
        write_png(svg, os.path.join(DIR, d["slug"] + ".png"))
    out = os.path.join(DIR, "index.html")
    open(out, "w", encoding="utf-8").write(archive(months, head, header, footer))
    print("  wrote", os.path.relpath(out, ROOT))
    update_sitemap(months)


if __name__ == "__main__":
    main(sys.argv)
