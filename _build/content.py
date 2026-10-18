"""The content library: glossary, patterns, for, compare and guides, built from _content/<family>/<slug>.md, plus every
sitemap. Run after home.py, pages.py and askai.py (it rewrites the footer of the hand-edited xl/ pages too).

Each source file is JSON frontmatter between --- lines, then Markdown (format in _content/WRITING.md). A page goes live
when its publish_date (guides) is today or earlier, in UTC; .github/workflows/publish.yml rebuilds daily so scheduled
guides appear on their date with their hub links and sitemap entries. SLOPMOP_TODAY=YYYY-MM-DD overrides the date
for previews.
"""
import datetime, glob, html as H, shutil
from urllib.parse import quote
from common import *
import pages as P

CONTENT = f"{ROOT}/_content"
TODAY = os.environ.get("SLOPMOP_TODAY") or datetime.datetime.now(datetime.timezone.utc).date().isoformat()
SITE = "https://slopmop.lol/"

FAMILIES = {
    "glossary": ("Glossary", "The slop glossary"),
    "patterns": ("The nine tells", "The nine tells of slop"),
    "for": ("Slop Mop for", "Who Slop Mop is for"),
    "compare": ("Compare", "Slop Mop compared"),
    "guides": ("Guides", "Guides to a better feed"),
}
NETWORKS = [("linkedin", "LinkedIn"), ("reddit", "Reddit"), ("x", "X"), ("facebook", "Facebook"), ("substack", "Substack"),
            ("medium", "Medium"), ("websites", "Websites & blogs"), ("email", "Email")]
NET_NAME = dict(NETWORKS)
LIVE = {"linkedin"}


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
    f = "assets/og/" + path.strip("/").replace("/", "-") + ".png"
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
    if network and network not in LIVE:
        n = NET_NAME[network]
        return f'''<aside class="cta-card">
  <div><span class="badge badge-soon">{esc(n)} · coming soon</span><h2>Slop Mop for {esc(n)} isn't out yet</h2><p>It works on LinkedIn today. Get the monthly email and we'll say there when {esc(n)} support arrives.</p></div>
  <form class="subscribe" data-subscribe novalidate>
    <label for="cta-email" class="sr-only">Email address</label>
    <div class="row"><input id="cta-email" type="email" name="email" placeholder="Email address" autocomplete="email" required><button class="btn btn-solid" type="submit">Subscribe</button></div>
    <p class="note" aria-live="polite"></p>
  </form>
</aside>'''
    return f'''<aside class="cta-card">
  <div><h2>Fold the slop out of your feed</h2><p>Slop Mop reads LinkedIn ahead of you, folds away the slop and shows its working. Free for one feed, 250 checks a day.</p></div>
  <a class="btn btn-primary" data-add href="{STORE}">{ICON['download']}Add to browser, free</a>
</aside>'''


def article(p, crumbs, eyebrow, lede, meta="", visual="", before="", after="", ld_extra=None, network=None, share_text=None):
    body, toc = md(p["body"])
    url = SITE + p["path"]
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "WebPage", "@id": url + "#page", "url": url, "name": p["title"], "description": p["description"],
         "inLanguage": "en", "datePublished": p.get("publish_date") or p.get("updated"), "dateModified": p["lastmod"],
         "isPartOf": {"@id": SITE + "#website"}, "breadcrumb": {"@id": url + "#crumbs"},
         "publisher": {"@type": "Organization", "name": "Artimovo LLC", "url": SITE}},
        dict(crumbs_ld(crumbs), **{"@id": url + "#crumbs"})]}
    if ld_extra:
        ld["@graph"].append(ld_extra)
    h = head(p["seo_title"], p["description"], p["path"], og_title=p["title"], ld=ld, og_image=og_for(p["path"]))
    sh = share(p["path"], share_text or p["title"])
    tail = (f'<div class="page-tail">{sh}<span class="mono">updated {nice_date(p["lastmod"]).lower()}</span></div>'
            + after + related_html(p) + sources_html(p) + cta(network))
    main = P.page_head(eyebrow, esc(p["title"]), lede, meta=meta, visual=visual)
    main = main.replace('<span class="eyebrow">', crumbs_html(crumbs) + '<span class="eyebrow">', 1)
    main += P.toc_page(toc, before + body + tail)
    return h, main


def emit(path, h, main, depth):
    write(path + "index.html", rel(page_shell(h, "", main, islands=False), depth))


