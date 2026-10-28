"""The content library: glossary, patterns, for, compare and guides, built from _content/<family>/<slug>.md, plus every
sitemap. Run after home.py, pages.py and askai.py (it rewrites the footer of the hand-edited xl/ pages too).

Each source file is JSON frontmatter between --- lines, then Markdown (format in _content/WRITING.md). A page goes live
when its publish_date (guides) is today or earlier, in Pacific time; .github/workflows/publish.yml rebuilds at 12:07am Pacific so scheduled
guides appear on their date with their hub links and sitemap entries. SLOPMOP_TODAY=YYYY-MM-DD overrides the date
for previews.
"""
import datetime, glob, html as H, shutil
from urllib.parse import quote
from common import *
import pages as P

CONTENT = f"{ROOT}/_content"
# Publish dates are Pacific dates: a guide dated 20 October goes live at midnight on 20 October in California.
from zoneinfo import ZoneInfo
TODAY = os.environ.get("SLOPMOP_TODAY") or datetime.datetime.now(ZoneInfo("America/Los_Angeles")).date().isoformat()
SITE = "https://slopmop.lol/"

FAMILIES = {
    "glossary": ("Glossary", "The slop glossary"),
    "patterns": ("The nine tells", "The nine tells of slop"),
    "for": ("Slop Mop for", "Who Slop Mop is for"),
    "compare": ("Compare", "Slop Mop compared"),
    "guides": ("Guides", "Guides to a better feed"),
    "learn": ("Learn", "Learn how slop works"),
    "calculators": ("Calculators", "Slop calculators"),
}
NETWORKS = [("linkedin", "LinkedIn"), ("reddit", "Reddit"), ("x", "X"), ("facebook", "Facebook"), ("substack", "Substack"),
            ("medium", "Medium"), ("websites", "Websites & blogs"), ("email", "Email")]
NET_NAME = dict(NETWORKS)
LIVE = {k for k, _ in NETWORKS}   # every network is live with this launch


# ---------------------------------------------------------------- loading
def load(family):
    out = []
    for f in sorted(glob.glob(f"{CONTENT}/{family}/*.md")):
        raw = open(f, encoding="utf-8").read()
        _, fm, body = raw.split("---\n", 2)
        meta = json.loads(fm)
        meta["slug"] = os.path.basename(f)[:-3]
        meta["family"] = family
        meta["body"] = body.strip()
        if family == "guides":
            meta["path"] = f"guides/{meta['network']}/{meta['slug']}/"
        else:
            meta["path"] = f"{family}/{meta['slug']}/"
        meta["live"] = not meta.get("draft") and meta.get("publish_date", "0000") <= TODAY
        meta["lastmod"] = max(meta.get("updated", ""), meta.get("publish_date", ""))
        out.append(meta)
    return out


ALL = {f: load(f) for f in FAMILIES}
LIVE_PAGES = {f: [p for p in ALL[f] if p["live"]] for f in FAMILIES}
BY_PATH = {"/" + p["path"]: p for f in FAMILIES for p in LIVE_PAGES[f]}


def sort_key(s):
    return re.sub(r"[^a-z0-9 ]", "", s.lower())


# ---------------------------------------------------------------- markdown
def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", re.sub(r"<[^>]+>", "", s).lower()).strip("-")


def inline(s):
    s = H.escape(s, quote=False)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)

    def link(m):
        text, url = m.group(1), m.group(2)
        ext = url.startswith("http") and not url.startswith(SITE)
        return f'<a href="{url}"{" rel=\"noopener\"" if ext else ""}>{text}</a>'
    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", link, s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![*\w/])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", s)
    return s


BADGE = {"slop": ("badge-paid", "slop"), "fine": ("badge-live", "fine"), "example": ("badge-soon", "example")}


def examples_html(items):
    rows = []
    for kind, text in items:
        cls, label = BADGE[kind]
        paras = "".join(f"<p>{inline(p)}</p>" for p in re.split(r"\n\s*\n", text.strip()))
        lines = paras.replace("\n", "<br>")
        rows.append(f'<div><span class="k"><span class="badge {cls}">{label}</span></span><span class="v">{lines}</span></div>')
    return '<div class="kv examples">' + "".join(rows) + "</div>"


def table_html(rows):
    cells = [[c.strip() for c in r.strip().strip("|").split("|")] for r in rows]
    head, body = cells[0], [r for r in cells[1:] if not all(re.fullmatch(r":?-+:?", c) for c in r)]
    th = "".join(f"<th>{inline(c)}</th>" for c in head)
    tb = "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body)
    return f'<div class="table-wrap"><table class="md-table"><thead><tr>{th}</tr></thead><tbody>{tb}</tbody></table></div>'


def md(src):
    """Markdown to HTML. Returns (html, toc) where toc is [(id, heading)] for the H2s, each wrapped in a <section>."""
    out, toc, para, lists, ex, tbl = [], [], [], [], [], []
    lines = src.splitlines()
    i, in_section = 0, False

    def flush():
        if para:
            out.append(f"<p>{inline(' '.join(para))}</p>"); para.clear()
        while lists:
            out.append(f"</li></{lists.pop()}>")
        if ex:
            out.append(examples_html(ex)); ex.clear()
        if tbl:
            out.append(table_html(tbl)); tbl.clear()

    while i < len(lines):
        line = lines[i]
        m = re.match(r"^:::(slop|fine|example)\s*$", line)
        if m:
            if para or lists or tbl:
                saved = list(ex); ex.clear(); flush(); ex.extend(saved)
            j = i + 1
            while j < len(lines) and lines[j].strip() != ":::":
                j += 1
            ex.append((m.group(1), "\n".join(lines[i + 1:j])))
            i = j + 1
            continue
        if not line.strip():
            if para or lists or tbl:
                if ex:
                    saved = list(ex); ex.clear(); flush(); ex.extend(saved)
                else:
                    flush()
            i += 1
            continue
        if ex:
            flush()
        if line.lstrip().startswith("|"):
            if para or lists:
                flush()
            tbl.append(line); i += 1; continue
        if tbl:
            flush()
        h = re.match(r"^(#{2,3})\s+(.*)$", line)
        if h:
            flush()
            n, text = len(h.group(1)), h.group(2).strip()
            if n == 2:
                if in_section:
                    out.append("</section>")
                aid = slugify(text)
                toc.append((aid, inline(text)))
                out.append(f'<section id="{aid}">\n<h2>{inline(text)}</h2>')
                in_section = True
            else:
                out.append(f"<h3>{inline(text)}</h3>")
            i += 1
            continue
        lm = re.match(r"^(\s*)([-*]|\d+\.)\s+(.*)$", line)
        if lm:
            if para:
                out.append(f"<p>{inline(' '.join(para))}</p>"); para.clear()
            depth = len(lm.group(1).replace("\t", "  ")) // 2 + 1
            tag = "ol" if lm.group(2)[0].isdigit() else "ul"
            if depth > len(lists):
                out.append(f"<{tag}><li>"); lists.append(tag)
            else:
                while len(lists) > depth:
                    out.append(f"</li></{lists.pop()}>")
                out.append("</li><li>")
            out.append(inline(lm.group(3)))
            i += 1
            continue
        if lists and line.startswith("  "):
            out.append(" " + inline(line.strip())); i += 1; continue
        if line.startswith(">"):
            flush()
            q = []
            while i < len(lines) and lines[i].startswith(">"):
                q.append(lines[i].lstrip("> ").strip()); i += 1
            out.append(f'<div class="callout"><p>{inline(" ".join(q))}</p></div>')
            continue
        if lists:
            flush()
        para.append(line.strip())
        i += 1
    flush()
    if in_section:
        out.append("</section>")
    return "\n".join(out), toc


