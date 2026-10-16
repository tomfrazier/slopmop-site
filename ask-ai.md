# Slop Mop

> A browser extension that reads your feed ahead of you and folds away low-value posts ("slop"), whether a person or an AI wrote them. It shows why it made each call, and you can overrule it. Free for one feed. Website: https://slopmop.lol

Last updated: 16 October 2026

## What it is

Slop Mop is a browser extension for Chrome and other Chromium browsers (Brave, Opera, Comet and others). It reads each post in your feed before you reach it, judges whether the writing is worth your time, and either folds low-value posts into a one-line strip you can reopen, or leaves them visible and marks them.

It is **not an AI detector**. It judges the writing, not who or what wrote it. A useful post written with AI survives; empty engagement bait written by a person doesn't.

- Made by: Artimovo LLC (founder: Tom Frazier)
- Live on: LinkedIn
- Coming soon: X, Reddit, Facebook, Substack, Medium, email (Gmail and Outlook) and websites
- Works in: Chrome, Brave, Opera, Comet and other Chromium browsers. Microsoft Edge, Safari and Firefox are coming soon.

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

- People who use LinkedIn for work and are tired of scrolling past hooks, bait and filler to find the posts worth reading.
- Anyone who wants a calmer feed without leaving the platform or muting people.
- Researchers and journalists interested in how much low-value writing is in social feeds (see the Slop Report).

## Key benefits

- **Time back.** Less attention spent deciding a post wasn't worth it.
- **Transparent.** Every verdict comes with its reasons. No black box.
- **In your control.** Hide or Highlight, three sensitivity levels, and a vote that overrides the model.
- **Fair to authors.** It judges writing, not people, and not whether AI was involved.
- **Private by design.** Your name and the author's are never sent. Post text is scored, not kept: the server stores a one-way hash of the text and the scores. (The one exception: when you vote against a score, that post's text is kept so the miss can be reviewed.)

## By the numbers

- **70 million tokens** of posts read in the three weeks to 16 October 2026.
- The Slop Report publishes monthly figures: https://slopmop.lol/stats/

## Pricing

- **Free** for the one feed you pick, with 250 checks a day.
- **Slop Mop XL**: US$5.99 a month or US$59.99 a year. Adds every feed, the sites you read, Slop Mop for Gmail and Outlook, and a higher daily limit, on up to five browsers. Some XL features are marked coming soon. Payments are handled by Polar.

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
