---
{
  "title": "Slop Mop for email: a slop filter for Gmail and Outlook",
  "seo_title": "Slop filter for Gmail and Outlook · Slop Mop",
  "description": "A slop filter for Gmail and Outlook: what inbox slop looks like, how the Slop Mop add-ons check email privately, and the filters and rules to set as well.",
  "summary": "Slop Mop for Gmail and Outlook checks the emails you open for cold-sequence filler, padded newsletters and workslop.",
  "keyword": "slop filter for gmail and outlook",
  "updated": "2026-10-18",
  "kind": "network",
  "audience": "your inbox (Gmail and Outlook)",
  "network_status": "live",
  "related": ["/glossary/workslop/", "/patterns/stiff-phrasing/", "/patterns/empty-praise/", "/patterns/hype-words/", "/for/sales-teams/", "/for/ceos/"],
  "sources": [
    {"title": "AI-generated \"workslop\" is destroying productivity", "publisher": "Harvard Business Review", "url": "https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity", "date": "2025-09-22"},
    {"title": "Create rules to filter your emails", "publisher": "Gmail Help", "url": "https://support.google.com/mail/answer/6579", "date": ""},
    {"title": "Manage your subscriptions in Gmail", "publisher": "Gmail Help", "url": "https://support.google.com/mail/answer/15621070", "date": ""},
    {"title": "Focused Inbox for Outlook", "publisher": "Microsoft Support", "url": "https://support.microsoft.com/help/f714d94d-9e63-4217-9ccb-6cb2986aa1b2", "date": ""},
    {"title": "Use inbox rules in Outlook.com", "publisher": "Microsoft Support", "url": "https://support.microsoft.com/office/use-inbox-rules-in-outlook-com-4b094371-a5d7-49bd-8b1b-4e4896a7cc5d", "date": ""}
  ]
}
---
Inbox slop comes from three directions. Strangers send cold outreach in automated sequences. Newsletters you once signed up for arrive padded to a length nobody asked for. And colleagues send long, polished documents that turn out to say very little.

That third kind has a name. In September 2025, researchers from BetterUp Labs and the Stanford Social Media Lab wrote in Harvard Business Review about [workslop](/glossary/workslop/): AI-generated work content that looks like good work but lacks the substance to move a task forward. In their survey of US desk workers, 40% said they'd received some in the previous month ([Harvard Business Review](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity)). The cost lands on whoever receives it, who has to work out what it means, fix it or redo it.

Email slop isn't only an AI problem. Sales sequences were formulaic long before language models, and "I hope this email finds you well" has been opening empty emails for decades.

## What slop looks like in your inbox

Inbox slop is usually polite, long and vague. The three kinds look like this.

The cold email from a sequence:

:::slop
Hi {First name}, I hope this email finds you well! I came across your impressive profile and was truly inspired. Our cutting-edge platform empowers teams like yours to unlock seamless growth. Do you have 15 minutes this week?
:::
:::fine
Hi Priya, you posted a data engineer role on 3 October. We place contract data engineers in Leeds, usually within two weeks, for a 15% fee. Worth a call, or not a fit?
:::

The internal update that's all framing:

:::slop
Hi team, please find below a comprehensive overview of key considerations regarding Q4 priorities. Furthermore, alignment across stakeholders remains essential to driving impactful outcomes.
:::
:::fine
Q4: we're dropping the Android widget and moving both engineers to billing. Sam, I need your decision by Friday on whether the price change ships in November.
:::

The newsletter that opens with weather:

:::slop
Welcome back to another edition! This week has been an absolute whirlwind, and I can't wait to share some truly exciting updates with you all...
:::
:::fine
Three things this week: the library reopens on Monday, bin collection moves to Thursdays, and nominations for the village hall committee close on 31 October.
:::

The cold email stacks [empty praise](/patterns/empty-praise/) and [hype words](/patterns/hype-words/). The update is [stiff phrasing](/patterns/stiff-phrasing/) from top to bottom. The newsletter makes you read a paragraph to find out there's nothing in it yet. Each fine version can be acted on from the first sentence.

## How the slop filter works in Gmail and Outlook

Email works through two add-ons, Slop Mop for Gmail and Slop Mop for Outlook. Both are part of Slop Mop XL, at US$5.99 a month or US$59.99 a year, which also covers every feed and the sites you read, on up to five browsers and add-ons.

