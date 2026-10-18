---
{
  "title": "Article spinning",
  "seo_title": "Article spinning: rewriting text to pass it off as new",
  "description": "Article spinning rewrites an existing text with synonyms and shuffled phrasing so it passes as original, usually to game search or hide plagiarism.",
  "summary": "Rewriting an existing article with synonyms and shuffled phrasing so it passes as new, usually to game search rankings or hide plagiarism.",
  "updated": "2026-10-18",
  "term": "Article spinning",
  "aliases": ["content spinning", "spinning", "Rogeting"],
  "punchline": "The same article, wearing a thesaurus.",
  "kind": "both",
  "first_seen": "2000s",
  "coined_by": "",
  "sensitivity": "",
  "related": [
    "/glossary/content-farm/",
    "/glossary/scraper-site/",
    "/glossary/scaled-content-abuse/",
    "/glossary/keyword-stuffing/",
    "/glossary/word-salad/",
    "/patterns/stiff-phrasing/"
  ],
  "sources": [
    {"title": "Article spinning", "publisher": "Wikipedia", "url": "https://en.wikipedia.org/wiki/Article_spinning", "date": ""},
    {"title": "Spam policies for Google web search", "publisher": "Google Search Central", "url": "https://developers.google.com/search/docs/essentials/spam-policies", "date": ""}
  ]
}
---
## What it means

Article spinning is taking a text someone has already written and rewording it just enough that it looks new. Words are swapped for synonyms, sentences are reordered, paragraphs are shuffled. The meaning stays roughly the same, and the result can be published as "original" on another site or handed in as someone's own work.

It can be done by hand or by software. Automated spinners work from a thesaurus database and swap words with no sense of context, which is why spun text so often reads oddly: the wrong part of speech, an obscure word where a plain one belonged, a proper noun replaced with something that isn't a name. A related format, "spintax", marks up a base text with alternatives in brackets so a program can generate many variants from one draft.

Another name for it is "Rogeting", after Roget's Thesaurus. Students use the same technique to slip copied work past plagiarism checkers such as Turnitin, and there are websites that offer spinning to them as a service.

## Where it came from

Spinning grew up as a black-hat search engine optimisation trick in the 2000s and 2010s. Sites wanted large volumes of text that search engines wouldn't treat as duplicate content, and spinning one article into dozens of variants was a cheap way to get it. By the mid-2010s there were websites that would spin content automatically, often to fill pages with advertising.

Generative AI made the trick easier and the output smoother. Wikipedia's entry collects reports from 2023 and 2024 of AI-reworded copies of news articles appearing in Google News, sometimes within minutes of the original. Google's spam policies now name the practice twice: under scraping ("substituting synonyms or using automated techniques") and under [scaled content abuse](/glossary/scaled-content-abuse/), which covers "synonymizing, translating, or other obfuscation techniques".

## Examples

An invented original sentence and two spun versions of it.

:::example
Original: The council will close the library on Fridays from January to save £40,000 a year.
:::
:::slop
The authority shall shutter the athenaeum on Fridays commencing January so as to preserve £40,000 per annum.
:::
:::slop
In order to save £40,000 annually, from January onwards the library will be closed by the council on Fridays.
:::

The first is crude automated spinning: every word that has a synonym gets one. The second is closer to what a modern tool or a paid rewriter produces. It reads fine and adds nothing, and the reporter who found the story gets no credit.

:::fine
The council says closing the library on Fridays will save £40,000 a year. That's about 3% of the branch's budget, according to figures it published in November. Staff told us the Friday homework club, which averages 30 children, has nowhere else to go.
:::

Reusing a fact is fine. The rewrite adds checking, context and reporting of its own.

## How Slop Mop sees it

Spinning is mostly a problem for search results and websites, and Slop Mop for websites is coming soon. In the LinkedIn feed, where Slop Mop works today, spun text tends to show itself through [stiff phrasing](/patterns/stiff-phrasing/) and a lack of anything a reader could use. It can't tell that a post was copied from somewhere else, only how the writing reads.
