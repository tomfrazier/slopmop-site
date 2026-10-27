#!/usr/bin/env python3
"""Build the monthly State of Slop pages from their data files.

    python3 .github/scripts/state_of_slop/build.py            # every month in state-of-slop/data/
    python3 .github/scripts/state_of_slop/build.py 2026-10    # one month

Each month is two files in state-of-slop/data/:
  YYYY-MM.json       the numbers (published as-is, linked from the report as "Download the data")
  YYYY-MM.copy.json  the words: headline, dek and a few paragraphs per section

It writes state-of-slop/<slug>.html, the archive at state-of-slop/index.html, and the
share image state-of-slop/<slug>.png (1200x630). The image needs `pip install cairosvg`
and the Archivo and JetBrains Mono fonts installed locally; without them the PNG step
is skipped and says so. The header, footer and analytics tags are copied from
how-it-works.html, so the report pages stay in step with the rest of the site.

Sections render only when their data is there, so a later month can add sources
(email, images, video, attachments, other networks) by listing them in "sources" and,
when there's more than one, filling "by_source". Nothing else has to change.
"""
import html
import json
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


def pct(x, nd=1):
    return ("%." + str(nd) + "f%%") % x


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

def share(x):
    """A verdict is {"posts", "percent"} or a bare percent."""
    return x["percent"] if isinstance(x, dict) else x


def verdict_bar(v, label):
    v = {k: share(x) for k, x in v.items()}
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
        v = {kk: share(x) for kk, x in verdicts[k].items()}
        slop = round(v["possibly"] + v["likely"], 1)
        cur = ' class="sos-current"' if k == current else ""
        rows.append("<tr%s><th scope=\"row\">%s%s</th><td>%s</td><td>%s</td><td>%s</td><td><b>%s</b></td></tr>" % (
            cur, name, " <span class=\"mono\">default</span>" if k == "moderate" else "", pct(v["looks_fine"]), pct(v["possibly"]), pct(v["likely"]), pct(slop)))
    return ('<div class="sos-table-wrap"><table class="sos-table"><thead><tr><th scope="col">Sensitivity</th><th scope="col">Looks fine</th>'
            '<th scope="col">Possibly slop</th><th scope="col">Likely slop</th><th scope="col">All slop</th></tr></thead><tbody>%s</tbody></table></div>') % "".join(rows)


def gap_grid(d):
    c = d["slop_gap"]["cells"]
    cell = lambda k, cls, title, note: '<div class="sos-cell %s"><b>%s</b><span class="sos-cell-t">%s</span><span class="mono">%s posts</span><span class="sos-cell-n">%s</span></div>' % (
        cls, pct(c[k]["percent"]), title, num(c[k]["posts"]), note)
    return ('<div class="sos-gap" role="img" aria-label="How slop and AI-likelihood overlap, per post">'
            '<span class="sos-axis sos-axis-x mono">reads as AI-likely →</span><span class="sos-axis sos-axis-y mono">reads as slop →</span>'
            '<div class="sos-gap-grid">%s%s%s%s</div></div>') % (
        cell("slop_not_ai_likely", "sos-c-slop", "Slop, not AI-likely", "slop with no help from a model, as far as the writing shows"),
        cell("slop_and_ai_likely", "sos-c-both", "Slop and AI-likely", "both questions said yes"),
        cell("neither", "sos-c-none", "Neither", "fine, and not AI-likely"),
        cell("ai_likely_not_slop", "sos-c-ai", "AI-likely, not slop", "a model may have helped, and the post was fine"))


def tell_rows(tells):
    top = max(t["strongest_percent"] for t in tells) or 1
    rows = []
    for i, t in enumerate(tells):
        lead = " sos-lead" if i < 2 else ""
        rows.append('<li class="sos-row%s"><span class="sos-row-l">%s</span><span class="sos-row-bar"><i style="width:%.1f%%"></i></span>'
                    '<span class="sos-row-v mono">%s</span><span class="sos-row-s mono">%s</span></li>' % (
                        lead, e(t["name"]), 100 * t["strongest_percent"] / top, pct(t["strongest_percent"]), pct(t["strong_in_slop_percent"], 0)))
    return ('<div class="sos-rows-head mono"><span>strongest sign in</span><span>strong in slop</span></div>'
            '<ol class="sos-rows" aria-label="Share of posts where each tell was the strongest sign">%s</ol>') % "".join(rows)