def hub_page(family, title, lede, inner, desc, depth=1, extra_ld=None, visual=""):
    path = f"{family}/"
    url = SITE + path
    crumbs = [("Home", ""), (FAMILIES[family][0], path)]
    ld = {"@context": "https://schema.org", "@graph": [
        {"@type": "CollectionPage", "@id": url + "#page", "url": url, "name": title, "description": desc, "inLanguage": "en",
         "isPartOf": {"@id": SITE + "#website"}, "dateModified": max([p["lastmod"] for p in LIVE_PAGES[family]] or [TODAY])},
        dict(crumbs_ld(crumbs), **{"@id": url + "#crumbs"})]}
    if extra_ld:
        ld["@graph"].append(extra_ld)
    h = head(f"{title} · Slop Mop", desc, path, og_title=title, ld=ld, og_image=og_for(path))
    main = P.page_head(FAMILIES[family][0].lower(), esc(title), lede, visual=visual)
    main = main.replace('<span class="eyebrow">', crumbs_html(crumbs, last=True) + '<span class="eyebrow">', 1)
    main += f'<section class="section hub">\n  <div class="wrap">\n{inner}\n  </div>\n</section>\n'
    write(path + "index.html", rel(page_shell(h, "", main, islands=False), depth))


# ---------------------------------------------------------------- glossary
TELLS = sorted(LIVE_PAGES["patterns"], key=lambda p: p.get("order", 99))


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
                          share_text=f'{p["term"]}: {p["punchline"]}')
        emit(p["path"], h, main, 2)
        # aliases get their own short address that forwards to the term, so "slopmop.lol/glossary/ai-dar" works too
        for a in aka:
            s = slugify(a)
            if s and s != p["slug"] and not os.path.exists(f"{CONTENT}/glossary/{s}.md"):
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
    inner = f'''<div class="gl-tools">
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
             extra_ld=dts)


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


# ---------------------------------------------------------------- sitemaps
CORE = ["", "how-it-works.html", "about.html", "privacy.html", "help.html", "terms", "open-source", "contact.html",
        # the brief for AI assistants: an orphan HTML page plus its Markdown source, and llms.txt
        "ask-ai", "ask-ai.md", "llms.txt"]


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
        if os.path.basename(old)[8:-4] not in kids:
            os.remove(old)
    for k, rows in kids.items():
        write(f"sitemap-{k}.xml", urlset(rows))
    idx = "\n".join(f"  <sitemap><loc>{SITE}sitemap-{k}.xml</loc><lastmod>{max(m for _, m in rows)}</lastmod></sitemap>" for k, rows in kids.items())
    write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{idx}\n</sitemapindex>\n')


def clean_stale():
    """Remove built pages whose source is gone or not yet live (e.g. a guide moved to a later date)."""
    for f in FAMILIES:
        keep = {p["path"] for p in LIVE_PAGES[f]}
        if f == "glossary":
            keep |= {f"glossary/{slugify(a)}/" for p in LIVE_PAGES[f] for a in p.get("aliases") or []}
        if f == "guides":
            keep |= {f"guides/{p['network']}/" for p in LIVE_PAGES[f]}
        for idx in glob.glob(f"{ROOT}/{f}/**/index.html", recursive=True):
            d = os.path.relpath(os.path.dirname(idx), ROOT) + "/"
            if d != f"{f}/" and d not in keep:
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


def og_manifest():
    """What each page's share image says, for _build/og.js (run by hand; images are committed). Includes scheduled
    guides so their image is ready on the day."""
    rows = []
    for f in FAMILIES:
        for p in ALL[f]:
            if p.get("draft"):
                continue
            if f == "glossary":
                eyebrow, title, line = "the slop glossary", p["term"], p["punchline"]
            elif f == "patterns":
                eyebrow, title, line = f"the nine tells · {p['order']} of 9", p["tell"], p["short"][0].upper() + p["short"][1:]
            elif f == "guides":
                eyebrow, title, line = f"guides · {NET_NAME[p['network']].lower()}", p["title"], p["summary"]
            else:
                eyebrow, title, line = FAMILIES[f][0].lower(), p["title"], p["summary"]
            rows.append({"out": "assets/og/" + p["path"].strip("/").replace("/", "-") + ".png", "eyebrow": eyebrow,
                         "title": title, "line": line, "url": "slopmop.lol/" + p["path"].rstrip("/")})
        rows.append({"out": f"assets/og/{f}.png", "eyebrow": "slop mop", "title": FAMILIES[f][1], "line": "", "url": f"slopmop.lol/{f}"})
    open(f"{ROOT}/_build/og_manifest.json", "w").write(json.dumps(rows, indent=1, ensure_ascii=False))


if __name__ == "__main__":
    print("today is", TODAY)
    clean_stale()
    glossary(); patterns(); for_pages(); compare(); guides()
    sitemaps(); patch_xl(); og_manifest()
