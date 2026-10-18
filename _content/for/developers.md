---
{
  "title": "Slop Mop for developers",
  "seo_title": "Fold 'I built a SaaS in a weekend' posts · Slop Mop",
  "description": "Developers get LinkedIn feeds full of vibe-coding boasts and recruiter hype. Slop Mop folds them so release notes and incident write-ups stay visible.",
  "summary": "Fold the vibe-coding boasts and 'developers are finished' takes so a developer's LinkedIn feed shows releases, write-ups and jobs.",
  "updated": "2026-10-18",
  "kind": "role",
  "audience": "developers",
  "related": [
    "/patterns/no-catch-promises/",
    "/patterns/hype-words/",
    "/patterns/engagement-bait/",
    "/glossary/vibe-coding/",
    "/glossary/vibe-revenue/",
    "/for/product-managers/"
  ]
}
---
## What your feed looks like

Many developers keep a LinkedIn account for one reason: jobs. They check it when a recruiter messages or when they're looking, and every visit shows them a feed that has little to do with how they work.

There's the person who built "a full SaaS in a weekend with AI" and is now at "$8k MRR" with no product link. There's the confident claim that junior developers are finished, posted every few days by someone selling a course. Recruiter posts promise "rockstar engineers" a "fast-paced, world-class team". Carousels list "15 VS Code extensions that will 10x your productivity", most of which you already use or never will. And engagement-farmed coding puzzles ask you to "comment the output" of four lines of JavaScript.

What's worth seeing is narrower: a release post from a library you depend on, an engineer's write-up of an outage with a real timeline, a hiring post that names the stack, the salary band and the team, or a colleague describing how they moved a service off a database without downtime.

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

The first slop example is a scroll-stopper with an unverifiable claim and a comment-for-giveaway ask. The second is hype words with no detail. The fine posts name the tools, the trade-off, the money and the process.

## How Slop Mop helps

Slop Mop is a browser extension for Chrome and other Chromium browsers. It reads posts in your LinkedIn feed ahead of you, sends the post text (without your name or the author's) to its scoring service, and gets back a score out of 100 based on nine tells of slop and three counter-signals. Likely slop folds away or gets marked, depending on your settings. Click the mop to see the reasons and a chart of all nine tells.

It isn't an AI detector, and it doesn't care whether a post was written with Copilot or by hand. A useful write-up that an engineer polished with a model will usually pass. A hand-typed "devs are cooked" post won't.

It runs on the main feed of desktop LinkedIn today. X, Reddit, Facebook, Substack, Medium, websites and email are coming soon, so it won't touch Hacker News, GitHub or your inbox. It's free for one feed with 250 checks a day; the count resets at midnight UTC. It never deletes, reports, mutes or blocks anything. The [privacy policy](/privacy.html) explains what is sent and stored.

## Setting it up for developers

Start with **Hide** mode at **Moderate** sensitivity, and plan to move to **Aggressive** after a week.

If you mostly visit LinkedIn to check for jobs, Hide gives you the shortest path to what you came for. Folded posts become a one-line strip with a one-click reopen, so a mistake costs a second.

Start at Moderate because good developer posts are often terse. A two-line release note or a bare link to a changelog has little room to show the counter-signals that pull a score down. Run Moderate for a week, open a few folded strips, and if they're consistently boasts and bait, switch to Aggressive.

Vote on the misses. A **No** on a wrongly folded release note brings it back in your feed. A **Probably** on a boast that slipped through folds it. Votes that disagree with the verdict are reviewed by a person at Artimovo and used to tune the tells, which is the closest thing to a bug report the extension has. For anything else, email hello@slopmop.lol with the post's link.

## If you post too

Developers who post on LinkedIn usually do it to be found by employers or clients. The tells that trip most often:

- **Revenue and speed claims with no catch.** "Built in a weekend" without the bugs, the cost or the link reads as an ad. See [no-catch promises](/patterns/no-catch-promises/).
- **Borrowed marketing words** in project write-ups: "robust", "seamless", "cutting-edge". Say what it handles and what it doesn't. See [hype words](/patterns/hype-words/).
- **"Comment the output"** puzzles and repost requests. See [engagement bait](/patterns/engagement-bait/).

A project post that names the stack, links the repo and admits one limitation is the kind of thing a hiring manager can actually judge.
