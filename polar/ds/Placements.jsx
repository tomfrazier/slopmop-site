const PL = window.SlopMopDesignSystem_ca9143;

const PL_TONE = {
  fine: { bg: "var(--blue-100)", text: "var(--blue-700)", border: "var(--blue-200)", word: "Looks fine", mop: "blue" },
  possibly: { bg: "var(--mop-100)", text: "var(--mop-900)", border: "var(--mop-500)", word: "Possibly slop", mop: "yellow" },
  likely: { bg: "var(--red-100)", text: "var(--red-700)", border: "var(--red-500)", word: "Likely slop", mop: "red" },
};
const plVerdict = (n) => (n >= 70 ? "likely" : n >= 40 ? "possibly" : "fine");
const plSx = {
  head: { margin: 0, font: "var(--weight-bold) 11px/1.2 var(--font-body)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-body)" },
  sub: { font: "var(--weight-semibold) 11px/1.2 var(--font-body)", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-faint)" },
  meta: { font: "var(--weight-regular) 11px/1.4 var(--font-mono)", color: "var(--text-faint)" },
  host: { background: "#fff", borderRadius: 8, border: "1px solid #E3E3E3" },
};

/** A verdict chip for a single piece of writing: mop + word (+ score). */
function Chip({ n, score = true, small }) {
  const t = PL_TONE[plVerdict(n)];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: small ? 20 : 22, padding: "0 7px 0 5px", borderRadius: "var(--radius-xs)", background: t.bg, color: t.text, border: `1px solid ${t.border}`, font: "var(--weight-semibold) 12px/1 var(--font-body)", whiteSpace: "nowrap" }}>
      <PL.MopMark size={13} knockout={t.bg} style={{ color: t.text }} />{t.word}{score && <b style={{ font: "var(--weight-semibold) 11px/1 var(--font-mono)", opacity: 0.8 }}>{n}</b>}
    </span>
  );
}

/** Mess Index — a whole site, never a single page: the average score of every page Slop Mop has checked there. */
function MessIndex({ value, pages, compact }) {
  const v = plVerdict(value), t = PL_TONE[v];
  const badge = { fine: ["var(--blue-500)", "var(--paper-000)"], possibly: ["var(--mop-500)", "var(--ink-900)"], likely: ["var(--red-500)", "var(--paper-000)"] }[v];
  const label = value >= 70 ? "Messy site" : value >= 40 ? "Mixed site" : "Tidy site";
  return (
    <span title={`Mess Index ${value} / 100 — the average across ${pages.toLocaleString()} pages checked on this site`} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: compact ? 22 : 26, padding: "0 8px 0 3px", borderRadius: "var(--radius-pill)", background: "var(--paper-000)", border: `1px solid ${t.border}`, whiteSpace: "nowrap", verticalAlign: "middle" }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: compact ? 16 : 20, height: compact ? 16 : 20, padding: "0 4px", borderRadius: "var(--radius-pill)", background: badge[0], color: badge[1], font: "var(--weight-bold) 11px/1 var(--font-mono)" }}>{value}</span>
      <span style={{ font: "var(--weight-semibold) 12px/1 var(--font-body)", color: t.text }}>{compact ? "Mess Index" : label}</span>
    </span>
  );
}

function Case({ n, title, unit, treatment, why, children, wide }) {
  return (
    <section style={{ gridColumn: wide ? "1 / -1" : "auto", display: "grid", gap: "var(--space-5)", alignContent: "start", padding: "var(--space-7)", borderRadius: "var(--radius-lg)", background: "var(--surface-card)", border: "1px solid var(--border-hairline)" }}>
      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <span style={plSx.sub}>{n}</span>
        <h2 style={{ margin: 0, font: "var(--weight-bold) var(--text-lg)/1.2 var(--font-display)" }}>{title}</h2>
        <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "84px minmax(0,1fr)", gap: "var(--space-2) var(--space-4)", font: "var(--weight-regular) 13px/1.45 var(--font-body)" }}>
          <dt style={plSx.sub}>Judges</dt><dd style={{ margin: 0 }}>{unit}</dd>
          <dt style={plSx.sub}>Shows</dt><dd style={{ margin: 0 }}>{treatment}</dd>
          <dt style={plSx.sub}>Why</dt><dd style={{ margin: 0, color: "var(--text-muted)" }}>{why}</dd>
        </dl>
      </div>
      <div style={{ padding: "var(--space-6)", borderRadius: "var(--radius-md)", background: "var(--paper-200)" }}>{children}</div>
    </section>
  );
}

