---
{
  "title": "Slop Mop for websites",
  "seo_title": "Slop Mop for websites: content farms and filler · Slop Mop",
  "description": "Content farms, SEO filler and AI-written articles: what slop looks like on the open web, what Slop Mop plans to do there, and what you can do today.",
  "summary": "Coming soon for the sites you read. Until then: how content farms work, what Google says about them, and a few ways to skip the filler.",
  "updated": "2026-10-18",
  "kind": "network",
  "audience": "people who read the web",
  "network_status": "soon",
  "related": ["/patterns/stiff-phrasing/", "/patterns/hype-words/", "/glossary/ai-slop/", "/glossary/enshittification/", "/glossary/dead-internet-theory/", "/for/researchers/"],
  "sources": [
    {"title": "Tracking AI-enabled misinformation: AI content farm sites", "publisher": "NewsGuard", "url": "https://www.newsguardtech.com/special-reports/ai-tracking-center/", "date": "2026-03-17"},
    {"title": "What web creators should know about our March 2024 core update and new spam policies", "publisher": "Google Search Central Blog", "url": "https://developers.google.com/search/blog/2024/03/core-update-spam-policies", "date": "2024-03-05"},
    {"title": "Use Reading mode in the side panel", "publisher": "Google Chrome Help", "url": "https://support.google.com/chrome/answer/14218344", "date": ""},
    {"title": "Refine Google searches", "publisher": "Google Search Help", "url": "https://support.google.com/websearch/answer/2466433", "date": ""}
  ]
}
---
The web has had content farms for as long as search engines have sent traffic and ads have paid for it. A content farm publishes pages at volume to rank for searches and carry ads, and the cheaper each page is to make, the better the sums work. Generative AI made pages very cheap.

NewsGuard, which rates news sites, has been counting sites it judges to be AI content farms: sites with a significant share of AI-produced content published without meaningful human oversight. Its first tally, in April 2023, found 49. By March 2026 the count was 3,006, across 16 languages ([NewsGuard](https://www.newsguardtech.com/special-reports/ai-tracking-center/)).

Google has said it's acting on this. In March 2024 it introduced a spam policy on "scaled content abuse": many pages generated mainly to manipulate search rankings rather than help users. Google said the policy applies however the content is made, by automation, by people or by both ([Google Search Central](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)). That last point matters. Filler has always been written by hand too, from recipe life stories to "What is X? X is a term that refers to X".

## What slop looks like on websites

Web slop is the article around the answer. Here are three common types.

The answer page that won't answer:

:::slop
What time does the city museum close? In this comprehensive guide, we'll explore everything you need to know about the museum's opening hours, so you can plan the perfect visit.
:::
:::fine
Open 10:00 to 18:00, Wednesday to Sunday. Last entry 17:15. Closed Monday and Tuesday, and on 25 December.
:::

The recipe introduction:

:::slop
There's something magical about a bowl of mash on a crisp autumn evening, a warm embrace that carries me back to my grandmother's kitchen, where every meal was a celebration of love.
:::
:::fine
Serves 4. 45 minutes. Use floury potatoes such as Maris Piper; waxy ones go gluey when mashed.
:::

The review roundup with no reviewing in it:

:::slop
Looking for the best air fryer? Look no further! Each of these top-rated models offers game-changing performance, sleek design and unbeatable value.
:::
:::fine
We cooked the same 500g of frozen chips in six air fryers. Two left the middle soft at the time on the packet. The cheapest needed four extra minutes and was the most even.
:::

The first two are [stiff phrasing](/patterns/stiff-phrasing/) and [flowery prose](/patterns/flowery-prose/) standing between you and the information. The third uses [hype words](/patterns/hype-words/) where test results should be. On a page with ads every few paragraphs, every extra sentence is another place to put one. For the wider pattern of services getting worse for their users as they're squeezed for revenue, see Cory Doctorow's term [enshittification](/glossary/enshittification/).

## What Slop Mop does here

Slop Mop for websites is coming soon. It doesn't work on articles or general websites yet; today it only reads LinkedIn.

The plan is for it to read the articles and pages you visit the way it reads LinkedIn posts now: ask twelve questions about the writing (nine tells of slop and three counter-signals, including whether it's useful to readers), show its working, and let you overrule it. It judges the writing, and it isn't an AI detector, so a well-made page that used AI along the way can pass and a hand-padded one may not.

It won't delete, report, mute or block anything. Reading the sites you visit is part of Slop Mop XL, which is also coming soon at US$5.99 a month or US$59.99 a year.

## What you can do today

There's no built-in "skip the filler" button, but a few tools help.

1. **Reading mode in Chrome.** Right-click a page and choose "Open in reading mode", or open the three-dot menu, then More tools, then Reading mode. The text opens in the side panel without ads and sidebars, with your choice of font, size and spacing ([Chrome Help](https://support.google.com/chrome/answer/14218344)). It doesn't remove filler sentences, but it makes them quicker to skim past.
2. **Exclude a site from search.** Put a minus sign before `site:` and the domain, for example `best air fryer -site:example.com`, and Google leaves that site out of your results ([Google Search Help](https://support.google.com/websearch/answer/2466433)).
3. **Search with a site in mind.** Adding `site:` and a source you trust, such as a manufacturer, a council or a university, skips the middlemen entirely.
4. **Scroll to the end first.** On recipe and how-to pages the useful part is often at the bottom, in a card or a numbered list.

All of these are manual and per search. They don't learn which pages wasted your time.

## Who it's for

People who search for answers all day and keep landing on pages written for search engines:

- [Researchers](/for/researchers/) and [journalists](/for/journalists/) who need primary sources and keep finding rewrites of rewrites.
- [Developers](/for/developers/) looking up an error message and getting a 2,000-word explainer.
- [Educators](/for/educators/) who send students to the web and want to point them at pages that hold up.
- [Small business owners](/for/small-business-owners/) researching suppliers, rules and tools without a day to spare.

The [dead internet theory](/glossary/dead-internet-theory/) entry covers the bleaker version of where this ends up, and the case against it.
