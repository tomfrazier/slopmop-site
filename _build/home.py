from common import *

NETS = [("linkedin", "LinkedIn", True, "linkedin", "#0A66C2"), ("x", "X", False, "x", "var(--text-body)"), ("reddit", "Reddit", False, "reddit", "#FF4500"),
        ("facebook", "Facebook", False, "facebook", "#0866FF"), ("substack", "Substack", False, "substack", "#FF6719"), ("medium", "Medium", False, "medium", "var(--text-body)"),
        ("email", "Email", False, "email", "#EA4335"), ("websites", "Websites", False, "web", "#2F6FBF")]

TELLS = [
    ("formulaicHook", "Scroll-stopper", "A dramatic one-line opener, a gap, then one-line paragraphs walking to a moral. Built to stop the thumb, not to say anything.", "I got rejected 47 times. / Then everything changed."),
    ("engagementBait", "Engagement bait", "Asks for the reaction instead of earning it: comment a keyword, repost to help your network, follow for part two.", "Comment “GUIDE” and I'll DM you the template."),
    ("hypeMarketing", "Hype words", "Marketing vocabulary standing in for a claim. Big verbs, no numbers.", "This game-changing framework will unlock unprecedented growth."),
    ("emptyEvaluation", "Empty praise", "Calls something meaningful or profound and never says what it did.", "An incredibly meaningful, truly transformative experience."),
    ("tradeoffFreePromises", "No-catch promises", "All benefit, no cost. Real work has trade-offs; this writing never does.", "Scale your output without sacrificing quality or hiring."),
    ("contrastFraming", "“Not X, but Y”", "Defines things by what they aren't, over and over, so every line sounds like a revelation.", "Leadership isn't a title. It's a mindset."),
    ("manneredProse", "Flowery prose", "Flourish in place of the plain claim.", "Growth is a delicate dance between vision and humility."),
    ("formalHedging", "Stiff phrasing", "Stock transitions and hedges that make a sentence longer and say less.", "Furthermore, this approach may provide additional benefits."),
    ("manufacturedNarrative", "Too-tidy story", "An anecdote that exists only to land exactly on its lesson.", "A junior employee once asked me a question I'll never forget."),
]

FAQ = [
    ("What is Slop Mop?",
     ["Slop Mop is a browser extension, free for one feed, that reads the posts in your feed before you reach them, judges the writing, and folds away what reads like slop. Nothing is deleted: a folded post reopens with one click, and every verdict shows the signs behind it.",
      "Today it works on LinkedIn in desktop Chrome and Chromium browsers such as Comet, Brave and Opera. Microsoft Edge, Safari and Firefox are coming soon. X, Reddit, Facebook, Substack, Medium, email and the rest of the web are coming."]),
    ("Is Slop Mop an AI detector?",
     ["No. Slop Mop is a bad-writing detector. AI-assisted writing can be excellent and human writing can be spectacular slop, so it asks a more useful question: is this worth your attention?"]),
    ("How does it decide whether a post is slop?",
     ["An AI model designed for calibrated decisions answers twelve questions about each post in parallel: nine tells of slop, two counter-signals (does it sound like a person, is it useful to readers) and how likely it is to be human-typed. Reader response, counted from reactions, comments and reposts, is the third counter-signal.",
      "The answers become one score out of 100. Counter-signals can only lower it. <a href=\"how-it-works.html\">How the score adds up</a>."]),
    ("Does it block, delete, mute or report posts?",
     ["No. Slop Mop only changes what you see, locally in your browser. Hide folds a post into a strip you can reopen; Highlight leaves it visible and tints its mop icon yellow or red. Nothing is sent to LinkedIn and no author is ever reported."]),
    ("What happens when it gets one wrong?",
     ["Click the mop beside the post and vote: No, Maybe or Probably, or Not sure to clear your vote. Your vote overrides the score in your feed straight away, with or without an account. It also counts toward the community vote on that post: in full once you have an account, and as a hundredth of a vote while you're trying Slop Mop without one.",
      "When your vote disagrees with Slop Mop's verdict, the post's text is saved and a person at Artimovo reviews it; the posts it got wrong become training examples for tuning the tells and the score. Nothing that leads to you or the author is saved with it: it judges writing, not people. You can't vote on your own posts: the vote panel doesn't appear on them. It will be wrong sometimes. That's why it shows its working and gives you the last word."]),
    ("Is it free?",
     ["Slop Mop is free for one feed, with 250 checks a day, for good. LinkedIn is the first feed it reads; X, Reddit and Facebook are coming soon. Slop Mop XL, coming soon, takes the mop to every feed, the sites you read and your inbox, for $5.99 a month or $59.99 a year. It renews automatically until you cancel, and you can cancel any time."]),
    ("Do I need an account to vote?",
     ["No. You can vote from the first post you see, and your vote changes your own feed straight away. Without an account, each vote counts as a hundredth of a community vote, so a hundred trial votes add up to one. Free and XL accounts count the same.",
      "Signing up makes every vote that browser has already cast count in full, so the votes you made while trying Slop Mop stick. Votes still can't be traced to anyone: the server stores how much each vote counts, never which account cast it. If you've used Slop Mop since its early versions (0.x), every vote you've cast counts in full."]),
    ("What leaves my browser?",
     ["The post text and its public engagement counts go to api.slopmop.lol to be judged. Your name and the author's name are never sent. The server keeps a one-way hash of the text, not the text, unless your vote disagrees with its verdict: then that post's text is kept for review and training. The <a href=\"privacy.html\">privacy policy</a> lists everything it stores."]),
    ("Does Slop Mop read my email?",
     ["Only with Slop Mop XL, through Slop Mop for Gmail and Slop Mop for Outlook, and only the emails you open or ask it to check. Personal details are taken out in your mailbox before anything is sent: names, email and street addresses, phone numbers, links, card and bank numbers, ID numbers and dates of birth become placeholders like [NAME]. We take every step we can to catch names written in the body of an email, but can't guarantee every one. Only what the sender wrote is sent, never attachments, signatures or the earlier messages quoted below. Spam, private, legal, health and transactional mail is skipped unless you check it by hand. Email text is never stored, voting isn't available for email, and email is never used for training. The <a href=\"privacy.html#slop-mop-for-email\">privacy policy</a> has the details."]),
    ("Can Slop Mop see who I email?",
     ["No. Slop Mop never sees who an email is from or who it's to: the sender and recipient names and addresses are taken out in your mailbox before anything is sent. Slop Mop judges the writing in an email, never who sent it or who it's for."]),
    ("Is Slop Mop open source?",
     ["The original version of the extension and judging server is MIT licensed and public on GitHub. Everything about it, and the link to the code, is on the <a href=\"open-source.html\">open-source page</a>."]),
]


