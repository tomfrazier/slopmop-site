# Polar product images — Slop Mop XL

Three 16:9 checkout images, built from the Slop Mop design system's real components (`Wordmark`, `FoldStrip`, `MopIcon`, `WhyCard`) plus the site hero graphic and the placements kit. They're new artwork, separate from the MIT-licensed share images.

| File | Use | Register |
|---|---|---|
| `1-brand.png` | first image (brand) | exterior: white, yellow rule, ink foot (the og card) |
| `2-preview.png` | product preview: feed mid-mop, details panel | exterior: full-bleed ink (the site hero) |
| `3-usage.png` | where XL works: every feed, articles, inbox, comments, reviews, article lists | the placements kit |

## Lifetime launch offer

`lifetime/` holds the same three images reworked for the one-time lifetime product: a "Launch offer" tag, "Pay once" headlines, and 400 checks a day. `lifetime/HeroGraphic.jsx` is a copy of the hero graphic whose details panel counts against the 400 limit.

`ds/` is a copy of the design system's tokens and component bundle (`styles.css`, `tokens/`, `_ds_bundle.js`) plus `HeroGraphic.jsx` and `Placements.jsx` from its UI kits. When the system changes, refresh those files and re-render.

PNGs are 2880×1620 (1920×1080 at 1.5×). Re-render after an edit:

```
node polar/render.js                                   # XL set
node polar/render.js lifetime/1-brand.html lifetime/2-preview.html lifetime/3-usage.html
```

`render.js` serves `polar/` over a local HTTP server, because Chromium blocks the in-browser JSX loader from reading `file://` URLs.

Needs network access for React, Babel and Google Fonts.
