---
{
  "title": "Slop Mop for LinkedIn: a feed filter for hooks and bait",
  "seo_title": "LinkedIn feed filter for hooks and bait · Slop Mop",
  "description": "A LinkedIn feed filter that judges the writing: what LinkedIn slop looks like, what Slop Mop does to it, and LinkedIn's own hide, unfollow and mute.",
  "summary": "Slop Mop reads LinkedIn posts as you scroll and folds or marks the hooks, bait and filler, with its reasons shown.",
  "keyword": "linkedin feed filter",
  "updated": "2026-10-18",
  "kind": "network",
  "audience": "LinkedIn readers",
  "network_status": "live",
  "related": ["/patterns/scroll-stopper/", "/patterns/engagement-bait/", "/patterns/too-tidy-story/", "/glossary/ai-slop/", "/for/recruiters/", "/for/job-seekers/"],
  "sources": [
    {"title": "Yes, That Viral LinkedIn Post You Read Was Probably AI-Generated", "publisher": "WIRED", "url": "https://www.wired.com/story/linkedin-ai-generated-influencers/", "date": "2024-11-26"},
    {"title": "Best practices to customize what you see on your LinkedIn feed", "publisher": "LinkedIn Help", "url": "https://www.linkedin.com/help/linkedin/answer/62570", "date": ""},
    {"title": "Guide: Features to Help You Control Your Feed and Conversations", "publisher": "LinkedIn Official Blog", "url": "https://blog.linkedin.com/2021/february/guide-features-to-help-you-control-your-feed-and-conversations", "date": "2021-02"}
  ]
}
---
LinkedIn is where Slop Mop started. The feed rewards a recognisable style: a one-line hook, a column of single-sentence paragraphs, a lesson from a child or a taxi driver, and a question at the end to pull in comments. Some of these posts are written with AI and plenty are typed by hand.

