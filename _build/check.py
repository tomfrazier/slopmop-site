"""Checks every page in _content/ before it ships: required fields, lengths, links that go nowhere (including a guide
linking to one that publishes later), and the stock phrases our own writing must avoid. Exit code 1 on errors.
Run from _build/: python3 check.py"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REQ = ["title", "seo_title", "description", "summary", "updated", "related"]
FAM = {"glossary": ["term", "aliases", "punchline", "kind"], "patterns": ["tell", "short", "order"],
       "for": ["kind", "audience"], "compare": ["kind", "them", "checked", "table", "verdict"],
       "guides": ["network", "publish_date", "verified", "minutes"]}
BANNED = r"\b(game[- ]chang\w*|unlock\w*|elevat\w*|revolutioni[sz]\w*|seamless\w*|robust|cutting[- ]edge|leverag\w*|empower\w*|supercharg\w*|delv\w*|tapestry|symphony|furthermore|moreover|in conclusion|it'?s worth noting|in today'?s fast[- ]paced|ultimately,)"

pages, errors, warns = {}, [], []
for f in glob.glob(f"{ROOT}/_content/*/*.md"):
    fam, slug = f.split("/")[-2], os.path.basename(f)[:-3]
    try:
        _, fm, body = open(f, encoding="utf-8").read().split("---\n", 2)
        m = json.loads(fm)
    except Exception as e:
        errors.append(f"{fam}/{slug}: can't parse frontmatter ({e})"); continue
    path = f"/guides/{m.get('network')}/{slug}/" if fam == "guides" else f"/{fam}/{slug}/"
    pages[path] = (fam, slug, m, body)

known = set(pages) | {"/", "/how-it-works.html", "/help.html", "/about.html", "/privacy.html", "/terms.html", "/contact.html",
                      "/open-source.html", "/glossary/", "/patterns/", "/for/", "/compare/", "/guides/", "/index.html"}
known |= {f"/guides/{p.split('/')[2]}/" for p in pages if p.startswith("/guides/")}

for path, (fam, slug, m, body) in sorted(pages.items()):
    name = f"{fam}/{slug}"
    for k in REQ + FAM.get(fam, []):
        if k not in m:
            errors.append(f"{name}: missing {k}")
    if len(m.get("seo_title", "")) > 65:
        warns.append(f"{name}: seo_title is {len(m['seo_title'])} characters")
    if not 100 <= len(m.get("description", "")) <= 165:
        warns.append(f"{name}: description is {len(m.get('description', ''))} characters")
    mine = m.get("publish_date", "0000")
    links = list(m.get("related", [])) + re.findall(r"\]\((/[^)\s#]*)", body)
    for link in links:
        target = link.split("#")[0]
        if not target.endswith("/") and not target.endswith(".html"):
            target += "/"
        if target not in known:
            errors.append(f"{name}: link to {link} goes nowhere")
        elif target in pages and pages[target][2].get("publish_date", "0000") > mine:
            errors.append(f"{name}: links to {link}, which publishes later ({pages[target][2]['publish_date']})")
    prose = re.sub(r":::(slop|fine|example)\n.*?\n:::", "", body, flags=re.S)
    prose = re.sub(r"[\"“‘'][^\"”’'\n]{0,80}[\"”’']", "", prose)  # quoted words are examples, not our voice
    for w in sorted({x.group(0).lower() for x in re.finditer(BANNED, prose, re.I)}):
        warns.append(f"{name}: uses '{w}' outside an example or quote")
    if prose.count("—") > 3:
        warns.append(f"{name}: {prose.count('—')} em dashes")
    if re.search(r"\bJev\b|TypeSafe|graphite\.io", body + json.dumps(m)):
        errors.append(f"{name}: names Jev/TypeSafe or links Graphite")

print(f"{len(pages)} pages checked")
for w in warns:
    print("warn ", w)
for e in errors:
    print("ERROR", e)
sys.exit(1 if errors else 0)
