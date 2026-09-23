# slopmop-site

Marketing site for [Slop Mop](https://slopmop.lol) — a free, MIT-licensed Chrome extension that helps reduce AI slop and low-value writing in LinkedIn feeds. The extension and judging worker live in the main `slopmop` repo; this repo is the static site only.

## Structure

```
index.html          landing page
about.html          canonical product information
privacy.html        privacy policy
help.html           install + troubleshooting
_ds/                design tokens + component bundle
support.js          component runtime
og-image-2.png      1200x630 share image (og:image)
favicon.svg         favicon (+ PNG fallbacks and apple-touch-icon)
site.webmanifest    icon manifest
CNAME               slopmop.lol
```

Everything is static. No build step, no dependencies, no package.json — open `index.html` in a browser and it runs.

## Deploying

GitHub Pages, `main` branch, `/ (root)`. `CNAME` points at slopmop.lol; add the DNS records at your registrar:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
```

## The extension .zip

While the store listing is in review the hero CTA downloads a .zip. **Drop `slopmop-extension-0.1.0.zip` in this folder's root** — GitHub Pages serves any file committed to the repo, so no config is needed, and the page links to it relatively.

```
cp ~/path/to/slopmop-extension-0.1.0.zip .
git add slopmop-extension-0.1.0.zip
git commit -m "Add extension zip"
git push
```

It will be live at `https://slopmop.lol/slopmop-extension-0.1.0.zip`. If you version the filename, update `zipUrl` and `zipMeta` in `index.html` to match. Files over 100MB are rejected by git; this one is nowhere near that.

## Launch switch

The store button is behind one flag in `index.html`. Search for `data-props` near the top:

```json
"launched": { "default": false }
"storeUrl": { "default": "https://chromewebstore.google.com/detail/slop-mop" }
```

Three states, driven by two values:

- **`launched: true`** — store button everywhere, install section hidden. Requires `storeUrl`.
- **`launched: false` + a `zipUrl`** — sideload mode: the hero downloads the .zip and the "Installing it before the store does" section appears. This is the current state.
- **`launched: false` + empty `zipUrl`** — "Coming soon" buttons, nothing downloadable.

## Email capture

The monthly-stats form posts JSON to Formspree at `https://formspree.io/f/xaenejjw` (`emailEndpoint` in the same `data-props` block). Payload: `{ "email": "...", "source": "slopmop.lol", "_subject": "..." }`. Swap in any other endpoint that accepts JSON, or use a plain address to fall back to a prefilled mail link.

## License

MIT.

## Share previews (og:image)

The title, description, Open Graph, Twitter and JSON-LD tags **must stay inside `<head>`**, above `<body>`. LinkedIn, Facebook, Slack and X read the raw HTML without running JavaScript and ignore tags in `<body>`. If you edit a page in the design editor and re-export, check they didn't move back into `<helmet>`.

After deploying, re-scrape: https://www.linkedin.com/post-inspector/ and https://developers.facebook.com/tools/debug/ . To force a refresh, rename the image (og-image-3.png) and update every og:image / twitter:image.
