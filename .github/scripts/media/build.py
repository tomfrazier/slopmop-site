#!/usr/bin/env python3
"""Build the press page at /media and its assets.

Writes media.html (served at /media), its share image media.png (1200x630), and
the downloadable brand assets under press/ (wordmarks, mark, app icon, press-kit
zip). The page copy, the FAQ and the JSON-LD all come from this file, so the FAQ
in the page and the FAQPage markup can't drift apart.

  python3 .github/scripts/media/build.py

The header, footer and analytics head are lifted from about.html. The images need
`pip install cairosvg` and the Archivo and JetBrains Mono fonts installed locally; the
press kit's document needs beautifulsoup4, python-docx, pandoc and LibreOffice (see press_doc.py).
"""
import html
import json
import os
import shutil
import sys
import tempfile
import zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import press_doc  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SITE = "https://slopmop.lol"
URL = SITE + "/media"
IMG = SITE + "/media.png"
UPDATED = "2026-10-27"
UPDATED_LONG = "27 October 2026"
e = html.escape

# ---------- facts ----------

TOM = {
    "url": "https://tomfrazier.com",
    "linkedin": "https://www.linkedin.com/in/tomfrazier",
    "x": "https://x.com/tomfrazier",
    "contact": "https://www.tomfrazier.com/contact/",
    "kit": "https://www.tomfrazier.com/media-kit/",
    "headshots_zip": "https://www.tomfrazier.com/content/files/2026/05/Tom-Frazier-Profile-Images.zip",
    "book": "https://theideachoseyou.com",
}
ARTIMOVO = {
    "url": "https://www.artimovo.com/",
    "ventures": "https://www.artimovo.com/ventures/",
    "slopmop": "https://www.artimovo.com/ventures/slop-mop/",
    "clarity": "https://www.artimovo.com/agency/clarity/",
}
STORE = "https://chromewebstore.google.com/detail/slop-mop/bhndmmjpeedeamimjijhagjgcibkdlho"
REGISTER = "https://www.theregister.com/ai-and-ml/2026/09/23/mop-the-slop-from-your-linkedin-feed-with-a-new-open-source-chrome-extension/5298679"
HN = "https://news.ycombinator.com/item?id=49819820"
PH = "https://www.producthunt.com/products/slop-mop"
PRESS_EMAIL = "hello@slopmop.lol"

DESCRIPTION = ("Press kit for Slop Mop, the browser extension that folds away slop so you read only the posts worth your time. "
               "What it is, how it works, the State of Slop numbers, quotes, founder bio, boilerplate and logos.")

BOILERPLATE = ("Slop Mop is a browser extension that reads your feed ahead of you, folds away low-value writing and shows why, "
               "so you read only the posts worth your time. It is a bad-writing detector, not an AI detector: it judges the content, "
               "never the person who wrote it or the person reading it, and readers can overrule any verdict. Slop Mop is live on "
               "LinkedIn in Chrome and other Chromium browsers, free for one feed, and publishes State of Slop, a monthly report on "
               "how much of what people scroll past is slop. Slop Mop is a venture of Artimovo, the venture studio advancing human "
               "agency in the age of AI. Learn more at slopmop.lol.")
BOILERPLATE_SHORT = ("Slop Mop is a browser extension from Artimovo that folds away the slop in your feed, so you read only the posts worth your time.")

BIO_SHORT = ("Tom Frazier is the founder of Artimovo, the venture studio behind Slop Mop, and the author of The Idea Chose You: "
             "The Operator's Playbook for Founders in the AI Age (2026). He has spent 25 years building technology companies across "
             "the US, Australia and Asia, and is among the earliest hands-on operators of agentic AI platforms.")
BIO_LONG = [
    "Tom Frazier is the founder of Artimovo, the venture studio behind Slop Mop. He built Slop Mop in September 2026 to test a new kind "
    "of AI model, one that makes calibrated decisions instead of writing text, on the problem he ran into every day: feeds full of hooks, "
    "bait and filler. It launched on Product Hunt on 24 September 2026.",
    "He has spent 25 years building and scaling technology companies across the US, Australia and Asia. He was Regional Director of Cloud "
    "Computing & Security for Verizon's Asia-Pacific business, consulted on cybersecurity for the US federal government, and is a named "
    "inventor on cloud-computing patents. He ran a startup incubator that produced 50+ companies and managed Redivider, a private-equity "
    "fund focused on Bitcoin and AI infrastructure.",
    "Tom is the author of The Idea Chose You: The Operator's Playbook for Founders in the AI Age (September 2026), which argues that AI has "
    "made building cheap and the old startup playbook obsolete. His work has been featured in the Wall Street Journal, and he has spoken at "
    "DCD, the Pacific Telecommunications Council, Frost & Sullivan and Smart Cities Connect, and is a regular featured guest on podcasts. "
    "He writes at tomfrazier.com.",
]
TOPICS = [
    ("Slop and what it costs readers", "Why feeds fill up with writing nobody needed, and what one in five posts being slop means for anyone who reads for work."),
    ("Judge the writing, not the writer", "AI writing can be good and human writing can be bad. Why asking who wrote it is a dead end, and what to ask instead."),
    ("AI that knows how sure it is", "Building on models that make calibrated decisions, and designing products that admit when they might be wrong."),
    ("Founding in the AI age", "From The Idea Chose You: proof of demand over the MVP, and the 22 decisions founders face in order."),
]

