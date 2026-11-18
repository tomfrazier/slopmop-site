---
{
  "title": "Slop Mop for Reddit: a feed filter for karma farms and filler",
  "seo_title": "Reddit feed filter for karma farms and filler · Slop Mop",
  "description": "A Reddit feed filter for posts and comments: how karma farming and filler work, what Slop Mop does in your feed and threads, and Reddit's own mute tools.",
  "summary": "Slop Mop reads Reddit posts and comments as you scroll and folds or marks the reposts, filler replies and empty advice.",
  "keyword": "reddit feed filter",
  "updated": "2026-10-18",
  "kind": "network",
  "audience": "Reddit readers",
  "network_status": "live",
  "related": ["/patterns/engagement-bait/", "/patterns/empty-praise/", "/glossary/dead-internet-theory/", "/glossary/ai-slop/", "/for/developers/", "/for/researchers/"],
  "sources": [
    {"title": "Spam wiki", "publisher": "r/funny moderators, Reddit", "url": "https://www.reddit.com/r/funny/wiki/spam/", "date": ""},
    {"title": "Reddit's latest feature lets you mute entire communities", "publisher": "TechCrunch", "url": "https://techcrunch.com/2022/11/10/reddits-latest-feature-lets-you-mute-entire-communities/", "date": "2022-11-10"}
  ]
}
---
Reddit runs on votes, and votes add up to karma. Many communities set a minimum karma or account age before you can post, which makes an old account with a high score worth something to people who want to advertise or push an agenda. That's the root of most Reddit slop.

The pattern has a name: karma farming. The [r/funny moderators' spam wiki](https://www.reddit.com/r/funny/wiki/spam/) describes the cycle. New accounts repost submissions that did well before, copy other users' comments and drop low-effort posts in several loosely related communities, building a believable history and enough karma to clear posting thresholds. Then the accounts are held in reserve, sold, or put to work for advertising and astroturfing.

Not all Reddit slop comes from bots. People write empty comments too, and advice threads now attract tidy, generic answers that read like a model wrote them, whether or not one did.

## What slop looks like on Reddit

Reddit slop is short and repetitive more often than it's long. These are the three shapes to watch for.

The repost, usually an old hit with a new sentimental title:

:::slop
My grandpa (91) made this table out of an old barn door. He still goes to his workshop every single day 🥹 Give him some love!
:::
:::fine
Built a coffee table from a salvaged pine door. Took three weekends. The hardest part was filling the old lock hole so it didn't show. Cut list in the comments if anyone wants it.
:::

The comment that adds nothing but agreement:

:::slop
This is so true!! Great post, thanks for sharing 🙌
:::
:::fine
Same problem on mine. Replacing the thermal paste dropped idle temperatures by about 10°C, but it didn't touch the fan noise, so I suspect the bearing.
:::

The answer that has the structure of help without the help:

:::slop
Great question! Cooking rice is both an art and a science. Here are 5 key tips to elevate your rice game:
1. Choose quality rice
2. Measure carefully
3. Be patient
:::
:::fine
Rinse it until the water runs mostly clear. For basmati I use 1 cup rice to 1¼ cups water, lid on, lowest heat for 12 minutes, then 10 minutes off the heat without lifting the lid.
:::

The first two are cheap ways to collect votes. The third is [empty praise](/patterns/empty-praise/) followed by a list that could answer any cooking question. Repeated across a big community, they make it harder to find the person who actually knows. That worry, scaled up to the whole web, is what people mean by the [dead internet theory](/glossary/dead-internet-theory/).

## How Slop Mop works as a Reddit feed filter

On Reddit, Slop Mop reads the posts in your feed and the comments in the threads you open, shortly before you reach them. It runs on desktop in Chrome, Edge, Firefox, Safari and Chromium browsers such as Brave, Opera, Arc, Vivaldi and Comet. For each post or comment it sends the text and its public engagement counts to its scoring service. Your username and the author's are never sent.

An AI model designed for calibrated decisions answers twelve questions about the writing: nine tells of slop, such as [engagement bait](/patterns/engagement-bait/) and empty praise, and three counter-signals: sounds like a person, useful to readers, and reader response. The result is a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure. Not sure means the post is left alone.

What you see depends on your mode:

- **Hide mode** folds a post or comment past your threshold into a one-line strip where it was. In a long thread, forty "this!!" replies shrink to forty thin lines, and the reply with the actual fix stands out. Click Show post to open any of them in place.
- **Highlight mode** hides nothing. The item's mop turns yellow for Possibly slop and red for Likely slop.
- **Sensitivity** is Mild, Moderate or Aggressive.

Click the mop to open the details panel: the score, the strongest signs, and the Slopprint, a nine-spoke chart with one spoke per tell. A reposted sob story and a padded advice answer make different shapes, which is often more useful than the number. Three blue bars show the counter-signals, and "useful to readers" does a lot of work on Reddit, where one reply with a part number, a measurement or a step you can follow is the reason the thread exists.

You can vote Not sure, No, Maybe or Probably on anyone else's post. Slop Mop's vote is separate from Reddit's up and down arrows: it overrides the model in your own feed, and Reddit never sees it.

It judges the writing, and it isn't an AI detector, so a helpful answer drafted with AI survives while a hand-typed "this!!" may not. It never deletes, reports, mutes or blocks anything, which means voting, reporting and moderation stay with you and the community's moderators.

The free plan covers the one feed you pick, with 250 checks a day, so Reddit can be that feed. Slop Mop XL (US$5.99 a month or US$59.99 a year) adds every other feed, the sites you read, Gmail and Outlook, and a higher daily limit. The scoring is explained on [how it works](/how-it-works.html).

## Reddit's own feed controls, and how they fit with Slop Mop

Reddit's own tools work at the level of whole communities and accounts.

1. **Mute a community.** Open the three-dot menu on the community's page, or on a post from it in Home or Popular, and choose to mute it. You can also manage muted communities in your settings. Muting removes that community's posts from your Home and Popular feeds and from notifications, while you can still visit and take part. You need to be logged in, and you can mute up to 1,000 communities ([TechCrunch](https://techcrunch.com/2022/11/10/reddits-latest-feature-lets-you-mute-entire-communities/)).
2. **Report obvious spam.** Moderators rely on reports to catch reposts and copied comments, and the spam wiki above lists the signs: stolen content, long-dormant accounts that suddenly post, and accounts with lots of post karma but almost no comments ([r/funny spam wiki](https://www.reddit.com/r/funny/wiki/spam/)).
3. **Read smaller communities.** Karma farms aim for size. A niche subreddit with active moderators often has less of this.

Muting is a big hammer: it removes a whole community's posts, including the good ones. Use it for communities you never want, keep reporting the spam you spot, and let Slop Mop fold the filler post by post in the communities you keep. [Slop Mop vs unfollowing and muting](/compare/slop-mop-vs-unfollowing-and-muting/) sets the two side by side.

## Who it's for

People who use Reddit as a search engine with opinions, and want the answers without wading through filler:

- [Developers](/for/developers/) reading troubleshooting threads, where one specific reply is worth fifty "same here" comments.
- [Researchers](/for/researchers/) and [journalists](/for/journalists/) gauging what real users think, who need to discount farmed accounts.
- [Small business owners](/for/small-business-owners/) checking what customers say about their trade.
- Anyone who reads advice communities and has noticed answers getting longer and less useful.

If you moderate a community, the tells are also a quick way to explain why a post felt off.

[Add Slop Mop to your browser](/) and it folds Reddit posts and comments like these for you.
