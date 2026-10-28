---
{
  "title": "Magic tokens",
  "seo_title": "Magic tokens: the prompt words that seem to work · Slop Mop",
  "description": "Magic tokens are phrases like \"think step by step\" that people add to prompts because they seem to make AI answers better. Where the idea came from and its limits.",
  "summary": "Little phrases people add to prompts, like \"think step by step\", because they seem to make a chatbot's answers better.",
  "updated": "2026-10-28",
  "keyword": "magic tokens",
  "term": "Magic tokens",
  "aliases": ["magical tokens", "magic words"],
  "punchline": "Abracadabra, but make it \"let's think step by step\".",
  "kind": "ai",
  "first_seen": "2020s",
  "coined_by": "",
  "sensitivity": "",
  "related": ["/glossary/vibe-coding/", "/glossary/hallucination/", "/glossary/stochastic-parrot/", "/glossary/ai-slop/", "/patterns/scroll-stopper/"],
  "faq": [
    {"q": "Do magic tokens still work?", "a": "Some did, measurably, on particular models and tests. Newer models often reason step by step without being asked, so the old phrases matter less. Treat any magic token as something to test, not a spell."},
    {"q": "What is a token?", "a": "A token is the chunk a language model reads and writes: often a whole short word, sometimes part of a longer one. A magic token is really a magic phrase, a few tokens that nudge the model's answer."}
  ],
  "sources": [
    {"title": "Large Language Models are Zero-Shot Reasoners", "publisher": "arXiv (Kojima, Gu, Reid, Matsuo and Iwasawa)", "url": "https://arxiv.org/abs/2205.11916", "date": "2022-05-24"},
    {"title": "Large Language Models as Optimizers", "publisher": "arXiv (Yang and colleagues, Google DeepMind)", "url": "https://arxiv.org/abs/2309.03409", "date": "2023-09"},
    {"title": "Magical Tokens for LLMs", "publisher": "Jason Brownlee", "url": "https://jasonbrownlee.me/blog/posts/magical-tokens/", "date": "2025-01-24"}
  ]
}
---
## What magic tokens are

Magic tokens are the little phrases people tack onto prompts because they seem to make a chatbot smarter. "Let's think step by step." "You are an expert data scientist." "Take a deep breath." "Answer in bullet points." None of them adds information. They're closer to a ritual: the words you say before the machine does its thing.

The odd part is that some of them really did work, at least on certain models and tests. A token is the chunk a language model reads, usually a short word or part of one, so a magic token is really a magic phrase: a few tokens that tilt the model towards a more careful, or more expert-sounding, answer.

## Where magic tokens came from

The famous one is "Let's think step by step". In May 2022 researchers led by Takeshi Kojima reported in [Large Language Models are Zero-Shot Reasoners](https://arxiv.org/abs/2205.11916) that adding it before the answer lifted one model's score on a set of maths word problems from 17.7% to 78.7%, and on the GSM8K benchmark from 10.4% to 40.7%. Five words, no new information, a fourfold jump. People noticed.

Then the machines started finding their own. In 2023 a Google DeepMind team let one model write and test instructions for another, in [Large Language Models as Optimizers](https://arxiv.org/abs/2309.03409). The winning instruction for one model on GSM8K was "Take a deep breath and work on this problem step-by-step", which scored 80.2%. Nobody had told the AI to breathe. It found that on its own.

The name turns up in prompting circles. Jason Brownlee wrote about [magical tokens](https://jasonbrownlee.me/blog/posts/magical-tokens/) in January 2025, listing "think through this step by step", "as an expert in…" and "output in bullet points" as the kind of supplements he meant, while admitting he had no hard evidence for most of them. That's the honest state of the art: a few phrases with good studies behind them, and a large folklore of phrases with none.

## The catch with magic tokens

Magic tokens age fast. A phrase that helped one model can do nothing for the next, and newer models often reason step by step without being asked. Long lists of incantations can also crowd out the part of the prompt that matters: what you actually want.

They also leave fingerprints. Ask for "a viral LinkedIn post with a strong hook and emojis" and you get exactly that, which is why so many posts open with a [scroll-stopper](/patterns/scroll-stopper/). The prompt shows through the writing.

## Examples

Two prompts for the same job:

:::slop
You are a world-class award-winning genius copywriter with 40 years of experience. Take a deep breath. Think step by step. Write a viral post that will blow people's minds. This is very important to my career.
:::
:::fine
Write a 100-word update for our customers: the app's offline mode ships on 3 November, it works on Android and iOS, and it syncs changes when you reconnect. Plain English, no exclamation marks.
:::

The second has no magic in it. It has the facts, which is the thing the first prompt forgot.

## How Slop Mop sees magic tokens

Slop Mop never sees anyone's prompt. It reads the result: posts on LinkedIn, X, Reddit, Facebook, Substack and Medium, the articles and websites you read, and email in Gmail and Outlook. When a prompt asks for hooks, hype and "mind-blowing", the post that comes back usually trips the nine tells it scores, from scroll-stoppers to [hype words](/patterns/hype-words/). [How it works](/how-it-works.html) explains the scoring.

[Add Slop Mop to your browser](/) and the posts written by "world-class genius copywriters" fold themselves away.
