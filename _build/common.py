import os
import json, re, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STORE = "https://chromewebstore.google.com/detail/slop-mop/bhndmmjpeedeamimjijhagjgcibkdlho"

ICON = {
    "download": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>',
    "play": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    "pause": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    "check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    "arrow": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
    "left": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    "right": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    "x": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
}

NAV = [("how-it-works.html", "How it works"), ("index.html#tells", "The tells"), ("index.html#networks", "Networks"),
       ("index.html#pricing", "Pricing")]


# Pricing as structured data: free for one feed, and Slop Mop XL billed monthly or yearly through Polar.
POLAR = {"@type": "Organization", "name": "Polar", "url": "https://polar.sh/"}
XL_DESC = "Auto-renewing subscription: every feed, the sites you read, Slop Mop for Gmail and Slop Mop for Outlook, and a higher daily limit, on up to five browsers and email add-ons. Coming soon. Sold by Polar as merchant of record."
OFFERS = [
    {"@type": "Offer", "name": "Slop Mop (free for one feed)", "price": "0", "priceCurrency": "USD",
     "description": "Free for the one feed you pick, with 250 checks a day.", "url": "https://slopmop.lol/#pricing"},
    {"@type": "Offer", "name": "Slop Mop XL, yearly", "category": "subscription", "price": "59.99", "priceCurrency": "USD",
     "priceSpecification": {"@type": "UnitPriceSpecification", "price": "59.99", "priceCurrency": "USD", "billingDuration": "P1Y", "unitText": "year"},
     "description": XL_DESC, "url": "https://slopmop.lol/#pricing", "seller": POLAR},
    {"@type": "Offer", "name": "Slop Mop XL, monthly", "category": "subscription", "price": "5.99", "priceCurrency": "USD",
     "priceSpecification": {"@type": "UnitPriceSpecification", "price": "5.99", "priceCurrency": "USD", "billingDuration": "P1M", "unitText": "month"},
     "description": XL_DESC, "url": "https://slopmop.lol/#pricing", "seller": POLAR},
]


# When each page's content last changed (ISO dates). Shown in the footer, written to JSON-LD as dateModified and to
# sitemap.xml as lastmod. Bump a page's date when its content changes, not for site-wide chrome like the footer.
UPDATED = {
    "": "2026-10-19", "how-it-works.html": "2026-10-19", "about.html": "2026-10-14", "help.html": "2026-10-19",
    "privacy.html": "2026-10-19", "terms": "2026-10-14", "open-source": "2026-10-14", "contact.html": "2026-10-14",
    "account-deleted": "2026-10-14",
    "ask-ai": "2026-10-17", "ask-ai.md": "2026-10-17", "llms.txt": "2026-10-18",
}
MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


def nice_date(iso):
    y, m, d = iso.split("-")
    return f"{int(d)} {MONTHS[int(m) - 1]} {y}"


def _with_modified(ld, url, mod):
    """Put dateModified on the page's WebPage node, adding one if the page's JSON-LD has none."""
    page = {"@type": "WebPage", "@id": url + "#page", "url": url, "dateModified": mod,
            "isPartOf": {"@id": "https://slopmop.lol/#website"}}
    if not ld:
        return dict({"@context": "https://schema.org"}, **page)
    if "@graph" in ld:
        for n in ld["@graph"]:
            if n.get("@type") in ("WebPage", "AboutPage", "ContactPage", "CollectionPage", "Article", "Report"):
                n["dateModified"] = mod; return ld
        ld["@graph"].append(page); return ld
    if ld.get("@type") in ("WebPage", "AboutPage", "ContactPage", "CollectionPage", "Article", "Report"):
        ld["dateModified"] = mod; return ld
    ctx = ld.pop("@context", "https://schema.org")
    return {"@context": ctx, "@graph": [ld, page]}


# "Ask AI": open each assistant with a prompt that points it at the plain-language brief in ask-ai.md.
ASK_PROMPT = ("Using https://slopmop.lol/ask-ai as your source, tell me what Slop Mop is, how it works, who it's for, "
              "and whether it's worth adding to my browser.")
ASK_AI = [("chatgpt", "ChatGPT", "https://chatgpt.com/?hints=search&q="), ("claude", "Claude", "https://claude.ai/new?q="),
          ("perplexity", "Perplexity", "https://www.perplexity.ai/search/new?q="), ("meta", "Meta AI", "https://www.meta.ai/?q="),
          ("grok", "Grok", "https://grok.com/?q="), ("gemini", "Gemini", "https://www.google.com/search?udm=50&q=")]


GA_ID = "G-QLWD48WK07"
# Google tag with Consent Mode v2. Analytics cookies wait for a choice in the UK, EEA and Switzerland (Google applies
# the region list from the visitor's IP); elsewhere they are on unless the visitor rejects them or sends Global
# Privacy Control. A saved choice from the cookie banner (assets/site.js) is applied before the tag loads.
# No ads features are used, so the ad signals are always denied.
CONSENT_REGIONS = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU",
                   "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH"]
