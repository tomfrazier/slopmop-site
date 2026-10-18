"""sitemap.xml from UPDATED: lastmod for every page. Addresses stay exactly as listed (some without .html, on purpose)."""
from common import *

PAGES = [("", "weekly", "1.0"), ("how-it-works.html", "monthly", "0.8"), ("about.html", "monthly", "0.8"),
         ("privacy.html", "monthly", "0.5"), ("help.html", "monthly", "0.6"), ("terms", "yearly", "0.3"),
         ("open-source", "monthly", "0.5"), ("contact.html", "yearly", "0.4"),
         # the brief for AI assistants: an orphan HTML page plus its Markdown source, and llms.txt
         ("ask-ai", "monthly", "0.6"), ("ask-ai.md", "monthly", "0.5"), ("llms.txt", "monthly", "0.4")]

rows = "\n".join(f'  <url><loc>https://slopmop.lol/{p}</loc><lastmod>{UPDATED[p]}</lastmod><changefreq>{c}</changefreq><priority>{pr}</priority></url>' for p, c, pr in PAGES)
write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{rows}\n</urlset>\n')
