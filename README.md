# slopmop-site

Marketing site for [Slop Mop](https://slopmop.lol) — a free, MIT-licensed Chrome extension that helps reduce AI slop and low-value writing in LinkedIn feeds. The extension and judging worker live in the main `slopmop` repo; this repo is the static site only.

## Structure

```
index.html          landing page
about.html          canonical product information
privacy.html        privacy policy
_ds/                design tokens + component bundle
support.js          component runtime
og-image.png        1200x630 share image
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

## Launch switch

The store button is behind one flag in `index.html`. Search for `data-props` near the top:

```json
"launched": { "default": false }
"storeUrl": { "default": "https://chromewebstore.google.com/detail/slop-mop" }
```

`launched: false` shows "Coming soon" everywhere. When the extension is live, set `launched` to `true` and paste the real store URL into `storeUrl`.

## Email capture

The monthly-stats form posts JSON to Formspree at `https://formspree.io/f/xaenejjw` (`emailEndpoint` in the same `data-props` block). Payload: `{ "email": "...", "source": "slopmop.lol", "_subject": "..." }`. Swap in any other endpoint that accepts JSON, or use a plain address to fall back to a prefilled mail link.

## License

MIT.
