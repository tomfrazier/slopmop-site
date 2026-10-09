/* slopmop.lol — hero mockups of the sites Slop Mop runs on. Host chrome is drawn in each host's own look so the reader can tell
   the sites apart; everything Slop Mop adds (mop icons, fold strips, chips, panels) is the real design-system component. */
(function () {
  var DS = window.SlopMopDesignSystem_ca9143;
  if (!window.React || !DS) return;
  var h = React.createElement;

  function Av(p) { return h("span", { className: "av" + (p.sq ? " sq" : ""), style: p.size ? { width: p.size, height: p.size } : null }, p.t || ""); }
  function Mop(p) { return h(DS.MopIcon, { state: p.s, hover: p.hover, label: "Is this slop?" }); }
  function Strip(p) { return h(DS.FoldStrip, { tone: p.tone || "red", density: "minimal", label: "This post was hidden" }); }
  function Chip(p) { return h("span", { className: "vchip " + p.tone }, h(DS.MopMark, { size: 12 }), p.label, p.n != null ? h("b", null, p.n) : null); }
  function Lines(p) { var out = []; for (var i = 0; i < (p.n || 3); i++) out.push(h("i", { key: i, style: { width: (p.w || [92, 78, 55])[i % 3] + "%" } })); return h("span", { className: "lines" }, out); }
  function Panel(p) { return h("div", { className: "mock-panel" }, h(DS.WhyCard, Object.assign({ interactive: true, vote: null, onVote: function () {} }, p))); }

  /* ---------------- LinkedIn: three columns, hover panel open ---------------- */
  function LinkedIn() {
    return h("div", { className: "m-li" },
      h("div", { className: "li-top" },
        h("span", { className: "li-logo" }, "in"), h("span", { className: "li-search" }, "Search"),
        h("span", { className: "li-icons" }, ["Home", "My Network", "Jobs", "Messaging", "Notifications"].map(function (t, i) {
          return h("span", { key: t, className: i === 0 ? "on" : "" }, h("i"), t); }))),
      h("div", { className: "li-main" },
        h("aside", { className: "li-left" },
          h("div", { className: "li-card li-me" }, h("span", { className: "cover" }), Av({ t: "AK", size: 52 }), h("b", null, "Alex Kim"), h("small", null, "Product designer"), h("hr"), h("small", null, "Profile viewers  ", h("b", null, "38")))),
        h("div", { className: "li-feed" },
          h("div", { className: "li-card li-start" }, Av({ t: "AK", size: 40 }), h("span", null, "Start a post")),
          h("article", { className: "li-card li-post" },
            h("header", null, Av({ t: "PR" }), h("span", { className: "who" }, h("b", null, "Priya Raman"), h("small", null, "Staff engineer, payments · 5h")), Mop({ s: "unchecked" }), h("span", { className: "dots" }, "···")),
            h("p", null, "We shaved 400ms off checkout by moving the fraud check off the critical path. Took three weeks, two of them arguing about it."),
            h("footer", null, "👍 88 · 14 comments", h("span", { className: "acts" }, ["Like", "Comment", "Repost", "Send"].map(function (x) { return h("span", { key: x }, x); })))),
          h(Strip, { tone: "red" }),
          h("article", { className: "li-card li-post hovered" },
            h("header", null, Av({ t: "MB" }), h("span", { className: "who" }, h("b", null, "Marcus Bell"), h("small", null, "Helping B2B leaders unlock growth · 7h")), Mop({ s: "yellow", hover: true }), h("span", { className: "dots" }, "···")),
            h("p", null, "Most teams don't have a strategy problem. They have a clarity problem.\n\nComment YES if this resonates."),
            h("footer", null, "👍 1,204 · 240 comments", h("span", { className: "acts" }, ["Like", "Comment", "Repost", "Send"].map(function (x) { return h("span", { key: x }, x); })))),
          h(Strip, { tone: "red" })),
        h("aside", { className: "li-right" },
          h(Panel, { verdict: "possibly", score: 61, mode: "hide", tells: { emptyEvaluation: 0.74, engagementBait: 0.68, contrastFraming: 0.52, formulaicHook: 0.4 }, humanVoice: 0.21, usefulness: 0.09, readerResponse: 0.71, community: { probably: 9, maybe: 4, no: 1 }, checksToday: { used: 41, limit: 250 } }))));
  }

  /* ---------------- X: Highlight mode, tinted mops, nothing folded ---------------- */
  function X() {
    function Tweet(p) {
      return h("article", { className: "x-tweet" + (p.cls ? " " + p.cls : "") },
        Av({ t: p.i }),
        h("div", { className: "x-body" },
          h("div", { className: "x-head" }, h("b", null, p.name), h("span", null, p.handle + " · " + p.t), h("span", { className: "x-mop" }, Mop({ s: p.mop, hover: p.hover })), h("span", { className: "dots" }, "···")),
          h("p", null, p.text),
          h("div", { className: "x-acts" }, h("span", null, "💬 " + p.r), h("span", null, "🔁 " + p.rt), h("span", null, "♡ " + p.l), h("span", null, "📊 " + p.v))));
    }
    return h("div", { className: "m-x" },
      h("nav", { className: "x-nav" }, h("span", { className: "x-logo" }, "𝕏"),
        ["Home", "Explore", "Notifications", "Messages", "Bookmarks", "Profile"].map(function (t, i) { return h("span", { key: t, className: i === 0 ? "on" : "" }, h("i"), t); }),
        h("span", { className: "x-post" }, "Post")),
      h("div", { className: "x-tl" },
        h("div", { className: "x-tabs" }, h("span", { className: "on" }, "For you"), h("span", null, "Following")),
        h(Tweet, { i: "NP", name: "Nina Park", handle: "@ninabuilds", t: "1h", mop: "blue", text: "Shipped the export fix. The bug was a timezone, as it always is. Writing up the test that would have caught it.", r: 12, rt: 4, l: 96, v: "2.4K" }),
        h(Tweet, { i: "GG", name: "Growth Guru", handle: "@growthguru", t: "2h", mop: "red", hover: true, cls: "flag", text: "9 AI tools that will 10x your productivity.\n\nMost people don't know #4.\n\nBookmark this. 🧵", r: 88, rt: 410, l: "2.1K", v: "310K" }),
        h(Tweet, { i: "SL", name: "Sam Lee", handle: "@samlee", t: "3h", mop: "yellow", text: "Unpopular opinion: consistency beats talent. Every. Single. Time.", r: 31, rt: 12, l: 402, v: "40K" })),
      h("aside", { className: "x-right" },
        h("span", { className: "x-search" }, "Search"),
        h("div", { className: "x-card" }, h("b", null, "What's happening"),
          ["Trending in Tech · #DevTools", "Business · Remote work", "Trending · Q4 planning"].map(function (t) { return h("div", { key: t, className: "x-trend" }, h("small", null, t.split(" · ")[0]), h("span", null, t.split(" · ")[1])); })),
        h("div", { className: "x-hl" }, h("span", { className: "mono" }, "highlight mode · nothing hidden"))));
  }

  /* ---------------- Reddit: a post with tinted mop + comments, one collapsed ---------------- */
  function Reddit() {
    function C(p) {
      return h("div", { className: "rd-c" + (p.d ? " d" + p.d : "") },
        h("div", { className: "rd-chead" }, Av({ t: p.i, size: 22 }), h("b", null, p.u), h("span", null, p.t), Mop({ s: p.mop })),
        h("p", null, p.text), h("div", { className: "rd-cacts" }, "▲ " + p.v + " ▼", h("span", null, "Reply")));
    }
    return h("div", { className: "m-rd" },
      h("div", { className: "rd-top" }, h("span", { className: "rd-logo" }, h("i"), "reddit"), h("span", { className: "rd-search" }, "Search Reddit"), h("span", { className: "rd-login" }, "Log In")),
      h("div", { className: "rd-main" },
        h("nav", { className: "rd-nav" }, ["Home", "Popular", "Explore", "All"].map(function (t, i) { return h("span", { key: t, className: i === 0 ? "on" : "" }, t); }), h("small", null, "COMMUNITIES"), ["r/productivity", "r/android", "r/webdev"].map(function (t) { return h("span", { key: t }, t); })),
        h("div", { className: "rd-feed" },
          h("article", { className: "rd-post" },
            h("div", { className: "rd-meta" }, h("i", { className: "rd-sub" }), h("b", null, "r/productivity"), h("span", null, "· 6h · u/quietlist"), h("span", { className: "x-mop" }, Mop({ s: "red", hover: true }))),
            h("h4", null, "I quit social media for 30 days. Here are 7 lessons that changed my life forever"),
            h("p", null, "Day 1 was hard. Day 30 was freedom. Lesson 1: your attention is your most valuable asset…"),
            h("div", { className: "rd-acts" }, h("span", null, "▲ 1.4k ▼"), h("span", null, "💬 312"), h("span", null, "Share"))),
          h("div", { className: "rd-thread" },
            h(C, { i: "jk", u: "jkessler", t: "5h", mop: "blue", v: 214, text: "The queue thing bit us too. We ended up with a per-tenant semaphore. Ugly, but it held." }),
            h("div", { className: "rd-mopped" }, h(DS.MopMark, { size: 13 }), h("span", null, "Mopped up a sloppy one"), h("u", null, "show")),
            h(C, { i: "mt", u: "mara_t", t: "4h", mop: "blue", d: 1, v: 88, text: "You moved the check, you didn't remove it; the risk just lives somewhere else now." }),
            h(C, { i: "id", u: "insights_daily", t: "2h", mop: "yellow", v: 3, text: "This. Absolutely this. Productivity is a journey, not a destination." }))),
        h("aside", { className: "rd-right" }, h("div", { className: "rd-card" }, h("span", { className: "band" }), h("b", null, "r/productivity"), h("small", null, "Tips, tools and honest write-ups. 3.1M members"), h("span", { className: "rd-join" }, "Join")))));
  }

  /* ---------------- Facebook: Hide mode, folded posts ---------------- */
  function Facebook() {
    function Post(p) {
      return h("article", { className: "fb-card fb-post" },
        h("header", null, Av({ t: p.i }), h("span", { className: "who" }, h("b", null, p.name), h("small", null, p.meta + " · 🌐")), Mop({ s: p.mop, hover: p.hover }), h("span", { className: "dots" }, "···")),
        h("p", null, p.text),
        h("div", { className: "fb-count" }, h("span", null, "👍❤️ " + p.re), h("span", null, p.c + " comments")),
        h("div", { className: "fb-acts" }, h("span", null, "Like"), h("span", null, "Comment"), h("span", null, "Share")));
    }
    return h("div", { className: "m-fb" },
      h("div", { className: "fb-top" }, h("span", { className: "fb-logo" }, "f"), h("span", { className: "fb-search" }, "Search Facebook"),
        h("span", { className: "fb-tabs" }, ["Home", "Video", "Marketplace", "Groups"].map(function (t, i) { return h("span", { key: t, className: i === 3 ? "on" : "" }, h("i")); }))),
      h("div", { className: "fb-main" },
        h("nav", { className: "fb-left" }, ["Alex Kim", "Friends", "Groups", "Marketplace", "Memories", "Saved"].map(function (t, i) { return h("span", { key: t }, Av({ t: t[0], size: 26 }), t); })),
        h("div", { className: "fb-feed" },
          h("div", { className: "fb-card fb-compose" }, Av({ t: "AK" }), h("span", null, "What's on your mind, Alex?")),
          h(Post, { i: "DK", name: "Dee Kowalski", meta: "Small Business Owners Network · 3h", mop: "unchecked", text: "Anyone know a good accountant near Tacoma who handles S-corps? Ours retired last month.", re: 6, c: 14 }),
          h(Strip, { tone: "red" }),
          h(Post, { i: "JL", name: "Jordan Lake", meta: "Small Business Owners Network · 4h", mop: "yellow", hover: true, text: "Running a business is a journey, not a destination. Some days are hard. Some days are harder.\n\nBut every single day is a gift. 🙏", re: 212, c: 31 }),
          h(Strip, { tone: "red" })),
        h("aside", { className: "fb-right" }, h("small", null, "Contacts"), ["Mia Chen", "Omar Haddad", "Lena Fischer", "Ravi Shah"].map(function (t) { return h("span", { key: t }, Av({ t: t[0], size: 26 }), t); }))));
  }

  /* ---------------- Substack: an article, verdict chip at the byline, panel open ---------------- */
  function Substack() {
    return h("div", { className: "m-ss" },
      h("div", { className: "ss-top" }, h("span", { className: "ss-pub" }, h("i"), "The Operator's Notebook"), h("span", { className: "ss-sub" }, "Subscribe"), h("span", { className: "ss-sign" }, "Sign in")),
      h("div", { className: "ss-main" },
        h("article", { className: "ss-article" },
          h("h3", null, "The Future of Work Is Here — And It's More Human Than Ever"),
          h("p", { className: "ss-dek" }, "Why the next decade belongs to leaders who lead with purpose"),
          h("div", { className: "ss-by" }, Av({ t: "JW", size: 34 }), h("span", null, h("b", null, "J. Writer"), h("small", null, "Oct 6, 2026 · 6 min read")), h(Chip, { tone: "red", label: "Likely slop", n: 78 })),
          h("div", { className: "ss-pills" }, h("span", null, "♡ 42"), h("span", null, "💬 9"), h("span", null, "↻ 3"), h("span", null, "Share")),
          h("p", null, "In an era of unprecedented change, organizations must navigate a complex landscape. It's not just about technology; it's about people, purpose and the profound journey ahead."),
          h("p", null, "Leadership has never been more important. Furthermore, the leaders who thrive will be those who embrace a delicate balance of vision and vulnerability…")),
        h("aside", { className: "ss-right" }, h(Panel, { verdict: "likely", score: 78, mode: "highlight", tells: { contrastFraming: 0.8, hypeMarketing: 0.72, manneredProse: 0.66, emptyEvaluation: 0.6, formalHedging: 0.5 }, humanVoice: 0.1, usefulness: 0.14, readerResponse: 0.2, community: { probably: 5, maybe: 1, no: 0 }, checksToday: { used: 12, limit: 250 } }))));
  }

  /* ---------------- Medium: article list, scored on demand ---------------- */
  function Medium() {
    function Row(p) {
      return h("div", { className: "md-row" },
        h("div", { className: "md-text" }, h("small", null, Av({ t: p.a[0], size: 20 }), "In ", h("b", null, p.pub), " by " + p.a),
          h("h4", null, p.t), h("p", null, p.s), h("div", { className: "md-meta" }, h("span", null, p.d), p.end)),
        h("span", { className: "md-thumb" }));
    }
    return h("div", { className: "m-md" },
      h("div", { className: "md-top" }, h("span", { className: "md-logo" }, "Medium"), h("span", { className: "md-search" }, "Search"), h("span", { className: "md-write" }, "✎ Write"), Av({ t: "AK", size: 30 })),
      h("div", { className: "md-main" },
        h("div", { className: "md-feed" },
          h("div", { className: "md-tabs" }, h("span", null, "For you"), h("span", null, "Following"), h("span", { className: "on" }, "Leadership")),
          h(Row, { a: "Ana Ruiz", pub: "City Lab Notes", t: "Inside the quiet rewrite of the city's bus network", s: "Three planners, 400 stops and one very long spreadsheet.", d: "Sep 30 · 9 min read", end: h("span", { className: "dim" }, Mop({ s: "unchecked" })) }),
          h(Row, { a: "Greg Tanner", pub: "Better Leaders", t: "7 Mindset Shifts That Will Revolutionize How You Lead", s: "Number 4 changed everything for me.", d: "Oct 2 · 5 min read", end: h(Chip, { tone: "red", label: "Likely slop", n: 81 }) }),
          h(Row, { a: "Ken Osei", pub: "Trade Desk", t: "Why the new tariff schedule matters for small importers", s: "What changed on October 1, with the numbers.", d: "Oct 3 · 7 min read", end: Mop({ s: "blue" }) }),
          h(Row, { a: "Dana Whitfield", pub: "The Exec Brief", t: "We asked 5 CEOs about AI. Their answers will surprise you", s: "The future is closer than you think.", d: "Oct 4 · 4 min read", end: h(Chip, { tone: "yellow", label: "Possibly slop", n: 57 }) })),
        h("aside", { className: "md-right" }, h("b", null, "Staff Picks"), ["How we cut our cloud bill in half", "A field guide to writing plainly", "The case for boring software"].map(function (t) { return h("span", { key: t }, t); }),
          h("p", { className: "mono" }, "hover a row · click its mop to score it"))));
  }

  /* ---------------- Email: inbox list, slop rows go quiet ---------------- */
  function Email() {
    function Row(p) {
      return h("div", { className: "em-row" + (p.unread ? " unread" : "") + (p.quiet ? " quiet" : "") },
        h("i", { className: "cb" }), h("span", { className: "star" }, "☆"), h("span", { className: "from" }, p.from),
        h("span", { className: "subj" }, p.mop ? Mop({ s: p.mop }) : null, h("b", null, p.subj), h("span", null, " — " + p.snip)), h("span", { className: "when" }, p.t));
    }
    return h("div", { className: "m-em" },
      h("div", { className: "em-top" }, h("span", { className: "em-burger" }, "☰"), h("span", { className: "em-logo" }, h("img", { src: "assets/logos/gmail.svg", alt: "" }), "Mail"), h("span", { className: "em-search" }, "Search mail"), Av({ t: "AK", size: 30 })),
      h("div", { className: "em-main" },
        h("nav", { className: "em-nav" }, h("span", { className: "em-compose" }, "✎ Compose"), [["Inbox", "12"], ["Starred", ""], ["Snoozed", ""], ["Sent", ""], ["Drafts", "3"]].map(function (x, i) { return h("span", { key: x[0], className: i === 0 ? "on" : "" }, x[0], h("small", null, x[1])); })),
        h("div", { className: "em-list" },
          h("div", { className: "em-tabs" }, h("span", { className: "on" }, "Primary"), h("span", null, "Promotions"), h("span", null, "Updates")),
          h(Row, { from: "Priya Raman", subj: "Re: fraud check latency numbers", snip: "Attached the p95 before and after. The drop is real.", t: "10:42", mop: "blue", unread: true }),
          h(Row, { from: "Northbeam Labs", subj: "🚀 Unlock your team's full potential this quarter", snip: "Elevate your workflow with our game-changing…", t: "9:15", mop: "red", quiet: true }),
          h(Row, { from: "Ken Osei", subj: "Invoice 2026-118", snip: "Two line items changed since last month, notes inline.", t: "8:58", mop: "blue", unread: true }),
          h(Row, { from: "The Weekly Leader", subj: "5 things top performers never say", snip: "Number 3 will surprise you…", t: "Oct 8", mop: "yellow", quiet: true }),
          h(Row, { from: "Mia Chen", subj: "Lunch Thursday?", snip: "The place by the station, 12:30?", t: "Oct 8", mop: "blue" }),
          h(Row, { from: "Growth Weekly", subj: "This one habit changed everything", snip: "Read that again. Then read it one more time.", t: "Oct 7", mop: "red", quiet: true }))));
  }

  /* ---------------- Websites: search results with Mess Index + the popup's site score ---------------- */
  function Websites() {
    function Mess(p) { return h("span", { className: "mess " + p.tone }, h("b", null, p.n), "Mess Index"); }
    function Res(p) {
      return h("div", { className: "ws-res" },
        h("div", { className: "ws-site" }, h(Mess, { n: p.n, tone: p.tone }), h("i"), h("span", null, p.site)),
        h("a", null, p.title), h("p", null, p.snip));
    }
    return h("div", { className: "m-ws" },
      h("div", { className: "ws-top" }, h("span", { className: "ws-logo" }, "search"), h("span", { className: "ws-q" }, "leadership tips for new managers"),
        h("span", { className: "ws-tabs" }, h("span", { className: "on" }, "All"), h("span", null, "News"), h("span", null, "Images"), h("span", null, "Videos"))),
      h("div", { className: "ws-main" },
        h("div", { className: "ws-results" },
          h(Res, { n: 82, tone: "red", site: "northbeam.io › blog › leadership", title: "10 Game-Changing Leadership Lessons That Will Transform Your Team", snip: "In today's fast-paced world, leadership is more important than ever. Unlock your potential with these…" }),
          h(Res, { n: 11, tone: "blue", site: "martinfowler.com › articles › patterns", title: "Patterns of Distributed Systems", snip: "A collection of patterns from mainstream open source distributed systems, with the code that…" }),
          h(Res, { n: 46, tone: "yellow", site: "hbr.org › 2026 › 09 › managing-up", title: "How to Manage Up Without Managing Out", snip: "Most advice on managing up assumes your boss wants to be managed. Here's what to do when…" })),
        h("aside", { className: "ws-right" },
          h("div", { className: "ws-pop" },
            h("div", { className: "ws-pop-head" }, h("img", { src: "assets/img/mark.svg", alt: "" }), h("b", null, "Slop Mop")),
            h("div", { className: "ws-pop-body" },
              h("div", { className: "ws-pop-row" }, h("small", null, "THIS SITE"), h("span", { className: "mono" }, "northbeam.io")),
              h("div", { className: "ws-pop-row" }, h(Mess, { n: 82, tone: "red" }), h("small", null, "across 1,240 pages checked")),
              h("span", { className: "ws-bar" }, h("i", { style: { left: "82%" } })))),
          h("p", { className: "mono" }, "a site gets a mess index · a page gets a verdict"))));
  }

  window.SlopMopSites = {
    linkedin: { url: "linkedin.com/feed", live: true, render: LinkedIn },
    x: { url: "x.com/home", render: X },
    reddit: { url: "reddit.com/r/productivity", render: Reddit },
    facebook: { url: "facebook.com/groups/small-business", render: Facebook },
    substack: { url: "theoperatorsnotebook.substack.com/p/future-of-work", render: Substack },
    medium: { url: "medium.com/tag/leadership", render: Medium },
    email: { url: "mail.google.com/mail/u/0/#inbox", render: Email, logo: "email" },
    websites: { url: "search.example/?q=leadership+tips", render: Websites, logo: "web" }
  };
  window.SlopMopSiteOrder = ["linkedin", "x", "reddit", "facebook", "substack", "medium", "email", "websites"];
})();