# ---------------------------------------------------------------- shared pieces
def rel(html_, depth):
    """Relative links in the shared chrome resolve from the site root; pages n folders down need ../ n times."""
    if not depth:
        return html_
    return re.sub(r'((?:href|src|poster)=")(?!https?:|#|mailto:|/|data:|\.\./)', r"\1" + "../" * depth, html_)


def crumbs_ld(items):
    return {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + p} for i, (n, p) in enumerate(items)]}


def crumbs_html(items, last=False):
    """Links up the trail. Articles stop at the parent (the H1 names the page); hubs show their own name too."""
    parts = [f'<a href="/{p}">{esc(n)}</a>' for n, p in items[:-1]] + ([f"<span>{esc(items[-1][0])}</span>"] if last else [])
    return '<nav class="crumbs" aria-label="Breadcrumb">' + '<span aria-hidden="true">/</span>'.join(parts) + "</nav>"


def og_for(path):
    f = "assets/og/" + path.strip("/").replace("/", "-") + ".jpg"
    return f if os.path.exists(f"{ROOT}/{f}") else "og-image-4.png"


def share(path, text):
    url = SITE + path
    u, t = quote(url, safe=""), quote(text, safe="")
    links = [("linkedin", "LinkedIn", f"https://www.linkedin.com/sharing/share-offsite/?url={u}"),
             ("x", "X", f"https://x.com/intent/post?text={t}&url={u}"),
             ("bluesky", "Bluesky", f"https://bsky.app/intent/compose?text={t}%20{u}"),
             ("threads", "Threads", f"https://www.threads.net/intent/post?text={t}%20{u}")]
    btns = "".join(f'<a class="share-btn" href="{h}" target="_blank" rel="noopener" data-share="{k}" aria-label="Share on {n}" title="Share on {n}"><img src="/assets/logos/{k}.svg" alt="" width="15" height="15"></a>' for k, n, h in links)
    return f'''<div class="share" aria-label="Share">
  <button class="share-btn share-copy" type="button" data-copy="{url}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>Copy link</span></button>
  {btns}
</div>'''


def card(p, kicker=""):
    title = p.get("term") or p.get("tell") or p["title"]
    k = f'<span class="mono">{kicker}</span>' if kicker else ""
    return f'<a class="card link-card" href="/{p["path"]}">{k}<h3>{esc(title)}</h3><p>{esc(p["summary"])}</p></a>'


def related_html(p):
    items = [BY_PATH[r] for r in p.get("related", []) if r in BY_PATH and r != "/" + p["path"]]
    if not items:
        return ""
    return '<div class="related"><h2>Read next</h2><div class="cards-3">' + "".join(card(r, FAMILIES[r["family"]][0]) for r in items[:6]) + "</div></div>"


def sources_html(p):
    src = p.get("sources") or []
    if not src:
        return ""
    lis = []
    for s in src:
        bits = [f'<a href="{esc(s["url"])}" rel="noopener">{esc(s["title"])}</a>']
        if s.get("publisher"):
            bits.append(esc(s["publisher"]))
        if s.get("date"):
            d = s["date"]
            bits.append(nice_date(d) if re.fullmatch(r"\d{4}-\d{2}-\d{2}", d) else esc(d))
        lis.append("<li>" + ", ".join(bits) + "</li>")
    return '<div class="sources"><h2>Sources</h2><ol>' + "".join(lis) + "</ol></div>"


def cta(network=None):
    if network == "email":
        return f'''<aside class="cta-card">
  <div><h2>Fold the slop out of your inbox</h2><p>Slop Mop for Gmail and Outlook checks what each sender wrote, marks the filler and folds the rest, with personal details replaced before anything is sent. Part of Slop Mop XL, with every feed and the sites you read.</p></div>
  <div class="cta-btns"><a class="btn btn-primary" href="/index.html#pricing">Get Slop Mop XL</a><a class="btn btn-ghost" data-add href="{STORE}">{ICON['download']}Add to browser, free</a></div>
</aside>'''
    where = f"{NET_NAME[network]} ahead of you" if network else "your feeds, the sites you read and your inbox ahead of you"
    return f'''<aside class="cta-card">
  <div><h2>Fold the slop out of your feed</h2><p>Slop Mop reads {where}, folds away the slop and shows its working. Works in Chrome, Edge, Firefox and Safari. Free for one feed, 250 checks a day.</p></div>
  <a class="btn btn-primary" data-add href="{STORE}">{ICON['download']}Add to browser, free</a>
</aside>'''


EXPLORE = [("/", "Slop Mop home"), ("/how-it-works.html", "How it works"), ("/glossary/", "The slop glossary"),
           ("/patterns/", "The nine tells"), ("/for/", "Who it's for"), ("/compare/", "Compare"), ("/guides/", "Guides"),
           ("/learn/", "Learn"), ("/calculators/", "Calculators")]


def explore(here):
    links = "".join(f'<a href="{h}">{t}</a>' for h, t in EXPLORE if h != "/" + here)
    return f'<nav class="explore" aria-label="Explore Slop Mop"><b>Explore</b>{links}</nav>'


# ---------------------------------------------------------------- page images
# Every page has three images, rendered by _build/images.js from _build/render.html: a header image, an illustrated
# "Slop Mop at work" figure with a caption, and a share image whose layout is set per family.
def img_key(path):
    return path.strip("/").replace("/", "-")


def img(kind, path):
    return f"assets/{kind}/{img_key(path)}.jpg"


def image_ld(path, alt, kind="hero", w=960, h=720):
    return {"@type": "ImageObject", "url": SITE + img(kind, path), "width": w, "height": h, "caption": alt}


def hero_img(path, alt):
    return f'<img class="ph-img" src="/{img("hero", path)}" width="960" height="720" alt="{esc(alt)}" fetchpriority="high">'


def figure_html(path, fig):
    return (f'<figure class="shot"><img src="/{img("fig", path)}" width="1200" height="720" loading="lazy" alt="{esc(fig["alt"])}">'
            f'<figcaption>{esc(fig["caption"])}</figcaption></figure>')


# ---------------------------------------------------------------- FAQ
# Glossary pages and the glossary hub end with a short FAQ: an accordion on the page plus FAQPage JSON-LD for search
# engines and LLMs. Answers are inline Markdown.
def faq_ld(url, qa):
    return {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": H.unescape(re.sub(r"<[^>]+>", "", inline(a)))}}
        for q, a in qa]}


def faq_html(title, qa):
    items = "\n".join(f'  <details><summary>{esc(q)}</summary><div class="a"><p>{inline(a)}</p></div></details>' for q, a in qa)
    return f'<div class="related page-faq" id="faq"><h2>{esc(title)}</h2>\n<div class="faq">\n{items}\n</div></div>'


def sections(body):
    """The body's H2 sections as [(heading, markdown)]."""
    parts = re.split(r"^## (.+)$", body, flags=re.M)
    return [(parts[i].strip(), parts[i + 1]) for i in range(1, len(parts) - 1, 2)]


def first_para(text, n=2):
    """The first plain paragraph of a section, cut to its first n sentences (initials like "S. Weld" don't end one)."""
    text = re.sub(r":::(slop|fine|example)\n.*?\n:::", "", text, flags=re.S)
    for block in re.split(r"\n\s*\n", text):
        b = " ".join(block.split())
        if b and not re.match(r"(- |\d+\. |> |\||#)", b):
            return " ".join(re.split(r"(?<=[.!?])(?<![A-Z]\.)\s+(?=[A-Z\"“\[*])", b)[:n])
    return ""


PROPER = {"Brandolini’s law", "Elsagate", "Italian brainrot"}


def in_sentence(term):
    """A term as it reads mid-sentence: no disambiguating bracket, and lower case unless it's a name or acronym."""
    t = re.sub(r" \([^)]*\)$", "", term)
    return t if t in PROPER or re.search(r"[A-Z]", t[1:]) else t[:1].lower() + t[1:]


