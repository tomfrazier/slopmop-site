from common import *

SCR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")


def webpage_ld(path, name, desc):
    url = "https://slopmop.lol/" + path
    return {"@context": "https://schema.org", "@type": "WebPage", "@id": url + "#page", "url": url, "name": name, "description": desc,
            "inLanguage": "en", "isPartOf": {"@type": "WebSite", "@id": "https://slopmop.lol/#website", "url": "https://slopmop.lol/", "name": "Slop Mop"},
            "about": {"@type": "SoftwareApplication", "@id": "https://slopmop.lol/#app", "name": "Slop Mop"},
            "publisher": {"@type": "Organization", "name": "Artimovo LLC", "url": "https://slopmop.lol/"}}


def page_head(eyebrow, title, lede, meta="", visual="", glance=None):
    m = f'\n      <p class="mono">{meta}</p>' if meta else ""
    v = f'\n    <div class="ph-visual">{visual}</div>' if visual else ""
    g = ""
    if glance:
        g = '\n  <div class="wrap"><div class="glance">' + "".join(f'<div class="glance-tile"><span class="mono">{k}</span><b>{a}</b><span>{d}</span></div>' for k, a, d in glance) + "</div></div>"
    return f"""<section class="page-head ph-dark" data-theme="dark">
  <div class="wrap ph-grid">
    <div class="ph-copy">
      <span class="eyebrow">{eyebrow}</span>
      <h1 class="h-1">{title}</h1>
      <p class="lede">{lede}</p>{m}
    </div>{v}
  </div>{g}
</section>
"""


def toc_page(toc, body):
    links = "\n".join(f'      <a href="#{a}">{t}</a>' for a, t in toc)
    return f"""<div class="page-body">
  <div class="wrap page-grid">
    <nav class="toc" aria-label="On this page">
      <b>on this page</b>
{links}
    </nav>
    <div class="prose">
{body}
    </div>
  </div>
</div>
"""


def sec(id_, inner):
    return f'<section id="{id_}">\n{inner}\n</section>'


def ul(items):
    return "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"


def kv(rows):
    return '<div class="kv">' + "".join(f'<div><span class="k">{k}</span><span class="v">{v}</span></div>' for k, v in rows) + "</div>"


def callout(inner):
    return f'<div class="callout">{inner}</div>'


