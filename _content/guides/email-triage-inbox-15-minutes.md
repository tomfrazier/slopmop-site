---
{
  "title": "How to triage your inbox in 15 minutes (Gmail and Outlook)",
  "seo_title": "Triage your inbox in 15 minutes: Gmail and Outlook",
  "description": "A timed, four-pass method for clearing an overloaded inbox in Gmail or Outlook: find what matters, bulk-archive the rest, and snooze what can wait.",
  "summary": "A four-pass, 15-minute method for an overloaded inbox, using Gmail search and snooze or Outlook filters, Sweep and snooze.",
  "updated": "2026-10-18",
  "network": "email",
  "publish_date": "2026-12-08",
  "verified": "2026-10-18",
  "minutes": 6,
  "related": ["/for/email/", "/glossary/workslop/", "/patterns/engagement-bait/", "/for/founders/", "/for/hiring-managers/"],
  "sources": [
    {"title": "Refine searches in Gmail", "publisher": "Google (Gmail Help)", "url": "https://support.google.com/mail/answer/7190", "date": ""},
    {"title": "Snooze emails until later", "publisher": "Google (Gmail Help)", "url": "https://support.google.com/mail/answer/7622010", "date": ""},
    {"title": "Importance markers in Gmail", "publisher": "Google (Gmail Help)", "url": "https://support.google.com/mail/answer/186543", "date": ""},
    {"title": "Organize your inbox", "publisher": "Microsoft Support", "url": "https://support.microsoft.com/en-gb/outlook/officeweb/organize-your-inbox", "date": ""},
    {"title": "Organize your inbox with Archive, Sweep, and other tools in Outlook.com", "publisher": "Microsoft Support", "url": "https://support.microsoft.com/en-gb/topic/19eee6b9-09a1-4db6-b5d6-37644190884f", "date": ""}
  ]
}
---
Spend 15 minutes in four passes: 3 minutes pulling out mail from real people, 5 minutes bulk-archiving everything automated, 5 minutes answering or snoozing what's left, and 2 minutes setting one filter or rule so the same pile doesn't come back. Archive, don't delete. The aim is an inbox where everything left needs you. Empty is optional.

## Before you start

- **Set a timer.** The limit is what stops you reading newsletters halfway through.
- **Use a computer.** Gmail's search and snooze-in-bulk steps and Outlook's Sweep are documented for the browser and desktop versions.
- **Archive keeps things.** In both Gmail and Outlook, archived mail leaves the inbox but can still be searched. That makes bulk moves safe: anything you archive by mistake can be found again.

## Pass 1: pull out what matters (3 minutes)

Find the mail that's from people, about things that need you.

**In Gmail**, search for unread mail from people you deal with:

- `is:unread is:important` shows unread mail Gmail has marked as important. Google says it decides this from who you email, which emails you open and reply to, and similar signals.
- `is:unread category:primary` works if you use inbox categories.
- `is:unread from:boss@example.com` for the one or two people you can't keep waiting.

Star or open anything that needs a reply today.

**In Outlook**, select **Filter** at the top of your inbox and choose one of the built-in options. Microsoft lists filters for priority, flagged mail, attachments and @mentions, among others; look for an unread option in the same menu. The names may vary by version. If you use Focused Inbox, start in the **Focused** tab.

Flag anything that needs a reply today: select the email, then **Flag/Unflag**.

## Pass 2: bulk-archive the automated mail (5 minutes)

Most of an overloaded inbox is newsletters, notifications and receipts you've already dealt with. Clear them in batches, not one by one.

**In Gmail**, search, select all, archive. Some searches that catch a lot:

- `category:promotions older_than:7d`
- `category:social` or `category:updates older_than:3d`
- `list:` with a newsletter's list address, or `from:` with a notification address (for example a project tool's)
- `older_than:1m -is:starred` if your inbox is truly buried

Check the first screen of results before you archive. If something important is in there, add `-from:` that sender and search again.

**In Outlook**, use **Sweep** for senders with lots of messages:

1. Select one email from the sender.
2. Select **Sweep**.
3. Choose to move all their messages out of the inbox, or keep only the latest one.
4. Select **OK** or **Sweep**.

Sweep isn't available from Junk Email, Drafts, Sent Items or Deleted Items. For everything else, select a run of messages and choose **Archive**.

## Pass 3: answer, snooze or drop (5 minutes)

Go through what's left, top to bottom. Each email gets one of four outcomes:

| If it… | Then |
|---|---|
| Needs under two minutes | Reply now |
| Needs you, but not today | Snooze it to the day you'll deal with it |
| Is for information only | Archive it |
| Asks for something vague with no deadline | Reply with one question, or archive |

**Snooze in Gmail:** point to the email and click **Snooze** on the right, then pick a day and time. To snooze several, select them and click **Snooze** at the top (or under **More** if it isn't shown). Snoozed mail waits under **Snoozed** in the left-hand menu and comes back to the top of your inbox when its time comes.

**Snooze in Outlook:** right-click the email, select **Snooze**, and choose a time. It disappears from the inbox and reappears as new mail when the time comes. If you want something to stay visible, use **Pin** to keep it at the top of the inbox.

Watch for two kinds of email that eat this pass. The first is the polished update with no ask in it: a few paragraphs of "progress across workstreams" and "let me know your thoughts". That's [workslop](/glossary/workslop/), and the useful reply is a single question ("What do you need from me here?") or nothing at all. The second is the cold pitch that ends "worth a quick chat?" with no detail; the [cold email guide](/guides/email/email-ai-sounding-cold-emails/) covers how to tell in 30 seconds.

:::slop
Hi all, just circling back on the previous thread to make sure we're aligned. Happy to discuss further at your convenience. Let me know your thoughts!
:::
:::fine
Can you sign off the £2,400 print quote by Thursday? The printer holds the price until then. Quote attached.
:::

The first takes a minute to read and leaves you guessing. The second takes ten seconds and you know exactly what to do.

## Pass 4: stop the same pile coming back (2 minutes)

Look at what you archived in pass 2 and pick the single biggest source. Then:

- **If you don't want it at all:** unsubscribe. See the guides for [Gmail](/guides/email/email-gmail-manage-subscriptions/) and [Outlook](/guides/email/email-outlook-clean-up-newsletters/).
- **If you want it, but not in your inbox:** set up a [Gmail filter](/guides/email/email-gmail-filters-for-newsletters/) that labels and archives it, or an [Outlook rule](/guides/email/email-outlook-rules-focused-inbox/) that moves it to a folder.

One a day is enough. Each one takes a source of mail out of every future triage.

## Things never to bulk-archive blind

Security codes and sign-in alerts, bank and card messages, payroll, anything from a court, council or tax office, and delivery notices for things you're waiting on. Exclude them from your bulk searches, or check the results before you archive.

## If that doesn't work

- **The inbox is too big for 15 minutes.** Do pass 2 with `older_than:1m` in Gmail, or select everything older than a month in Outlook and archive it. Then run the four passes on what's left. Nothing is lost; it's all searchable.
- **Snooze isn't where this guide says.** Look under **More** in Gmail, or on the ribbon's **Tags** section in Outlook on the web. Your version may label it differently.
- **You keep reading instead of sorting.** Work from the message list and decide from the sender and subject line. Open an email only if you can't decide without it.