def term_faq(p):
    """The term's own questions from its frontmatter "faq", plus ones drawn from its summary and its sections."""
    t = in_sentence(p["term"])
    qa = [(f"What does {t} mean?", p["summary"])] + [(x["q"], x["a"]) for x in p.get("faq") or []]
    for h, text in sections(p["body"]):
        a, hl = first_para(text), h.lower()
        if not a:
            continue
        if hl.startswith("where"):
            qa.append((f"Where does the term {t} come from?", a))
        elif hl.startswith("the criticism"):
            qa.append((f"What's the criticism of the term {t}?", a))
        elif "slop mop" in hl:
            # "handle a troll farm" but "handle clickbait": borrow the article the page itself uses, if any
            art = re.search(rf"^## .*\b(an?) {re.escape(t)}\b", p["body"], re.I | re.M)
            qa.append((f"How does Slop Mop handle {art.group(1).lower() + ' ' if art else ''}{t}?", a))
    seen, out = set(), []
    for q, a in qa:
        if q.lower() not in seen:
            seen.add(q.lower()); out.append((q, a))
    return out


def article(p, crumbs, eyebrow, lede, meta="", visual="", before="", after="", ld_extra=None, network=None, share_text=None, faq=None):
    body, toc = md(p["body"])
    url = SITE + p["path"]
    spec = page_images(p)
    hero_alt, fig = spec["hero_alt"], spec["fig"]
    imgs = [image_ld(p["path"], hero_alt), image_ld(p["path"], fig["alt"], "fig", 1200, 720), image_ld(p["path"], p["title"], "og", 1200, 630)]
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "WebPage", "@id": url + "#page", "url": url, "name": p["title"], "headline": p["seo_title"], "description": p["description"],
         "inLanguage": "en", "datePublished": p.get("publish_date") or p.get("updated"), "dateModified": p["lastmod"],
         "keywords": p.get("keyword", ""), "primaryImageOfPage": imgs[0], "image": imgs,
         "isPartOf": {"@id": SITE + "#website"}, "breadcrumb": {"@id": url + "#crumbs"},
         "about": {"@type": "SoftwareApplication", "@id": SITE + "#app", "name": "Slop Mop"},
         "author": {"@type": "Organization", "name": "Slop Mop", "url": SITE},
         "publisher": {"@type": "Organization", "name": "Artimovo LLC", "url": SITE}},
        dict(crumbs_ld(crumbs), **{"@id": url + "#crumbs"})]}
    if ld_extra:
        ld_extra.setdefault("image", imgs[0]["url"])
        ld["@graph"].append(ld_extra)
    if faq:
        ld["@graph"].append(faq_ld(url, faq[1]))
    h = head(p["seo_title"], p["description"], p["path"], og_title=p["title"], ld=ld, og_image=og_for(p["path"]))
    h = h.replace('<meta property="og:image:alt" content="Slop Mop: time is the one thing you can\'t get back. Stop spending it on slop, whether a person or an AI wrote it.">',
                  f'<meta property="og:image:alt" content="{esc(p["title"])}">')
    sh = share(p["path"], share_text or p["title"])
    # the "Slop Mop at work" figure goes after the first section, where the page has explained the idea
    cut = body.find("</section>")
    body = body[:cut + 10] + figure_html(p["path"], fig) + body[cut + 10:] if cut >= 0 else figure_html(p["path"], fig) + body
    if faq:
        body += faq_html(*faq)
    tail = (f'<div class="page-tail">{sh}<span class="mono">updated {nice_date(p["lastmod"]).lower()}</span></div>'
            + after + related_html(p) + sources_html(p) + cta(network) + explore(p["path"]))
    main = P.page_head(eyebrow, esc(p["title"]), lede, meta=meta, visual=hero_img(p["path"], hero_alt))
    main = main.replace('<span class="eyebrow">', crumbs_html(crumbs) + '<span class="eyebrow">', 1)
    main += P.toc_page(toc, before + body + tail)
    return h, main


def emit(path, h, main, depth):
    extra = '<script src="/assets/calculators.js" defer></script>\n' if 'data-calc="' in main else ""
    write(path + "index.html", rel(page_shell(h, "", main, islands=False, extra_scripts=extra), depth))


def hub_page(family, title, lede, inner, desc, depth=1, extra_ld=None, visual="", faq=None):
    path = f"{family}/"
    url = SITE + path
    crumbs = [("Home", ""), (FAMILIES[family][0], path)]
    alt = f"{title}: {HUB_CHIPS[family][1]}"
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "@id": url + "#page", "url": url, "name": title, "description": desc, "inLanguage": "en",
         "primaryImageOfPage": image_ld(path, alt), "image": [image_ld(path, alt), image_ld(path, title, "og", 1200, 630)],
         "isPartOf": {"@id": SITE + "#website"}, "dateModified": max([p["lastmod"] for p in LIVE_PAGES[family]] or [TODAY])},
        dict(crumbs_ld(crumbs), **{"@id": url + "#crumbs"})]}
    if extra_ld:
        ld["@graph"].append(extra_ld)
    if faq:
        ld["@graph"].append(faq_ld(url, faq[1]))
        inner += "\n" + faq_html(*faq)
    h = head(f"{title} · Slop Mop", desc, path, og_title=title, ld=ld, og_image=og_for(path))
    main = P.page_head(FAMILIES[family][0].lower(), esc(title), lede, visual=hero_img(path, alt))
    main = main.replace('<span class="eyebrow">', crumbs_html(crumbs, last=True) + '<span class="eyebrow">', 1)
    main += f'<section class="section hub">\n  <div class="wrap">\n{inner}\n{cta()}{explore(path)}\n  </div>\n</section>\n'
    write(path + "index.html", rel(page_shell(h, "", main, islands=False), depth))


# ---------------------------------------------------------------- glossary
def alias_page(s, p):
    """Whether an alias gets its own forwarding address: not for acronyms (/glossary/mad/ would mislead) or clashes."""
    return len(s) > 3 and s != p["slug"] and not os.path.exists(f"{CONTENT}/glossary/{s}.md")


TELLS = sorted(LIVE_PAGES["patterns"], key=lambda p: p.get("order", 99))


def GLOSSARY_FAQ(n):
    return [
        ("What is the slop glossary?",
         f"An A–Z of {n} words for low-value content, by people and by AI, from [clickbait](/glossary/clickbait/) and content farms to "
         "[workslop](/glossary/workslop/) and [AI slop](/glossary/ai-slop/). Each term has its own page with where the word came from, examples and sources."),
        ("What does slop mean?",
         "Slop is writing that takes your time and gives nothing back: filler, bait, hype and posts that could have been written about anything. "
         "AI made a lot more of it, but people were writing it long before. [AI slop](/glossary/ai-slop/) has the full story."),
        ("Is Slop Mop an AI detector?",
         "No. Slop Mop is a bad-writing detector. It judges the writing, never the writer or the reader, so a useful post written with AI stays "
         "and an empty one written by a person can be folded. [How it works](/how-it-works.html) explains what it checks."),
        ("What are the nine tells?",
         "The nine patterns Slop Mop looks for in every post: scroll-stopper, engagement bait, hype words, empty praise, no-catch promises, "
         "\"not X, but Y\", flowery prose, stiff phrasing and the too-tidy story. They're in the glossary too, marked as tells, and on [their own pages](/patterns/)."),
        ("Where do these terms come from?",
         "Every page credits the people, papers and publications that coined or spread the word, with links in its sources. Many were gathered by "
         "Oren Etzioni and Daniel S. Weld in their October 2026 GeekWire glossary of AI-era language."),
        ("Can I suggest a term?",
         "Yes. Send it through the [contact page](/contact.html), ideally with a link to somewhere you've seen it used."),
    ]


