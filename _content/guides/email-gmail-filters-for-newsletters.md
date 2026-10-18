---
{
  "title": "How to use Gmail filters to keep newsletters out of your inbox",
  "seo_title": "Gmail filters for newsletters: a reading folder · Slop Mop",
  "description": "Set up Gmail filters and a label so newsletters you want to keep skip the inbox and wait in one place. Search operators, steps and a weekly routine.",
  "summary": "For newsletters you want but not in your inbox: a Gmail label, a filter that sends them there, and the search operators that make it work.",
  "updated": "2026-10-18",
  "network": "email",
  "publish_date": "2026-11-10",
  "verified": "2026-10-18",
  "minutes": 6,
  "related": ["/for/email/", "/patterns/scroll-stopper/", "/glossary/ai-slop/", "/for/researchers/", "/for/journalists/"],
  "sources": [
    {"title": "Create rules to filter your emails", "publisher": "Google (Gmail Help)", "url": "https://support.google.com/mail/answer/6579", "date": ""},
    {"title": "Refine searches in Gmail", "publisher": "Google (Gmail Help)", "url": "https://support.google.com/mail/answer/7190", "date": ""},
    {"title": "Create and manage labels in Gmail", "publisher": "Google (Gmail Help)", "url": "https://support.google.com/mail/answer/118708", "date": ""},
    {"title": "Organise your emails into categories", "publisher": "Google (Gmail Help)", "url": "https://support.google.com/mail/answer/3094499", "date": ""}
  ]
}
---
Make a label called something like *Reading*, then create a Gmail filter that matches your newsletters, applies that label and archives them so they skip the inbox. They'll wait in one place until you choose to read them. Filters can only be set up in Gmail on a computer, but the label shows up in the phone app too.

This guide is for the newsletters you want to keep. If you'd rather stop them arriving, start with [Gmail's Manage subscriptions page](/guides/email/email-gmail-manage-subscriptions/) instead.

## Before you start

- **Use a computer.** Google's filter instructions are for Gmail in a browser.
- **Plan for the backlog.** Google's help page says a forwarding filter only affects new messages, and doesn't promise any filter will re-sort what you already have. Step 3 covers labelling the old issues by hand.
- **Don't catch the wrong mail.** A filter on a broad word like "update" will scoop up your bank's security updates. Test every search before you turn it into a filter (step 2 below).

## 1. Create a label

1. Open Gmail on your computer.
2. On the left, next to **Labels**, click **Create new label**.
3. Name it. *Reading*, *Newsletters* or *Weekend* all work.
4. Click **Create**.

Google points out that labels are different from folders: one email can carry several labels, and only you can see them. You can have up to 5,000.

## 2. Write a search that finds your newsletters

This is the part that decides whether the filter works. Gmail's search operators let you be precise:

| You want | Type this in the search box |
|---|---|
| Everything from one sender | `from:digest@example.com` |
| Several senders at once | `from:a@example.com OR from:b@example.com` |
| Everything from a mailing list | `list:info@example.com` |
| A phrase that appears in every issue | `"weekly roundup"` |
| One sender, but not their receipts | `from:shop@example.com -receipt` |

The `list:` operator finds email sent from a mailing list, which is how most newsletters arrive. If you don't know a newsletter's list address, `from:` with the sender's address does the same job in most cases.

Click **Search** and look at the results. If anything appears that you'd want in your inbox, narrow the search with `-word` until it doesn't.

## 3. Turn the search into a filter

1. In the search box at the top, click **Show search options** and enter the same search.
2. At the bottom of the search window, click **Create filter**.
3. Choose what the filter should do. For a reading folder, tick the options to apply the label you made and to archive the email so it skips the inbox. Google's help page lists the actions as sending to a label, archiving, deleting, starring and forwarding; the exact checkbox wording may differ on your screen.
4. Click **Create filter**.

There's a quicker route if you have one example in front of you: tick the box next to the email, click **More**, then **Filter messages like these**. You then enter or adjust the filter criteria and click **Create filter**.

To label issues that arrived before the filter existed, run the search again, tick the box to select the results, click **Labels** at the top and choose your label. Then archive them.

## 4. Make a habit of the label

The filter only helps if you visit the label. A routine that works for a lot of people:

- **Pick one slot a week** for the Reading label, and read the newest issue of each newsletter first.
- **Clear the rest in bulk.** Search `label:reading older_than:1m` (swap in your label's name), select all and archive. Anything you haven't opened in a month you probably won't.
- **Notice what you skip.** If you've archived a newsletter unread three weeks running, unsubscribe from it.

## Or use Gmail's own categories

If you don't want to build filters, Gmail can do some of the sorting for you. With the **Default** inbox type, it sorts mail into Primary, Social, Promotions, Updates and Forums. Mailing lists often land in Forums or Promotions.

1. Click **Settings** at the top right.
2. In **Quick settings**, under **Inbox type**, choose **Default**.
3. Click **Customise** and tick the categories you want as tabs.
4. Click **Save**.

If a newsletter lands in the wrong tab, drag it to the right one; Google says this helps Gmail learn. You can't create your own categories, which is why a label and a filter give you more control. You can search a category with `category:promotions` or `category:forums`, and a filter can send a sender's mail to a specific category.

## What the filter can't do

A filter sorts by who sent the email and which words appear in it. It has no idea whether this week's issue is any good. A newsletter you love can send a padded issue built around a [scroll-stopper](/patterns/scroll-stopper/) subject line, and the filter will file it next to the good ones.

:::slop
Subject: The one thing nobody is telling you about AI 🤯
This week, everything changed. Again. Let's dive in…
:::
:::fine
Subject: Issue 112: the new EU AI Act deadlines, and two tools we dropped
Three dates for your calendar, and why we stopped recommending two note-taking apps after testing them for a month.
:::

Both would land in your Reading label. Only one is worth opening first. Skimming subject lines in the label, rather than opening issues in order, is the quickest way to tell them apart.

## Managing your filters later

1. Click **Settings**, then **See all settings**.
2. Click **Filters and blocked addresses**.
3. Find the filter and click **Edit** or **Delete**.
4. If editing, click **Continue**, then **Update filter**.

From the same page you can export your filters as an .xml file, which is worth doing once you've built a few. If you ever move accounts, **Import filters** brings them back.

## If that doesn't work

- **The filter missed an issue.** The sender may have changed address. Search for the issue, check the sender, and add it to your filter with `OR`.
- **Important email went to the label.** Your search was too broad. Edit the filter and add `-word` exclusions, or switch from a word match to `from:` or `list:`.
- **Replies in a thread got filtered.** Google notes that a reply is only filtered if it matches the same criteria, so threads can behave unexpectedly. Filters on `from:` are the most predictable.
