/* slopmop.lol — mounts live design-system components into static pages.
   Markup: <div data-island="Name" data-props='{"json":"props"}'></div>. Plain React.createElement, no build step. */
(function () {
  var DS = window.SlopMopDesignSystem_ca9143;
  if (!window.React || !window.ReactDOM || !DS) return;
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect;

  /* ---------- small stateful wrappers ---------- */
  function Vote(p) { var s = useState(p.value === undefined ? null : p.value); return h(DS.VoteControl, Object.assign({}, p, { value: s[0], onChange: s[1] })); }
  function Sensitivity(p) { var s = useState(p.value || "moderate"); return h(DS.SensitivityToggle, Object.assign({}, p, { value: s[0], onChange: s[1] })); }
  function Mode(p) {
    var s = useState(p.value || "hide");
    return h(DS.SegmentedControl, { value: s[0], onChange: s[1], options: [{ value: "hide", label: "Hide", icon: "eye-off" }, { value: "highlight", label: "Highlight", icon: "flag" }] });
  }
  function Why(p) { var s = useState(p.vote === undefined ? null : p.vote); return h(DS.WhyCard, Object.assign({}, p, { vote: s[0], onVote: s[1] })); }
  function Scaled(p) { /* render a fixed-size component at a fraction, reserving the scaled box */
    return h("div", { style: { width: p.w * p.k, height: p.h * p.k, overflow: "hidden", position: "relative" } },
      h("div", { style: { width: p.w, transform: "scale(" + p.k + ")", transformOrigin: "top left", position: "absolute", left: 0, top: 0 } }, p.children));
  }
  function MopRow() {
    return h("div", { style: { display: "grid", gap: 14, justifyItems: "center" } },
      h("div", { style: { display: "flex", gap: 14, alignItems: "center" } },
        ["unchecked", "blue", "yellow", "red", "disabled"].map(function (s) { return h(DS.MopIcon, { key: s, state: s, label: s }); })),
      h("div", { style: { display: "flex", gap: 18, alignItems: "center" } },
        h(DS.MopIcon, { surface: "toolbar", state: "red", count: 9, label: "toolbar" }),
        h("span", { className: "mono", style: { fontSize: 10 } }, "toolbar · 9 hidden today")));
  }
  function Tiles() {
    return h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 96px)", gap: 8 } },
      h(DS.StatTile, { label: "Today", value: 17, sub: "4 flagged" }),
      h(DS.StatTile, { label: "Week", value: 86, tone: "warn" }),
      h(DS.StatTile, { label: "Month", value: 341, tone: "danger" }));
  }
  function Verdicts() {
    return h("div", { style: { display: "grid", gap: 10, justifyItems: "start" } },
      h(DS.Badge, { tone: "danger" }, "Likely slop"), h(DS.Badge, { tone: "warn" }, "Possibly slop"),
      h(DS.Badge, { tone: "unsure" }, "Not sure"), h(DS.Badge, { tone: "clean" }, "Looks fine"));
  }
  function Mark() { return h("div", { style: { display: "grid", justifyItems: "center", gap: 14 } }, h(DS.MopMark, { size: 72 }), h(DS.Wordmark, { size: 22, showDot: true })); }
  function Popup() {
    var s = useState({ enabled: true, mode: "hide", sensitivity: "moderate", hidden: { today: 17, week: 86, month: 341, total: 2904 }, flagged: { today: 0, total: 0 }, usage: { state: "ok", used: 138, limit: 250, resets: "12:00 AM" }, folded: { sens: true, mopped: true } });
    return window.Popup ? h(window.Popup, { state: s[0], set: function (p) { s[1](function (x) { return Object.assign({}, x, p); }); } }) : null;
  }
  function PanelPeek(p) { return h(Scaled, { w: 340, h: p.h || 330, k: p.k || 0.72 }, h(DS.WhyCard, p.card)); }

  /* ---------- hero: Slop Mop on each network ---------- */
  function Post(p) {
    return h("article", { className: "post " + (p.skin || "") },
      h("div", { className: "post-head" },
        p.vote ? h("div", { className: "vote" }, "▲", h("span", null, p.vote), "▼") : null,
        h("span", { className: "avatar", "aria-hidden": "true" }, p.initials),
        h("span", { className: "post-who" }, h("span", { className: "post-name" }, p.name), h("span", { className: "post-meta" }, p.meta)),
        h("span", { className: "post-tools" }, p.mop ? h(DS.MopIcon, { state: p.mop, hover: p.hover, label: "Is this post slop?" }) : null, h("span", { "aria-hidden": "true" }, "···"))),
      p.title ? h("p", { className: "post-title" }, p.title) : null,
      h("p", { className: "post-body", style: { margin: 0 } }, p.body),
      p.foot ? h("div", { className: "post-foot" }, p.foot.map(function (f, i) { return h("span", { key: i }, f); })) : null);
  }
  function Strip(p) { return h(DS.FoldStrip, { tone: p.tone, density: "minimal", label: "This post was hidden" }); }

  var NETS = {
    linkedin: { url: "linkedin.com/feed", live: true, feed: function () { return [
        h(Post, { key: 1, initials: "PR", name: "Priya Raman", meta: "Staff engineer, payments · 5h", mop: "unchecked",
          body: "We shaved 400ms off checkout by moving the fraud check off the critical path. Took three weeks, two of them arguing about it.", foot: ["88 reactions", "14 comments"] }),
        h(Strip, { key: 2, tone: "red" }),
        h(Post, { key: 3, initials: "MB", name: "Marcus Bell", meta: "Helping B2B leaders unlock growth · 7h", mop: "yellow", hover: true,
          body: "Most teams don't have a strategy problem. They have a clarity problem.\n\nComment YES if this resonates.", foot: ["1,204 reactions", "240 comments"] }),
        h(Strip, { key: 4, tone: "red" }), h(Strip, { key: 5, tone: "yellow" }) ]; },
      panel: { verdict: "possibly", score: 61, mode: "hide", tells: { emptyEvaluation: 0.74, engagementBait: 0.68, contrastFraming: 0.52, formulaicHook: 0.4 }, humanVoice: 0.21, usefulness: 0.09, readerResponse: 0.71, community: { probably: 9, maybe: 4, no: 1 }, checksToday: { used: 41, limit: 250 } } },
    x: { url: "x.com/home", feed: function () { return [
        h(Post, { key: 1, skin: "x", initials: "NP", name: "Nina Park", meta: "@ninabuilds · 1h", mop: "unchecked",
          body: "Shipped the export fix. The bug was a timezone, as it always is. Writing up the test that would have caught it.", foot: ["12 replies", "4 reposts", "96 likes"] }),
        h(Strip, { key: 2, tone: "red" }),
        h(Post, { key: 3, skin: "x", initials: "GG", name: "Growth Guru", meta: "@growthguru · 2h", mop: "yellow", hover: true,
          body: "9 AI tools that will 10x your productivity.\n\nMost people don't know #4.\n\nBookmark this. 🧵", foot: ["88 replies", "410 reposts", "2.1K likes"] }),
        h(Strip, { key: 4, tone: "red" }) ]; },
      panel: { verdict: "possibly", score: 66, mode: "hide", tells: { hypeMarketing: 0.78, engagementBait: 0.7, formulaicHook: 0.55, tradeoffFreePromises: 0.42 }, humanVoice: 0.18, usefulness: 0.12, readerResponse: 0.64, community: { probably: 6, maybe: 3, no: 1 }, checksToday: { used: 63, limit: 250 } } },
    reddit: { url: "reddit.com/r/productivity", feed: function () { return [
        h(Post, { key: 1, skin: "reddit", vote: "1.4k", initials: "r/", name: "r/productivity", meta: "u/quietlist · 6h", mop: "yellow", hover: true,
          title: "I quit social media for 30 days. Here are 7 lessons that changed my life forever",
          body: "Day 1 was hard. Day 30 was freedom. Lesson 1: your attention is your most valuable asset…", foot: ["312 comments", "Share"] }),
        h(Strip, { key: 2, tone: "red" }),
        h(Post, { key: 3, skin: "reddit", vote: "86", initials: "r/", name: "r/android", meta: "u/tmb_88 · 9h", mop: "unchecked",
          title: "PSA: Focus mode silences alarms too", body: "Found out the hard way this morning. Settings → Digital Wellbeing → Focus mode → allow alarms.", foot: ["41 comments", "Share"] }) ]; },
      panel: { verdict: "possibly", score: 64, mode: "hide", tells: { manufacturedNarrative: 0.72, hypeMarketing: 0.5, formulaicHook: 0.52, emptyEvaluation: 0.45 }, humanVoice: 0.33, usefulness: 0.2, readerResponse: 0.58, community: { probably: 4, maybe: 5, no: 2 }, checksToday: { used: 88, limit: 250 } } },
    facebook: { url: "facebook.com/groups/small-business", feed: function () { return [
        h(Post, { key: 1, initials: "DK", name: "Dee Kowalski", meta: "Small Business Owners Network · 3h", mop: "unchecked",
          body: "Anyone know a good accountant near Tacoma who handles S-corps? Ours retired last month.", foot: ["14 comments"] }),
        h(Post, { key: 2, initials: "JL", name: "Jordan Lake", meta: "Small Business Owners Network · 4h", mop: "yellow", hover: true,
          body: "Running a business is a journey, not a destination. Some days are hard. Some days are harder.\n\nBut every single day is a gift. 🙏", foot: ["212 reactions", "31 comments"] }),
        h(Strip, { key: 3, tone: "red" }), h(Strip, { key: 4, tone: "red" }) ]; },
      panel: { verdict: "possibly", score: 58, mode: "hide", tells: { manneredProse: 0.62, contrastFraming: 0.55, emptyEvaluation: 0.5 }, humanVoice: 0.4, usefulness: 0.05, readerResponse: 0.52, community: { probably: 3, maybe: 3, no: 2 }, checksToday: { used: 22, limit: 250 } } },
    substack: { url: "theoperatorsnotebook.substack.com", feed: function () { return [
        h("article", { key: 1, className: "post article" },
          h("div", { className: "kicker" }, "Opinion · Work"),
          h("p", { className: "post-title" }, "The Future of Work Is Here — And It's More Human Than Ever"),
          h("div", { className: "byline" }, h("span", { className: "avatar" }, "JW"), "By J. Writer · 6 min read",
            h("span", { className: "vchip red" }, h(DS.MopMark, { size: 12 }), "Likely slop", h("b", null, "78"))),
          h("p", { className: "post-body", style: { margin: 0 } }, "In an era of unprecedented change, organizations must navigate a complex landscape. It's not just about technology; it's about people, purpose and the profound journey ahead…")) ]; },
      panel: { verdict: "likely", score: 78, mode: "highlight", tells: { contrastFraming: 0.8, hypeMarketing: 0.72, manneredProse: 0.66, emptyEvaluation: 0.6 }, humanVoice: 0.1, usefulness: 0.14, readerResponse: 0.2, community: { probably: 5, maybe: 1, no: 0 }, checksToday: { used: 12, limit: 250 } } },
    medium: { url: "medium.com/tag/leadership", feed: function () {
        function row(k, t, end) { return h("div", { key: k, className: "row" }, h("span", { className: "thumb" }), h("span", null, t), end); }
        return [h("div", { key: 1, className: "post" },
          h("div", { className: "kicker mono", style: { marginBottom: 6 } }, "hover a row · click its mop to score it"),
          h("div", { className: "rowlist" },
            row(1, "Inside the quiet rewrite of the city's bus network", h("span", { className: "dim" }, h(DS.MopIcon, { state: "unchecked" }))),
            row(2, "7 Mindset Shifts That Will Revolutionize How You Lead", h("span", { className: "vchip red" }, h(DS.MopMark, { size: 12 }), "Likely slop", h("b", null, "81"))),
            row(3, "Why the new tariff schedule matters for small importers", h(DS.MopIcon, { state: "blue" })),
            row(4, "We asked 5 CEOs about AI. Their answers will surprise you", h("span", { className: "vchip yellow" }, h(DS.MopMark, { size: 12 }), "Possibly slop", h("b", null, "57")))))]; },
      panel: { verdict: "likely", score: 81, mode: "highlight", tells: { hypeMarketing: 0.84, formulaicHook: 0.7, tradeoffFreePromises: 0.6, emptyEvaluation: 0.55 }, humanVoice: 0.08, usefulness: 0.1, readerResponse: 0.3, community: null, checksToday: { used: 30, limit: 250 } } }
  };
  var ORDER = ["linkedin", "x", "reddit", "facebook", "substack", "medium"];

  function Win(p) {
    var n = NETS[p.net];
    return h("div", { className: "win " + p.cls, "aria-hidden": p.cls === "front" ? null : "true" },
      h("div", { className: "win-bar" },
        h("span", { className: "win-dots" }, h("i"), h("i"), h("i")),
        h("span", { className: "win-url" }, h("img", { src: "assets/logos/" + p.net + ".svg", alt: "" }), n.url),
        n.live ? null : h("span", { className: "badge badge-soon" }, "coming soon"),
        h("span", { className: "win-ext" }, h(DS.MopIcon, { surface: "toolbar", state: "red", count: 9, label: "Slop Mop" }))),
      p.cls === "front" ? h("div", { className: "win-body" },
        h("div", { className: "win-feed" }, n.feed()),
        h("div", { className: "win-panel" }, h(Why, Object.assign({ key: p.net, interactive: true }, n.panel)))) : h("div", { style: { height: 480 } }),
      null);
  }
  function NetworkStack(p) {
    var s = useState(p.start || "linkedin"), net = s[0];
    useEffect(function () {
      function on(e) { s[1](e.detail.net); }
      document.addEventListener("slopmop:network", on);
      return function () { document.removeEventListener("slopmop:network", on); };
    }, []);
    var i = ORDER.indexOf(net);
    return h(React.Fragment, null,
      h(Win, { key: "b2", net: ORDER[(i + 2) % 6], cls: "back-2" }),
      h(Win, { key: "b1", net: ORDER[(i + 1) % 6], cls: "back-1" }),
      h(Win, { key: "f", net: net, cls: "front" }));
  }

  /* ---------- the nine tells ---------- */
  var TELLS = [
    { id: "formulaicHook", label: "Scroll-stopper", who: "Greg Tanner", meta: "Sales leader | Speaker", body: [["My 4 year old taught me more about closing than any sales trainer ever did.", ""], ["", "\n\nShe asked for ice cream.\n\nI said no.\n\nShe asked again.\n\n"], ["Read that again.", ""]] },
    { id: "engagementBait", label: "Engagement bait", who: "Marcus Bell", meta: "Helping B2B leaders unlock growth", body: [["", "Strategy without clarity is noise.\nClarity without execution is theater.\n\n"], ["Comment YES if this resonates. Agree? 👇", ""]] },
    { id: "hypeMarketing", label: "Hype words", who: "Avery Stone", meta: "Founder, Northbeam Labs", body: [["", "Our new platform will "], ["unlock a paradigm shift", ""], ["", " in how teams "], ["elevate", ""], ["", " their "], ["game-changing", ""], ["", " potential."]] },
    { id: "emptyEvaluation", label: "Empty praise", who: "Jamie Cole", meta: "Community lead", body: [["", "Just wrapped an "], ["incredibly meaningful, truly profound", ""], ["", " offsite. "], ["So much value.", ""], ["", " Grateful."]] },
    { id: "tradeoffFreePromises", label: "No-catch promises", who: "Rae Patel", meta: "Growth coach", body: [["", "Double your pipeline "], ["without sacrificing a single hour", ""], ["", " of your week. "], ["Zero risk, all upside.", ""]] },
    { id: "contrastFraming", label: "“Not X, but Y”", who: "Dana Whitfield", meta: "Founder & CEO", body: [["", "Leadership "], ["isn't about having the answers. It's about", ""], ["", " asking better questions. "], ["It's not a job — it's a calling.", ""]] },
    { id: "manneredProse", label: "Flowery prose", who: "Jordan Lake", meta: "Brand storyteller", body: [["", "Leadership is "], ["a delicate dance between vision and vulnerability", ""], ["", ", "], ["a tapestry woven", ""], ["", " from quiet moments."]] },
    { id: "formalHedging", label: "Stiff phrasing", who: "Sam Ortiz", meta: "Operations", body: [["Furthermore,", ""], ["", " the revised process "], ["may provide", ""], ["", " additional value "], ["in terms of", ""], ["", " overall efficiency."]] },
    { id: "manufacturedNarrative", label: "Too-tidy story", who: "Greg Tanner", meta: "Sales leader | Speaker", body: [["", "A janitor stopped me in the lobby yesterday.\n\n"], ["What he said next changed how I lead forever.", ""], ["", "\n\nThe lesson? Everyone is a teacher."]] }
  ];
  function TellCard() {
    var s = useState(0), idx = s[0], t = TELLS[idx];
    useEffect(function () {
      function on(e) { s[1](e.detail.index); }
      document.addEventListener("slopmop:tell", on);
      return function () { document.removeEventListener("slopmop:tell", on); };
    }, []);
    var vals = {}; TELLS.forEach(function (x, k) { vals[x.id] = k === idx ? 0.92 : 0.12 + ((k * 7) % 5) * 0.04; });
    return h("div", { className: "tell-card-top" },
      h("div", { className: "tell-sample" },
        h("article", { className: "post" },
          h("div", { className: "post-head" }, h("span", { className: "avatar" }, t.who.split(" ").map(function (w) { return w[0]; }).join("")),
            h("span", { className: "post-who" }, h("span", { className: "post-name" }, t.who), h("span", { className: "post-meta" }, t.meta)),
            h("span", { className: "post-tools" }, h(DS.MopIcon, { state: "yellow", label: "Is this post slop?" }))),
          h("p", { className: "post-body", style: { margin: 0 } }, t.body.map(function (seg, k) { return seg[0] ? h("mark", { key: k }, seg[0]) : seg[1]; }))),
        h("span", { className: "mono" }, "marked: what Jev weighs for “" + t.label.replace(/[“”]/g, "") + "”")),
      h("div", { className: "tell-print" }, h(DS.Slopprint, { values: vals, highlight: [t.label], color: "var(--mop-500)", width: 230 })));
  }

  var REG = {
    FoldStrip: DS.FoldStrip, ScoreZones: DS.ScoreZones, Slopprint: DS.Slopprint, NoticePanel: DS.NoticePanel, MopIcon: DS.MopIcon, Badge: DS.Badge,
    WhyCard: Why, Vote: Vote, Sensitivity: Sensitivity, Mode: Mode, MopRow: MopRow, Tiles: Tiles, Verdicts: Verdicts, Mark: Mark, Popup: Popup, PanelPeek: PanelPeek,
    NetworkStack: NetworkStack, TellCard: TellCard
  };
  var nodes = document.querySelectorAll("[data-island]");
  Array.prototype.forEach.call(nodes, function (el) {
    var C = REG[el.getAttribute("data-island")]; if (!C) return;
    var props = {}; try { props = JSON.parse(el.getAttribute("data-props") || "{}"); } catch (e) {}
    try { ReactDOM.createRoot(el).render(h(C, props)); } catch (e) { if (window.console) console.warn("island", el.getAttribute("data-island"), e); }
  });
  setTimeout(function () { document.dispatchEvent(new CustomEvent("slopmop:islands")); }, 200);
})();