def glossary():
    terms = sorted(LIVE_PAGES["glossary"], key=lambda p: sort_key(p["term"]))
    for i, p in enumerate(terms):
        prev_, next_ = terms[i - 1], terms[(i + 1) % len(terms)]
        aka = p.get("aliases") or []
        bits = []
        if aka:
            bits.append("also " + ", ".join(esc(a) for a in aka))
        if p.get("first_seen"):
            bits.append("since " + esc(p["first_seen"]))
        kind = {"ai": "about ai content", "human": "about human content", "both": "about ai and human content"}.get(p.get("kind"), "")
        if kind:
            bits.append(kind)
        visual = f'''<figure class="term-card">
  <span class="mono">slop mop glossary</span>
  <b>{esc(p["term"])}</b>
  <p>{esc(p["punchline"])}</p>
  <span class="term-card-url">slopmop.lol/glossary/{p["slug"]}</span>
</figure>'''
        dt = {"@type": "DefinedTerm", "@id": SITE + p["path"] + "#term", "name": p["term"], "description": p["summary"],
              "url": SITE + p["path"], "inDefinedTermSet": {"@id": SITE + "glossary/#set"}}
        if aka:
            dt["alternateName"] = aka
        nav_ = f'''<nav class="prev-next" aria-label="More terms">
  <a href="/{prev_["path"]}"><span class="mono">previous term</span>{esc(prev_["term"])}</a>
  <a href="/glossary/"><span class="mono">all terms</span>The glossary</a>
  <a href="/{next_["path"]}"><span class="mono">next term</span>{esc(next_["term"])}</a>
</nav>'''
        h, main = article(p, [("Home", ""), ("Glossary", "glossary/"), (p["term"], p["path"])], "glossary",
                          esc(p["punchline"]), meta=" · ".join(bits), visual=visual, after=nav_, ld_extra=dt,
                          share_text=f'{p["term"]}: {p["punchline"]}', faq=(f'{p["term"]}: common questions', term_faq(p)))
        emit(p["path"], h, main, 2)
        # aliases get their own short address that forwards to the term, so "slopmop.lol/glossary/ai-dar" works too
        for a in aka:
            s = slugify(a)
            if alias_page(s, p):
                target = SITE + p["path"]
                write(f"glossary/{s}/index.html", f'<!DOCTYPE html>\n<html lang="en"><head><meta charset="utf-8"><title>{esc(a)} · Slop Mop glossary</title>'
                      f'<link rel="canonical" href="{target}"><meta name="robots" content="noindex, follow">'
                      f'<meta http-equiv="refresh" content="0; url={target}"></head><body><a href="{target}">{esc(a)}: see {esc(p["term"])}</a></body></html>\n')

    # the index: every term and every tell, A to Z, filtered as you type
    entries = [(p["term"], p.get("aliases") or [], p["punchline"], p["path"], p.get("kind", "both")) for p in terms]
    entries += [(t["tell"], [], t["short"][0].upper() + t["short"][1:] + ".", t["path"], "tell") for t in TELLS]
    entries.sort(key=lambda e: sort_key(e[0]))
    rows, letter = [], None
    for term, aka, line, path, kind in entries:
        L = sort_key(term)[:1].upper()
        if L.isdigit():
            L = "#"
        if L != letter:
            if letter:
                rows.append("</ul></div>")
            rows.append(f'<div class="gl-group" data-letter="{L}"><h2 class="gl-letter" id="letter-{L.lower() if L != "#" else "num"}">{L}</h2><ul class="gl-list">')
            letter = L
        aka_s = f' <span class="gl-aka">also {esc(", ".join(aka))}</span>' if aka else ""
        tag = '<span class="badge badge-paid">tell</span>' if kind == "tell" else ""
        hay = esc(" ".join([term] + aka + [line]).lower())
        rows.append(f'<li data-kind="{kind}" data-q="{hay}"><a href="/{path}"><b>{esc(term)}</b>{tag}{aka_s}<span class="gl-line">{esc(line)}</span></a></li>')
    rows.append("</ul></div>")
    letters = sorted({sort_key(e[0])[:1].upper() for e in entries})
    jump = "".join(f'<a href="#letter-{l.lower()}">{l}</a>' for l in letters if l.isalpha())
    n_terms = len(terms)
    credit = ('<p class="gl-credit">Many of these terms, from AI slap and meat proxy to agentsomnia and AI cream, were gathered by Oren Etzioni and '
              'Daniel S. Weld in <a href="https://www.geekwire.com/2026/etzioni-on-ai-the-colorful-and-cranky-language-of-the-ai-era-from-slop-to-slap/" rel="noopener">'
              '&ldquo;The colorful and cranky language of the AI era, from slop to slap&rdquo;</a> (GeekWire, 16 October 2026). Each page credits the term&rsquo;s own origin too. '
              'New to the idea? Start with <a href="/glossary/ai-slop/">AI slop</a>, the <a href="/patterns/">nine tells</a> and <a href="/how-it-works.html">how Slop Mop works</a>.</p>')
    inner = credit + f'''<div class="gl-tools">
  <label class="gl-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="sr-only">Search the glossary</span><input type="search" placeholder="Search {n_terms + len(TELLS)} terms" data-gl-search autocomplete="off"></label>
  <div class="gl-filters" role="group" aria-label="Show">
    <button type="button" aria-pressed="true" data-gl-kind="all">All</button>
    <button type="button" aria-pressed="false" data-gl-kind="ai">About AI</button>
    <button type="button" aria-pressed="false" data-gl-kind="human">About people</button>
    <button type="button" aria-pressed="false" data-gl-kind="tell">The tells</button>
  </div>
  <nav class="gl-jump" aria-label="Jump to letter">{jump}</nav>
</div>
<p class="gl-empty" hidden>Nothing matches that. Try a shorter word.</p>
<div class="gl-index">
{"".join(rows)}
</div>'''
    dts = {"@type": "DefinedTermSet", "@id": SITE + "glossary/#set", "name": "The slop glossary", "url": SITE + "glossary/",
           "hasDefinedTerm": [{"@id": SITE + p["path"] + "#term"} for p in terms]}
    hub_page("glossary", "The slop glossary",
             f"{n_terms} words for the junk that fills feeds and inboxes, from content farms and clickbait to workslop and AI slop, plus the nine tells Slop Mop looks for. Each has its own page you can share.",
             inner, f"A searchable A–Z of {n_terms} terms for low-value content, by people and by AI: AI slop, workslop, clickbait, engagement bait and more, each with examples.",
             extra_ld=dts, faq=("Questions about the glossary", GLOSSARY_FAQ(n_terms)))


