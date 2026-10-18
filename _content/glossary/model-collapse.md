---
{
  "title": "Model collapse",
  "seo_title": "Model collapse: AI trained on AI output · Slop Mop",
  "description": "Model collapse is what happens when AI models are trained on other models' output and lose the rare parts of real data. The research and its limits.",
  "summary": "The decline of AI models trained on AI output, which lose the rare and varied parts of real data over successive generations.",
  "updated": "2026-10-18",
  "term": "Model collapse",
  "aliases": ["Habsburg AI", "AI inbreeding", "AI cannibalism", "model autophagy disorder", "MAD"],
  "punchline": "AI eating its own leftovers.",
  "kind": "ai",
  "first_seen": "2023",
  "coined_by": "Ilia Shumailov and colleagues",
  "sensitivity": "",
  "related": [
    "/glossary/ai-slop/",
    "/glossary/dead-internet-theory/",
    "/glossary/information-pollution/",
    "/glossary/llm-grooming/",
    "/glossary/stochastic-parrot/"
  ],
  "sources": [
    {"title": "AI models collapse when trained on recursively generated data", "publisher": "Nature", "url": "https://www.nature.com/articles/s41586-024-07566-y", "date": "2024-07-24"},
    {"title": "The Curse of Recursion: Training on Generated Data Makes Models Forget", "publisher": "arXiv", "url": "https://arxiv.org/abs/2305.17493", "date": "2023-05-27"},
    {"title": "Model collapse", "publisher": "Wikipedia", "url": "https://en.wikipedia.org/wiki/Model_collapse", "date": ""}
  ]
}
---
## What it means

Model collapse is what researchers call the decline of AI models that are trained on text or images produced by other AI models. Each generation learns from a slightly simplified copy of the last. The common patterns survive; the unusual ones, which were rare to begin with, get rarer and then vanish. Over enough generations the model's output narrows and drifts away from the real data it started from.

In the words of the paper that named it, "indiscriminate use of model-generated content in training causes irreversible defects in the resulting models, in which tails of the original content distribution disappear". The "tails" are the rare cases: uncommon words, minority viewpoints, odd facts, the edges of any distribution.

The concern became practical as AI-generated text spread across the web. Future models are trained on data scraped from that web, so some of what they learn from will be the output of their predecessors.

## Where it came from

The term was introduced by Ilia Shumailov, Zakhar Shumaylov and colleagues in a May 2023 preprint, "The Curse of Recursion: Training on Generated Data Makes Models Forget". A revised version appeared in *Nature* on 24 July 2024 as "AI models collapse when trained on recursively generated data". They showed the effect in large language models, variational autoencoders and Gaussian mixture models, and argued that data from genuine human interactions would become more valuable as AI content filled the web.

Other researchers studied the same effect under other names. A July 2023 paper by Sina Alemohammad and colleagues called it "model autophagy disorder", or MAD, after the idea of something feeding on itself. "Habsburg AI", comparing it to inbreeding in the Habsburg royal family, and "AI cannibalism" are informal nicknames that appeared in press coverage.

## Examples

:::example
Generation 1 is trained on human writing about dog breeds and mentions 200 of them. Generation 2, trained mostly on generation 1's output, mentions the 120 that came up most. By generation 5 it writes confidently about a handful of popular breeds and has effectively forgotten the rest.
:::
:::example
An image model trained repeatedly on its own pictures of faces produces faces that look more and more alike, losing the range of ages, features and lighting in the original photos.
:::

These are simplified illustrations of the mechanism, not results from a specific study.

## The criticism

How likely model collapse is in practice is disputed. Wikipedia's entry summarises a 2024 paper, "Is Model Collapse Inevitable?", whose authors argue that the scary results depend on each generation replacing its training data entirely. When new synthetic data is added alongside the real data instead, which they say is closer to how training sets grow, the decline is much smaller. AI developers also filter and curate training data, and the field is still working out how much synthetic data is too much.

So the term names a real effect shown in controlled experiments. Whether it's happening to the models people use today is a separate and open question.

## How Slop Mop sees it

Model collapse is about how AI models are trained, which is outside what Slop Mop judges. It's one more reason human writing with real detail matters, and that's the kind of post Slop Mop's "sounds like a person" and "useful to readers" counter-signals look for.