def column_chart(points, min_checks, label_every, title, fmt_label):
    top = max(p["slop_percent"] for p in points if p["checks"] >= min_checks)
    cols = []
    for i, p in enumerate(points):
        faint = " sos-faint" if p["checks"] < min_checks else ""
        lab = fmt_label(p["label"]) if i % label_every == 0 else ""
        cols.append('<div class="sos-col%s" title="%s: %s slop, %s checks"><i style="height:%.1f%%"><s style="height:%.1f%%"></s></i><span class="mono">%s</span></div>' % (
            faint, e(fmt_label(p["label"])), pct(p["slop_percent"]), num(p["checks"]),
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
    return '<ol class="sos-rows" aria-label="Share of checks that landed on slop, by day of the week">%s</ol>' % "".join(rows)


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
    t0, t1 = tells[0], tells[1]
    sens = d.get("sensitivity", "moderate")

    sections = []
    toc = []

    def add(id_, name, body, kicker=None):
        toc.append('<a href="#%s">%s</a>' % (id_, e(name)))
        k = '<p class="mono">%s</p>\n' % e(kicker) if kicker else ""
        sections.append('<section id="%s">\n%s<h2>%s</h2>\n%s\n</section>' % (id_, k, e(name), body))

    add("overview", "One post in five",
        paras(c, "overview") + verdict_bar(d["verdicts"][sens], "Verdicts per post at %s sensitivity" % sens) +
        '<div class="sos-stats">%s</div>' % "".join(
            '<div class="sos-stat"><span class="mono">%s</span><b>%s</b></div>' % (a, b) for a, b in (
                ("average score", "%s<small> / 100</small>" % d["score"]["average"]),
                ("median score", "%s<small> / 100</small>" % d["score"]["median"]),
                ("scored 70 or more", pct(d["score"]["share_scoring_70_plus"]))))
        + "<h3>The same posts at each sensitivity</h3>" + sensitivity_table(d["verdicts"], sens))

    add("slop-gap", "The Slop Gap",
        paras(c, "gap") +
        '<div class="sos-gapnums"><div><b>%s</b><span>read as AI-likely</span></div><div><b>%s</b><span>read as slop</span></div><div class="sos-gapnum-gap"><b>%s<small> pts</small></b><span>the Slop Gap</span></div></div>' % (
            pct(h["ai_likely_percent"]), pct(h["slop_percent"]), h["slop_gap_points"]) +
        gap_grid(d) +
        '<p class="sos-note">Each square is a share of all %s posts. AI-likely means an AI-likelihood of %s or more.</p>' % (num(tot["items_scored"]), d["thresholds"]["ai_likely"]))

    add("tells", "The signs that showed up most",
        paras(c, "tells") + tell_rows(tells) +
        '<p class="sos-note">“Strongest sign in” is the share of all posts where that tell scored highest. “Strong in slop” is the share of slop posts where it scored %s or more.</p>' % d["thresholds"]["strong_tell"] +
        "<h3>%s</h3><p>%s</p>%s<h3>%s</h3><p>%s</p>%s" % (e(t0["name"]), e(t0["description"]), figure(t0), e(t1["name"]), e(t1["description"]), figure(t1)) +
        '<p><a href="../how-it-works.html#tells">All nine tells, with examples</a></p>')

    tm = d.get("timing")
    if tm:
        body = paras(c, "timing")
        if tm.get("by_day_of_week"):
            body += "<h3>By day of the week</h3>" + dow_rows(tm["by_day_of_week"])
        if tm.get("by_hour"):
            body += "<h3>By hour (%s)</h3>" % tm["tz"] + column_chart(tm["by_hour"], tm["min_checks"], 3, "Share of checks that landed on slop, by hour " + tm["tz"], lambda s: s + ":00")
        if tm.get("by_date"):
            body += "<h3>Day by day</h3>" + column_chart(tm["by_date"], tm["min_checks"], 7, "Share of checks that landed on slop, by day", date_short)
        body += ('<p class="sos-note"><i class="sos-key sos-possibly"></i> slop share &nbsp; <i class="sos-key sos-likely"></i> the likely-slop part of it. '
                 'Faded columns had fewer than %d checks.</p>') % tm["min_checks"]
        add("when", "When slop peaks", body)

    r = d.get("readers")
    if r:
        add("readers", "What readers said",
            paras(c, "readers") +
            '<div class="sos-stats">%s</div>' % "".join(
                '<div class="sos-stat"><span class="mono">%s</span><b>%s</b></div>' % (a, b) for a, b in (
                    ("agreed with the verdict", pct(r["agree_with_verdict_percent"])),
                    ("agreed with AI-likelihood", pct(r["agree_with_ai_likelihood_percent"])),
                    ("votes cast", "%s<small> from %s people</small>" % (r["votes"], r["voters"])))))

    bs = d.get("by_source")
    if bs:
        rows = "".join("<tr><th scope=\"row\">%s</th><td>%s</td><td>%s</td><td>%s</td></tr>" % (
            e(s["label"]), num(s["items"]), pct(s["slop_percent"]), pct(s["ai_likely_percent"])) for s in bs)
        add("sources", "By source", '<div class="sos-table-wrap"><table class="sos-table"><thead><tr><th scope="col">Source</th><th scope="col">Items</th>'
            '<th scope="col">Slop</th><th scope="col">AI-likely</th></tr></thead><tbody>%s</tbody></table></div>' % rows)

    other_note = ""
    if others:
        n = sum(s["items"] for s in others)
        other_note = "<li>%s came from %s. Another %s (%s) came from early testing on other sites. They're too few to report on separately and are included in the totals.</li>" % (
            num(sum(s["items"] for s in named)), e(src_label), num(n), pct(100 * n / tot["items_scored"]))
    method = (
        "<ul>"
        "<li><strong>Window.</strong> %s to %s, %d days. %s</li>"
        "<li><strong>Posts.</strong> %s posts, from %s checks by %s active installs. Slop Mop read %s tokens of text to score them.</li>%s"
        "<li><strong>Sensitivity.</strong> %s, the default, unless a chart says otherwise. Slop means Possibly or Likely slop.</li>"
        "<li><strong>AI-likely.</strong> An AI-likelihood of %s or more. Slop Mop asks this separately, and it never flags a post on its own.</li>"
        "<li><strong>Strong tell.</strong> A tell scoring %s or more on its 0 to 1 scale.</li>"
        "<li><strong>Left out.</strong> %s posts seen at the end of the window hadn't been scored into the analytics yet, about %s.</li>"
        "</ul>") % (
        date_long(w["from"]), date_long(w["to"]), w["days"], e(w["basis"]),
        num(tot["items_scored"]), num(tot["checks"]), num(tot["active_installs_30d"]), "{:,.0f} million".format(tot["tokens_read"] / 1e6), other_note,
        sens.capitalize(), d["thresholds"]["ai_likely"], d["thresholds"]["strong_tell"],
        num(tot["items_seen_not_yet_scored"]), pct(100 * tot["items_seen_not_yet_scored"] / (tot["items_scored"] + tot["items_seen_not_yet_scored"]), 1))
    add("method", "How this was measured",
        method + "<h3>Where the mop misses</h3>" + paras(c, "misses") +
        '<p><a href="data/%s.json" download>Download the data</a> <span class="mono">json</span></p>' % d["month"])

    past = [m for m in months if m["slug"] != slug]
    more = ""
    if past:
        more = '<h3>Earlier reports</h3><ul>%s</ul>' % "".join('<li><a href="%s">%s</a></li>' % (m["slug"], e(m["period_label"])) for m in past)
    add("next", "Next month",
        "<p>A new State of Slop comes out every month. Get it by email with the form below, or bookmark the <a href=\"./\">archive</a>.</p>" + more)

    glance = "".join('<div class="glance-tile"><span class="mono">%s</span><b>%s</b><span>%s</span></div>' % (a, b, cc) for a, b, cc in (
        ("slop", pct(h["slop_percent"]), "of posts read as Possibly or Likely slop"),
        ("ai-likely", pct(h["ai_likely_percent"]), "of posts read as AI-likely"),
        ("slop gap", "%s points" % h["slop_gap_points"], "%s of AI-likely posts were fine" % pct(d["slop_gap"]["share_of_ai_likely_not_slop"])),
        ("top sign", e(h["top_tell"]), "the strongest sign in %s of posts" % pct(t0["strongest_percent"]))))

    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "Article", "@id": url + "#article", "url": url, "headline": "%s: %s" % (title, c["headline"]), "description": c["description"],
             "image": img, "datePublished": d["published"], "dateModified": d["published"], "inLanguage": "en",
             "author": {"@type": "Person", "name": "Tom Frazier", "url": "https://tomfrazier.com"},
             "publisher": {"@type": "Organization", "name": "Artimovo LLC", "url": SITE + "/"},
             "isPartOf": {"@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "Slop Mop"}},
            {"@type": "Dataset", "name": title, "description": c["description"], "url": url,
             "temporalCoverage": "%s/%s" % (w["from"], w["to"]), "creator": {"@type": "Organization", "name": "Artimovo LLC"},
             "distribution": {"@type": "DataDownload", "encodingFormat": "application/json", "contentUrl": "%s/state-of-slop/data/%s.json" % (SITE, d["month"])}}]}

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
        '<meta property="og:image:alt" content="{alt}">\n'
        '<meta property="article:published_time" content="{pub}">\n'
        '<meta name="twitter:card" content="summary_large_image">\n'
        '<meta name="twitter:title" content="{t}">\n'
        '<meta name="twitter:description" content="{desc}">\n'
        '<meta name="twitter:image" content="{img}">\n'
        '<meta name="author" content="Tom Frazier">\n'
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
        t=e(title), desc=e(c["description"]), url=url, img=img, alt=e(c["hero_alt"]), pub=d["published"], ld=json.dumps(ld, indent=1, ensure_ascii=False))

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
      <p class="sos-byline mono">covers {window} · {posts} posts</p>
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
</body>
</html>
""".format(head=head, meta=meta, header=header, footer=footer, period=e(range_short(w)), sources=e(src_label.lower()), posts=num(d["totals"]["items_scored"]),
           headline=e(c["headline"]), dek=e(c["dek"]), window=range_long(w),
           pub=date_long(d["published"]), slug=slug, alt=e(c["hero_alt"]), glance=glance, toc="\n      ".join(toc), sections="\n".join(sections))


def archive(months, head, header, footer):
    items = "".join(
        '<li class="sos-arch"><a href="{slug}"><img src="{slug}.png" width="1200" height="630" alt="" loading="lazy"><span class="mono">{period}</span><b>{headline}</b><span>{dek}</span></a></li>'.format(
            slug=m["slug"], period=e(range_short(m["data"]["window"])), headline=e(m["headline"]), dek=e(m["dek"])) for m in months)
    desc = "Every month, Slop Mop publishes what it found in the feeds it read: how much was slop, how much read as AI-likely, and the signs that showed up most."
    meta = ('<title>State of Slop — Slop Mop</title>\n<meta name="description" content="%s">\n<link rel="canonical" href="%s/state-of-slop/">\n'
            '<meta property="og:type" content="website">\n<meta property="og:title" content="State of Slop — Slop Mop">\n<meta property="og:description" content="%s">\n'
            '<meta property="og:image" content="%s/state-of-slop/%s.png">\n<meta name="twitter:card" content="summary_large_image">\n'
            '<link rel="icon" href="../favicon.svg" type="image/svg+xml">\n<meta name="theme-color" content="#16181A">\n'
            '<link rel="stylesheet" href="../_ds/slopmop/styles.css">\n<link rel="stylesheet" href="../assets/site.css">\n<link rel="stylesheet" href="../assets/state-of-slop.css">\n') % (
        e(desc), SITE, e(desc), SITE, months[0]["slug"])
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


def hero_svg(d, c):
    h = d["headline"]
    w = d["window"]
    named = " and ".join(s["label"] for s in d["sources"] if s.get("in_copy"))
    ai, slop, lik, pos = h["ai_likely_percent"], h["slop_percent"], h["likely_percent"], h["possibly_percent"]
    bw = 452  # bar width per column
    x1, x2 = 104, 644
    kicker = "state of slop · %s · %s" % (range_short(w), named.lower())
    foot = "%s posts · %d days" % (num(d["totals"]["items_scored"]), w["days"])
    return """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#F7F8F9"/>