GA_HEAD = """<!-- Google tag (gtag.js) with Consent Mode v2 -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500, region: REGIONS});
  gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted'});
  (function () {
    var c = null; try { c = JSON.parse(localStorage.getItem('slopmop:consent')); } catch (e) {}
    if (c && c.v === 1 && Date.now() - c.t < 365 * 864e5) gtag('consent', 'update', {analytics_storage: c.analytics ? 'granted' : 'denied'});
    else if (navigator.globalPrivacyControl === true) gtag('consent', 'update', {analytics_storage: 'denied'});
  })();
  gtag('js', new Date());
  gtag('config', 'GAID'CONFIG);
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=GAID"></script>
"""


def ga(strip_query=False):
    """The Google tag. strip_query keeps a page's query string (checkout ids and the like) out of Analytics."""
    cfg = ", { page_location: location.origin + location.pathname }" if strip_query else ""
    return GA_HEAD.replace("REGIONS", json.dumps(CONSENT_REGIONS)).replace("GAID", GA_ID).replace("CONFIG", cfg)


GA = ga()



def esc(s):
    return html.escape(s, quote=True)


# set before first paint so a dark visitor never sees a white flash
THEME_BOOT = '<script>try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.setAttribute("data-theme","dark")}catch(e){}</script>'