# ---------------------------------------------------------------- patterns (the nine tells)
def radar(active):
    """A small nine-spoke Slopprint with one spoke lit."""
    import math
    cx = cy = 110; r = 84
    spokes, dots, labels = [], [], []
    for i, t in enumerate(TELLS):
        a = -math.pi / 2 + i * 2 * math.pi / 9
        x, y = cx + r * math.cos(a), cy + r * math.sin(a)
        on = t["slug"] == active
        spokes.append(f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" class="{"on" if on else ""}"/>')
        rr = r * (0.92 if on else 0.28 + 0.06 * ((i * 5) % 4))
        dots.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    poly = " ".join(f"{x:.1f},{y:.1f}" for x, y in dots)
    rings = "".join(f'<circle cx="{cx}" cy="{cy}" r="{r * k:.0f}"/>' for k in (0.33, 0.66, 1))
    return f'<svg class="radar" viewBox="0 0 220 220" role="img" aria-label="Slopprint with this tell highlighted"><g class="rings">{rings}</g><g class="spokes">{"".join(spokes)}</g><polygon points="{poly}"/></svg>'


def patterns():
    for i, p in enumerate(TELLS):
        prev_, next_ = TELLS[i - 1], TELLS[(i + 1) % len(TELLS)]
        nav_ = f'''<nav class="prev-next" aria-label="More tells">
  <a href="/{prev_["path"]}"><span class="mono">previous tell</span>{esc(prev_["tell"])}</a>
  <a href="/patterns/"><span class="mono">all nine</span>The tells</a>
  <a href="/{next_["path"]}"><span class="mono">next tell</span>{esc(next_["tell"])}</a>
</nav>'''
        visual = f'<figure class="radar-card">{radar(p["slug"])}<figcaption><span class="mono">tell {p["order"]} of 9</span>{esc(p["tell"])}</figcaption></figure>'
        h, main = article(p, [("Home", ""), ("The nine tells", "patterns/"), (p["tell"], p["path"])], f"the nine tells · {p['order']} of 9",
                          esc(p["summary"]), meta=esc(p["short"]), visual=visual, after=nav_)
        emit(p["path"], h, main, 2)
    cards = "".join(card(p, f"{p['order']:02d} · {esc(p['short'])}") for p in TELLS)
    hub_page("patterns", "The nine tells of slop",
             "Slop Mop asks nine questions about every post, one per tell. Each page shows what the tell looks like, when it's fine, how it's scored and how to keep it out of your own writing.",
             f'<div class="cards-3">{cards}</div>',
             "The nine writing patterns Slop Mop looks for: scroll-stopper hooks, engagement bait, hype words, empty praise and five more, with examples and fixes.",
             visual=f'<figure class="radar-card">{radar("")}<figcaption><span class="mono">the slopprint</span>Nine tells, one spoke each</figcaption></figure>')


# ---------------------------------------------------------------- for (roles and networks)
def for_pages():
    pages_ = LIVE_PAGES["for"]
    guides = LIVE_PAGES["guides"]
    for p in pages_:
        net = p["slug"] if p["kind"] == "network" else None
        after = ""
        if net:
            g = sorted([x for x in guides if x["network"] == net], key=lambda x: x["publish_date"], reverse=True)
            if g:
                after = f'<div class="related"><h2>Guides for {esc(NET_NAME[net])}</h2><div class="cards-3">' + "".join(card(x) for x in g[:6]) + "</div></div>"
        status = ""
        if net:
            status = '<span class="badge badge-live">live</span>' if net in LIVE else '<span class="badge badge-soon">coming soon</span>'
        h, main = article(p, [("Home", ""), ("Slop Mop for", "for/"), (p["title"].replace("Slop Mop for ", ""), p["path"])],
                          "slop mop for", esc(p["summary"]), meta=status, after=after, network=net)
        emit(p["path"], h, main, 2)
    nets = [p for n, _ in NETWORKS for p in pages_ if p["slug"] == n]
    roles = sorted([p for p in pages_ if p["kind"] == "role"], key=lambda p: sort_key(p["audience"]))
    net_cards = "".join(card(p, "live" if p["slug"] in LIVE else "coming soon") for p in nets)
    role_cards = "".join(card(p) for p in roles)
    hub_page("for", "Who Slop Mop is for",
             "Anyone who reads a lot online and is tired of scrolling past hooks, bait and filler. Here's what that looks like on each network and in each line of work.",
             f'<h2 class="hub-h">By network</h2><div class="cards-3">{net_cards}</div><h2 class="hub-h">By role</h2><div class="cards-3">{role_cards}</div>',
             "Slop Mop for LinkedIn, Reddit, X, email and more, and for recruiters, founders, job seekers, marketers and other people who read feeds for work.")


# ---------------------------------------------------------------- compare
def compare():
    pages_ = sorted(LIVE_PAGES["compare"], key=lambda p: (p["kind"] != "product", sort_key(p["them"])))
    for p in pages_:
        rows = "".join(f'<tr><th scope="row">{inline(r["row"])}</th><td>{inline(r["slopmop"])}</td><td>{inline(r["them"])}</td></tr>' for r in p.get("table", []))
        before = f'''<section id="at-a-glance">
<h2>At a glance</h2>
<div class="table-wrap"><table class="md-table compare-table"><thead><tr><th></th><th>Slop Mop</th><th>{esc(p["them"])}</th></tr></thead><tbody>{rows}</tbody></table></div>
<p class="mono table-note">checked {nice_date(p["checked"]).lower()}. Tell us if something has changed: <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a></p>
<div class="callout"><p><strong>The short answer.</strong> {inline(p["verdict"])}</p></div>
</section>
'''
        others = [o for o in pages_ if o is not p]
        after = '<div class="related"><h2>Other comparisons</h2><ul class="compare-list">' + "".join(
            f'<li><a href="/{o["path"]}">{esc(o["title"])}</a><span>{esc(o["summary"])}</span></li>' for o in others) + "</ul></div>"
        h, main = article(p, [("Home", ""), ("Compare", "compare/"), (p["them"], p["path"])], "compare",
                          esc(p["summary"]), after=after)
        main = main.replace('<nav class="toc" aria-label="On this page">\n      <b>on this page</b>\n',
                            '<nav class="toc" aria-label="On this page">\n      <b>on this page</b>\n      <a href="#at-a-glance">At a glance</a>\n', 1)
        emit(p["path"], h, main, 2)
    prods = "".join(card(p) for p in pages_ if p["kind"] == "product")
    cats = "".join(card(p) for p in pages_ if p["kind"] == "category")
    hub_page("compare", "Slop Mop compared",
             "How Slop Mop differs from ad blockers, spam filters, AI detectors, mute lists and the other tools people use to cut the noise, checked and dated. Each one does a different job.",
             f'<h2 class="hub-h">Compared with other approaches</h2><div class="cards-3">{cats}</div><h2 class="hub-h">Compared with other products</h2><div class="cards-3">{prods}</div>',
             "Slop Mop compared with ad blockers, spam filters, AI detectors, mute filters and other feed and inbox tools: what each does, and who should pick which.")


# ---------------------------------------------------------------- guides
def guides():
    live = sorted(LIVE_PAGES["guides"], key=lambda p: (p["publish_date"], p["slug"]), reverse=True)
    for p in live:
        net = p["network"]
        more = [x for x in live if x["network"] == net and x is not p][:3]
        after = ""
        if more:
            after = f'<div class="related"><h2>More {esc(NET_NAME[net])} guides</h2><div class="cards-3">' + "".join(card(x) for x in more) + "</div></div>"
        meta = f'{p.get("minutes", 5)} min read · steps checked {nice_date(p["verified"]).lower()}'
        h, main = article(p, [("Home", ""), ("Guides", "guides/"), (NET_NAME[net], f"guides/{net}/"), (p["title"], p["path"])],
                          f"guides · {NET_NAME[net].lower()}", esc(p["summary"]), meta=meta, after=after, network=net,
                          ld_extra={"@type": "Article", "headline": p["title"], "datePublished": p["publish_date"],
                                    "dateModified": p["lastmod"], "author": {"@type": "Organization", "name": "Slop Mop"},
                                    "mainEntityOfPage": SITE + p["path"]})
        emit(p["path"], h, main, 3)
    upcoming = sorted([p for p in ALL["guides"] if not p["live"] and not p.get("draft")], key=lambda p: p["publish_date"])
    sections = []
    for net, name in NETWORKS:
        g = [p for p in live if p["network"] == net]
        if not g:
            continue
        sections.append(f'<h2 class="hub-h" id="{net}"><a href="/guides/{net}/">{esc(name)}</a></h2><div class="cards-3">' + "".join(card(x) for x in g[:6]) + "</div>")
        # one hub per network
        path = f"guides/{net}/"
        url = SITE + path
        crumbs = [("Home", ""), ("Guides", "guides/"), (name, path)]
        ld = {"@context": "https://schema.org", "@graph": [{"@type": "CollectionPage", "@id": url + "#page", "url": url,
              "name": f"{name} guides", "isPartOf": {"@id": SITE + "#website"}, "dateModified": max(x["lastmod"] for x in g)},
              dict(crumbs_ld(crumbs), **{"@id": url + "#crumbs"})]}
        desc = f"Practical guides to cutting the slop on {name}: the built-in controls, what to look for and what to skip."
        h = head(f"{name} guides · Slop Mop", desc, path, ld=ld)
        main = P.page_head("guides", f"{esc(name)} guides", esc(desc)).replace('<span class="eyebrow">', crumbs_html(crumbs, last=True) + '<span class="eyebrow">', 1)
        main += f'<section class="section hub"><div class="wrap"><div class="cards-3">{"".join(card(x) for x in g)}</div></div></section>\n'
        write(path + "index.html", rel(page_shell(h, "", main, islands=False), 2))
    soon = ""
    if upcoming:
        soon = '<h2 class="hub-h">Coming up</h2><ul class="upcoming">' + "".join(
            f'<li><span class="mono">{nice_date(p["publish_date"]).lower()}</span><span class="badge badge-soon">{esc(NET_NAME[p["network"]])}</span>{esc(p["title"])}</li>'
            for p in upcoming[:16]) + "</ul>"
    hub_page("guides", "Guides to a better feed",
             "A new guide every week for each network: how to use LinkedIn, Reddit, X, Facebook, Substack, Medium, the web and your inbox without wading through slop.",
             "".join(sections) + soon,
             "Weekly guides to cutting low-value content on LinkedIn, Reddit, X, Facebook, Substack, Medium, websites and email, using each platform's own controls.")


# ---------------------------------------------------------------- learn and calculators
def learn():
    pages_ = sorted(LIVE_PAGES["learn"], key=lambda p: p.get("order", 99))
    for p in pages_:
        meta = f'{p.get("minutes", 6)} min read'
        h, main = article(p, [("Home", ""), ("Learn", "learn/"), (p["title"], p["path"])], "learn", esc(p["summary"]), meta=meta,
                          ld_extra={"@type": "Article", "headline": p["title"], "datePublished": p["updated"], "dateModified": p["lastmod"],
                                    "author": {"@type": "Organization", "name": "Slop Mop"}, "mainEntityOfPage": SITE + p["path"]})
        emit(p["path"], h, main, 2)
    hub_page("learn", "Learn how slop works",
             "The ideas behind Slop Mop: why feeds fill up with slop, how judging the writing differs from guessing who wrote it, when AI-assisted writing is good, and what happens when a filter gets it wrong.",
             '<div class="cards-3">' + "".join(card(p, f'{p.get("minutes", 6)} min read') for p in pages_) + "</div>",
             "Explainers on low-value content: AI detection versus writing quality, useful AI-assisted writing, false positives, and why feeds fill with slop.")


def calc_widget(p):
    return (f'<div class="calc" data-calc="{esc(p["calc"])}" aria-live="polite"><noscript><p>This calculator needs JavaScript. '
            f'The arithmetic is written out below, so you can work it by hand.</p></noscript></div>')


def calculators():
    pages_ = sorted(LIVE_PAGES["calculators"], key=lambda p: p.get("order", 99))
    for p in pages_:
        app = {"@type": "WebApplication", "name": p["title"], "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any (runs in your browser)",
               "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}, "url": SITE + p["path"], "description": p["description"]}
        h, main = article(p, [("Home", ""), ("Calculators", "calculators/"), (p["title"], p["path"])], "calculators", esc(p["summary"]),
                          meta="free · runs in your browser · nothing is sent anywhere", before=calc_widget(p), ld_extra=app)
        emit(p["path"], h, main, 2)
    hub_page("calculators", "Slop calculators",
             "Work out what low-value content costs you: the attention it takes, the hours it adds up to, the inbox time it eats and how much a piece of writing actually says. Every calculator runs in your browser and shows its arithmetic.",
             f'<div class="cards-3">{"".join(card(p, "calculator") for p in pages_)}</div>',
             "Free calculators for the cost of slop: attention cost, scrolling versus reading time, newsletter reading budget and content value density.")


# ---------------------------------------------------------------- sitemaps
CORE = ["", "how-it-works.html", "about.html", "privacy.html", "help.html", "terms", "open-source", "media", "contact.html",
        # the brief for AI assistants: an orphan HTML page plus its Markdown source, and llms.txt
        "ask-ai", "ask-ai.md", "llms.txt"]
# Children another script writes: .github/scripts/state_of_slop/build.py owns sitemap-reports.xml. Listed in the index, never
# rewritten or removed here.
EXTERNAL = ["reports"]


def urlset(rows):
    body = "\n".join(f"  <url><loc>{SITE}{p}</loc>{f'<lastmod>{m}</lastmod>' if m else ''}</url>" for p, m in rows)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{body}\n</urlset>\n'


def sitemaps():
    """sitemap.xml is an index of one child per content family. Each page is in exactly one child, with the date its
    content last changed. Core addresses stay exactly as listed (some without .html, on purpose)."""
    kids = {"core": [(p, UPDATED[p]) for p in CORE]}
    for f in FAMILIES:
        rows = sorted((p["path"], p["lastmod"]) for p in LIVE_PAGES[f])
        if not rows:
            continue
        if f == "guides":
            nets = sorted({p["network"] for p in LIVE_PAGES[f]})
            rows += [(f"guides/{n}/", max(p["lastmod"] for p in LIVE_PAGES[f] if p["network"] == n)) for n in nets]
        hub_mod = max(m for _, m in rows)
        kids[f] = [(f"{f}/", hub_mod)] + sorted(rows)
    for old in glob.glob(f"{ROOT}/sitemap-*.xml"):
        if os.path.basename(old)[8:-4] not in kids and os.path.basename(old)[8:-4] not in EXTERNAL:
            os.remove(old)
    for k, rows in kids.items():
        write(f"sitemap-{k}.xml", urlset(rows))
    mods = {k: max(m for _, m in rows) for k, rows in kids.items()}
    for k in EXTERNAL:
        if os.path.exists(f"{ROOT}/sitemap-{k}.xml"):
            mods[k] = max(re.findall(r"<lastmod>([^<]+)</lastmod>", open(f"{ROOT}/sitemap-{k}.xml", encoding="utf-8").read()))
    idx = "\n".join(f"  <sitemap><loc>{SITE}sitemap-{k}.xml</loc><lastmod>{m}</lastmod></sitemap>" for k, m in mods.items())
    write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{idx}\n</sitemapindex>\n')


def clean_stale():
    """Remove built pages whose source is gone or not yet live (e.g. a guide moved to a later date)."""
    for f in FAMILIES:
        keep = {p["path"] for p in LIVE_PAGES[f]}
        if f == "glossary":
            keep |= {f"glossary/{slugify(a)}/" for p in LIVE_PAGES[f] for a in p.get("aliases") or [] if alias_page(slugify(a), p)}
        if f == "guides":
            keep |= {f"guides/{p['network']}/" for p in LIVE_PAGES[f]}
        for idx in glob.glob(f"{ROOT}/{f}/**/index.html", recursive=True):
            d = os.path.relpath(os.path.dirname(idx), ROOT) + "/"
            if d != f"{f}/" and d not in keep and os.path.exists(idx):
                shutil.rmtree(os.path.dirname(idx))
                print("removed", d)


def patch_xl():
    """xl/welcome.html and xl/checkout.html are hand-edited; keep their footer in step with everyone else's."""
    for f in ("xl/welcome.html", "xl/checkout.html"):
        s = open(f"{ROOT}/{f}", encoding="utf-8").read()
        a = s.index('<footer class="footer"'); b = s.index("</footer>", a) + len("</footer>")
        n = subdir(footer(None)); n = n[n.index('<footer class="footer"'):n.rindex("</footer>") + len("</footer>")]
        if s[a:b] != n:
            write(f, s[:a] + n + s[b:])


TELL_IDS = ["scroll-stopper", "engagement-bait", "hype-words", "empty-praise", "no-catch-promises", "not-x-but-y",
            "flowery-prose", "stiff-phrasing", "too-tidy-story"]
TELL_NAMES = ["Scroll-stopper", "Engagement bait", "Hype words", "Empty praise", "No-catch promises", "“Not X, but Y”",
              "Flowery prose", "Stiff phrasing", "Too-tidy story"]
NET_ORDER = [k for k, _ in NETWORKS]
PEOPLE = [("Jordan Ellis", "JE", "#5B6CD9"), ("Priya Nair", "PN", "#C2410C"), ("Sam Okafor", "SO", "#0F766E"), ("Maya Lindqvist", "ML", "#9333EA"),
          ("Tom Brennan", "TB", "#B45309"), ("Aisha Rahman", "AR", "#BE185D"), ("Luis Ortega", "LO", "#1D4ED8"), ("Hana Sato", "HS", "#4D7C0F")]
BYLINE = {"linkedin": "Founder · Helping teams grow · 3h", "x": "@{h} · 2h", "reddit": "u/{h} · r/productivity · 5h",
          "facebook": "Yesterday at 18:20 · 🌐", "substack": "Note · 4h", "medium": "8 min read · 2 days ago",
          "websites": "Published 12 September 2026", "email": "to me · 09:14"}
ACTS = {"linkedin": ["👍 1,204", "240 comments", "Repost", "Send"], "x": ["💬 312", "🔁 1.1K", "❤️ 8.4K", "📊 220K"],
        "reddit": ["⬆ 2.3k", "💬 418 comments", "Share"], "facebook": ["👍❤️ 3.1K", "870 comments", "412 shares"],
        "substack": ["♡ 96", "💬 41", "↻ Restack"], "medium": ["👏 1.2K", "💬 38", "Save"], "websites": ["Share", "Save", "Print"],
        "email": ["Reply", "Forward"]}
SUBJECTS = ["Quick question about your Q4 plans", "Re: following up", "This changes everything for teams like yours", "A quick win for you"]
NET_POINTS = {
    "linkedin": ["Reads every post in your feed ahead of you", "Folds broetry, bait and hype into a strip", "Shows why, and you get the last word"],
    "x": ["Reads posts and replies in your timeline", "Folds engagement farming and thread formulas", "Shows why, and you get the last word"],
    "reddit": ["Reads posts and comments as you scroll", "Folds karma farming and low-effort replies", "Shows why, and you get the last word"],
    "facebook": ["Reads feed posts, Pages and groups", "Folds bait posts and AI image pages", "Shows why, and you get the last word"],
    "substack": ["Reads Notes and posts in Substack", "Folds growth bait and padded posts", "Shows why, and you get the last word"],
    "medium": ["Reads stories in your feed and articles", "Folds SEO-padded listicles", "Shows why, and you get the last word"],
    "websites": ["Scores the articles and pages you open", "Flags content farms and filler", "Shows why, and you get the last word"],
    "email": ["Checks what each sender wrote, in Gmail and Outlook", "Marks cold-pitch filler and workslop", "Replaces personal details before checking"],
}
HUB_CHIPS = {
    "glossary": ("terms", "an A–Z of words for low-value content by people and by AI"),
    "patterns": ("tells", "the nine writing patterns Slop Mop scores"),
    "for": ("pages", "Slop Mop on every network and for every line of work"),
    "compare": ("comparisons", "Slop Mop next to the other tools people use to cut the noise"),
    "guides": ("guides", "weekly guides for each network"),
    "learn": ("explainers", "the ideas behind judging writing, not writers"),
    "calculators": ("calculators", "what low-value content costs you, worked out in your browser"),
}


def _h(s):
    import hashlib
    return int(hashlib.md5(s.encode()).hexdigest(), 16)


def _short(t, n):
    t = re.sub(r"\s+", " ", re.sub(r"\*\*|\*|`|\[([^\]]+)\]\([^)]+\)", lambda m: m.group(1) or "", t)).strip()
    return t if len(t) <= n else t[:n - 1].rsplit(" ", 1)[0].rstrip(",;:") + "…"


def first_example(body, kind="slop"):
    m = re.search(rf":::{kind}\n(.*?)\n:::", body, re.S)
    return re.sub(r"\n\s*\n", "\n\n", m.group(1).strip()) if m else None


def nets_in(p):
    text = (p["body"] + " " + p["title"]).lower()
    keys = {"linkedin": "linkedin", "x": r"\bx\b|twitter", "reddit": "reddit", "facebook": "facebook", "substack": "substack",
            "medium": "medium", "websites": r"website|blog|article", "email": r"email|gmail|outlook|inbox"}
    hits = sorted(((len(re.findall(rx, text)), k) for k, rx in keys.items()), reverse=True)
    return [k for c, k in hits if c][:6] or ["linkedin", "x", "reddit"]


def fig_network(p):
    f, sl = p["family"], p["slug"]
    if f == "guides":
        return p["network"]
    if f == "for" and p.get("kind") == "network":
        return sl
    if f == "compare":
        for keys, net in ((("sanebox", "unroll", "spam", "email"), "email"), (("kagi", "duckduckgo", "slop-evader", "reading", "rss", "ublock", "ad-blockers", "unhook"), "websites"),
                          (("social-fixer", "news-feed"), "facebook"), (("linkedin", "deslop", "cringe"), "linkedin"), (("pangram", "keyword"), "x")):
            if any(k in sl for k in keys):
                return net
    return nets_in(p)[0] if f == "for" else NET_ORDER[_h(sl) % len(NET_ORDER)]


def tell_values(p, strong):
    hv = _h(p["slug"])
    vals = [0.12 + ((hv >> (i * 3)) % 7) * 0.03 for i in range(9)]
    for j, i in enumerate(strong):
        vals[i] = 0.92 - 0.1 * j
    return [round(v, 2) for v in vals]


def page_images(p):
    """Specs for the page's header image, figure and share image (all unique to the page), plus their alt text."""
    f, sl, hv = p["family"], p["slug"], _h(p["slug"])
    related_tells = [TELL_IDS.index(r.split("/")[2]) for r in p.get("related", []) if r.startswith("/patterns/") and r.split("/")[2] in TELL_IDS]
    strong = ([p["order"] - 1] if f == "patterns" else []) + [t for t in related_tells if f != "patterns" or t != p["order"] - 1]
    if len(strong) < 2:
        strong += [x for x in (hv % 9, (hv // 9) % 9, (hv // 81) % 9) if x not in strong][:2 - len(strong)]
    strong = strong[:3]
    vals = tell_values(p, strong)
    net = fig_network(p)
    text = first_example(p["body"])
    if not text:
        for r in p.get("related", []):
            if r in BY_PATH and first_example(BY_PATH[r]["body"]):
                text = first_example(BY_PATH[r]["body"]); break
    text = _short(text or "Most people don't have a time problem. They have a priorities problem. Comment PLAN and I'll send you mine.", 420)
    score = 64 + hv % 29
    verdict = "likely" if score >= 72 else "possibly"
    mode = "highlight"
    fine = first_example(p["body"], "fine")
    if not fine:
        for r in p.get("related", []):
            if r in BY_PATH and first_example(BY_PATH[r]["body"], "fine"):
                fine = first_example(BY_PATH[r]["body"], "fine"); break
    name, ini, col = PEOPLE[hv % len(PEOPLE)]
    handle = name.split()[0].lower() + str(hv % 97)
    n = NET_NAME[net] if net != "websites" else "a website"
    item = "email" if net == "email" else "article" if net == "websites" else "post"
    t1, t2 = TELL_NAMES[strong[0]], TELL_NAMES[strong[1]]
    vword = "Likely slop" if verdict == "likely" else "Possibly slop"
    act = (f"In Highlight mode it stays visible and its mop turns {'red' if verdict == 'likely' else 'yellow'}"
           + ("; the useful one below is left alone with a blue mop." if fine else ".") + " In Hide mode it would fold into a strip you can reopen.")
    fig = {"mode": "fig", "net": net, "text": text, "author": name, "initials": ini, "avColor": col,
           "byline": BYLINE[net].format(h=handle), "acts": ACTS[net], "subject": SUBJECTS[hv % 4] if net == "email" else "",
           "verdict": verdict, "score": score, "tells": vals, "humanVoice": round(0.1 + (hv % 5) * 0.05, 2),
           "usefulness": round(0.05 + (hv % 4) * 0.04, 2), "readerResponse": round(0.3 + (hv % 6) * 0.08, 2),
           "community": {"probably": 6 + hv % 9, "maybe": 2 + hv % 4, "no": hv % 3}, "used": 40 + hv % 160}
    if fine:
        fn, fi, fc = PEOPLE[(hv + 3) % len(PEOPLE)]
        fig.update({"fine": _short(fine, 220), "fineAuthor": fn, "fineInitials": fi, "fineColor": fc,
                    "fineByline": BYLINE[net].format(h=fn.split()[0].lower() + str(hv % 89))})
    fig["caption"] = (f"Illustration: Slop Mop on {n}, marking an {item} like the example on this page. It scores {score} out of 100 "
                      f"({vword}); the strongest signs are {t1.lower()} and {t2.lower()}. {act}").replace("an post", "a post").replace("an email", "an email")
    fig["alt"] = f"Mock-up of a {NET_NAME[net]} {item} marked {vword} by Slop Mop, with the panel showing {t1} and {t2} as the strongest signs"
    url = "slopmop.lol/" + p["path"].rstrip("/")
    if f == "glossary":
        kind = {"ai": "about AI content", "human": "about human content", "both": "about AI and human content"}.get(p.get("kind"), "")
        since = f"since {p['first_seen']}" if p.get("first_seen") else ""
        see = ", ".join(BY_PATH[r]["term"] for r in p.get("related", []) if r.startswith("/glossary/") and r in BY_PATH)
        hero = {"mode": "hero", "family": f, "title": p["term"], "aka": ", ".join(p.get("aliases") or []), "line": p["punchline"],
                "tags": [t for t in ("glossary", kind, since, p.get("coined_by") and f"coined by {p['coined_by']}") if t][:4],
                "see": _short(see, 70), "letter": sort_key(p["term"])[:1].upper()}
        og = {"mode": "og", "family": f, "title": p["term"], "pos": " · ".join(x for x in ("noun", kind, since) if x), "line": p["punchline"], "url": url}
        hero_alt = f"Glossary card for {p['term']}: {p['punchline']}"
    elif f == "patterns":
        hero = {"mode": "hero", "family": f, "title": p["tell"], "order": p["order"], "values": vals, "line": p["short"][0].upper() + p["short"][1:] + ".",
                "quote": _short(first_example(p["body"]) or "", 150)}
        og = {"mode": "og", "family": f, "title": p["tell"], "order": p["order"], "values": vals, "line": _short(p["summary"], 120), "url": url}
        hero_alt = f"The Slopprint with the {p['tell'].lower()} spoke lit, tell {p['order']} of 9"
    elif f == "for":
        nets = [p["slug"]] if p.get("kind") == "network" else nets_in(p)
        aud = NET_NAME[p["slug"]] if p.get("kind") == "network" else p.get("audience") or p["title"].replace("Slop Mop for ", "")
        aud = aud[0].upper() + aud[1:]
        points = NET_POINTS[p["slug"]] if p.get("kind") == "network" else [
            "Reads " + ", ".join(("email" if k == "email" else NET_NAME[k]) for k in nets[:3]) + " ahead of you", "Folds hooks, bait and filler", "Shows why, and you get the last word"]
        hero = {"mode": "hero", "family": f, "title": aud, "points": points, "nets": nets[:6]}
        og = {"mode": "og", "family": f, "title": aud, "line": _short(p["summary"], 120), "nets": nets[:5], "url": url}
        hero_alt = f"Slop Mop for {aud}: " + "; ".join(points)
    elif f == "compare":
        rows = [[_short(r["row"], 26), _short(r["slopmop"], 58), _short(r["them"], 58)] for r in p.get("table", [])[:4]]
        hero = {"mode": "hero", "family": f, "them": p["them"], "rows": rows, "checked": nice_date(p["checked"]).lower()}
        what = next((r for r in p.get("table", []) if "does" in r["row"].lower() or "judge" in r["row"].lower()), (p.get("table") or [{"slopmop": "", "them": ""}])[0])
        og = {"mode": "og", "family": f, "us": _short(what["slopmop"], 70), "them": p["them"], "themLine": _short(what["them"], 70), "url": url}
        hero_alt = f"Comparison table: Slop Mop and {p['them']} side by side"
    elif f in ("learn", "calculators"):
        heads = [_short(h, 46) for h in re.findall(r"^## (.+)$", p["body"], re.M)][:4]
        hero = {"mode": "hero", "family": f, "title": _short(p["title"], 80), "steps": heads, "big": p.get("big", ""), "bigLabel": p.get("big_label", "")}
        og = {"mode": "og", "family": f, "title": p["title"], "line": _short(p["summary"], 130), "big": p.get("big", ""), "bigLabel": p.get("big_label", ""), "url": url}
        hero_alt = (f"{p['title']}: " + "; ".join(heads)) if f == "learn" else f"{p['title']}: {p.get('big', '')} {p.get('big_label', '')}".strip()
    else:
        steps = [_short(re.sub(r"^\d+\.\s*", "", h), 44) for h in re.findall(r"^## (.+)$", p["body"], re.M)][:4]
        hero = {"mode": "hero", "family": f, "net": p["network"], "title": _short(p["title"], 70), "minutes": p.get("minutes", 5), "steps": steps}
        og = {"mode": "og", "family": f, "net": p["network"], "title": p["title"], "line": _short(p["summary"], 130), "minutes": p.get("minutes", 5), "url": url}
        hero_alt = f"{NET_NAME[p['network']]} guide: {p['title']}, in {len(steps)} parts"
    return {"hero": hero, "og": og, "fig": fig, "hero_alt": hero_alt}


def hub_images(family):
    pages_ = LIVE_PAGES[family] or ALL[family]
    names = [x.get("term") or x.get("tell") or x.get("them") or x["title"].replace("Slop Mop for ", "") for x in pages_]
    unit, line = HUB_CHIPS[family]
    hero = {"mode": "hero", "family": "hub", "title": FAMILIES[family][1], "count": f"{len(pages_)} {unit}", "chips": [_short(n, 28) for n in names[:14]]}
    og = {"mode": "og", "family": "hub", "title": FAMILIES[family][1], "line": line[0].upper() + line[1:] + ".", "url": f"slopmop.lol/{family}"}
    return hero, og


def images_manifest():
    """Every image spec, for _build/images.js. Scheduled guides are included so their images are ready on the day."""
    rows = []
    for f in FAMILIES:
        for p in ALL[f]:
            if p.get("draft"):
                continue
            spec = page_images(p)
            for kind in ("og", "hero", "fig"):
                rows.append({"out": img(kind, p["path"]), "spec": spec[kind]})
        hero, og = hub_images(f)
        rows += [{"out": img("hero", f + "/"), "spec": hero}, {"out": img("og", f + "/"), "spec": og}]
    open(f"{ROOT}/_build/images_manifest.json", "w").write(json.dumps(rows, indent=1, ensure_ascii=False))


if __name__ == "__main__":
    print("today is", TODAY)
    clean_stale()
    glossary(); patterns(); for_pages(); compare(); guides(); learn(); calculators()
    sitemaps(); patch_xl(); images_manifest()
