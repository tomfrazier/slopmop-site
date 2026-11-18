# How to write a content page for slopmop.lol

Every page under /glossary/, /patterns/, /for/, /compare/ and /guides/ is one Markdown file in `_content/<family>/<slug>.md`.
The build (`_build/content.py`) turns it into `/<family>/<slug>/index.html`, adds it to its hub and to `sitemap-<family>.xml`.

## File format

```
---
{ "json": "frontmatter, one object, valid JSON" }
---
Markdown body.
```

The slug is the file name: lowercase, hyphens, no dates (`engagement-bait.md` → `/patterns/engagement-bait/`).

### Frontmatter fields (all families)

| field | required | notes |
|---|---|---|
| `title` | yes | The H1. Sentence case. |
| `seo_title` | yes | `<title>`, 60 characters max, ends with ` · Slop Mop` only if it fits. |
| `description` | yes | Meta description, 120–155 characters, plain and specific. |
| `summary` | yes | One sentence for hub cards and the glossary index, 140 characters max. |
| `updated` | yes | ISO date the content was written, e.g. `2026-10-18`. |
| `related` | yes | 3–6 internal paths that genuinely help the reader next, e.g. `"/glossary/workslop/"`, `"/patterns/engagement-bait/"`, `"/for/recruiters/"`. Only link pages listed in the site map below. |
| `sources` | if any facts | `[{"title": "…", "publisher": "…", "url": "https://…", "date": "2025-09-22"}]`. Every factual claim that isn't about Slop Mop itself needs one. |

### Family-specific fields

- **glossary**: `term`, `aliases` (array, may be empty), `punchline` (the short witty line, under 70 characters), `kind` (`"ai"`, `"human"` or `"both"`: whether the term is about AI content, human content or both), `first_seen` (year or decade as a string, e.g. `"2014"` or `"2000s"`; `""` if unknown), `coined_by` (person/publication if well attested, else `""`), `sensitivity` (`""`, `"political"` or `"health"`).
- **patterns**: `tell` (display name, e.g. `Engagement bait`), `short` (the 3–8 word gloss used on the homepage, e.g. `asking for comments, reposts and follows`), `order` (1–9).
- **for**: `kind` (`"role"` or `"network"`), `audience` (plural noun, e.g. `recruiters`), `network_status` (network pages only: `"live"`; every network is live).
- **compare**: `kind` (`"product"` or `"category"`), `them` (name of the thing compared), `them_url` (official site, products only), `checked` (ISO date the facts were checked), `table` (array of `{"row": "…", "slopmop": "…", "them": "…"}`, 5–9 rows, short cell text), `verdict` (one or two sentences: who should pick which).
- **guides**: `network` (`linkedin`, `reddit`, `x`, `facebook`, `substack`, `medium`, `websites`, `email`), `publish_date` (ISO, set by the brief you were given), `verified` (ISO date you checked the platform steps), `minutes` (reading time, integer).

## Markdown you can use

- `## Heading` and `### Subheading` (sentence case). Don't write an H1; the template adds it.
- Paragraphs, `- ` bullet lists, `1. ` numbered lists (one level of nesting with two-space indent), `**bold**`, `*italic*`, `[text](url)`.
- Internal links are root-relative: `[engagement bait](/patterns/engagement-bait/)`. External links are full https URLs.
- `> ` a callout paragraph (one per page at most).
- Pipe tables (`| a | b |` with a `|---|---|` line).
- Example cards, the site's slop/fine pairs. Always write examples as originals: never quote a real person's post.

```
:::slop
I got rejected 47 times. Then everything changed. Here's what I learned 👇
:::
:::fine
We rebuilt our onboarding flow in March. Trial-to-paid went from 9% to 14%.
:::
```

Use `:::example` for a neutral example (neither slop nor fine), e.g. a dated usage or a screenshot description.

## Voice

The site sounds like a sharp, friendly editor: plain words, specific claims, short paragraphs, some dry wit. British spelling (`realise`, `colour`, `organise`), sentence case, numbers as digits, dates like `17 October 2026`.

**Our own pages must never contain slop.** Check your draft against the nine tells and remove every one:

1. Scroll-stopper: no dramatic hooks, no one-line-paragraph drumrolls, no "Here's the thing".
2. Engagement bait: no "comment below", "share this", "follow for more".
3. Hype words: no game-changing, unlock, elevate, revolutionise, seamless, robust, cutting-edge, leverage, empower, supercharge, delve, landscape, realm, journey, navigate (figurative), unprecedented.
4. Empty praise: no "incredibly powerful", "truly transformative".
5. No-catch promises: always say the cost or limit.
6. "Not X, but Y": don't define things by what they aren't. ("It's not about A, it's about B" is banned. Plain negation of a factual claim is fine: "Slop Mop doesn't delete posts.")
7. Flowery prose: no tapestries, symphonies, dances.
8. Stiff phrasing: no "Furthermore", "Moreover", "In conclusion", "It's worth noting", "In today's fast-paced world", "Ultimately,".
9. Too-tidy stories: no invented anecdotes with a moral.

