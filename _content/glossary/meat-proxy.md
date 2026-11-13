---
{
  "title": "Meat proxy",
  "seo_title": "Meat proxy: forwarding AI output unread · Slop Mop",
  "description": "A meat proxy is someone who passes AI output to others without reading or checking it. Where the 2026 term came from, examples and the criticism.",
  "summary": "Someone who forwards AI output to colleagues or friends without reading, checking or rewriting it first.",
  "updated": "2026-10-18",
  "term": "Meat proxy",
  "aliases": [
    "meat-based LLM proxy"
  ],
  "punchline": "Human who forwards AI output without checking it.",
  "kind": "ai",
  "first_seen": "2026",
  "coined_by": "",
  "sensitivity": "",
  "related": [
    "/glossary/ai-slap/",
    "/glossary/workslop/",
    "/glossary/ai-slop/",
    "/glossary/ai-suspicion/",
    "/patterns/stiff-phrasing/"
  ],
  "sources": [
    {
      "title": "Don't be a meat proxy",
      "publisher": "Niklas Gruhn",
      "url": "https://gruhn.me/blog/2026-08-03/",
      "date": "2026-08-03"
    },
    {
      "title": "Don't be a meat proxy",
      "publisher": "Simon Willison's Weblog",
      "url": "https://simonwillison.net/2026/aug/3/dont-be-a-meat-proxy/",
      "date": "2026-08-03"
    },
    {
      "title": "meat-based llm proxies",
      "publisher": "not-an-llm",
      "url": "https://not-an-llm.com/meat-based-llm-proxies",
      "date": "2026-03-31"
    },
    {
      "title": "Meat proxy",
      "publisher": "kottke.org",
      "url": "https://kottke.org/26/08/0049527-meat-proxy",
      "date": "2026-08-24"
    },
    {
      "title": "Meat proxy",
      "publisher": "SF-isms",
      "url": "https://sfisms.org/meat-proxy",
      "date": ""
    },
    {
      "title": "Etzioni on AI: The colorful and cranky language of the AI era, from slop to slap",
      "publisher": "GeekWire",
      "url": "https://www.geekwire.com/2026/etzioni-on-ai-the-colorful-and-cranky-language-of-the-ai-era-from-slop-to-slap/",
      "date": "2026-10-16"
    }
  ],
  "keyword": "meat proxy"
}
---
## What a meat proxy is

A meat proxy is a person who takes what an AI tool produced and passes it on to someone else without reading, checking or rewriting it. Their name is on the message. The thinking happened in a chat window they didn't look at closely.

The giveaways are familiar to anyone who has asked a question in a work chat lately. The reply opens with "Claude said:" or "Here's what ChatGPT says". It answers a slightly different question from the one you asked. It runs three times longer than anything else in the thread, and it uses jargon the sender couldn't explain if you asked them.

The term describes a habit, and the habit is skipping the read. Someone who drafts a reply with AI, checks it against what they know and puts it in their own words is doing ordinary work.

## Where the term meat proxy came from

The developer Niklas Gruhn popularised the phrase in a blog post, ["Don't be a meat proxy"](https://gruhn.me/blog/2026-08-03/), on 3 August 2026. He described asking questions in Slack, leaving feedback on pull requests and arguing with friends in a group chat, and getting back pasted AI answers. His point was simple: he could ask the AI himself, faster, with his own context. His advice was to prompt AI if you like, then read the output, understand it, validate it and reply in your own words.

Simon Willison linked to the post the same day and credited Gruhn with the term. He later added that an earlier post, "meat-based llm proxies" on the not-an-llm blog from 31 March 2026, had used the phrase in a similar way. By late August the term had an entry in the [SF-isms glossary](https://sfisms.org/meat-proxy), which kottke.org picked up. SF-isms defines a meat proxy as "a person who forwards AI-generated text, code, or other output without reading, understanding, or validating it". Oren Etzioni and Daniel S. Weld quoted that definition in [their October 2026 GeekWire glossary of AI-era language](https://www.geekwire.com/2026/etzioni-on-ai-the-colorful-and-cranky-language-of-the-ai-era-from-slop-to-slap/), where they also named the act itself.

Meat proxy sits next to two related terms. [Workslop](/glossary/workslop/) names the document that looks finished and isn't. [AI slap](/glossary/ai-slap/) names the act of sending it. Meat proxy names the person in the middle.

## Examples

:::slop
Claude said: Great question! There are several important factors to consider when evaluating retry behaviour in distributed systems. 1. Idempotency guarantees… (then 600 more words, none of which mention our queue)
:::
:::fine
I asked Claude and checked it against our config. Retries are capped at 3. The duplicate charges came from the payment webhook firing twice, so the fix belongs there. Details in the PR.
:::

The second reply may have started as the same AI answer. The difference is that someone read it, tested it against the real system and kept only the part that answered the question.

## The criticism

The label is meant to sting, and put-downs land on the wrong people. From the outside, a pasted answer that someone checked carefully looks the same as one nobody read. Calling a colleague a meat proxy can also become a way to dismiss anything that sounds machine-written without engaging with whether it's right, which is the same mistake as [AI suspicion](/glossary/ai-suspicion/) treated as proof.

There's also a fair defence of some relaying. If a manager asks a quick factual question and a colleague pastes a correct, short answer, nothing much is lost. The complaint is about volume and about handing the checking work to the reader.

## How Slop Mop sees it

Slop Mop doesn't try to work out whether something was forwarded unread. It judges the text, so a pasted answer full of [stiff phrasing](/patterns/stiff-phrasing/) and generic filler tends to score as slop, while an AI-assisted post with specific facts usually doesn't. It does this in your feeds on LinkedIn, X, Reddit and the other networks it covers, and in email, where a lot of pasted answers land: Slop Mop for Gmail and Slop Mop for Outlook check only what the sender wrote, never attachments or quoted earlier messages. [How it works](/how-it-works.html) explains the scoring.

[Add Slop Mop to your browser](/), with Slop Mop for Gmail and Outlook as part of Slop Mop XL, and it folds pasted filler like the first reply for you.