The add-ons check the emails you open, and any draft you ask them to check. An AI model designed for calibrated decisions answers the same questions it asks of a post: the nine tells of slop, plus "sounds like a person" and "useful to readers". You get a score out of 100, a verdict (Likely slop, Possibly slop, Looks fine or Not sure) and the signs behind it, so you can see that the Q4 overview is mostly [stiff phrasing](/patterns/stiff-phrasing/) before you've read page two. Reader response doesn't apply, because an email has no public reactions to count.

Nothing in your mailbox is hidden, moved or deleted. In Outlook the verdict is saved on the email as a Slop Mop category, which you can see and remove in Outlook. In Gmail it's saved in your Google account's storage for the add-on. Each email is checked once, and voting isn't available for email.

Email is private, so the add-ons handle it differently from the browser extension:

- **Personal details are taken out in your mailbox, before anything is sent.** Names, email addresses, phone numbers, street addresses, links, card and bank numbers, ID numbers and dates of birth are replaced with placeholders such as [NAME] and [PHONE], and the add-on shows you what it took out. A name written in the body that isn't on the sender or recipient lines can occasionally get through.
- **Only what the sender wrote is sent.** The earlier messages quoted below it, the signature, attachments, your contacts and your other mail stay put.
- **Some mail is never read unless you check it by hand:** spam and junk, mail marked private or confidential or with a sensitivity label, encrypted mail, legal and health mail, and transactional mail such as sign-in codes, password resets, receipts and deliveries. You can change these in your account's email settings.
- **Email text isn't stored or used for training.** The server keeps a one-way hash of the redacted text and the scores, so the same email isn't judged twice.

The full detail is in the [privacy policy](/privacy.html), and the scoring is explained on [how it works](/how-it-works.html). It judges the writing, and it isn't an AI detector, so a clear email drafted with AI help can pass while a hand-written one that's all preamble may not. It doesn't unsubscribe you from anything either.

## Gmail's and Outlook's own filters, and how they fit with Slop Mop

Both Gmail and Outlook have useful built-in tools. They sort by sender and keyword, which handles bulk mail well and colleagues not at all.

**In Gmail**

1. **Filter messages like these.** Open an email, choose "Filter messages like these" from its menu, set the criteria (sender, words, subject) and choose an action such as skip the inbox, apply a label or delete. Edit filters later under Settings, then Filters and Blocked Addresses ([Gmail Help](https://support.google.com/mail/answer/6579)).
2. **Manage subscriptions.** In the left-hand menu, choose More, then Manage subscriptions, to see your mailing lists in one place and unsubscribe. Google says it's rolling out gradually, and unsubscribing can take a few days to take effect ([Gmail Help](https://support.google.com/mail/answer/15621070)).

**In Outlook**

1. **Focused Inbox.** It splits your inbox into Focused and Other, moving bulk and automatically generated mail into Other based on what you interact with. In classic Outlook, turn it on from the View tab. It's available for Microsoft 365, Exchange and Outlook.com accounts ([Microsoft Support](https://support.microsoft.com/help/f714d94d-9e63-4217-9ccb-6cb2986aa1b2)).
2. **Inbox rules.** In Outlook.com and new Outlook, go to Settings, then Mail, then Rules, to move, flag or delete messages that match conditions you set. Rules run in list order, and in Outlook.com they apply only to new mail ([Microsoft Support](https://support.microsoft.com/office/use-inbox-rules-in-outlook-com-4b094371-a5d7-49bd-8b1b-4e4896a7cc5d)).

A filter can catch "I hope this email finds you well". It can't tell you the five-page Q4 overview from your manager is mostly filler. Let filters, rules and Focused Inbox sort the bulk mail by sender, unsubscribe from what you never open, and use Slop Mop on what's left: the colleague's report, the newsletter you pay for, the cold email that might be worth a reply. [Slop Mop vs email triage tools](/compare/slop-mop-vs-email-triage-tools/) and [Slop Mop vs spam filters](/compare/slop-mop-vs-spam-filters/) go further into the split.

## Who it's for

Anyone whose inbox is a large part of their job:

- [CEOs](/for/ceos/) and [founders](/for/founders/) getting a steady stream of pitches alongside internal reports they need to read properly.
- [Sales teams](/for/sales-teams/) who send outreach as well as receive it, and want to know what reads as a template.
- [Recruiters](/for/recruiters/) and [investors](/for/investors/), whose addresses are on every cold-email list.
- [Comms teams](/for/comms-teams/) and [journalists](/for/journalists/) fielding press releases that bury the one line that matters.

If your inbox looks like this, [Slop Mop for Gmail and Outlook](/) comes with Slop Mop XL and checks these emails for you.
