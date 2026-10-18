---
{
  "title": "How to use Outlook rules and Focused Inbox to quieten your inbox",
  "seo_title": "Outlook rules and Focused Inbox, step by step · Slop Mop",
  "description": "Turn on Focused Inbox, train it sender by sender, and write Outlook rules for the bulk mail it misses. Steps for new Outlook, classic Outlook and the web.",
  "summary": "Focused Inbox splits mail into Focused and Other; rules handle what it gets wrong. Steps for new Outlook, classic Outlook and Outlook on the web.",
  "updated": "2026-10-18",
  "network": "email",
  "publish_date": "2026-11-24",
  "verified": "2026-10-18",
  "minutes": 7,
  "related": ["/for/email/", "/glossary/workslop/", "/patterns/engagement-bait/", "/for/ceos/", "/for/consultants/"],
  "sources": [
    {"title": "Focused Inbox for Outlook", "publisher": "Microsoft Support", "url": "https://support.microsoft.com/en-gb/office/focused-inbox-for-outlook-f445ad7f-02f4-4294-a82e-71d8964e3978", "date": ""},
    {"title": "Manage email messages by using rules in Outlook", "publisher": "Microsoft Support", "url": "https://support.microsoft.com/en-gb/office/use-rules-in-new-and-classic-outlook-for-windows-8400435c-f14e-4272-9004-1548bb1848f2", "date": ""},
    {"title": "Organize your inbox with Archive, Sweep, and other tools in Outlook.com", "publisher": "Microsoft Support", "url": "https://support.microsoft.com/en-gb/topic/19eee6b9-09a1-4db6-b5d6-37644190884f", "date": ""}
  ]
}
---
Focused Inbox splits your Outlook inbox into two tabs: **Focused** for mail Outlook thinks matters, and **Other** for bulk and automated mail. Turn it on, then correct it a few times with **Always move to Other** or **Always move to Focused**. For anything it keeps getting wrong, write an inbox rule that moves those messages to a folder the moment they arrive.

If you want to leave lists or clear old newsletters first, the [Outlook newsletter clean-up guide](/guides/email/email-outlook-clean-up-newsletters/) covers Subscriptions and Sweep.

## Before you start

- **Find out which Outlook you have.** Microsoft's steps differ between new Outlook for Windows, classic Outlook, Outlook on the web (work or school accounts) and Outlook.com (personal accounts). One quick check: classic Outlook has a **File** tab on the ribbon. If a step below doesn't match your screen, try the steps for the other version.
- **Account limits.** In Outlook for Windows, Microsoft says Focused Inbox works only with Microsoft 365, Exchange and Outlook.com accounts. It doesn't work on shared mailboxes. New Outlook doesn't support rules for Gmail, Yahoo or iCloud accounts added to it; set those up with the provider instead.
- **Phone app.** Microsoft has a separate page for Focused Inbox on mobile devices. The steps here are for computers and browsers.

## Part 1: Focused Inbox

### 1. Turn it on

**New Outlook for Windows**

1. Select **View**, then **View settings**.
2. In **Mail**, then **Message list**, select the account.
3. Tick **Sort messages into Focused and Other**.
4. Select **Save**.

**Classic Outlook**

1. Select the **View** tab.
2. Select **Show Focused Inbox**.

**Outlook.com and Outlook on the web**

1. Select **Settings** at the top of the page, then **Mail**, then **Message list**.
2. In the **Focused Inbox** section, tick **Sort messages into Focused and Other**.
3. Select **Save**.

The tabs appear at the top of your message list straight away, and your existing inbox is sorted at once.

### 2. Train it

Microsoft says Focused Inbox looks at who you email and interact with and filters out noisy sources such as automated or bulk email. It will get some senders wrong at first. Correct them:

1. Right-click a message in the wrong tab.
2. In new Outlook, Outlook.com and the web, select **Move**, then **Move to Other inbox** (or **Move to Focused inbox**). In classic Outlook, the options sit directly on the right-click menu.
3. Choose **Always move to Other inbox** (or **Always move to Focused inbox**) if you want every future message from that sender to go there too.

The "Always" options are the useful ones, because they set an override for that sender. Microsoft says the more you use Focused Inbox, the better it gets.

### 3. Check Other once a day

Other isn't Junk. Invoices from new suppliers, a first email from someone you haven't met, and messages from automated systems you rely on can all land there. Outlook tells you when mail arrives in Other; a quick daily look is enough.

## Part 2: Inbox rules

Focused Inbox guesses. Rules don't. Use a rule when you know exactly which mail you want out of the way: a newsletter you read at weekends, project notification emails, a reporting system that sends ten emails a day.

### Quick rule: move one sender to a folder

**New Outlook**

1. Right-click a message from the sender.
2. Hover over **Rules**, then select **Create rule**.
3. Choose the folder, then select **OK**.

**Outlook.com**

1. Right-click a message, select **Rule**, then **Create rule**.
2. Choose the folder, then select **OK**.

The rule applies to incoming mail from then on. In new Outlook, Microsoft's inbox organisation page says you can tick **Run this rule now in Inbox** under **More options** to sort what's already there.

### Full rule: more conditions

1. Select **Settings**, then **Mail**, then **Rules**.
2. Select **Add new rule**.
3. Give it a name, a condition and an action. Every rule needs all three. You can add more with **Add a condition**, **Add an action** and **Add an exception**.
4. Decide on **Stop processing more rules**. If it's ticked, a message that matches this rule won't be checked against any rules below it. In Outlook on the web it's on by default.
5. Select **Save**.

Useful conditions for bulk mail are the sender's address, words in the subject, and whether you're in the To or Cc line. A good starter rule: messages where you're only copied, moved to a *Cc* folder you check once a day.

**Classic Outlook** works differently. Right-click a message and choose **Rules**, then **Create Rule**, or go to **File**, **Manage Rules & Alerts**, **New Rule** to start from a template. Microsoft notes some classic rules only run while Outlook is open.

### Order, pause and run

In **Settings**, **Mail**, **Rules**:

- **Order** matters. Rules run top to bottom. Use the up and down arrows to move a rule.
- **Pause** a rule with the toggle next to its name, rather than deleting it.
- **Run on existing mail** from the same list in new Outlook, using the run button next to the rule.

## Rules or Sweep?

Both can move a sender's mail. Microsoft's help page explains the difference: inbox rules run as soon as mail arrives, while Sweep rules run once a day. Use a rule when you don't want to see the message at all, and Sweep when you're tidying up a backlog.

## What rules can't sort

Rules and Focused Inbox work on who sent an email and what words it contains. They can't tell a useful update from a padded one sent by the same colleague. The status report that runs to four paragraphs without a decision in it (what some people call [workslop](/glossary/workslop/)) will still land in Focused, because it came from someone you work with. That part needs a reader.

:::slop
Subject: Weekly update
Hi team, just a quick update on progress this week. Things are moving forward across all workstreams and we remain on track. Let me know if you have any questions!
:::
:::fine
Subject: Weekly update: launch moves to 9 December
The payment provider's review takes 10 working days, not 5. Everything else is on track. No action needed unless you had launch-week leave booked.
:::

## If that doesn't work

- **No Focused and Other tabs after turning it on.** Your mailbox may use Clutter, an older folder-based version. Microsoft says Focused Inbox will replace it.
- **Messages won't move between tabs.** You may be in a shared mailbox, where Focused Inbox doesn't work by design.
- **A rule migrated from classic Outlook doesn't run.** Microsoft notes some classic rules are client-side and can't be processed by new Outlook. Create a new rule to replace it.
- **A rule catches too much.** Add an exception, or move a more specific rule above it and tick **Stop processing more rules** on that one.
