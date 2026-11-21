#!/usr/bin/env python3
"""The announcement bar at the top of every page, written into the HTML.

The words live in SITE.announcement at the top of assets/site.js (show, tag, text,
shortText, cta, url). This script stamps them into every page that carries the bar, so
the bar is there on first paint (no JavaScript needed, nothing moves after load):

  - the bar's markup, in place of the old one. On phones the CSS swaps text for
    shortText. On the page the bar links to, the bar is left out.
  - a tiny inline script in <head>, right after the GetTerms banner (which must stay
    the first script), that hides the bar before paint for anyone who dismissed this
    url, and on the page it links to.

With show: false the bar comes out of every page (a marker comment keeps its place) and
the head script goes with it.

    python3 .github/scripts/announce.py           write the bar into every page
    python3 .github/scripts/announce.py --check   exit 1 if any page's bar is stale

After editing SITE.announcement: run this, then csp.py (the head script's hash goes in
each page's policy). The media and State of Slop builders run both for you.
"""
import html
import json
import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SITE_JS = os.path.join(ROOT, "assets", "site.js")
SKIP_DIRS = {".git", ".github", "node_modules", "vendor"}
KEY = "slopmop:announce-dismissed"  # site.js writes the dismissed url here

BAR_RE = re.compile(r'<div class="announce" data-announce\b[^>]*>.*?</div>|<!-- announcement bar: off \(announce\.py\) -->', re.S)
HEAD_RE = re.compile(r'<script data-announce-off>.*?</script>\n?', re.S)
GETTERMS_RE = re.compile(r'<script\b[^>]*src="https://gettermscmp\.com/[^"]*"[^>]*></script>\n?')
CSP_RE = re.compile(r'<meta http-equiv="Content-Security-Policy" content="[^"]*">\n?')
CHARSET_RE = re.compile(r'<meta charset="?utf-8"?>\n?', re.I)
OFF = "<!-- announcement bar: off (announce.py) -->"

MARK = ('<svg class="announce-mark" viewBox="0 0 24 24" aria-hidden="true"><rect x="10.6" y="2" width="2.8" height="12" rx="1.4" fill="currentColor"/>'
        '<path d="M5.2 13.6h13.6l-1.6 8.2H6.8z" fill="currentColor"/><path d="M8.6 16.6v4.6M12 16.6v4.6M15.4 16.6v4.6" stroke="var(--mop-500)" '
        'stroke-width="1.15" stroke-linecap="round"/></svg>')


def settings():
    """SITE.announcement from assets/site.js: string values as JSON strings, show as true/false."""
    src = open(SITE_JS, encoding="utf-8").read()
    m = re.search(r"\bannouncement:\s*\{(.*?)\n\s*\}", src, re.S)
    if not m:
        sys.exit("No announcement: { … } in assets/site.js")
    an = {}
    for k, v in re.findall(r'(\w+):\s*("(?:[^"\\]|\\.)*"|true|false)', m.group(1)):
        an[k] = json.loads(v)
    return an


def norm(path):
    """A path as the head script compares it: no .html, no index, no trailing slash."""
    return re.sub(r"/$", "", re.sub(r"/index$", "", re.sub(r"\.html$", "", path)))


def bar(an):
    e = lambda s: html.escape(s or "", quote=True)  # noqa: E731
    text = an.get("text") or ""
    return ('<div class="announce" data-announce><a class="announce-link" href="%s">%s'
            '<span class="announce-tag" data-announce-tag>%s</span>'
            '<span class="announce-text" data-announce-text><span class="announce-full">%s</span><span class="announce-short">%s</span></span>'
            '<span class="announce-cta" data-announce-cta>%s</span></a>'
            '<button type="button" class="announce-x" data-announce-x aria-label="Dismiss announcement">&times;</button></div>') % (
        e(an["url"]), MARK, e(an.get("tag") or "New"), e(text), e(an.get("shortText") or text), e(an.get("cta")))


def head_script(an):
    u = json.dumps(norm(an["url"]))
    return ('<script data-announce-off>(function(){var u=%s,d=document.documentElement,p=location.pathname.replace(/\\.html$/,"")'
            '.replace(/\\/index$/,"").replace(/\\/$/,"");if(p===u)d.classList.add("announce-off");'
            'try{if(localStorage.getItem("%s")===%s)d.classList.add("announce-off")}catch(e){}})()</script>\n') % (u, KEY, json.dumps(an["url"]))


def pages():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = sorted(d for d in dirnames if d not in SKIP_DIRS)
        for f in sorted(filenames):
            if f.endswith(".html"):
                yield os.path.join(dirpath, f)


def page_path(path):
    """The address a file is served at, e.g. /reports/state-of-slop-october-2026 or /help."""
    return norm("/" + os.path.relpath(path, ROOT).replace(os.sep, "/"))


def stamp(page_html, an, where):
    """The page with its bar and head script brought up to date, or None if it has no bar."""
    if not BAR_RE.search(page_html):
        return None
    on = bool(an.get("show")) and bool(an.get("url"))
    here = on and where == norm(an["url"])  # the page the bar links to: no bar
    page_html = BAR_RE.sub(lambda _: bar(an) if on and not here else OFF, page_html, 1)
    page_html = HEAD_RE.sub("", page_html)
    if on and not here:
        script = head_script(an)
        anchor = None
        for anchor in GETTERMS_RE.finditer(page_html):
            pass  # the last GetTerms script: theirs stays first, ours goes right after
        anchor = anchor or CSP_RE.search(page_html) or CHARSET_RE.search(page_html)
        if anchor:
            end = anchor.end()
            if not anchor.group(0).endswith("\n"):
                script = script.rstrip("\n")
            page_html = page_html[:end] + script + page_html[end:]
    return page_html


def run(check=False):
    an = settings()
    stale = []
    for path in pages():
        old = open(path, encoding="utf-8").read()
        new = stamp(old, an, page_path(path))
        if new is None or new == old:
            continue
        rel = os.path.relpath(path, ROOT)
        stale.append(rel)
        if not check:
            open(path, "w", encoding="utf-8").write(new)
    for rel in stale:
        print(("stale announcement bar: " if check else "updated announcement bar: ") + rel)
    return 1 if check and stale else 0


if __name__ == "__main__":
    sys.exit(run(check="--check" in sys.argv[1:]))