/* 1 — Search results: site-level only. */
function SearchResults() {
  const rows = [
    { url: "northbeam.io › blog › leadership", title: "10 Game-Changing Leadership Lessons That Will Transform Your Team", desc: "In today's fast-paced world, leadership is more important than ever. Unlock your potential with these…", mess: 82, pages: 1240 },
    { url: "martinfowler.com › articles › patterns", title: "Patterns of Distributed Systems", desc: "A collection of patterns from mainstream open source distributed systems, with the code that…", mess: 11, pages: 3108 },
    { url: "hbr.org › 2026 › 09 › managing-up", title: "How to Manage Up Without Managing Out", desc: "Most advice on managing up assumes your boss wants to be managed. Here's what to do when…", mess: 46, pages: 18402 },
  ];
  return (
    <div style={{ ...plSx.host, padding: "16px 20px", display: "grid", gap: 20, font: "14px/1.45 Arial, sans-serif", color: "#202124" }}>
      {rows.map((r) => (
        <div key={r.title} style={{ display: "grid", gap: 3 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#4D5156" }}>
            <MessIndex value={r.mess} pages={r.pages} compact />
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#EEE" }}></span>{r.url}
          </span>
          <a href="#" style={{ fontSize: 19, lineHeight: 1.3, color: "#1A0DAB", textDecoration: "none" }}>{r.title}</a>
          <span style={{ color: "#4D5156" }}>{r.desc}</span>
        </div>
      ))}
    </div>
  );
}

/* 2 — On a site: the toolbar popup leads with that site's Mess Index. */
function SitePopupHead() {
  return (
    <div style={{ width: 340, background: "var(--surface-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-hairline)", boxShadow: "var(--shadow-raised)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", padding: "var(--space-6)", borderBottom: "1px solid var(--border-hairline)" }}>
        <PL.MopMark size={22} style={{ color: "var(--ink-900)" }} />
        <b style={{ font: "var(--weight-semibold) var(--text-lg)/1 var(--font-display)" }}>Slop Mop</b>
      </div>
      <div style={{ display: "grid", gap: "var(--space-4)", padding: "var(--space-6)" }}>
        <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h3 style={plSx.head}>This site</h3><span style={plSx.meta}>northbeam.io</span></span>
        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}><MessIndex value={82} pages={1240} /><span style={{ font: "var(--weight-regular) 12px/1.4 var(--font-body)", color: "var(--text-muted)" }}>across 1,240 pages checked</span></span>
        <span style={{ display: "flex", height: 8, borderRadius: 999, overflow: "visible", position: "relative" }}>
          <i style={{ width: "40%", background: "var(--blue-200)", borderRadius: "999px 0 0 999px" }}></i><i style={{ width: "30%", background: "var(--mop-200)" }}></i><i style={{ flex: 1, background: "var(--red-200)", borderRadius: "0 999px 999px 0" }}></i>
          <i style={{ position: "absolute", left: "82%", top: -4, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: "var(--ink-900)", border: "2px solid #fff", boxSizing: "border-box" }}></i>
        </span>
      </div>
    </div>
  );
}

/* 3 — A single article: the article's own score at the byline; click for the panel. */
function Article() {
  const [open, setOpen] = React.useState(false);
  const [vote, setVote] = React.useState(null);
  return (
    <div style={{ ...plSx.host, position: "relative", padding: "24px 28px", font: "17px/1.6 Georgia, serif", color: "#222" }}>
      <span style={{ font: "12px/1 Arial, sans-serif", color: "#777", letterSpacing: ".04em", textTransform: "uppercase" }}>Opinion · Work</span>
      <h3 style={{ margin: "8px 0 10px", font: "700 26px/1.2 Georgia, serif" }}>The Future of Work Is Here — And It's More Human Than Ever</h3>
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 14px", font: "13px/1 Arial, sans-serif", color: "#666" }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#E8E6E1" }}></span>By J. Writer · 6 min read
        <button type="button" aria-expanded={open} onClick={() => setOpen(true)} style={{ all: "unset", cursor: "pointer", marginLeft: "auto" }}><Chip n={78} /></button>
      </div>
      <p style={{ margin: 0, color: "#555" }}>In an era of unprecedented change, organizations must navigate a complex landscape. It's not just about technology; it's about people…</p>
      {open && <div onMouseLeave={() => setOpen(false)} style={{ position: "absolute", top: 104, right: 12, zIndex: 5 }}><PL.WhyCard verdict="likely" score={78} mode="highlight" vote={vote} onVote={setVote}
        tells={{ hypeMarketing: 0.82, contrastFraming: 0.71, emptyEvaluation: 0.6, tradeoffFreePromises: 0.44, formulaicHook: 0.3, manneredProse: 0.26 }}
        humanVoice={0.12} usefulness={0.18} readerResponse={0.08} community={{ no: 1, maybe: 2, probably: 6 }} checksToday={{ used: 138, limit: 250 }} /></div>}
    </div>
  );
}

/* 4 — An article list: not pre-scored (that would spend a check per headline). Every row carries a dimmed mop;
   hover undims it, click scores on demand — loading panel, then the real panel, and the mop takes its color. */
const AL_TELLS = {
  1: { hypeMarketing: 0.86, formulaicHook: 0.72, emptyEvaluation: 0.58, tradeoffFreePromises: 0.41 },
  3: { engagementBait: 0.66, formulaicHook: 0.52, contrastFraming: 0.31 },
  0: { formalHedging: 0.12 }, 2: { emptyEvaluation: 0.14 },
};
function ArticleList() {
  const items = [
    { t: "Inside the quiet rewrite of the city's bus network", n: 14, hv: 0.74, us: 0.81, rr: 0.4 },
    { t: "7 Mindset Shifts That Will Revolutionize How You Lead", n: 84, hv: 0.12, us: 0.1, rr: 0.18 },
    { t: "Why the new tariff schedule matters for small importers", n: 22, hv: 0.62, us: 0.77, rr: 0.35 },
    { t: "We asked 5 CEOs about AI. Their answers will surprise you", n: 58, hv: 0.3, us: 0.34, rr: 0.5 },
  ];
  const [hover, setHover] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const [status, setStatus] = React.useState({}); // i → "loading" | "done"
  const timers = React.useRef({});
  const hideT = React.useRef(null);
  React.useEffect(() => () => { Object.values(timers.current).forEach(clearTimeout); clearTimeout(hideT.current); }, []);
  // Leaving the mop or the panel closes it; a short grace lets the pointer cross the gap between them.
  const stay = () => clearTimeout(hideT.current);
  const leave = () => { clearTimeout(hideT.current); hideT.current = setTimeout(() => setOpen(null), 180); };
  const score = (i) => {
    stay(); setOpen(i);
    if (status[i]) return;
    setStatus((s) => ({ ...s, [i]: "loading" }));
    timers.current[i] = setTimeout(() => setStatus((s) => ({ ...s, [i]: "done" })), 2600);
  };
  return (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <div style={{ ...plSx.host, padding: "8px 0", font: "16px/1.35 Georgia, serif", color: "#1A1A1A", position: "relative" }}>
        {items.map((it, i) => {
          const v = plVerdict(it.n), st = status[i], on = hover === i;
          const icon = st === "done" ? PL_TONE[v].mop : "unchecked";
          const dim = !st && !on && open !== i;
          return (
            <div key={it.t} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderTop: i ? "1px solid #EEE" : 0, background: on ? "#FAFAF8" : "transparent" }}>
              <span style={{ width: 56, height: 40, borderRadius: 4, background: "#E8E6E1", flex: "none" }}></span>
              <span style={{ flex: 1, fontWeight: 700 }}>{it.t}</span>
              <span onMouseEnter={stay} onMouseLeave={leave} style={{ flex: "none", opacity: dim ? 0.3 : 1, transition: "opacity var(--dur-base) var(--ease-standard)" }}>
                <PL.MopIcon state={icon} onClick={() => score(i)} label={st ? "Slop Mop: see the score" : "Slop Mop: score this article (uses one check)"} />
              </span>
              {open === i && (
                <div onMouseEnter={stay} onMouseLeave={leave} style={{ position: "absolute", right: 8, top: "calc(100% - 4px)", zIndex: 6 }}>
                  <PL.WhyCard loading={st !== "done"} verdict={v} score={it.n} mode="highlight" tells={AL_TELLS[i]} humanVoice={it.hv} usefulness={it.us} readerResponse={it.rr}
                    community={i === 1 ? { no: 0, maybe: 2, probably: 7 } : null} checksToday={{ used: 138 + Object.keys(status).length, limit: 250 }} onVote={() => {}} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span style={plSx.meta}>hover a row · click its mop to score it</span>
    </div>
  );
}

/* 5 — Comments: tinted mop only, no hover. Hide mode collapses a comment to one line. */
function Comments({ hide }) {
  const cs = [
    { who: "jkessler", age: "2h", text: "The queue thing bit us too. We ended up with a per-tenant semaphore — ugly, but it held.", n: 9 },
    { who: "growthwithdev", age: "1h", text: "Great insights! Such a valuable perspective. Thanks for sharing — truly game-changing stuff! 🙌", n: 81 },
    { who: "mara_t", age: "40m", text: "You moved the check, you didn't remove it; the risk just lives somewhere else now.", n: 14 },
    { who: "insights_daily", age: "22m", text: "This. Absolutely this. Leadership is a journey, not a destination.", n: 62 },
  ];
  const [shown, setShown] = React.useState({});
  const [open, setOpen] = React.useState(null);
  const hideT = React.useRef(null);
  React.useEffect(() => () => clearTimeout(hideT.current), []);
  const stay = () => clearTimeout(hideT.current);
  const leave = () => { clearTimeout(hideT.current); hideT.current = setTimeout(() => setOpen(null), 180); };
  const CM_TELLS = { 9: { formalHedging: 0.1 }, 81: { emptyEvaluation: 0.88, hypeMarketing: 0.74, engagementBait: 0.52 }, 14: { contrastFraming: 0.22 }, 62: { manneredProse: 0.61, emptyEvaluation: 0.48, formulaicHook: 0.36 } };
  return (
    <div style={{ ...plSx.host, position: "relative", padding: 12, display: "grid", gap: 2, font: "14px/1.45 var(--font-body)", color: "#1A1A1B" }}>
      {cs.map((c) => {
        const v = plVerdict(c.n);
        if (hide && v === "likely" && !shown[c.who]) {
          return (
            <button key={c.who} type="button" onClick={() => { setShown({ ...shown, [c.who]: true }); stay(); setOpen(c.who); }} style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 6, background: "var(--paper-100)", border: "1px dashed var(--border-default)", font: "var(--weight-medium) 12px/1.3 var(--font-body)", color: "var(--text-muted)" }}>
              <PL.MopMark size={13} knockout="var(--paper-100)" style={{ color: "var(--red-500)" }} /><span style={{ textDecoration: "underline", textUnderlineOffset: 2 }}>Mopped up a sloppy one</span>
            </button>
          );
        }
        return (
          <div key={c.who} style={{ position: "relative", display: "grid", gap: 2, padding: "8px 10px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#576F76" }}>
              <b style={{ color: "#1A1A1B" }}>{c.who}</b>{c.age}
              <span onMouseEnter={stay} onMouseLeave={leave} style={{ display: "inline-flex", transform: "scale(.72)", transformOrigin: "left center", marginRight: -8 }}>
                <PL.MopIcon state={PL_TONE[v].mop} onClick={() => { stay(); setOpen(c.who); }} label={`Slop Mop: ${PL_TONE[v].word}`} />
              </span>
            </span>
            <span>{c.text}</span>
            {open === c.who && (
              <div onMouseEnter={stay} onMouseLeave={leave} style={{ position: "absolute", left: 6, top: 30, zIndex: 6 }}>
                <PL.WhyCard verdict={v} score={c.n} mode={hide ? "hide" : "highlight"} tells={CM_TELLS[c.n]} humanVoice={v === "fine" ? 0.78 : 0.18} usefulness={v === "fine" ? 0.7 : 0.08} readerResponse={v === "fine" ? 0.42 : 0.1}
                  community={v === "likely" ? { no: 0, maybe: 1, probably: 4 } : null} checksToday={{ used: 138, limit: 250 }} onVote={() => {}} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* 6 — Reviews: word always visible, plus a summary that can hide the slop reviews. */
function Reviews() {
  const rs = [
    { stars: 5, title: "Absolutely transformative experience!", text: "This product exceeded all my expectations. A must-have for anyone looking to elevate their daily routine. Highly recommend!", n: 76 },
    { stars: 3, title: "Fine, but the lid leaks", text: "Keeps coffee hot for about four hours, not the eight on the box. The lid drips if you tilt it past 45°.", n: 8 },
    { stars: 5, title: "Game changer!!", text: "Love it love it love it. Best purchase ever, you won't regret it.", n: 71 },
  ];
  const [hide, setHide] = React.useState(false);
  const [open, setOpen] = React.useState(null);
  const hideT = React.useRef(null);
  React.useEffect(() => () => clearTimeout(hideT.current), []);
  const stay = () => clearTimeout(hideT.current);
  const leave = () => { clearTimeout(hideT.current); hideT.current = setTimeout(() => setOpen(null), 180); };
  const RV_TELLS = { 76: { hypeMarketing: 0.81, emptyEvaluation: 0.72, tradeoffFreePromises: 0.44 }, 8: { formalHedging: 0.06 }, 71: { engagementBait: 0.58, emptyEvaluation: 0.66, hypeMarketing: 0.5 } };
  const slop = rs.filter((r) => plVerdict(r.n) === "likely").length;
  return (
    <div style={{ ...plSx.host, padding: 16, display: "grid", gap: 14, font: "14px/1.45 Arial, sans-serif", color: "#0F1111" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 6, background: "var(--paper-100)", font: "var(--weight-regular) 13px/1.3 var(--font-body)" }}>
        <span style={{ minWidth: 0 }}><b>{slop} of {rs.length}</b> reviews read like slop</span>
        <PL.Switch checked={hide} onChange={setHide} style={{ marginLeft: "auto" }} aria-label="Hide slop reviews" />
        <PL.MopMark size={16} knockout="var(--paper-100)" style={{ color: "var(--ink-900)" }} />
        <span style={{ font: "var(--weight-medium) 12px/1 var(--font-body)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>Hide them</span>
      </div>
      {rs.filter((r) => !(hide && plVerdict(r.n) === "likely")).map((r) => (
        <div key={r.title} style={{ position: "relative", display: "grid", gap: 4 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span onMouseEnter={stay} onMouseLeave={leave} style={{ display: "inline-flex", transform: "scale(.72)", transformOrigin: "left center", marginRight: -8 }}>
              <PL.MopIcon state={PL_TONE[plVerdict(r.n)].mop} onClick={() => { stay(); setOpen(r.title); }} label={`Slop Mop: ${PL_TONE[plVerdict(r.n)].word}`} />
            </span>
            <span style={{ color: "#DE7921", letterSpacing: 1 }}>{"★".repeat(r.stars)}<span style={{ color: "#DDD" }}>{"★".repeat(5 - r.stars)}</span></span>
            <b>{r.title}</b>
          </span>
          <span>{r.text}</span>
          {open === r.title && (
            <div onMouseEnter={stay} onMouseLeave={leave} style={{ position: "absolute", left: -4, top: 28, zIndex: 6 }}>
              <PL.WhyCard verdict={plVerdict(r.n)} score={r.n} mode="highlight" tells={RV_TELLS[r.n]} humanVoice={r.n < 40 ? 0.82 : 0.14} usefulness={r.n < 40 ? 0.88 : 0.06} readerResponse={r.n < 40 ? 0.5 : 0.12}
                community={r.n >= 70 ? { no: 1, maybe: 1, probably: 5 } : null} checksToday={{ used: 138, limit: 250 }} onVote={() => {}} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* 7 — Social feeds (X, Reddit, Facebook): exactly the LinkedIn treatment. */
function SocialFeed() {
  const [open, setOpen] = React.useState(false);
  const hideT = React.useRef(null);
  React.useEffect(() => () => clearTimeout(hideT.current), []);
  const stay = () => clearTimeout(hideT.current);
  const leave = () => { clearTimeout(hideT.current); hideT.current = setTimeout(() => setOpen(false), 180); };
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ ...plSx.host, position: "relative", padding: "12px 14px", font: "15px/1.4 var(--font-body)", color: "#0F1419" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ width: 32, height: 32, borderRadius: "50%", background: "#E8E6E1" }}></span><b>Growth Guru</b><span style={{ color: "#536471" }}>@growthguru · 2h</span>
          <span onMouseEnter={stay} onMouseLeave={leave} style={{ marginLeft: "auto" }}><PL.MopIcon state="yellow" onClick={() => { stay(); setOpen(true); }} /></span>
        </span>
        Unpopular opinion: consistency beats talent. Every. Single. Time. 🧵👇
        {open && (
          <div onMouseEnter={stay} onMouseLeave={leave} style={{ position: "absolute", right: 8, top: 48, zIndex: 6 }}>
            <PL.WhyCard verdict="possibly" score={56} mode="hide" tells={{ formulaicHook: 0.74, engagementBait: 0.58, contrastFraming: 0.32 }} humanVoice={0.4} usefulness={0.22} readerResponse={0.46}
              community={{ no: 3, maybe: 4, probably: 2 }} checksToday={{ used: 138, limit: 250 }} onVote={() => {}} />
          </div>
        )}
      </div>
      <PL.FoldStrip tone="red" density="minimal" />
    </div>
  );
}

/* 8 — Inbox (Phase 3): row mop in the list, chip when opened, check-before-send on compose. */
function Inbox() {
  const rows = [["Northbeam Labs", "🚀 Unlock your team's full potential this quarter", 86], ["Priya Raman", "Re: fraud check latency numbers", 10], ["The Weekly Leader", "5 things top performers never say", 63]];
  return (
    <div style={{ ...plSx.host, overflow: "hidden", font: "14px/1.3 Arial, sans-serif", color: "#202124" }}>
      {rows.map(([f, s, n], i) => {
        const v = plVerdict(n);
        return (
          <div key={s} style={{ display: "grid", gridTemplateColumns: "150px minmax(0,1fr)", alignItems: "center", gap: 10, padding: "10px 14px", borderTop: i ? "1px solid #EEE" : 0, background: v === "likely" ? "#FBFBFA" : "#fff" }}>
            <b style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: v === "likely" ? 400 : 700, color: v === "likely" ? "#5F6368" : "#202124" }}>{f}</b>
            {/* The mop scores the content, so it leads the subject — never the sender. Fixed 32px box, scaled, so the tint stays round. */}
            <span style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
              <span style={{ flex: "none", width: 23, height: 23, position: "relative" }}>
                <span style={{ position: "absolute", top: 0, left: 0, width: 32, height: 32, transform: "scale(.72)", transformOrigin: "0 0" }}><PL.MopIcon state={PL_TONE[v].mop} label={`Slop Mop: ${PL_TONE[v].word}`} /></span>
              </span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: v === "likely" ? "#5F6368" : "#202124" }}>{s}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { Case, SearchResults, SitePopupHead, Article, ArticleList, Comments, Reviews, SocialFeed, Inbox });
