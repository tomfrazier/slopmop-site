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
        h("span", { className: "mono" }, "marked: what the model weighs for “" + t.label.replace(/[“”]/g, "") + "”")),
      h("div", { className: "tell-print" }, h(DS.Slopprint, { values: vals, highlight: [t.label], color: "var(--mop-500)", width: 230 })));
  }

  var REG = {
    FoldStrip: DS.FoldStrip, ScoreZones: DS.ScoreZones, Slopprint: DS.Slopprint, NoticePanel: DS.NoticePanel, MopIcon: DS.MopIcon, Badge: DS.Badge,
    WhyCard: Why, Vote: Vote, Sensitivity: Sensitivity, Mode: Mode, MopRow: MopRow, Tiles: Tiles, Verdicts: Verdicts, Mark: Mark, Popup: PopupLite, PanelPeek: PanelPeek,
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
