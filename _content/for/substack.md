---
{
  "title": "Slop Mop for Substack: a filter for Notes and padded posts",
  "seo_title": "Substack Notes filter and padded posts · Slop Mop",
  "description": "A Substack Notes filter that also reads posts: the growth-bait Notes and padded newsletters it catches, what Slop Mop does, and Substack's mute and block.",
  "summary": "Slop Mop reads Substack Notes and posts and folds or marks the growth bait, throat-clearing intros and padded lists.",
  "keyword": "substack notes filter",
  "updated": "2026-10-18",
  "kind": "network",
  "audience": "Substack readers",
  "network_status": "live",
  "related": ["/patterns/flowery-prose/", "/patterns/engagement-bait/", "/patterns/stiff-phrasing/", "/glossary/ai-slop/", "/for/creators/", "/for/journalists/"],
  "sources": [
    {"title": "Substack releases a platform that looks a hell of a lot like Twitter", "publisher": "SiliconANGLE", "url": "https://siliconangle.com/2023/04/11/substack-releases-platform-looks-hell-lot-like-twitter/", "date": "2023-04-11"},
    {"title": "Getting started on Substack Notes", "publisher": "Substack Support", "url": "https://support.substack.com/hc/en-us/articles/14564821756308-Getting-started-on-Substack-Notes", "date": ""}
  ]
}
---
Substack began as a place to send a newsletter and get paid for it. In April 2023 it added Notes, a feed of short posts with restacks in place of retweets ([SiliconANGLE](https://siliconangle.com/2023/04/11/substack-releases-platform-looks-hell-lot-like-twitter/)). That gave Substack two kinds of slop: the social kind, in Notes, and the long kind, in the newsletters themselves.

Notes is where writers go to find subscribers, so it fills with advice on finding subscribers. Some of it is useful. A lot of it is the same few formulas: support-each-other threads, "how I hit 1,000 subscribers" posts and numbered truths about writing.

The newsletters have a quieter problem. A paid post can feel like it has to be long to be worth the money, and so an idea that needs 400 words arrives in 2,000, with a seasonal preamble and three paragraphs of throat-clearing.

## What slop looks like on Substack

Here are the three versions that turn up most, each with a version that respects the reader's time.

The mutual-growth note:

:::slop
Writers, let's lift each other up! 🤝 Restack this and I'll subscribe to everyone who comments. Small creators deserve to be seen ✨
:::
:::fine
Moved my newsletter from weekly to fortnightly in August. Open rate went from 41% to 48% over two months. My guess is I stopped sending the filler weeks.
:::

The newsletter that takes three paragraphs to start:

:::slop
Dear friends, as autumn settles over us and the leaves begin their quiet descent, I find myself reflecting on what it truly means to write, to share, to show up in this space we've built together...
:::
:::fine
This week: why the council's new parking plan costs residents more than it says, using the three figures buried in appendix C of the budget.
:::

The list of truths:

:::slop
7 truths about writing nobody tells you:
1. Consistency beats talent.
2. Your voice matters.
3. Done is better than perfect.
:::
:::fine
The edit that helps my drafts most: I delete the first paragraph. It's almost always me warming up, and the piece starts in the second.
:::

The first is [engagement bait](/patterns/engagement-bait/) for a subscriber count. The second is [flowery prose](/patterns/flowery-prose/) standing in for an opening. The third is the kind of advice that's true and so general it changes nothing. Each fine version could only have been written by someone who did the thing.

## How Slop Mop filters Substack Notes and posts

Slop Mop reads both halves of Substack. In the Notes feed it reads each note shortly before you scroll to it, and it reads the posts you open on substack.com. It runs on desktop in Chrome, Edge, Firefox, Safari and Chromium browsers such as Brave, Opera, Arc, Vivaldi and Comet. It sends the text and its public engagement counts to its scoring service, and never your name or the writer's.

An AI model designed for calibrated decisions answers twelve questions about the writing: nine tells of slop and three counter-signals (sounds like a person, useful to readers, and reader response). Each note or post gets a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure. Not sure means it's left alone.

- **Hide mode** folds a note past your threshold into a one-line strip where it was. A run of "restack this and I'll subscribe" notes becomes a stack of thin lines, and the note from someone describing what they changed and what happened stays full size. Click Show post to open any of them.
- **Highlight mode** hides nothing. The mop turns yellow for Possibly slop and red for Likely slop.
- **Sensitivity** is Mild, Moderate or Aggressive.

Click the mop to see the details panel: the score, the strongest signs and the Slopprint, a nine-spoke chart with one spoke per tell. On a long post this is the useful part. A padded newsletter tends to show [flowery prose](/patterns/flowery-prose/) and stiff phrasing together, where a mutual-growth note spikes on engagement bait, and the panel tells you which you're looking at before you've read 2,000 words. The "useful to readers" bar rewards figures, named examples and steps you could follow, which is what a paid post should have.

You can vote Not sure, No, Maybe or Probably on anyone else's note or post, and your vote overrides the model for you. Substack never sees it, and nothing is sent to the writer.

It judges the writing, and it isn't an AI detector. A newsletter drafted with AI help that's dense with useful detail passes; a hand-written one that's mostly preamble may not. It never deletes, reports, mutes or blocks anything, and it doesn't touch your subscriptions.

Newsletters you read in your email inbox are handled by Slop Mop for Gmail and Slop Mop for Outlook, covered on the [email page](/for/email/). Plans: the free plan covers the one feed you pick, with 250 checks a day; Slop Mop XL (US$5.99 a month or US$59.99 a year) adds every feed, the sites you read, Gmail and Outlook, and a higher daily limit. The scoring is explained on [how it works](/how-it-works.html).

## Substack's own Notes controls, and how they fit with Slop Mop

Substack's own controls work on writers rather than posts ([Substack Support](https://support.substack.com/hc/en-us/articles/14564821756308-Getting-started-on-Substack-Notes)).

1. **Mute someone in Notes.** Open the three-dot menu on one of their notes and choose Mute. Their notes and their replies to your notes are hidden from you.
2. **Block when you need more.** Blocking also hides their notes, and stops them seeing your notes and your Substack profile.
3. **Review the list.** Everyone you've muted or blocked is listed under Content Preferences in your account settings.
4. **Unsubscribe from padded newsletters.** It's the plainest control there is. A newsletter you skim past every week is costing you more attention than its price suggests.

Muting is all or nothing per writer. Plenty of good newsletter writers also post growth formulas in Notes, and muting them loses both. Slop Mop fills that gap: keep the writer, and let their growth-bait notes fold while their essays stay. Mute and block are still the right tools for people you don't want to hear from at all.

## Who it's for

People who read newsletters for the substance and use Notes to find more of them:

- [Creators](/for/creators/) and [freelancers](/for/freelancers/) who write on Substack themselves and want to read peers without absorbing the formulas.
- [Journalists](/for/journalists/) and [researchers](/for/researchers/) who follow independent reporting there and would like to reach it faster.
- [Consultants](/for/consultants/) who subscribe to industry newsletters to stay current.

If you write a Substack, the nine tells make a decent pre-send checklist. The [stiff phrasing](/patterns/stiff-phrasing/) one catches a lot of first paragraphs.

[Add Slop Mop to your browser](/) and it folds Substack Notes and posts like these for you.