How much is machine-written is hard to pin down. In November 2024 [WIRED reported](https://www.wired.com/story/linkedin-ai-generated-influencers/) an analysis by the detection company Originality AI that estimated over half of longer English-language LinkedIn posts were likely AI-generated. That figure comes from a detector, so treat it as an estimate. It also answers a different question from the one most readers have. A post wastes your time because of what's on the page, whoever or whatever put it there.

## What slop looks like on LinkedIn

LinkedIn slop has a house style. These are the three formats that turn up most often, each next to a version that gives the reader something.

The drumroll opener, built from one-line paragraphs and a story with a neat moral:

:::slop
I almost quit last Tuesday.

Then my 6-year-old said something that changed how I lead forever.

Here's what she taught me 👇
:::
:::fine
We moved our all-hands from Monday to Thursday in May. Attendance went from about 60% to 85%, mostly because Mondays were eaten by customer calls.
:::

The comment-for-a-download offer, which exists to game reach:

:::slop
Comment "PLAYBOOK" and I'll DM you my 47-page hiring framework.

♻️ Repost so your network sees it too.
:::
:::fine
I wrote up the interview scorecard we've used for three hiring rounds this year. It's one page. The "red flags" section is the part I'd change next time, because it caught almost nothing.
:::

Thought leadership made of hype words and "not X, but Y" lines:

:::slop
Hiring isn't about filling seats. It's about unlocking human potential. AI is transforming talent acquisition in unprecedented ways, and the leaders who embrace it will thrive.
:::
:::fine
Our recruiter now uses a model to draft rejection emails. She edits every one, and it saves her about four hours a week. Two candidates have replied to say thanks, which never happened before.
:::

For more on each habit, see [scroll-stoppers](/patterns/scroll-stopper/), [engagement bait](/patterns/engagement-bait/) and [too-tidy stories](/patterns/too-tidy-story/).

## How Slop Mop filters your LinkedIn feed

Slop Mop is a browser extension for Chrome, Edge, Firefox and Safari on desktop, and for Chromium browsers such as Brave, Opera, Arc, Vivaldi and Comet. On LinkedIn it reads each post in your feed shortly before you scroll to it. It sends the post's text and its public reaction, comment and repost counts to its scoring service, and never your name or the author's. An AI model designed for calibrated decisions then answers twelve questions about the writing:

- nine tells of slop: scroll-stopper hooks, engagement bait, hype words, empty praise, no-catch promises, "not X, but Y" framing, flowery prose, stiff phrasing and too-tidy stories
- three counter-signals: sounds like a person, useful to readers, and reader response

Each post gets a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure. A Not sure post is left alone. The rest depends on your settings:

- **Hide mode** folds a post past your threshold into a one-line strip in the feed, where the post was. Click Show post and it opens in place.
- **Highlight mode** hides nothing. The mop beside the post's "…" menu turns yellow for Possibly slop and red for Likely slop.
- **Sensitivity** is Mild, Moderate or Aggressive, and sets how easily a post gets flagged.

Click the mop on any post to open the details panel. It shows the score, the verdict, the strongest signs and the Slopprint, a nine-spoke chart with one spoke per tell, so you can see at a glance whether a post is mostly hook, mostly bait or mostly hype. Three blue bars show the counter-signals. On LinkedIn the reader response bar matters: comments and reposts count for far more than one-tap reactions, and a post with hundreds of reactions and almost no discussion gets little credit. Your own posts leave that bar out, and the panel has no vote on them.

On everyone else's posts you can vote Not sure, No, Maybe or Probably. Your vote overrides the model in your own feed. LinkedIn never sees it.

It judges the writing, and it isn't an AI detector. A useful post drafted with AI stays visible. An empty one typed by hand can be folded. It never deletes, reports, mutes or blocks anything, so the author's post is untouched for everyone else.

The same formulas turn up well beyond LinkedIn. The drumroll thread lives on [X](/for/x/), the type-a-word caption on [Facebook](/for/facebook/) and the mutual-growth post in [Substack Notes](/for/substack/), and Slop Mop reads all three, along with Reddit, Medium, the articles you open and, through its add-ons, Gmail and Outlook.

The limits: the free plan covers the one feed you pick, with 250 checks a day. Slop Mop XL, at US$5.99 a month or US$59.99 a year, adds every feed, the sites you read, Gmail and Outlook and a higher daily limit, on up to five browsers. Post text is scored and not kept; the server stores a one-way hash of the text and the scores. The exception is a post you vote against, whose text is kept so the miss can be reviewed. The full detail is on [how it works](/how-it-works.html).

## LinkedIn's own feed filters, and how they fit with Slop Mop

LinkedIn has its own controls, and they're worth using alongside the extension. They act on a single post or a whole person, where Slop Mop acts post by post on the writing.

1. **Hide one post.** Open the post's control menu and choose "I don't want to see this post". You can say why, which LinkedIn uses as a relevance signal ([LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/62570)).
2. **Unfollow someone.** Use the More icon at the top right of one of their posts. You stay connected but stop seeing their updates, and they aren't notified ([LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/62570)).
3. **Mute someone you don't follow.** Mute covers people and Pages who appear in your feed because a connection commented on, reacted to or reshared their posts ([LinkedIn Official Blog](https://blog.linkedin.com/2021/february/guide-features-to-help-you-control-your-feed-and-conversations)).

Unfollowing is blunt: a colleague with one useful post a month and four bait posts gets cut entirely. The two work well together. Unfollow or mute the accounts you never want to see, and let Slop Mop make the post-by-post calls on the rest, so the colleague's useful post stays and the bait folds. There's a fuller side-by-side in [Slop Mop vs LinkedIn's feed controls](/compare/slop-mop-vs-linkedin-feed-controls/).

## Who it's for

Anyone who uses LinkedIn to keep up with their field and finds the feed slow going. Some readers feel it more than others:

- [Recruiters](/for/recruiters/) and [hiring managers](/for/hiring-managers/) scanning for real signal about candidates and markets.
- [Job seekers](/for/job-seekers/) who need the feed for openings and contacts, without the motivational filler.
- [Founders](/for/founders/) and [investors](/for/investors/) following what people are building.
- [Sales teams](/for/sales-teams/) and [marketers](/for/marketers/) who read the feed for buying signals and see a lot of their own trade's formulas coming back at them.

If you write on LinkedIn yourself, the nine tells double as an editing checklist.

[Add Slop Mop to your browser](/) and it folds posts like these out of your LinkedIn feed for you.