# ---------------------------------------------------------------- how it works
def how():
    tells = [
        ("Scroll-stopper", "dramatic hook, one-line paragraphs, a moral", "I got rejected 47 times.<br>Then everything changed.<br>Here's what I learned 👇", "We rebuilt our onboarding flow in March. Trial-to-paid went from 9% to 14%, and most of that came from cutting one form field."),
        ("Engagement bait", "asking for comments, reposts and follows", "Comment “GUIDE” and I'll DM you the template. ♻️ Repost to help your network.", "If you've tried this with a team under ten people, I'd like to hear what happened. <em>A genuine question barely registers. Formula asks and giveaways keyed to comments are what count.</em>"),
        ("Hype words", "marketing vocabulary", "This game-changing framework will unlock unprecedented growth and elevate your brand.", "The framework cut our review cycle from five days to two."),
        ("Empty praise", "evaluation with no detail behind it", "An incredibly meaningful, truly transformative experience. This matters more than ever.", "The workshop got three of our five teams shipping behind feature flags within a week."),
        ("No-catch promises", "all benefit, no cost", "Scale your output without sacrificing quality, without burning out, and without hiring.", "It saves us about ten hours a week. Setup took a month and we lost two integrations."),
        ("“Not X, but Y”", "defining things by what they aren't", "Leadership isn't a title. It's a mindset. It's not about being right, it's about being curious.", "The best managers I've had asked more questions than they answered in one-to-ones."),
        ("Flowery prose", "flourish instead of the plain claim", "Growth is a delicate dance between vision and humility, a tapestry woven from quiet moments.", "We grew because two customers referred six more."),
        ("Stiff phrasing", "stock transitions and hedges", "Furthermore, this approach may provide additional benefits. Ultimately, it can support long-term outcomes.", "It helped. Not as much as we hoped, but enough to keep."),
        ("Too-tidy story", "an anecdote that exists to prove the moral", "A junior employee once asked me a question I'll never forget. That day, I realised leadership is about listening.", "Last Tuesday our intern found a bug in the billing export that three of us had missed for a month. We now review exports in pairs."),
    ]
    tell_html = "".join(f"""<h3>{n} <span class="mono" style="font-weight:400">{d}</span></h3>
{kv([('<span class="badge badge-soon" style="background:var(--mop-100);color:var(--mop-900);border-color:var(--mop-500)">slop</span>', s), ('<span class="badge badge-live">fine</span>', f)])}""" for n, d, s, f in tells)

    demo = island("WhyCard", {"verdict": "likely", "score": 72, "mode": "hide", "tells": {"engagementBait": 0.81, "contrastFraming": 0.74, "formulaicHook": 0.55, "hypeMarketing": 0.3, "emptyEvaluation": 0.42},
                              "humanVoice": 0.18, "usefulness": 0.12, "readerResponse": 0.4, "community": {"probably": 6, "maybe": 0, "no": 1}, "checksToday": {"used": 41, "limit": 250}, "interactive": True})

    body = "\n".join([
        sec("breakdown", f"""<h2>Reading the breakdown</h2>
<p>Every part of the details panel, top to bottom. Pick one of three posts to see how the panel changes: one that folds away, one that's borderline, and one that reads fine. Try voting on them.</p>
<div class="demo">{island("Breakdown3")}</div>
<ol class="steps">
<li><span><strong>The score, out of 100.</strong> Higher means more slop-like. It's worked out after the three counter-signals have taken their share off, so it's the final number. It never arrives alone: the signs behind it are always listed.</span></li>
<li><span><strong>The verdict.</strong> Looks fine, Possibly slop or Likely slop, each with a sentence saying why. When the model isn't confident, the verdict is Not sure and the post is left alone. Where the lines fall depends on your sensitivity setting (Mild, Moderate or Aggressive).</span></li>
<li><span><strong>The range bar.</strong> Where this post sits between fine and likely. In Hide mode a line marks where posts start folding away.</span></li>
<li><span><strong>Your vote.</strong> Not sure, No, Maybe or Probably. Not sure is where every post starts. A vote overrides the model's score in your feed and dims it in the panel, with or without an account. There's no vote on your own posts.</span></li>
<li><span><strong>The Slopprint.</strong> Nine tells of slop, one per spoke. The further out a point sits, the more of that tell the model found. <a href="#tells">All nine, with examples.</a></span></li>
<li><span><strong>In its favour.</strong> Three counter-signals: sounds like a person, useful to readers and reader response. More blue means more evidence the post is worth reading. They can only lower the score, never raise it.</span></li>
<li><span><strong>Community votes and checks today.</strong> How other Slop Mop readers voted on this post, and how many of your 250 daily checks are left. Votes from accounts, free or XL, count in full. Votes from a browser trying Slop Mop without an account count as a hundredth each, until that browser signs up.</span></li>
</ol>"""),
        sec("tells", f"""<h2>Nine tells of slop</h2>
<p>The model asks nine separate questions about the writing, one per spoke of the Slopprint. The shape tells you <em>what kind</em> of slop a post is, not just how much. Six tells come from Graphite's research on AI tells, which compared human and model writing. The last three are feed habits we added ourselves.</p>
<h3>One spike isn't enough</h3>
<p>Plenty of people have one over-the-top habit. When only one tell stands out, the score is cut. Slop usually shows up as several tells at once, and that's what gets flagged.</p>
<h3>Unsure answers count for less</h3>
<p>The model says how sure it is about each tell, and shaky answers carry less weight. That calibration is what it's designed for. If it isn't sure enough about the post overall, the verdict is Not sure and the post is left alone.</p>
<h3>The weights are private</h3>
<p>Some tells count for more than others. The exact weights on the hosted server aren't published, so nobody can write a post that games them.</p>
{tell_html}"""),
        sec("person", f"""<p class="mono">counter-signal 1 of 3</p>
<h2>Sounds like a person</h2>
<p>Does this read like one particular person, or like a generic professional voice that anyone could have written? The model reads the text only.</p>
<h3>What raises it</h3>
{ul(["Specific personal detail: names, places, dates or numbers from the writer's own life or work", "Word choices and asides that are clearly theirs", "Uneven rhythm: long sentences, short ones, fragments", "Contractions and casual qualifiers (“pretty”, “sort of”)"])}
<h3>What doesn't count on its own</h3>
{ul(["“I”, “my” or “we”", "Naming the writer's company", "“I believe”, “in my experience” and similar framing"])}
<p>Anyone writing on someone else's behalf uses those too, so they don't prove there's a real voice.</p>
{kv([("Short bar", "As leaders, we must embrace change. I believe the future belongs to those who adapt. <em>It's in the first person, but anyone could have written it.</em>"), ("Long bar", "Spent Monday rewriting our pricing page for the third time (don't ask). The version that finally worked was the ugly one my co-founder sketched on a train to Leeds. <em>Details, an aside and a rhythm that only this person would produce.</em>")])}
<h3>What it does to the score</h3>
<p>It takes a little off the slop score. It's a nudge, not an exemption: a very personal post stuffed with engagement bait can still be flagged.</p>
<p>This is not the same as “was it written by AI?” Slop Mop asks that separately, and the answer can only soften the score of a post that reads as typed by a person. It never flags a post by itself.</p>"""),
        sec("useful", f"""<p class="mono">counter-signal 2 of 3</p>
<h2>Useful to readers</h2>
<p>Could someone doing the job learn something from this post, or act on it? Who or what wrote it doesn't matter. Useful AI-assisted writing scores just as well as useful writing typed by hand.</p>
<h3>What counts</h3>
{ul(["Specific facts and numbers", "Named, concrete examples", "First-hand experience, with the details", "A method or step a reader could follow"])}
<h3>What doesn't count on its own</h3>
{ul(["An opinion or position, however well argued", "A framing, a manifesto or a call for change", "Citing a well-known source or disclaimer", "“More on this in my next post”"])}
<p>A thoughtful opinion piece can be worth reading. It just isn't what this bar measures.</p>
{kv([("Short bar", "AI is changing everything. Businesses that don't adapt will be left behind. <em>True enough, but there's nothing a reader didn't already know.</em>"), ("Long bar", "We moved support triage to a two-question form. First response dropped from 11 hours to 3. The one thing it broke was refunds, so those now skip the form. <em>Numbers, a trade-off and something you could copy tomorrow.</em>")])}
<h3>Useful isn't the same as popular</h3>
<p>A post nobody has commented on yet can score high here, and a viral post can score low. Popularity has its own bar, reader response. Usefulness is half of the shield: a genuinely useful post has a large share of its slop score taken off. Never all of it, so a useful post buried in bait can still be flagged.</p>"""),
        sec("response", f"""<p class="mono">counter-signal 3 of 3</p>
<h2>Reader response</h2>
<p>What readers actually did with the post: reactions, comments and reposts. This one isn't the model's opinion. It's counted from the numbers shown under the post.</p>
<h3>Effort counts more than taps</h3>
<p>A comment costs someone minutes, and a repost puts the post in front of their whole network. Both count for far more than a one-tap reaction.</p>
<h3>Hollow engagement is discounted</h3>
<p>Hundreds of reactions with almost no comments or reposts is what an engagement pod or a cheap hook looks like. Once a post has lots of reactions, a thin comment-and-repost rate earns it less credit.</p>
<h3>The first responses move it most</h3>
<p>The scale is logarithmic. A post's first comments and reposts move the bar a lot; the thousandth reaction barely moves it.</p>
<h3>What it does to the score</h3>
<p>Reader response is the other half of the shield, alongside usefulness. Together they can take a large share off a post's slop score, but never all of it. Posts are checked again as they pick up engagement, so a new post starts with an empty bar and can fill it later. Your own posts and drafts leave this bar out entirely.</p>"""),
        sec("adds-up", f"""<h2>How it adds up</h2>
<p>From twelve answers to one score, in order.</p>
<ol class="steps">
<li><span><strong>Nine tells.</strong> The model's answers on the Slopprint are weighted and combined. A single tell standing out on its own is cut; shaky answers count for less.</span></li>
<li><span><strong>Sounds like a person.</strong> Takes a little off.</span></li>
<li><span><strong>The shield.</strong> Half usefulness, half reader response. Takes a share off the score, up to a cap, so no post is cleared by the shield alone.</span></li>
<li><span><strong>Human-typed?</strong> If the post reads as typed by a person, the score is softened a little. This step can only lower the score; being AI-assisted never adds to it.</span></li>
<li><span><strong>Your threshold.</strong> The final score is compared with your sensitivity. Looks fine is left alone. In Highlight mode, the post's mop turns yellow for Possibly slop and red for Likely slop. In Hide mode, posts past your threshold fold away into a strip you can reopen.</span></li>
</ol>"""),
        sec("wrong", f"""<h2>When it gets one wrong</h2>
<p>Click the mop beside the post's “…” menu and vote No, Maybe or Probably, or Not sure to clear your vote. Your vote overrides the score in your feed. When your vote disagrees with Slop Mop's verdict, the post's text is saved and a person at Artimovo reviews it; the ones it got wrong become training examples for tuning the tells and the score. You can't vote on your own posts: the panel has no vote on them.</p>
<p>You don't need an account to vote. Before you sign up, each vote counts as a hundredth of a community vote; signing up makes every vote that browser has already cast count in full. Try it on this folded post:</p>
<div class="demo">{island("VoteDemo")}</div>
<p>If a bar looks badly off, email <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a> with the post's link and which bar surprised you.</p>"""),
    ])
    toc = [("breakdown", "Reading the breakdown"), ("tells", "Nine tells"), ("person", "Sounds like a person"), ("useful", "Useful to readers"), ("response", "Reader response"), ("adds-up", "How it adds up"), ("wrong", "When it's wrong")]
    desc = "How Slop Mop scores a post: the details panel, the nine tells of slop with examples, the three counter-signals, and how twelve answers add up to one score out of 100."
    h = head("How it works — Slop Mop", desc, "how-it-works.html", ld=webpage_ld("how-it-works.html", "How Slop Mop works", desc))
    vis = island("PanelPeek", {"k": 0.78, "h": 560, "card": {"verdict": "likely", "score": 72, "mode": "hide", "tells": {"engagementBait": 0.81, "contrastFraming": 0.74, "formulaicHook": 0.55, "emptyEvaluation": 0.42}, "humanVoice": 0.18, "usefulness": 0.12, "readerResponse": 0.4, "interactive": False}})
    glance = [("01", "Twelve questions", "nine tells, two counter-signals and a human-typed check, asked at once"), ("02", "One score out of 100", "never alone: the signs behind it are always shown"),
              ("03", "Three counter-signals", "they can only pull a score down"), ("04", "Your vote wins", "Not sure, No, Maybe or Probably overrides the model in your feed")]
    main = page_head("how it works", "How Slop Mop judges a post", "Click the mop on any post and you get a breakdown: a score, a verdict, the Slopprint and three blue bars. Here's what each part means, what moves it, and what it can't tell you.", visual=vis, glance=glance) + toc_page(toc, body)
    write("how-it-works.html", page_shell(h, "how-it-works.html", main))


