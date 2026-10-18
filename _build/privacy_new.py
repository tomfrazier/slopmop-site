# Privacy policy, server and extension 1.6. Built directly (no longer from the ported JSON).
from common import *
import pages as P

B = lambda t: f'<strong style="font-weight: var(--weight-semibold)">{t}</strong>'
M = lambda t: f'<code>{t}</code>'
MAIL = '<a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a>'
VOTE_CHANGE_DATE = "14 October 2026"
UPDATED = "last updated 14 october 2026"
BACKUP_DAYS = 30


def privacy():
    S = []  # (id, heading, html)
    S.append(("who-we-are", "Who we are", f"""
<p>Slop Mop is run by Artimovo LLC, a Delaware company, 1522 Western Ave STE 79205, Seattle, WA 98101, USA. Artimovo is the “controller” of the personal data described here: we decide what is collected and why. Contact us about anything on this page at {MAIL}.</p>"""))
    S.append(("what-leaves-your-browser", "What leaves your browser", f"""
<p>All judging requests go to one host: {M("api.slopmop.lol")}. Apart from Google, if you choose to sign in with it, nothing else is contacted by the extension.</p>
<p>The text of a post you have Slop Mop check, and its public engagement counts, are sent to {M("api.slopmop.lol")}. From there the text is passed to a third-party AI model designed for calibrated decisions, which produces the answers behind the score. Your name is never sent, and neither is the author's.</p>
<p>With Slop Mop XL, and only after you give your browser permission to read the pages you visit, Slop Mop can also score articles, comments and reviews on other sites. That text is sent the same way, only when you click its mop.</p>
<p>If you vote against a score (for example, you mark a post Probably slop when it was shown as fine), the extension also sends that post's text, so our team can look at why the score missed. See <a href="#your-votes">Your votes</a>.</p>"""))
    S.append(("slop-mop-for-email", "Slop Mop for Email", f"""
<p>Slop Mop for Gmail and Slop Mop for Outlook are part of Slop Mop XL. They check the emails you open and the drafts you ask them to check. Email is private, so they work differently from the extension:</p>
{P.ul([
    f'{B("Personal details are taken out in your mailbox, before anything is sent.")} Names (the people on the email, and names after a greeting, a sign-off or a title), email addresses, phone numbers, street addresses and postcodes, links, card and bank account numbers, Social Security and other ID numbers, dates of birth, IP addresses and long reference numbers are replaced with placeholders such as [NAME] and [PHONE]. The add-on shows you what it took out. We take every step we can to remove names, but we can\'t guarantee every one is caught: a name written in the body of an email that isn\'t on its sender or recipient lines can occasionally get through.',
    f'{B("Only what the sender wrote is sent:")} not the earlier messages quoted below it, not the signature, not attachments, not your contacts and not your other mail.',
    f'{B("Some mail is never read,")} unless you check it by hand: spam and junk; mail marked private or confidential, mail with a sensitivity label, and encrypted mail; legal and health mail; and transactional mail such as sign-in codes, password resets, receipts, orders, deliveries and invitations. You can change these in your account\'s email settings.',
    f'{B("Each email is checked once.")} In Outlook the verdict is saved on the email as a Slop Mop category, which you can see and remove in Outlook. In Gmail it is saved in your Google account\'s storage for the add-on.',
    f'{B("Email text is not stored.")} The server keeps a one-way hash of the redacted text and the scores, as for posts, so the same email isn\'t judged twice. Voting isn\'t available for email, and email is never used for training.',
    'The Gmail add-on uses Google\'s add-on permissions to read only the email you have open, and only while you have it open. Its use of information received from Google APIs follows the <a href="https://developers.google.com/terms/api-services-user-data-policy" rel="noopener">Google API Services User Data Policy</a>, including the Limited Use requirements.'])}"""))
    S.append(("what-is-stored", "What is stored", f"""
<p>For judging:</p>
{P.kv([
    ("A hash of the text", f"a one-way hash, so the same post or email isn't judged twice. The text itself is not kept, except for posts someone voted against the score (see <a href=\"#your-votes\">Your votes</a>)."),
    ("Scores", "the model's answers, the slop score, and when the content was first seen."),
    ("Engagement counts", "the public reaction and comment numbers the usefulness check reads (posts only)."),
    ("A salted hash of your browser's install id", "enough to apply daily limits and stop abuse, not enough to identify you."),
    ("A check log", "which hashed install checked which hashed post, and when, so only someone who was shown a verdict can vote on it, and so we can spot abuse. It is deleted after 90 days."),
    ("A salted hash of your IP address's network", "kept for up to 72 hours to stop one network flooding the service.")])}
<p>No social network profile data, no browsing history, no cookies set by the extension, and no analytics or advertising vendors in the extension.</p>"""))
    S.append(("your-account", "Your account", f"""
<p>Slop Mop uses an account, so your settings, plan and the feed you picked follow you to up to five browsers and email add-ons. You sign in with Google or with a one-time link sent to your email. There is no password.</p>
<p>Your account holds your email address, an account id, your plan, the feed you picked, your settings and email settings, a daily count of checks and verdicts for your dashboard, and the browsers and add-ons linked to it (a device id, a label such as “Chrome on Mac”, and when it was last seen). While you are signed in, our sign-in system also keeps your session with the IP address and browser it was started from, for 30 days or until you sign out.</p>
<p>If you sign in with Google, Google tells us your email address and the basic profile it shares, such as your name, and Google knows you signed in to Slop Mop. We get no access to your Gmail, contacts, files or anything else in your Google account through sign-in. (Slop Mop for Gmail is a separate add-on with its own permissions, described above.)</p>
<p>Your account is never attached to a post's score, and nothing about you is sent with the text being judged.</p>"""))
    S.append(("your-votes", "Your votes", f"""
<p>When you vote No, Maybe or Probably on a judgment, the vote is stored under a one-way key made from your browser's install id. That key matches nothing else we store: not your account, not the browser records linked to your account, and not the check log. Only your own browser, by sending its install id, can find its votes again (to show your vote or change it). Nobody at Slop Mop can look up what you voted, and votes are only ever counted in aggregate. Votes are never shown to anyone or sent to the author. You can't vote on your own posts: the vote panel doesn't appear on them.</p>
<p>{B("If you vote against the score, the post's text is kept with the vote's key,")} so our team can review it by hand and use it to improve the tells and the scoring. The text is the post's, not anything you wrote, and it carries nothing that leads to you or to its author: the author's name and profile are never stored, because Slop Mop judges writing, not people. Posts that nobody has reviewed within 90 days are deleted; reviewed posts are kept as anonymous training examples.</p>
<p>Votes made before {VOTE_CHANGE_DATE} were stored under a key that our database could link to your browser and account. Each one moves to the new key the next time you vote, and deleting your account removes that link for all of them.</p>"""))
    S.append(("payments-for-slop-mop-xl", "Payments for Slop Mop XL", f"""
<p>Slop Mop XL is a paid subscription. {B("Polar (Polar Software, Inc.) is the merchant of record")}: it sells the subscription to you, takes the payment, works out and collects sales tax or VAT, and sends receipts. Polar and the payment processors it works with collect and process your payment data, such as your name, email address, billing address and card or other payment details, under <a href="https://polar.sh/legal/privacy-policy" rel="noopener">Polar's privacy policy</a>.</p>
<p>Checkout runs on this website, using Polar's checkout, or on Polar's own page. When you upgrade, our server starts the checkout with your account id and email address so the subscription is linked to your account. Polar tells us when it starts, renews, changes or ends.</p>
<p>We never see or store your full card number. From Polar we receive what we need to run your subscription: your email address, name, country, plan, subscription status, and the dates and amounts of payments and refunds. We use it to turn Slop Mop XL on and off for your account, answer billing questions, and keep the records the law requires.</p>
<p>The free plan involves no payment and nothing is sent to Polar.</p>"""))
    S.append(("this-website-and-google-analytics", "This website and Google Analytics", f"""
<p>This website, {M("slopmop.lol")}, uses Google Analytics to count visits and see which pages are useful. With your consent, Google Analytics sets cookies in your browser and collects information such as the pages you view, the site that sent you, your browser and device type, and your approximate location, which Google derives from your IP address. Google processes that data under <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">its own policies</a>. We don't use it for advertising and we don't combine it with anything the extension sends.</p>
<p>{B("Cookie choice.")} In the UK, the EEA and Switzerland, Google Analytics sets no cookies until you choose Accept on the cookie banner. Until then, and if you choose Reject, it sends only cookieless pings with no identifier, as Google's consent mode does. Elsewhere, analytics cookies are on unless you choose Reject or your browser sends a Global Privacy Control signal. Change your choice any time with Cookie settings at the bottom of every page. Your choice is saved in your browser for a year.</p>
<p>You can also block analytics with your browser's cookie or tracking settings, a content blocker, or <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">Google's opt-out add-on</a>. The site works the same either way.</p>
<p>The site's fonts are served by Google Fonts. Forms on this site go through Formspree. If you sign up for updates, your email address is used only to send you Slop Mop news, and every email has an unsubscribe link. If you use the contact form, your name, email address and message are used only to reply to you. If you tell us why you deleted your account, what you write is used only to improve Slop Mop and, if you leave your email, to reply.</p>
<p>{B("Google Analytics runs on this website only.")} The extension and the email add-ons do not load it, and nothing from your feed or your mail is sent to Google Analytics.</p>"""))
    S.append(("who-else-handles-your-data", "Who else handles your data", f"""
<p>We use these providers to run Slop Mop. Each handles data only to provide its service to us:</p>
{P.kv([
    ("Vercel (USA)", f"runs {M('api.slopmop.lol')} · every request to the server"),
    ("Turso (ChiselStrike, USA)", "our database, hosted in the US · everything listed under What is stored and Your account"),
    ("A third-party AI scoring provider", "answers the questions behind each score · the text being judged (redacted, for email)"),
    ("Resend (USA)", "sends sign-in emails · your email address and the sign-in link"),
    ("Google", "Sign in with Google; this website's analytics and fonts · as described above"),
    ("Polar (USA)", "merchant of record for Slop Mop XL · payment and billing data"),
    ("Formspree (USA)", "this website's forms · what you type into them")])}
<p>We don't sell your personal data, and we don't share it for advertising.</p>
<p>{B("International transfers.")} If you are in the UK, the EEA or Switzerland, your data is processed in the United States. Where a provider is outside your region, we rely on the safeguards the law provides for that transfer: the European Commission's Standard Contractual Clauses and the UK International Data Transfer Addendum in the provider's data processing agreement, or the provider's certification under the EU-U.S. Data Privacy Framework and its UK and Swiss extensions. Our agreements with Turso and Formspree are still being put in place; until they are, transfers to those two providers don't yet have these contractual safeguards.</p>"""))
    S.append(("retention", "Retention", P.ul([
        f"{B('Check logs')} (the operational record of requests): 90 days, then deleted.",
        f"{B('IP network hashes:')} 72 hours.",
        f"{B('Daily usage counters for limits:')} 3 days.",
        f"{B('Sessions:')} 30 days, or until you sign out or delete your account. {B('Sign-in links:')} 15 minutes.",
        f"{B('Your account:')} until you delete it.",
        f"{B('Votes:')} kept as anonymous tallies; they can't be traced to you (see <a href=\"#your-votes\">Your votes</a>).",
        f"{B('Posts voted against the score:')} 90 days if unreviewed; reviewed posts are kept as anonymous training examples.",
        f"{B('Payment and subscription records')} at Polar: as long as tax and accounting law requires, usually seven years.",
        f"{B('Google Analytics:')} visit-level data for two months, its standard setting; the aggregated reports built from it, which don't identify anyone, are kept longer.",
        f"{B('Updates list:')} until you unsubscribe.",
        f"{B('Backups:')} our database provider keeps backups for {BACKUP_DAYS} days, so deleted data leaves the backups within {BACKUP_DAYS} days."])))
    S.append(("deleting-your-account", "Deleting your account", f"""
<p>You can delete your account yourself, at any time: open your Slop Mop dashboard, go to {B("Settings")}, choose {B("Delete account")} and type DELETE to confirm. Deletion is done from the dashboard only, so nobody but you can delete your account.</p>
<p>{B("What happens, straight away:")}</p>
{P.ul([
    "If you have Slop Mop XL, your subscription is cancelled at once and you won't be charged again. Polar deletes your customer profile and anonymizes it, keeping only the order and tax records the law requires. Deleting your account ends XL immediately and doesn't refund the rest of the current period, except as set out in our <a href=\"terms.html#refunds\">terms</a>.",
    "Your email address, account id, name (if Google gave us one), sign-in sessions, Google sign-in link, plan, settings, email settings, free-feed history and dashboard counts are deleted.",
    "Your browsers and email add-ons are unlinked: they stay installed, but belong to no one. You're signed out."])}
<p>{B("What stays, and why it no longer relates to you:")}</p>
{P.ul([
    "Your votes, in the anonymous tallies. They were never stored against your account, and after deletion nothing links even your older votes to you.",
    "The check log, keyed by a hash of your browser's install id and no longer linked to any account, until it is deleted after 90 days.",
    "Records that a payment or a redeemed code was processed, with your account id removed.",
    "What the extension and add-ons keep on your own devices (your on-page settings, for example) stays there until you uninstall them.",
    f"Copies in our database backups, until they expire within {BACKUP_DAYS} days."])}
<p>After deletion we can't restore your account, and you're welcome to sign up again with the same email address, starting fresh.</p>"""))
    S.append(("your-rights", "Your rights", f"""
<p>{B("Everyone.")} You can delete your account yourself, as described above. To ask for a copy of your personal data or to correct it, email {MAIL}. We'll reply within 30 days, and we may ask you to confirm the request from your account's email address.</p>
<p>{B("UK, EEA and Switzerland.")} Under the UK GDPR and the EU GDPR you have the right to access your data, to correct it, to have it erased, to restrict or object to how we use it, and to receive it in a portable format. Where we rely on your consent (analytics cookies), you can withdraw it at any time. We use your data on these legal bases:</p>
{P.ul([
    f"{B('To provide the service you asked for')} (contract): your account, your settings, checking the content you choose, Slop Mop XL.",
    f"{B('Our legitimate interests,')} balanced against yours: preventing abuse with hashed install ids, IP hashes and check logs; improving the scoring with anonymous votes and the posts people voted against.",
    f"{B('Your consent:')} Google Analytics cookies on this website.",
    f"{B('Legal obligation:')} keeping payment and tax records."])}
<p>You can complain to your data protection authority: in the UK, the Information Commissioner's Office (<a href="https://ico.org.uk" rel="noopener">ico.org.uk</a>); in the EEA, the authority in your country. We'd like the chance to help first at {MAIL}.</p>
<p>{B("California.")} Under the California Consumer Privacy Act, as amended by the CPRA, you have the right to know what personal information we collect, use and disclose; to delete it; to correct it; and not to be treated differently for using these rights. In the last 12 months we collected these categories: identifiers (email address, account id, hashed install and IP ids), commercial information (your plan and subscription, through Polar), internet activity (the content you had checked, kept as hashes, and the check log), and, on this website, analytics data as described above. We collect them for the purposes on this page and disclose them only to the providers listed under <a href="#who-else-handles-your-data">Who else handles your data</a>. We do not sell or share personal information, as the CCPA defines those terms, and we don't use sensitive personal information to infer anything about you. To delete your data, delete your account in Settings. For your other rights, email {MAIL}; an authorized agent can ask on your behalf with your written permission. We'll respond within 45 days.</p>
<p>Slop Mop is for people 18 and over. We don't knowingly collect data from children.</p>"""))
    S.append(("contact", "Contact", f"""
<p>Questions, corrections, or a request about your data: {MAIL}. By post: Artimovo LLC, 1522 Western Ave STE 79205, Seattle, WA 98101, USA.</p>"""))

    body = "\n".join(P.sec(i, f"<h2>{h}</h2>\n{x.strip()}") for i, h, x in S)
    toc = [(i, h) for i, h, _ in S]
    desc = "How Slop Mop and Artimovo LLC handle your data: what the extension and the email add-ons send, what is stored, your account, anonymous votes, payments through Polar, Google Analytics, providers, retention, deleting your account and your rights."
    lede = "Slop Mop is a browser extension and email add-on from Artimovo LLC. It reads the posts and emails you choose to have checked, sends the text out to be judged, and keeps as little as it can afterwards. Your account holds your email address, your plan and your settings. Your votes are kept apart from it, in a form that can't be traced back to you. This site uses Google Analytics, and Slop Mop XL is billed through Polar. This page says exactly what all of that means, how to delete your account, and what rights you have."
    glance = [("sent", "Text and public counts", "never your name, never the author's"),
              ("email", "Redacted in your mailbox", "before anything is sent"),
              ("votes", "Can't be traced to you", "kept apart from your account"),
              ("delete", "Settings → Delete account", "any time, straight away")]
    h = head("Privacy policy — Slop Mop", desc, "privacy.html", ld=P.webpage_ld("privacy.html", "Privacy policy — Slop Mop", desc))
    main = P.page_head("privacy", "Privacy policy", lede, UPDATED, visual=P.PRIVACY_VISUAL, glance=glance) + P.toc_page(toc, body)
    write("privacy.html", page_shell(h, "privacy.html", main, islands=False))


if __name__ == "__main__":
    privacy()