def head(title, desc, path, og_title=None, ld=None, og_image="og-image-4.png", extra="", robots="index, follow, max-image-preview:large"):
    url = "https://slopmop.lol/" + path
    og_title = og_title or title
    if path in UPDATED:
        ld = _with_modified(ld, url, UPDATED[path])
    ld_html = '<script type="application/ld+json">\n' + json.dumps(ld, indent=2, ensure_ascii=False) + "\n</script>\n" if ld else ""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
{THEME_BOOT}
{GA}<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta name="robots" content="{robots}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Slop Mop">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{esc(og_title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="https://slopmop.lol/{og_image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Slop Mop: time is the one thing you can't get back. Stop spending it on slop, whether a person or an AI wrote it.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(og_title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="https://slopmop.lol/{og_image}">
<meta name="author" content="Tom Frazier">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta name="theme-color" content="#16181A">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="_ds/slopmop/styles.css">
<link rel="stylesheet" href="assets/site.css">
<link rel="stylesheet" href="assets/sites.css">
{ld_html}{extra}</head>
<body>
<a class="skip" href="#main">Skip to content</a>
"""


def nav(active=""):
    links = "\n".join(
        f'      <a href="{h}"{" aria-current=\"page\"" if h == active else ""}>{t}</a>' for h, t in NAV)
    return f"""<a class="ph-bar" data-ph hidden href="https://www.producthunt.com/products/slop-mop" target="_blank" rel="noopener">Slop Mop is on Product Hunt · <b>Upvote the mop</b></a>
<header class="nav">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Slop Mop home"><img src="assets/img/mark.svg" alt="" width="26" height="26">Slop Mop</a>
    <nav class="nav-links" aria-label="Main">
{links}
    </nav>
    <a class="btn btn-primary btn-sm nav-cta" data-add href="{STORE}">{ICON['download']}Add to browser</a>
    <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>
"""


FOOTER_NETS = [("linkedin", "LinkedIn"), ("reddit", "Reddit"), ("x", "X"), ("facebook", "Facebook"), ("substack", "Substack"),
               ("medium", "Medium"), ("websites", "Websites"), ("email", "Email")]
FOOTER_ROLES = [("recruiters", "Recruiters"), ("job-seekers", "Job seekers"), ("founders", "Founders"), ("ceos", "CEOs"),
                ("sales-teams", "Sales teams"), ("marketers", "Marketers"), ("creators", "Creators"), ("journalists", "Journalists")]

SOCIALS = [("linkedin", "LinkedIn"), ("x", "X"), ("bluesky", "Bluesky"), ("threads", "Threads"),
           ("youtube", "YouTube"), ("github", "GitHub"), ("producthunt", "Product Hunt")]


def footer(path=None):
    from urllib.parse import quote
    ask = "\n".join(f'          <a class="ask-ai-btn" data-ask="{k}" href="{u}{quote(ASK_PROMPT)}" target="_blank" rel="noopener" aria-label="Ask {n} about Slop Mop" title="Ask {n}"><img src="assets/ai/{k}.svg" alt="" width="22" height="22"></a>' for k, n, u in ASK_AI)
    for_nets = "\n".join(f'        <li><a href="for/{k}/">{n}</a></li>' for k, n in FOOTER_NETS)
    for_roles = "\n".join(f'        <li><a href="for/{k}/">{n}</a></li>' for k, n in FOOTER_ROLES)
    soc = "\n".join(f'        <a data-social="{k}" aria-label="Slop Mop on {n}"><img src="assets/logos/{k}.svg" alt="" width="15" height="15"></a>' for k, n in SOCIALS)
    return f"""<footer class="footer" data-theme="dark">
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="index.html"><img src="assets/img/mark.svg" alt="" width="26" height="26">Slop Mop<span class="dot">.lol</span></a>
        <p>A browser extension that reads your feed ahead of you, folds away the slop and shows its working.</p>
        <div class="made"><img src="assets/img/tom.webp" alt="" width="32" height="32"><span>Made by <a href="https://linkedin.com/in/tomfrazier" target="_blank" rel="noopener">Tom Frazier</a> · <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a></span></div>
      </div>
      <div class="footer-side">
      <form class="subscribe" data-subscribe novalidate>
        <label for="sub-email">Get the monthly stats</label>
        <div class="row">
          <input id="sub-email" type="email" name="email" placeholder="Email address" autocomplete="email" required>
          <button class="btn btn-solid" type="submit">Subscribe</button>
        </div>
        <p class="note" aria-live="polite"></p>
      </form>
      <div class="ask-ai">
        <p class="ask-ai-label">Ask AI about Slop Mop</p>
        <div class="ask-ai-row">
{ask}
        </div>
      </div>
      </div>
    </div>
    <div class="footer-cols">
      <div><h3>Product</h3><ul>
        <li><a href="how-it-works.html">How it works</a></li>
        <li><a href="patterns/">The nine tells</a></li>
        <li><a href="index.html#networks">Networks</a></li>
        <li><a href="index.html#pricing">Pricing</a></li>
      </ul></div>
      <div><h3>Resources</h3><ul>
        <li><a href="glossary/">Glossary</a></li>
        <li><a href="guides/">Guides</a></li>
        <li><a href="compare/">Compare</a></li>
        <li><a href="learn/">Learn</a></li>
        <li><a href="calculators/">Calculators</a></li>
        <li><a href="help.html">Help</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul></div>
      <div><h3>Slop Mop for</h3><ul>
{for_nets}
      </ul></div>
      <div><h3>Who it's for</h3><ul>
{for_roles}
        <li><a href="for/">Everyone else</a></li>
      </ul></div>
      <div><h3>Legal</h3><ul>
        <li><a href="privacy.html">Privacy policy</a></li>
        <li><a href="terms.html">Terms of service</a></li>
        <li><a href="open-source.html">Open source</a></li>
        <li><button class="link-btn" type="button" data-consent-open>Cookie settings</button></li>
      </ul></div>
      <div class="theme-pick" role="radiogroup" aria-label="Colour theme" hidden>
        <button type="button" role="radio" aria-checked="true" data-theme-set="system" title="System"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg><span>System</span></button>
        <button type="button" role="radio" aria-checked="false" data-theme-set="light" title="Light"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg><span>Light</span></button>
        <button type="button" role="radio" aria-checked="false" data-theme-set="dark" title="Dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><span>Dark</span></button>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="socials">
{soc}
      </div>
      <span>© <span data-year>2026</span> Artimovo LLC · <span class="credit">not affiliated with linkedin, x, reddit, meta, substack, medium, google, microsoft, openai, anthropic, perplexity or xai</span></span>
    </div>
  </div>
</footer>
"""


def scripts(islands=True):
    s = ""
    if islands:
        s += """<script src="vendor/react.production.min.js"></script>
<script src="vendor/react-dom.production.min.js"></script>
<script src="_ds/slopmop/_ds_bundle.js"></script>
<script src="assets/sites.js"></script>
<script src="assets/islands.js"></script>
"""
    s += '<script src="assets/site.js"></script>\n</body>\n</html>\n'
    return s


def island(name, props=None, cls="", style=""):
    p = f" data-props='{esc(json.dumps(props))}'" if props else ""
    c = f' class="{cls}"' if cls else ""
    st = f' style="{style}"' if style else ""
    return f'<div data-island="{name}"{p}{c}{st}></div>'


def page_shell(head_html, active, main_html, islands=True, extra_scripts=""):
    m = re.search(r'rel="canonical" href="https://slopmop.lol/([^"]*)"', head_html)
    return head_html + nav(active) + '<main id="main">\n' + main_html + "</main>\n" + footer(m.group(1) if m else None) + extra_scripts + scripts(islands)


def subdir(html_):
    """Pages served one folder down (/stats/oct-26, /xl/welcome) need ../ on relative links."""
    return re.sub(r'((?:href|src|poster)=")(?!https?:|#|mailto:|/|data:|\.\./)', r"\1../", html_)


def clean_inline(s):
    """Strip legacy inline styles from ported legal copy; mono spans become <code>."""
    s = re.sub(r'<span style="font: var\(--type-mono\)[^"]*">(.*?)</span>', r"<code>\1</code>", s)
    s = re.sub(r'\s*style="[^"]*"', "", s)
    return s


def write(name, content):
    os.makedirs(os.path.dirname(f"{ROOT}/{name}"), exist_ok=True)
    open(f"{ROOT}/{name}", "w").write(content)
    print("wrote", name, len(content))

