---
{
  "title": "Slop Mop vs News Feed Eradicator",
  "seo_title": "Slop Mop vs News Feed Eradicator: sort the feed or drop it?",
  "description": "News Feed Eradicator replaces your social feeds with a quote. Slop Mop keeps your LinkedIn feed and folds the low-value posts. Which suits your problem.",
  "summary": "News Feed Eradicator removes the whole feed so you stop scrolling. Slop Mop keeps the feed and folds only the posts it judges low-value.",
  "updated": "2026-10-18",
  "kind": "product",
  "them": "News Feed Eradicator",
  "them_url": "https://west.io/news-feed-eradicator/",
  "checked": "2026-10-18",
  "table": [
    {"row": "What it does", "slopmop": "Folds or marks low-value posts, one by one", "them": "Replaces the whole feed with a quote"},
    {"row": "What it judges", "slopmop": "The writing of each post, against twelve questions", "them": "Nothing: every post in the feed goes"},
    {"row": "Where it works", "slopmop": "LinkedIn today; other networks, websites and email coming soon", "them": "Facebook, X and several other social sites"},
    {"row": "Browsers", "slopmop": "Chrome and other Chromium browsers", "them": "Chrome and Firefox"},
    {"row": "Price", "slopmop": "Free for one feed, 250 checks a day; XL coming soon at US$5.99 a month", "them": "Free, open source (MIT)"},
    {"row": "Shows its reasons", "slopmop": "Yes: score, strongest signs and a chart of the nine tells", "them": "Not needed; the rule is all or nothing"},
    {"row": "You can overrule it", "slopmop": "Yes, vote on any post", "them": "Switch it off for a site"},
    {"row": "Where it runs", "slopmop": "Post text, without names, is scored on Slop Mop's server", "them": "In your browser; the developer says it collects no data"}
  ],
  "verdict": "Pick News Feed Eradicator if you want to stop reading feeds and keep only posting and messaging. Pick Slop Mop if you still want the LinkedIn feed, minus the filler.",
  "related": ["/compare/slop-mop-vs-feed-blockers/", "/compare/slop-mop-vs-unhook/", "/compare/slop-mop-vs-linkedin-feed-controls/", "/glossary/brain-rot/", "/for/linkedin/"],
  "sources": [
    {"title": "News Feed Eradicator", "publisher": "Chrome Web Store", "url": "https://chromewebstore.google.com/detail/fjcldmjmjhkklehbacihaiopjklihlgg", "date": "2026-07-16"},
    {"title": "News Feed Eradicator", "publisher": "Jordan West", "url": "https://west.io/news-feed-eradicator/", "date": "n.d."},
    {"title": "jordwest/news-feed-eradicator", "publisher": "GitHub", "url": "https://github.com/jordwest/news-feed-eradicator", "date": "n.d."}
  ]
}
---
If a feed is costing you time, there are two broad fixes: take the feed away, or make it worth reading. News Feed Eradicator is the first. Slop Mop is the second. Which one suits you depends on whether you want to read the feed at all.

## What each one does

**News Feed Eradicator** is a free, open-source browser extension by Jordan West, released under the MIT licence ([Jordan West](https://west.io/news-feed-eradicator/)). It removes the feed on Facebook, X and other social sites and puts an inspirational quote in its place. The rest of each site keeps working, so you can still post, message and visit profiles without being pulled into the scroll ([Chrome Web Store](https://chromewebstore.google.com/detail/fjcldmjmjhkklehbacihaiopjklihlgg)). It runs on Chrome and Firefox. The developer describes the project as mostly "done" and keeps it deliberately minimal ([GitHub](https://github.com/jordwest/news-feed-eradicator)). The Chrome listing shows the sites it currently supports.

**Slop Mop** is a Chrome and Chromium extension that reads each LinkedIn post as you scroll and asks twelve questions about the writing: nine tells of slop, such as [scroll-stopper hooks](/patterns/scroll-stopper/) and [too-tidy stories](/patterns/too-tidy-story/), and three counter-signals, such as whether the post is useful to readers. Each post gets a score out of 100. Hide mode folds likely slop into a one-line strip you can reopen; Highlight mode marks it and hides nothing. LinkedIn is the only network it works on today. X, Reddit, Facebook, Substack, Medium, websites and email are coming soon.

## Where they differ

**How much goes.** News Feed Eradicator removes every post, the good ones too. Slop Mop removes nothing; it folds the posts it judges low-value and leaves the rest in place. If the problem is that one good post in twenty keeps you scrolling through the other nineteen, News Feed Eradicator solves it by removing all twenty, and Slop Mop by folding the nineteen it can spot.

**What it's for.** News Feed Eradicator is a habit tool. Its pitch is getting your time back from endless scrolling. Slop Mop is a reading tool: it assumes you'll keep reading the feed and tries to make that reading worth it. Slop Mop won't cut your scrolling time if the feed is what you'd scroll anyway, and it may even make the feed more pleasant to stay in.

**Reliability.** News Feed Eradicator can't misjudge a post, because it doesn't judge any. Slop Mop can get calls wrong. It shows its reasons when you click the mop icon, says Not sure and leaves a post alone when it isn't confident, and lets you vote to overrule it in your own feed. If you want zero chance of a misfire, the blunt tool is more dependable.

**Privacy.** The Chrome Web Store listing says News Feed Eradicator's developer has disclosed that it does not collect or use your data. Slop Mop has to send post text (never your name or the author's) to its scoring service to judge it. The server keeps a one-way hash of the text and the scores, except when you vote against a score, when that post's text is kept so the miss can be reviewed.

**Reach and cost.** News Feed Eradicator covers several social sites now, for free. Slop Mop covers LinkedIn only for now and is free for one feed with 250 checks a day; Slop Mop XL, coming soon, will be US$5.99 a month or US$59.99 a year.

## When to use News Feed Eradicator

- You open a social site to send a message or post something and lose half an hour to the feed.
- You've decided the feed isn't worth reading at all and want it gone with no exceptions.
- You want something free, simple and fully local, across more than one site.
- You use Firefox, where Slop Mop doesn't run yet.

## When to use Slop Mop

- You get real value from your LinkedIn feed (job news, people you've worked with, posts in your field) and the problem is the bait and filler between them.
- You want to judge for yourself: Highlight mode marks likely slop without hiding anything, and Hide mode folds it into a strip you can reopen.
- You'd rather see a feed of posts that passed a bar than no feed at all.

## Using both

They can both run, on different sites. One way to split it is to drop the feed entirely on one network and filter it on another: News Feed Eradicator on the sites you only use for messaging, Slop Mop on LinkedIn, where you still want the feed. On the same site you'd have to choose, since an eradicated feed has no posts left to judge.

If the feed you want gone is YouTube's, [Slop Mop vs Unhook](/compare/slop-mop-vs-unhook/) compares a tool that hides recommendations and Shorts. For the wider category, see [Slop Mop vs feed blockers and hiders](/compare/slop-mop-vs-feed-blockers/). And before installing anything, it's worth knowing what LinkedIn's own settings can do; [Slop Mop vs LinkedIn's own feed controls](/compare/slop-mop-vs-linkedin-feed-controls/) covers them.