def strip_tags(s):
    return re.sub(r"<[^>]+>", "", s)


def ld():
    return {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "WebSite", "@id": "https://slopmop.lol/#website", "url": "https://slopmop.lol/", "name": "Slop Mop",
             "description": "A browser extension that reads your feed ahead of you and folds away low-value writing, with its reasoning shown.",
             "inLanguage": "en", "publisher": {"@id": "https://slopmop.lol/#org"}},
            {"@type": "Organization", "@id": "https://slopmop.lol/#org", "name": "Artimovo LLC", "url": "https://slopmop.lol/",
             "email": "hello@slopmop.lol", "founder": {"@id": "https://slopmop.lol/#tom"}, "brand": {"@type": "Brand", "name": "Slop Mop"}},
            {"@type": "Person", "@id": "https://slopmop.lol/#tom", "name": "Tom Frazier", "url": "https://tomfrazier.com",
             "sameAs": ["https://linkedin.com/in/tomfrazier"]},
            {"@type": "SoftwareApplication", "@id": "https://slopmop.lol/#app", "name": "Slop Mop",
             "applicationCategory": "BrowserApplication", "applicationSubCategory": "Browser extension", "operatingSystem": "Chrome, Chromium browsers",
             "url": "https://slopmop.lol/", "installUrl": STORE, "downloadUrl": STORE,
             "description": "Slop Mop reads posts ahead of the reader and asks an AI model designed for calibrated decisions twelve questions about each one: nine tells of slop, two counter-signals for a human voice and usefulness, and how likely it is to be human-typed. Reader response is a third counter-signal. Hide folds suspected slop into a strip that reopens; Highlight tints the post's mop icon. Readers vote Not sure, No, Maybe or Probably to overrule it. Not an AI detector.",
             "featureList": ["Reads posts before they reach your view", "Hide mode folds suspected slop into a strip that reopens",
                             "Highlight mode tints the mop icon yellow or red", "Three sensitivity stops: mild, moderate, aggressive",
                             "Nine tells and three counter-signals per post", "Score out of 100 with the reasoning shown",
                             "Reader vote overrides the model", "Not an AI-content detector"],
             "offers": OFFERS,
             "author": {"@id": "https://slopmop.lol/#tom"}, "publisher": {"@id": "https://slopmop.lol/#org"},
             "privacyPolicy": "https://slopmop.lol/privacy.html", "termsOfService": "https://slopmop.lol/terms",
             "sameAs": [STORE, "https://www.producthunt.com/products/slop-mop"],
             "subjectOf": [{"@type": "NewsArticle", "headline": "Mop the slop from your LinkedIn feed with a new open source Chrome extension",
                            "url": PRESS[0][3], "datePublished": "2026-09-23", "publisher": {"@type": "Organization", "name": "The Register"}},
                           {"@type": "DiscussionForumPosting", "url": PRESS[1][3], "headline": "Slop Mop on Hacker News",
                            "publisher": {"@type": "Organization", "name": "Hacker News"}}]},
            {"@type": "FAQPage", "@id": "https://slopmop.lol/#faq", "mainEntity": [
                {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": " ".join(strip_tags(p) for p in a)}} for q, a in FAQ]},
        ]}


# Where Slop Mop has been written about or listed: (logo, name, kind, url)
PRESS = [("theregister", "The Register", "news", "https://www.theregister.com/ai-and-ml/2026/09/23/mop-the-slop-from-your-linkedin-feed-with-a-new-open-source-chrome-extension/5298679"),
         ("ycombinator", "Hacker News", "discussion", "https://news.ycombinator.com/item?id=49819820"),
         ("producthunt", "Product Hunt", "launch", "https://www.producthunt.com/products/slop-mop"),
         ("googlechrome", "Chrome Web Store", "listing", STORE)]
TOKENS = ("100M+", "tokens of posts Slop Mop has read so far", "2026-10-23")


# (logo, name, live). Edge, Safari and Firefox are coming soon.
BROWSERS = [("chrome-color", "Chrome", True), ("comet-color", "Comet", True), ("brave-color", "Brave", True), ("opera-color", "Opera", True),
            ("chromium-color", "All Chromium browsers", True), ("microsoftedge-color", "Microsoft Edge", False), ("safari-color", "Safari", False),
            ("firefoxbrowser-color", "Firefox", False)]


def build():
    browser_icons = "".join(f'<li{"" if live else " class=\"soon\""}><img src="assets/logos/{k}.svg" alt="" width="22" height="22"><span>{n}</span>{"" if live else "<span class=\"badge badge-soon\">soon</span>"}</li>' for k, n, live in BROWSERS)
    chips = "\n".join(
        f'        <button class="chip" type="button" data-net="{k}" data-label="{n}" data-logo="assets/logos/{lg}.svg" data-color="{c}"{" data-ink" if c.startswith("var(") else ""} style="--c:{c}" aria-pressed="{"true" if k == "linkedin" else "false"}"><span class="chip-logo" style="-webkit-mask-image:url(assets/logos/{lg}.svg);mask-image:url(assets/logos/{lg}.svg)" aria-hidden="true"></span>{n}<span class="badge {"badge-live" if live else "badge-soon"}">{"live" if live else "soon"}</span></button>'
        for k, n, live, lg, c in NETS)

    hero = f"""<section class="hero" data-networks>
  <div class="wrap">
    <span class="eyebrow">a bad-writing detector, not an ai detector</span>
    <h1 class="h-hero" style="margin-top:var(--space-7)">Only the posts <span class="hl">worth your time.</span></h1>
    <p class="h-sub">Built for <span class="net-word" style="--c:#0A66C2"><span class="net-logo"><img src="assets/logos/linkedin.svg" alt=""></span><span class="word">LinkedIn</span><span class="stop">.</span></span></p>
    <p class="lede">Slop Mop reads ahead and folds away the junk, whether a person or an AI wrote it.</p>
    <div class="hero-ctas">
      <a class="btn btn-primary" data-add href="{STORE}">{ICON['download']}Add to browser — free</a>
      <button class="btn btn-secondary" type="button" data-tour>{ICON['play']}Take a tour</button>
    </div>
    <div class="chips chips-grid" role="group" aria-label="Choose a network">
{chips}
    </div>
    <div class="browsers" aria-label="Works in these desktop browsers">
      <span class="mono">works in</span>
      <ul>{browser_icons}</ul>
    </div>
    <p class="mono hero-meta">desktop browsers · linkedin today · other feeds, email and websites coming soon</p>
    <div class="stack">
      <button class="icon-btn stack-pause" type="button" aria-label="Pause network tour">{ICON['pause']}</button>
      {island("NetworkStack")}
    </div>
  </div>
</section>
"""

    press = "".join(f'<li><a href="{u}" target="_blank" rel="noopener" data-press="{k}"><img src="assets/logos/{k}.svg" alt="" width="18" height="18"><span>{n}</span></a></li>' for k, n, _, u in PRESS)
    proof = f"""<section class="proof" aria-label="Slop Mop in numbers and in the press">
  <div class="wrap proof-grid">
    <div class="proof-stat">
      <b>{TOKENS[0]}</b>
      <span class="proof-what">{TOKENS[1]}</span>
      <span class="mono">as of {nice_date(TOKENS[2]).lower()}</span>
    </div>
    <div class="proof-press">
      <span class="mono">as seen on</span>
      <ul>{press}</ul>
    </div>
  </div>
</section>
"""

    qtext = "My feed had turned into something I scrolled past instead of read. Some of it was AI, plenty of it was people, and all of it cost attention. I built Slop Mop to read ahead for me, show its working, and let me overrule it whenever it's wrong."
    words = " ".join(f"<span>{w}</span>" for w in qtext.split(" "))
    quote = f"""<section class="quote">
  <div class="wrap">
    <span class="eyebrow">why this exists</span>
    <blockquote class="reveal" data-reveal style="margin-top:var(--space-7)">{words}</blockquote>
    <div class="quote-foot">
      <a class="btn btn-secondary" href="about.html">About Slop Mop</a>
      <div class="who"><img src="assets/img/tom.webp" alt="Tom Frazier" width="48" height="48"><div><b>Tom Frazier</b><span>Founder, Slop Mop</span></div></div>
    </div>
  </div>
</section>
"""

    assets = [
        ("Fold strip", "Past your threshold, a post folds into a 44px strip. One click unfolds it in place.", "FoldStrip", {"tone": "red", "density": "compact", "label": "This post was hidden", "stats": {"today": 17, "week": 86, "month": 341, "total": 2904}, "style": {"width": "100%"}}, "foldstrip"),
        ("The score", "An integer out of 100, never alone: the range bar shows where Possibly and Likely start.", "ScoreZones", {"score": 64, "possibly": 40, "likely": 70, "hides": True, "style": {"width": "100%"}}, "scorezones"),
        ("The Slopprint", "Nine tells, one spoke each. The shape says what kind of slop it is, not just how much.", "Slopprint", {"values": {"formulaicHook": 0.66, "engagementBait": 0.6, "hypeMarketing": 0.41, "emptyEvaluation": 0.55, "contrastFraming": 0.72, "manufacturedNarrative": 0.79, "manneredProse": 0.2, "formalHedging": 0.15, "tradeoffFreePromises": 0.25}, "color": "var(--mop-500)", "width": 220}, "slopprint"),
        ("Your vote", "Not sure, No, Maybe or Probably. Your vote overrides the model in your own feed.", "Vote", {"value": "probably", "style": {"width": "100%"}}, "votecontrol"),
        ("Sensitivity", "Mild, Moderate or Aggressive: how easily a post gets flagged.", "Sensitivity", {"value": "moderate", "showThreshold": False}, "sensitivitytoggle"),
        ("Hide or Highlight", "Fold suspected slop away, or leave everything visible and tint its mop.", "Mode", {"value": "hide"}, "segmentedcontrol"),
        ("Four verdicts", "Every stop carries a word, so no verdict is colour-only.", "Verdicts", None, "badge"),
        ("The details panel", "Click the mop for the score, strongest signs, the Slopprint and your vote.", "PanelPeek", {"k": 0.62, "h": 400, "card": {"verdict": "likely", "score": 78, "mode": "hide", "tells": {"manufacturedNarrative": 0.79, "contrastFraming": 0.72, "formulaicHook": 0.66}, "humanVoice": 0.12, "usefulness": 0.15, "readerResponse": 0.38, "interactive": False}}, "whycard"),
        ("Hidden today", "The popup keeps count, so you can see how much attention you got back.", "Tiles", None, "stattile"),
        ("Checking", "Posts are scored just before you reach them. This is what a post looks like mid-check.", "NoticePanel", {"kind": "scoring", "title": "Checking this post", "body": "Reading the writing. This takes a moment."}, "noticepanel"),
    ]

    def asset_cards(hidden):
        out = []
        for t, d, isl, props, code in assets:
            aria = ' aria-hidden="true"' if hidden else ""
            out.append(f'<div class="asset"{aria}><div class="asset-stage">{island(isl, props)}</div><div class="asset-text"><b>{t}</b><span>{d}</span><span class="mono">{code}</span></div></div>')
        return "\n        ".join(out)

    problem = f"""<section class="section" id="problem">
  <div class="wrap">
    <div class="problem-grid">
      <div>
        <h2 class="h-1 problem-title">Many posts <span class="logo-cluster" aria-hidden="true"><span><img src="assets/logos/linkedin-color.svg" alt=""></span><span><img src="assets/logos/x.svg" alt=""></span><span><img src="assets/logos/reddit-color.svg" alt=""></span></span> too little worth reading</h2>
        <p class="lede" style="margin-top:var(--space-7)">Generative AI made plausible writing nearly free, and feeds reward volume. People post more to be seen, tools write it for them, and the few posts worth your attention sit between the hooks, the bait and the tidy little parables.</p>
      </div>
      <ul class="problem-points">
        <li><span class="n">01</span><span><b>AI made it cheap.</b> A post that took an hour now takes a prompt.</span></li>
        <li><span class="n">02</span><span><b>Humans make it too.</b> Broetry and engagement bait were here long before the models.</span></li>
        <li><span class="n">03</span><span><b>Feeds reward it.</b> Reactions are easy to farm, so the formula spreads.</span></li>
        <li><span class="n">04</span><span><b>You pay in attention.</b> Every post costs a few seconds to decide it wasn't worth it.</span></li>
      </ul>
    </div>
    <div class="turn">
      <p>So Slop Mop reads ahead and does the deciding. Here's the kit it uses.</p>
      <button class="icon-btn" type="button" data-marquee-toggle="assets-marquee" aria-label="Pause carousel">{ICON['pause']}</button>
    </div>
  </div>
  <div class="marquee" id="assets-marquee" data-marquee aria-label="Slop Mop interface pieces">
    <button class="icon-btn marquee-nav prev" type="button" data-marquee-step="-1" aria-label="Back one card">{ICON['left']}</button>
    <button class="icon-btn marquee-nav next" type="button" data-marquee-step="1" aria-label="Forward one card">{ICON['right']}</button>
    <div class="marquee-track">
        {asset_cards(False)}
        {asset_cards(True)}
    </div>
  </div>
</section>
"""

    tell_items = []
    for i, (code, label, desc, ex) in enumerate(TELLS):
        tell_items.append(f"""        <li class="tell-item" data-tell="{code}">
          <button class="tell-btn" type="button" aria-expanded="false"><span class="plus">+</span>{label}<span class="code">{i + 1:02d}</span></button>
          <div class="tell-open" tabindex="-1"><b>{label}</b><p>{desc}</p><span class="ex">e.g. {esc(ex)}</span></div>
        </li>""")
    tells = f"""<section class="section sunken" id="tells">
  <div class="wrap">
    <div class="section-head center">
      <span class="eyebrow">the nine tells</span>
      <h2 class="h-1">Nine tells of slop</h2>
      <p class="lede">The model asks nine separate questions about the writing. Six come from Graphite's research on AI tells; the last three are feed habits we added. One spike isn't enough: slop usually shows several at once.</p>
    </div>
    <div class="tells" data-tells data-current="0">
      <ul class="tell-list">
{chr(10).join(tell_items)}
      </ul>
      <div class="tell-stage">
        <div class="tell-mob" data-tell-mob>
          <button class="icon-btn" type="button" data-tell-step="-1" aria-label="Previous tell">{ICON['left']}</button>
          <div class="tell-mob-text" aria-live="polite"><span class="mono"><span data-tm-n>01</span> / {len(TELLS):02d}</span><b data-tm-label>{TELLS[0][1]}</b><p data-tm-desc>{TELLS[0][2]}</p></div>
          <button class="icon-btn" type="button" data-tell-step="1" aria-label="Next tell">{ICON['right']}</button>
        </div>
        <div class="tell-card">
          <div class="tell-card-head">
            <span class="mono">each tell is one spoke of the slopprint</span>
            <div class="tell-nav">
              <button class="icon-btn" type="button" data-tell-step="-1" aria-label="Previous tell">{ICON['left']}</button>
              <button class="icon-btn" type="button" data-tell-step="1" aria-label="Next tell">{ICON['right']}</button>
            </div>
          </div>
          {island("TellCard")}
        </div>
        <a class="mono" href="how-it-works.html#tells" style="color:var(--text-link)">all nine, with examples and fine versions →</a>
      </div>
    </div>
  </div>
</section>
"""

    counters = f"""<section class="section" id="humanity">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">three counter-signals</span>
      <h2 class="h-1" style="max-width:18ch">The value of humanity, included</h2>
      <p class="lede measure">Useful beats authentic. Three counter-signals sit beside every verdict, and they can only pull a score down. A useful post survives the mop however it was written.</p>
    </div>
    <div class="cards-3">
      <div class="card">
        <div class="bar-row"><span>Sounds like a person</span><span class="mono">asked of the model</span></div>
        <div class="bar grow" data-grow><i style="--w:74%"></i></div>
        <h3>One particular person, not anyone</h3>
        <p>Specific detail from the writer's own life or work, phrasing that's clearly theirs, uneven rhythm. “I” and “my” alone don't count. It takes a little off the score.</p>
      </div>
      <div class="card">
        <div class="bar-row"><span>Useful to readers</span><span class="mono">half the shield</span></div>
        <div class="bar grow" data-grow><i style="--w:81%"></i></div>
        <h3>Something you could use today</h3>
        <p>Facts, numbers, a named example, a step to follow. Who or what wrote it doesn't matter: useful AI-assisted writing scores as well as useful writing typed by hand.</p>
      </div>
      <div class="card">
        <div class="bar-row"><span>Reader response</span><span class="mono">counted, not asked</span></div>
        <div class="bar grow" data-grow><i style="--w:38%"></i></div>
        <h3>What readers actually did</h3>
        <p>Comments and reposts count for far more than one-tap reactions, and hundreds of reactions with no discussion is discounted as hollow. The other half of the shield.</p>
      </div>
    </div>
  </div>
</section>
"""

    trust = f"""<section class="section" id="trust">
  <div class="wrap trust">
    <div class="trust-copy">
      <span class="eyebrow">no judgment of people</span>
      <h2 class="h-1">Judges the writing. Never the writer.</h2>
      <p class="lede">Slop Mop has no opinion about you, and none about the person who wrote the post. It never learns who wrote a post, and tells nobody what it thought.</p>
      <ul class="never">
        <li>{ICON['check']}<span><b>No names go out with a post.</b> Not yours, not the author's. Only the post text and its public counts are sent to be judged.</span></li>
        <li>{ICON['check']}<span><b>Posts aren't stored, unless it got one wrong.</b> The server keeps a one-way hash so a post isn't judged twice. Only when your vote disagrees with its verdict is the text kept, so a person can review it and the scoring can learn.</span></li>
        <li>{ICON['check']}<span><b>No profiles, of anyone.</b> No score is ever attached to a person, and no browsing history or LinkedIn profile data is collected.</span></li>
        <li>{ICON['check']}<span><b>Nothing is reported.</b> No author is flagged, muted or told. A verdict only changes what you see, in your own browser.</span></li>
        <li>{ICON['check']}<span><b>Your votes can't be traced to you.</b> They're kept apart from your account, never shown to anyone or sent to the author, and only ever counted in aggregate.</span></li>
      </ul>
      <a class="btn btn-secondary" href="privacy.html">Read the privacy policy</a>
    </div>
    <div class="trust-visual" aria-hidden="true">
      <div class="tv-card">
        <span class="tv-label">in your browser</span>
        <article class="post">
          <div class="post-head"><span class="avatar">MB</span><span class="post-who"><span class="post-name">Marcus Bell</span><span class="post-meta">Helping B2B leaders unlock growth</span></span></div>
          <p class="post-body" style="margin:0">Most teams don't have a strategy problem. They have a clarity problem.</p>
        </article>
      </div>
      <div class="tv-arrow"><span class="mono">sent to be judged</span></div>
      <div class="tv-card">
        <span class="tv-label">what leaves</span>
        <div class="tv-row"><span class="mono">author</span><span class="redact">never sent</span></div>
        <div class="tv-row"><span class="mono">you</span><span class="redact">never sent</span></div>
        <div class="tv-row"><span class="mono">text</span><span>“Most teams don't have a strategy problem…”</span></div>
        <div class="tv-row"><span class="mono">counts</span><span>1,204 reactions · 240 comments</span></div>
      </div>
      <div class="tv-arrow"><span class="mono">what's kept</span></div>
      <div class="tv-card tv-kept">
        <span class="tv-label">on the server</span>
        <div class="tv-row"><span class="mono">post</span><code>sha256 9f2c…e41a</code></div>
        <div class="tv-row"><span class="mono">score</span><code>61 / 100</code></div>
        <div class="tv-row"><span class="mono">who</span><span class="redact">nobody</span></div>
      </div>
    </div>
  </div>
</section>
"""

    flow_steps = [
        ("Scan ahead", "Posts are read before they reach your screen.", "",
         '<div class="mini-feed"><div class="mp"><span class="ln"></span><span class="mono">on screen</span></div><div class="viewport-line">your viewport</div><div class="mp"><span class="ln"></span><span class="mono">reading</span></div><div class="mp"><span class="ln"></span><span class="mono">reading</span></div><div class="mp"><span class="ln"></span><span class="mono">queued</span></div></div><span class="mono">14 posts scanned ahead</span>'),
        ("Grab the weights", "Each check loads the sign library: nine tells, three counter-signals.", "",
         '<div class="weights">' + "".join(f'<div><span>{l}</span><span class="bar"><i style="width:{w}%"></i></span></div>' for l, w in [("Scroll-stopper", 70), ("Engagement bait", 82), ("Hype words", 55), ("Empty praise", 60)]) +
         "".join(f'<div><span>{l}</span><span class="bar counter"><i style="width:{w}%"></i></span></div>' for l, w in [("Sounds like a person", 40), ("Useful to readers", 75)]) + '</div><span class="mono">bars illustrative · exact weights stay private</span>'),
        ("Score with a decision model", "An AI model built for calibrated decisions answers twelve questions at once.", "",
         island("ScoreZones", {"score": 78, "possibly": 40, "likely": 70, "hides": True}) + '<span class="mono">12 answers → 1 score out of 100 · unsure fails open</span>'),
        ("Send it back to you", "The verdict lands on the mop beside the post.", "",
         island("MopRow")),
        ("Auto-hide", "Past your threshold, the post folds into a strip you can reopen.", "",
         island("FoldStrip", {"tone": "red", "density": "minimal", "label": "This post was hidden", "style": {"width": "100%"}}) + island("FoldStrip", {"tone": "yellow", "density": "minimal", "label": "This post was hidden", "style": {"width": "100%"}})),
        ("Click for the details", "The score, the strongest signs, the Slopprint and the three bars.", "",
         island("PanelPeek", {"k": 0.6, "h": 420, "card": {"verdict": "possibly", "score": 61, "mode": "hide", "tells": {"emptyEvaluation": 0.74, "engagementBait": 0.68, "contrastFraming": 0.52, "formulaicHook": 0.4}, "humanVoice": 0.21, "usefulness": 0.09, "readerResponse": 0.71, "interactive": False}})),
        ("Vote to overrule it", "Not sure, No, Maybe or Probably. Your vote overrides the model in your feed.", "your vote",
         island("Vote", {"value": "no", "style": {"width": "100%"}}) + island("ScoreZones", {"score": 61, "possibly": 40, "likely": 70, "vote": "no", "style": {"width": "100%"}}) + '<span class="mono">your vote: no · the post stays in your feed</span>'),
    ]
    steps_html = []
    for i, (t_, d, badge, vis) in enumerate(flow_steps):
        b = f'<span class="badge badge-paid">{badge}</span>' if badge else ""
        steps_html.append(f"""        <div class="hstep">
          <span class="hnode" aria-hidden="true"></span>
          <div class="flow-card">
            <div class="flow-card-head"><span class="flow-num">{i + 1:02d}</span><div><b>{t_}</b><p>{d}</p></div>{b}</div>
            <div class="flow-visual">{vis}</div>
          </div>
        </div>""")
    flow = f"""<section class="section sunken" id="how">
  <div class="wrap">
    <div class="section-head flow-head">
      <div>
        <span class="eyebrow">how it works</span>
        <h2 class="h-1" style="max-width:16ch;margin-top:var(--space-6)">Reads ahead, so you don't have to</h2>
      </div>
      <div>
        <p class="lede">Seven steps between a post loading and you deciding it wasn't worth it. All but the last finish before you scroll there.</p>
        <a class="btn btn-secondary" href="how-it-works.html" style="margin-top:var(--space-6)">Read the full breakdown</a>
      </div>
    </div>
  </div>
  <div class="hflow" data-hflow>
    <div class="hflow-sticky">
      <div class="hflow-track">
        <svg class="hflow-line" aria-hidden="true"><line class="base"/><line class="drawn"/></svg>
{chr(10).join(steps_html)}
      </div>
    </div>
  </div>
</section>
"""

    def int_row(key, name, live, glyph=None):
        lg = f'<img src="assets/logos/{key}.svg" alt="" width="20" height="20">' if not glyph else f'<span class="glyph">{glyph}</span>'
        b = '<span class="badge badge-live">live</span>' if live else '<span class="badge badge-soon">coming soon</span>'
        return f'<div class="int{"" if live else " soon"}"><span class="lg">{lg}</span><span class="nm">{name}</span>{b}</div>'

    integrations = f"""<section class="section" id="networks">
  <div class="wrap">
    <div class="section-head center">
      <span class="eyebrow">works where you read</span>
      <h2 class="h-1">One mop for every feed</h2>
      <p class="lede">Slop Mop works on LinkedIn today. The same mop, fold strip and details panel are coming to the other feeds you scroll, the articles and websites you open, and the email you triage.</p>
    </div>
    <div class="integrations">
      <div class="int-group"><h3>social feeds</h3>
        {int_row("linkedin-color", "LinkedIn", True)}{int_row("x", "X", False)}{int_row("reddit", "Reddit", False)}{int_row("facebook", "Facebook", False)}
      </div>
      <div class="int-group"><h3>articles &amp; websites</h3>
        {int_row("substack", "Substack", False)}{int_row("medium", "Medium", False)}{int_row("web", "Any website", False)}
      </div>
      <div class="int-group"><h3>email</h3>
        {int_row("gmail", "Gmail", False)}{int_row("microsoftoutlook", "Outlook", False)}
      </div>
      <div class="int-group"><h3>browsers</h3>
        {int_row("chrome-color", "Chrome", True)}{int_row("chromium-color", "Chromium browsers", True)}{int_row("microsoftedge-color", "Microsoft Edge", False)}{int_row("safari-color", "Safari", False)}{int_row("firefoxbrowser-color", "Firefox", False)}
        <p class="mono" style="margin:4px 0 0">comet, brave, opera, arc, vivaldi and other chromium browsers install from the chrome web store</p>
      </div>
    </div>
  </div>
</section>
"""

    pricing = f"""<section class="section sunken" id="pricing">
  <div class="wrap">
    <div class="section-head center">
      <span class="eyebrow">pricing</span>
      <h2 class="h-1">One feed is free. The XL mop does the whole house.</h2>
      <p class="lede">Free cleans the one feed you pick, with 250 checks a day, for good. Slop Mop XL takes the mop everywhere you read, and it's coming soon.</p>
    </div>
    <div class="plans">
      <div class="plan featured">
        <div class="plan-top"><span class="plan-name"><img src="_ds/slopmop/mop.svg" alt="" width="24" height="24">Slop Mop</span><span class="badge badge-live">available now</span></div>
        <div class="plan-price">Free<small>for one feed, for good</small></div>
        <ul>
          <li>{ICON['check']}<span>The one feed you pick, read ahead and mopped (LinkedIn today)</span></li>
          <li>{ICON['check']}<span>Hide or Highlight, at three sensitivities</span></li>
          <li>{ICON['check']}<span>The full details panel and the Slopprint on every post</span></li>
          <li>{ICON['check']}<span>Your vote overrides the model in your feed</span></li>
          <li>{ICON['check']}<span>250 checks a day</span></li>
        </ul>
        <a class="btn btn-primary" data-add href="{STORE}">{ICON['download']}Add to browser — free</a>
      </div>
      <div class="plan">
        <div class="plan-top"><span class="plan-name"><img src="_ds/slopmop/mop.svg" alt="" width="24" height="24">Slop Mop XL</span><span class="badge badge-soon">coming soon</span></div>
        <div class="plan-price">$59.99<small>a year · $5.00 a month</small></div>
        <p class="plan-alt"><span class="badge badge-live">Best value</span> save 17% on yearly · or $5.99 a month</p>
        <ul>
          <li>{ICON['check']}<span>Everything in Slop Mop</span></li>
          <li>{ICON['check']}<span>Every feed: LinkedIn, X, Reddit and Facebook</span></li>
          <li>{ICON['check']}<span>The sites you read: articles, comments and reviews</span></li>
          <li>{ICON['check']}<span>Your inbox, with Slop Mop for Gmail and Outlook</span></li>
          <li>{ICON['check']}<span>More checks every day than the free 250</span></li>
          <li>{ICON['check']}<span>Up to five browsers on one account</span></li>
        </ul>
        <a class="btn btn-secondary" href="#sub-email">Get told when it's out</a>
      </div>
    </div>
  </div>
</section>
"""

    faq = "\n".join(f'    <details><summary>{q}</summary><div class="a">{"".join(f"<p>{p}</p>" for p in a)}</div></details>' for q, a in FAQ)
    faq_html = f"""<section class="section" id="faq">
  <div class="wrap">
    <div class="section-head center">
      <span class="eyebrow">faq</span>
      <h2 class="h-1">Questions? We've mopped up a few.</h2>
    </div>
    <div class="faq">
{faq}
    </div>
  </div>
</section>
"""

    band = f"""<section class="band">
  <div class="wrap band-grid">
    <div class="band-copy">
      <div class="band-logo"><img src="assets/img/mark.svg" alt="">Slop Mop</div>
      <div class="band-line">Your feed, <span class="hl">minus the slop.</span></div>
      <p class="lede">About a minute to install. No account, no API key, nothing to configure before it starts reading ahead.</p>
      <div class="ctas">
        <a class="btn btn-primary" data-add href="{STORE}">{ICON['download']}Add to browser — free</a>
      </div>
    </div>
    <div class="band-video">
      <video data-preview poster="assets/video/preview.jpg" muted loop playsinline preload="none" disablepictureinpicture controlslist="nodownload noplaybackrate noremoteplayback" aria-label="Slop Mop in action: a silent preview of the tour video" width="1280" height="720">
        <source src="assets/video/preview.mp4" type="video/mp4">
        <source src="assets/video/preview.webm" type="video/webm">
      </video>
    </div>
  </div>
</section>
<dialog class="tour" aria-label="Slop Mop tour">
  <button class="icon-btn close" type="button" aria-label="Close">{ICON['x']}</button>
  <video src="slopmop-video.mp4" controls playsinline preload="none"></video>
</dialog>
"""

    h = head("Slop Mop — Only the posts worth your time.",
             "Slop Mop is a browser extension, free for one feed, that reads your feed ahead of you, folds away low-value writing and shows why. Not an AI detector: a bad-writing detector. LinkedIn today; X, Reddit, Facebook, Substack and Medium coming soon.",
             "", og_title="Slop Mop — Only the posts worth your time.", ld=ld())
    write("index.html", page_shell(h, "", hero + proof + quote + problem + tells + counters + trust + flow + integrations + pricing + faq_html + band))


if __name__ == "__main__":
    build()