QUOTES = [
    ("Slop is writing that takes your attention and gives nothing back. A person can write it, a model can write it, and your feed doesn't care which. Slop Mop doesn't either.", "what slop is"),
    ("I built Slop Mop because my feed had turned into something I scrolled past instead of read. Now it reads ahead for me, shows its working, and lets me overrule it when it's wrong.", "why it exists"),
    ("One post in five. That's how much of what reached people's LinkedIn feeds in October was slop, and that's after LinkedIn's own filtering had a go at it.", "the October numbers"),
    ("AI writing can be good. Human writing can be bad. So Slop Mop asks one question of every post: was this worth your time?", "AI and authorship"),
    ("Empty praise was the biggest sign of slop on LinkedIn in October. Game-changer, incredible, so proud, and not a word about what or why.", "the most common sign"),
    ("Slop Mop will be wrong sometimes. It's probabilistic, so every reader gets a vote, and the vote wins in their own feed.", "accuracy and control"),
    ("Slop Mop judges the post, never the person. Nobody gets reported, muted or shamed. You just get your attention back.", "fairness"),
    ("Artimovo builds for human agency, and clarity is one of its three pillars. Slop Mop is the most direct way I know to give some back: less noise, better judgment.", "Artimovo"),
]

STATS = [
    ("124M", "tokens of LinkedIn posts read", "27 Sep to 27 Oct 2026, roughly 93 million words"),
    ("1 in 5", "LinkedIn posts was slop", "after LinkedIn's own filtering: 13% possibly slop, 6% likely slop"),
    ("34%", "of posts had Empty praise as their strongest sign", "“Not X, but Y” came second at 31%"),
    ("11pm", "Pacific was the sloppiest hour", "24% slop at 11pm, against 15% at 3pm, the cleanest hour"),
]

ASSETS = [
    ("press/slop-mop-wordmark-light.svg", "press/slop-mop-wordmark-light.png", "Wordmark, for light backgrounds", "Mark and name in ink. SVG and PNG, transparent.", "light"),
    ("press/slop-mop-wordmark-dark.svg", "press/slop-mop-wordmark-dark.png", "Wordmark, for dark backgrounds", "Mop Yellow mark, white name. SVG and PNG, transparent.", "dark"),
    ("press/slop-mop-mark.svg", "press/slop-mop-mark.png", "The mop mark", "The mark on its own, in ink. SVG and 1024px PNG.", "mark"),
    (None, "icon-512.png", "App icon", "The mark on its dark tile, as it appears in the browser. 512px PNG.", "icon"),
    (None, "og-image-4.png", "Share card", "Slop Mop's own social card. 1200x630 PNG.", "og"),
    (None, "reports/state-of-slop-october-2026.png", "State of Slop, October 2026", "The report's headline graphic. 1200x630 PNG.", "sos"),
]

FAQ = [
    ("About Slop Mop", [
        ("What is Slop Mop?",
         ["Slop Mop is a browser extension that reads the posts in your feed before you reach them, judges the writing and folds away what reads like slop, so you read only the posts worth your time. Nothing is deleted: a folded post reopens with one click, and every verdict shows the signs behind it. It works on LinkedIn today, in desktop Chrome and other Chromium browsers."]),
        ("Is Slop Mop an AI detector?",
         ["No. Slop Mop is a bad-writing detector, which makes it a superset of AI slop detection rather than an AI detector. AI writing can be good and human writing can be bad, so a post is never folded just because it reads as AI-written. Slop Mop asks whether a post is worth your attention."]),
        ("How does Slop Mop decide what is slop?",
         ["Slop Mop makes calibrated decisions on nine signs of slop: Scroll-stopper, Engagement bait, Hype words, Empty praise, No-catch promises, “Not X, but Y”, Flowery prose, Stiff phrasing and Too-tidy story. It weighs them against three counter-signals: whether a post sounds like a person, whether it is useful to readers, and how readers responded. Each post gets a score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure."]),
        ("Can Slop Mop be wrong?",
         ["Yes. The method is probabilistic, so some verdicts will be wrong, and Slop Mop leaves a post alone when it isn't sure. That's why every reader can vote Not sure, No, Maybe or Probably on any post. A vote overrides Slop Mop in that reader's own feed."]),
        ("Does Slop Mop judge the person who wrote a post?",
         ["No. Slop Mop judges the content only. It never scores the person who wrote a post or the person reading it, and it never reports, mutes, blocks or deletes anything. It only changes what you see in your own browser."]),
        ("Is Slop Mop free?",
         ["Yes. Slop Mop is free for one feed, with 250 checks a day. Slop Mop XL, coming soon, covers every feed, the sites you read and your inbox, for US$5.99 a month or US$59.99 a year."]),
        ("Which sites and browsers does Slop Mop work on?",
         ["LinkedIn is live today, on desktop Chrome and other Chromium browsers such as Brave, Opera and Comet. X, Reddit, Facebook, Substack, Medium, websites and email (Gmail and Outlook) are coming soon, as are Microsoft Edge, Safari and Firefox."]),
        ("What happens to the posts Slop Mop reads?",
         ["Your name and the author's name are never sent. Post text is scored, not kept: the server stores a one-way hash of the text and the scores. The one exception is a post you vote against, whose text is kept so the miss can be reviewed."]),
    ]),
    ("About the company", [
        ("Who makes Slop Mop?",
         ["Slop Mop is made by Artimovo LLC, a venture studio founded by Tom Frazier. Artimovo identifies opportunities, develops products, launches brands and builds businesses."]),
        ("How is Slop Mop related to Artimovo?",
         ["Slop Mop is an Artimovo venture. Artimovo is a venture studio, and each of its ventures addresses a need tied to one of three dimensions of human agency: judgment, clarity and autonomy. Slop Mop sits under the Clarity pillar, which asks “Can I understand what's happening?” AI has raised the volume of content online, and more information doesn't make more understanding on its own. Slop Mop helps people spend less attention on noise and more on what matters. Artimovo's ventures page lists Slop Mop and how it fits: https://www.artimovo.com/ventures/"]),
        ("Who is Tom Frazier?",
         ["Tom Frazier is the founder of Artimovo and Slop Mop and the author of The Idea Chose You: The Operator's Playbook for Founders in the AI Age (2026). He has spent 25 years building technology companies across the US, Australia and Asia, including as Regional Director of Cloud Computing & Security for Verizon's Asia-Pacific business."]),
        ("When did Slop Mop launch?",
         ["Slop Mop started in September 2026. It was covered by The Register and discussed on Hacker News on 23 September 2026, and launched on Product Hunt on 24 September 2026."]),
    ]),
    ("For the press", [
        ("Can I use the logos, images and quotes on this page?",
         ["Yes, for editorial coverage of Slop Mop. Use the files as they are: don't rotate, recolor or outline the mop. Write the name as Slop Mop, two words. Credit Tom Frazier's headshots “Courtesy of Tom Frazier.”"]),
        ("Can I cite the State of Slop numbers?",
         ["Yes. Cite “State of Slop, October 2026, Slop Mop” and link to https://slopmop.lol/reports/state-of-slop-october-2026. A new report covers each calendar month and publishes on the first business day of the next. For questions about the data, email hello@slopmop.lol."]),
        ("How do I interview Tom Frazier or book him to speak?",
         ["Email hello@slopmop.lol, or use the contact page on tomfrazier.com. Tom is available for interviews, TV, podcasts, expert commentary and speaking on slop, judging writing instead of writers, AI that makes calibrated decisions, and founding companies in the age of AI."]),
    ]),
]


