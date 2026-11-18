---
{
  "title": "Promptatory",
  "seo_title": "Promptatory: stuck fixing AI's mistakes · Slop Mop",
  "description": "Promptatory is the loop of re-prompting an AI tool to fix the bugs its last fix introduced. Who named it in 2026, an example and how to get out.",
  "summary": "The loop of prompting an AI tool to fix its own mistakes, where each fix brings a new one. Named by Oren Etzioni and Daniel S. Weld.",
  "updated": "2026-10-18",
  "term": "Promptatory",
  "aliases": [],
  "punchline": "Endless cycles of fixing AI-generated mistakes.",
  "kind": "ai",
  "first_seen": "2026",
  "coined_by": "Oren Etzioni and Daniel S. Weld",
  "sensitivity": "",
  "related": [
    "/glossary/vibe-coding/",
    "/glossary/ai-fatigue/",
    "/glossary/agent-fomo/",
    "/glossary/workslop/",
    "/for/developers/"
  ],
  "keyword": "promptatory",
  "sources": [
    {
      "title": "Etzioni on AI: The colorful and cranky language of the AI era, from slop to slap",
      "publisher": "GeekWire",
      "url": "https://www.geekwire.com/2026/etzioni-on-ai-the-colorful-and-cranky-language-of-the-ai-era-from-slop-to-slap/",
      "date": "2026-10-16"
    }
  ]
}
---
## What promptatory means

Promptatory is prompting purgatory. You ask an AI tool to build or fix something. It nearly works. You describe the problem, and the fix breaks something else. You describe that, and the first problem comes back in a new form. An hour later you've sent thirty messages, the code or document is longer than when you started, and you're less sure what it does.

The word is a joke, and the experience behind it is ordinary. It happens most when the person prompting can't easily check the output themselves, so every round depends on the tool noticing its own mistake. It's especially familiar from [vibe coding](/glossary/vibe-coding/), where the point is not to read the code, and from long documents edited through repeated "make it shorter but keep everything" requests.

## Where promptatory came from

Oren Etzioni and Daniel S. Weld named it in [their October 2026 GeekWire glossary of AI-era language](https://www.geekwire.com/2026/etzioni-on-ai-the-colorful-and-cranky-language-of-the-ai-era-from-slop-to-slap/). "Promptatory is our word," they wrote, "styled on 'purgatory'", for being trapped in an unending edit-and-re-prompt loop with an AI system. They compare closing in on "done" to the runner in Zeno's paradox, and call promptatory "vibe coding's hangover". In the same piece they named [agentsomnia](/glossary/agentsomnia/), the trouble switching off while your AI agents wait for you.

The word is new and hasn't reached the dictionaries. There are no reliable figures for how much time people lose this way, and this page doesn't offer any.

## Examples

This exchange is invented.

:::example
**Round 1.** "Add a dark mode toggle." The toggle appears; the header text is now invisible.

**Round 4.** "The header is fixed but the toggle doesn't remember my choice." It now remembers, and the page flashes white on every load.

**Round 9.** "Please go back to how it was in round 3 but keep the fix from round 7." The tool rewrites the whole stylesheet.

**Round 15.** You open the file for the first time and find three separate dark mode implementations.
:::

### Getting out

- Stop and read what's there before the next prompt. Promptatory runs on not looking.
- Roll back to the last version that worked, then make one change at a time.
- Describe what you expect, as well as what's wrong.
- Start a fresh conversation with a short summary. Long threads carry their old mistakes forward.
- Know when to do the last 10% yourself.

## How Slop Mop sees it

Promptatory is about building things with AI, which is outside what Slop Mop judges, and it can't get you out of a prompt loop. It reads the posts, comments and articles in your feeds on LinkedIn, X, Reddit, Substack, Medium and the other places it covers, and scores the writing; [How it works](/how-it-works.html) explains how. A post boasting that someone built an app in ten minutes, in [hype words](/patterns/hype-words/) and with no word on what broke, tends to score as slop.

[Add Slop Mop to your browser](/) and it folds those posts for you.
