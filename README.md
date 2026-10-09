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
  social: { linkedin: "", x: "", bluesky: "", threads: "", youtube: "", github: "", producthunt: "" }
};
```

A social icon stays hidden until its URL is filled in.

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