# ---------- the page ----------

def chrome():
    src = open(os.path.join(ROOT, "about.html"), encoding="utf-8").read()
    head = src[src.index("<head>") + len("<head>"):src.index("<title>")]
    header = src[src.index('<a class="skip"'):src.index("<main")]
    footer = src[src.index('<footer class="footer"'):src.index("</footer>") + len("</footer>")]
    scripts = src[src.index("</footer>") + len("</footer>"):src.index("</body>")]
    return head, header, footer, scripts


def jsonld():
    faq = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": " ".join(a)}}
           for _, qs in FAQ for q, a in qs]
    graph = [
        {"@type": "WebPage", "@id": URL + "#webpage", "url": URL, "name": "Slop Mop media kit",
         "description": DESCRIPTION, "inLanguage": "en", "isPartOf": {"@id": SITE + "/#website"},
         "about": [{"@id": SITE + "/#app"}, {"@id": SITE + "/#slopmop"}],
         "mainEntity": {"@id": SITE + "/#slopmop"},
         "primaryImageOfPage": {"@type": "ImageObject", "@id": IMG + "#image", "url": IMG, "width": 1200, "height": 630,
                                "caption": "Slop Mop media kit. Read only the posts worth your time."},
         "breadcrumb": {"@id": URL + "#breadcrumb"}, "datePublished": UPDATED, "dateModified": UPDATED},
        {"@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "Slop Mop", "publisher": {"@id": SITE + "/#org"}},
        {"@type": "Organization", "@id": SITE + "/#org", "name": "Artimovo LLC", "alternateName": "Artimovo",
         "url": ARTIMOVO["url"], "slogan": "Advancing human agency in the age of AI.",
         "description": "A venture studio that identifies opportunities, develops products, launches brands and builds businesses, each tied to one of three dimensions of human agency: judgment, clarity and autonomy.",
         "founder": {"@id": SITE + "/#tom"}, "brand": {"@type": "Brand", "@id": SITE + "/#brand", "name": "Slop Mop", "logo": SITE + "/icon-512.png"},
         "subOrganization": {"@id": SITE + "/#slopmop"}, "sameAs": [ARTIMOVO["ventures"]]},
        {"@type": "Organization", "@id": SITE + "/#slopmop", "name": "Slop Mop", "url": SITE + "/",
         "description": "Slop Mop, an Artimovo venture in the Clarity pillar, helps people recognize low-value content so they can spend less attention on noise and more on what matters.",
         "slogan": "Less slop. More control. Your call.",
         "logo": {"@type": "ImageObject", "url": SITE + "/icon-512.png", "width": 512, "height": 512},
         "parentOrganization": {"@id": SITE + "/#org"}, "founder": {"@id": SITE + "/#tom"}, "foundingDate": "2026-09",
         "email": PRESS_EMAIL,
         "contactPoint": {"@type": "ContactPoint", "contactType": "media relations", "email": PRESS_EMAIL, "url": URL},
         "sameAs": [ARTIMOVO["slopmop"], PH, STORE]},
        {"@type": "SoftwareApplication", "@id": SITE + "/#app", "name": "Slop Mop",
         "applicationCategory": "BrowserApplication", "operatingSystem": "Chrome, Chromium browsers", "url": SITE + "/",
         "installUrl": STORE, "image": IMG,
         "description": "A browser extension that reads your feed ahead of you and folds away low-value writing, with its reasoning shown. A bad-writing detector, not an AI detector.",
         "publisher": {"@id": SITE + "/#org"}, "creator": {"@id": SITE + "/#tom"}, "brand": {"@id": SITE + "/#brand"},
         "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free for one feed, 250 checks a day."}},
        {"@type": "Person", "@id": SITE + "/#tom", "name": "Tom Frazier", "url": TOM["url"],
         "image": SITE + "/assets/img/tom.webp",
         "jobTitle": "Founder", "worksFor": {"@id": SITE + "/#org"}, "description": BIO_SHORT,
         "knowsAbout": ["Slop", "AI writing", "Calibrated AI decisions", "Agentic AI", "Startups", "Cloud computing"],
         "sameAs": [TOM["linkedin"], TOM["x"], TOM["kit"]]},
        {"@type": "Book", "@id": TOM["book"] + "/#book", "name": "The Idea Chose You: The Operator's Playbook for Founders in the AI Age",
         "url": TOM["book"], "datePublished": "2026-09-08", "author": {"@id": SITE + "/#tom"}},
        {"@type": "BreadcrumbList", "@id": URL + "#breadcrumb", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Slop Mop", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Media", "item": URL}]},
        {"@type": "FAQPage", "@id": URL + "#faq", "url": URL + "#faq", "isPartOf": {"@id": URL + "#webpage"}, "mainEntity": faq},
    ]
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, indent=1, ensure_ascii=False)


