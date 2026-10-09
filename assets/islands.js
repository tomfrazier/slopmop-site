/* slopmop.lol — mounts live design-system components into static pages.
   Markup: <div data-island="Name" data-props='{"json":"props"}'></div>. Plain React.createElement, no build step. */
(function () {
  var DS = window.SlopMopDesignSystem_ca9143;
  if (!window.React || !window.ReactDOM || !DS) return;
  var h = React.createElement, useState = React.useState, useEffect = React.useEffect;

  /* ---------- small stateful wrappers ---------- */
  function Vote(p) { var s = useState(p.value === undefined ? null : p.value); return h(DS.VoteControl, Object.assign({}, p, { value: s[0], onChange: s[1] })); }
  function Sensitivity(p) { var s = useState(p.value || "moderate"); return h("div", { className: "sens-wrap" }, h(DS.SensitivityToggle, Object.assign({}, p, { value: s[0], onChange: s[1] }))); }
  function Mode(p) {
    var s = useState(p.value || "hide");
    return h("div", { className: "sens-wrap" }, h(DS.SegmentedControl, { value: s[0], onChange: s[1], options: [{ value: "hide", label: "Hide", icon: "eye-off" }, { value: "highlight", label: "Highlight", icon: "flag" }] }));
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
  function PopupLite() {
    var on = useState(true), m = useState("hide"), sv = useState("moderate");
    var row = { padding: "12px 16px", borderBottom: "1px solid var(--border-hairline)", display: "grid", gap: 10 };
    var lab = { font: "var(--type-mono-label)", letterSpacing: "var(--tracking-caps)", color: "var(--text-faint)", textTransform: "lowercase" };
    return h("div", { style: { width: 360, background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)", overflow: "hidden", font: "var(--type-body-sm)", color: "var(--text-body)" } },
      h("div", { style: Object.assign({}, row, { display: "flex", alignItems: "center", justifyContent: "space-between" }) }, h(DS.Wordmark, { size: 16 }), h(DS.Switch, { checked: on[0], onChange: on[1] })),
      h("div", { style: row }, h("span", { style: lab }, "mode"), h(DS.SegmentedControl, { value: m[0], onChange: m[1], options: [{ value: "hide", label: "Hide", icon: "eye-off" }, { value: "highlight", label: "Highlight", icon: "flag" }] })),
      h("div", { style: row }, h("span", { style: lab }, "sensitivity"), h(DS.SensitivityToggle, { value: sv[0], onChange: sv[1], showThreshold: false })),
      h("div", { style: Object.assign({}, row, { borderBottom: 0 }) }, h("span", { style: lab }, "hidden"),
        h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 } }, h(DS.StatTile, { label: "Today", value: 17 }), h(DS.StatTile, { label: "Week", value: 86 }), h(DS.StatTile, { label: "Month", value: 341 }))));
  }
  function PanelPeek(p) { return h(Scaled, { w: 340, h: p.h || 330, k: p.k || 0.72 }, h(DS.WhyCard, p.card)); }

  var SITES = window.SlopMopSites || {}, ORDER = window.SlopMopSiteOrder || [];
  function Win(p) {
    var n = SITES[p.net]; if (!n) return null;
    var logo = n.logo || p.net;
    return h("div", { className: "win " + p.cls, "aria-hidden": p.cls === "front" ? null : "true" },
      h("div", { className: "win-bar" },
        h("span", { className: "win-dots" }, h("i"), h("i"), h("i")),
        h("span", { className: "win-url" }, h("img", { src: "assets/logos/" + logo + ".svg", alt: "" }), n.url),
        n.live ? null : h("span", { className: "badge badge-soon" }, "coming soon"),
        h("span", { className: "win-ext" }, h(DS.MopIcon, { surface: "toolbar", state: "red", count: 9, label: "Slop Mop" }))),
      p.cls === "front" ? h("div", { className: "win-body mock" }, h(n.render)) : h("div", { style: { height: 480 } }));
  }
  function NetworkStack(p) {
    var s = useState(p.start || "linkedin"), net = s[0];
    useEffect(function () {
      function on(e) { s[1](e.detail.net); }
      document.addEventListener("slopmop:network", on);
      return function () { document.removeEventListener("slopmop:network", on); };
    }, []);
    var i = ORDER.indexOf(net), L = ORDER.length;
    return h(React.Fragment, null,
      h(Win, { key: "b2", net: ORDER[(i + 2) % L], cls: "back-2" }),
      h(Win, { key: "b1", net: ORDER[(i + 1) % L], cls: "back-1" }),
      h(Win, { key: "f", net: net, cls: "front" }));
  }

  /* ---------- the nine tells ---------- */
  /* tone: the verdict the whole post got. A blue one shows that a single tell on its own isn't enough. */
  var TELLS = [
    { id: "formulaicHook", label: "Scroll-stopper", tone: "red", score: 84, also: ["engagementBait", "manufacturedNarrative"], who: "Greg Tanner", meta: "Sales leader | Speaker", body: [["My 4 year old taught me more about closing than any sales trainer ever did.", ""], ["", "\n\nShe asked for ice cream.\n\nI said no.\n\nShe asked again.\n\n"], ["Read that again.", ""]] },
    { id: "engagementBait", label: "Engagement bait", tone: "red", score: 78, also: ["formulaicHook", "contrastFraming"], who: "Marcus Bell", meta: "Helping B2B leaders unlock growth", body: [["", "Strategy without clarity is noise.\nClarity without execution is theater.\n\n"], ["Comment YES if this resonates. Agree? 👇", ""]] },
    { id: "hypeMarketing", label: "Hype words", tone: "yellow", score: 61, also: ["tradeoffFreePromises"], who: "Avery Stone", meta: "Founder, Northbeam Labs", body: [["", "Our new platform will "], ["unlock a paradigm shift", ""], ["", " in how teams "], ["elevate", ""], ["", " their "], ["game-changing", ""], ["", " potential."]] },
    { id: "emptyEvaluation", label: "Empty praise", tone: "blue", score: 22, also: [], who: "Jamie Cole", meta: "Community lead", body: [["", "Just wrapped our offsite. "], ["Truly meaningful.", ""], ["", " We cut the roadmap from 14 bets to 5 and gave each one an owner and a date."]] },
    { id: "tradeoffFreePromises", label: "No-catch promises", tone: "yellow", score: 55, also: ["hypeMarketing"], who: "Rae Patel", meta: "Growth coach", body: [["", "Double your pipeline "], ["without sacrificing a single hour", ""], ["", " of your week. "], ["Zero risk, all upside.", ""]] },
    { id: "contrastFraming", label: "“Not X, but Y”", tone: "red", score: 72, also: ["manneredProse", "emptyEvaluation"], who: "Dana Whitfield", meta: "Founder & CEO", body: [["", "Leadership "], ["isn't about having the answers. It's about", ""], ["", " asking better questions. "], ["It's not a job — it's a calling.", ""]] },
    { id: "manneredProse", label: "Flowery prose", tone: "blue", score: 28, also: [], who: "Ellen Okafor", meta: "Designer", body: [["", "Redrew the same icon 40 times on Saturday. "], ["A quiet dance of curves and doubt.", ""], ["", " Posting #37 anyway, the one with the thicker stroke."]] },
    { id: "formalHedging", label: "Stiff phrasing", tone: "yellow", score: 47, also: ["emptyEvaluation"], who: "Sam Ortiz", meta: "Operations", body: [["Furthermore,", ""], ["", " the revised process "], ["may provide", ""], ["", " additional value "], ["in terms of", ""], ["", " overall efficiency."]] },
    { id: "manufacturedNarrative", label: "Too-tidy story", tone: "red", score: 81, also: ["formulaicHook", "emptyEvaluation"], who: "Greg Tanner", meta: "Sales leader | Speaker", body: [["", "A janitor stopped me in the lobby yesterday.\n\n"], ["What he said next changed how I lead forever.", ""], ["", "\n\nThe lesson? Everyone is a teacher."]] }
  ];
  var TONE_MOP = { red: "red", yellow: "yellow", blue: "blue" }, TONE_COLOR = { red: "var(--red-500)", yellow: "var(--mop-500)", blue: "var(--blue-500)" };
  var TONE_BADGE = { red: ["danger", "Likely slop"], yellow: ["warn", "Possibly slop"], blue: ["clean", "Looks fine"] };
  var TONE_NOTE = { red: "several tells at once, so it folds away", yellow: "some tells, not clear-cut, so it stays visible", blue: "one tell on its own isn't enough: the rest reads fine" };
  function TellCard() {
    var s = useState(0), idx = s[0], t = TELLS[idx];
    useEffect(function () {
      function on(e) { s[1](e.detail.index); }
      document.addEventListener("slopmop:tell", on);
      return function () { document.removeEventListener("slopmop:tell", on); };
    }, []);
    var vals = {}; TELLS.forEach(function (x) { vals[x.id] = t.tone === "blue" ? 0.06 : 0.12; });
    t.also.forEach(function (id, k) { vals[id] = t.tone === "red" ? 0.6 - k * 0.05 : 0.42; });
    vals[t.id] = t.tone === "blue" ? 0.7 : 0.92;
    var b = TONE_BADGE[t.tone];
    return h("div", { className: "tell-card-top" },
      h("div", { className: "tell-sample" },
        h("article", { className: "post" },
          h("div", { className: "post-head" }, h("span", { className: "avatar" }, t.who.split(" ").map(function (w) { return w[0]; }).join("")),
            h("span", { className: "post-who" }, h("span", { className: "post-name" }, t.who), h("span", { className: "post-meta" }, t.meta)),
            h("span", { className: "post-tools" }, h(DS.MopIcon, { state: TONE_MOP[t.tone], label: "Is this post slop?" }))),
          h("p", { className: "post-body", style: { margin: 0 } }, t.body.map(function (seg, k) { return seg[0] ? h("mark", { key: k, className: "t-" + t.tone }, seg[0]) : seg[1]; }))),
        h("div", { className: "tell-verdict" }, h(DS.Badge, { tone: b[0] }, b[1]), h("span", { className: "mono" }, t.score + " / 100 · " + TONE_NOTE[t.tone]))),
      h("div", { className: "tell-print" }, h(DS.Slopprint, { values: vals, highlight: [t.label], color: TONE_COLOR[t.tone], width: 230 })));
  }


  /* ---------- how it works: three example posts and their panels ---------- */
  var EXAMPLES = [
    { key: "likely", label: "Likely slop", who: "Greg Tanner", meta: "Sales leader | Speaker · 11h", mop: "red",
      body: "My 4 year old taught me more about closing than any sales trainer ever did.\n\nShe asked for ice cream. I said no. She asked again.\n\nRead that again.\n\nWho needed to hear this today? 👇",
      card: { verdict: "likely", score: 84, mode: "hide", tells: { formulaicHook: 0.91, engagementBait: 0.77, manufacturedNarrative: 0.64, contrastFraming: 0.58, hypeMarketing: 0.2 }, humanVoice: 0.44, usefulness: 0.08, readerResponse: 0.18, community: { probably: 14, maybe: 2, no: 0 }, checksToday: { used: 41, limit: 250 } } },
    { key: "possibly", label: "Possibly slop", who: "Marcus Bell", meta: "Helping B2B leaders unlock growth · 7h", mop: "yellow",
      body: "Most teams don't have a strategy problem. They have a clarity problem.\n\nStrategy without clarity is noise.\n\nComment YES if this resonates.",
      card: { verdict: "possibly", score: 61, mode: "hide", tells: { emptyEvaluation: 0.74, engagementBait: 0.68, contrastFraming: 0.52, formulaicHook: 0.4 }, humanVoice: 0.21, usefulness: 0.09, readerResponse: 0.71, community: { probably: 9, maybe: 4, no: 1 }, checksToday: { used: 42, limit: 250 } } },
    { key: "fine", label: "Looks fine", who: "Priya Raman", meta: "Staff engineer, payments · 5h", mop: "blue",
      body: "We shaved 400ms off checkout by moving the fraud check off the critical path. Took three weeks, two of them arguing about it. Writeup in comments: the boring part (queue backpressure) is the part that mattered.",
      card: { verdict: "fine", score: 12, mode: "hide", tells: { formalHedging: 0.22 }, humanVoice: 0.74, usefulness: 0.81, readerResponse: 0.22, community: null, checksToday: { used: 43, limit: 250 } } }
  ];
  function MiniPost(p) {
    return h("article", { className: "post" },
      h("div", { className: "post-head" }, h("span", { className: "avatar" }, p.who.split(" ").map(function (w) { return w[0]; }).join("")),
        h("span", { className: "post-who" }, h("span", { className: "post-name" }, p.who), h("span", { className: "post-meta" }, p.meta)),
        h("span", { className: "post-tools" }, h(DS.MopIcon, { state: p.mop, label: "Is this post slop?" }), h("span", { "aria-hidden": "true" }, "···"))),
      h("p", { className: "post-body", style: { margin: 0 } }, p.body));
  }
  function Breakdown3() {
    var s = useState("likely"), ex = EXAMPLES.filter(function (e) { return e.key === s[0]; })[0];
    return h("div", { className: "bd3" },
      h("div", { className: "bd3-pick" }, h(DS.SegmentedControl, { value: s[0], onChange: s[1], options: EXAMPLES.map(function (e) { return { value: e.key, label: e.label }; }) })),
      h("div", { className: "bd3-grid" },
        h("div", { className: "bd3-post" }, h("span", { className: "mono" }, "the post"), h(MiniPost, ex)),
        h("div", { className: "bd3-panel" }, h("span", { className: "mono" }, "click its mop"), h(Why, Object.assign({ key: ex.key, interactive: true }, ex.card)))));
  }

  /* ---------- voting: what each vote does ---------- */
  var VOTE_RESULT = {
    none: ["Not sure", "Slop Mop's own verdict stands: Likely slop, so the post is folded away."],
    no: ["No", "You overrule it. The post is shown in your feed and the model's score is dimmed."],
    maybe: ["Maybe", "Possibly slop: the post stays visible and its mop turns yellow."],
    probably: ["Probably", "You agree. The post stays folded, and your vote counts toward the research."]
  };
  function VoteDemo(p) {
    var s = useState(p.value === undefined ? null : p.value), v = s[0], r = VOTE_RESULT[v || "none"];
    var ex = EXAMPLES[0];
    var shown = v === "no" || v === "maybe";
    return h("div", { className: "vote-demo" },
      h("div", { className: "vd-feed" }, shown ? h(MiniPost, Object.assign({}, ex, { mop: v === "no" ? "blue" : "yellow" })) : h(DS.FoldStrip, { tone: "red", density: "minimal", label: "This post was hidden", style: { width: "100%" } })),
      h("div", { className: "vd-controls" },
        h(DS.VoteControl, { value: v, onChange: s[1], style: { width: "100%" } }),
        h(DS.ScoreZones, { score: ex.card.score, possibly: 40, likely: 70, hides: true, vote: v, style: { width: "100%" } }),
        h("p", { className: "vd-result" }, h("b", null, r[0] + ". "), r[1])));
  }
  function VoteExample(p) {
    var s = useState(p.vote), v = s[0];
    return h("div", { className: "vote-ex" },
      h("span", { className: "mono" }, p.kicker),
      h(MiniPost, { who: p.who, meta: p.meta, mop: v === "no" ? "blue" : v === "maybe" ? "yellow" : v === "probably" ? "red" : p.mop, body: p.body }),
      h(DS.VoteControl, { value: v, onChange: s[1], style: { width: "100%" } }),
      h("p", { className: "vd-result" }, h("b", null, (VOTE_RESULT[v || "none"] || [""])[0] + ". "), p.results[v || "none"]));
  }

  var REG = {
    FoldStrip: DS.FoldStrip, ScoreZones: DS.ScoreZones, Slopprint: DS.Slopprint, NoticePanel: DS.NoticePanel, MopIcon: DS.MopIcon, Badge: DS.Badge,
    WhyCard: Why, Vote: Vote, Sensitivity: Sensitivity, Mode: Mode, MopRow: MopRow, Tiles: Tiles, Verdicts: Verdicts, Mark: Mark, Popup: PopupLite, PanelPeek: PanelPeek,
    NetworkStack: NetworkStack, TellCard: TellCard, Breakdown3: Breakdown3, VoteDemo: VoteDemo, VoteExample: VoteExample
  };
  var nodes = document.querySelectorAll("[data-island]");
  Array.prototype.forEach.call(nodes, function (el) {
    var C = REG[el.getAttribute("data-island")]; if (!C) return;
    var props = {}; try { props = JSON.parse(el.getAttribute("data-props") || "{}"); } catch (e) {}
    try { ReactDOM.createRoot(el).render(h(C, props)); } catch (e) { if (window.console) console.warn("island", el.getAttribute("data-island"), e); }
  });
  setTimeout(function () { document.dispatchEvent(new CustomEvent("slopmop:islands")); }, 200);
})();
