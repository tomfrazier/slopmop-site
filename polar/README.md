# Polar product images — Slop Mop XL

Three 16:9 checkout images, built from the Slop Mop design system's real components (`Wordmark`, `FoldStrip`, `MopIcon`, `WhyCard`) plus the site hero graphic and the placements kit. They're new artwork, separate from the MIT-licensed share images.

| File | Use | Register |
|---|---|---|
| `1-brand.png` | first image (brand) | exterior: white, yellow rule, ink foot (the og card) |
| `2-preview.png` | product preview: feed mid-mop, details panel | exterior: full-bleed ink (the site hero) |
| `3-usage.png` | where XL works: every feed, articles, inbox, comments, reviews, article lists | the placements kit |

`ds/` is a copy of the design system's tokens and component bundle (`styles.css`, `tokens/`, `_ds_bundle.js`) plus `HeroGraphic.jsx` and `Placements.jsx` from its UI kits. When the system changes, refresh those files and re-render.

PNGs are 2880×1620 (1920×1080 at 1.5×). Re-render after an edit:

```
node polar/render.js
```

Needs network access for React, Babel and Google Fonts.
