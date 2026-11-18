---
{
  "title": "Slop Mop vs keyword and mute-word filters",
  "seo_title": "Slop Mop vs keyword filters: words or writing? · Slop Mop",
  "description": "Keyword filters hide posts containing words you list. Slop Mop judges how a post is written, with no list. Where each works best, and how to combine them.",
  "summary": "Keyword filters hide posts that contain words you choose; Slop Mop judges the whole post's writing and needs no word list.",
  "keyword": "slop mop vs keyword filters",
  "updated": "2026-10-18",
  "kind": "category",
  "them": "Keyword and mute-word filters",
  "checked": "2026-10-18",
  "table": [
    {"row": "What it does", "slopmop": "Folds or marks low-value posts", "them": "Hides posts or articles that contain words you list"},
    {"row": "What it judges", "slopmop": "The writing: nine tells and three counter-signals", "them": "Whether your words appear, whatever the quality"},
    {"row": "Setup", "slopmop": "Install and pick a mode and sensitivity", "them": "Write and maintain a list of words and phrases"},
    {"row": "Predictability", "slopmop": "A judgement call per post, with reasons shown", "them": "Fully predictable: a match is a match"},
    {"row": "Where it works", "slopmop": "LinkedIn, X, Reddit, Facebook, Substack, Medium, websites, Gmail and Outlook", "them": "Built into some apps and readers (e.g. Mastodon, Feedly); many extensions"},
    {"row": "Browsers", "slopmop": "Chrome, Edge, Firefox, Safari and other Chromium browsers", "them": "Built-in filters work in the app, phone included"},
    {"row": "Price", "slopmop": "Free for one feed, 250 checks a day; XL US$5.99 a month for all", "them": "Often free; Feedly's Mute Filters need a Pro+ or Enterprise plan"},
    {"row": "You can overrule it", "slopmop": "Yes: reopen in one click, and your vote overrides the model", "them": "Yes: edit or delete the filter"}
  ],
  "verdict": "Pick a keyword filter to keep a specific topic, name or spoiler out of view. Pick Slop Mop when the problem is how posts are written, which no word list catches well. They combine well.",
  "related": ["/compare/slop-mop-vs-linkedin-feed-controls/", "/compare/slop-mop-vs-unfollowing-and-muting/", "/compare/slop-mop-vs-rss-readers/", "/patterns/hype-words/", "/patterns/engagement-bait/"],
  "sources": [
    {"title": "Dealing with unwanted content", "publisher": "Mastodon documentation", "url": "https://docs.joinmastodon.org/user/moderating/", "date": ""},
    {"title": "How to use advanced muting options", "publisher": "X Help Center", "url": "https://help.x.com/en/using-x/advanced-x-mute-options", "date": ""},
    {"title": "How can I add/create a Mute Filter?", "publisher": "Feedly Documentation", "url": "https://docs.feedly.com/article/109-how-can-i-add-create-a-mute-filter", "date": "2025-05-19"}
  ]
}
---
A keyword filter is the oldest trick for a cleaner feed: list the words you never want to see, and anything containing them disappears. It works well for topics. It works badly for slop, because slop is a matter of how something is written, and the same words turn up in good posts and bad ones.

## What keyword filters and Slop Mop each do

**Keyword and mute-word filters** hide posts or articles that contain words or phrases you choose. Some platforms and readers build them in. On Mastodon you set them under Preferences > Filters, where [each filter can have an expiry date, apply in chosen contexts and match whole words only](https://docs.joinmastodon.org/user/moderating/). Feedly's Mute Filters let you mute a keyword in one folder or all of them, for a day, a week, a month or forever; as of October 2026, [they're part of Feedly's Pro+ and Enterprise plans](https://docs.feedly.com/article/109-how-can-i-add-create-a-mute-filter). Many browser extensions add the same idea to sites that lack it.

**Slop Mop** reads each post in your feed and judges the writing, on LinkedIn, X, Reddit, Facebook, Substack and Medium, as well as the articles you read and the mail in Gmail and Outlook. An AI model designed for calibrated decisions rates nine tells of slop and three counter-signals (sounds like a person, useful to readers, reader response), then gives a score out of 100. You choose Hide mode, which folds likely slop into a strip you can reopen, or Highlight mode, which only marks it. [How it works](/how-it-works.html) explains the score.

## Slop Mop vs keyword filters: where they differ

**You have to think of the words first.** A keyword filter catches only what you list. Slop rarely shares vocabulary. [Engagement bait](/patterns/engagement-bait/) can ask for a comment in a hundred phrasings, and a [scroll-stopper](/patterns/scroll-stopper/) hook is a shape (a dramatic line, then a column of one-line paragraphs) more than a set of words. Slop Mop looks for those patterns without a list.

**Matching words hides good posts too.** Mute "growth" and you lose the hype, along with a careful post about a growth-rate bug in someone's billing system. Slop Mop weighs the whole post, including counter-signals such as whether it's useful to readers, so a specific, plain post can use any word it likes.

:::slop
This game-changing growth hack will 10x your pipeline. No ads. No cold calls. No budget. Comment "GROWTH" for the playbook.
:::
:::fine
Our growth rate looked flat for two months because the dashboard counted annual plans once. Fixing the query showed 4% month on month.
:::

A filter on "growth" hides both of these. Slop Mop is built to fold the first and leave the second alone.

**Predictability.** Here keyword filters win. You know exactly what will be hidden and why, and nothing is sent anywhere to be judged. Slop Mop makes a judgement on every post and can get one wrong. It answers that by showing its reasons (click the mop for the score, the strongest signs and a chart of the nine tells) and letting you vote to overrule it in your own feed.

**Upkeep.** A word list needs maintaining: new phrases appear, old ones go stale. Slop Mop needs no list. You set a sensitivity (Mild, Moderate or Aggressive) and leave it.

**Reach.** Keyword filters are built into many apps, so they follow you to your phone; X, for one, has [its own muted words](https://help.x.com/en/using-x/advanced-x-mute-options). Slop Mop runs on desktop, in Chrome, Edge, Firefox, Safari and other Chromium browsers, across the six networks above, the web and your inbox. On a computer the two cover much the same ground; on a phone, only the built-in filters are there.

## When to use a keyword filter

- You want a specific topic, name, event or spoiler kept out of sight entirely.
- You want rules you can predict exactly, applied without any outside service.
- You use an app or reader that already has filters built in, or you read mostly on your phone.

## When to use Slop Mop

- The problem is how posts are written (hooks, bait, hype, filler) more than what they're about.
- You don't want to maintain a word list, or you've found one hides too much.
- You read LinkedIn, X, Reddit or Facebook on a computer, and the same habits keep turning up whatever the topic.

## Using both

They cover different ground. A keyword filter handles topics you never want to see; Slop Mop handles posts on any topic that aren't worth reading. If you want to drop a whole source rather than a word, [unfollowing and muting](/compare/slop-mop-vs-unfollowing-and-muting/) is the next comparison. If you mostly read LinkedIn, [LinkedIn's own feed controls](/compare/slop-mop-vs-linkedin-feed-controls/) are worth knowing about too. Keep your word list for topics, and [add Slop Mop to your browser](/) for the posts no list catches.