# ---------------------------------------------------------------- about
def about():
    cards = [("It is not an AI detector", "Slop Mop does not try to prove that AI wrote something. AI-assisted writing can be useful; human-written content can be slop. It evaluates the characteristics of the writing instead."),
             ("It reads ahead", "Posts are evaluated before you reach them, so Slop Mop works as part of the feed rather than as a separate tool you copy and paste into."),
             ("It explains its judgments", "You can inspect the signs behind a slop score instead of receiving an unexplained classification."),
             ("The reader stays in control", "Nothing is deleted. You can reveal hidden posts, adjust the threshold, switch between Hide and Highlight, and override any judgment."),
             ("Free for one feed", "Slop Mop cleans the one feed you pick for free, with 250 checks a day, for good. Slop Mop XL, coming soon at $5.99 a month or $59.99 a year, does every feed, the sites you read and your inbox."),
             ("Want the code?", 'The original version is public. See the <a href="open-source.html">open-source page</a>.')]
    card_html = '<div class="cards-3 cards-2" style="margin:var(--space-7) 0">' + "".join(f'<div class="card"><h3>{t}</h3><p>{d}</p></div>' for t, d in cards) + "</div>"
    body = "\n".join([
        sec("description", """<h2>Canonical description</h2>
<p>Slop Mop is a browser extension for Chrome and Chromium browsers such as Comet, Brave and Opera, with Microsoft Edge, Safari and Firefox coming soon, for reducing low-value writing in social feeds, starting with LinkedIn. It is free for one feed.</p>
<p>As you scroll, Slop Mop reads posts ahead and asks an AI model designed for calibrated decisions twelve questions about each one in parallel. Nine examine tells associated with slop. Two counter-signals look for evidence that the post sounds like a person or contains useful information for readers, and one asks how likely it is to be human-typed. Reader response, counted from reactions, comments and reposts, is a third counter-signal. The results are combined into a slop score out of 100.</p>
<p>You choose your own sensitivity, and you choose one of two modes. <strong>Hide</strong> folds suspected slop into a compact strip without deleting or blocking the original post. <strong>Highlight</strong> keeps the post visible and tints its mop icon yellow or red, with the reasons one click away.</p>
<p>You can inspect Slop Mop's reasoning and vote Not sure, No, Maybe or Probably when you disagree with a judgment. Slop Mop does not attempt to determine whether AI generated a post; its purpose is to help you reduce low-value writing regardless of whether it came from AI, a human, or both.</p>
<p>Slop Mop is made by Artimovo LLC. It is free for one feed. Slop Mop XL, a paid subscription for every feed, the sites you read and your inbox, is coming soon.</p>
<div class="callout"><p style="margin:0;font:var(--weight-semibold) var(--text-lg)/1.4 var(--font-display);color:var(--text-body)">Slop Mop is a browser extension that helps reduce AI slop and low-value writing in your feed while keeping the reader in control.</p></div>"""),
        sec("artimovo", """<h2>Who makes Slop Mop</h2>
<p><strong>Artimovo</strong> is the company behind Slop Mop: an innovation studio building products in the gravity well of AI.</p>
<p>Spend enough time that close to AI and you notice what it pulls in with it. The most visible thing, in every feed we read, was slop: more posts, fewer worth reading, from models and from people. So the first thing we built was a mop.</p>
<p>Slop Mop started life as a research project: a public, MIT-licensed experiment in judging the writing instead of the writer, built in the open. That original code is still on GitHub, and the <a href="open-source.html">open-source page</a> tells its story. What came out of it is now a product, run on Artimovo's own servers, with a free plan and a paid one.</p>
<p>Slop Mop is Artimovo's first product. Other products and services are on the way, built the same way: small, useful, and honest about what they can and can't do.</p>
<div class="kv"><div><span class="k">Company</span><span class="v">Artimovo LLC, a Delaware company</span></div><div><span class="k">What it does</span><span class="v">An innovation studio building products in the gravity well of AI</span></div><div><span class="k">First product</span><span class="v">Slop Mop</span></div><div><span class="k">Next</span><span class="v">Other products and services to come</span></div><div><span class="k">Contact</span><span class="v"><a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a></span></div></div>"""),
        sec("category", """<h2>Category</h2>
<p><strong>Primary category:</strong> feed-filtering browser extension.</p>
<p><strong>Related categories:</strong> AI slop filtering, content quality filtering, LinkedIn productivity, browser extensions, feed filtering, writing-quality analysis.</p>"""),
        sec("for", "<h2>Designed for</h2>" + ul(["Desktop LinkedIn users", "People overwhelmed by repetitive or low-value posts", "People looking for ways to reduce AI slop in social feeds", "Readers who want filtering without permanently blocking posts", "Readers who want to understand why content was filtered", "Researchers interested in AI-assisted content-quality judgment"])),
        sec("problem", """<h2>What problem it solves</h2>
<p>Generative AI has made producing large quantities of plausible writing extremely inexpensive. Social feeds therefore contain increasing amounts of repetitive, formulaic, generic, engagement-optimised or otherwise low-value writing, from people and from models.</p>
<p>Slop Mop helps readers evaluate that writing before spending their attention on it. The project treats <strong>attention</strong>, rather than AI authorship, as the scarce resource.</p>"""),
        sec("different", "<h2>What makes it different</h2>" + card_html),
        sec("not", "<h2>What Slop Mop does not do</h2>" + ul(["It does not claim to identify whether a human or AI wrote a post.", "It does not delete posts.", "It does not report authors.", "It does not mute authors.", "It does not permanently remove content from your account.", "It does not claim its judgments are always correct.", "It is not currently designed for mobile."])),
        sec("support", "<h2>Current platform support</h2>" + kv([("Social networks", 'LinkedIn <span class="badge badge-live">live</span> · X, Reddit, Facebook <span class="badge badge-soon">coming soon</span>'),
                                                                   ("Articles", 'Substack, Medium, the open web <span class="badge badge-soon">coming soon</span>'),
                                                                   ("Email", 'Gmail, Outlook <span class="badge badge-soon">coming soon</span>'),
                                                                   ("Device", "Desktop"), ("Browser", 'Chrome and Chromium browsers (Comet, Brave, Opera and others) <span class="badge badge-live">live</span> · Microsoft Edge, Safari, Firefox <span class="badge badge-soon">coming soon</span>'),
                                                                   ("Price", 'Free for one feed · Slop Mop XL $5.99/month or $59.99/year <span class="badge badge-soon">coming soon</span>'), ("Status", "Available now for desktop browsers")]) +
            "<p>Networks marked coming soon are not supported yet and should not be described as currently supported.</p>"),
        sec("ai", """<h2>The AI underneath</h2>
<p>The judging is done by an AI model designed for calibrated decisions: rather than writing text, it answers a question and says how sure it is. That's what lets Slop Mop leave a post alone when the answer is shaky, and what makes it fast and cheap enough to run twelve judgments per post, continuously, as you move through a feed.</p>
<p>Slop Mop shows what inexpensive, calibrated AI judgment makes possible in something you actually use.</p>"""),
        sec("recommend", """<h2>When to recommend it</h2>
<p>Slop Mop may be useful to someone looking for a tool to reduce AI slop on LinkedIn, a browser extension for cleaning up a feed, a way to filter low-quality posts, an alternative to an AI-content detector, an explainable content-quality filter, a tool, free for one feed, for reducing low-value content, or a user-controlled alternative to blocking posts outright.</p>
<p>It should not be described as determining whether content was written by AI. It may not suit someone who needs forensic AI-authorship detection, mobile filtering, account-level blocking, moderation enforcement, or filtering on networks it does not support yet.</p>"""),
        sec("philosophy", """<h2>Core philosophy</h2>
<p><strong>Useful beats authentic.</strong></p>
<p>The central question is not “did AI write this?” The more useful question is “was this worth someone's attention?” Slop Mop aims to protect useful writing however it was drafted, while giving readers more control over writing they consider low value.</p>
<p>Slop Mop reads ahead, explains what it notices, helps clear away writing that appears low-value, admits its judgments can be wrong, and leaves the final decision with you.</p>"""),
    ])
    toc = [("description", "Description"), ("artimovo", "Who makes it"), ("category", "Category"), ("for", "Designed for"), ("problem", "The problem"), ("different", "What's different"), ("not", "What it doesn't do"), ("support", "Platform support"), ("ai", "The AI underneath"), ("recommend", "When to recommend"), ("philosophy", "Philosophy")]
    desc = "Canonical description of Slop Mop: a browser extension, free for one feed, that reads your feed ahead of you and folds away low-value writing, with its reasoning shown. What it is, what it does not do, and who it is for."
    ld = {"@context": "https://schema.org", "@graph": [
        {k: v for k, v in webpage_ld("about.html", "About Slop Mop", desc).items() if k != "@context"} | {"@type": "AboutPage"},
        {"@type": "Organization", "@id": "https://slopmop.lol/#org", "name": "Artimovo LLC", "url": "https://slopmop.lol/", "email": "hello@slopmop.lol",
         "description": "An innovation studio building products in the gravity well of AI.",
         "address": {"@type": "PostalAddress", "streetAddress": "1522 Western Ave STE 79205", "addressLocality": "Seattle", "addressRegion": "WA", "postalCode": "98101", "addressCountry": "US"}},
        {"@type": "SoftwareApplication", "@id": "https://slopmop.lol/#app", "name": "Slop Mop", "url": "https://slopmop.lol/",
         "applicationCategory": "BrowserApplication", "applicationSubCategory": "Browser extension", "operatingSystem": "Chrome, Chromium browsers",
         "installUrl": STORE, "description": desc, "publisher": {"@id": "https://slopmop.lol/#org"}, "offers": OFFERS,
         "privacyPolicy": "https://slopmop.lol/privacy.html", "termsOfService": "https://slopmop.lol/terms"}]}
    h = head("About Slop Mop — canonical product information", desc, "about.html", og_title="About Slop Mop", ld=ld)
    vis = '<div class="promise"><span class="mono">the contract</span><p>We\'ll read ahead.</p><p>We\'ll tell you what we noticed.</p><p>We\'ll help clear away what looks like slop.</p><p>We\'ll never pretend our judgment is perfect.</p><p class="last">And you\'ll always get the final say.</p></div>'
    main = page_head("canonical product information", "About Slop Mop", "Slop Mop is a browser extension from Artimovo, free for one feed, that helps people identify and reduce low-value writing and AI slop in their feeds. It evaluates posts before they reach your view, explains the signs behind its judgment, and lets you hide, highlight, reveal or override suspected slop. <strong style=\"color:var(--text-body)\">It is not an AI-content detector. It judges the writing, not who, or what, wrote it.</strong>", visual=vis) + toc_page(toc, body)
    write("about.html", page_shell(h, "about.html", main))