def link_answer(text):
    """Turn bare URLs in an FAQ answer into links on the page."""
    out = e(text)
    for u in ("https://www.artimovo.com/ventures/", "https://slopmop.lol/reports/state-of-slop-october-2026"):
        out = out.replace(e(u), '<a href="%s">%s</a>' % (u, e(u.replace("https://", ""))))
    out = out.replace("hello@slopmop.lol", '<a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a>')
    out = out.replace("the contact page on tomfrazier.com", '<a href="%s" target="_blank" rel="noopener">the contact page on tomfrazier.com</a>' % TOM["contact"])
    return out


DL = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>')
COPY = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>')
MAIL = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>')


def copy_btn(target):
    return '<button type="button" class="btn btn-secondary btn-sm mk-copy" data-copy="%s">%sCopy</button>' % (target, COPY)


def page(head, header, footer, scripts):
    title = "Slop Mop media kit: facts, numbers, quotes and logos"
    alt = "Slop Mop media kit. Read only the posts worth your time. A bad-writing detector from Artimovo, live on LinkedIn, 124M tokens read in October 2026."
    meta = "\n".join([
        "<title>%s</title>" % e(title),
        '<meta name="description" content="%s">' % e(DESCRIPTION),
        '<link rel="canonical" href="%s">' % URL,
        '<meta name="robots" content="index, follow, max-image-preview:large">',
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="Slop Mop">',
        '<meta property="og:url" content="%s">' % URL,
        '<meta property="og:title" content="Slop Mop media kit">',
        '<meta property="og:description" content="%s">' % e(DESCRIPTION),
        '<meta property="og:image" content="%s">' % IMG,
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:image:type" content="image/png">',
        '<meta property="og:image:alt" content="%s">' % e(alt),
        '<meta property="og:locale" content="en_US">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:title" content="Slop Mop media kit">',
        '<meta name="twitter:description" content="%s">' % e(DESCRIPTION),
        '<meta name="twitter:image" content="%s">' % IMG,
        '<meta name="twitter:image:alt" content="%s">' % e(alt),
        '<meta name="author" content="Tom Frazier">',
        '<link rel="alternate" type="text/markdown" href="ask-ai.md" title="Slop Mop in brief, for AI assistants">',
        '<link rel="icon" href="favicon.svg" type="image/svg+xml">',
        '<link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">',
        '<link rel="apple-touch-icon" href="apple-touch-icon.png">',
        '<link rel="manifest" href="site.webmanifest">',
        '<meta name="theme-color" content="#16181A">',
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link rel="stylesheet" href="_ds/slopmop/styles.css">',
        '<link rel="stylesheet" href="assets/site.css">',
        '<link rel="stylesheet" href="assets/state-of-slop.css">',
        '<link rel="stylesheet" href="assets/media.css">',
        '<script type="application/ld+json">\n%s\n</script>' % jsonld(),
    ])

    toc = [("glance", "At a glance"), ("what", "What it is"), ("how", "How it works"), ("who", "Who it's for"),
           ("why", "Why now"), ("numbers", "The numbers"), ("quotes", "Quotes"), ("founder", "The founder"),
           ("artimovo", "Artimovo"), ("boilerplate", "Boilerplate"), ("assets", "Logos and images"),
           ("coverage", "Coverage"), ("contact", "Press contact"), ("faq", "Questions and answers")]

    glance = [
        ("What it is", "A browser extension that reads your feed ahead of you, folds away the slop and shows why."),
        ("Category", "Feed-filtering browser extension. A bad-writing detector, not an AI detector."),
        ("Made by", 'Artimovo LLC, a venture studio. Slop Mop is its venture in the <a href="%s" target="_blank" rel="noopener">Clarity pillar</a>.' % ARTIMOVO["clarity"]),
        ("Founder", 'Tom Frazier, author of <a href="%s" target="_blank" rel="noopener"><em>The Idea Chose You</em></a>' % TOM["book"]),
        ("Started", "September 2026. Launched on Product Hunt on 24 September 2026."),
        ("Live on", 'LinkedIn <span class="badge badge-live">live</span> · X, Reddit, Facebook, Substack, Medium, websites, Gmail and Outlook <span class="badge badge-soon">coming soon</span>'),
        ("Works in", "Desktop Chrome and Chromium browsers such as Brave, Opera and Comet. Edge, Safari and Firefox coming soon."),
        ("Price", "Free for one feed, 250 checks a day. Slop Mop XL, coming soon: US$5.99 a month or US$59.99 a year."),
        ("Scale", "124 million tokens of LinkedIn posts read from 27 September to 27 October 2026."),
        ("Website", '<a href="https://slopmop.lol">slopmop.lol</a>'),
        ("Press contact", '<a href="mailto:%s">%s</a>' % (PRESS_EMAIL, PRESS_EMAIL)),
    ]
    kv = "".join('<div><span class="k">%s</span><span class="v">%s</span></div>' % (e(k), v) for k, v in glance)

    stats = "".join('<div class="sos-stat"><span class="mono">%s</span><b>%s</b><small>%s</small></div>' % (e(lbl), e(big), e(sub))
                    for big, lbl, sub in STATS)

    quotes = "".join(
        '<figure class="mk-quote" id="quote-%d"><blockquote><p>%s</p></blockquote>'
        '<figcaption><span class="mk-who"><b>Tom Frazier</b><span>Founder, Slop Mop and Artimovo</span></span>'
        '<span class="mono">on %s</span>%s</figcaption></figure>'
        % (i, e(q), e(topic), copy_btn("quote-%d" % i)) for i, (q, topic) in enumerate(QUOTES, 1))

    topics = "".join("<li><strong>%s.</strong> %s</li>" % (e(t), e(d)) for t, d in TOPICS)

    assets = []
    for svg, png, name, desc, kind in ASSETS:
        links = []
        if svg:
            links.append('<a class="btn btn-secondary btn-sm" href="%s" download>%sSVG</a>' % (svg, DL))
        links.append('<a class="btn btn-secondary btn-sm" href="%s" download>%sPNG</a>' % (png, DL))
        assets.append('<div class="mk-asset"><div class="mk-asset-stage mk-%s"><img src="%s" alt="" loading="lazy"></div>'
                      '<div class="mk-asset-text"><b>%s</b><span>%s</span><div class="mk-asset-dl">%s</div></div></div>'
                      % (kind, svg or png, e(name), e(desc), "".join(links)))
    assets = "".join(assets)

    faq_html = "".join(
        '<h3>%s</h3><div class="faq">%s</div>' % (e(group), "".join(
            '<details><summary>%s</summary><div class="a">%s</div></details>' % (e(q), "".join("<p>%s</p>" % link_answer(p) for p in a))
            for q, a in qs)) for group, qs in FAQ)

    body = """<main id="main">
<section class="page-head ph-dark" data-theme="dark">
  <div class="wrap ph-grid">
    <div class="ph-copy">
      <span class="eyebrow">media kit</span>
      <h1 class="h-1">Read only the posts worth your time</h1>
      <p class="lede">Slop Mop reads your feed ahead of you and folds away the slop. This page has what reporters, producers and event organisers ask for: the facts, the numbers, quotes you can use, the founder's bio and the logos.</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="press/slop-mop-press-kit.zip" download>{dl}Download the press kit</a>
        <a class="btn btn-secondary" href="mailto:{email}">{mail}{email}</a>
      </div>
    </div>
    <div class="ph-visual"><div class="promise mk-short"><span class="mono">the short version</span><p>A bad-writing detector for your feed.</p><p>It judges the post, never the person.</p><p>It shows its working, and you can overrule it.</p><p class="last">Live on LinkedIn. Free for one feed.</p></div></div>
  </div>
</section>
<div class="page-body">
  <div class="wrap page-grid">
    <nav class="toc" aria-label="On this page">
      <b>on this page</b>
      {toc}
    </nav>
    <div class="prose">
<section id="glance">
<h2>At a glance</h2>
<div class="kv">{kv}</div>
</section>
<section id="what">
<h2>What Slop Mop is</h2>
<p>Slop Mop is a browser extension that reads the posts in your feed before you reach them and judges the writing. Posts that read like slop fold into a one-line strip you can reopen with a click, or stay in place with their mop icon tinted, depending on the mode you pick. Every verdict shows the signs behind it.</p>
<p>Slop is writing that takes your attention and gives little back: the post that praises without saying what was good, the hook with nothing behind it, the request to comment “YES” to get a framework. A person or an AI can write it. Slop Mop is a bad-writing detector, so it catches AI slop as part of catching all slop. AI writing can be good and human writing can be bad, and Slop Mop judges the content, never the person who wrote it or the person reading it.</p>
<p>Nothing is deleted, reported, muted or blocked. Slop Mop only changes what you see in your own browser.</p>
<div class="callout"><p style="margin:0;font:var(--weight-semibold) var(--text-lg)/1.4 var(--font-display);color:var(--text-body)">Slop Mop mops the slop out of your feed, so you read only the posts worth your time.</p></div>
</section>
<section id="how">
<h2>How it works</h2>
<ol class="steps">
<li><span><strong>It reads ahead.</strong> As you scroll, Slop Mop sends the text of each new post to its scoring service. Your name and the author's are never sent.</span></li>
<li><span><strong>It makes calibrated decisions.</strong> Each post is checked for nine signs of slop: Scroll-stopper, Engagement bait, Hype words, Empty praise, No-catch promises, “Not X, but Y”, Flowery prose, Stiff phrasing and Too-tidy story. They are weighed against three counter-signals: sounds like a person, useful to readers, and reader response.</span></li>
<li><span><strong>It scores the post.</strong> A score out of 100 and a verdict: Likely slop, Possibly slop, Looks fine or Not sure. When Slop Mop isn't sure, it leaves the post alone.</span></li>
<li><span><strong>It acts on your settings.</strong> Hide folds likely slop into a strip that one click reopens. Highlight hides nothing and tints the post's mop icon. Sensitivity is Mild, Moderate or Aggressive.</span></li>
<li><span><strong>It shows its working.</strong> Click the mop on any post to see the score, the strongest signs and the Slopprint, a chart of all nine signs.</span></li>
<li><span><strong>You get the last word.</strong> The method is probabilistic, so it will sometimes be wrong. Vote Not sure, No, Maybe or Probably on any post, and your vote overrides Slop Mop in your own feed.</span></li>
</ol>
<p>Post text is scored, not kept: the server stores a one-way hash of the text and the scores. The one exception is a post you vote against, whose text is kept so the miss can be reviewed. <a href="how-it-works.html">How it works, in detail</a>.</p>
</section>
<section id="who">
<h2>Who it's for</h2>
<ul>
<li>People who read a lot online and are tired of scrolling past hooks, bait and filler to find the posts worth reading.</li>
<li>LinkedIn users on desktop today, and readers of X, Reddit, Facebook, Substack, Medium, the open web and email as those arrive.</li>
<li>People who want a calmer feed without leaving the platform, muting people or blocking anyone.</li>
<li>Anyone who wants to see why something was filtered, and to overrule it.</li>
</ul>
</section>
<section id="why">
<h2>Why now</h2>
<p>Generative AI made plausible writing nearly free, and feeds reward volume. People post more to be seen, tools write it for them, and the posts worth your attention sit between the hooks and the bait. Content is cheap now. Attention is the scarce thing.</p>
<p>Two things made a fix practical in 2026. In September, Graphite published its “AI Tells” study of 100,000 articles, which found about 13,000 words and phrases that turn up at least twice as often in AI writing; six of Slop Mop's nine signs start there, and the other three are feed habits. And a new kind of AI model makes calibrated decisions: it answers a fixed question and says how sure it is. That is what lets Slop Mop judge every post as you scroll, and leave a post alone when the answer is shaky.</p>
<p>The first State of Slop report put a number on the problem: one LinkedIn post in five was slop, after LinkedIn's own filtering had done its work.</p>
</section>
<section id="numbers">
<h2>The numbers</h2>
<p>From <a href="reports/state-of-slop-october-2026">State of Slop, October 2026</a>, Slop Mop's monthly report on what people scroll past. All times are Pacific.</p>
<div class="sos-stats mk-stats">{stats}</div>
<p class="mk-foot">Slop Mop also estimates how likely each post is to be AI-written, and that reading never folds a post by itself. In October, 54% of posts read as AI-likely, and 72% of those were worth reading.</p>
<p>Cite as “State of Slop, October 2026, Slop Mop” with a link. A new report covers each calendar month and publishes on the first business day of the next. <a href="state-of-slop">The latest report</a> · <a href="reports/">All reports</a></p>
</section>
<section id="quotes">
<h2>Quotes you can use</h2>
<p>Attribute to Tom Frazier, founder of Slop Mop and Artimovo.</p>
<div class="mk-quotes">{quotes}</div>
</section>
<section id="founder">
<h2>About the founder</h2>
<div class="mk-founder">
  <div class="mk-headshot"><img src="assets/img/tom.webp" alt="Tom Frazier" width="128" height="128"></div>
  <div>
    <h3 style="margin-top:0">Tom Frazier</h3>
    <p class="mk-role">Founder of Artimovo and Slop Mop · author of <em>The Idea Chose You</em></p>
    <p id="bio-short">{bio_short}</p>
    <div class="mk-row">{copy_bio}<a class="btn btn-secondary btn-sm" href="{headshots}">{dl}Headshots (.zip)</a><a class="btn btn-secondary btn-sm" href="{kit}" target="_blank" rel="noopener">Tom's full media kit</a></div>
  </div>
</div>
<h3>Longer bio</h3>
<div id="bio-long">{bio_long}</div>
<div class="mk-row">{copy_long}</div>
<p class="mk-foot">Headshots are approved for editorial use. Credit “Courtesy of Tom Frazier.”</p>
<h3>Tom talks about</h3>
<ul>{topics}</ul>
<p>He has spoken at DCD, the Pacific Telecommunications Council, Frost &amp; Sullivan, Smart Cities Connect, Infra/STRUCTURE and e27, and is a regular featured guest on podcasts, with dozens of appearances. For interviews, TV, podcasts and speaking, email <a href="mailto:{email}">{email}</a> or use <a href="{contact}" target="_blank" rel="noopener">tomfrazier.com/contact</a>.</p>
<div class="kv"><div><span class="k">Website</span><span class="v"><a href="{tom}" target="_blank" rel="noopener">tomfrazier.com</a></span></div><div><span class="k">LinkedIn</span><span class="v"><a href="{li}" target="_blank" rel="noopener">linkedin.com/in/tomfrazier</a></span></div><div><span class="k">X</span><span class="v"><a href="{x}" target="_blank" rel="noopener">@tomfrazier</a></span></div><div><span class="k">Book</span><span class="v"><a href="{book}" target="_blank" rel="noopener"><em>The Idea Chose You: The Operator's Playbook for Founders in the AI Age</em></a> (8 September 2026)</span></div></div>
</section>
<section id="artimovo">
<h2>About Artimovo</h2>
<p>Artimovo is a venture studio. It identifies opportunities, develops products, launches brands and builds businesses, and each venture addresses a need tied to one of three dimensions of human agency: judgment, clarity and autonomy. Its line is “Advancing human agency in the age of AI.”</p>
<p>Slop Mop is Artimovo's venture in the <strong>Clarity</strong> pillar, which asks a plain question: can I understand what's happening? AI has raised the volume of content online, and more information doesn't make more understanding on its own. Slop Mop helps people spend less attention on noise and more on what matters, and it supports the reader's judgment instead of replacing it.</p>
<div class="kv"><div><span class="k">Company</span><span class="v">Artimovo LLC, a Delaware company</span></div><div><span class="k">What it is</span><span class="v">A venture studio</span></div><div><span class="k">Pillars</span><span class="v">Judgment · Clarity · Autonomy</span></div><div><span class="k">Slop Mop's pillar</span><span class="v">Clarity</span></div><div><span class="k">More</span><span class="v"><a href="{ventures}" target="_blank" rel="noopener">Artimovo ventures</a> · <a href="{am_slopmop}" target="_blank" rel="noopener">Slop Mop at Artimovo</a></span></div></div>
</section>
<section id="boilerplate">
<h2>Boilerplate</h2>
<h3 style="margin-top:0">About Slop Mop</h3>
<p id="boilerplate-long">{boilerplate}</p>
<div class="mk-row">{copy_bp}</div>
<h3>In one sentence</h3>
<p id="boilerplate-short">{boilerplate_short}</p>
<div class="mk-row">{copy_bps}</div>
</section>
<section id="assets">
<h2>Logos and images</h2>
<p>Use them as they are: don't rotate, recolor or outline the mop. Write the name as Slop Mop, two words. The <a href="press/slop-mop-press-kit.zip" download>press kit zip</a> has everything below, plus this whole page as a PDF, Word and plain-text document.</p>
<div class="mk-video"><div class="mk-video-stage"><video src="slopmop-video.mp4" poster="assets/video/tour-poster.jpg" playsinline preload="metadata" width="1920" height="1080" controlslist="noplaybackrate" disablepictureinpicture aria-label="Slop Mop product video, 50 seconds, with sound"></video><button class="mk-video-play" type="button" aria-label="Play the video"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z"/></svg></button></div><div class="mk-asset-text"><b>Product video</b><span>Fifty seconds on what Slop Mop does in a LinkedIn feed, with sound. 1080p MP4, 16 MB.</span><div class="mk-asset-dl"><a class="btn btn-secondary btn-sm" href="slopmop-video.mp4" download>{dl}MP4</a></div></div></div>
<div class="mk-assets">{assets}</div>
<div class="mk-row" style="margin-top:var(--space-7)"><a class="btn btn-primary btn-sm" href="press/slop-mop-press-kit.zip" download>{dl}Download everything (.zip, 16 MB)</a></div>
</section>
<section id="coverage">
<h2>Coverage so far</h2>
<ul>
<li><a href="{register}" target="_blank" rel="noopener">The Register: “Mop the slop from your LinkedIn feed with a new open source Chrome extension”</a> (23 September 2026)</li>
<li><a href="{hn}" target="_blank" rel="noopener">Hacker News discussion</a> (23 September 2026)</li>
<li><a href="{ph}" target="_blank" rel="noopener">Product Hunt launch</a> (24 September 2026)</li>
</ul>
</section>
<section id="contact">
<h2>Press contact</h2>
<p>For interviews, TV and podcast bookings, speaking and data requests, email <a href="mailto:{email}">{email}</a>.</p>
<p>To try Slop Mop, <a href="{store}" data-add>add it to your browser</a>. It's free for one feed.</p>
</section>
<section id="faq">
<h2>Questions and answers</h2>
{faq}
</section>
    </div>
  </div>
</div>
</main>
""".format(
        dl=DL, mail=MAIL, email=PRESS_EMAIL,
        toc="\n      ".join('<a href="#%s">%s</a>' % (i, e(n)) for i, n in toc),
        kv=kv, stats=stats, quotes=quotes, topics=topics,
        bio_short=e(BIO_SHORT), bio_long="".join("<p>%s</p>" % e(p) for p in BIO_LONG),
        copy_bio=copy_btn("bio-short"), copy_long=copy_btn("bio-long"),
        headshots=TOM["headshots_zip"], kit=TOM["kit"], contact=TOM["contact"], tom=TOM["url"], li=TOM["linkedin"],
        x=TOM["x"], book=TOM["book"], ventures=ARTIMOVO["ventures"], am_slopmop=ARTIMOVO["slopmop"],
        boilerplate=e(BOILERPLATE), boilerplate_short=e(BOILERPLATE_SHORT),
        copy_bp=copy_btn("boilerplate-long"), copy_bps=copy_btn("boilerplate-short"),
        assets=assets, register=REGISTER, hn=HN, ph=PH, store=STORE, faq=faq_html)

    scripts = scripts.rstrip() + '\n<script src="assets/media.js"></script>\n'
    return ('<!DOCTYPE html>\n<html lang="en">\n<head>' + head + meta + "\n</head>\n<body>\n" + header + body + footer
            + scripts + "</body>\n</html>\n")


