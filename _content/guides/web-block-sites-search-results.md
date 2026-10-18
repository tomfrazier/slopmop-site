---
{
  "title": "How to block a site from your search results",
  "seo_title": "Block sites from search results: DuckDuckGo, Kagi, Google",
  "description": "Block content farms from your results for good: DuckDuckGo's block list, Kagi's Block and Lower options, and workarounds for Google.",
  "summary": "Permanent site blocking in DuckDuckGo and Kagi, ranking tools in Kagi and Brave, and the workarounds for Google, which has no block list.",
  "updated": "2026-10-18",
  "network": "websites",
  "publish_date": "2026-11-03",
  "verified": "2026-10-18",
  "minutes": 6,
  "related": ["/patterns/no-catch-promises/", "/glossary/ai-slop/", "/glossary/dead-internet-theory/", "/for/websites/", "/for/researchers/"],
  "sources": [
    {"title": "How To Block Sites From Appearing in DuckDuckGo Search Results", "publisher": "DuckDuckGo Help Pages", "url": "https://duckduckgo.com/duckduckgo-help-pages/results/how-to-block-sites-from-appearing-in-search-results", "date": ""},
    {"title": "How To Filter Out AI Images in DuckDuckGo Search Results", "publisher": "DuckDuckGo Help Pages", "url": "https://duckduckgo.com/duckduckgo-help-pages/results/how-to-filter-out-ai-images-in-duckduckgo-search-results", "date": ""},
    {"title": "Website Info & Personalized Results", "publisher": "Kagi Docs", "url": "https://help.kagi.com/kagi/features/website-info-personalized-results.html", "date": ""},
    {"title": "SlopStop", "publisher": "Kagi Docs", "url": "https://help.kagi.com/kagi/features/slopstop.html", "date": ""},
    {"title": "Goggles", "publisher": "Brave Search Help", "url": "https://search.brave.com/help/goggles", "date": ""},
    {"title": "uBlacklist README", "publisher": "iorate/ublacklist, GitHub", "url": "https://github.com/iorate/ublacklist", "date": ""},
    {"title": "Refine Google searches", "publisher": "Google Search Help", "url": "https://support.google.com/websearch/answer/2466433", "date": ""}
  ]
}
---
DuckDuckGo and Kagi both let you block a site permanently from the result itself: in DuckDuckGo, open the ••• menu next to a result and choose "Block this site from all results"; in Kagi, click the shield icon and choose Block. Google has no block list, so there you're limited to `-site:` in each search or a browser extension. Blocking works best on the few sites that keep coming back; it can't filter the whole web.

## Before you start

- All steps were checked against each search engine's own help pages on 18 October 2026. Menus move, so the wording on your screen may be slightly different.
- A block works on a whole domain. It doesn't judge individual pages, so a good article on a blocked site disappears too.
- Keep your list short. The point is to remove the handful of sites you've already judged, using a check like the one in [How to spot an AI slop article](/guides/websites/web-spot-ai-slop-articles/).

## DuckDuckGo: block up to five sites

DuckDuckGo's [help page](https://duckduckgo.com/duckduckgo-help-pages/results/how-to-block-sites-from-appearing-in-search-results) describes a built-in block list.

1. Search on duckduckgo.com.
2. Find a result from the site you want gone and click the **•••** icon next to it.
3. Select **Block this site from all results**.

That hides every link to the domain, and DuckDuckGo says it also removes Instant Answers that draw on it. The limit is five domains, managed under **Search Settings**. To see blocked sites again for a moment without removing them, select **Show all results** at the top of the results page; **Hide blocked sites from results** puts the block back.

Five is not many, so save it for repeat offenders. For one-off cases, `-site:example.com` in the query excludes a domain for that search only.

### DuckDuckGo's AI filters

