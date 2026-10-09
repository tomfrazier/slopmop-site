# Polar product images

16:9 checkout images for Slop Mop Pro, built from the design system tokens in `_ds/`. They're new artwork and don't reuse the MIT-licensed share images.

| File | Use |
|---|---|
| `1-brand.png` | first image (brand) |
| `2-preview.png` | product preview: feed, fold strips, highlights, Why card |
| `3-usage.png` | where it works: feeds, articles, email, comments |

The PNGs are 2880×1620 (1920×1080 at 1.5×). To change one, edit its `.html` and re-render:

```
node polar/render.js 1-brand.html 2-preview.html 3-usage.html
```

Fonts (Archivo, JetBrains Mono) load from Google Fonts at render time.
