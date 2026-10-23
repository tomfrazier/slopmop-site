---
{
  "title": "Slop Mop for developers: a feed filter for the hype",
  "seo_title": "Feed filter for developers: fold the hype · Slop Mop",
  "description": "Developers read Reddit, X, Medium and dev blogs full of vibe-coding boasts. Slop Mop folds them so release notes and incident write-ups stay visible.",
  "summary": "Fold the vibe-coding boasts and 'developers are finished' takes on Reddit, X, Medium and LinkedIn so releases and write-ups stay in view.",
  "updated": "2026-10-18",
  "kind": "role",
  "audience": "developers",
  "keyword": "feed filter for developers",
  "related": [
    "/patterns/no-catch-promises/",
    "/patterns/hype-words/",
    "/glossary/vibe-coding/",
    "/for/reddit/",
    "/for/medium/",
    "/for/product-managers/"
  ],
  "sources": [
    {"title": "What's the difference between r/all, r/popular, news and my home feed?", "publisher": "Reddit Help", "url": "https://support.reddithelp.com/hc/en-us/articles/360043043552-What-s-the-difference-between-r-all-r-popular-news-and-my-home-feed", "date": ""}
  ]
}
---
## What your feed looks like as a developer

Developers read in more places than most people, and each one has its own kind of filler. Reddit is where you go for the programming subreddits and the honest answer to "has anyone used this in production?". X is where library maintainers post releases and where the AI-coding hype is loudest. Medium is where a search for an error message often lands you. Then there are the company engineering blogs, the tutorial sites and, for many, a LinkedIn account kept alive mainly for jobs.

The slop is similar everywhere. On X and LinkedIn there's the person who built "a full SaaS in a weekend with AI" and is now at "$8k MRR" with no product link, and the confident claim that junior developers are finished, posted every few days by someone selling a course. On Reddit it's the suspiciously polished answer that recommends one tool by name in every thread, and the "I made this" post that is really an ad. On Medium it's the "15 VS Code extensions that will 10x your productivity" listicle, padded to a seven-minute read. Recruiter posts promise "rockstar engineers" a "fast-paced, world-class team". And engagement-farmed coding puzzles ask you to "comment the output" of four lines of JavaScript.

What's worth seeing is narrower: a release post from a library you depend on, an engineer's write-up of an outage with a real timeline, a Reddit comment from someone who ran the migration you're about to attempt, a hiring post that names the stack, the salary band and the team.

## Examples

:::slop
I built a full SaaS in 48 hours with AI. No team. No funding. No code experience.

Now it does $12k MRR.

Comment "STACK" and I'll send you every tool I used. 🚀
:::
:::fine
We moved our job queue from Redis to Postgres last month using SKIP LOCKED. Throughput dropped about 15%, which is fine for us, and we deleted one service and its on-call rota. It would not suit anyone doing thousands of jobs a second.
:::

:::slop
We're hiring! Join our world-class team of rockstar engineers building cutting-edge solutions in a fast-paced environment. Unlimited growth opportunities await. 🔥
:::
:::fine
Hiring a backend engineer, Go and Postgres, fully remote within UK hours. £70k to £85k. The team is four people and we deploy about ten times a day. Interview is one take-home (two hours max, paid) and one call.
:::

The first slop example is a [scroll-stopper](/patterns/scroll-stopper/) with an unverifiable claim and a comment-for-giveaway ask. The second is [hype words](/patterns/hype-words/) with no detail. The fine posts name the tools, the trade-off, the money and the process.

## How Slop Mop works as a feed filter for developers

Slop Mop is a browser extension for Chrome, Edge, Firefox, Safari and Chromium browsers such as Brave, Arc and Vivaldi, on desktop. It reads ahead of you on the sites where you read: posts and comments in your Reddit feed, posts in your X timeline, articles on Medium and Substack, the blog posts and articles you open on other sites, and your LinkedIn feed. It sends the text (without your name or the author's) to its scoring service and gets back a score out of 100 based on nine tells of slop and three counter-signals. Likely slop folds away or gets marked, depending on your settings. Click the mop to see the reasons and a chart of all nine tells; [How it works](/how-it-works.html) explains the scoring.

It isn't an AI detector, and it doesn't care whether a post was written with Copilot or by hand. A useful write-up that an engineer polished with a model will usually pass. A hand-typed "devs are cooked" post won't.

It never deletes, reports, mutes or blocks anything, and it doesn't change what Reddit or X choose to show you; [Reddit's help page on the home feed](https://support.reddithelp.com/hc/en-us/articles/360043043552-What-s-the-difference-between-r-all-r-popular-news-and-my-home-feed) covers that side. The [privacy policy](/privacy.html) explains what is sent and stored.

## Setting up the feed filter for developers

Pick your feed first. The free plan covers one feed you choose, with 250 checks a day; the count resets at midnight UTC. For most developers that's Reddit or X, whichever you scroll more. Slop Mop XL (US$5.99 a month or US$59.99 a year) covers every feed, the blogs and articles you read, and Gmail and Outlook, with a higher daily limit, on up to five browsers. It's the better fit if your reading is spread across Reddit, X and Medium, or if recruiter email is part of the problem.

Start with **Hide** mode at **Moderate** sensitivity, and plan to move to **Aggressive** after a week.

Hide gives you the shortest path to what you came for. Folded posts become a one-line strip with a one-click reopen, so a mistake costs a second.

Start at Moderate because good developer posts are often terse. A two-line release note, a bare link to a changelog or a one-sentence Reddit answer has little room to show the counter-signals that pull a score down. Run Moderate for a week, open a few folded strips, and if they're consistently boasts and bait, switch to Aggressive.

Vote on the misses. A **No** on a wrongly folded release note brings it back in your feed. A **Probably** on a boast that slipped through folds it. Votes that disagree with the verdict are reviewed by a person at Artimovo and used to tune the tells, which is the closest thing to a bug report the extension has. Voting isn't available on email. For anything else, email hello@slopmop.lol with the post's link.

## If you post too

Developers who post usually do it to be found by employers, clients or users of their project. The tells that trip most often, on any network:

- **Revenue and speed claims with no catch.** "Built in a weekend" without the bugs, the cost or the link reads as an ad. See [no-catch promises](/patterns/no-catch-promises/).
- **Borrowed marketing words** in project write-ups and READMEs. Say what it handles and what it doesn't. See [hype words](/patterns/hype-words/).
- **"Comment the output"** puzzles and repost requests. See [engagement bait](/patterns/engagement-bait/).

A project post that names the stack, links the repo and admits one limitation is the kind of thing a hiring manager can actually judge. If most of your reading happens on Reddit, the [Slop Mop for Reddit](/for/reddit/) page covers the habits specific to it. [Add Slop Mop to your browser](/) and it folds posts like these for you.