# ---------- images ----------

INK, MOPY, PAPER, WHITE = "#16181A", "#F5B400", "#F7F8F9", "#FFFFFF"


def mop(x, y, k, c, _id=None):
    """The mop mark at 24-unit scale. The bristles are cut out of the head (even-odd),
    not painted in a background colour, so the mark works on any background."""
    slots = "".join("M%.3f 16.6v4.6a.575 .575 0 0 0 1.15 0v-4.6a.575 .575 0 0 0 -1.15 0z" % (bx - .575) for bx in (8.6, 12, 15.4))
    return ('<g transform="translate({x} {y}) scale({k})"><rect x="10.6" y="2" width="2.8" height="12" rx="1.4" fill="{c}"/>'
            '<path d="M5.2 13.6h13.6l-1.6 8.2H6.8z{s}" fill="{c}" fill-rule="evenodd"/></g>').format(x=x, y=y, k=k, c=c, s=slots)


def wordmark_svg(mark, text):
    # Lockup per the design system: mark + "Slop Mop" in Archivo semibold.
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="560" height="140" viewBox="0 0 560 140">'
            + mop(20, 16, 4.4, mark, "m") +
            '<text x="138" y="96" font-family="Archivo" font-weight="600" font-size="72" letter-spacing="-0.7" fill="%s">Slop Mop</text></svg>' % text)


