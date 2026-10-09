# Slop Mop — Design System

**slopmop.lol** · 0.2.7 is a free, MIT-licensed research preview · **1.0 is a paid, closed-source product**: one feed free, Slop Mop XL for the rest.

Slop Mop is a Chrome-compatible extension that reads LinkedIn posts before they reach your view and asks **Jev** (Typesafe AI) twelve questions about each one in parallel: nine tells associated with slop, two counter-signals looking for a human voice and genuine value, and an AI-likelihood dampener. Reader response (reactions, comments, reposts) is the third counter-signal. The score drives one of two modes — **Hide** (fold the post into a strip that reopens) or **Highlight** (leave it visible and tint its mop icon). Readers vote **Not sure / No / Maybe / Probably** from that icon, which overrides the model for their own feed and feeds the aggregate research.

Slop Mop does not delete, report, mute, or block. And it is **not an AI detector** — it is interested in bad writing and low-value content regardless of who or what produced it. Useful writing survives the mop however it was made.

## The brand in five lines

| | |
| --- | --- |
| **Mission** | Help people spend less attention on writing that wastes it. |
| **Vision** | A web where useful ideas rise above the slop. |
| **Essence** | **Ridiculous exterior. Serious machinery.** |
| **Promise** | **Less slop. More control. Your call.** |
| **Message** | Mop the slop out of your LinkedIn feed. / Not an AI detector. A bad-writing detector. / Your attention deserves a filter you control. |

**Core values, and where each one lands in the UI:**

1. **Useful beats authentic** → the three counter-signal bars are always in `WhyCard`. Never ship a verdict surface that hides them.
2. **Show your work** → the score never arrives alone: `64 / 100` leads a panel that names the strongest signs and draws the Slopprint.
3. **Humans get the last word** → the `VoteControl` row and "Show post". Every verdict is reversible and answerable.
4. **Attention is worth protecting** → the interface gets out of the way; it never becomes a second thing to read. Upgrade prompts appear only when a limit is actually hit.
5. **Expect to be wrong** → "Not sure" is a verdict *and* the unvoted state; low confidence fails open.
6. **Show the mop cupboard** → the code is closed at 1.0, the method isn't: the sign library and weights, the scoring formula, what's stored and for how long, and where it misses are all published. (Was "Open the mop cupboard" — free, MIT. True for 0.2.7 only.)

## Verified against production — 2026-10-07

Audited against **extension 0.2.7 / server 1.1.0** in `tomfrazier/slopmop-private` (`uploads/Design system audit.md`). Tokens matched value for value. The verdict surfaces had drifted; they're now rebuilt from source:

| Area | Now in the system | Source |
| --- | --- | --- |
| Score | **`64 / 100`**, integer, leads the panel. A display stretch: Possibly starts at 40, Moderate's Likely at 70. Verdicts still come from the raw score. | `shared/display.ts` |
| Vote | **Not sure / No / Maybe / Probably**; Not sure is the unvoted state. A vote dims Jev's score, chip, sentence and range bar to 15% and shows a "Your vote: No" chip top-right (the system drops 0.2.7's strikethrough). Checks today move to the panel's foot. | `inspectorSections.ts` |
| Tells | Plain names: Scroll-stopper · Engagement bait · Hype words · Empty praise · No-catch promises · "Not X, but Y" · Flowery prose · Stiff phrasing · Too-tidy story | `content/labels.ts` |
| Counter-signals | **Three peer bars**: Sounds like a person · Useful to readers · Reader response | `inspectorPanel.ts` |
| Verdict copy | Four stops + the chip sentence ("This reads like AI slop." / "…, so it was hidden.") + "Reads clean" for your own drafts | `composite.ts`, `verdict.ts` |
| Fold strip | "This post was hidden" / "Show post"; today/week/month/all-time counts (the 0.2.7 arc dial is retired); unfolding is one-way (the system drops 0.2.7's "Hide post again") | `content/fold.ts` |
| Highlight mode | **Tints the mop icon**, no outline. `HighlightFrame` is deprecated. | `render.ts`, `voteButton.css` |
| Popup | Four plain cells, Checks today meter, problem line, copyable Device ID, version | `popup.html` |
| First run | A full page in a new tab, 640px column | `onboarding.html` |
| AI guard | **Shipped** as a dampener in the server. The handoff note is retired. | server 1.1.0 |

**Fold strip — which copy wins.** Production. "Mopped." / "Show me anyway" were the brand document's proposal, and the system had been documenting copy nobody sees. They're retired from product chrome; the mop line on the strip is the mop itself. If the brand voice should come back to the strip, change the extension first and the system second.

**Uncertainty tokens.** Kept `--flag-unsure` and `--flag-unsure-wash` — the shipped `verdictStyle.ts` already reads `--flag-unsure-wash` but 0.2.7's `tokens.css` never defines it, so the gray "Not sure" chip renders with no background. **Add both lines to the extension's tokens.css.** Dropped `--signal-bar`, `--signal-track` and `--counter-bar`: the tells are a radar now and the counter bars use `--blue-500` directly, as production does.

### Copy debts (shipped, but against the brand)

- The chip sentences say "**AI slop**" and the panel's empty state says "No strong signs of **AI writing**". The onboarding subtitle says "Fold or highlight **AI-written** posts". All three contradict "not an AI detector". Suggested: "This reads like slop." · "No strong signs of slop." · "Fold or highlight low-value posts in your LinkedIn feed." **The system has now adopted the AI-free versions** (and the redesigned first-run page drops "AI-written"); the extension still ships the old strings until it's updated.

## Proposed, not shipped (Phase 1–3)

Drawn ahead of the build so Phase 2 has something to build against. Every one is labeled *proposed* in its card.

- **Mop icon states** — seven: not checked, disabled, blue, yellow, red (shipped) + sign up, upgrade (proposed). `MopIcon`.
- **Accounts** — "Grab your free mop", Google, magic link, "Check your email", signed in (`SignUpCard`); pick your free feed; per-site permission; account settings with linked browsers (cap 5), sign out, delete. `ui_kits/account/`.
- **Upgrade** — `UpgradePrompt` in the post panel and the popup, only at a limit. **XL price and perks are placeholders.**
- **Beyond LinkedIn** — Mess Index on search results, comments and reviews on hover, the article-page pill. `ui_kits/placements/`.
- **Dark mode** — `tokens/dark.css` under `[data-theme="dark"]`: the ink and paper ramps flip in place, so components need no changes.
- **Pricing + "What's still open"** on slopmop.lol — replaces "free · MIT" at 1.0.
- Not yet drawn: Phase 3 email surfaces (inbox flag, check-before-send).

## Sources used to build this system

| Source | Status |
| --- | --- |
| **Slop Mop Brand System** supplied by the user | The governing source for voice and positioning. |
| **`slopmop-private`** — extension 0.2.7, server 1.1.0 | **The governing source for facts.** Read 2026-10-07. |
| `uploads/Design system audit.md` | The gap list this revision closes. |
| **Mop mark SVG, supplied by the user** | `assets/mop.svg`; wrapped as `MopMark` and `MopIcon`. |
| Graphite "AI tells" research | Baseline for six of the nine tells; the last three are LinkedIn-specific. |

## Products represented

1. **Extension** — toolbar popup + first-run page → `ui_kits/extension/`
2. **Feed overlay** — mop icons, fold strips, the details panel, the draft checker → `ui_kits/feed/`
3. **Marketing site** (slopmop.lol) → `ui_kits/site/`
4. **Account** (proposed) → `ui_kits/account/`
5. **Placements + dark mode** (proposed) → `ui_kits/placements/`

---

## CONTENT FUNDAMENTALS

**The one rule:** *make the interface fun, make the claims precise.* Three registers, and they don't mix.

**Product voice** — short, direct, plain. Shipped: `This post was hidden` `Show post` `Is this slop?` `Possibly slop` `Likely slop` `Looks fine` `Not sure` `Reads clean` `Write a little more first`. Mop metaphors are recurring assets, not mandatory jokes: **at most one mop line per surface** ("Grab your free mop", "Get the XL mop"). If every string is a cleaning pun the device gets exhausting.

**Research voice** — when the subject is methodology, privacy, performance, results, limitations or Jev, precision beats humor. Say what happened, what was measured, what leaves the browser, what is uncertain, and where the mop misses. Do not disguise limitations — failures are the research, not an embarrassment.

**Marketing voice** — playful, concise, observant, slightly subversive. Never grandiose. Slop Mop must not accidentally write the language it exists to detect: **game-changing, revolutionary, transformative, supercharge, unlock, leverage the power of, journey, thrilled to announce.** Parody is allowed ("We're thrilled to announce absolutely nothing"); sincerity in those words is not. If a headline could appear in the feed it's mopping, rewrite it.

**Personality:** mischievous, skeptical, transparent, clever, surprisingly rigorous. Nothing is sacred — not AI, not human writing, not LinkedIn, and **not Slop Mop itself**. "We think this is slop. We could be wrong." is entirely on-brand.

**Person.** Address the reader as *you*. The product refers to itself as *Slop Mop*; *we* is allowed only in research and marketing writing, never in product chrome. No personified mop, no mascot. Jev is an engine, not a character — it may be named ("Jev smelled something") but never speaks.

**Never aimed at the author.** The judgment is about a piece of writing.

| Say | Don't say |
| --- | --- |
| "This post was hidden" | "Busted! Another AI bot caught." |
| "Possibly slop" / "Likely slop" | "Fake" / "Written by ChatGPT" / "This person is faking it" |
| "Not sure" | a confident number with no confidence attached |
| "A one-way hash of the text, not the text." | "Your privacy is our top priority." |
| "Show post" | "Are you sure you want to view this?" |
| "Less slop. More control. Your call." | "Eliminate slop forever." |

**Never promise perfection.** Judging writing is subjective, the model will be wrong, and the reader has the final say by design. Promise better control, visible reasoning, and less wasted attention — nothing more.

**Casing.** Sentence case everywhere. Lowercase mono for machine strings (`138 / 250 checks today`, `threshold T = 0.25`, `v0.2.7`). No uppercase signage.

**Length.** Labels 1–2 words, descriptions one line. The only multi-sentence product copy is the first-run gate, where plainness beats brevity.

**Numbers are always honest.** The score is an integer out of 100 in the display face (`64 / 100`); machine counts are mono. Thresholds are named by their stop, counts deduped by URN. Never show a score without the signs behind it.

**Emoji: no** — except inside quoted sample posts in the kits, where the 🚀 is evidence, and the single 😉 closing the Open Graph card's tagline, where the emoji *is* the joke (see below).

**One sanctioned self-parody.** The og card's tagline stacks "Not an AI detector. / A bad-writing detector. / 😉" on three lines because *"not just X, it's Y"* is `contrastFraming` — the first of the nine tells. The card deliberately commits the tell its own product flags, and the wink acknowledges it. This is the brand's parody clause working as intended, and it only works because it's rare: one such gag per surface, never two.

**Progressive disclosure of Jev.** The discovery sequence is *"Haha. Slop Mop." → "Wait, this is useful." → "It's judging everything before I reach it?" → "How is that economically viable?" → "Oh. Jev."* Never collapse it. Jev belongs in the footer, the first-run page, and one late section — never the hero.

---

## VISUAL FOUNDATIONS

**The idea in one line:** *ridiculous exterior, serious machinery — and in the feed, get out of the way.* The chassis is deliberately quiet so that the mischief lives in the words and the mark, not in the chrome. Two registers:

- **Exterior surfaces** (site hero, first-run gate, brand cards) may be bold: full-bleed ink, display type at 40px+, one joke per screen.
- **Machinery surfaces** (feed overlay, popup) stay mute. Nothing there should compete with the reader's actual feed, and nothing should become a second thing to read.

**Color.** Cool-neutral grays (`--ink-900 #16181A` → `--ink-050`) on white and near-white (`#FFFFFF`, `#F7F8F9`, `#EFF1F3`). Mop Yellow `#F5B400` appears in exactly four roles: the "possibly slop" tone, the enabled switch, the checks-today meter, and the single primary button on a surface. Red `#D93025` is "likely slop" and destructive actions. Blue `#2F6FBF` carries links, focus, info — **and counter-signals**, which is a deliberate pairing: yellow accrues slop, blue pays it back. Gray `--flag-unsure #8D949B` plus the hatch texture is uncertainty. No color fields; sections are separated by hairline rules and spacing.

**The verdict scale has four stops and every one carries a word.** Thresholds below are on the 0–100 display scale at Moderate:

| Stop | Copy | Token | When |
| --- | --- | --- | --- |
| red | "Likely slop" | `--flag-danger` | ≥ 70 · hidden in Hide mode |
| yellow | "Possibly slop" | `--flag-warn` | ≥ 40 · never hidden |
| gray | "Not sure" | `--flag-unsure` + `--texture-hatch` | `meanConfidence` < 0.25 — fails open |
| blue | "Looks fine" (own drafts: "Reads clean") | `--flag-clean` | < 40 — nothing happens |

A fifth string, **"Looks human-written"**, shipped while `aiLikelihood` was a hard gate. It was retired with the gate. Don't reintroduce it: "a person wrote this" is not a verdict on whether the writing was worth reading.

**Type.** Archivo throughout (Google Fonts), JetBrains Mono for machine strings. Weights stop at 700 — display bold at `-0.01em`, headings semibold 15px, body 15/1.55, secondary 13/1.55, measure capped at 68ch. UI labels 13/500 sentence case; small labels 12/500. Machine counts — checks, thresholds, URNs, device ids, versions, the community line — are mono at 12px or 10px in `--text-faint`. The score itself is display type. Nothing below 10px.

**Spacing & layout.** 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 72 · 96. Popup is a fixed 360px (`--popup-width`) with a 16px gutter, 12px between controls, 24px between groups. Feed posts are 555px (`--feed-post-width`). Site content sits in a 980px column with 72–96px section padding and a 68ch measure. The fold strip is fixed at 44px (`--fold-height`) and never grows. The details panel is 340px; notices 260px.

**Corners & borders.** 3 / 6 / 8 / 12, pill for the switch. One border language: a 1px hairline (`--ink-100`) for containers, `--border-default` (`--ink-200`) for interactive edges. Nothing Slop Mop adds may shift the host layout by a pixel: the mop icon is inserted beside the menu or floated, the composer button is absolutely positioned, panels are fixed.

**Shadows.** Barely there. `0 1px 2px` at 5% resting, `0 2px 8px` at 8% for the popup, `0 8px 24px` at 14% for the hover why panel. No colored glows. Pressed buttons take a faint inset rather than moving.

**Gradients.** None. The system has no gradient tokens; every surface is a flat fill. The fold strip reads as folded paper from its two tilted halves (flat paper-000 over paper-100) and the crease line, not from shading.

**Texture.** `--texture-hatch` at 3% is the uncertainty marker, and that is its only job. A hatched surface means Slop Mop is admitting something.

**Transparency & blur.** Effectively unused. No frosted glass, no scrims.

**Imagery.** None beyond the mop mark and the Slopprint, and that's the position: type, rule and color. No photography, no illustration, no stock. Future imagery should match the mark — flat, two-tone, geometric.

**Motion.** 80 / 140 / 220 / 380 / 520ms. Feedback is fast and unshowy. The one piece of real choreography is the **unfold**, and it works like folded paper rather than a door: the two halves sit at `rotateX(±38deg)` at rest — top hinged on `50% 100%`, bottom on `50% 0` — and flatten to `0` while the strip's own height animates from 44px to the post's measured height (`--dur-fold`, `--ease-fold`, `perspective: 900px`). The crease and the strip's content fade out as it opens. The extension waits 640ms before swapping in the real post — deliberately longer than the 520ms token, so the transition always finishes first. Under `prefers-reduced-motion`, or when the post is shorter than the strip, it skips straight to the post. No looping animation, no attention-seeking pulses.

**States.** *Hover:* a step on the same color; ghost/icon buttons take a paper wash. *Press:* `--shadow-inset-crease`. *Focus:* never removed — 2px white gap, 2px blue ring. *Selected:* white raised chip. *Disabled:* 45% opacity plus a sentence saying why. *Off:* mark goes grayscale, toolbar badge reads `off`, settings drop to 45%.

**Dark mode (proposed).** `tokens/dark.css` flips the ink and paper ramps and the 100/200 washes under `[data-theme="dark"]`. Write against ramps and semantic aliases and a component works in both. Shadow hosts set the attribute when the host page is dark.

**Cards** are white, 8px radius, 1px hairline, `--shadow-card`. Never nest two shadowed cards.

**Accessibility.** No verdict is color-only — every stop carries a word. Body text is ink on white (>13:1). Yellow is a surface, never text. Hit targets ≥28px in the popup, ≥44px anywhere touchable.

---

## ICONOGRAPHY

**The brand mark is `assets/mop.svg`, supplied by the user** — a two-tone mop. `components/core/MopMark.jsx` reproduces it with the handle/head on `currentColor` and a `knockout` prop for the bristles. `MopIcon` is the mark as a control — the in-post button and the toolbar icon, seven states. Don't rotate it, don't recolor the bristles to an accent, don't outline it, don't animate it into a mascot.

**UI glyphs ship inline** in `components/core/Icon.jsx` — 24px grid, 2px stroke, round caps, no network dependency. Add a glyph by adding to the `GLYPHS` map; never inline an `<svg>` in product code. Sizes: 12–13 (chips, fold strip), 15 (buttons, rows), 17 (buttons `lg`), 20 (feature cards). Never past 24.

Vocabulary: `eye-off` (Hide / Mop this), `flag` (Highlight), `triangle-alert` (likely slop, where it misses), `chevrons-up-down` (show me anyway), `undo-2` (not slop / restore), `shield-check` (privacy), `gauge` (sensitivity), `settings-2`, `info`, `power`, `send`, `database`, `download`, `code`, `file-text`, `scroll-text`, `loader`, `check`, `chevron-down`, `arrow-right`, `trash-2`, `user-round-check`, `eraser`, `eye`, `x`, `monitor` (your browser).

**No emoji, no unicode glyphs (✓ ✕ →), no icon font** in product chrome.

## Logo

The mark is `assets/mop.svg`. The lockup — mark + "Slop Mop" in Archivo semibold — is `components/core/Wordmark.jsx`. No monogram, no alternate lockups.

---

## Index

**Root**
- `styles.css` — the single entry point consumers link; `@import`s only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `dark.css` (proposed), `base.css`.
- `thumbnail.html`, `SKILL.md`, `readme.md`, `assets/`, `handoff-og-image.md`.

## Components

Each in `components/<group>/` with `.jsx` + `.d.ts` + `.prompt.md`.

- `core/` — **Button**, **IconButton**, **Badge**, **Card**, **Icon**, **MopMark**, **MopIcon**, **Wordmark**
- `controls/` — **Switch**, **SegmentedControl**, **SensitivityToggle**, **Checkbox** (`SensitivitySlider` is deprecated — the shipped control is the toggle)
- `verdict/` — **WhyCard** (the details panel), **VoteControl**, **ScoreZones**, **Slopprint**, **FoldStrip**, **NoticePanel**, **StatTile**, **HighlightFrame** (deprecated — Highlight mode tints the MopIcon). Shared tone/tell tables in `tones.js`.
- `account/` (proposed) — **SignUpCard**, **UpgradePrompt**

**UI kits** (`ui_kits/<product>/`) — `extension/` (popup in four states, first-run page), `feed/` (overlay in both modes, draft checker), `site/` (slopmop.lol landing with pricing, og card), `account/` (proposed), `placements/` (proposed: beyond LinkedIn, dark mode).

**Guidelines** (`guidelines/*.card.html`) — Colors ×4 (ink, mop, semantic, verdict scale), Type ×4, Spacing ×2, Shape ×4, Brand ×7 (mark & wordmark, essence, promise, voice, lexicon, the twelve questions, iconography & motion).

**Back to the extension** (changes the system now assumes or recommends):
1. Define `--flag-unsure` and `--flag-unsure-wash` in `src/shared/tokens.css` (the gray chip currently has no background).
2. Copy debts above: drop "AI" from the chip sentences, the empty-signs line and the onboarding subtitle.
3. Re-export `og-image.png` — its footer tag changed from "free · open source · MIT" to "free for one feed".

### Dark-mode color rules
- Raw ramps (ink-*, paper-*) invert in dark. Use them only where inverting is right.
- Text on solid blue/red fills: `--text-on-solid` (always white). Text on yellow: `--text-on-accent` (always dark).
- Floating panels: `--surface-raised` (lighter than the page in dark: muted, never black); panel foot `--surface-raised-foot`.
- Chart grids `--chart-grid` and bar tracks `--track` become light knockouts in dark.
