# Slop Mop — Design System

Slop Mop is a Chrome extension (MV3, TypeScript + Vite) that pre-scans LinkedIn feed posts, has **TypeSafe's Jev** judge how sloppy each one is, and either folds the bad ones into a paper-strip placeholder (**Hide** mode) or outlines them yellow/red (**Highlight** mode). Two goals: make LinkedIn tolerable, and act as a showcase of Jev as a programming primitive. It targets *bad AI writing*, not AI assistance — posts the community finds useful are shielded.

It is explicitly a **research project**, not a product: the first-install gate says so, and the footer repeats it.

## Sources used to build this system

| Source | Status |
| --- | --- |
| Product + architecture spec pasted into chat (extension, server, decision logic, Jev questions) | **The primary source.** Everything visual here derives from it. |
| **Mop mark SVG, supplied by the user** | Saved verbatim at `assets/mop.svg`; wrapped as `components/core/MopMark.jsx`. The only real brand asset in the system. |
| https://slopmop.lol | Fetched — a GoDaddy "launching soon" placeholder. No logo, colours, type or copy. |
| Local repos `/Users/tomfrazier/Documents/slopmop/slopmop-extension`, `slopmop-server` | **Not attached and empty per the brief** — no code was read. |
| Graphite "AI tells" research — https://graphite.io/five-percent/research/ai-tells | Referenced by the spec as the tell-library baseline; used for the tell names and examples shown in the UI kits. |
| Reasoning-effort slider reference (HaoyueQin/dsh-better-reasoning-effort, after HanaAyane) | Named in the spec as the model for the sensitivity slider's look. Not fetched; the slider is built to the spec's written description. |

**Therefore: this is a from-scratch, deliberately low-opinion visual identity.** Three things are fixed and real: the mop mark, flag yellow `#F5B400` and red `#D93025`. Everything else is a neutral, unopinionated chassis — plain greys, white surfaces, sentence case, small radii — chosen so the product's content and verdicts carry the personality rather than the chrome. It should be easy to push in any direction later.

## Products represented

1. **Chrome extension** — toolbar popup + first-install acknowledgement gate → `ui_kits/extension/`
2. **Feed overlay** — what the content script paints on top of an already-rendered LinkedIn feed → `ui_kits/feed/`
3. **Marketing site** (slopmop.lol) → `ui_kits/site/`

The Cloudflare Worker (`/judge`) has no UI and so no kit.

---

## CONTENT FUNDAMENTALS

**The vibe:** neutral and matter-of-fact. Slop Mop states what it did and gets out of the way. Dry rather than jokey; the humour, where it exists, is in the *situation* (a feed that needs mopping), never at the expense of the people posting. Confident about the writing, humble about the verdict — it always leaves a way to see the post.

**Person.** Address the user as *you*; the product refers to itself as *Slop Mop*, never "we" and never "I". No personification of the mop.

**Casing.** Sentence case everywhere — labels, buttons, tabs, chips, headings, stat periods. No uppercase, no letter-spaced signage. Lowercase only for machine strings in mono (`score 0.71`, `threshold T = 0.50`).

**Length.** Interface copy is short and declarative. Labels 1–2 words. Descriptions one line. The only multi-sentence copy in the extension is the disclosure gate, where plainness beats brevity.

**Verdict language is neutral and passive-about-the-author:**

| Say | Don't say |
| --- | --- |
| "This post was hidden." | "Busted! Another AI bot caught." |
| "Some AI tells" / "Likely slop" | "Fake" / "Written by ChatGPT" / "This person is faking it" |
| "Nothing is stored." | "Your privacy is our top priority." |
| "Research purposes only." | "The #1 way to clean your feed." |
| "Applies instantly." | "Re-scanning your feed…" (it never re-infers) |

**Never use the tells on yourself.** The product's own copy is held to the library it judges by: no "not just X, it's Y", no "unlock", "elevate", "leverage", "paramount", "groundbreaking", no importance flagging ("this matters because"), no tradeoff-free promises, no engagement bait. If a headline could appear in the feed it's mopping, rewrite it.

**Numbers are always mono and always honest.** Scores to two decimals, thresholds named by their stop ("0.50 (moderate)"), counts deduped by URN. Never round a score up for drama.

**Emoji: no.** The one exception is inside *quoted sample posts* in the UI kits, where the 🚀 is evidence, not decoration. Product chrome uses the built-in `Icon` set.

