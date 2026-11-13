---
{
  "title": "How to get fewer slop results in Google search",
  "seo_title": "Fewer slop search results in Google: filters, operators",
  "description": "Use Google's Web filter, before:, -site: and exact quotes to cut AI Overviews, padded pages and content farms out of your search results.",
  "summary": "Google's Web filter, before:, -site: and exact quotes, used together to get fewer padded pages and AI summaries in your results.",
  "keyword": "fewer slop search results",
  "updated": "2026-10-18",
  "network": "websites",
  "publish_date": "2026-10-27",
  "verified": "2026-10-18",
  "minutes": 6,
  "related": ["/patterns/scroll-stopper/", "/patterns/hype-words/", "/glossary/ai-slop/", "/glossary/enshittification/", "/glossary/dead-internet-theory/", "/for/websites/"],
  "sources": [
    {"title": "Refine Google searches", "publisher": "Google Search Help", "url": "https://support.google.com/websearch/answer/2466433", "date": ""},
    {"title": "Narrow your search results with filters", "publisher": "Google Search Help", "url": "https://support.google.com/websearch/answer/142143", "date": ""},
    {"title": "AI Overviews in Google Search", "publisher": "Google Search Help", "url": "https://support.google.com/websearch/answer/14901683", "date": ""},
    {"title": "Sick of AI Overviews? The old Google is still hiding in plain sight", "publisher": "PCWorld", "url": "https://pcworld.com/article/3143866/sick-of-ai-overviews-the-old-google-is-still-hiding-in-plain-sight.html", "date": ""},
    {"title": "How To Block Sites From Appearing in DuckDuckGo Search Results", "publisher": "DuckDuckGo Help Pages", "url": "https://duckduckgo.com/duckduckgo-help-pages/results/how-to-block-sites-from-appearing-in-search-results", "date": ""},
    {"title": "Website Info & Personalized Results", "publisher": "Kagi Docs", "url": "https://help.kagi.com/kagi/features/website-info-personalized-results.html", "date": ""}
  ]
}
---
Run your search, then pick the **Web** filter under the search box: Google says it shows only text-based links, without features such as AI Overviews. Then tighten the query with operators: `before:` to skip recent filler, `-site:` to drop a site you don't trust, and quotes to force the exact words you need. None of this blocks slop for good, but it removes most of the padding from a single search.

## Before you start

- These steps are for google.com in a browser, checked against Google's help pages on 18 October 2026. Google says the filters it shows, and their order, change with each query, so yours may sit in a different place.
- Operators work the same on desktop and mobile. The filter bar and the Tools menu look a little different on phones; where that matters, it's noted below.
- Google has no setting that turns AI Overviews off. Its [help page](https://support.google.com/websearch/answer/14901683) says they "cannot be turned off" and points to the Web filter instead.

## 1. Use the Web filter

1. Search as usual.
2. Look at the row of filters below the search box (All, Images, News, Forums and so on).
3. Select **Web**. If you can't see it, Google's [help](https://support.google.com/websearch/answer/2466433) suggests checking the other options the row offers, since the set changes by query. On a phone, scroll the row sideways.

Google describes the Web filter as "text-based links to websites", shown without features like AI Overviews. Ads can still appear, as [PCWorld](https://pcworld.com/article/3143866/sick-of-ai-overviews-the-old-google-is-still-hiding-in-plain-sight.html) points out. You'll need to pick it again for each new search, unless you use the shortcut in step 6.

## 2. Exclude a word or a site with the minus sign

Put `-` directly in front of a word to leave it out, with no space. Google's own example is `jaguar speed -car`.

This works on sites too. If one domain keeps filling your results with padded pages, add `-site:example.com` to the query. It only applies to that search, so keep a short list of the domains you exclude most often and paste them in when you need them.

:::example
best budget espresso grinder -site:example-deals.com -site:example-top10.net
:::

## 3. Search older pages with before:

Google's help documents `before:` and `after:` operators that filter by when a document was last updated. They take a year or a full date, for example `before:2022` or `after:2019-03-01 before:2019-03-05`.

`before:` is a blunt but useful tool for evergreen questions such as repairs, recipes and how-tos. The answer to "how to rehang a sagging gate" hasn't changed in years, so a date limit set before the recent rush of generated pages can take out a lot of filler. It won't help with anything that genuinely needs recent information, and some old pages are also bad.

On desktop, the same idea is under **Tools** below the search box, then the time menu. On mobile, Google calls it **Search tools**, and you may need to scroll the filter row to find it.

## 4. Force exact words with quotes

Padded pages rank for loose versions of your question. Quotes make Google match the exact word or phrase, so `"error 0x80070005"` or `"M8 thread"` brings back pages that contain that exact string. Exact model numbers and error codes are some of the best filters there are, because filler pages rarely bother with them.

## 5. Try the Forums filter for first-hand answers

When you want someone who has done the thing, the **Forums** filter, where Google shows it, narrows results to discussion sites. Forums have their own slop (copied answers, product plugs), but replies with odd details, photos and follow-up questions are hard to fake at scale. Treat it like any other source and check what you find.

## 6. Make the Web view your default (optional)

Google doesn't document this, but tech press including PCWorld has reported that adding `&udm=14` to the end of a Google results URL opens the same Web view. You can add a custom search engine in your browser's settings using this address:

:::example
https://www.google.com/search?q=%s&udm=14
:::

Where to add it depends on your browser, and the menu may be labelled differently from one version to the next. Two cautions: because Google doesn't document the parameter, it could stop working at any time; and third-party redirect sites that do this for you can see every search you type.

## Combine them for fewer slop search results

The steps work best together. A search for a dishwasher fault might look like this:

:::example
"E24" dishwasher drain fault before:2023 -site:example-appliance-tips.com
:::

Then pick Web. You've removed the AI summary, the boxes, newer generated pages and one site you already know is thin.

## What to look for in the results

Operators clear out a lot, but you still have to choose what to click. Results with slop usually show it in the title and snippet:

:::slop
The Ultimate Guide to Fixing Dishwasher Errors in 2026 (Expert Tips Inside!)
:::
:::fine
E24 on Bosch dishwashers: clearing the drain pump filter and checking the hose
:::

The first title has a year and a superlative and could sit on any appliance page. The second names the code, the brand and the fix. The [scroll-stopper](/patterns/scroll-stopper/) and [hype words](/patterns/hype-words/) tells work on headlines as well as posts.

## If that doesn't work

- **Results are still thin.** Change the words. Describe the symptom as a person would say it ("dishwasher won't drain, beeps three times") instead of the category ("dishwasher troubleshooting").
- **One site keeps coming back.** `-site:` only lasts for one search. DuckDuckGo and Kagi let you block a site permanently from their own result menus; Google doesn't offer a block list.
- **The Web filter has vanished.** Google moves filters around by query. Try the other options in the filter row, or use the `udm=14` address above.
- **You need recent results.** Drop `before:` and use quotes and `-site:` instead.

None of these steps need anything installed: they're free and work in any browser. Slop Mop picks up where they stop. It doesn't change Google's results, but on the articles you open it scores the text with the same twelve questions it uses on social posts ([how it works](/how-it-works.html)) and marks or folds the padded ones, so a thin page that got past your operators doesn't cost you a full read. Websites are part of Slop Mop XL (US$5.99 a month).

[Add Slop Mop to your browser](/) and it folds the padded pages your searches still turn up.
