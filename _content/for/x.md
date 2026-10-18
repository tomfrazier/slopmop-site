---
{
  "title": "Slop Mop for X: a timeline filter for reply guys and thread bait",
  "seo_title": "X timeline filter for reply guys and bait · Slop Mop",
  "description": "An X timeline filter that judges the writing: why engagement farming pays, what Slop Mop does to posts and replies, and how X's muted words fit in.",
  "summary": "Slop Mop reads posts and replies on X as you scroll and folds or marks the thread bait, reply farming and filler.",
  "keyword": "x timeline filter",
  "updated": "2026-10-18",
  "kind": "network",
  "audience": "people who read X",
  "network_status": "live",
  "related": ["/patterns/engagement-bait/", "/patterns/scroll-stopper/", "/patterns/hype-words/", "/glossary/ai-slop/", "/for/journalists/", "/for/creators/"],
  "sources": [
    {"title": "X changes creator payouts to depend on engagement, not ads", "publisher": "TechCrunch", "url": "https://techcrunch.com/2024/10/09/x-changes-creator-payouts-to-depend-on-engagement-not-ads/", "date": "2024-10-09"},
    {"title": "X deletes nearly 4,000 accounts from monetisation programme, issues new rules", "publisher": "Legit.ng", "url": "https://www.legit.ng/people/1719932-x-deletes-4000-accounts-monetisation-programme-issues-rules-nigerians-others/", "date": "2026-07"},
    {"title": "How to use advanced muting options", "publisher": "X Help Center", "url": "https://help.x.com/en/using-x/advanced-x-mute-options", "date": ""}
  ]
}
---
On X, slop follows the money. The platform shares revenue with some creators, and in October 2024 it changed how: payouts would depend on engagement with a creator's posts from Premium subscribers, instead of on ads shown in their replies ([TechCrunch](https://techcrunch.com/2024/10/09/x-changes-creator-payouts-to-depend-on-engagement-not-ads/)). TechCrunch noted at the time that the change seemed to reward anything that got replies, for whatever reason.

What followed is familiar to anyone who reads the For You feed. Accounts promise to follow everyone who replies. Threads open with a warning that most people have no idea what's coming. Big posts collect a fringe of replies that say nothing except "this". In July 2026 X's head of product said accounts that repeatedly solicit engagement with lines like "I'll follow everyone who replies" would be removed from the revenue programme, and that nearly 4,000 accounts had been removed in a single day ([Legit.ng](https://www.legit.ng/people/1719932-x-deletes-4000-accounts-monetisation-programme-issues-rules-nigerians-others/)). Those figures come from X itself.

## What slop looks like on X

X slop is short, loud and built to be answered. Three formats do most of the work.

The thread with a drumroll and a numbered promise:

:::slop
AI just changed everything.

Most people have no idea what's coming.

Here are 11 tools that will make you unstoppable in 2027 🧵👇
:::
:::fine
We ran three transcription tools over 40 hours of support calls. The open-source one handled accents best. The cheapest mangled our product names in about a third of calls. Numbers per tool below.
:::

The engagement farm, which asks for a reply and offers nothing to reply to:

:::slop
Drop a 🔥 if you agree.

I'll follow everyone who replies. Let's grow together 🚀
:::
:::fine
Question for people running small Postgres setups: do you still vacuum by hand, or have you left it to autovacuum? We're seeing table bloat on one busy table and nowhere else.
:::

The reply guy, who turns up under a big account's post:

:::slop
This. 💯 So underrated. Everyone needs to read this.
:::
:::fine
The chart starts in 2020, which hides the 2018 dip. Start it at 2015 and the trend is a lot flatter.
:::

The first is a [scroll-stopper](/patterns/scroll-stopper/) with [hype words](/patterns/hype-words/) attached. The second is pure [engagement bait](/patterns/engagement-bait/). The third, the [reply guy](/glossary/reply-guy/), is harder to spot one at a time and obvious in bulk: thirty of them under one post push the useful replies out of sight.

## How Slop Mop filters your X timeline

On X, Slop Mop reads the posts in your timeline and the replies under a post you open, shortly before you reach them. It runs on desktop in Chrome, Edge, Firefox, Safari and Chromium browsers such as Brave, Opera, Arc, Vivaldi and Comet. It sends each post's text and its public engagement counts to its scoring service, and never your handle or the author's.

An AI model designed for calibrated decisions answers twelve questions about the writing: nine tells of slop and three counter-signals (sounds like a person, useful to readers, and reader response). Each post gets a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure. A Not sure post is left alone.

- **Hide mode** folds a post past your threshold into a one-line strip where it was. Under a big post, thirty "This. 💯" replies become thirty thin lines, and the reply with the correction is easy to find. Click Show post to open one in place.
- **Highlight mode** hides nothing. The post's mop turns yellow for Possibly slop and red for Likely slop.
- **Sensitivity** is Mild, Moderate or Aggressive.

Click the mop on a post to see the details panel: the score, the strongest signs and the Slopprint, a nine-spoke chart with one spoke per tell. A formula thread usually spikes on scroll-stopper and hype words at once, which is why it gets flagged; one loud habit on its own is discounted. The reader response bar counts replies and reposts for more than likes, and a post with a big like count and little discussion gets little credit for it.

If you disagree, vote Not sure, No, Maybe or Probably. Your vote overrides the model in your own timeline, and X never sees it. There's no vote on your own posts.

It judges the writing, and it isn't an AI detector. A sharp post drafted with AI stays. A hand-typed "drop a 🔥" probably won't. It never deletes, reports, mutes or blocks anything, so it doesn't touch who you follow.

The free plan covers the one feed you pick, with 250 checks a day, and X can be that feed. Slop Mop XL (US$5.99 a month or US$59.99 a year) adds every other feed, the sites you read, Gmail and Outlook, and a higher daily limit. The scoring is set out on [how it works](/how-it-works.html).

## X's own muted words, and how they fit with Slop Mop

X's muted words are the closest built-in tool, and they're more flexible than most people realise ([X Help Center](https://help.x.com/en/using-x/advanced-x-mute-options)).

1. **Mute words, phrases, emojis and hashtags.** In settings, open the muted words list and add an entry. Phrases count, so "follow everyone who replies" or "drop a" will work, as will an emoji such as 🧵.
2. **Choose where it applies.** On the web you can apply a mute to your Home timeline, Notifications or both.
3. **Choose whose posts.** Pick "From anyone" or "From people you don't follow". The second is useful for formula threads, which mostly reach you from accounts you never chose.
4. **Choose how long.** Mutes last forever by default. You can pick 24 hours, 7 days or 30 days instead.
5. **Review the list now and then.** You can see and remove muted words in the same settings page.

Muted words are literal. They catch the exact phrase and miss the next variation, and they'll also hide a friend who uses the phrase sincerely. The two fit together: keep a short muted list for phrases you never want to see, and let Slop Mop judge the variations by their writing. [Slop Mop vs keyword filters](/compare/slop-mop-vs-keyword-filters/) goes into the difference.

## Who it's for

People who still use X for news, expertise and the occasional good argument:

- [Journalists](/for/journalists/) following breaking stories, where farmed replies bury eyewitnesses and corrections.
- [Developers](/for/developers/) and [researchers](/for/researchers/) who follow specialists and want their posts without the thread-merchant layer.
- [Investors](/for/investors/) and [founders](/for/founders/) reading industry chatter that's increasingly written to be quoted.
- [Creators](/for/creators/) who want to see what their peers make, and who'd prefer not to absorb the formulas by osmosis.

[Add Slop Mop to your browser](/) and it folds posts and replies like these out of your X timeline for you.
