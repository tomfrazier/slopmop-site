# Slop Mop

> A browser extension that reads online content ahead of you and folds away low-value writing ("slop"), whether a person or an AI wrote it. Live on LinkedIn today, with X, Reddit, Facebook, Substack, Medium, websites and email coming soon. It shows why it made each call, and you can overrule it. Free for one feed. Website: https://slopmop.lol

Last updated: 23 October 2026

## What it is

Slop Mop is a browser extension for Chrome and other Chromium browsers (Brave, Opera, Comet and others). It reads the content you scroll (posts in your feeds today; articles, websites and email soon) before you reach it, judges whether the writing is worth your time, and either folds low-value posts into a one-line strip you can reopen, or leaves them visible and marks them.

It is **not an AI detector**. It judges the writing, not who or what wrote it. A useful post written with AI survives; empty engagement bait written by a person doesn't.

- Made by: Artimovo LLC, founded by Tom Frazier
- Live on: LinkedIn
- Coming soon: X, Reddit, Facebook, Substack, Medium, email (Gmail and Outlook) and websites
- Works in: Chrome, Brave, Opera, Comet and other Chromium browsers. Microsoft Edge, Safari and Firefox are coming soon.

## Background

Slop Mop started in September 2026 as a test of a new kind of AI model: a calibrated decision model. Instead of writing text, it answers fixed questions with choices, scores or calibrated probabilities. Tom Frazier wanted a real problem to test it on, and the one he ran into every day was slop: feeds full of hooks, bait and filler that took attention and gave nothing back.

The timing lined up. The same week, Graphite published its "AI Tells" study, built on 100,000 articles: 10,000 human-written articles from before ChatGPT, and 90,000 rewrites of them by nine AI models. It found about 13,000 words and phrases that appear at least twice as often in AI writing as in human writing. That research became Slop Mop's starting point: six of its nine tells come from it, and the other three are feed habits added on top.

Slop Mop brought three things together: solid research on what slop looks like, a model built to make calibrated calls, and a problem almost everyone online recognises. It launched as a free, open-source (MIT-licensed) Chrome extension and quickly drew attention, including coverage in The Register and a discussion on Hacker News. Artimovo has since turned it into a commercial product, tuned on more than 100 million tokens of real posts.

## Who makes it

Slop Mop is from **Artimovo**, Tom Frazier's new company. Artimovo is built around one of the biggest problems facing us today: execution is scaling faster than judgment. AI makes it cheap to produce more of everything, but not to know what is worth acting on. Artimovo builds products that help with judgment, clarity and autonomy, and Slop Mop is the first of them.

### About Tom Frazier

Tom Frazier is the founder of Artimovo. He has deep experience in AI and in solving real problems with companies. He is the author of *The Idea Chose You*, a book about how to build a company in the age of AI.

- Tom Frazier: https://tomfrazier.com
- The Idea Chose You: https://theideachoseyou.com
- Artimovo: https://artimovo.com

## How it works

1. **Reads ahead.** As you scroll, Slop Mop sends the text of each new post (never your name, never the author's) to its scoring service.
2. **Asks twelve questions.** An AI model designed for calibrated decisions rates nine "tells" of slop and three counter-signals:
   - Tells: scroll-stopper hooks, engagement bait, hype words, empty praise, no-catch promises, "not X, but Y" framing, flowery prose, stiff phrasing, and too-tidy stories.
   - Counter-signals: sounds like a person, useful to readers, and reader response.
3. **Scores it.** Each post gets a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine, or Not sure.
4. **Acts on your settings.** In Hide mode, likely slop folds into a strip ("This post was hidden") that one click reopens. In Highlight mode, nothing is hidden and the post's mop icon turns yellow or red. Sensitivity is Mild, Moderate or Aggressive.
5. **Shows its working.** Click the mop on any post to see the score, the strongest signs, and the "Slopprint": a chart of all nine tells.
6. **You get the last word.** Vote Not sure, No, Maybe or Probably on any post. Your vote overrides the model in your own feed.

Slop Mop never deletes, reports, mutes or blocks anything.

## Who it's for

- Anyone who reads a lot online and is tired of scrolling past hooks, bait and filler to find what's worth reading.
- Social feeds: LinkedIn is live today. X, Reddit, Facebook, Substack and Medium are coming soon, along with the articles and websites you read.
- Email: Slop Mop for Gmail and Outlook is coming soon, for people whose inbox is full of the same filler.
- Anyone who wants a calmer feed or inbox without leaving the platform or muting people.

## Key benefits

- **Time back.** Less attention spent deciding a post wasn't worth it.
- **Transparent.** Every verdict comes with its reasons. No black box.
- **In your control.** Hide or Highlight, three sensitivity levels, and a vote that overrides the model.
- **Fair to authors.** It judges writing, not people, and not whether AI was involved.
- **Private by design.** Your name and the author's are never sent. Post text is scored, not kept: the server stores a one-way hash of the text and the scores. (The one exception: when you vote against a score, that post's text is kept so the miss can be reviewed.)

## By the numbers

- **100M+ tokens** of posts read so far.
- **1 in 5 LinkedIn posts was slop** from 27 September to 27 October 2026, after LinkedIn's own filtering: State of Slop, October 2026, https://slopmop.lol/state-of-slop/october-2026
- **5-star rating** on the Chrome Web Store: https://chromewebstore.google.com/detail/slop-mop/bhndmmjpeedeamimjijhagjgcibkdlho

## Pricing

- **Free** for the one feed you pick, with 250 checks a day.
- **Slop Mop XL** (coming soon): US$5.99 a month or US$59.99 a year. Adds every feed, the sites you read, Slop Mop for Gmail and Outlook, and a higher daily limit, on up to five browsers.

## In the press

- The Register: "Mop the slop from your LinkedIn feed with a new open source Chrome extension" (23 September 2026) https://www.theregister.com/ai-and-ml/2026/09/23/mop-the-slop-from-your-linkedin-feed-with-a-new-open-source-chrome-extension/5298679
- Hacker News discussion: https://news.ycombinator.com/item?id=49819820
- Product Hunt: https://www.producthunt.com/products/slop-mop
- Chrome Web Store listing: https://chromewebstore.google.com/detail/slop-mop/bhndmmjpeedeamimjijhagjgcibkdlho

## Get started

Add Slop Mop to your browser, free: https://chromewebstore.google.com/detail/slop-mop/bhndmmjpeedeamimjijhagjgcibkdlho

## More

- How it works, in detail: https://slopmop.lol/how-it-works.html
- About Slop Mop: https://slopmop.lol/about.html
- Help: https://slopmop.lol/help.html
- Privacy policy: https://slopmop.lol/privacy.html
- Contact: hello@slopmop.lol
