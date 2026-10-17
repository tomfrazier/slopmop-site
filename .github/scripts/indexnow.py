"""Tell IndexNow (Bing, Yandex, Seznam, Naver and others) which pages changed, so they re-crawl them quickly.

Run after GitHub Pages has deployed. With --all it submits every page in sitemap.xml; otherwise the .html files changed by
the deployed commit, plus any changed .md or .txt file the sitemap lists. Pages marked noindex are skipped. The key is the 32-hex-character .txt file at the
repository root, which IndexNow fetches from https://slopmop.lol/<key>.txt to check we own the site.
"""
import glob, json, os, re, subprocess, sys, urllib.request

HOST = "slopmop.lol"
keys = [os.path.basename(p)[:-4] for p in glob.glob("*.txt") if re.fullmatch(r"[0-9a-f]{32}\.txt", os.path.basename(p))]
if not keys:
    sys.exit("No IndexNow key file found at the repository root.")
KEY = keys[0]


def page_url(path):
    """The page's own canonical URL, or None if it shouldn't be indexed."""
    try:
        html = open(path, encoding="utf-8").read()
    except FileNotFoundError:
        return None
    robots = re.search(r'<meta name="robots" content="([^"]*)"', html)
    if robots and "noindex" in robots.group(1):
        return None
    canon = re.search(r'<link rel="canonical" href="([^"]+)"', html)
    return canon.group(1) if canon else None


if "--all" in sys.argv:
    urls = re.findall(r"<loc>([^<]+)</loc>", open("sitemap.xml", encoding="utf-8").read())
else:
    changed = subprocess.run(["git", "diff", "--name-only", "HEAD^1", "HEAD"], capture_output=True, text=True, check=True).stdout.split()
    urls = {u for f in changed if f.endswith(".html") for u in [page_url(f)] if u}
    # Markdown and text files (ask-ai.md, llms.txt) have no canonical tag: submit them when the sitemap lists them.
    listed = set(re.findall(r"<loc>([^<]+)</loc>", open("sitemap.xml", encoding="utf-8").read()))
    urls |= {f"https://{HOST}/{f}" for f in changed if f.endswith((".md", ".txt"))} & listed
    urls = sorted(urls)

urls = [u for u in urls if u.startswith(f"https://{HOST}/")]
if not urls:
    print("No indexable pages changed; nothing to submit.")
    sys.exit(0)

body = json.dumps({"host": HOST, "key": KEY, "keyLocation": f"https://{HOST}/{KEY}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, headers={"Content-Type": "application/json; charset=utf-8"})
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print(f"IndexNow answered {r.status} for {len(urls)} URL(s):")
except urllib.error.HTTPError as e:
    # 200/202 are success; 422 means a URL isn't on this host or the key didn't match; 429 means slow down.
    print(f"IndexNow answered {e.code}: {e.read().decode(errors='replace')[:300]}")
    if e.code not in (200, 202):
        sys.exit(1)
print("\n".join("  " + u for u in urls))
