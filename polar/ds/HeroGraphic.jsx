/* The slopmop.lol hero graphic: a LinkedIn feed mid-mop. Slop folds away, a borderline post keeps its yellow mop with the
   details panel open, and a plain useful post survives untouched — the "bad writing, not AI" promise, shown not told. */
const heroSM = window.SlopMopDesignSystem_ca9143;

function HeroPost({ author, title, body, mop, stats }) {
  return (
    <article style={{ background: "#fff", border: "1px solid #E0DFDC", borderRadius: 8, padding: "12px 14px 8px", font: "var(--type-body-sm)", color: "#1B1B18" }}>
      <header style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
        <span style={{ width: 36, height: 36, borderRadius: "50%", background: "#E8E6E1", flex: "0 0 auto" }}></span>
        <span style={{ display: "grid", gap: 1, flex: 1, minWidth: 0 }}>
          <span style={{ fontWeight: 600 }}>{author}</span>
          <span style={{ color: "#5E5D59", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, alignSelf: "flex-start" }}>
          {mop}
          <span style={{ width: 28, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#5E5D59", fontWeight: 700, letterSpacing: 1 }}>···</span>
        </span>
      </header>
      <p style={{ margin: "0 0 8px", whiteSpace: "pre-line", lineHeight: 1.45, textWrap: "pretty" }}>{body}</p>
      <div style={{ display: "flex", gap: 14, paddingTop: 6, borderTop: "1px solid #EFEEEB", color: "#5E5D59", fontSize: 12 }}>{stats}</div>
    </article>
  );
}

const HERO_W = 540, HERO_H = 940;
function HeroGraphic({ style }) {
  const ref = React.useRef(null);
  const [k, setK] = React.useState(1);
  React.useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setK(Math.min(1, el.clientWidth / HERO_W)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  const strip = (tone, k) => <heroSM.FoldStrip key={k} tone={tone} density="minimal" label="This post was hidden" />;
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: HERO_W, height: HERO_H * k, ...style }}>
    <div style={{ position: "relative", width: HERO_W, height: HERO_H, transform: `scale(${k})`, transformOrigin: "top left" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 380, background: "#F4F2EE", borderRadius: "var(--radius-lg)", padding: "var(--space-5)", display: "grid", gap: "var(--space-3)", boxSizing: "border-box", boxShadow: "0 24px 64px rgba(0,0,0,.45)" }}>
        <HeroPost author="Priya Raman" title="Staff engineer, payments"
          body="We shaved 400ms off checkout by moving the fraud check off the critical path. Took three weeks, two of them arguing about it."
          mop={<heroSM.MopIcon state="unchecked" />} stats={<><span>88 reactions</span><span>14 comments</span></>} />
        {strip("red", "a")}
        <HeroPost author="Marcus Bell" title="Helping B2B leaders unlock growth"
          body={"Most teams don't have a strategy problem. They have a clarity problem.\n\nComment YES if this resonates."}
          mop={<heroSM.MopIcon state="yellow" hover />} stats={<><span>1,204 reactions</span><span>240 comments</span></>} />
        {strip("red", "c")}
        {strip("yellow", "d")}
        {strip("red", "e")}
        <span style={{ font: "var(--type-mono)", color: "var(--ink-500)", textAlign: "center", paddingTop: "var(--space-1)" }}>14 posts scanned · 9 folded · 5 left to read</span>
      </div>
      <div style={{ position: "absolute", top: 286, right: 0, transform: "scale(.8)", transformOrigin: "top right", boxShadow: "0 24px 64px rgba(0,0,0,.45)", borderRadius: "var(--radius-md)" }}>
        <heroSM.WhyCard verdict="possibly" score={61} mode="hide" interactive vote={null} onVote={() => {}}
          tells={{ emptyEvaluation: 0.74, engagementBait: 0.68, contrastFraming: 0.52, formulaicHook: 0.4 }}
          humanVoice={0.21} usefulness={0.09} readerResponse={0.71} community={{ probably: 9, maybe: 4, no: 1 }} checksToday={{ used: 41, limit: 250 }} />
      </div>
    </div>
    </div>
  );
}

Object.assign(window, { HeroGraphic, HeroPost });