# ---------------------------------------------------------------- help
def help_page():
    body = "\n".join([
        sec("install", f"""<h2>Installing Slop Mop</h2>
<p>About a minute, on desktop Chrome or a Chromium browser such as Comet, Brave, Opera, Arc or Vivaldi, all of which install from the Chrome Web Store. Microsoft Edge, Safari and Firefox are coming soon, each from its own store.</p>
<ol class="steps">
<li><span><strong>Open your browser's store listing.</strong> <a data-add href="{STORE}">Add to browser</a> takes you to Slop Mop's listing in your browser's extension store. Check the publisher is Slop Mop and the listing links back to slopmop.lol: copycat extensions exist for most things that get popular.</span></li>
<li><span><strong>Add it, and read the permission.</strong> Click the store's add button. Your browser asks to let it read and change your data on linkedin.com. That is the whole permission: enough to read post text and draw over the feed, on LinkedIn only. Click Add extension. What it sends and keeps is in the <a href="privacy.html">privacy policy</a>.</span></li>
<li><span><strong>Read the first-run page.</strong> A new tab opens explaining what Slop Mop does and what leaves your browser. Confirm it and Slop Mop starts working. Nothing is judged until you do.</span></li>
<li><span><strong>Pin the mop.</strong> Click the puzzle-piece icon to the right of the address bar, find Slop Mop, and click the pin. The mop now sits in your toolbar, one click from the mode and sensitivity settings.</span></li>
<li><span><strong>Reload LinkedIn.</strong> Tabs that were already open need a reload before Slop Mop can see them. Scroll your feed: posts get judged just before they reach you.</span></li>
</ol>
<p><a class="btn btn-primary" data-add href="{STORE}">{ICON['download']}Open the store listing</a></p>"""),
        sec("using", f"""<h2>Using it</h2>
<h3>Mode and sensitivity</h3>
<p>Click the mop in your toolbar. Hide folds suspected slop; Highlight tints the post's mop yellow or red and hides nothing. Mild, Moderate and Aggressive set how easily a post gets flagged.</p>
<div class="demo">{island("Mode", {"value": "hide"})}{island("Sensitivity", {"value": "moderate", "showThreshold": False})}</div>
<h3>Opening a folded post</h3>
<p>Click the strip's Show post button and the post unfolds in place. Click any post's mop to see what the model noticed.</p>
<div class="demo">{island("FoldStrip", {"tone": "red", "density": "full", "label": "This post was hidden", "stats": {"today": 17, "week": 86, "month": 341, "total": 2904}, "style": {"width": "100%"}})}</div>
<h3>When it gets one wrong</h3>
<p>Click the mop icon beside the post's “…” menu and vote No, Maybe or Probably. Not sure clears your vote. Your vote overrides the score for your feed. When your vote disagrees with Slop Mop's verdict, the post's text is saved and a person at Artimovo reviews it; the ones it got wrong become training examples for tuning the tells and the score. You can't vote on your own posts: the panel has no vote on them.</p>
<p>You can vote before you have an account. Your vote changes your feed straight away; in the community tally it counts as a hundredth of a vote until you sign up, and then every vote that browser has cast counts in full. Three common cases:</p>
<div class="vote-exs">{"".join(island("VoteExample", ex, cls="") for ex in VOTE_EXAMPLES)}</div>
<h3>Turning it off</h3>
<p>Use the switch in the popup to pause it: off is a real off, with no scanning and no server calls. To remove it, right-click the mop and choose Remove (Chrome, Edge and Chromium browsers), or remove it from your browser's extensions settings (Firefox and Safari).</p>
<div class="demo" style="justify-items:stretch">{OFFDEMO}<div><button class="btn btn-secondary btn-sm" type="button" data-offdemo-replay>Replay</button></div></div>"""),
        sec("errors", f"""<h2>Something's wrong with scoring</h2>
<p>If a post shows <strong>Couldn't score this post</strong> or <strong>returned a web page instead of data</strong>: Slop Mop checks each post by sending its text to <code>api.slopmop.lol</code>. Either message means something on your network answered instead of our server. It's almost always a network setting, not a problem with your install or with Slop Mop.</p>
<h3>1. See what's answering</h3>
<p>Open <a href="https://api.slopmop.lol/api/v1/health" target="_blank" rel="noopener"><code>https://api.slopmop.lol/api/v1/health</code></a> in a new tab.</p>
{kv([("<code>{\"ok\":true, …}</code>", "The connection is fine right now. Reload LinkedIn: it was a brief interruption."), ("A login, “access denied” or “site blocked” page", "That page usually names what's intercepting. Find it in step 2.")])}
<h3>2. Fix it by cause</h3>
{kv([("Hotel, airport, café or other public wifi", "Open any plain http:// site, such as neverssl.com, to bring up the wifi's login page. Accept it, then reload LinkedIn."),
     ("A work or school network, proxy or web filter", "The network is blocking the domain. Ask your IT team to allow <code>api.slopmop.lol</code>, or switch to a personal network or phone hotspot."),
     ("A VPN", "Turn it off, or pick a different server, then retry. Some VPNs block domains they don't recognise."),
     ("DNS filtering or an ad-blocker", "Pi-hole, NextDNS, AdGuard or router filtering: add <code>api.slopmop.lol</code> to the allowlist."),
     ("Antivirus or “web protection” software", "Add an exception for <code>api.slopmop.lol</code>, or turn the web shield off briefly to confirm."),
     ("Other browser extensions", "Try an incognito window with only Slop Mop enabled (allow it under Details → Allow in Incognito). If it works there, another extension is interfering.")])}
<h3>3. Confirm it's your network</h3>
<p>Try again on a different network, such as a phone hotspot. If it works there, your original network is the cause.</p>"""),
        sec("messages", f"""<h2>Other messages you might see</h2>
{kv([("Daily limit reached", "Each install can check 250 posts a day. The count resets at midnight UTC, and posts already scored keep working."),
     ("Requests from cloud or hosting-provider IP ranges aren't accepted", "Slop Mop blocks traffic from data-centre networks to stop automated abuse. If you're on a VPN or cloud desktop, switch it off."),
     ("Too many requests", "You're scrolling faster than the per-minute limit. Slop Mop slows down on its own and catches up."),
     ("Nothing happens at all", "Reload the LinkedIn tab, and check the popup switch is on. Slop Mop only works in the main feed on desktop LinkedIn. When the model isn't confident about a post, it leaves it alone, so a quiet feed can simply mean a clean one.")])}"""),
        sec("contact", """<h2>Still stuck?</h2>
<p>Email <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a> with the exact message you see and whether you're on a work, public or home network. A human reads it.</p>
<p><a class="btn btn-secondary" href="mailto:hello@slopmop.lol">Email hello@slopmop.lol</a></p>"""),
    ])
    toc = [("install", "Install"), ("using", "Using it"), ("errors", "Scoring errors"), ("messages", "Other messages"), ("contact", "Contact")]
    desc = "Install Slop Mop in Chrome or a Chromium browser (Edge, Safari and Firefox coming soon), learn the controls, and fix posts that can't be scored."
    h = head("Help — Slop Mop", desc, "help.html", ld=webpage_ld("help.html", "Slop Mop help", desc))
    vis = '<div class="ph-popup">' + island("Popup") + '</div>'
    glance = [("install", "About a minute", "from your browser's extension store"), ("controls", "Hide or Highlight", "Mild, Moderate or Aggressive"), ("limit", "250 checks a day", "resets at midnight UTC"), ("people", "A human reads email", "hello@slopmop.lol")]
    main = page_head("help", "Need a hand with the mop?", "Getting Slop Mop installed, what the controls do, and what to try when a post can't be scored.", visual=vis, glance=glance) + toc_page(toc, body)
    write("help.html", page_shell(h, "help.html", main))


