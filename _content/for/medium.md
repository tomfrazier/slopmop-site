---
{
  "title": "Slop Mop for Medium: an article filter for SEO-padded listicles",
  "seo_title": "Medium article filter for padded listicles · Slop Mop",
  "description": "A Medium article filter for padded listicles and clap-bait: what Medium slop looks like, what Slop Mop does to stories, and Show less like this and mute.",
  "summary": "Slop Mop reads Medium stories and responses and folds or marks the SEO intros, repeated list items and clap-bait endings.",
  "keyword": "medium article filter",
  "updated": "2026-10-18",
  "kind": "network",
  "audience": "Medium readers",
  "network_status": "live",
  "related": ["/patterns/stiff-phrasing/", "/patterns/hype-words/", "/patterns/no-catch-promises/", "/glossary/ai-slop/", "/for/developers/", "/for/product-managers/"],
  "sources": [
    {"title": "Artificial Intelligence (AI) content policy", "publisher": "Medium Help Center", "url": "https://help.medium.com/hc/en-us/articles/22576852947223", "date": ""},
    {"title": "Medium sets new policies on AI-generated writing", "publisher": "Plagiarism Today", "url": "https://www.plagiarismtoday.com/?p=42690", "date": "2024"},
    {"title": "Story recommendations", "publisher": "Medium Help Center", "url": "https://help.medium.com/hc/en-us/articles/224488047", "date": ""},
    {"title": "A new way to control your recommendations", "publisher": "The Medium Blog", "url": "https://blog.medium.com/a-new-way-to-control-your-recommendations-2773f9a4632f", "date": "2022"}
  ]
}
---
Medium pays writers through its Partner Program, and readers find stories through search and recommendations. Put those together and you get a familiar kind of article: a headline built around a number and a promise, an introduction about today's world, and ten points that each restate the heading under them.

Medium has tried to deal with the machine-written end of this. From 1 May 2024 it stopped allowing AI-generated writing behind the Partner Program paywall, defining that as writing mostly produced by an AI program with little or no editing, improvement or fact-checking. Stories with undisclosed AI writing get "Network Only" distribution, reaching only the writer's followers ([Medium Help Center](https://help.medium.com/hc/en-us/articles/22576852947223); [Plagiarism Today](https://www.plagiarismtoday.com/?p=42690)).

That policy is about authorship. The padding problem is older than generative AI, and people produce it by hand perfectly well.

## What slop looks like on Medium

Medium slop is long. It shows up in the opening, the middle and the sign-off.

The SEO introduction that delays the first useful sentence:

:::slop
In today's fast-paced digital landscape, productivity is more important than ever. In this article, we will delve into 10 game-changing habits that will revolutionise the way you work.
:::
:::fine
I logged my working hours on paper for six weeks. The surprise was how little focused work I did after 3pm: under 20 minutes a day on average.
:::

The list item that repeats itself to reach a word count:

:::slop
5. Stay consistent. Consistency is key to success. When you stay consistent, you build momentum, and momentum is what leads to lasting results.
:::
:::fine
5. Pin your dependencies. We lost a day in August when a minor release of our date library changed how it parsed time zones.
:::

The ending that asks for applause:

:::slop
If you found this helpful, clap 50 times 👏, follow me for more and subscribe so you never miss a story!
:::
:::fine
The full config is in the repo linked above. On Windows, the path in step 3 needs backslashes.
:::

The first is [stiff phrasing](/patterns/stiff-phrasing/) with [hype words](/patterns/hype-words/) on top. The second is filler. The third is [engagement bait](/patterns/engagement-bait/) in Medium's local dialect. The fine versions are shorter and carry more, which is usually how you can tell.

## How Slop Mop filters Medium articles

On Medium, Slop Mop reads the stories you open and the responses under them. It runs on desktop in Chrome, Edge, Firefox, Safari and Chromium browsers such as Brave, Opera, Arc, Vivaldi and Comet. It sends the text and its public engagement counts to its scoring service, and never your name or the writer's.

An AI model designed for calibrated decisions answers twelve questions about the writing: nine tells of slop and three counter-signals (sounds like a person, useful to readers, and reader response). Each story or response gets a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure. Not sure means it's left alone.

- **Hide mode** folds a response past your threshold into a one-line strip where it was, so "Great article, thanks for sharing!" stops pushing down the reply that corrects step 3. Click Show post to open it in place.
- **Highlight mode** hides nothing. The mop turns yellow for Possibly slop and red for Likely slop.
- **Sensitivity** is Mild, Moderate or Aggressive.

On a full article the details panel is the part to use. Click the mop and you get the score, the strongest signs and the Slopprint, a nine-spoke chart with one spoke per tell. The SEO listicle has a recognisable shape: stiff phrasing and hype words high, with "useful to readers" low because each point restates its heading. A dense tutorial with a dull opening scores well on usefulness, and that bar can take a large share off its score. Clap counts feed the reader response bar, but a story with a big clap count and few responses gets less credit than one people argued about.

You can vote Not sure, No, Maybe or Probably, and your vote overrides the model for you. Medium never sees it.

It judges the writing, and it isn't an AI detector, which makes it a different tool from Medium's policy. A well-edited article that used AI along the way can pass; a hand-typed listicle full of filler may not. It never deletes, reports, mutes or blocks anything.

The free plan covers the one feed you pick, with 250 checks a day; Slop Mop XL (US$5.99 a month or US$59.99 a year) adds every feed, the sites you read, Gmail and Outlook, and a higher daily limit. The scoring is explained on [how it works](/how-it-works.html).

## Medium's own controls, and how they fit with Slop Mop

Medium has more feed controls than most readers use ([Medium Help Center](https://help.medium.com/hc/en-us/articles/224488047)).

1. **Show less like this.** On your home feed, use the minus button near a story's preview. It hides that story and tells Medium you want fewer like it. Medium moved this button to the homepage in 2022 to make it easier to find ([The Medium Blog](https://blog.medium.com/a-new-way-to-control-your-recommendations-2773f9a4632f)).
2. **Mute an author or publication.** Their stories stop appearing in your feed. It's the right tool for a publication that runs the same listicle every week.
3. **Refine recommendations.** From your profile picture, go to Settings and find the Refine recommendations page. It has tabs for Following, Reading history and Muted. Removing a few clicked-by-mistake stories from your reading history changes what you're shown next.

Show less like this is a nudge, and muting removes a writer completely. Neither tells you why a story felt thin, which is the part a breakdown of tells adds. A good routine: when Slop Mop flags a story and the panel agrees with your own read, press Show less like this on the next one from that publication, and mute it if the pattern holds. For the reading-mode and summariser alternatives, see [Slop Mop vs reading modes and summarisers](/compare/slop-mop-vs-reading-modes-and-summarisers/).

## Who it's for

People who use Medium as a reference shelf and want the useful articles to come first:

- [Developers](/for/developers/) reading how-to posts, where one worked example beats ten tips.
- [Product managers](/for/product-managers/) and [marketers](/for/marketers/) reading industry writing, a lot of which is padded to rank.
- [Educators](/for/educators/) and [researchers](/for/researchers/) pointing others to explanations they can trust.
- Writers on Medium who want a second opinion before publishing. The [no-catch promises](/patterns/no-catch-promises/) tell is a common one in headlines.

[Add Slop Mop to your browser](/) and it flags Medium articles like these before you've read the intro.
