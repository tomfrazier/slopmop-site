#!/usr/bin/env python3
"""Content-Security-Policy for every page on the site.

GitHub Pages can't send response headers, so the policy goes in each page as
<meta http-equiv="Content-Security-Policy">, right after <meta charset>, ahead of
any script. Each page allows its own inline scripts by their sha256 hashes, so
an injected script runs nowhere; JSON-LD blocks are data, not scripts, and need
no hash.

    python3 .github/scripts/csp.py           write or refresh the tag on every page
    python3 .github/scripts/csp.py --check   exit 1 if any page's tag is missing or stale

Run it after changing any inline <script> or adding a page. The media and State of
Slop builders run it for you. A meta policy can't set frame-ancestors, report-uri
or sandbox; those need a real header (see the README).
"""
import base64
import hashlib
import os
import re
import sys
from urllib.parse import urlsplit

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SKIP_DIRS = {".git", ".github", "node_modules", "vendor"}

# What every page may load beyond itself. Google Analytics' hosts are as Google
# documents them for GA4; Formspree takes the newsletter and contact forms; the XL
# pages ask the API for a checkout link and embed Polar's checkout.
POLICY = [
    ("default-src", ["'self'"]),
    ("script-src", ["'self'", "https://*.googletagmanager.com"]),
    ("style-src", ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"]),
    ("font-src", ["'self'", "https://fonts.gstatic.com"]),
    ("img-src", ["'self'", "data:", "https://*.google-analytics.com", "https://*.googletagmanager.com"]),
    ("connect-src", ["'self'", "https://*.google-analytics.com", "https://*.analytics.google.com",
                     "https://*.googletagmanager.com", "https://formspree.io",
                     "https://api.slopmop.lol", "https://staging-api.slopmop.lol"]),
    ("frame-src", ["'self'", "https://polar.sh", "https://*.polar.sh"]),
    ("media-src", ["'self'"]),
    ("object-src", ["'none'"]),
    ("base-uri", ["'self'"]),
    ("form-action", ["'self'"]),
    ("upgrade-insecure-requests", []),
]

TAG_RE = re.compile(r'<meta http-equiv="Content-Security-Policy" content="[^"]*">\n?')
CHARSET_RE = re.compile(r'<meta charset="?utf-8"?>\n?', re.I)
SCRIPT_RE = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.S | re.I)
SRC_RE = re.compile(r'\bsrc="([^"]+)"', re.I)
TYPE_RE = re.compile(r'\btype="([^"]+)"', re.I)
DATA_TYPES = {"application/ld+json", "application/json", "importmap", "speculationrules"}


def pages():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = sorted(d for d in dirnames if d not in SKIP_DIRS)
        for f in sorted(filenames):
            if f.endswith(".html"):
                yield os.path.join(dirpath, f)


def policy_for(html):
    """The policy a page needs: the shared one, plus its inline scripts' hashes and any external script it names."""
    hashes, external = [], []
    for attrs, body in SCRIPT_RE.findall(TAG_RE.sub("", html)):
        src = SRC_RE.search(attrs)
        if src:
            u = urlsplit(src.group(1))
            if u.scheme == "https" and not u.netloc.endswith("googletagmanager.com"):
                exact = "https://%s%s" % (u.netloc, u.path)
                if exact not in external:
                    external.append(exact)
            continue
        kind = TYPE_RE.search(attrs)
        if kind and kind.group(1).lower() in DATA_TYPES:
            continue
        digest = "'sha256-%s'" % base64.b64encode(hashlib.sha256(body.encode("utf-8")).digest()).decode()
        if digest not in hashes:
            hashes.append(digest)
    parts = []
    for name, sources in POLICY:
        if name == "script-src":
            sources = sources + external + hashes
        parts.append(" ".join([name] + sources))
    return "; ".join(parts)


def with_tag(html):
    tag = '<meta http-equiv="Content-Security-Policy" content="%s">\n' % policy_for(html)
    html = TAG_RE.sub("", html)
    m = CHARSET_RE.search(html)
    if not m:
        return None
    if not m.group(0).endswith("\n"):
        tag = tag.rstrip("\n")  # a page written on one line stays on one line
    return html[:m.end()] + tag + html[m.end():]


def run(check=False):
    stale, missing = [], []
    for path in pages():
        html = open(path, encoding="utf-8").read()
        new = with_tag(html)
        rel = os.path.relpath(path, ROOT)
        if new is None:
            missing.append(rel)
            continue
        if new != html:
            stale.append(rel)
            if not check:
                open(path, "w", encoding="utf-8").write(new)
    for rel in missing:
        print("no <meta charset> to put the policy after:", rel)
    for rel in stale:
        print(("stale or missing policy: " if check else "updated policy: ") + rel)
    return 1 if missing or (check and stale) else 0


if __name__ == "__main__":
    sys.exit(run(check="--check" in sys.argv[1:]))