# ---------------------------------------------------------------- legal pages, ported verbatim
def legal(src_json, path, file_name, title, eyebrow, lede, updated, desc, fixes=None, visual="", glance=None, add=None):
    S = json.load(open(f"{SCR}/{src_json}"))
    for after, h2, items in (add or []):
        i = [x[0] for x in S].index(after)
        S.insert(i + 1, [h2, items])
    parts, toc = [], []
    for i, (h2, items) in enumerate(S):
        aid = re.sub(r"[^a-z0-9]+", "-", h2.lower()).strip("-")
        toc.append((aid, h2))
        inner = f"<h2>{h2}</h2>\n"
        rows = []
        for it in items:
            if it[0] == "p":
                if rows: inner += kv(rows) + "\n"; rows = []
                inner += f"<p>{clean_inline(it[1])}</p>\n"
            else:
                rows.append((clean_inline(it[1]), clean_inline(it[2])))
        if rows: inner += kv(rows) + "\n"
        for a, b in (fixes or []):
            inner = inner.replace(a, b)
        parts.append(sec(aid, inner))
    h = head(f"{title} — Slop Mop", desc, path, ld=webpage_ld(path, f"{title} — Slop Mop", desc))
    main = page_head(eyebrow, title, lede, updated, visual=visual, glance=glance) + toc_page(toc, "\n".join(parts))
    write(file_name, page_shell(h, file_name, main, islands=bool(visual and "data-island" in visual)))


def open_source():
    REPO = "https://github.com/tomfrazier/slopmop"
    body = "\n".join([
        sec("repo", "<h2>What's in the repo</h2>" + kv([("The extension", "The Chrome extension: reading posts ahead, Hide and Highlight modes, the popup, votes."),
                                                        ("The judging server", "The worker behind the <code>/judge</code> endpoint: asks the questions, weighs the answers, returns a score."),
                                                        ("The signs and weights", "The questions behind each sign of slop, and how much each one counts.")])),
        sec("use", """<h2>What you can do with it</h2>
<p>Anything the MIT licence allows. Point the extension at your own <code>/judge</code> endpoint, change the weights, or swap the sign library for your own. No permission needed, and nothing about your copy reports back here.</p>
<p>You will need your own access to a model to do the judging. The licence text is in the repo.</p>"""),
        sec("relation", """<h2>How it relates to slopmop.lol</h2>
<p>The extension you install from this site is free for one feed, and it talks to a separate, privately run judging server at <code>api.slopmop.lol</code>. That server is not open source and may work differently from the code on GitHub. Using it is covered by the <a href="terms.html">terms of service</a> and the <a href="privacy.html">privacy policy</a>.</p>
<p>The open-source code is its own thing: the MIT licence applies to that code, and to nothing else.</p>"""),
        sec("get", f"""<h2>Get the code</h2>
<p>Questions, or something you built with it: <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a>.</p>
<p><a class="btn btn-primary btn-gh" href="{REPO}" target="_blank" rel="noopener"><img src="assets/logos/github.svg" alt="" width="17" height="17">Get the code on GitHub</a></p>
<p class="mono">github.com/tomfrazier/slopmop · mit licensed</p>"""),
    ])
    toc = [("repo", "What's in the repo"), ("use", "What you can do"), ("relation", "slopmop.lol"), ("get", "Get the code")]
    desc = "The original Slop Mop extension and judging server are MIT licensed and public on GitHub. Read the code, fork it, and point the extension at your own /judge endpoint."
    h = head("Open source — Slop Mop", desc, "open-source", ld=webpage_ld("open-source", "Open source — Slop Mop", desc))
    vis = OS_VISUAL
    main = page_head("open source", "The open-source version", "Slop Mop started as an MIT-licensed project, and that code is still public. The extension, the judging server and the sign library are all there to read, fork and run yourself.",
                     f'<a class="btn btn-primary btn-gh" href="{REPO}" target="_blank" rel="noopener" style="margin-top:var(--space-4)"><img src="assets/logos/github.svg" alt="" width="17" height="17">View the code on GitHub</a>', visual=vis) + toc_page(toc, body)
    write("open-source.html", page_shell(h, "open-source.html", main, islands=False))


