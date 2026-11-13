---
{
  "title": "Slop Mop for Facebook: a feed filter for bait posts and AI pages",
  "seo_title": "Facebook feed filter for bait and AI pages · Slop Mop",
  "description": "A Facebook feed filter for bait captions and AI image pages: what Facebook slop looks like, what Slop Mop does in your Feed, and Show less and Snooze.",
  "summary": "Slop Mop reads the writing in Facebook posts as you scroll and folds or marks the bait captions, fake quizzes and sob-story links.",
  "keyword": "facebook feed filter",
  "updated": "2026-10-18",
  "kind": "network",
  "audience": "Facebook users",
  "network_status": "live",
  "related": ["/patterns/engagement-bait/", "/patterns/flowery-prose/", "/glossary/ai-slop/", "/glossary/dead-internet-theory/", "/for/small-business-owners/"],
  "sources": [
    {"title": "How spammers and scammers leverage AI-generated images on Facebook for audience growth", "publisher": "Harvard Kennedy School Misinformation Review", "url": "https://misinforeview.hks.harvard.edu/wp-content/uploads/2024/08/diresta_spammers_scammers_ai_images_facebook_20240815.pdf", "date": "2024-08-15"},
    {"title": "Facebook users say 'amen' to bizarre AI-generated images of Jesus", "publisher": "NBC News", "url": "https://www.nbcnews.com/tech/tech-news/facebook-users-say-amen-bizarre-ai-generated-images-jesus-rcna143965", "date": "2024-03"},
    {"title": "You can now tell Facebook to stop feeding you posts you hate", "publisher": "Popular Science", "url": "https://www.popsci.com/technology/facebook-feed-show-less-show-more/", "date": "2022-10"},
    {"title": "Facebook adds a Snooze button for muting people, groups and Pages for 30 days", "publisher": "TechCrunch", "url": "https://techcrunch.com/2017/12/15/facebook-adds-a-snooze-button-for-muting-people-groups-and-pages-for-30-days/", "date": "2017-12-15"}
  ]
}
---
Facebook's best-known slop is a picture: Jesus made of shrimp, a child's sculpture too perfect to be real, a cabin carved from one log. In early 2024 NBC News reported on these AI-generated images drawing huge engagement, with comment sections full of "Amen" ([NBC News](https://www.nbcnews.com/tech/tech-news/facebook-users-say-amen-bizarre-ai-generated-images-jesus-rcna143965)). "Shrimp Jesus" became shorthand for the whole genre.

The research behind that coverage is worth knowing. Renée DiResta and Josh Goldstein studied 125 Facebook Pages that each posted at least 50 AI-generated images, and found posts with hundreds of millions of exposures and engagements ([HKS Misinformation Review](https://misinforeview.hks.harvard.edu/wp-content/uploads/2024/08/diresta_spammers_scammers_ai_images_facebook_20240815.pdf)). The motive was mostly money and audience: spam Pages used the images as clickbait to send people to content farms off the platform, and scam Pages tried to sell products that didn't seem to exist. The authors also found Facebook's feed sometimes showed these unlabelled images to people who didn't follow the Pages at all.

The pictures come wrapped in writing, and that's the part this site is about. Bait captions, fake quizzes and sob stories with a link are old Facebook habits that need no AI at all.

## What slop looks like on Facebook

Facebook bait tends to ask for one tiny action: type a word, answer a sum, tap a link.

The caption on an image post, built to harvest comments:

:::slop
Made this with my own hands 🙏 Nobody ever likes my work. Type AMEN if you think it's beautiful ❤️
:::
:::fine
Finished the oak bench for my sister's porch. Third attempt at pegged joints. The left one still has a gap, so I'll fill it with a wedge this weekend.
:::

The puzzle that nobody needs solving:

:::slop
Only 1 in 100 people can get this right! 9 + 3 × 0 = ? Comment your answer 👇
:::
:::fine
The school is selling surplus library books on Saturday from 9 to 12. £1 each, and the money goes to the new reading corner.
:::

The story post with a link at the end:

:::slop
This heartwarming story will restore your faith in humanity. What happened next left everyone speechless 😢 Full story in the comments 👇
:::
:::fine
Mill Lane is closed between the bridge and the school from 20 to 24 October for gas works. The 14 bus is diverted via Station Road.
:::

All three are [engagement bait](/patterns/engagement-bait/), and the first and third lean on [flowery](/patterns/flowery-prose/), emotional language to get there. The fine examples are dull on purpose. Community news, local notices and posts from people you actually know are what Facebook does well, and the bait crowds them out.

## How Slop Mop filters your Facebook feed

On Facebook, Slop Mop reads the posts in your Feed shortly before you scroll to them, whether they come from friends, groups, Pages or suggestions. It runs on desktop in Chrome, Edge, Firefox, Safari and Chromium browsers such as Brave, Opera, Arc, Vivaldi and Comet. It sends each post's text and its public engagement counts to its scoring service, and never your name or the author's.

It reads the writing, so on an image post it judges the caption. It won't tell you whether the carved horse is real. It will notice that "Type AMEN if you think it's beautiful" is engagement bait, and on these posts the caption is where the bait lives.

An AI model designed for calibrated decisions answers twelve questions about the writing: nine tells of slop and three counter-signals (sounds like a person, useful to readers, and reader response). Each post gets a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure. Not sure means the post is left alone.

- **Hide mode** folds a post past your threshold into a one-line strip where it was. Click Show post and it opens in place.
- **Highlight mode** hides nothing. The post's mop turns yellow for Possibly slop and red for Likely slop.
- **Sensitivity** is Mild, Moderate or Aggressive.

Click the mop to see the details panel: the score, the strongest signs and the Slopprint, a nine-spoke chart with one spoke per tell. The reader response bar counts comments and shares for more than reactions, and it discounts the pattern bait produces: a thousand one-word comments on a post that asked for them. The plain local notice that nobody reacts to still scores well on "useful to readers".

You can vote Not sure, No, Maybe or Probably on anyone else's post, and your vote overrides the model in your own Feed. Facebook never sees it.

It judges the writing, and it isn't an AI detector. It never deletes, reports, mutes or blocks anything, so friends and Pages carry on as normal and nobody is unfriended or snoozed.

The free plan covers the one feed you pick, with 250 checks a day, and Facebook can be that feed. Slop Mop XL (US$5.99 a month or US$59.99 a year) adds every other feed, the sites you read, Gmail and Outlook, and a higher daily limit. The details are on [how it works](/how-it-works.html).

## Facebook's own feed controls, and how they fit with Slop Mop

Facebook has three built-in controls for this, each a little stronger than the last.

1. **Show less.** Open the three-dot menu at the top right of a post and choose "Show less". Facebook says this temporarily lowers the ranking of that post and similar ones. "Show more" does the opposite, and both work on suggested posts as well as posts from your connections ([Popular Science](https://www.popsci.com/technology/facebook-feed-show-less-show-more/)).
2. **Snooze.** From the same menu, snooze the person, Page or group for 30 days. Their posts disappear from your feed for the month, and they aren't told ([TechCrunch](https://techcrunch.com/2017/12/15/facebook-adds-a-snooze-button-for-muting-people-groups-and-pages-for-30-days/)).
3. **Unfollow.** For a Page that only ever posts bait, unfollow it. You can unfollow a friend without unfriending them.

Show less is a hint that fades. Snooze and Unfollow work on whole accounts, which is fine for a spam Page and harsh for an aunt who posts one quiz a week between photos you'd want to see. Use them together: unfollow the spam Pages, use Show less on suggestions you never asked for, and let Slop Mop fold the aunt's quiz while her photos stay. [Slop Mop vs unfollowing and muting](/compare/slop-mop-vs-unfollowing-and-muting/) compares them in more detail.

## Who it's for

People who stay on Facebook for groups, family and local news, and would like those back on top:

- [Small business owners](/for/small-business-owners/) who run a Page and read local groups, and compete with bait for the same attention.
- [Educators](/for/educators/) in parent and school groups, where notices get lost under puzzles and chain posts.
- [Comms teams](/for/comms-teams/) who monitor community pages and need the real complaints and questions.
- Anyone who has had to explain to a relative that the carved wooden horse isn't real. The [AI slop](/glossary/ai-slop/) entry covers where the word and the genre came from.

[Add Slop Mop to your browser](/) and it folds Facebook posts like these for you.
