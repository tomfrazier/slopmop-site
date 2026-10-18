---
{
  "title": "AI snake oil",
  "seo_title": "AI snake oil: what it means and how to spot it · Slop Mop",
  "description": "AI snake oil is AI sold on claims it doesn't and can't live up to. Where Arvind Narayanan's term came from, what it covers and how to read the pitch.",
  "summary": "AI products sold on claims they don't and can't live up to, a term popularised by Princeton computer scientist Arvind Narayanan.",
  "updated": "2026-10-18",
  "term": "AI snake oil",
  "aliases": [],
  "punchline": "AI sold to do things AI can't do.",
  "kind": "ai",
  "first_seen": "2019",
  "coined_by": "Arvind Narayanan",
  "sensitivity": "",
  "related": [
    "/glossary/ai-washing/",
    "/glossary/vibe-revenue/",
    "/glossary/feel-the-agi/",
    "/patterns/no-catch-promises/",
    "/patterns/hype-words/",
    "/for/hiring-managers/"
  ],
  "sources": [
    {"title": "How to recognize AI snake oil (slides)", "publisher": "Arvind Narayanan, Princeton University", "url": "https://www.cs.princeton.edu/~arvindn/talks/MIT-STS-AI-snakeoil.pdf", "date": "2019"},
    {"title": "AI Snake Oil: What Artificial Intelligence Can Do, What It Can't, and How to Tell the Difference", "publisher": "Princeton University Press", "url": "https://press.princeton.edu/books/hardcover/9780691249131/ai-snake-oil", "date": "2024-09-24"}
  ]
}
---
## What it means

AI snake oil is a product sold as artificial intelligence that does not work, and often cannot work, the way its sellers say. The name borrows from the American idiom for a fraudulent remedy.

The term is narrower than "AI hype". Hype exaggerates something real. Snake oil promises an outcome the technology has no route to, such as judging a job candidate's personality from a 30-second video. Arvind Narayanan, who popularised the phrase, called that kind of product "essentially an elaborate random number generator".

## Where it came from

Narayanan, a computer scientist at Princeton, gave a talk in 2019 called "How to recognize AI snake oil". His slides opened with the claim that "much of what's being sold as 'AI' today is snake oil — it does not and cannot work".

His argument was that "AI" is an umbrella over several different technologies. Some have made real progress, so sellers attach the label to anything and let the public's confusion do the rest. He sorted applications into three rough groups:

- **Perception**, such as speech to text, reverse image search and face recognition, where progress has been fast and genuine.
- **Automating judgment**, such as spam detection, hate speech detection and content recommendation: "far from perfect, but improving", with some error always inevitable.
- **Predicting social outcomes**, such as criminal recidivism, job performance and at-risk children, which he called "fundamentally dubious". Most of the snake oil, he argued, sits here.

The talk grew into a newsletter and then a book, *AI Snake Oil*, written with Sayash Kapoor and published by Princeton University Press in September 2024.

## Examples

Both of these are invented product pitches for the same kind of hiring tool.

:::slop
Our AI reads candidates' facial expressions and voice to predict job performance with unprecedented accuracy. Eliminate bias, cut time-to-hire by 90% and never make a bad hire again.
:::
:::fine
Our tool transcribes recorded interviews and tags where each candidate answered the six structured questions. It doesn't score candidates. Transcripts are about 95% accurate on clear audio and worse with accents it hasn't seen; a recruiter should check anything quoted back.
:::

The first claims a social prediction, promises no downside and offers no way to check it. The second describes a perception task, gives an error rate and says where it fails.

A few questions that tend to separate the two:

1. What exactly does it predict or produce, and how would you know if it were wrong?
2. Has anyone outside the company tested it?
3. What does the seller say it is bad at?

## How Slop Mop sees it

Slop Mop is an automating-judgment tool in Narayanan's terms, so it makes mistakes, and it is built around that: every verdict shows its reasons, and your vote overrules the model in your own feed. On LinkedIn, snake-oil pitches tend to trip the [no-catch promises](/patterns/no-catch-promises/) and [hype words](/patterns/hype-words/) tells, whoever wrote them.