DuckDuckGo also has [settings for AI-generated content](https://duckduckgo.com/duckduckgo-help-pages/results/how-to-filter-out-ai-images-in-duckduckgo-search-results):

- In the **Images** tab, the **AI images** filter has a **Hide** option.
- Under **Search Settings**, in **General** or **AI Features**, you can turn on **Hide AI-Generated Images**.
- Starting your searches at **noai.duckduckgo.com** hides AI-generated images and removes Search Assist answers and Duck.ai prompts.

DuckDuckGo says the image filter relies on open-source blocklists and isn't exhaustive. It applies to images only, not to written pages.

## Kagi: block, lower, raise or pin

Kagi is a paid search engine with the most detailed controls of the three. Its [help page](https://help.kagi.com/kagi/features/website-info-personalized-results.html) describes them.

1. Search on Kagi.
2. Click the **shield icon** next to a result.
3. In the window that opens, choose one: **Block**, **Lower**, **Normal** (the default), **Higher** or **Pin** to the top.

You can review every site you've set under **Settings**, and switch personalisation off for a single search by unchecking **Personalized** in the **Options** menu. Kagi blocks whole domains only; for patterns such as one folder on a site, its docs point to the uBlacklist extension below.

**Lower** is worth more than it looks. Many sites are mostly thin with the occasional useful page. Lowering pushes them down without losing them entirely.

The three-dot menu next to each Kagi result also has **Remove results from this site**, which reruns the current search without that domain, the same as `-site:`.

### Kagi's SlopStop reports

Kagi runs a reporting system called [SlopStop](https://help.kagi.com/kagi/features/slopstop.html). Click the shield icon next to a result and choose **Report** to flag it as AI slop. Kagi reviews each report, usually within a week, and downranks a domain when it finds the site mostly AI-generated ("typically more than 80% across its pages"). Downranked results can still appear. If you think something was flagged wrongly, the same menu has **Report as not AI slop**. Your reports are listed under **Settings > Search > AI > SlopStop Reports**.

## Brave Search: Goggles

Brave Search doesn't offer a simple block button in its help pages. It has [Goggles](https://search.brave.com/help/goggles): sets of rules, written by anyone, that re-rank results. You follow existing Goggles from the Goggles tab and apply them to a search. Writing your own takes some effort and a hosted text file, so this suits people who are happy to tinker. Brave notes that a Goggle used by very few people could act as an identifier for your searches.

## Google: no block list

Google's help pages don't offer a way to block a site. You have two options.

1. **Per search:** add `-site:example.com` to the query, as documented in Google's [operators help](https://support.google.com/websearch/answer/2466433). It lasts for that one search.
2. **Extension:** [uBlacklist](https://github.com/iorate/ublacklist) is a free, open-source extension for Chrome, Firefox, Edge and Safari that hides chosen sites from results on Google and several other engines, including Bing, DuckDuckGo, Brave and Kagi. You add rules from the results page or from the extension's toolbar icon, and you can subscribe to public lists that other people maintain.

The catch with extensions: you're trusting a third party with access to your search pages, and public lists reflect someone else's judgment. Read a list before you subscribe, and check the extension's permissions in your browser.

## What to block, and what to leave

Block a site after it fails you more than once. A single bad article is a reason to close the tab.

Good candidates:

- Sites that publish the same "best X" list for every product category, with no sign anyone used the products.
- Pages that copy the top answer from elsewhere and add an intro.
- Sites whose headlines promise more than the pages deliver, again and again. The [no-catch promises](/patterns/no-catch-promises/) tell in a headline is a common warning.

:::slop
10 Best Air Purifiers of 2026: Breathe Easier Today Without Breaking the Bank
:::
:::fine
We ran five air purifiers in a 20m² bedroom for a week each. Two were quieter than the fridge on their lowest setting.
:::

Leave alone: big general sites with mixed quality, where one weak page doesn't mean the next will be weak too. Use Lower in Kagi for those, or nothing at all.

## If that doesn't work

- **The site still appears in DuckDuckGo.** Check whether **Show all results** is on, and whether the result is on a different subdomain.
- **You've used all five DuckDuckGo slots.** Remove the one you've seen least lately, or use `-site:` for the rest.
- **Kagi's Higher setting seems to do little.** Kagi doesn't publish how much weight each setting carries. Pin is the strongest option if you always want a site first.
- **Google keeps showing the site.** Only an extension changes that. Otherwise, keep a note of domains to paste in as `-site:` operators.

Slop Mop is coming soon to websites. It never blocks or deletes anything, so the controls above remain the way to keep known bad sites out of your results.