def mark_svg(c):
    return '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">' + mop(0, 0, 10, c, "m") + "</svg>"


def share_svg():
    out = ['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">',
           '<rect width="1200" height="630" fill="%s"/>' % PAPER, '<rect width="1200" height="8" fill="%s"/>' % MOPY,
           '<text x="64" y="72" font-family="JetBrains Mono" font-size="19" fill="#6E757D">media kit · facts, numbers, quotes and logos</text>',
           '<text x="60" y="162" font-family="Archivo" font-weight="700" font-size="68" letter-spacing="-1.4" fill="%s">Read only the posts</text>' % INK,
           '<text x="60" y="240" font-family="Archivo" font-weight="700" font-size="68" letter-spacing="-1.4" fill="%s">worth your time.</text>' % INK]
    # a feed with one post folded, as the reader sees it
    cw, gap, y0, ch = 100, 14, 300, 116
    for i in range(6):
        x = 64 + i * (cw + gap)
        if i == 3:
            out.append('<rect x="%d" y="%d" width="%d" height="%d" rx="10" fill="#FDF3D3" stroke="%s" stroke-width="2"/>' % (x, y0, cw, ch, MOPY))
            out.append('<rect x="%d" y="%d" width="56" height="22" rx="11" fill="%s"/>' % (x + 14, y0 + 16, MOPY))
            out.append('<text x="%d" y="%d" text-anchor="middle" font-family="JetBrains Mono" font-weight="500" font-size="13" fill="%s">slop</text>' % (x + 42, y0 + 32, INK))
            out.append('<text x="%d" y="%d" font-family="Archivo" font-weight="500" font-size="14" fill="#7A5A00">folded</text>' % (x + 14, y0 + 66))
            out.append('<path d="M%d %d h58" stroke="#E9C766" stroke-width="6" stroke-linecap="round"/>' % (x + 14, y0 + 88))
        else:
            out.append('<rect x="%d" y="%d" width="%d" height="%d" rx="10" fill="#FFFFFF" stroke="#E6E9EC" stroke-width="1.5"/>' % (x, y0, cw, ch))
            out.append('<circle cx="%d" cy="%d" r="9" fill="#E6E9EC"/>' % (x + 23, y0 + 26))
            out.append('<path d="M%d %d h34" stroke="#E6E9EC" stroke-width="6" stroke-linecap="round"/>' % (x + 40, y0 + 26))
            for j, ln in enumerate((72, 62, 44)):
                out.append('<path d="M%d %d h%d" stroke="#D5DADF" stroke-width="6" stroke-linecap="round"/>' % (x + 14, y0 + 56 + 17 * j, ln))
    out.append('<text x="64" y="476" font-family="Archivo" font-weight="500" font-size="24" fill="#565C63">A bad-writing detector for your feed, from Artimovo.</text>')
    # right: the short version
    out.append('<rect x="800" y="104" width="336" height="392" rx="16" fill="#FFFFFF" stroke="#E6E9EC"/>')
    out.append('<text x="828" y="144" font-family="JetBrains Mono" font-size="16" fill="#6E757D">the short version</text>')
    rows = [("Judges the post,", "never the person."), ("Shows its working.", "You can overrule it."), ("Live on LinkedIn.", "Free for one feed."), ("124M tokens read", "in October 2026.")]
    for i, (a, b) in enumerate(rows):
        y = 196 + i * 78
        out.append('<rect x="828" y="%d" width="4" height="52" rx="2" fill="%s"/>' % (y - 22, "#2F6FBF" if i < 3 else MOPY))
        out.append('<text x="846" y="%d" font-family="Archivo" font-weight="700" font-size="21" fill="%s">%s</text>' % (y, INK, html.escape(a)))
        out.append('<text x="846" y="%d" font-family="Archivo" font-size="21" fill="#3B4045">%s</text>' % (y + 26, html.escape(b)))
    out.append('<rect y="550" width="1200" height="80" fill="%s"/>' % INK)
    out.append(mop(58, 567, 1.9, MOPY, "f"))
    out.append('<text x="112" y="600" font-family="Archivo" font-weight="600" font-size="28" fill="#FFFFFF">Slop Mop<tspan font-family="JetBrains Mono" font-weight="400" font-size="20" fill="#B2B8BE"> .lol</tspan></text>')
    out.append('<text x="1136" y="598" text-anchor="end" font-family="JetBrains Mono" font-size="19" fill="#B2B8BE">slopmop.lol/media</text>')
    out.append("</svg>")
    return "\n".join(out)