Also: no em-dash chains (one em dash per paragraph at most), no rhetorical-question openers, no "In this guide we will…", no closing summary that repeats the page.

## Product truth (launch state: these pages launch with the update that ships every network)

`/ask-ai.md` describes the product, but it predates this launch. For these pages, **everything is live**:

- Slop Mop works on **LinkedIn, X, Reddit, Facebook, Substack (Notes and posts), Medium, the articles and websites you read, and email (Gmail and Outlook)**. Describe what it does on each network in the present tense. Never say "coming soon", "planned" or "LinkedIn only".
- It runs in **Chrome, Edge, Firefox and Safari**, and in Chromium browsers such as Brave, Opera, Arc, Vivaldi and Comet, on desktop. Don't claim phone apps.
- Email works through the Slop Mop for Gmail and Slop Mop for Outlook add-ons. Before an email is checked, personal details are replaced with placeholders in your mailbox; only what the sender wrote is sent, never attachments or quoted earlier messages; spam, private, legal, health and transactional mail are never read unless you check one by hand. Voting isn't available for email.
- It judges the writing, not who wrote it. It is not an AI detector. Useful AI-assisted posts survive; empty human posts can be flagged.
- Hide mode folds likely slop into a one-line strip you can reopen; Highlight mode marks it. Sensitivity Mild/Moderate/Aggressive. Vote to overrule (not on email). It never deletes, reports, mutes or blocks anything.
- Twelve questions: nine tells (scroll-stopper, engagement bait, hype words, empty praise, no-catch promises, "not X, but Y", flowery prose, stiff phrasing, too-tidy story) and three counter-signals (sounds like a person, useful to readers, reader response).
- **Free** for the one feed you pick, with 250 checks a day. **Slop Mop XL**: US$5.99 a month or US$59.99 a year, adds every feed, the sites you read, Gmail and Outlook, and a higher daily limit, on up to five browsers.
- Made by Artimovo LLC, founded by Tom Frazier.
- Never mention Jev or TypeSafe. Call the model "an AI model designed for calibrated decisions". Don't link to graphite.io.
- Don't invent statistics, user counts, quotes, testimonials or study results. The only Slop Mop numbers you may use are the ones above and in ask-ai.md.
- Don't give medical, legal or financial advice. Terms touching mental health say so plainly and point to qualified help where relevant.
- Political or contested terms: describe who uses the term and how, attribute it, give the main criticism of it, and don't endorse a side or name private individuals.

## SEO: keyword, headings and links

- Every page has a `"keyword"` frontmatter field: the primary search phrase, lowercase (e.g. `"clean up reddit feed"`, `"what is workslop"` → use `"workslop"` for glossary terms, `"engagement bait"`, `"slop mop vs gptzero"`, `"linkedin feed filter for recruiters"`).
- The keyword's main words must appear in the slug, the `title`, the `seo_title` and **at least one H2** (two is better). Write it naturally; don't stuff it.
- Every page links, in the body, to: the homepage (`/`) or [How it works](/how-it-works.html), at least two of the hubs (`/glossary/`, `/patterns/`, `/for/`, `/compare/`, `/guides/`) or pages inside them, and **at least one reputable third-party page** (a source, the platform's own help page, a dictionary). Use descriptive link text, never "click here".

## Calls to action

The template adds the install box, a header image, an illustrated "Slop Mop at work" figure and the footer. In the body, mention Slop Mop where it genuinely helps the reader's problem (usually once or twice; comparison and "for" pages naturally more), and end the page's last section with one plain sentence that points to adding it, e.g. "[Add Slop Mop to your browser](/) and it folds this kind of post for you." Don't write your own button.

## Site map you may link to

- `/` home, `/how-it-works.html`, `/help.html`, `/about.html`, `/privacy.html`
- `/glossary/` and `/glossary/<slug>/` for every glossary term (see `_content/glossary/`, and `_build/glossary_slugs.txt`)
- `/patterns/` and `/patterns/<slug>/`: `scroll-stopper`, `engagement-bait`, `hype-words`, `empty-praise`, `no-catch-promises`, `not-x-but-y`, `flowery-prose`, `stiff-phrasing`, `too-tidy-story`
- `/for/` and `/for/<slug>/` (see `_build/for_slugs.txt`)
- `/compare/` and `/compare/<slug>/` (see `_build/compare_slugs.txt`)
- `/guides/` and `/guides/<network>/<slug>/` (guides only link to guides with an earlier or equal `publish_date`)
