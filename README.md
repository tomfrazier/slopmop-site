# slopmop-site

Marketing site for [Slop Mop](https://slopmop.lol) — a free browser extension that reads your feed ahead of you and folds away low-value writing. The extension and judging server live in a private repo (the original MIT version is public at github.com/tomfrazier/slopmop and linked from `/open-source`); this repo is the static site only.

## Structure

```
index.html          landing page
how-it-works.html   the details panel, the nine tells, the three counter-signals
about.html          canonical product information
help.html           install + troubleshooting
privacy.html        privacy policy (embedded from GetTerms)
terms.html          terms of service (embedded from GetTerms, served at /terms)
acceptable-use.html acceptable use policy (embedded from GetTerms, served at /acceptable-use)
open-source.html    the MIT-licensed version, links to the public repo (served at /open-source)
media.html          press kit (served at /media), built by .github/scripts/media/build.py with media.png and press/
_ds/slopmop/        Slop Mop design system: tokens, styles.css, _ds_bundle.js (components), mop.svg
assets/site.css     site layout on top of the design-system tokens
assets/site.js      site settings + behaviour (store link, Product Hunt, social URLs, signup, tour video)
assets/islands.js   mounts live design-system components into the pages
assets/sites.js     hero mockups of each host site (LinkedIn, X, Reddit, Facebook, Substack, Medium, email, websites)
assets/sites.css    styles for those mockups
assets/logos/       network and social marks (simple-icons)
vendor/             React 18.3.1 UMD, self-hosted so the components need no CDN
og-image-3.png      1200x630 share image (og:image); og-image-2.png and og-image.png are older versions
favicon.svg         favicon (+ PNG fallbacks and apple-touch-icon)
site.webmanifest    icon manifest
CNAME               slopmop.lol
```

Everything is static. No build step, no dependencies, no package.json: serve the folder (`python3 -m http.server`) and open it. The pages are plain HTML; the design-system pieces (fold strip, details panel, Slopprint, mop icons) render into `data-island` placeholders.

## Site settings

Store link, Product Hunt link, the monthly-stats endpoint and the footer social links live at the top of `assets/site.js`:

```js
var SITE = {
  storeUrl: "https://chromewebstore.google.com/detail/slop-mop/…",
  productHuntUrl: "https://www.producthunt.com/products/slop-mop",   // "" removes the top bar
  emailEndpoint: "https://formspree.io/f/xaenejjw",
  announcementBar: false,   // true shows the Product Hunt bar again
  social: { linkedin: "", x: "", bluesky: "", threads: "", youtube: "", github: "", producthunt: "" }
};
```

A social icon stays hidden until its URL is filled in.

Google Analytics (`G-QLWD48WK07`) is in the `<head>` of every page, with Consent Mode v2. The cookie banner is GetTerms (app.getterms.io; banner settings, wording and regions live there, not in this repo):

- GetTerms' embed must be the **first script** in each page's `<head>`. Its blocker script sets `window.GetTermsDefaults` (the visitor's region default: opt-in in Europe, the UK and anywhere not listed; opt-out in the US and Canada; no banner in Australia). The gtag snippet right after it sends `gtag('consent', 'default', …)`: the visitor's saved choice (`localStorage.getterms_cookie_consent`) if they have one, otherwise that region default. GetTerms sends `gtag('consent', 'update', …)` when the visitor chooses.
- The footer's "Cookie settings" buttons carry `data-gt-cookie-widget-show`, which reopens GetTerms' preferences. `assets/site.js` clears old `_ga` cookies when Analytics is off.
- GetTerms logs each choice to `gettermscmp.com` (allowed in `csp.py`). Script and iframe blocking are off: Consent Mode covers GA, and blocking would break Polar's checkout.
- The XL pages strip the query string from `page_location`, so checkout ids never reach GA.

Events sent (register `link_location` and `lead_source` as custom dimensions in GA; mark `add_to_browser` and `generate_lead` as key events):

| Event | When | Parameters |
| --- | --- | --- |
| `add_to_browser` | any "Add to browser" link is clicked (on desktop, or "Send to my computer" on Chrome on a phone) | `link_location` (nav, footer, hero, pricing…), `link_url` |
| `install_cta_click` | any install button is pressed | `variant` (`desktop`, `chrome_mobile`, `other_mobile`), `link_location` |
| `generate_lead` | newsletter signup, contact form, or "send to my computer" is sent successfully | `lead_source` (`newsletter`, `contact_form` or `send_to_computer`), `form_location`; for `send_to_computer` also `variant` |
| `tour_open` | "Take a tour" opens the video | `link_location` |
| `begin_checkout` | the XL checkout opens on `xl/checkout` | `currency` |

Page views, scrolls, outbound clicks and form starts come from GA's enhanced measurement.

## Install buttons on phones

Phones can't install a browser extension, so `assets/site.js` changes every `[data-add]` by device:

- **Desktop:** unchanged. "Add to browser" goes to the browser's own store.
- **Chrome on a phone:** "Send to my computer", to the Chrome Web Store, where a signed-in person can queue the install for their computer (Tom, 2026-11-16).
- **Any other phone:** "Add to Desktop". Every install button on every page, the nav's included, opens the same pop-up (a `<dialog>` built by `sendDialog` in `assets/site.js`): an email address, "Send link", then "Sent". The API emails the link now and schedules one reminder for the first business hours (Mon–Fri, 9–5 in the visitor's time zone, sent as `tz`) at least 24 hours later. Opening the link cancels the reminder.
  - The form posts to `<apiUrl>/api/v1/account/send-install`. The API only accepts it from slopmop.lol's origin, rate-limits it, and sends one link per address a day.
  - The email's link (`api.slopmop.lol/get?t=…`) counts the open and lands on the home page with `utm_source=slopmop_email&utm_medium=email&utm_campaign=send_to_computer`.
  - Those tags are added to the Chrome Web Store link, so the store's own stats count the installs the email led to.
  - Test against staging with `?api=staging` (it's remembered; `?api=prod` goes back). The API's change must be in production before this goes live.

**Adding an install button to a page** (every page, now and later): use an `<a>` with `data-add` and `href` set to the Chrome Web Store listing, and load `assets/site.js`. The script handles the rest: the label for each device, the store for each desktop browser, and the pop-up on phones. Don't link to a store without `data-add`, and don't write device-specific buttons by hand. The nav's button is `class="btn btn-primary btn-sm nav-cta" data-add`; the page builders in `.github/scripts/` write theirs the same way.

The funnel, end to end:
- **CTA clicks** (`install_cta_click`) and **emails captured** (`generate_lead`, `send_to_computer`): Google Analytics.
- **Sent, opened and reminded**: admin → Referrals → Install emails from the website.
- **Completed installs**: the Chrome Web Store developer dashboard, by UTM source `slopmop_email`.

"Take a tour" is a text-only button with a ▶︎ (U+25B6 U+FE0E, so iOS doesn't draw it as an emoji).

## Slop Mop XL checkout

Polar's success URL is `https://slopmop.lol/xl/welcome?checkout_id={CHECKOUT_ID}`, served by `xl/welcome.html` (noindex). It is the third upgrade step: the receipt note, then the request for site access. The embedded checkout itself is started by `api.slopmop.lol`.

## Deploying

GitHub Pages, `main` branch, `/ (root)`. `CNAME` points at slopmop.lol; add the DNS records at your registrar:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
```

## License

MIT.

## Share previews (og:image)

The title, description, Open Graph, Twitter and JSON-LD tags **must stay inside `<head>`**, above `<body>`. LinkedIn, Facebook, Slack and X read the raw HTML without running JavaScript and ignore tags in `<body>`. 

After deploying, re-scrape: https://www.linkedin.com/post-inspector/ and https://developers.facebook.com/tools/debug/ . To force a refresh, rename the image (og-image-4.png) and update every og:image / twitter:image.

## Security headers

GitHub Pages can't set response headers, so each page carries its Content-Security-Policy as a `<meta http-equiv>` tag right after `<meta charset>`. The policy is in `.github/scripts/csp.py`: the site's own files, Google Analytics, Google Fonts, Formspree, the API (for the XL checkout link) and Polar's checkout, plus the sha256 of each inline `<script>` on that page, so a script injected into a page doesn't run.

- **After changing any inline script or adding a page, run `python3 .github/scripts/csp.py`** and commit. The CSP workflow fails a PR whose tags are stale. The media and State of Slop builders run it themselves.
- **Loading something new** (another font host, a widget, an embed) means adding its host to `POLICY` in `csp.py`, or the browser blocks it. An external `<script src>` is allowed by its exact URL automatically.
- **What a meta tag can't do:** `frame-ancestors` (clickjacking), reporting, and HSTS only work as real headers. GitHub Pages sends no HSTS for a custom domain, so `Strict-Transport-Security` needs a proxy in front (Cloudflare) or a host that sets headers.