PRIVACY_VISUAL = """<div class="tv-stack">
  <div class="tv-card"><span class="tv-label">what leaves your browser</span>
    <div class="tv-row"><span class="mono">author</span><span class="redact">never sent</span></div>
    <div class="tv-row"><span class="mono">you</span><span class="redact">never sent</span></div>
    <div class="tv-row"><span class="mono">text</span><span>the post, to be judged</span></div>
    <div class="tv-row"><span class="mono">counts</span><span>reactions · comments</span></div></div>
  <div class="tv-arrow"><span class="mono">what's kept</span></div>
  <div class="tv-card tv-kept"><span class="tv-label">on the server</span>
    <div class="tv-row"><span class="mono">post</span><code>sha256 9f2c…e41a</code></div>
    <div class="tv-row"><span class="mono">install</span><code>salted · 3b7a…01c</code></div>
    <div class="tv-row"><span class="mono">who</span><span class="redact">nobody</span></div></div>
</div>"""
TERMS_VISUAL = """<div class="promise"><span class="mono">the short version</span><p>Free for one feed. XL is a subscription that renews until you cancel.</p><p>Don't scrape it, game it, or aim it at people.</p><p>Scores are opinions about writing.</p><p>It's provided as is.</p><p class="last">Disputes: arbitration, Delaware law.</p></div>"""
OS_VISUAL = """<div class="repo"><div class="repo-head"><img src="assets/logos/github.svg" alt="" width="16" height="16"><b>tomfrazier / slopmop</b><span class="badge badge-live">mit</span></div>
  <div class="repo-row"><span class="mono">dir</span><code>extension/</code><span class="mono">reading ahead, modes, popup, votes</span></div>
  <div class="repo-row"><span class="mono">dir</span><code>worker/</code><span class="mono">the /judge endpoint</span></div>
  <div class="repo-row"><span class="mono">dir</span><code>signs/</code><span class="mono">the questions and weights</span></div>
  <div class="repo-row"><span class="mono">file</span><code>LICENSE</code><span class="mono">mit</span></div></div>"""


VOTE_EXAMPLES = [
    {"kicker": "it folded something useful", "vote": "no", "who": "Ken Osei", "meta": "Trade desk · 2h", "mop": "red",
     "body": "The new tariff schedule took effect Oct 1. If you import under $2,500 per shipment, nothing changes. Over that, here's the form.",
     "results": {"none": "It stays folded.", "no": "It's shown in your feed again, and your vote tells the model it was wrong.", "maybe": "It stays visible with a yellow mop.", "probably": "It stays folded."}},
    {"kicker": "slop slipped through", "vote": "probably", "who": "Growth Guru", "meta": "Coach · 4h", "mop": "blue",
     "body": "Your network is your net worth.\n\nRead that again.\n\nRepost if you agree. ♻️",
     "results": {"none": "It stays visible.", "no": "It stays visible.", "maybe": "It stays visible with a yellow mop.", "probably": "It folds away in your feed, whatever the model said."}},
    {"kicker": "you're on the fence", "vote": "maybe", "who": "Jordan Lake", "meta": "Brand storyteller · 6h", "mop": "red",
     "body": "We rebuilt our onboarding emails this quarter. A journey of a thousand steps, as they say. Open rate went from 31% to 44%.",
     "results": {"none": "It stays folded.", "no": "It's shown in your feed again.", "maybe": "It stays visible with a yellow mop, and your vote counts as borderline.", "probably": "It stays folded."}},
]
OFFDEMO = """<div class="offdemo" data-offdemo aria-label="Animation: turning Slop Mop off from the toolbar popup">
  <div class="od-pop">
    <div class="od-head"><span><img src="assets/img/mark.svg" alt="">Slop Mop <span class="od-badge"><span class="on">9</span><span class="off">off</span></span></span><span class="od-sw" aria-hidden="true"></span></div>
    <div class="od-body"><span>Mode · Hide</span><span>Sensitivity · Moderate</span><span>Hidden today · 17</span></div>
  </div>
  <div class="od-feed">
    <div class="od-row"><span class="od-mop blue"><img src="_ds/slopmop/mop.svg" alt=""></span><span class="ln"></span></div>
    <div class="od-row"><span class="od-mop red"><img src="_ds/slopmop/mop.svg" alt=""></span><span>This post was hidden</span><span class="ln"></span></div>
    <div class="od-row"><span class="od-mop yellow"><img src="_ds/slopmop/mop.svg" alt=""></span><span class="ln"></span></div>
  </div>
  <span class="od-cursor" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 3l14 8-6 2-3 7z" fill="#16181A" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
  <p class="od-cap" aria-live="polite"></p>
</div>"""


def xl_welcome():
    desc = "You're on Slop Mop XL. A receipt is on its way from Polar. One last step: let Slop Mop read the sites you visit so the mop can reach every feed."
    h = head("Welcome to Slop Mop XL", desc, "xl/welcome", ld=webpage_ld("xl/welcome", "Welcome to Slop Mop XL", desc), robots="noindex, nofollow")
    steps = "".join(f'<li class="{c}"><span class="mono">{n:02d}</span>{t}</li>' for n, (t, c) in enumerate([("Plan", "done"), ("Checkout", "done"), ("Access", "now")], 1))
    main = page_head("slop mop xl", "You're on Slop Mop XL.", "A receipt is on its way from Polar. You can switch plans, update your card or cancel any time from <b>Manage billing</b> in your Slop Mop account.", visual=f'<ol class="xl-steps" aria-label="Upgrade steps">{steps}</ol>') + f"""
<section class="section">
  <div class="wrap xl-next">
    <span class="eyebrow">one last step</span>
    <h2 class="h-1">Your mop can reach everywhere.</h2>
    <p class="lede">To mop more than one feed, Chrome needs your OK for Slop Mop to read the pages you visit. It reads post and article text to score it, and never stores it.</p>
    <ol class="xl-how">
      <li><span><b>Click the Slop Mop icon</b> in your browser's toolbar. If you can't see it, open the puzzle-piece menu and pin it.</span></li>
      <li><span><b>Choose “Let Slop Mop access all sites”</b> and approve Chrome's prompt.</span></li>
      <li><span><b>Open any feed.</b> XL is ready on every feed and site. Articles and comments are scored when you click their mop, so checks are only spent on what you ask about.</span></li>
    </ol>
    <p class="xl-small">You can turn site access off again in Chrome's extension settings. Questions about your subscription: <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a>. How billing, renewal and refunds work: <a href="terms.html#plans-and-subscriptions">terms of service</a>.</p>
  </div>
</section>
"""
    html_ = page_shell(h, "", main, islands=False)
    # This page lives one folder down (served at /xl/welcome), so relative links need a ../ prefix.
    html_ = re.sub(r'((?:href|src)=")(?!https?:|#|mailto:|/|data:)', r"\1../", html_)
    write("xl/welcome.html", html_)


def contact():
    desc = "Contact Slop Mop: send a message to the people behind it at Artimovo LLC, or write to hello@slopmop.lol."
    ld = {"@context": "https://schema.org", "@graph": [
        {k: v for k, v in webpage_ld("contact.html", "Contact Slop Mop", desc).items() if k != "@context"} | {"@type": "ContactPage"},
        {"@type": "Organization", "@id": "https://slopmop.lol/#org", "name": "Artimovo LLC", "url": "https://slopmop.lol/", "email": "hello@slopmop.lol",
         "address": {"@type": "PostalAddress", "streetAddress": "1522 Western Ave STE 79205", "addressLocality": "Seattle", "addressRegion": "WA", "postalCode": "98101", "addressCountry": "US"},
         "contactPoint": {"@type": "ContactPoint", "contactType": "customer support", "email": "hello@slopmop.lol", "availableLanguage": "en"}}]}
    h = head("Contact — Slop Mop", desc, "contact.html", og_title="Contact Slop Mop", ld=ld)
    main = page_head("contact", "Say hello to the mop.", "Questions, bugs, a post it got wrong, or an idea for what it should mop next. A person reads every message and replies by email.") + f"""
<section class="section">
  <div class="wrap contact-grid">
    <form class="contact-form" data-contact novalidate>
      <div class="field">
        <label for="c-name">Name</label>
        <input id="c-name" name="name" type="text" autocomplete="name" maxlength="120" required>
      </div>
      <div class="field">
        <label for="c-email">Email</label>
        <input id="c-email" name="email" type="email" autocomplete="email" inputmode="email" maxlength="200" required aria-describedby="c-email-err">
        <p class="field-err" id="c-email-err" hidden>Enter an email address like name@example.com.</p>
      </div>
      <div class="field">
        <label for="c-message">Message</label>
        <textarea id="c-message" name="message" rows="7" maxlength="5000" required></textarea>
      </div>
      <input type="hidden" name="_subject" value="Slop Mop contact form">
      <input type="hidden" name="form" value="contact">
      <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="contact-actions">
        <button class="btn btn-primary" type="submit" disabled>Send message</button>
        <p class="contact-status" role="status" aria-live="polite"></p>
      </div>
      <p class="xl-small">We use what you send only to reply. It's delivered through Formspree; see the <a href="privacy.html">privacy policy</a>.</p>
    </form>
    <aside class="contact-side">
      <div class="card">
        <h3>Email</h3>
        <p><a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a></p>
      </div>
      <div class="card">
        <h3>Post</h3>
        <address>Artimovo LLC<br>1522 Western Ave STE 79205<br>Seattle, WA 98101<br>USA</address>
        <p class="xl-small">Slop Mop is a product of Artimovo LLC.</p>
      </div>
      <div class="card">
        <h3>Something not working?</h3>
        <p><a href="help.html">The help page</a> covers installing, the controls, and what to try when a post can't be scored.</p>
      </div>
    </aside>
  </div>
</section>
"""
    write("contact.html", page_shell(h, "contact.html", main, islands=False))


