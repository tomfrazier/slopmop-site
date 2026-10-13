# slopmop-site

Marketing site for [Slop Mop](https://slopmop.lol) — a free browser extension that reads your feed ahead of you and folds away low-value writing. The extension and judging server live in a private repo (the original MIT version is public at github.com/tomfrazier/slopmop and linked from `/open-source`); this repo is the static site only.

## Structure

```
index.html          landing page
how-it-works.html   the details panel, the nine tells, the three counter-signals
about.html          canonical product information
help.html           install + troubleshooting
privacy.html        privacy policy
terms.html          terms of service (served at /terms)
open-source.html    the MIT-licensed version, links to the public repo (served at /open-source)
_ds/slopmop/        Slop Mop design system: tokens, styles.css, _ds_bundle.js (components), mop.svg
assets/site.css     site layout on top of the design-system tokens
assets/site.js      site settings + behaviour (store link, Product Hunt, social URLs, signup, tour video)
assets/islands.js   mounts live design-system components into the pages
assets/sites.js     hero mockups of each host site (LinkedIn, X, Reddit, Facebook, Substack, Medium, email, websites)
assets/sites.css    styles for those mockups
assets/logos/       network and social marks (simple-icons)
vendor/             React 18.3.1 UMD, self-hosted so the components need no CDN
og-image-2.png      1200x630 share image (og:image)
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

Google Analytics (`G-QLWD48WK07`) is in the `<head>` of every page, with Consent Mode v2:

- In the UK, EEA and Switzerland, analytics cookies stay off until the visitor clicks Accept on the cookie banner; until then GA sends cookieless pings. Elsewhere they are on unless the visitor clicks Reject or sends Global Privacy Control. Ads signals are always denied.
- The banner and the footer's "Cookie settings" button live in `assets/site.js`; the choice is kept in `localStorage` (`slopmop:consent`) for a year.
- The XL pages strip the query string from `page_location`, so checkout ids never reach GA.

Events sent (register `link_location` and `lead_source` as custom dimensions in GA; mark `add_to_browser` and `generate_lead` as key events):

| Event | When | Parameters |
| --- | --- | --- |
| `add_to_browser` | any "Add to browser" link is clicked | `link_location` (nav, footer, hero, pricing…), `link_url` |
| `generate_lead` | newsletter signup or contact form is sent successfully | `lead_source` (`newsletter` or `contact_form`), `form_location` |
| `tour_open` | "Take a tour" opens the video | `link_location` |
| `begin_checkout` | the XL checkout opens on `xl/checkout` | `currency` |

Page views, scrolls, outbound clicks and form starts come from GA's enhanced measurement.

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

After deploying, re-scrape: https://www.linkedin.com/post-inspector/ and https://developers.facebook.com/tools/debug/ . To force a refresh, rename the image (og-image-3.png) and update every og:image / twitter:image.
