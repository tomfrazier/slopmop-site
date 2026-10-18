---
{
  "title": "Slop Mop for LinkedIn",
  "seo_title": "Slop Mop for LinkedIn: fold away feed slop · Slop Mop",
  "description": "What slop looks like on LinkedIn, what Slop Mop does in your feed today, and the controls LinkedIn itself gives you for hiding posts and people.",
  "summary": "Live today: Slop Mop reads LinkedIn posts ahead of you and folds or marks the hooks, bait and filler, with its reasons shown.",
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
LinkedIn is where Slop Mop started, and it's the only network where it works today. The feed rewards a recognisable style: a one-line hook, a column of single-sentence paragraphs, a lesson from a child or a taxi driver, and a question at the end to pull in comments. Some of these posts are written with AI and plenty are typed by hand.

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

## What Slop Mop does here

Slop Mop is live on LinkedIn in Chrome and other Chromium browsers (Brave, Opera, Comet and others). Microsoft Edge, Safari and Firefox are coming soon.

As you scroll, the extension sends the text of each new post to its scoring service. It never sends your name or the author's. An AI model designed for calibrated decisions answers twelve questions about the writing:

- nine tells of slop: scroll-stopper hooks, engagement bait, hype words, empty praise, no-catch promises, "not X, but Y" framing, flowery prose, stiff phrasing and too-tidy stories
- three counter-signals: sounds like a person, useful to readers, and reader response

Each post gets a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure. What happens next depends on your settings.

- **Hide mode** folds likely slop into a one-line strip ("This post was hidden"). One click opens it again.
- **Highlight mode** hides nothing. The post's mop icon turns yellow or red instead.
- **Sensitivity** is Mild, Moderate or Aggressive.

Click the mop on any post to see its score, the strongest signs and the Slopprint, a chart of all nine tells. If you disagree, vote Not sure, No, Maybe or Probably. Your vote overrides the model in your own feed.

It judges the writing, and it isn't an AI detector. A useful post drafted with AI stays visible. An empty one typed by hand can be folded. It never deletes, reports, mutes or blocks anything, so the author's post is untouched for everyone else.

The limits: the free plan covers one feed with 250 checks a day. Post text is scored and not kept; the server stores a one-way hash of the text and the scores. The exception is a post you vote against, whose text is kept so the miss can be reviewed. The full detail is on [how it works](/how-it-works.html).

## What you can do today

LinkedIn has its own controls, and they're worth using alongside the extension. They act on a single post or a whole person, where Slop Mop acts post by post on the writing.

1. **Hide one post.** Open the post's control menu and choose "I don't want to see this post". You can say why, which LinkedIn uses as a relevance signal ([LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/62570)).
2. **Unfollow someone.** Use the More icon at the top right of one of their posts. You stay connected but stop seeing their updates, and they aren't notified ([LinkedIn Help](https://www.linkedin.com/help/linkedin/answer/62570)).
3. **Mute someone you don't follow.** Mute covers people and Pages who appear in your feed because a connection commented on, reacted to or reshared their posts ([LinkedIn Official Blog](https://blog.linkedin.com/2021/february/guide-features-to-help-you-control-your-feed-and-conversations)).

Unfollowing is blunt: a colleague with one useful post a month and four bait posts gets cut entirely.

## Who it's for

Anyone who uses LinkedIn to keep up with their field and finds the feed slow going. Some readers feel it more than others:

- [Recruiters](/for/recruiters/) and [hiring managers](/for/hiring-managers/) scanning for real signal about candidates and markets.
- [Job seekers](/for/job-seekers/) who need the feed for openings and contacts, without the motivational filler.
- [Founders](/for/founders/) and [investors](/for/investors/) following what people are building.
- [Sales teams](/for/sales-teams/) and [marketers](/for/marketers/) who read the feed for buying signals and see a lot of their own trade's formulas coming back at them.

If you write on LinkedIn yourself, the nine tells double as an editing checklist.
