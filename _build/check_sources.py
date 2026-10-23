"""Fetches every source URL cited in _content/ and lists the ones that don't load (run by hand; some sites refuse
robots with 403, so a failure here means "look at it", not "it's wrong"). Run from _build/: python3 check_sources.py"""
import concurrent.futures, glob, json, os, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
urls = {}
for f in glob.glob(f"{ROOT}/_content/*/*.md"):
    m = json.loads(open(f, encoding="utf-8").read().split("---\n", 2)[1])
    for s in m.get("sources", []):
        urls.setdefault(s["url"], []).append(os.path.relpath(f, f"{ROOT}/_content"))


def fetch(u):
    req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return u, r.status
    except urllib.error.HTTPError as e:
        return u, e.code
    except Exception as e:
        return u, type(e).__name__


with concurrent.futures.ThreadPoolExecutor(16) as ex:
    res = list(ex.map(fetch, sorted(urls)))
bad = [(u, s) for u, s in res if s != 200]
print(f"{len(res)} source URLs, {len(bad)} didn't return 200")
for u, s in bad:
    print(s, u, "←", ", ".join(urls[u]))
