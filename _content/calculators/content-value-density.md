---
{
  "title": "Content value density calculator: how much does it say?",
  "seo_title": "Content value density calculator · Slop Mop",
  "description": "Paste a post, email or article and count its concrete markers (numbers, dates, names) against filler (hype, hedges, asks). Runs entirely in your browser.",
  "summary": "Paste any text to count concrete details against filler per 100 words, with each one highlighted. A transparent word count, not a verdict.",
  "updated": "2026-10-18",
  "keyword": "content value density",
  "calc": "content-value-density",
  "order": 4,
  "big": "2 vs 17",
  "big_label": "concrete vs filler markers per 100 words in a typical hook post",
  "related": ["/patterns/hype-words/", "/patterns/stiff-phrasing/", "/patterns/empty-praise/", "/learn/ai-detector-vs-writing-quality/", "/glossary/word-salad/"],
  "sources": [
    {"title": "Delving into LLM-assisted writing in biomedical publications through excess vocabulary", "publisher": "Science Advances", "url": "https://www.science.org/doi/10.1126/sciadv.adt3813", "date": "2025-07-02"}
  ]
}
---
Useful writing tends to be full of things you could check: a number, a date, a name, a place. Empty writing tends to be full of words that sound like something without saying it. The content value density calculator counts both and shows them in your text, so you can see the difference in a post you're reading or one you're about to send.

## How the content value density calculator counts

Paste any text into the box. The calculator counts two kinds of marker:

- **Concrete markers:** numbers and amounts ("14 of 22", "£70k", "400ms"), dates and days ("March", "Tuesday", "2026"), and capitalised names that aren't the first word of a sentence ("Priya", "Leeds", "Postgres").
- **Filler markers:** hype words ("game-changing", "unlock", "elevate"), stock transitions and hedges ("Furthermore", "Ultimately", "it's worth noting"), and requests to engage ("comment YES", "repost", "DM me").

Each count is divided by the number of words and multiplied by 100, so a short post and a long article can be compared. In the marked-up copy, numbers are blue and filler is yellow. Try the two examples: the hook post scores about 2 concrete markers per 100 words against 17 filler; the specific one scores 21 concrete and none of the filler.

## Reading the content value density result

The "rough reading" line uses simple bands:

| Concrete per 100 words | Filler per 100 words | Reading |
|---|---|---|
| 8 or more | under 2 | Dense with specifics |
| 4 or more | under 4 | Some specifics |
| under 4 | 4 or more | Mostly filler |
| anything else | | Thin on specifics |

The thresholds are a starting point, set so that the two examples land where most readers would put them. They aren't calibrated against any dataset.

## What this calculator is not

It is a word count with rules. It can't tell whether a number is true, whether a name is relevant, or whether a short plain sentence is the best thing anyone wrote that day. A poem scores badly; a spam email full of prices scores well. Some of the filler words are the same ones researchers found far more often in AI-assisted writing (a [study in Science Advances](https://www.science.org/doi/10.1126/sciadv.adt3813) tracked words like "delves"), but this calculator doesn't guess who wrote anything, and neither does Slop Mop. The [learn page on AI detection versus writing quality](/learn/ai-detector-vs-writing-quality/) explains why.

Slop Mop itself works differently. It asks an AI model designed for calibrated decisions twelve questions about each post, covering the [nine tells](/patterns/) such as [hype words](/patterns/hype-words/) and [stiff phrasing](/patterns/stiff-phrasing/) and three counter-signals such as whether it's useful to readers, and it weighs how sure it is about each. [How it works](/how-it-works.html) explains the scoring.

## Using it on your own writing

Paste a draft before you post it. If the filler count is higher than the concrete count, look for the claim you're making and add the detail behind it: the number, the date, the person. Then paste it again. When you'd rather have every feed checked for you, [add Slop Mop to your browser](/) and it folds the posts that come out thin.