**Humour budget:** roughly one line per surface, and it should be deletable without loss. The site CTA ("Your feed, minus the paradigm shifts.") and the new-record state are the only two places it currently appears. Everywhere else, plain.

---

## VISUAL FOUNDATIONS

**The idea in one line:** *get out of the way.* A neutral grey-and-white chassis with one yellow accent, so the only strong colour on screen is a verdict. Nothing here should compete with LinkedIn's own content — the extension is a utility, not a brand statement.

**Colour.** Cool-neutral greys (`--ink-900 #16181A` → `--ink-050`) on white and near-white surfaces (`#FFFFFF`, `#F7F8F9`, `#EFF1F3`). Mop Yellow `#F5B400` is the only accent and appears in exactly three roles: the "some AI tells" flag, the enabled switch, and the single primary button on a surface. Red `#D93025` is "likely slop" and destructive actions. Blue `#2F6FBF` carries links, focus rings and info. No colour fields: sections are separated by hairline rules and spacing, never slabs of colour — the earlier draft had a full ink section and a full yellow section, and they were the most opinionated thing in the system.

**Type.** Archivo throughout (Google Fonts), JetBrains Mono for machine strings. Weights stop at 700 — display bold at `-0.01em`, headings semibold 15px, body 15/1.55, secondary 13/1.55, measure capped at 68ch. UI labels 13/500 sentence case; small labels 12/500. Anything the machine produced — scores, thresholds, URNs, tell names in the fold strip — is mono at 12px or 10px in `--text-faint`. Nothing goes below 10px.

**Spacing & layout.** 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72 · 96. Popup is a fixed 360px with a 16px gutter, 12px between controls, 24px between groups. Site content sits in a 980px column with 72–96px section padding. Section boundaries are hairline rules. The fold strip is fixed at 44px and never grows.

**Corners & borders.** 3 / 6 / 8 / 12, pill for the sensitivity track and the switch. One border language: a 1px hairline (`--ink-100`) for containers, stepping up to `--border-default` (`--ink-200`) for interactive edges. Flags are the exception at 3px, drawn as *outer box-shadow*, never `border` — the feed must not shift by a pixel.

**Shadows.** Barely there. `0 1px 2px` at 5% for resting cards, `0 2px 8px` at 8% for the popup, `0 8px 24px` at 14% for the hover Why panel. No coloured glows except a single 4px yellow halo when the slider is at Aggressive. Pressed buttons take a faint inset rather than moving.

**Gradients — exactly two, both functional.** `--gradient-fold` (white → faint crease → white) behind the fold strip; `--gradient-sensitivity` (grey → yellow) on the slider track. Nothing else, and never a purple one.

**Texture.** `--texture-hatch` exists at 3% but is currently unused. Keep it that way unless something genuinely needs to read as "outside the product".

**Transparency & blur.** Effectively unused. Overlays are solid ink. No frosted glass, no scrims — the only alpha is inside shadow definitions and hairline ink washes.

**Imagery.** There is none beyond the mop mark, and that is the position: the system is type, rule and colour. No photography, no illustration, no 3D, no stock. Any future imagery should match the mark — flat, two-tone, geometric.

**Motion.** 80 / 140 / 220 / 380 / 520ms. Interface feedback is fast and unshowy (`--ease-standard`). The one piece of real choreography is the **unfold**: two half-panels in CSS 3D, top rotating `X -90° → 0` from origin bottom and bottom `+90° → 0` from origin top, expanding from the crease to the measured post height (`--dur-fold`, `--ease-fold`), then the post is revealed. Thumbs and knobs use `--ease-snap` (a small overshoot). Everything collapses to 0ms under `prefers-reduced-motion`. No looping animation, no attention-seeking pulses — the slider glow is static per stop.

**States.**
- *Hover:* a step on the same colour (yellow → `--mop-300`, ink → `--ink-800`, white → `--paper-100`); ghost and icon buttons take a `--paper-100`/`--paper-200` wash.
- *Press:* `--shadow-inset-crease`, a 5% inset. Nothing translates or bounces.
- *Focus:* never removed. `--shadow-focus` = a 2px white gap then a 2px blue ring.
- *Selected:* white raised chip (segmented control), light grey with a hairline (icon buttons).
- *Disabled:* 45% opacity, pointer events off, plus a sentence saying why. The master toggle before acknowledgement is the canonical case.
- *Off (master toggle):* the mark and wordmark go greyscale, badge reads `off`, and the settings block drops to 45% and stops responding.