def images():
    import cairosvg
    press = os.path.join(ROOT, "press")
    os.makedirs(press, exist_ok=True)

    def both(svg, name, width):
        # Outline the text so the SVG doesn't depend on the reader having Archivo.
        open(os.path.join(press, name + ".svg"), "wb").write(cairosvg.svg2svg(bytestring=svg.encode()))
        cairosvg.svg2png(bytestring=svg.encode(), write_to=os.path.join(press, name + ".png"), output_width=width)

    both(wordmark_svg(INK, INK), "slop-mop-wordmark-light", 1680)
    both(wordmark_svg(MOPY, WHITE), "slop-mop-wordmark-dark", 1680)
    both(mark_svg(INK), "slop-mop-mark", 1024)
    cairosvg.svg2png(bytestring=share_svg().encode(), write_to=os.path.join(ROOT, "media.png"), output_width=1200, output_height=630)

    kit = os.path.join(press, "slop-mop-press-kit.zip")
    with zipfile.ZipFile(kit, "w", zipfile.ZIP_DEFLATED) as z:
        for name in sorted(os.listdir(press)):
            if name.startswith("slop-mop-") and not name.endswith(".zip"):
                z.write(os.path.join(press, name), "slop-mop-press-kit/logos/" + name)
        z.write(os.path.join(ROOT, "icon-512.png"), "slop-mop-press-kit/logos/slop-mop-app-icon-512.png")
        z.write(os.path.join(ROOT, "og-image-4.png"), "slop-mop-press-kit/images/slop-mop-share-card.png")
        z.write(os.path.join(ROOT, "reports", "state-of-slop-october-2026.png"), "slop-mop-press-kit/images/state-of-slop-october-2026.png")
        z.write(os.path.join(ROOT, "media.png"), "slop-mop-press-kit/images/slop-mop-media-kit.png")
        z.write(os.path.join(ROOT, "slopmop-video.mp4"), "slop-mop-press-kit/video/slop-mop-product-video.mp4")
        # The kit's document is the page itself, as PDF, Word and plain text.
        with tempfile.TemporaryDirectory() as tmp:
            for path in press_doc.write(open(os.path.join(ROOT, "media.html"), encoding="utf-8").read(), tmp, UPDATED_LONG):
                z.write(path, "slop-mop-press-kit/" + os.path.basename(path))


def main(argv):
    head, header, footer, scripts = chrome()
    open(os.path.join(ROOT, "media.html"), "w", encoding="utf-8").write(page(head, header, footer, scripts))
    print("wrote media.html")
    if "--no-images" not in argv:
        images()
        print("wrote media.png and press/")


if __name__ == "__main__":
    main(sys.argv[1:])