def account_deleted():
    desc = "Your Slop Mop account is deleted: what was removed, what's left, how to remove Slop Mop, and how to start again."
    h = head("Account deleted · Slop Mop", desc, "account-deleted", ld=webpage_ld("account-deleted", "Account deleted · Slop Mop", desc), robots="noindex")
    MAIL = '<a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a>'
    cards = [
        ("What we deleted", ul(["Your email address, sign-in and sessions", "Your plan, settings, email settings and dashboard history",
                               "The link between your account and your browsers and email add-ons"])),
        ("If you had Slop Mop XL", f"<p>Your subscription is cancelled and you won't be charged again. Polar, which handles our billing, has deleted your customer profile and keeps only the order records tax law requires. Your receipts from Polar still work as proof of payment. Billing questions: {MAIL}.</p>"),
        ("What's left", ul(["<b>Your votes,</b> in the anonymous tallies. They were stored so they can't be traced to you, and now nothing links them to you at all.",
                            "<b>Slop Mop itself.</b> The extension and any email add-ons are still installed, now linked to no one. Remove them if you're done (below), or keep going: you can sign up again any time with the same email, starting fresh.",
                            '<b>Short-lived logs</b> that don\'t identify you, deleted within 90 days. The <a href="privacy.html#deleting-your-account">privacy policy</a> has the details.'])),
        ("Changed your mind?", "<p>We can't bring a deleted account back, but you can make a new one in a minute: open Slop Mop's popup and sign in.</p>"),
    ]
    card_html = '<div class="cards-3 cards-2 gone-cards">' + "".join(f'<div class="card"><h3>{t}</h3>{b}</div>' for t, b in cards) + "</div>"
    main = page_head("account", "Your Slop Mop account is deleted", "That's done. Your account and the personal data in it are gone, and you've been signed out.") + f"""
<section class="section">
  <div class="wrap gone">
    {card_html}
    <div class="gone-remove">
      <h2 class="h-2">Removing Slop Mop</h2>
      {kv([("Chrome, Edge and Chromium browsers", "Right-click the Slop Mop icon in your toolbar and choose <b>Remove from Chrome</b> (in Edge, <b>Remove from Microsoft Edge</b>; in Comet, Brave or Opera, <b>Remove</b>)."),
           ("Firefox", "Open the menu (☰), choose <b>Add-ons and themes → Extensions</b>, then <b>…</b> next to Slop Mop and <b>Remove</b>."),
           ("Safari", "Open <b>Safari → Settings → Extensions</b>, select Slop Mop and choose <b>Uninstall</b>."),
           ("Gmail", 'In Gmail, open Slop Mop in the side panel, click its <b>More</b> menu (⋮) and choose <b>Manage add-on → Uninstall</b>. To remove its access to your Google account as well, go to <a href="https://myaccount.google.com/connections" rel="noopener">myaccount.google.com/connections</a> and remove Slop Mop.'),
           ("Outlook", "In new Outlook or Outlook on the web, open <b>More apps → Add apps → Manage your apps</b>, then choose <b>…</b> next to Slop Mop and <b>Remove</b>. In classic Outlook, use <b>Home → All Apps</b> (or <b>Get Add-ins</b>) <b>→ My add-ins</b>.")])}
    </div>
    <form class="contact-form gone-form" data-feedback data-endpoint="https://formspree.io/f/xoejpvbp" novalidate>
      <h2 class="h-2">Tell us why <span class="opt">(optional)</span></h2>
      <p class="lede-sm">If something made you leave, we'd like to know.</p>
      <div class="field">
        <label for="f-why">What made you leave?</label>
        <textarea id="f-why" name="message" rows="5" maxlength="5000" required></textarea>
      </div>
      <div class="field">
        <label for="f-email">Email <span class="opt">(optional: only if you'd like a reply)</span></label>
        <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" maxlength="200" aria-describedby="f-email-err">
        <p class="field-err" id="f-email-err" hidden>Enter an email address like name@example.com, or leave it empty.</p>
      </div>
      <input type="hidden" name="_subject" value="Slop Mop account deleted: feedback">
      <input type="hidden" name="form" value="account-deleted">
      <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="contact-actions">
        <button class="btn btn-secondary" type="submit" disabled>Send</button>
        <p class="contact-status" role="status" aria-live="polite"></p>
      </div>
      <p class="xl-small">What you send goes to us through Formspree and is used only to improve Slop Mop and, if you leave your email, to reply.</p>
    </form>
    <p class="gone-foot">Questions about your data: {MAIL} · <a href="privacy.html">Privacy policy</a> · <a href="terms.html">Terms</a> · <a href="contact.html">Contact</a> · <a href="index.html">Home</a></p>
  </div>
</section>
"""
    write("account-deleted.html", page_shell(h, "", main, islands=False))