**Cards** are white, 8px radius, 1px hairline border, `--shadow-card`. Never nest two shadowed cards; nested groups use `tone="sunken"` (flat `--paper-200`, no shadow). Stat tiles are white with a hairline — the number takes the tone colour, not a rule.

**Accessibility.** No verdict is colour-only — yellow and red always carry a worded chip. Body text is ink on white (>13:1). Yellow is treated as a *surface*, never as text: labels on yellow are ink. Hit targets ≥28px in the popup, ≥44px anywhere touchable.

---

## ICONOGRAPHY

**The brand mark is `assets/mop.svg`, supplied by the user** — a two-tone mop: grey handle and head, three bristle gaps knocked out in the surface colour. `components/core/MopMark.jsx` reproduces it with the handle/head on `currentColor` and a `knockout` prop for the bristles, so it tints with its container and greys out when the extension is off. Don't rotate it, don't recolour the bristles to an accent, don't outline it.

**For UI glyphs, no icon set was provided, and nothing is loaded from a CDN.** Slop Mop ships its own small inline set in `components/core/Icon.jsx` — 24px grid, 2px stroke, round caps and joins, drawn to sit comfortably beside the mark. Paths are inline SVG, so there is no network dependency and no CSS mask; an unknown glyph name renders nothing (with a console warning) rather than a visible block. The earlier draft used remote Lucide SVGs as CSS masks, which failed to solid black squares — don't reintroduce that pattern.

- Icons are never inline `<svg>` in product code. Add a glyph by adding an entry to the `GLYPHS` map in `Icon.jsx`; everything else calls `<Icon name="…" />`.
- Sizes: 12–13 (chips, fold strip), 15 (buttons, list rows), 17 (buttons `lg`), 20 (feature cards). Never scale a glyph past 24.
- Working vocabulary: `eye-off` (Hide), `flag` (Highlight), `triangle-alert` (likely slop), `chevrons-up-down` (show post), `undo-2` (not slop / restore), `shield-check` (usefulness shield, privacy), `gauge` (sensitivity), `settings-2`, `info`, `power`, `send`, `database`, `download`, `code`, `file-text`, `scroll-text`, `loader`, `check`, `chevron-down`, `arrow-right`, `trash-2`, `user-round-check`, `eraser`, `eye`, `x`.
- **No emoji in product chrome.** No unicode-glyph icons (✓ ✕ →) — use the `Icon` equivalent (`check`, `x`, `arrow-right`). No icon font.
- The extension icon is `MopMark` alone on white; it renders greyscale at 45% when the master toggle is off.

## Logo

The mark is `assets/mop.svg` (yours). The lockup — mark + "Slop Mop" in Archivo semibold — is `components/core/Wordmark.jsx`. No type-only mark, no alternate lockups, no monogram.

---

## Index

**Root**
- `styles.css` — the single entry point consumers link; `@import`s only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `base.css`.
- `thumbnail.html` — homepage tile. `SKILL.md` — Agent-Skills wrapper. `readme.md` — this file.
- `assets/` — `mop.svg` (the supplied mark) plus a README on what else is and isn't here.

**Components** (`components/<group>/`, each with `.jsx` + `.d.ts` + `.prompt.md` and one `@dsCard` HTML per group)
- `core/` — **Button**, **IconButton**, **Badge**, **Card**, **Icon**, **MopMark**, **Wordmark**
- `controls/` — **Switch**, **SegmentedControl**, **SensitivitySlider**, **Checkbox**
- `verdict/` — **FoldStrip**, **HighlightFrame**, **WhyCard**, **StatsDial**, **StatTile**

*Intentional additions:* `Icon` (a wrapper so no one hand-draws SVG), `MopMark` (the supplied mark as a tintable component) and `Wordmark` (the mark + name lockup).

**UI kits** (`ui_kits/<product>/`)
- `extension/` — popup + onboarding gate (`Popup.jsx`, `Onboarding.jsx`)
- `feed/` — feed overlay in both modes (`FeedItem.jsx`, `posts.js`)
- `site/` — slopmop.lol landing (`Sections.jsx`)

**Guidelines** (`guidelines/*.card.html`) — Colors ×4, Type ×4, Spacing ×2, Shape ×4 (radii, elevation, fold gradients, motion), Brand ×3 (mark & wordmark, voice, iconography).