<rect width="1200" height="8" fill="#F5B400"/>
<text x="64" y="76" font-family="JetBrains Mono" font-size="20" fill="#6E757D">{kicker}</text>
<text x="64" y="146" font-family="Archivo" font-weight="700" font-size="58" letter-spacing="-0.6" fill="#16181A">{headline}</text>
<rect x="64" y="186" width="1072" height="316" rx="12" fill="#FFFFFF" stroke="#E6E9EC"/>
<text x="{x1}" y="300" font-family="Archivo" font-weight="700" font-size="104" letter-spacing="-1" fill="#16181A">{ai}<tspan font-size="56">%</tspan></text>
<text x="{x1}" y="344" font-family="Archivo" font-weight="500" font-size="26" fill="#3B4045">read as AI-likely</text>
<rect x="{x1}" y="372" width="{bw}" height="16" rx="8" fill="#EFF1F3"/>
<rect x="{x1}" y="372" width="{aiw:.1f}" height="16" rx="8" fill="#6E757D"/>
<text x="{x2}" y="300" font-family="Archivo" font-weight="700" font-size="104" letter-spacing="-1" fill="#16181A">{slop}<tspan font-size="56">%</tspan></text>
<text x="{x2}" y="344" font-family="Archivo" font-weight="500" font-size="26" fill="#3B4045">read as slop</text>
<rect x="{x2}" y="372" width="{bw}" height="16" rx="8" fill="#EFF1F3"/>
<rect x="{x2}" y="372" width="{slw:.1f}" height="16" rx="8" fill="#F5B400"/>
<rect x="{lx:.1f}" y="372" width="{lw:.1f}" height="16" fill="#D93025"/>
<rect x="{lx2:.1f}" y="372" width="8" height="16" rx="4" fill="#D93025"/>
<text x="{x2}" y="416" font-family="JetBrains Mono" font-size="17" fill="#6E757D">{pos}% possibly · {lik}% likely</text>
<line x1="104" y1="446" x2="1096" y2="446" stroke="#E6E9EC"/>
<text x="104" y="482" font-family="Archivo" font-weight="600" font-size="26" fill="#16181A">The Slop Gap: {gap} points. <tspan font-weight="400" fill="#565C63">{fine}% of AI-likely posts were fine.</tspan></text>
<rect y="550" width="1200" height="80" fill="#16181A"/>
{mop}
<text x="112" y="600" font-family="Archivo" font-weight="600" font-size="28" fill="#FFFFFF">Slop Mop<tspan font-family="JetBrains Mono" font-weight="400" font-size="20" fill="#B2B8BE"> .lol</tspan></text>
<text x="1136" y="598" text-anchor="end" font-family="JetBrains Mono" font-size="19" fill="#B2B8BE">{foot}</text>
</svg>""".format(kicker=e(kicker), headline=e(c["headline"]) + ".", x1=x1, x2=x2, bw=bw, ai=ai, slop=slop, pos=pos, lik=lik,
                 aiw=bw * ai / 100, slw=bw * slop / 100, lx=x2 + bw * pos / 100, lw=bw * lik / 100 - 4, lx2=x2 + bw * slop / 100 - 8,
                 gap=h["slop_gap_points"], fine=d["slop_gap"]["share_of_ai_likely_not_slop"], foot=e(foot),
                 mop=MOP.format(x=58, y=567, k=1.9, c="#F5B400", bg="#16181A"))


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
    print("Add any new month to sitemap.xml.")


if __name__ == "__main__":
    main(sys.argv)