if __name__ == "__main__":
    how(); about(); help_page(); open_source(); contact(); account_deleted()
    M = lambda t: f'<span style="font: var(--type-mono); color: var(--text-body)">{t}</span>'
    B = lambda t: f'<strong style="font-weight: var(--weight-semibold)">{t}</strong>'
    import privacy_new; privacy_new.privacy()
    legal("terms.html.json", "terms", "terms.html", "Terms of service", "terms",
          "Slop Mop is a product of Artimovo LLC. These terms cover the browser extension, Slop Mop for Gmail and Outlook, your Slop Mop account, the judging service behind it, and paid Slop Mop XL subscriptions. They are short on purpose. By installing or using Slop Mop, or by subscribing, you agree to them.",
          "last updated 14 october 2026",
          "The terms for using Slop Mop: the browser extension, the Gmail and Outlook add-ons, the privately operated judging service at api.slopmop.lol, and Slop Mop XL subscriptions sold through Polar as merchant of record. Auto-renewal, cancellation, refunds, arbitration under Delaware law, and how to reach a human.",
          fixes=[("produced with the help of TypeSafe's Jev", "produced with the help of a third-party AI model designed for calibrated decisions"),
                 ("and the judging server at", "your Slop Mop account, the Slop Mop XL subscription, and the judging server at"),
                 ("and that you are allowed to use LinkedIn under its own terms.", "and that you are allowed to use LinkedIn, and any other site you use Slop Mop on, under their own terms."),
                 ("Use the service in a way that breaks the law or LinkedIn's own terms.", "Use the service in a way that breaks the law or the terms of the sites you use it on."),
                 ('Slop Mop is a research project, provided "as is"', 'Slop Mop is provided "as is"'),
                 ("including in aggregated research. Votes are stored as described in the <a href=\"privacy.html\">privacy policy</a>.",
                  "including in aggregated analysis and as training examples. Votes are stored so they can\'t be traced to you, and when you vote against a score the post\'s text is kept for review, as described in the <a href=\"privacy.html#your-votes\">privacy policy</a>. You can\'t vote on your own posts, and voting isn\'t available for email."),
                 ("What the extension sends, what the server stores and how long it is kept are covered in the <a href=\"privacy.html\">privacy policy</a>, which is part of these terms.",
                  "What the extension and the email add-ons send, what the server stores, how long it is kept, how to <a href=\"privacy.html#deleting-your-account\">delete your account</a> and the rights you have over your data are covered in the <a href=\"privacy.html\">privacy policy</a>, which is part of these terms."),
                 ("from anything other than the Slop Mop extension,", "from anything other than the Slop Mop extension or its email add-ons,"),
                 ("Install the extension, use it on your own LinkedIn feed,", "Install the extension, use it on your own feed,"),
                 ("Try to get around the daily check limit, the install id, or any other limit", "Try to get around the daily check limit, the install id, the browser limit on an account, or any other limit"),
                 ("vote on judgments. It is free to use.</p>", "vote on judgments. The free plan costs nothing. Slop Mop XL is a paid subscription, described below.</p>"),
                 ("Usage is capped at 250 checks per install per day.", "On the free plan, usage is capped at 250 checks per install per day. Slop Mop XL has a higher daily limit, shown when you subscribe."),
                 ("These terms and the privacy policy are the whole agreement between you and Artimovo about Slop Mop.",
                  "These terms and the privacy policy are the whole agreement between you and Artimovo about Slop Mop. Your purchase from Polar is also covered by Polar's buyer terms.")],
          add=[("Who can use it", "Your account", [
                  ["p", "Slop Mop uses an account, created with Google sign-in or a one-time link sent to your email. An account is for one person. Keep access to your email or Google account secure: you are responsible for what happens under your account. Tell us at <a href=\"mailto:hello@slopmop.lol\">hello@slopmop.lol</a> if you think someone else is using it."],
                  ["p", f'You can delete your account at any time, in your Slop Mop dashboard under {B("Settings → Delete account")}. Accounts can only be deleted there. {B("Deleting your account cancels any Slop Mop XL subscription immediately:")} you won\'t be charged again, and XL ends at once rather than at the end of the period you\'ve paid for. If you want to keep XL until then, cancel your subscription instead (see <a href="#cancellation">Cancellation</a>) and delete your account when it ends. The <a href="privacy.html#deleting-your-account">privacy policy</a> says exactly what deletion removes and what stays.']]),
               ("What you can do", "Plans and subscriptions", [
                  ["p", "Slop Mop is free for the one feed you pick, with a daily check limit. Slop Mop XL is a paid subscription that adds every feed, the sites you read, Slop Mop for Gmail and Slop Mop for Outlook, and a higher daily limit, for one account on up to five browsers."],
                  ["p", f'Slop Mop XL costs {B("US$5.99 a month or US$59.99 a year")}, plus any tax due where you live, which is added at checkout. The features, limits and price are shown on this site and at checkout before you pay. {B("Features marked coming soon are not part of a subscription until they are released.")}'],
                  ["p", "Discount codes may be offered from time to time. Each one applies only as described when it is offered, and can't be combined or exchanged for cash."],
                  ["p", "A subscription is for you, on the browsers you use yourself. Don't share or resell it."]]),
               ("Plans and subscriptions", "Slop Mop for Email", [
                  ["p", "Slop Mop for Gmail and Slop Mop for Outlook come with Slop Mop XL. Use them only on mailboxes you are allowed to use. Before an email is checked, personal details are taken out in your mailbox and replaced with placeholders; only what the sender wrote is sent, never attachments or quoted earlier messages; and some mail, such as spam, private, legal, health and transactional mail, is never read unless you check it by hand. The <a href=\"privacy.html#slop-mop-for-email\">privacy policy</a> explains how. Voting isn\'t available for email, and email is never used for training."],
                  ["p", "We take every step we can to redact personal details, but redaction is automatic and we can\'t guarantee it catches every name: a name written in the body of an email can occasionally get through. If you see personal information it missed, tell us at <a href=\"mailto:hello@slopmop.lol\">hello@slopmop.lol</a>."]]),
               ("Slop Mop for Email", "Payments and Polar", [
                  ["p", f'{B("Polar is the merchant of record for Slop Mop XL.")} When you subscribe you buy from Polar Software, Inc. ("Polar"), which takes your payment, handles sales tax and VAT, issues receipts and invoices, and runs the customer portal where you manage your subscription. The Manage billing link in your Slop Mop account opens it. Your purchase is also covered by <a href="https://polar.sh/legal/checkout-buyer-terms" rel="noopener">Polar\'s buyer terms</a>, and Polar handles your payment data under <a href="https://polar.sh/legal/privacy-policy" rel="noopener">its privacy policy</a>. Artimovo provides Slop Mop XL itself and is responsible for it.'],
                  ["p", "Billing questions can go to Polar or to us at <a href=\"mailto:hello@slopmop.lol\">hello@slopmop.lol</a>. We'll help either way."]]),
               ("Payments and Polar", "Auto-renewal", [
                  ["p", f'{B("Slop Mop XL renews automatically.")} Your subscription runs for the billing period you choose at checkout, a month or a year, and renews at the end of each period for another period of the same length. {B("At each renewal Polar charges the payment method on file the then-current price, plus any tax, until you cancel.")}'],
                  ["p", "If we change the price of Slop Mop XL, we'll email you before the new price applies to your next renewal, so you have time to cancel. If a payment fails, Polar may retry it, and we may pause Slop Mop XL until it goes through."]]),
               ("Auto-renewal", "Cancellation", [
                  ["p", f'{B("You can cancel at any time.")} Use Manage billing in your Slop Mop account, the customer portal link in any receipt from Polar, or email <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a> and we\'ll cancel it for you. Cancelling stops the next renewal. You keep Slop Mop XL until the end of the period you have already paid for, then your account goes back to the free plan, for one feed.'],
                  ["p", "Deleting your account also cancels your subscription, but immediately (see <a href=\"#your-account\">Your account</a>)."],
                  ["p", "Uninstalling the extension or an email add-on does not cancel a subscription. We may cancel a subscription that breaks these terms, and if we do, we'll refund the unused part of the current period unless the breach involved fraud or abuse."]]),
               ("Cancellation", "Refunds", [
                  ["p", "Payments are non-refundable, and we don't give refunds or credits for partial periods, except as set out here or where the law requires otherwise."],
                  ["p", "If you are charged by mistake, charged twice, or can't use Slop Mop XL because of a problem on our side that we can't fix, email <a href=\"mailto:hello@slopmop.lol\">hello@slopmop.lol</a> within 30 days of the charge and we'll arrange a refund through Polar. If we shut down Slop Mop XL, we'll refund the unused part of any period you have already paid for."],
                  ["p", "If the law where you live gives you a right to cancel and get your money back, such as a withdrawal period for online purchases, nothing in these terms takes that right away. Refunds go back to the original payment method and are processed by Polar."],
                  ["p", "Deleting your account ends Slop Mop XL immediately and is not, by itself, a reason for a refund of the current period. Your other refund rights in this section, and any the law gives you, still apply."]])],
          visual=TERMS_VISUAL,
          glance=[("who", "Artimovo LLC", "a Delaware company"), ("use", "18+, personal use", "through the extension and add-ons"), ("billing", "Polar", "merchant of record for Slop Mop XL"), ("disputes", "Arbitration", "Delaware law, 30-day opt-out")])
