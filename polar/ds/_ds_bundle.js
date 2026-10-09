/* @ds-bundle: {"format":4,"namespace":"SlopMopDesignSystem_ca9143","components":[{"name":"SignUpCard","sourcePath":"components/account/SignUpCard.jsx"},{"name":"UpgradePrompt","sourcePath":"components/account/UpgradePrompt.jsx"},{"name":"Checkbox","sourcePath":"components/controls/Checkbox.jsx"},{"name":"SegmentedControl","sourcePath":"components/controls/SegmentedControl.jsx"},{"name":"SensitivitySlider","sourcePath":"components/controls/SensitivitySlider.jsx"},{"name":"SENSITIVITY_STOPS","sourcePath":"components/controls/SensitivityToggle.jsx"},{"name":"SensitivityToggle","sourcePath":"components/controls/SensitivityToggle.jsx"},{"name":"Switch","sourcePath":"components/controls/Switch.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"GLYPHS","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"MopIcon","sourcePath":"components/core/MopIcon.jsx"},{"name":"MopMark","sourcePath":"components/core/MopMark.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"FoldStrip","sourcePath":"components/verdict/FoldStrip.jsx"},{"name":"HighlightFrame","sourcePath":"components/verdict/HighlightFrame.jsx"},{"name":"NOTICES","sourcePath":"components/verdict/NoticePanel.jsx"},{"name":"NoticePanel","sourcePath":"components/verdict/NoticePanel.jsx"},{"name":"ScoreZones","sourcePath":"components/verdict/ScoreZones.jsx"},{"name":"Slopprint","sourcePath":"components/verdict/Slopprint.jsx"},{"name":"StatTile","sourcePath":"components/verdict/StatTile.jsx"},{"name":"VoteControl","sourcePath":"components/verdict/VoteControl.jsx"},{"name":"OUTCOMES","sourcePath":"components/verdict/WhyCard.jsx"},{"name":"WhyCard","sourcePath":"components/verdict/WhyCard.jsx"},{"name":"TONE","sourcePath":"components/verdict/tones.js"},{"name":"VERDICTS","sourcePath":"components/verdict/tones.js"},{"name":"VOTE_TONE","sourcePath":"components/verdict/tones.js"},{"name":"VOTE_NAME","sourcePath":"components/verdict/tones.js"},{"name":"TELLS","sourcePath":"components/verdict/tones.js"}],"sourceHashes":{"components/account/SignUpCard.jsx":"5fd0903b3bfc","components/account/UpgradePrompt.jsx":"333df1952fd3","components/controls/Checkbox.jsx":"174bef180e17","components/controls/SegmentedControl.jsx":"dcc575c52623","components/controls/SensitivitySlider.jsx":"429ad5c39c38","components/controls/SensitivityToggle.jsx":"7c5c0d90644b","components/controls/Switch.jsx":"5a4e505f0a0e","components/core/Badge.jsx":"5521d461fc99","components/core/Button.jsx":"d2a4770a69af","components/core/Card.jsx":"d751de1a6a50","components/core/Icon.jsx":"84ac90fd904a","components/core/IconButton.jsx":"6b5d747c0e69","components/core/MopIcon.jsx":"493df652cf1b","components/core/MopMark.jsx":"94af01b4ebf0","components/core/Wordmark.jsx":"22c2f8829842","components/verdict/FoldStrip.jsx":"4de59e526fc8","components/verdict/HighlightFrame.jsx":"75330432310f","components/verdict/NoticePanel.jsx":"ff81b982efa8","components/verdict/ScoreZones.jsx":"e4751d6d2907","components/verdict/Slopprint.jsx":"174c0c93d1ab","components/verdict/StatTile.jsx":"f90d88398a20","components/verdict/VoteControl.jsx":"4b2362854100","components/verdict/WhyCard.jsx":"d68c5ffa1e17","components/verdict/tones.js":"92f8ad459699","ui_kits/account/Dashboard.jsx":"f7a3fc8dbab8","ui_kits/account/Screens.jsx":"77ee0024dbf8","ui_kits/account/Upgrade.jsx":"a0e36d30c772","ui_kits/extension/Onboarding.jsx":"4ccf27f56e2e","ui_kits/extension/Popup.jsx":"ab4382c295da","ui_kits/feed/FeedItem.jsx":"1b389b145ef6","ui_kits/feed/posts.js":"7d609e6e3297","ui_kits/placements/Placements.jsx":"f36139bdb0a5","ui_kits/site/HeroGraphic.jsx":"a93b495177d2","ui_kits/site/Sections.jsx":"8887c1823c13","ui_kits/site/Sections2.jsx":"3af079f8660c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SlopMopDesignSystem_ca9143 = window.SlopMopDesignSystem_ca9143 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/controls/SensitivitySlider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STOPS = [{
  value: "mild",
  label: "Mild",
  threshold: 0.70
}, {
  value: "moderate",
  label: "Moderate",
  threshold: 0.50
}, {
  value: "aggressive",
  label: "Aggressive",
  threshold: 0.35
}];
function SensitivitySlider({
  value = "moderate",
  onChange,
  showThreshold = true,
  disabled,
  style,
  ...rest
}) {
  const idx = Math.max(0, STOPS.findIndex(s => s.value === value));
  const pct = idx / (STOPS.length - 1) * 100;
  const set = i => onChange && onChange(STOPS[Math.min(STOPS.length - 1, Math.max(0, i))].value);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      opacity: disabled ? 0.45 : 1,
      pointerEvents: disabled ? "none" : "auto",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    role: "slider",
    tabIndex: 0,
    "aria-valuemin": 1,
    "aria-valuemax": 3,
    "aria-valuenow": idx + 1,
    "aria-valuetext": STOPS[idx].label,
    "aria-label": "Sensitivity",
    onKeyDown: e => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        set(idx + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        set(idx - 1);
      }
    },
    style: {
      position: "relative",
      height: 26,
      borderRadius: "var(--radius-pill)",
      cursor: "pointer",
      background: "var(--track)",
      border: "var(--border-width) solid var(--border-default)",
      boxShadow: `var(--shadow-inset-crease)${idx === 2 ? ", var(--glow-accent)" : ""}`,
      transition: "box-shadow var(--dur-base) var(--ease-standard)"
    }
  }, STOPS.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: s.value,
    type: "button",
    "aria-label": s.label,
    onClick: () => set(i),
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: `${i / (STOPS.length - 1) * 100}%`,
      width: 40,
      transform: "translateX(-50%)",
      background: "transparent",
      border: 0,
      cursor: "pointer",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 3,
      height: 3,
      marginLeft: -1.5,
      marginTop: -1.5,
      borderRadius: "50%",
      background: "rgba(22,24,26,.3)",
      opacity: i === idx ? 0 : 1
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      bottom: 2,
      left: `${pct}%`,
      width: 22,
      transform: "translateX(-50%)",
      borderRadius: "var(--radius-pill)",
      background: "var(--paper-000)",
      border: "var(--border-width) solid var(--border-default)",
      boxShadow: "0 1px 2px rgba(22,24,26,.22)",
      transition: "left var(--dur-base) var(--ease-standard)",
      pointerEvents: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "var(--space-4)"
    }
  }, STOPS.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: s.value,
    style: {
      font: "var(--type-label)",
      color: i === idx ? "var(--text-body)" : "var(--text-faint)",
      fontWeight: i === idx ? "var(--weight-semibold)" : "var(--weight-regular)"
    }
  }, s.label))), showThreshold && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-3) 0 0",
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "threshold T = ", STOPS[idx].threshold.toFixed(2)));
}
Object.assign(__ds_scope, { SensitivitySlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/SensitivitySlider.jsx", error: String((e && e.message) || e) }); }

// components/controls/SensitivityToggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SENSITIVITY_STOPS = [{
  value: "mild",
  label: "Mild",
  threshold: 0.40,
  dots: 1,
  tone: {
    bg: "var(--blue-100)",
    border: "var(--blue-500)",
    text: "var(--blue-700)",
    dot: "color-mix(in oklab, var(--blue-500) 55%, var(--paper-000))"
  }
}, {
  value: "moderate",
  label: "Moderate",
  threshold: 0.25,
  dots: 3,
  tone: {
    bg: "var(--mop-100)",
    border: "var(--mop-500)",
    text: "var(--mop-900)",
    dot: "color-mix(in oklab, var(--mop-500) 55%, var(--paper-000))"
  }
}, {
  value: "aggressive",
  label: "Aggressive",
  threshold: 0.18,
  dots: 5,
  tone: {
    bg: "var(--red-100)",
    border: "var(--red-500)",
    text: "var(--red-700)",
    dot: "color-mix(in oklab, var(--red-500) 55%, var(--paper-000))"
  }
}];
function Dots({
  n,
  on,
  tone
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "flex",
      gap: 3,
      justifyContent: "center"
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      display: "block",
      width: 6,
      height: 6,
      boxSizing: "border-box",
      borderRadius: "50%",
      border: `1px solid ${on ? tone.border : "var(--ink-300)"}`,
      background: i < n ? on ? tone.dot : "var(--ink-300)" : "transparent",
      transition: "var(--transition-ui)"
    }
  })));
}

/**
 * Three stops, one tap each. Blue / yellow / red as the bar for slop rises, with a five-dot scale under each label
 * (1 · 3 · 5). Tints only: the border carries the color, the label the dark shade, the dots the light one.
 */
function SensitivityToggle({
  value = "moderate",
  onChange,
  showThreshold = true,
  disabled,
  style,
  ...rest
}) {
  const stop = SENSITIVITY_STOPS.find(s => s.value === value) || SENSITIVITY_STOPS[1];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gap: "var(--space-3)",
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": "Sensitivity",
    style: {
      display: "flex",
      padding: 2,
      gap: 2,
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-sunken)",
      border: "var(--border-width) solid var(--border-hairline)"
    }
  }, SENSITIVITY_STOPS.map(s => {
    const on = s.value === stop.value;
    return /*#__PURE__*/React.createElement("button", {
      key: s.value,
      type: "button",
      role: "radio",
      "aria-checked": on,
      disabled: disabled,
      "aria-label": `${s.label} (${s.dots} of 5)`,
      onClick: () => onChange && onChange(s.value),
      style: {
        flex: 1,
        display: "grid",
        gap: 5,
        justifyItems: "center",
        padding: "7px 0 6px",
        cursor: disabled ? "default" : "pointer",
        borderRadius: "var(--radius-xs)",
        transition: "var(--transition-ui)",
        border: `var(--border-width) solid ${on ? s.tone.border : "transparent"}`,
        background: on ? s.tone.bg : "transparent",
        color: on ? s.tone.text : "var(--text-muted)",
        font: `${on ? "var(--weight-semibold)" : "var(--weight-medium)"} 13px/1.1 var(--font-body)`
      }
    }, s.label, /*#__PURE__*/React.createElement(Dots, {
      n: s.dots,
      on: on,
      tone: s.tone
    }));
  })), showThreshold && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "threshold T = ", stop.threshold.toFixed(2)));
}
Object.assign(__ds_scope, { SENSITIVITY_STOPS, SensitivityToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/SensitivityToggle.jsx", error: String((e && e.message) || e) }); }

// components/controls/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  checked,
  onChange,
  label,
  description,
  disabled,
  size = "md",
  style,
  ...rest
}) {
  const w = size === "lg" ? 44 : 38,
    h = size === "lg" ? 26 : 22,
    knob = h - 6;
  const control = /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": !!checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: w,
      height: h,
      flex: "0 0 auto",
      padding: 2,
      cursor: disabled ? "not-allowed" : "pointer",
      borderRadius: "var(--radius-pill)",
      border: "var(--border-width) solid " + (checked ? "var(--mop-500)" : "var(--border-default)"),
      background: checked ? "var(--mop-500)" : "var(--paper-200)",
      transition: "background-color var(--dur-base) var(--ease-standard),border-color var(--dur-base) var(--ease-standard)",
      display: "flex",
      alignItems: "center",
      opacity: disabled ? 0.45 : 1
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: knob,
      height: knob,
      borderRadius: "var(--radius-pill)",
      background: "var(--paper-000)",
      boxShadow: "0 1px 2px rgba(22,24,26,.2)",
      transform: `translateX(${checked ? w - knob - 6 : 0}px)`,
      transition: "transform var(--dur-base) var(--ease-standard)"
    }
  }));
  if (!label) return control;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-heading)",
      color: "var(--text-body)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 2,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, description)), control);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/Switch.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: {
    background: "var(--paper-200)",
    color: "var(--text-muted)",
    border: "var(--border-hairline)"
  },
  warn: {
    background: "var(--flag-warn-wash)",
    color: "var(--mop-900)",
    border: "var(--mop-300)"
  },
  danger: {
    background: "var(--flag-danger-wash)",
    color: "var(--red-700)",
    border: "var(--red-200)"
  },
  clean: {
    background: "var(--blue-100)",
    color: "var(--blue-700)",
    border: "var(--blue-200)"
  },
  unsure: {
    background: "var(--flag-unsure-wash)",
    color: "var(--ink-700)",
    border: "var(--ink-300)"
  },
  ink: {
    background: "var(--ink-900)",
    color: "var(--paper-000)",
    border: "var(--ink-900)"
  }
};
function Badge({
  tone = "neutral",
  mono,
  children,
  style,
  ...rest
}) {
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      justifySelf: "start",
      alignSelf: "center",
      width: "fit-content",
      padding: "2px var(--space-4)",
      borderRadius: "var(--radius-xs)",
      background: t.background,
      color: t.color,
      border: `var(--border-width) solid ${t.border}`,
      font: mono ? "var(--type-mono-label)" : "var(--type-label)",
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  title,
  action,
  tone = "paper",
  padding = "var(--space-6)",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: tone === "sunken" ? "var(--surface-sunken)" : "var(--surface-card)",
      border: "var(--border-width) solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: tone === "sunken" ? "none" : "var(--shadow-card)",
      padding,
      ...style
    }
  }, rest), (title || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      marginBottom: "var(--space-5)"
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-label)",
      color: "var(--text-muted)"
    }
  }, title) : /*#__PURE__*/React.createElement("span", null), action), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Slop Mop's icon set: 24px grid, 2px stroke, round caps and joins.
 * Paths are inline — no network, no mask, and an unknown name renders nothing
 * rather than a filled block.
 */
const GLYPHS = {
  "check": {
    p: ["M4 12.5 9.5 18 20 6.5"]
  },
  "arrow-right": {
    p: ["M4 12h15", "m13 6 6 6-6 6"]
  },
  "chevrons-up-down": {
    p: ["m8 9 4-4 4 4", "m8 15 4 4 4-4"]
  },
  "chevron-down": {
    p: ["m6 9 6 6 6-6"]
  },
  "eye-off": {
    p: ["M3 3 21 21", "M10.6 10.7a2 2 0 0 0 2.8 2.8", "M6.7 6.8C4.6 8.2 3 10 2 12c2 4 6 7 10 7 1.8 0 3.4-.5 4.9-1.3", "M9.9 5.2A9.6 9.6 0 0 1 12 5c4 0 8 3 10 7-.9 1.7-2 3.2-3.4 4.3"]
  },
  "eye": {
    p: ["M2 12c2-4 6-7 10-7s8 3 10 7c-2 4-6 7-10 7s-8-3-10-7Z"],
    c: [[12, 12, 3]]
  },
  "flag": {
    p: ["M5 21V4", "M5 4h12l-2.2 4L17 12H5"]
  },
  "triangle-alert": {
    p: ["M12 4.5 2.8 20h18.4z", "M12 10v4", "M12 17.2v.1"]
  },
  "info": {
    p: ["M12 11v5", "M12 8v.1"],
    c: [[12, 12, 9]]
  },
  "undo-2": {
    p: ["m9 14-5-5 5-5", "M4 9h9a6 6 0 0 1 0 12H9"]
  },
  "shield-check": {
    p: ["M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z", "m8.5 12 2.5 2.5 4.5-4.5"]
  },
  "gauge": {
    p: ["m12 14 4.5-4.5", "M4 18a9 9 0 1 1 16 0"]
  },
  "settings-2": {
    p: ["M4 7h11", "M19 7h1", "M4 17h3", "M11 17h9"],
    c: [[17, 7, 2], [9, 17, 2]]
  },
  "power": {
    p: ["M12 4v8", "M6.3 7.3a8 8 0 1 0 11.4 0"]
  },
  "send": {
    p: ["M21.5 2.5 11 13", "M21.5 2.5l-7 19-3.5-8.5L2.5 9.5z"]
  },
  "database": {
    p: ["M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6", "M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"],
    e: [[12, 6, 7.5, 3]]
  },
  "download": {
    p: ["M12 3v12", "m7 11 5 5 5-5", "M4 20h16"]
  },
  "code": {
    p: ["m9 6-6 6 6 6", "m15 6 6 6-6 6"]
  },
  "file-text": {
    p: ["M6 3h8l4 4v14H6z", "M14 3v4h4", "M9 12h6", "M9 16h6"]
  },
  "scroll-text": {
    p: ["M6 3h9v14a4 4 0 0 0 4 4H8a4 4 0 0 1-4-4v-2h7", "M9 7h3", "M9 11h3"]
  },
  "loader": {
    p: ["M12 3v3", "M12 18v3", "M3 12h3", "M18 12h3", "m5.6 5.6 2.1 2.1", "m16.3 16.3 2.1 2.1", "m5.6 18.4 2.1-2.1", "m16.3 7.7 2.1-2.1"]
  },
  "trash-2": {
    p: ["M4 7h16", "M9 7V4h6v3", "m6 7 1 13h10l1-13", "M10 11v6", "M14 11v6"]
  },
  "user-round-check": {
    p: ["M3 20c0-3.9 3.1-6 7-6 1.3 0 2.5.2 3.5.7", "m16 18.5 2 2 4-4"],
    c: [[10, 8, 4]]
  },
  "eraser": {
    p: ["M8.5 21H20", "M14 5l5 5-9 9H6.5L3.5 16z", "m9.5 9.5 5 5"]
  },
  "x": {
    p: ["M6 6 18 18", "M18 6 6 18"]
  },
  "settings": {
    p: ["M12 2v3", "M12 19v3", "M2 12h3", "M19 12h3", "m4.9 4.9 2.1 2.1", "m17 17 2.1 2.1", "m4.9 19.1 2.1-2.1", "m17 7 2.1-2.1"],
    c: [[12, 12, 3], [12, 12, 7]]
  },
  "share": {
    p: ["M12 3v12", "m7 8 5-5 5 5", "M5 13v7h14v-7"]
  },
  "lock": {
    p: ["M5 11h14v10H5z", "M8 11V7a4 4 0 0 1 8 0v4"]
  },
  "monitor": {
    p: ["M3 5h18v11H3z", "M9 20h6", "M12 16v4"]
  }
};
function Icon({
  name,
  size = 16,
  strokeWidth = 2,
  style,
  title,
  ...rest
}) {
  const g = GLYPHS[name];
  if (!g) {
    if (typeof console !== "undefined") console.warn(`Icon: unknown glyph "${name}"`);
    return null;
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    "data-icon": name,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: title ? "img" : undefined,
    "aria-hidden": title ? undefined : "true",
    focusable: "false",
    style: {
      flex: "0 0 auto",
      display: "block",
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("title", null, title) : null, (g.p || []).map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })), (g.c || []).map(([cx, cy, r], i) => /*#__PURE__*/React.createElement("circle", {
    key: `c${i}`,
    cx: cx,
    cy: cy,
    r: r
  })), (g.e || []).map(([cx, cy, rx, ry], i) => /*#__PURE__*/React.createElement("ellipse", {
    key: `e${i}`,
    cx: cx,
    cy: cy,
    rx: rx,
    ry: ry
  })));
}
Object.assign(__ds_scope, { GLYPHS, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/controls/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  checked,
  onChange,
  label,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "flex-start",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "checkbox",
    "aria-checked": !!checked,
    disabled: disabled,
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 18,
      height: 18,
      flex: "0 0 auto",
      marginTop: 2,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-xs)",
      border: "var(--border-width) solid " + (checked ? "var(--mop-500)" : "var(--border-default)"),
      background: checked ? "var(--mop-500)" : "var(--paper-000)",
      color: "var(--ink-900)",
      cursor: "inherit",
      transition: "var(--transition-ui)"
    }
  }, rest), checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 12
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-body)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/controls/SegmentedControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SegmentedControl({
  options = [],
  value,
  onChange,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    style: {
      display: "grid",
      gridAutoFlow: "column",
      gridAutoColumns: "1fr",
      gap: 0,
      padding: 2,
      background: "var(--paper-200)",
      borderRadius: "var(--radius-sm)",
      border: "var(--border-width) solid var(--border-hairline)",
      opacity: disabled ? 0.45 : 1,
      pointerEvents: disabled ? "none" : "auto",
      ...style
    }
  }, rest), options.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      role: "radio",
      "aria-checked": active,
      onClick: () => onChange && onChange(o.value),
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        height: 28,
        border: 0,
        cursor: "pointer",
        borderRadius: "var(--radius-xs)",
        font: "var(--type-ui)",
        background: active ? "var(--paper-000)" : "transparent",
        color: active ? "var(--text-body)" : "var(--text-muted)",
        boxShadow: active ? "var(--shadow-card)" : "none",
        transition: "var(--transition-ui)"
      }
    }, o.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: o.icon,
      size: 15
    }) : null, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--space-3)",
  font: "var(--type-ui)",
  border: "var(--border-width) solid transparent",
  borderRadius: "var(--radius-sm)",
  cursor: "pointer",
  transition: "var(--transition-ui)",
  whiteSpace: "nowrap",
  textDecoration: "none"
};
const sizes = {
  sm: {
    height: 28,
    padding: "0 var(--space-5)",
    fontSize: "var(--text-xs)"
  },
  md: {
    height: 34,
    padding: "0 var(--space-6)",
    fontSize: "var(--text-sm)"
  },
  lg: {
    height: 42,
    padding: "0 var(--space-7)",
    fontSize: "var(--text-md)"
  }
};
const variants = {
  primary: {
    background: "var(--surface-accent)",
    color: "var(--text-on-accent)",
    borderColor: "var(--mop-500)"
  },
  solid: {
    background: "var(--ink-900)",
    color: "var(--text-inverse)",
    borderColor: "var(--ink-900)"
  },
  secondary: {
    background: "var(--surface-card)",
    color: "var(--text-body)",
    borderColor: "var(--border-default)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-muted)",
    borderColor: "transparent"
  },
  danger: {
    background: "var(--red-500)",
    color: "var(--paper-000)",
    borderColor: "var(--red-500)"
  }
};
function Button({
  variant = "primary",
  size = "md",
  icon,
  iconAfter,
  disabled,
  fullWidth,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const hoverBg = {
    primary: "var(--mop-300)",
    solid: "var(--ink-800)",
    secondary: "var(--paper-100)",
    ghost: "var(--paper-200)",
    danger: "var(--red-700)"
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      ...base,
      ...sizes[size],
      ...v,
      width: fullWidth ? "100%" : undefined,
      background: hover && !disabled ? hoverBg : v.background,
      boxShadow: press && !disabled ? "var(--shadow-inset-crease)" : variant === "secondary" ? "var(--shadow-card)" : "none",
      opacity: disabled ? 0.45 : 1,
      pointerEvents: disabled ? "none" : "auto",
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "lg" ? 17 : 15
  }) : null, children, iconAfter ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconAfter,
    size: size === "lg" ? 17 : 15
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/account/UpgradePrompt.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DEFAULT_PERKS = ["Every social feed, not just your free one", "Your inbox, too", "Far more checks a day"];

/**
 * Upgrade prompt (Phase 2, proposed) — shown when a free limit is hit, never before.
 * panel: a floating 340px card. popup: a block inside the toolbar popup.
 * inverse (default on the popup): an ink block with the yellow primary — the brand's exterior register, used sparingly
 * so the one moment we ask for money is unmistakable without becoming a colour field.
 */
function UpgradePrompt({
  surface = "panel",
  inverse,
  reason = "limit",
  site = "x.com",
  limit = 250,
  resets = "12:00 AM",
  price,
  perks = DEFAULT_PERKS,
  onUpgrade,
  onDismiss,
  style,
  ...rest
}) {
  const inv = inverse ?? surface === "popup";
  const title = reason === "site" ? `${site} isn't your free feed` : "That's today's free mopping.";
  const body = reason === "site" ? `Slop Mop XL cleans ${site} too — or switch your free feed in Account.` : `All ${limit} free checks are used. Posts are left alone until ${resets}.`;
  const panel = surface === "panel";
  const ink = inv ? {
    bg: "var(--ink-900)",
    fg: "var(--paper-000)",
    muted: "var(--ink-300)",
    faint: "var(--ink-400)",
    check: "var(--mop-500)"
  } : {
    bg: "var(--surface-card)",
    fg: "var(--text-body)",
    muted: "var(--text-muted)",
    faint: "var(--text-faint)",
    check: "var(--blue-500)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      boxSizing: "border-box",
      width: panel ? 340 : "100%",
      padding: "var(--space-6)",
      background: ink.bg,
      color: ink.fg,
      border: inv ? "none" : "var(--border-width) solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: panel ? "var(--shadow-pop)" : "none",
      display: "grid",
      gap: "var(--space-5)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      font: "var(--weight-bold) 11px/1.2 var(--font-body)",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: inv ? "var(--mop-500)" : "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 5px",
      borderRadius: 3,
      background: "var(--mop-500)",
      color: "var(--text-on-accent)"
    }
  }, "XL"), "Slop Mop XL"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) 11px/1.4 var(--font-mono)",
      color: price ? ink.fg : ink.faint
    }
  }, price || "price tbc")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--text-lg)/1.2 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--weight-regular) 13px/1.45 var(--font-body)",
      color: ink.muted
    }
  }, body)), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: "var(--space-3)"
    }
  }, perks.map(p => /*#__PURE__*/React.createElement("li", {
    key: p,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "flex-start",
      font: "var(--weight-regular) 13px/1.45 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    strokeWidth: 2.5,
    style: {
      marginTop: 3,
      color: ink.check
    }
  }), p))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: onUpgrade,
    fullWidth: !panel
  }, "Get the XL mop"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDismiss,
    style: {
      all: "unset",
      cursor: "pointer",
      margin: panel ? 0 : "0 auto",
      font: "var(--weight-medium) 12px/1.3 var(--font-body)",
      color: ink.muted,
      textDecoration: "underline",
      textUnderlineOffset: 2
    }
  }, reason === "site" ? "Not now" : `Wait until ${resets}`)));
}
Object.assign(__ds_scope, { UpgradePrompt });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/account/UpgradePrompt.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  label,
  size = 28,
  active,
  disabled,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      transition: "var(--transition-ui)",
      border: "var(--border-width) solid " + (active ? "var(--border-default)" : "transparent"),
      background: active ? "var(--paper-200)" : hover ? "var(--paper-100)" : "transparent",
      color: active ? "var(--text-body)" : "var(--text-muted)",
      opacity: disabled ? 0.35 : 1,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.58)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/MopIcon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TINT = {
  blue: {
    fill: "var(--blue-500)",
    wash: "var(--blue-100)"
  },
  yellow: {
    fill: "var(--mop-500)",
    wash: "var(--mop-100)"
  },
  red: {
    fill: "var(--red-500)",
    wash: "var(--red-100)"
  }
};
function Glyph({
  size,
  fill,
  knock
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      display: "block",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "10.6",
    y: "2",
    width: "2.8",
    height: "12",
    rx: "1.4",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.2 13.6h13.6l-1.6 8.2H6.8z",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.6 16.6v4.6M12 16.6v4.6M15.4 16.6v4.6",
    stroke: knock,
    strokeWidth: "1.15",
    strokeLinecap: "round"
  }));
}
function ChromeBadge({
  text,
  bg,
  fg = "#fff"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: -6,
      bottom: -4,
      minWidth: 14,
      height: 14,
      padding: "0 3px",
      boxSizing: "border-box",
      borderRadius: 3,
      background: bg,
      color: fg,
      font: "700 9px/14px var(--font-body)",
      textAlign: "center",
      boxShadow: "0 0 0 1.5px var(--paper-000)"
    }
  }, text);
}

/**
 * The mop icon in its seven states, on its two surfaces.
 * post    — the 32px round button beside a post's "…" menu (voteButton.css): tinted wash at rest, reversed on hover.
 * toolbar — the extension's action icon with Chrome's text badge (background/badge.ts).
 * States: unchecked · disabled · blue · yellow · red (shipped) and signup · upgrade (Phase 2, proposed).
 */
function MopIcon({
  state = "unchecked",
  surface = "post",
  count,
  hover: forceHover,
  onClick,
  label,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const hover = forceHover ?? h;
  const tint = TINT[state];
  if (surface === "toolbar") {
    const fill = state === "disabled" ? "var(--ink-300)" : tint ? tint.fill : "var(--ink-900)";
    const badge = state === "disabled" ? /*#__PURE__*/React.createElement(ChromeBadge, {
      text: "off",
      bg: "#6E757D"
    }) : state === "signup" ? /*#__PURE__*/React.createElement(ChromeBadge, {
      text: "",
      bg: "var(--mop-500)"
    }) : state === "upgrade" ? /*#__PURE__*/React.createElement(ChromeBadge, {
      text: "XL",
      bg: "var(--ink-900)",
      fg: "var(--paper-000)"
    }) : count ? /*#__PURE__*/React.createElement(ChromeBadge, {
      text: String(count),
      bg: "#D93025"
    }) : null;
    return /*#__PURE__*/React.createElement("span", _extends({
      title: label,
      style: {
        position: "relative",
        display: "inline-flex",
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-sm)",
        background: hover ? "var(--paper-200)" : "transparent",
        ...style
      },
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false)
    }, rest), /*#__PURE__*/React.createElement(Glyph, {
      size: 18,
      fill: fill,
      knock: "var(--paper-000)"
    }), badge);
  }
  const rev = hover && tint;
  const fill = state === "disabled" ? "var(--ink-300)" : rev ? "var(--paper-000)" : tint ? tint.fill : "var(--ink-500)";
  const bg = rev ? tint.fill : tint ? tint.wash : hover ? "var(--paper-200)" : "transparent";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    disabled: state === "disabled",
    "aria-haspopup": "dialog",
    "aria-label": label || "Slop Mop: is this post slop?",
    title: label || "Is this post slop?",
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      all: "unset",
      position: "relative",
      boxSizing: "border-box",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      borderRadius: "50%",
      cursor: state === "disabled" ? "default" : "pointer",
      background: bg,
      opacity: state === "disabled" ? 0.6 : 1,
      transition: "var(--transition-ui)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Glyph, {
    size: 20,
    fill: fill,
    knock: rev ? tint.fill : "var(--paper-000)"
  }), state === "signup" && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--mop-500)",
      boxShadow: "0 0 0 1.5px var(--paper-000)"
    }
  }), state === "upgrade" && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 1,
      right: -4,
      padding: "0 3px",
      borderRadius: 3,
      background: "var(--ink-900)",
      color: "var(--paper-000)",
      font: "700 8px/12px var(--font-body)"
    }
  }, "XL"));
}
Object.assign(__ds_scope, { MopIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MopIcon.jsx", error: String((e && e.message) || e) }); }

// components/core/MopMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The Slop Mop mark, exactly as supplied. Handle and head take `currentColor`;
 * the three bristle strokes take the surface color behind the mark.
 */
function MopMark({
  size = 20,
  knockout = "var(--surface-card)",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      flex: "0 0 auto",
      display: "block",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("rect", {
    x: "10.6",
    y: "2",
    width: "2.8",
    height: "12",
    rx: "1.4",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.2 13.6h13.6l-1.6 8.2H6.8z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.6 16.6v4.6M12 16.6v4.6M15.4 16.6v4.6",
    fill: "none",
    stroke: knockout,
    strokeWidth: "1.15",
    strokeLinecap: "round"
  }));
}
Object.assign(__ds_scope, { MopMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MopMark.jsx", error: String((e && e.message) || e) }); }

// components/account/SignUpCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function GoogleG() {
  // Placeholder mark — swap for Google's official "G" asset before shipping (their branding rules require it).
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "#FFFFFF",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "700 11px/1 var(--font-body)",
      color: "#1F1F1F",
      flex: "none"
    }
  }, "G");
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/* Same type roles as the details panel and popup. */
const suSx = {
  head: {
    font: "var(--weight-bold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-faint)"
  },
  sub: {
    font: "var(--weight-semibold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-faint)"
  },
  body: {
    margin: 0,
    font: "var(--weight-regular) 13px/1.45 var(--font-body)",
    color: "var(--text-muted)"
  },
  meta: {
    font: "var(--weight-regular) 11px/1.4 var(--font-mono)",
    color: "var(--text-faint)"
  },
  link: {
    all: "unset",
    cursor: "pointer",
    justifySelf: "center",
    padding: "var(--space-2) 0",
    font: "var(--weight-semibold) 13px/1.3 var(--font-body)",
    color: "var(--text-muted)",
    textDecoration: "underline",
    textUnderlineOffset: 3
  }
};
const shell = {
  boxSizing: "border-box",
  width: "100%",
  maxWidth: 380,
  padding: "var(--space-7)",
  background: "var(--surface-card)",
  color: "var(--text-body)",
  border: "var(--border-width) solid var(--border-hairline)",
  borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-raised)",
  display: "grid",
  gap: "var(--space-6)"
};

/**
 * Accounts (Phase 1–2, proposed). One card, three states:
 * wall — "Grab your free mop": Google, or a magic link by email. No passwords.
 * sent — "Check your email".
 * signedIn — the quiet confirmation, then it gets out of the way.
 */
function SignUpCard({
  state = "wall",
  email = "",
  onEmail,
  onGoogle,
  onSubmit,
  onResend,
  onDone,
  plan = "Free",
  style,
  ...rest
}) {
  const [val, setVal] = React.useState(email);
  const [useEmail, setUseEmail] = React.useState(false);
  if (state === "sent") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        ...shell,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        font: "var(--type-title)",
        letterSpacing: "var(--tracking-tight)"
      }
    }, "Check your email"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: "var(--type-body-sm)",
        color: "var(--text-muted)"
      }
    }, "We sent a sign-in link to ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text-body)"
      }
    }, email || "you@example.com"), ". Open it in this browser. It works once and expires in 15 minutes."), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        gap: "var(--space-5)",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
      variant: "secondary",
      size: "sm",
      onClick: onResend
    }, "Send it again"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
      variant: "ghost",
      size: "sm",
      onClick: onDone
    }, "Use a different email")));
  }
  if (state === "signedIn") {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        ...shell,
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.MopMark, {
      size: 22,
      style: {
        color: "var(--ink-900)"
      }
    }), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        font: "var(--type-heading)"
      }
    }, "You're signed in")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        font: "var(--type-body-sm)",
        color: "var(--text-muted)"
      }
    }, "Signed in as ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--text-body)"
      }
    }, email || "you@example.com"), " \xB7 ", plan, ". Your votes and settings now follow you to up to five browsers."), /*#__PURE__*/React.createElement(__ds_scope.Button, {
      variant: "primary",
      onClick: onDone,
      iconAfter: "arrow-right"
    }, "Back to your feed"));
  }
  const ok = EMAIL_RE.test(val.trim());
  const send = () => ok && onSubmit && onSubmit(val.trim());
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...shell,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: suSx.head
  }, "Free account"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--text-xl)/1.15 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "Grab your free mop"), /*#__PURE__*/React.createElement("p", {
    style: suSx.body
  }, "An account keeps your votes and settings, and lets you pick the one feed Slop Mop cleans for free. No password.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onGoogle
  }, /*#__PURE__*/React.createElement(GoogleG, null), " Continue with Google"), !useEmail ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setUseEmail(true),
    style: suSx.link
  }, "Sign in with email instead") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      send();
    },
    style: {
      display: "grid",
      gap: "var(--space-4)",
      paddingTop: "var(--space-5)",
      borderTop: "var(--border-width) solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: suSx.sub
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    autoFocus: true,
    value: val,
    placeholder: "you@example.com",
    "aria-invalid": val.length > 3 && !ok,
    onChange: e => {
      setVal(e.target.value);
      onEmail && onEmail(e.target.value);
    },
    style: {
      height: 40,
      padding: "0 var(--space-5)",
      borderRadius: "var(--radius-sm)",
      border: `var(--border-width) solid ${val.length > 3 && !ok ? "var(--red-500)" : "var(--border-default)"}`,
      background: "var(--surface-card)",
      color: "var(--text-body)",
      font: "var(--weight-regular) 14px/1 var(--font-body)",
      outline: "none",
      boxSizing: "border-box"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    disabled: !ok,
    onClick: send
  }, "Email me a sign-in link"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setUseEmail(false),
    style: {
      ...suSx.link,
      padding: 0
    }
  }, "Cancel")))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      ...suSx.meta
    }
  }, "we store your email and a hash of each browser's install id \xB7 nothing else"));
}
Object.assign(__ds_scope, { SignUpCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/account/SignUpCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Wordmark({
  size = 20,
  tone = "ink",
  showDot = false,
  showMark = true,
  style,
  ...rest
}) {
  const color = tone === "inverse" ? "var(--paper-000)" : "var(--ink-900)";
  const knockout = tone === "inverse" ? "var(--ink-900)" : "var(--surface-card)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: size * 0.36,
      ...style
    }
  }, rest), showMark && /*#__PURE__*/React.createElement(__ds_scope.MopMark, {
    size: size * 1.15,
    knockout: knockout,
    style: {
      color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${size}px/1 var(--font-display)`,
      letterSpacing: "var(--tracking-tight)",
      color
    }
  }, "Slop Mop"), showDot && /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) ${size * 0.6}px/1 var(--font-mono)`,
      color: "var(--text-faint)"
    }
  }, ".lol"));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/verdict/FoldStrip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The 44px folded-paper strip that replaces a hidden post (content/fold.ts): two halves tilted at ±38°, a crease, the
 * mop (tinted by why it was hidden: red likely slop, yellow possibly) + "This post was hidden", the reader's hidden counts, and "Show post". The whole strip is the button.
 * Narrow hosts drop month and all time first (`density="compact"`), then all stats (`"minimal"`).
 */
function FoldStrip({
  label = "This post was hidden",
  tone = "red",
  stats,
  density = "full",
  onRestore,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const half = {
    position: "absolute",
    left: 0,
    right: 0,
    height: "50%",
    border: "var(--border-width) solid var(--border-hairline)",
    boxShadow: "var(--shadow-card)"
  };
  const cell = (n, l) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-2)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--type-mono)",
      fontWeight: 500,
      color: "var(--text-body)"
    }
  }, n ?? "–"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-label)",
      color: "var(--text-faint)"
    }
  }, l));
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "button",
    tabIndex: 0,
    "aria-label": "This post was hidden by Slop Mop. Activate to show it.",
    onClick: onRestore,
    onKeyDown: e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onRestore && onRestore()),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      height: "var(--fold-height)",
      perspective: 900,
      cursor: "pointer",
      font: "var(--type-ui)",
      color: "var(--text-body)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      ...half,
      top: 0,
      transformOrigin: "50% 100%",
      transform: "rotateX(38deg)",
      borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
      borderBottom: 0,
      background: "var(--paper-000)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...half,
      bottom: 0,
      transformOrigin: "50% 0",
      transform: "rotateX(-38deg)",
      borderRadius: "0 0 var(--radius-sm) var(--radius-sm)",
      borderTop: 0,
      background: "var(--paper-100)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
      height: 1,
      background: "var(--fold-crease)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      padding: "0 var(--space-5) 0 var(--space-6)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      whiteSpace: "nowrap",
      minWidth: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MopMark, {
    size: 18,
    knockout: "var(--paper-000)",
    style: {
      color: tone === "yellow" ? "var(--mop-500)" : "var(--red-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, label)), stats && density !== "minimal" && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      flex: "none"
    }
  }, cell(stats.today, "today"), cell(stats.week, "week"), density === "full" && cell(stats.month, "month"), density === "full" && cell(stats.total, "all time")), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: stats && density !== "minimal" ? 0 : "auto",
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      height: 26,
      padding: "0 var(--space-5)",
      border: "var(--border-width) solid var(--border-default)",
      borderRadius: "var(--radius-sm)",
      background: hover ? "var(--paper-100)" : "var(--paper-000)",
      color: "var(--text-body)",
      font: "var(--type-label)",
      transition: "var(--transition-ui)"
    }
  }, "Show post")));
}
Object.assign(__ds_scope, { FoldStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/FoldStrip.jsx", error: String((e && e.message) || e) }); }

// components/verdict/HighlightFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LEVELS = {
  warn: {
    color: "var(--mop-500)",
    chipBg: "var(--mop-100)",
    chipFg: "var(--mop-900)",
    chipBorder: "var(--mop-500)",
    icon: "flag",
    text: "Possibly slop"
  },
  danger: {
    color: "var(--red-500)",
    chipBg: "var(--red-100)",
    chipFg: "var(--red-700)",
    chipBorder: "var(--red-500)",
    icon: "triangle-alert",
    text: "Likely slop"
  }
};

/** Highlight-mode wrapper: non-layout-shifting box-shadow border + a worded corner chip. */
function HighlightFrame({
  level = "warn",
  label,
  children,
  style,
  ...rest
}) {
  const l = LEVELS[level] || LEVELS.warn;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      borderRadius: "var(--radius-sm)",
      boxShadow: `0 0 0 var(--border-width-flag) ${l.color}`,
      ...style
    }
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -11,
      right: "var(--space-6)",
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: 22,
      padding: "0 var(--space-4)",
      borderRadius: "var(--radius-xs)",
      background: l.chipBg,
      color: l.chipFg,
      border: `var(--border-width) solid ${l.chipBorder}`,
      font: "var(--type-label)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: l.icon,
    size: 12
  }), label || l.text));
}
Object.assign(__ds_scope, { HighlightFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/HighlightFrame.jsx", error: String((e && e.message) || e) }); }

// components/verdict/NoticePanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Plain-text states the extension shows when it can't (or won't) judge — inspectorPanel.ts and composer.ts notices. */
const NOTICES = {
  scoring: {
    busy: true
  },
  couldntScore: {
    title: "Couldn't score this post",
    body: "The Slop Mop server didn't answer. Try again in a moment."
  },
  couldntDraft: {
    title: "Couldn't check this draft",
    body: "The Slop Mop server didn't answer. Try again in a moment."
  },
  tooShort: {
    title: "Write a little more first",
    body: "Slop Mop needs at least 20 characters to judge a draft."
  },
  nothing: {
    title: "Nothing to judge yet",
    body: "Jev didn't return anything usable for this text."
  },
  dailyLimit: {
    title: "Daily limit reached",
    body: "Daily limit of 250 checks reached. It resets at 12:00 AM."
  },
  datacenter: {
    title: "Checking is paused here",
    body: "This network's IP looks like a cloud or hosting address (this happens on some VPNs, and on some corporate networks too). Slop Mop will try again automatically at 3:40 PM."
  },
  disabled: {
    title: "This install is disabled",
    body: "This install has been disabled by the Slop Mop server."
  }
};
function Dots() {
  return /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Scoring",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      height: 22
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      display: "block",
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "var(--ink-400)",
      opacity: 0.45 + i * 0.25
    }
  })));
}

/** The 260px panel for a notice, or three dots while a post is scored on demand. Never a toast, never a modal. */
function NoticePanel({
  kind,
  title,
  body,
  style,
  ...rest
}) {
  const n = kind && NOTICES[kind] || {};
  const t = title ?? n.title,
    b = body ?? n.body;
  const alert = kind && kind !== "scoring" && kind !== "tooShort";
  return /*#__PURE__*/React.createElement("div", _extends({
    role: n.busy ? "status" : alert ? "alert" : "note",
    style: {
      width: 260,
      boxSizing: "border-box",
      padding: "var(--space-5) var(--space-6)",
      background: "var(--surface-card)",
      color: "var(--text-body)",
      border: "var(--border-width) solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-pop)",
      font: "var(--type-body-sm)",
      ...style
    }
  }, rest), n.busy ? /*#__PURE__*/React.createElement(Dots, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: "0 0 var(--space-2)",
      font: "var(--type-label)",
      color: "var(--text-muted)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, b)));
}
Object.assign(__ds_scope, { NOTICES, NoticePanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/NoticePanel.jsx", error: String((e && e.message) || e) }); }

// components/verdict/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function StatTile({
  label,
  value,
  sub,
  tone = "neutral",
  style,
  ...rest
}) {
  const accent = tone === "warn" ? "var(--mop-500)" : tone === "danger" ? "var(--red-500)" : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      gap: 2,
      padding: "var(--space-5)",
      background: "var(--surface-card)",
      border: "var(--border-width) solid var(--border-hairline)",
      borderRadius: "var(--radius-sm)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) var(--text-xl)/1.1 var(--font-display)",
      letterSpacing: "var(--tracking-tight)",
      color: accent || "var(--text-body)"
    }
  }, value), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, sub));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/verdict/tones.js
try { (() => {
/** The verdict scale as the shipped verdictStyle.ts draws it: wash, colored text, thin border — never color alone. */
const TONE = {
  red: {
    bg: "var(--red-100)",
    text: "var(--red-700)",
    border: "var(--red-500)",
    accent: "var(--red-500)",
    dark: "var(--red-700)"
  },
  yellow: {
    bg: "var(--mop-100)",
    text: "var(--mop-900)",
    border: "var(--mop-500)",
    accent: "var(--mop-500)",
    dark: "var(--mop-900)"
  },
  gray: {
    bg: "var(--flag-unsure-wash)",
    text: "var(--ink-700)",
    border: "var(--ink-300)",
    accent: "var(--ink-400)",
    dark: "var(--ink-700)"
  },
  green: {
    bg: "var(--blue-100)",
    text: "var(--blue-700)",
    border: "var(--blue-200)",
    accent: "var(--blue-500)",
    dark: "var(--blue-700)"
  }
};

/** verdict id → words + tone. "clean" is the own-draft stop ("Reads clean"); everything else is the four-stop feed scale. */
const VERDICTS = {
  likely: {
    text: "Likely slop",
    tone: "red"
  },
  possibly: {
    text: "Possibly slop",
    tone: "yellow"
  },
  unsure: {
    text: "Not sure",
    tone: "gray"
  },
  fine: {
    text: "Looks fine",
    tone: "green"
  },
  clean: {
    text: "Reads clean",
    tone: "green"
  }
};

/** no = blue, maybe = yellow, probably = red (shared/vote.ts). */
const VOTE_TONE = {
  no: "green",
  maybe: "yellow",
  probably: "red"
};
const VOTE_NAME = {
  no: "No",
  maybe: "Maybe",
  probably: "Probably"
};

/** The nine tells in radar order (content/labels.ts TELL_AXES): related tells sit next to each other. */
const TELLS = [{
  id: "formulaicHook",
  label: "Scroll-stopper"
}, {
  id: "engagementBait",
  label: "Engagement bait"
}, {
  id: "hypeMarketing",
  label: "Hype words"
}, {
  id: "emptyEvaluation",
  label: "Empty praise"
}, {
  id: "tradeoffFreePromises",
  label: "No-catch promises"
}, {
  id: "contrastFraming",
  label: "“Not X, but Y”"
}, {
  id: "manneredProse",
  label: "Flowery prose"
}, {
  id: "formalHedging",
  label: "Stiff phrasing"
}, {
  id: "manufacturedNarrative",
  label: "Too-tidy story"
}];
Object.assign(__ds_scope, { TONE, VERDICTS, VOTE_TONE, VOTE_NAME, TELLS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/tones.js", error: String((e && e.message) || e) }); }

// components/verdict/ScoreZones.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Fine → Possibly → Likely, with the post's place on it (inspectorSections.ts scoreZones). Zone lines come from the reader's
 * sensitivity; on the 0–100 display scale Moderate puts Possibly at 40 and Likely at 70. With a vote the dot moves to the
 * middle of the voted zone and takes its color. In Hide mode a black line marks where posts get hidden.
 */
function ScoreZones({
  score = 0,
  possibly = 40,
  likely = 70,
  vote = null,
  hides = false,
  blocked = false,
  style,
  ...rest
}) {
  const vt = vote ? __ds_scope.VOTE_TONE[vote] : null;
  const left = vt === "green" ? possibly / 2 : vt === "yellow" ? (possibly + likely) / 2 : vt === "red" ? (likely + 100) / 2 : Math.min(100, score);
  const dot = vt ? __ds_scope.TONE[vt].dark : "var(--ink-900)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: 8,
      borderRadius: "var(--radius-pill)",
      position: "relative",
      margin: "4px 0 6px",
      opacity: blocked ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      width: `${possibly}%`,
      background: "var(--blue-200)",
      borderRadius: "999px 0 0 999px"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      width: `${likely - possibly}%`,
      background: "var(--mop-200)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      flex: 1,
      background: "var(--red-200)",
      borderRadius: "0 999px 999px 0"
    }
  }), hides && /*#__PURE__*/React.createElement("span", {
    title: "Posts past this line are hidden",
    style: {
      position: "absolute",
      top: -3,
      bottom: -3,
      left: `${likely}%`,
      width: 2,
      marginLeft: -1,
      background: "var(--ink-900)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -4,
      left: `${Math.max(0, Math.min(100, left))}%`,
      width: 16,
      height: 16,
      marginLeft: -8,
      borderRadius: "50%",
      border: "2px solid var(--surface-raised)",
      boxShadow: "var(--shadow-raised)",
      background: dot,
      transition: "left var(--dur-base) var(--ease-standard)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 15,
      font: "var(--weight-medium) 11px/1.35 var(--font-body)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      whiteSpace: "nowrap"
    }
  }, "Looks fine"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: `min(${possibly}%, calc(100% - 15em))`,
      whiteSpace: "nowrap"
    }
  }, "Possibly slop"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 0,
      whiteSpace: "nowrap"
    }
  }, hides ? "Likely slop · hidden" : "Likely slop")), blocked && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-4) 0 0",
      font: "var(--weight-regular) 12px/1.4 var(--font-body)",
      color: "var(--text-faint)"
    }
  }, "The score is past a line, but this post isn't flagged: see the note above."));
}
Object.assign(__ds_scope, { ScoreZones });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/ScoreZones.jsx", error: String((e && e.message) || e) }); }

// components/verdict/Slopprint.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const W = 340,
  H = 250,
  CY = 124,
  R = 74,
  RINGS = [1 / 3, 2 / 3, 1],
  MIN = 0.03,
  HOT = 0.5;

/**
 * The Slopprint: a spider chart of Jev's score on each of the nine tells (inspectorRadar.ts geometry).
 * The further a point sits from the center, the stronger that tell. Labels at ≥ 0.5 go bold.
 */
function Slopprint({
  values = {},
  highlight,
  color = "var(--ink-400)",
  width = "100%",
  style,
  ...rest
}) {
  const axes = __ds_scope.TELLS.map(t => ({
    label: t.label,
    value: values[t.id] ?? 0
  }));
  const n = axes.length,
    cx = W / 2;
  const ang = i => -Math.PI / 2 + i * 2 * Math.PI / n;
  const at = (i, r) => ({
    x: cx + Math.cos(ang(i)) * r,
    y: CY + Math.sin(ang(i)) * r
  });
  const pts = rf => axes.map((_, i) => {
    const p = at(i, rf(i));
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
  const reach = v => R * Math.max(MIN, Math.min(1, v));
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: `0 0 ${W} ${H}`,
    width: width,
    role: "img",
    style: {
      display: "block",
      height: "auto",
      ...style
    }
  }, rest, {
    "aria-label": `Tell strengths: ${axes.map(a => `${a.label} ${Math.round(a.value * 100)}%`).join(", ")}`
  }), RINGS.map(k => /*#__PURE__*/React.createElement("polygon", {
    key: k,
    points: pts(() => R * k),
    fill: "none",
    stroke: "var(--chart-grid)",
    strokeWidth: "1"
  })), axes.map((_, i) => {
    const p = at(i, R);
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: cx,
      y1: CY,
      x2: p.x,
      y2: p.y,
      stroke: "var(--chart-grid)",
      strokeWidth: "1"
    });
  }), /*#__PURE__*/React.createElement("polygon", {
    points: pts(i => reach(axes[i].value)),
    fillOpacity: "0.22",
    strokeWidth: "2",
    strokeLinejoin: "round",
    style: {
      fill: color,
      stroke: color,
      transition: "fill 600ms ease, stroke 600ms ease"
    }
  }), axes.map((a, i) => {
    const tip = at(i, reach(a.value)),
      c = Math.cos(ang(i)),
      s = Math.sin(ang(i)),
      l = at(i, R + 9);
    const hot = highlight ? highlight.includes(a.label) : a.value >= HOT;
    return /*#__PURE__*/React.createElement("g", {
      key: a.label
    }, /*#__PURE__*/React.createElement("circle", {
      cx: tip.x,
      cy: tip.y,
      r: "2.6",
      style: {
        fill: color,
        transition: "fill 600ms ease"
      }
    }), /*#__PURE__*/React.createElement("text", {
      x: l.x,
      y: l.y + (s > 0.5 ? 9 : s < -0.5 ? -2 : 3.5),
      textAnchor: c > 0.3 ? "start" : c < -0.3 ? "end" : "middle",
      style: {
        font: "var(--type-label)",
        fontSize: 11.5,
        fontWeight: hot ? 700 : 500,
        fill: hot ? "var(--text-body)" : "var(--text-muted)"
      }
    }, a.label));
  }));
}
Object.assign(__ds_scope, { Slopprint });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/Slopprint.jsx", error: String((e && e.message) || e) }); }

// components/verdict/VoteControl.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const OPTIONS = [{
  value: null,
  label: "Not sure"
}, {
  value: "no",
  label: "No"
}, {
  value: "maybe",
  label: "Maybe"
}, {
  value: "probably",
  label: "Probably"
}];

/**
 * "Is this slop?" — Not sure / No / Maybe / Probably, as shipped in the details panel (inspectorSections.ts voteRow).
 * Not sure is the unvoted state, not a fifth opinion: picking it clears your vote. A picked answer takes its verdict tone
 * (No blue, Maybe yellow, Probably red) and overrides Jev for your own feed.
 */
function VoteControl({
  value = null,
  onChange,
  label = "Is this slop?",
  error,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-disabled": disabled || undefined,
    inert: disabled ? "" : undefined,
    style: {
      display: "grid",
      gap: "var(--space-2)",
      ...(disabled ? {
        opacity: 0.4,
        pointerEvents: "none",
        filter: "grayscale(1)"
      } : null),
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      color: "var(--text-muted)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": "Is this post slop?",
    style: {
      display: "flex",
      padding: 2,
      gap: 2,
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-sunken)",
      border: "var(--border-width) solid var(--border-hairline)"
    }
  }, OPTIONS.map(o => {
    const on = (value ?? null) === o.value;
    const t = __ds_scope.TONE[o.value ? __ds_scope.VOTE_TONE[o.value] : "gray"];
    return /*#__PURE__*/React.createElement("button", {
      key: o.label,
      type: "button",
      role: "radio",
      "aria-checked": on,
      onClick: () => onChange && onChange(o.value),
      style: {
        flex: 1,
        padding: "var(--space-3) 0",
        cursor: "pointer",
        textAlign: "center",
        borderRadius: "var(--radius-xs)",
        transition: "var(--transition-ui)",
        font: "var(--type-label)",
        fontWeight: on ? "var(--weight-semibold)" : "var(--weight-medium)",
        border: `var(--border-width) solid ${on ? t.border : "transparent"}`,
        background: on ? t.bg : "transparent",
        color: on ? t.text : "var(--text-muted)"
      }
    }, o.label);
  })), error && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      color: "var(--red-700)"
    }
  }, error));
}
Object.assign(__ds_scope, { VoteControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/VoteControl.jsx", error: String((e && e.message) || e) }); }

// components/verdict/WhyCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** composite.ts classify() — the sentence beside the chip. */
const OUTCOMES = {
  likely: "This reads like slop.",
  likelyHidden: "This reads like slop, so it was hidden.",
  possibly: "This has some hallmarks of slop, but isn't clear-cut.",
  unsure: "Jev wasn't confident enough to call this one, so it isn't flagged.",
  fine: "Nothing here stands out as slop."
};

/*
 * The panel's type system — five roles, nothing else:
 *   score    28/1 bold display, tabular        the one number that leads
 *   body     13/1.45 regular                   sentences, bar labels, signal names
 *   label    12/1.3 medium|semibold            chips, buttons, the vote notice
 *   head     11/1.2 bold caps, ink             section heads (IS THIS SLOP?, THE SLOPPRINT)
 *   sub      11/1.2 semibold caps, faint       sub-heads inside a section
 *   meta     11/1.4 mono, faint                machine counts at the foot only
 * Spacing: 16 panel padding · 16 above/below each divider · 12 between blocks in a section · 4–6 inside a pair.
 */
const whySx = {
  head: {
    margin: 0,
    font: "var(--weight-bold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-body)"
  },
  sub: {
    margin: 0,
    font: "var(--weight-semibold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-faint)"
  },
  body: {
    margin: 0,
    font: "var(--weight-regular) 13px/1.45 var(--font-body)",
    color: "var(--text-body)"
  },
  label: {
    font: "var(--weight-semibold) 12px/1.3 var(--font-body)"
  },
  meta: {
    font: "var(--weight-regular) 11px/1.4 var(--font-mono)",
    color: "var(--text-faint)"
  },
  section: {
    display: "grid",
    gap: "var(--space-5)",
    paddingTop: "var(--space-6)",
    marginTop: "var(--space-6)",
    borderTop: "var(--border-width) solid var(--border-hairline)"
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    height: 22,
    padding: "0 var(--space-4)",
    borderRadius: "var(--radius-xs)",
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  }
};
function InfoGlyph() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    "aria-hidden": "true",
    style: {
      flex: "none",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4M12 8h.01"
  }));
}
function CounterBar({
  label,
  value,
  info,
  pulse
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      ...whySx.body,
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, label), info && /*#__PURE__*/React.createElement("a", {
    href: `https://slopmop.lol/how-it-works.html#${info}`,
    target: "_blank",
    rel: "noopener",
    "aria-label": `How "${label}" works`,
    style: {
      display: "inline-flex",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement(InfoGlyph, null))), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 6,
      borderRadius: "var(--radius-pill)",
      background: "var(--track)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      position: "absolute",
      inset: "0 auto 0 0",
      width: pulse ? "20%" : `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%`,
      background: "var(--blue-500)",
      borderRadius: "var(--radius-pill)",
      animation: pulse ? `whyBarPulse ${pulse[0]}ms ease-in-out ${pulse[1]}ms infinite` : "none"
    }
  })));
}

/** No / Maybe / Probably as one bar, each segment sized by its share. Labels sit inside in inverted text; a thin segment keeps only its number. */
function CommunityBar({
  no = 0,
  maybe = 0,
  probably = 0
}) {
  const total = no + maybe + probably;
  const segs = [{
    n: no,
    word: "No",
    bg: "var(--blue-500)",
    fg: "var(--text-on-solid)"
  }, {
    n: maybe,
    word: "Maybe",
    bg: "var(--mop-500)",
    fg: "var(--text-on-accent)"
  }, {
    n: probably,
    word: "Probably",
    bg: "var(--red-500)",
    fg: "var(--text-on-solid)"
  }].filter(x => x.n > 0);
  return /*#__PURE__*/React.createElement("div", {
    role: "img",
    "aria-label": `Community votes: ${no} no, ${maybe} maybe, ${probably} probably`,
    style: {
      display: "flex",
      height: 22,
      gap: 2,
      borderRadius: "var(--radius-xs)",
      overflow: "hidden"
    }
  }, segs.map(x => {
    const share = x.n / total;
    return /*#__PURE__*/React.createElement("span", {
      key: x.word,
      title: `${x.n} ${x.word}`,
      style: {
        flex: `${x.n} 1 0`,
        minWidth: 22,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "0 6px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        background: x.bg,
        color: x.fg,
        font: "var(--weight-semibold) 11px/1 var(--font-body)"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 700,
        fontVariantNumeric: "tabular-nums"
      }
    }, x.n), share >= 0.25 && /*#__PURE__*/React.createElement("span", null, x.word));
  }));
}

/** "112 checks remaining today" over a thin meter of what's used. Red when the limit is reached. */
function ChecksLeft({
  used = 0,
  limit = 250
}) {
  const left = Math.max(0, limit - used),
    full = left === 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    },
    title: "Posts checked today, out of your daily limit"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: whySx.sub
  }, "Checks today"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...whySx.meta,
      color: full ? "var(--red-500)" : "var(--text-faint)"
    }
  }, full ? "none left · resets at midnight" : `${left} remaining`)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 6,
      borderRadius: "var(--radius-pill)",
      background: "var(--track)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: "100%",
      width: `${Math.min(100, used / limit * 100)}%`,
      background: full ? "var(--red-500)" : "var(--ink-400)",
      borderRadius: "var(--radius-pill)"
    }
  })));
}

/**
 * Loading: the Slopprint shape wanders between random readings while its color cycles blue → yellow → red,
 * and the three bars sweep empty ↔ full, until the score arrives. Respects prefers-reduced-motion (holds still).
 */
const LOAD_COLORS = ["var(--blue-500)", "var(--mop-500)", "var(--red-500)"];
const LOAD_STEP = 700;
function useLoadingMotion(on) {
  const [tick, setTick] = React.useState(0);
  const [shape, setShape] = React.useState({});
  React.useEffect(() => {
    if (!on) return;
    const still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = () => Object.fromEntries(__ds_scope.TELLS.map(x => [x.id, 0.15 + Math.random() * 0.75]));
    let from = rand(),
      to = rand(),
      t0 = performance.now(),
      raf,
      iv;
    if (still) {
      setShape(from);
      return;
    }
    const frame = now => {
      const k = Math.min(1, (now - t0) / LOAD_STEP),
        e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setShape(Object.fromEntries(__ds_scope.TELLS.map(x => [x.id, from[x.id] + (to[x.id] - from[x.id]) * e])));
      if (k >= 1) {
        from = to;
        to = rand();
        t0 = now;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    iv = setInterval(() => setTick(n => n + 1), LOAD_STEP);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
    };
  }, [on]);
  return {
    shape,
    color: LOAD_COLORS[tick % 3]
  };
}

/**
 * The details panel, in four chunks: the verdict (score, where it sits, Jev's call) → your vote → what Jev noticed
 * (Slopprint + counter-signals) → the foot (community votes, checks remaining). A vote dims Jev's call and takes the top-right corner.
 */
function WhyCard({
  verdict = "likely",
  score = 0,
  outcome,
  mode = "hide",
  own = false,
  checksToday,
  draft,
  tells = {},
  strongest,
  humanVoice = 0,
  usefulness = 0,
  readerResponse = 0,
  possibly = 40,
  likely = 70,
  blocked = false,
  vote = null,
  onVote,
  voteError,
  community,
  interactive = true,
  loading = false,
  style,
  ...rest
}) {
  const motion = useLoadingMotion(loading);
  const v = __ds_scope.VERDICTS[own && verdict === "fine" ? "clean" : verdict] || __ds_scope.VERDICTS.likely;
  const t = __ds_scope.TONE[v.tone];
  const voted = !!vote;
  const sentence = outcome ?? (verdict === "likely" && mode === "hide" && !own ? OUTCOMES.likelyHidden : OUTCOMES[verdict] || OUTCOMES.fine);
  // Strongest signals: tells ≥ 0.5, strongest first — at least one (the top tell, if any fired), never more than three.
  const ranked = __ds_scope.TELLS.filter(x => (tells[x.id] ?? 0) > 0).sort((a, b) => tells[b.id] - tells[a.id]);
  const strong = ranked.filter(x => tells[x.id] >= 0.5);
  const named = strongest ?? (strong.length ? strong : ranked.slice(0, 1)).slice(0, 3).map(x => x.label);
  const hides = mode === "hide" && !own;
  const vt = voted ? __ds_scope.TONE[__ds_scope.VOTE_TONE[vote]] : null;
  const jev = {
    opacity: voted && !loading ? 0.15 : 1,
    transition: "opacity var(--dur-base) var(--ease-standard)"
  };
  const hasCommunity = community && community.probably + community.maybe + community.no > 0;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: interactive ? "dialog" : "tooltip",
    "aria-label": "Slop Mop breakdown",
    "aria-busy": loading || undefined,
    style: {
      width: 340,
      maxWidth: "calc(100vw - 16px)",
      boxSizing: "border-box",
      padding: "var(--space-6)",
      background: "var(--surface-raised)",
      color: "var(--text-body)",
      border: "var(--border-width) solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-pop)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, draft && /*#__PURE__*/React.createElement("div", {
    style: {
      ...whySx.body,
      fontSize: 12,
      padding: "var(--space-3) var(--space-4)",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, "Draft."), " Not posted yet, so it's scored on the writing alone, with no reader response.", typeof draft === "object" ? ` This used one check (${draft.used} of ${draft.limit} today).` : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      minHeight: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MopMark, {
    size: 24,
    knockout: "var(--surface-raised)",
    style: {
      color: "var(--ink-900)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...jev,
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-bold) 28px/1 var(--font-display)",
      letterSpacing: "var(--tracking-tight)",
      fontVariantNumeric: "tabular-nums"
    }
  }, loading ? "?" : Math.round(score)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...whySx.body,
      color: "var(--text-faint)"
    }
  }, "/ 100"))), voted && !loading && /*#__PURE__*/React.createElement("span", {
    role: "status",
    "aria-label": `Your vote: ${__ds_scope.VOTE_NAME[vote]}. It overrides Jev's call.`,
    style: {
      ...whySx.chip,
      ...whySx.label,
      background: vt.bg,
      color: vt.text,
      border: `1px solid ${vt.border}`
    }
  }, "Your vote: ", __ds_scope.VOTE_NAME[vote])), /*#__PURE__*/React.createElement("div", {
    style: {
      ...jev,
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, loading ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...whySx.chip,
      ...whySx.label,
      flex: "none",
      background: "var(--flag-unsure-wash)",
      color: "var(--text-muted)",
      border: "1px solid var(--border-default)"
    }
  }, "Checking\u2026") : /*#__PURE__*/React.createElement("span", {
    style: {
      ...whySx.chip,
      ...whySx.label,
      flex: "none",
      background: t.bg,
      color: t.text,
      border: `1px solid ${t.border}`
    }
  }, v.text), /*#__PURE__*/React.createElement("p", {
    role: loading ? "status" : undefined,
    style: whySx.body
  }, loading ? "Wringing it out. Give it a second." : sentence)), loading ? /*#__PURE__*/React.createElement(__ds_scope.ScoreZones, {
    score: 0,
    possibly: possibly,
    likely: likely,
    hides: hides,
    style: {
      opacity: 0.35
    },
    "aria-hidden": "true"
  }) : /*#__PURE__*/React.createElement(__ds_scope.ScoreZones, {
    score: score,
    possibly: possibly,
    likely: likely,
    vote: vote,
    hides: hides,
    blocked: blocked,
    style: jev
  })), interactive && onVote && /*#__PURE__*/React.createElement("div", {
    style: whySx.section
  }, /*#__PURE__*/React.createElement("h4", {
    style: whySx.head
  }, "Is this slop?"), /*#__PURE__*/React.createElement(__ds_scope.VoteControl, {
    label: null,
    value: loading ? null : vote,
    onChange: onVote,
    error: loading ? null : voteError,
    disabled: loading
  })), /*#__PURE__*/React.createElement("div", {
    style: whySx.section
  }, /*#__PURE__*/React.createElement("h4", {
    style: whySx.head
  }, "The Slopprint"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: whySx.sub
  }, loading ? "Strongest signals" : named.length > 1 ? "Strongest signals" : named.length ? "Strongest signal" : "Signals"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...whySx.body,
      fontWeight: named.length && !loading ? 600 : 400,
      color: loading ? "var(--text-faint)" : undefined
    }
  }, loading ? "Reading…" : named.length ? named.join(" · ") : "No strong signs of slop.")), loading ? /*#__PURE__*/React.createElement(__ds_scope.Slopprint, {
    values: motion.shape,
    highlight: [],
    color: motion.color,
    "aria-label": "Scoring the nine signals"
  }) : /*#__PURE__*/React.createElement(__ds_scope.Slopprint, {
    values: tells,
    highlight: named,
    color: t.accent
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: whySx.sub
  }, "In its favor"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) 120px",
      gap: "var(--space-3) var(--space-5)",
      alignItems: "center"
    }
  }, loading && /*#__PURE__*/React.createElement("style", null, "@keyframes whyBarPulse{0%,100%{width:18%;opacity:.55}50%{width:62%;opacity:1}}@media (prefers-reduced-motion:reduce){[aria-busy] i{animation:none!important}}"), /*#__PURE__*/React.createElement(CounterBar, {
    label: "Sounds like a person",
    value: humanVoice,
    pulse: loading && [3200, -400],
    info: interactive && "sounds-like-a-person"
  }), /*#__PURE__*/React.createElement(CounterBar, {
    label: "Useful to readers",
    value: usefulness,
    pulse: loading && [4100, -1900],
    info: interactive && "useful-to-readers"
  }), /*#__PURE__*/React.createElement(CounterBar, {
    label: "Reader response",
    value: draft ? 0 : readerResponse,
    pulse: loading && [3700, -2800],
    info: interactive && "reader-response"
  })))), !draft && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      margin: "var(--space-6) calc(var(--space-6) * -1) calc(var(--space-6) * -1)",
      padding: "var(--space-6)",
      background: "var(--surface-raised-foot)",
      borderTop: "var(--border-width) solid var(--border-hairline)",
      borderRadius: "0 0 var(--radius-md) var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: whySx.sub
  }, "Community votes"), /*#__PURE__*/React.createElement("span", {
    style: whySx.meta
  }, loading ? "–" : hasCommunity ? community.no + community.maybe + community.probably : 0, " total")), loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: 22,
      borderRadius: "var(--radius-xs)",
      background: "var(--track)"
    },
    "aria-hidden": "true"
  }) : hasCommunity ? /*#__PURE__*/React.createElement(CommunityBar, community) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-xs)",
      background: "var(--track)",
      font: "var(--weight-medium) 11px/1 var(--font-body)",
      color: "var(--text-faint)"
    }
  }, "No votes yet")), checksToday && /*#__PURE__*/React.createElement(ChecksLeft, checksToday)));
}
Object.assign(__ds_scope, { OUTCOMES, WhyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/WhyCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/account/Dashboard.jsx
try { (() => {
const DS = window.SlopMopDesignSystem_ca9143;

/* Same type roles as the details panel and popup. */
const dbSx = {
  head: {
    margin: 0,
    font: "var(--weight-bold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-body)"
  },
  sub: {
    font: "var(--weight-semibold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-faint)"
  },
  body: {
    margin: 0,
    font: "var(--weight-regular) 13px/1.45 var(--font-body)",
    color: "var(--text-muted)"
  },
  meta: {
    font: "var(--weight-regular) 11px/1.4 var(--font-mono)",
    color: "var(--text-faint)"
  },
  num: {
    font: "var(--weight-bold) var(--text-3xl)/1 var(--font-display)",
    letterSpacing: "var(--tracking-tight)",
    fontVariantNumeric: "tabular-nums"
  },
  card: {
    background: "var(--surface-card)",
    border: "var(--border-width) solid var(--border-hairline)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-card)",
    padding: "var(--space-7)",
    display: "grid",
    gap: "var(--space-6)",
    alignContent: "start",
    minWidth: 0
  }
};
const VERD = [{
  id: "fine",
  name: "Looks fine",
  color: "var(--blue-500)"
}, {
  id: "possibly",
  name: "Possibly slop",
  color: "var(--mop-500)"
}, {
  id: "likely",
  name: "Likely slop",
  color: "var(--red-500)"
}];
const fmt = n => n.toLocaleString("en-US");

/* Always the past 30 days, ending today. Counts are seeded, so the card never reshuffles. */
function makeDays(scale) {
  let seed = 7;
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const out = [];
  for (let i = 0; i < 30; i++) {
    const t = new Date();
    const d = new Date(t.getFullYear(), t.getMonth(), t.getDate() - 29 + i);
    const wk = d.getDay() === 0 || d.getDay() === 6;
    const total = Math.round((wk ? 34 : 70 + rnd() * 50) * scale);
    const likely = Math.round(total * (0.2 + rnd() * 0.14));
    const possibly = Math.round(total * (0.1 + rnd() * 0.1));
    out.push({
      date: d,
      fine: total - likely - possibly,
      possibly,
      likely,
      total
    });
  }
  return out;
}
const PLAN_DATA = {
  xlmail: {
    scale: 3.1,
    unfolded: 74,
    votes: 41,
    networks: [{
      id: "linkedin",
      share: 0.31
    }, {
      id: "x",
      share: 0.2
    }, {
      id: "reddit",
      share: 0.15
    }, {
      id: "facebook",
      share: 0.08
    }, {
      id: "articles",
      share: 0.1
    }, {
      id: "email",
      share: 0.16
    }],
    surfaces: [{
      name: "Feed posts",
      n: 0.5,
      split: [0.6, 0.15, 0.25]
    }, {
      name: "Articles",
      n: 0.1,
      split: [0.48, 0.2, 0.32]
    }, {
      name: "Comments",
      n: 0.24,
      split: [0.71, 0.13, 0.16]
    }, {
      name: "Emails",
      n: 0.16,
      split: [0.44, 0.19, 0.37]
    }]
  },
  free: {
    scale: 1,
    unfolded: 23,
    votes: 14,
    networks: [{
      id: "linkedin",
      share: 1
    }],
    surfaces: [{
      name: "Feed posts",
      n: 1,
      split: [0.62, 0.15, 0.23]
    }, {
      name: "Articles",
      locked: true
    }, {
      name: "Comments",
      locked: true
    }]
  },
  xl: {
    scale: 2.6,
    unfolded: 61,
    votes: 37,
    networks: [{
      id: "linkedin",
      share: 0.37
    }, {
      id: "x",
      share: 0.24
    }, {
      id: "reddit",
      share: 0.18
    }, {
      id: "facebook",
      share: 0.09
    }, {
      id: "articles",
      share: 0.12
    }, {
      id: "email",
      share: 0
    }],
    surfaces: [{
      name: "Feed posts",
      n: 0.58,
      split: [0.6, 0.15, 0.25]
    }, {
      name: "Articles",
      n: 0.12,
      split: [0.48, 0.2, 0.32]
    }, {
      name: "Comments",
      n: 0.3,
      split: [0.71, 0.13, 0.16]
    }]
  }
};
function Legend() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, VERD.map(v => /*#__PURE__*/React.createElement("span", {
    key: v.id,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      font: "var(--weight-medium) 12px/1 var(--font-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: v.color
    }
  }), v.name)));
}

/* 1 — exposure: everything that crossed your screen, by type; then how it sorted out by likelihood.
   Likelihood, not "hidden" — highlight-only readers never hide anything. */
const TYPE_SHADE = ["var(--ink-900)", "var(--ink-600)", "var(--ink-400)", "var(--ink-300)"];
function SegBar({
  segs,
  label,
  total,
  note,
  legend = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: dbSx.sub
  }, label), /*#__PURE__*/React.createElement("span", {
    style: dbSx.meta
  }, note)), /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": `${label}: ${segs.map(x => `${x.name} ${x.n}`).join(", ")}`,
    style: {
      display: "flex",
      gap: 2,
      height: 30,
      borderRadius: "var(--radius-sm)",
      overflow: "hidden"
    }
  }, segs.filter(x => x.n > 0).map(x => /*#__PURE__*/React.createElement("span", {
    key: x.name,
    title: `${x.name}: ${fmt(x.n)}`,
    style: {
      flex: `${x.n} 0 0`,
      minWidth: 24,
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "0 8px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      background: x.color,
      color: x.fg || "var(--text-on-solid)",
      font: "var(--weight-semibold) 11px/1 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700,
      fontVariantNumeric: "tabular-nums"
    }
  }, fmt(x.n))))), legend && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      flexWrap: "wrap"
    }
  }, segs.map(x => x.n > 0 ? /*#__PURE__*/React.createElement("span", {
    key: x.name,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      font: "var(--weight-medium) 12px/1 var(--font-body)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: x.color
    }
  }), x.name) : /*#__PURE__*/React.createElement("span", {
    key: x.name,
    title: x.hint,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      font: "var(--weight-medium) 12px/1 var(--font-body)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      boxSizing: "border-box",
      border: "1.5px dashed var(--border-strong)"
    }
  }), x.name, " \xB7 0"))));
}
/** Nearest "a in b" with b ≤ 10, so the phrase always agrees with the percentage beside it. */
function simpleFraction(p) {
  let best = [1, 2],
    err = 1;
  for (let b = 2; b <= 10; b++) {
    const a = Math.round(p * b);
    if (a < 1) continue;
    const e = Math.abs(a / b - p);
    if (e < err - 1e-9) {
      err = e;
      best = [a, b];
    }
  }
  return best;
}
function Exposure({
  days,
  plan,
  dk = plan
}) {
  const total = days.reduce((a, d) => a + d.total, 0);
  const F = days.reduce((a, d) => a + d.fine, 0),
    P = days.reduce((a, d) => a + d.possibly, 0),
    L = days.reduce((a, d) => a + d.likely, 0);
  const types = PLAN_DATA[dk].surfaces.filter(x => !x.locked);
  let left = total;
  const typeSegs = types.map((x, i) => {
    const n = i === types.length - 1 ? left : Math.round(total * x.n);
    left -= n;
    return {
      name: x.name,
      n,
      color: TYPE_SHADE[i],
      fg: i >= 2 ? "var(--ink-900)" : "var(--text-on-solid)"
    };
  });
  // Articles, Comments and Emails always listed — at 0 they're a quiet nudge (XL for articles and comments, the plugin for email).
  if (!typeSegs.some(x => x.name === "Articles")) typeSegs.push({
    name: "Articles",
    n: 0,
    color: TYPE_SHADE[1],
    fg: "var(--text-on-solid)",
    hint: "Slop Mop XL mops articles too"
  });
  if (!typeSegs.some(x => x.name === "Comments")) typeSegs.push({
    name: "Comments",
    n: 0,
    color: TYPE_SHADE[2],
    fg: "var(--ink-900)",
    hint: "Slop Mop XL mops comments too"
  });
  if (!typeSegs.some(x => x.name === "Emails")) typeSegs.push({
    name: "Emails",
    n: 0,
    color: TYPE_SHADE[3],
    fg: "var(--ink-900)",
    hint: "Add the email plugin to mop your inbox too"
  });
  const pct = Math.round((P + L) / total * 100);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...dbSx.card,
      gridColumn: "1 / -1",
      gridTemplateColumns: "minmax(0,0.75fr) minmax(0,1.25fr)",
      gap: "var(--space-9)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: dbSx.head
  }, "Slop exposure"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...dbSx.num,
      fontSize: "var(--text-5xl)"
    }
  }, pct, "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) 15px/1.3 var(--font-body)"
    }
  }, "of what you scrolled was slop")), /*#__PURE__*/React.createElement("p", {
    style: dbSx.body
  }, "Roughly ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, simpleFraction((P + L) / total).join(" in ")), ". Of the ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, fmt(total)), " things Slop Mop checked, it flagged ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, fmt(L)), " as likely slop and ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, fmt(P)), " as possibly.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(SegBar, {
    label: "The whole mess",
    total: total,
    note: plan === "xl" ? "everything you scrolled past" : "LinkedIn feed posts",
    segs: typeSegs
  }), /*#__PURE__*/React.createElement(SegBar, {
    label: "What the mop found",
    total: total,
    note: "by likelihood",
    legend: false,
    segs: [{
      name: "Looks fine",
      n: F,
      color: "var(--blue-500)"
    }, {
      name: "Possibly slop",
      n: P,
      color: "var(--mop-500)",
      fg: "var(--text-on-accent)"
    }, {
      name: "Likely slop",
      n: L,
      color: "var(--red-500)"
    }]
  })));
}

/* 2 — stacked bars by day. */
function DailyChart({
  days
}) {
  const [hov, setHov] = React.useState(null);
  const max = Math.ceil(Math.max(...days.map(d => d.total)) / 50) * 50;
  const ticks = [0, max / 2, max];
  const H = 180;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...dbSx.card,
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-5)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: dbSx.head
  }, "Posts checked, by day")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "34px minmax(0,1fr)",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: H
    }
  }, ticks.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      ...dbSx.meta,
      position: "absolute",
      right: 0,
      bottom: t / max * H - 7
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: H,
      display: "flex",
      alignItems: "flex-end",
      gap: 4
    }
  }, ticks.map(t => /*#__PURE__*/React.createElement("i", {
    key: t,
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: t / max * H,
      height: 1,
      background: "var(--chart-grid)"
    }
  })), days.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onMouseEnter: () => setHov(i),
    onMouseLeave: () => setHov(null),
    style: {
      position: "relative",
      flex: 1,
      height: d.total / max * H,
      display: "flex",
      flexDirection: "column-reverse",
      gap: 1,
      cursor: "default",
      opacity: hov === null || hov === i ? 1 : 0.45,
      transition: "opacity var(--dur-fast) var(--ease-standard)"
    }
  }, VERD.map(v => /*#__PURE__*/React.createElement("i", {
    key: v.id,
    style: {
      display: "block",
      flex: `${d[v.id]} 0 0`,
      background: v.color,
      borderRadius: v.id === "likely" ? "2px 2px 0 0" : 0
    }
  })), hov === i && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: `translateX(${i > 22 ? "-90%" : i < 6 ? "-10%" : "-50%"})`,
      zIndex: 3,
      padding: "var(--space-4) var(--space-5)",
      display: "grid",
      gap: 4,
      background: "var(--surface-raised)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-pop)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--weight-semibold) 12px/1.2 var(--font-body)"
    }
  }, d.date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }), " \xB7 ", d.total, " checked"), [...VERD].reverse().map(v => /*#__PURE__*/React.createElement("span", {
    key: v.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      font: "var(--weight-regular) 12px/1.2 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: v.color
    }
  }), v.name, /*#__PURE__*/React.createElement("b", {
    style: {
      marginLeft: "auto",
      paddingLeft: 12,
      fontVariantNumeric: "tabular-nums"
    }
  }, d[v.id]))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 16,
      marginTop: "var(--space-3)"
    }
  }, days.map((d, i) => (i % 7 === 0 || i === days.length - 1) && i !== days.length - 2 && /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      ...dbSx.meta,
      position: "absolute",
      top: 0,
      left: `${(i + 0.5) / days.length * 100}%`,
      transform: i === days.length - 1 ? "translateX(-100%)" : i === 0 ? "translateX(-25%)" : "translateX(-50%)",
      whiteSpace: "nowrap"
    }
  }, d.date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  })))))));
}

/* 3 — by network. Free still shows it, greyed, with the XL lock. */
const BRAND = {
  linkedin: "#0A66C2",
  x: "#000000",
  reddit: "#FF4500",
  facebook: "#1877F2",
  articles: "#5B6168",
  email: "#8D949B"
};
/* Non-network sources get the same chip shape with an icon disc in ink. Email at 0% stays listed — a nudge toward the plugin. */
const SOURCE = {
  articles: ["file-text", "Articles"],
  email: ["send", "Email"]
};
function SourceChip({
  id,
  zero
}) {
  if (!SOURCE[id]) return /*#__PURE__*/React.createElement(window.FeedChip, {
    id: id
  });
  const [icon, name] = SOURCE[id];
  return /*#__PURE__*/React.createElement("span", {
    title: zero ? "Add the email plugin to mop your inbox too" : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 32,
      padding: "0 13px 0 4px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-card)",
      border: `1.5px ${zero ? "dashed var(--border-strong)" : `solid ${BRAND[id]}`}`,
      boxSizing: "border-box",
      whiteSpace: "nowrap",
      opacity: zero ? 0.7 : 1
    }
  }, /*#__PURE__*/React.createElement("b", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: zero ? "var(--track)" : BRAND[id],
      color: zero ? "var(--text-muted)" : "#FFFFFF"
    }
  }, /*#__PURE__*/React.createElement(DS.Icon, {
    name: icon,
    size: 12,
    strokeWidth: 2.25
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) 13px/1 var(--font-body)",
      color: "var(--text-body)"
    }
  }, name));
}
function Networks({
  plan,
  total,
  dk = plan
}) {
  const locked = plan === "free";
  const nets = locked ? PLAN_DATA.xl.networks : PLAN_DATA[dk].networks;
  const R = 64,
    SW = 34,
    C = 2 * Math.PI * R;
  let acc = 0;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...dbSx.card,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: dbSx.head
  }, "By network"), locked && /*#__PURE__*/React.createElement(DS.Badge, {
    tone: "neutral"
  }, "XL")), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": locked || undefined,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      opacity: locked ? 0.35 : 1,
      filter: locked ? "grayscale(1)" : "none"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "172",
    height: "172",
    viewBox: "0 0 180 180",
    role: "img",
    "aria-label": locked ? "Network breakdown, available with XL" : `Checks by network: ${nets.map(n => `${n.id} ${Math.round(n.share * 100)}%`).join(", ")}`,
    style: {
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "90",
    cy: "90",
    r: R,
    fill: "none",
    stroke: "var(--track)",
    strokeWidth: SW
  }), nets.map(n => {
    const len = n.share * C;
    const el = /*#__PURE__*/React.createElement("circle", {
      key: n.id,
      cx: "90",
      cy: "90",
      r: R,
      fill: "none",
      stroke: BRAND[n.id],
      strokeWidth: SW,
      strokeDasharray: `${Math.max(0, len - 2)} ${C}`,
      strokeDashoffset: -acc,
      transform: "rotate(-90 90 90)"
    });
    acc += len;
    return el;
  }), (() => {
    let at = 0;
    return nets.map(n => {
      const mid = (at + n.share / 2) * 2 * Math.PI - Math.PI / 2;
      at += n.share;
      if (n.share < 0.07) return null;
      return /*#__PURE__*/React.createElement("text", {
        key: n.id,
        x: 90 + Math.cos(mid) * R,
        y: 90 + Math.sin(mid) * R + 4,
        textAnchor: "middle",
        style: {
          font: "var(--weight-bold) 12px/1 var(--font-body)",
          fill: "#FFFFFF"
        }
      }, Math.round(n.share * 100), "%");
    });
  })(), /*#__PURE__*/React.createElement("text", {
    x: "90",
    y: "88",
    textAnchor: "middle",
    style: {
      font: "var(--weight-bold) 22px/1 var(--font-display)",
      fill: "var(--text-body)"
    }
  }, fmt(total)), /*#__PURE__*/React.createElement("text", {
    x: "90",
    y: "106",
    textAnchor: "middle",
    style: {
      font: "var(--weight-regular) 10px/1 var(--font-mono)",
      fill: "var(--text-faint)"
    }
  }, "checked")), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      flex: "none",
      display: "grid",
      gridTemplateColumns: "repeat(2, max-content)",
      gap: "var(--space-4) var(--space-4)",
      alignContent: "center"
    }
  }, nets.map(n => /*#__PURE__*/React.createElement("li", {
    key: n.id
  }, /*#__PURE__*/React.createElement(SourceChip, {
    id: n.id,
    zero: n.share === 0
  }))))), locked && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "52px var(--space-7) var(--space-7)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      justifyItems: "center",
      gap: "var(--space-4)",
      padding: "var(--space-6)",
      maxWidth: 260,
      textAlign: "center",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-raised)"
    }
  }, /*#__PURE__*/React.createElement(DS.Icon, {
    name: "lock",
    size: 18
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      ...dbSx.body,
      color: "var(--text-body)"
    }
  }, "Your free mop cleans one feed. XL cleans every feed, the sites you read and your inbox, and shows them all side by side."), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    size: "sm",
    iconAfter: "arrow-right"
  }, "Upgrade to Slop Mop XL"))));
}

/* 4 — feed posts vs articles vs comments. */
function Surfaces({
  plan,
  total,
  dk = plan
}) {
  // Email is always listed: until the plugin is added it's an empty row that says so.
  const base = PLAN_DATA[dk].surfaces;
  const rows = base.some(x => x.name === "Emails") ? base : [...base, plan === "free" ? {
    name: "Emails",
    locked: true
  } : {
    name: "Emails",
    plugin: true
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: dbSx.card
  }, /*#__PURE__*/React.createElement("h2", {
    style: dbSx.head
  }, "Where it turned up"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)"
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.name,
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) 13px/1.3 var(--font-body)",
      opacity: r.locked || r.plugin ? 0.45 : 1
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      ...dbSx.meta,
      color: r.locked || r.plugin ? "var(--text-muted)" : dbSx.meta.color,
      display: "inline-flex",
      alignItems: "center",
      gap: 4
    }
  }, r.plugin ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DS.Icon, {
    name: "send",
    size: 11
  }), "add the email plugin") : r.locked ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DS.Icon, {
    name: "lock",
    size: 11
  }), "with XL") : `${fmt(Math.round(total * r.n))} checked · ${Math.round((r.split[1] + r.split[2]) * 100)}% slop`)), r.plugin ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "block",
      height: 14,
      borderRadius: "var(--radius-pill)",
      boxSizing: "border-box",
      border: "1.5px dashed var(--border-strong)",
      opacity: 0.6
    }
  }) : r.locked ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "block",
      height: 14,
      borderRadius: "var(--radius-pill)",
      background: "var(--track)",
      opacity: 0.6
    }
  }) : /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": VERD.map((v, i) => `${v.name} ${Math.round(r.split[i] * 100)}%`).join(", "),
    style: {
      display: "flex",
      gap: 2,
      height: 14,
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, VERD.map((v, i) => /*#__PURE__*/React.createElement("i", {
    key: v.id,
    style: {
      flex: `${r.split[i]} 0 0`,
      background: v.color
    }
  })))))));
}

/* 5 — the shareable snapshot: totals only, as an OG-sized card. */
/* "Mopping on" chips: one uniform gray for every source — a status row, not brand badges. */
function QuietChip({
  id
}) {
  const f = window.FEEDS.find(x => x.id === id);
  const src = SOURCE[id];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      height: 28,
      padding: "0 11px 0 3px",
      borderRadius: "var(--radius-pill)",
      boxSizing: "border-box",
      whiteSpace: "nowrap",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    "aria-hidden": "true",
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--ink-400)",
      color: "var(--paper-000)",
      font: "var(--weight-bold) 10px/1 var(--font-body)",
      letterSpacing: "-0.02em"
    }
  }, src ? /*#__PURE__*/React.createElement(DS.Icon, {
    name: src[0],
    size: 11,
    strokeWidth: 2.25
  }) : f.glyph), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) 12px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, src ? src[1] : f.name));
}
/* Share targets stay one color (ink) so the row reads as actions, not as brand badges. */
function ShareChip({
  id
}) {
  const [h, setH] = React.useState(false);
  const f = window.FEEDS.find(x => x.id === id);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": `Share to ${f.name}`,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      all: "unset",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: 32,
      padding: "0 13px 0 4px",
      borderRadius: "var(--radius-pill)",
      boxSizing: "border-box",
      whiteSpace: "nowrap",
      background: h ? "var(--mop-500)" : "var(--surface-card)",
      border: `1.5px solid ${h ? "var(--mop-500)" : "var(--border-default)"}`,
      transition: "var(--transition-ui)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    "aria-hidden": "true",
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: h ? "var(--mop-100)" : "var(--ink-900)",
      color: h ? "var(--mop-900)" : "var(--paper-000)",
      transition: "var(--transition-ui)",
      font: "var(--weight-bold) 11px/1 var(--font-body)",
      letterSpacing: "-0.02em"
    }
  }, f.glyph), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) 13px/1 var(--font-body)",
      color: h ? "var(--text-on-accent)" : "var(--text-body)"
    }
  }, f.name));
}
/* Ghost at rest; a yellow ghost on hover. */
function YellowGhost({
  icon,
  children,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      all: "unset",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      height: 32,
      padding: "0 var(--space-5)",
      boxSizing: "border-box",
      borderRadius: "var(--radius-sm)",
      border: `var(--border-width) solid ${h ? "var(--mop-500)" : "transparent"}`,
      background: h ? "var(--mop-100)" : "transparent",
      color: h ? "var(--mop-900)" : "var(--text-muted)",
      font: "var(--weight-semibold) 13px/1 var(--font-body)",
      transition: "var(--transition-ui)"
    }
  }, /*#__PURE__*/React.createElement(DS.Icon, {
    name: icon,
    size: 15
  }), children);
}
const SHARE_TO = [["linkedin", "LinkedIn"], ["x", "X"], ["reddit", "Reddit"], ["facebook", "Facebook"]];
function Snapshot({
  days,
  unfolded,
  votes = 0,
  plan,
  shareRef
}) {
  const [copied, setCopied] = React.useState(false);
  const L = days.reduce((a, d) => a + d.likely, 0),
    P = days.reduce((a, d) => a + d.possibly, 0);
  const mopped = L - unfolded,
    pct = Math.round(mopped / (L + P) * 100);
  const max = Math.max(...days.map(d => d.total));
  return /*#__PURE__*/React.createElement("section", {
    ref: shareRef,
    style: {
      ...dbSx.card,
      gridColumn: "1 / -1",
      gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)",
      gap: "var(--space-9)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-label": "Snapshot preview",
    style: {
      aspectRatio: "1200 / 630",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "#FFFFFF",
      border: "1px solid var(--border-hairline)",
      boxShadow: "var(--shadow-raised)",
      display: "grid",
      gridTemplateRows: "6px 1fr 30px",
      color: "#16181A"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      background: "var(--mop-500)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px 10px",
      display: "grid",
      gridTemplateRows: "auto minmax(0,1fr)",
      gap: 8,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(DS.Wordmark, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 9px/1.2 var(--font-body)",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "#5B6168"
    }
  }, "Last 30 days, mopped")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) 46%",
      gap: 16,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 4,
      alignContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 44px/0.95 var(--font-display)",
      letterSpacing: "-0.02em"
    }
  }, fmt(mopped)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px/1.25 var(--font-display)"
    }
  }, "sloppy posts I never had to read"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 10px/1.35 var(--font-body)",
      color: "#5B6168"
    }
  }, pct, "% of the slop in my ", plan === "xl" ? "feeds" : "LinkedIn feed", ", folded away", votes > 0 ? ` · ${fmt(votes)} votes cast` : "", ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 6,
      alignContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      height: 64,
      display: "flex",
      alignItems: "flex-end",
      gap: 2
    }
  }, days.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${d.total / max * 100}%`,
      display: "flex",
      flexDirection: "column-reverse",
      gap: 1
    }
  }, VERD.map(v => /*#__PURE__*/React.createElement("i", {
    key: v.id,
    style: {
      flex: `${d[v.id]} 0 0`,
      background: v.color
    }
  }))))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, VERD.map(v => /*#__PURE__*/React.createElement("span", {
    key: v.id,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      font: "500 8px/1 var(--font-body)",
      color: "#16181A",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 1,
      background: v.color
    }
  }), v.name)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#16181A",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "0 18px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 10px/1 var(--font-display)",
      color: "#FFFFFF",
      whiteSpace: "nowrap"
    }
  }, "Not an AI detector. A bad-writing detector."), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 9px/1 var(--font-mono)",
      color: "#A9B0B7"
    }
  }, "slopmop.lol"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: dbSx.head
  }, "Share a snapshot"), /*#__PURE__*/React.createElement("p", {
    style: dbSx.body
  }, "A share card of your month. It holds your totals and nothing else: no posts, no authors, no account."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, SHARE_TO.map(([id]) => /*#__PURE__*/React.createElement(ShareChip, {
    key: id,
    id: id
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    icon: copied ? "check" : "code",
    onClick: () => setCopied(true)
  }, copied ? "Link copied" : "Copy link"), /*#__PURE__*/React.createElement(YellowGhost, {
    icon: "download"
  }, "Download image"))));
}

/** The account dashboard — the default account view. The gear in the header swaps to account settings. */
function Dashboard({
  plan = "free",
  emailPlugin = false
}) {
  const [view, setView] = React.useState("dash");
  const dk = plan === "xl" && emailPlugin ? "xlmail" : plan;
  const days = React.useMemo(() => makeDays(PLAN_DATA[dk].scale), [dk]);
  const total = days.reduce((a, d) => a + d.total, 0);
  const shareRef = React.useRef(null);
  const [b, setB] = React.useState([{
    id: "7F3A·92C1",
    name: "Chrome on MacBook",
    seen: "now",
    current: true
  }, {
    id: "A01C·3E77",
    name: "Chrome on work laptop",
    seen: "2 days ago"
  }]);
  if (view === "settings") return /*#__PURE__*/React.createElement(window.AccountSettings, {
    plan: plan,
    browsers: b,
    onRemove: id => setB(x => x.filter(y => y.id !== id)),
    onBack: () => setView("dash")
  });
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 960,
      margin: "0 auto",
      padding: "var(--space-9) var(--space-7)",
      display: "grid",
      gap: "var(--space-8)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(window.AcctHeader, {
    onSettings: () => setView("settings")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "var(--space-5)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)",
      flex: "1 1 auto",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--text-2xl)/1.1 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "Your last 30 days, mopped")), plan === "free" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)",
      justifyItems: "end"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: dbSx.sub
  }, "Mop your inbox too"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    iconAfter: "arrow-right"
  }, "Upgrade to Slop Mop XL")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)",
      justifyItems: "end"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: dbSx.sub
  }, emailPlugin ? "Your inbox is mopped" : "Mop your inbox too"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-3)"
    }
  }, [["gmail", "Gmail"], ["outlook", "Outlook"]].map(([id, name]) => emailPlugin === id ? /*#__PURE__*/React.createElement(DS.Button, {
    key: id,
    variant: "secondary",
    size: "sm",
    icon: "check",
    disabled: true,
    style: {
      justifyContent: "center"
    }
  }, name, " added") : /*#__PURE__*/React.createElement(DS.Button, {
    key: id,
    variant: "secondary",
    size: "sm",
    icon: "send",
    style: {
      justifyContent: "center"
    }
  }, "Add to ", name))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 4,
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      minWidth: 0,
      margin: "0 calc(var(--space-7) * -1)",
      padding: "var(--space-4) var(--space-7)",
      background: "var(--surface-page)",
      borderTop: "1px solid var(--border-hairline)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...dbSx.sub,
      flex: "none"
    }
  }, "Mopping on"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      gap: "var(--space-3)",
      overflowX: "auto",
      minWidth: 0
    }
  }, PLAN_DATA[dk].networks.filter(n => n.share > 0).map(n => /*#__PURE__*/React.createElement("li", {
    key: n.id,
    style: {
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(QuietChip, {
    id: n.id
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      flex: "none",
      paddingLeft: "var(--space-5)",
      borderLeft: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(Legend, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0,1fr))",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Exposure, {
    days: days,
    plan: plan,
    dk: dk
  }), /*#__PURE__*/React.createElement(DailyChart, {
    days: days
  }), /*#__PURE__*/React.createElement(Networks, {
    plan: plan,
    total: total,
    dk: dk
  }), /*#__PURE__*/React.createElement(Surfaces, {
    plan: plan,
    total: total,
    dk: dk
  }), /*#__PURE__*/React.createElement(Snapshot, {
    days: days,
    unfolded: PLAN_DATA[dk].unfolded,
    votes: PLAN_DATA[dk].votes,
    plan: plan,
    shareRef: shareRef
  })));
}
Object.assign(window, {
  Dashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/account/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/account/Screens.jsx
try { (() => {
const {
  Button,
  MopMark,
  SignUpCard,
  Icon,
  Badge,
  Switch
} = window.SlopMopDesignSystem_ca9143;
const acctSx = {
  page: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "var(--space-10) var(--space-7)",
    color: "var(--text-body)"
  },
  card: {
    background: "var(--surface-card)",
    border: "var(--border-width) solid var(--border-hairline)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-card)",
    padding: "var(--space-7) var(--space-8)",
    display: "grid",
    gap: "var(--space-5)"
  },
  h1: {
    margin: 0,
    font: "var(--type-title)",
    letterSpacing: "var(--tracking-tight)"
  },
  sub: {
    margin: 0,
    font: "var(--type-body)",
    color: "var(--text-muted)",
    maxWidth: "var(--site-measure)"
  },
  label: {
    font: "var(--type-label)",
    color: "var(--text-muted)"
  },
  mono: {
    font: "var(--type-mono)",
    color: "var(--text-faint)"
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--space-5)",
    padding: "var(--space-5) 0",
    borderTop: "1px solid var(--border-hairline)"
  }
};
const FEEDS = [{
  id: "linkedin",
  name: "LinkedIn",
  host: "linkedin.com",
  note: "The feed Slop Mop was built on.",
  glyph: "in",
  brand: "#0A66C2"
}, {
  id: "x",
  name: "X",
  host: "x.com",
  note: "Posts and replies in your timeline.",
  glyph: "X",
  brand: "#000000"
}, {
  id: "reddit",
  name: "Reddit",
  host: "reddit.com",
  note: "Posts and comments.",
  glyph: "r/",
  brand: "#FF4500"
}, {
  id: "facebook",
  name: "Facebook",
  host: "facebook.com",
  note: "Posts in your News Feed.",
  glyph: "f",
  brand: "#1877F2"
}];

/** The feed chip (same as the share card's pills): brand-colored disc + name, outlined in the site's primary color.
    Letter discs stand in for official marks — swap in the real logos (and follow their brand rules) before shipping. */
function FeedChip({
  id,
  size = "md"
}) {
  const f = FEEDS.find(x => x.id === id) || FEEDS[0];
  const lg = size === "lg";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: lg ? 10 : 8,
      height: lg ? 40 : 32,
      padding: lg ? "0 16px 0 5px" : "0 13px 0 4px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-card)",
      border: `1.5px solid ${f.brand}`,
      boxSizing: "border-box",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("b", {
    "aria-hidden": "true",
    style: {
      width: lg ? 28 : 22,
      height: lg ? 28 : 22,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: f.brand,
      color: "#FFFFFF",
      font: `var(--weight-bold) ${lg ? 13 : 11}px/1 var(--font-body)`,
      letterSpacing: "-0.02em"
    }
  }, f.glyph), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${lg ? 15 : 13}px/1 var(--font-body)`,
      color: "var(--text-body)"
    }
  }, f.name));
}

/** Shared header: wordmark left; email + gear right. The gear opens account settings (and shows pressed while they're open). */
function AcctHeader({
  settingsOpen,
  onSettings,
  email = "dana@northbeam.io"
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: acctSx.mono
  }, email), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": settingsOpen ? "Close account settings" : "Account settings",
    "aria-pressed": !!settingsOpen,
    onClick: onSettings,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      all: "unset",
      cursor: "pointer",
      width: 32,
      height: 32,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      color: "var(--text-body)",
      background: settingsOpen ? "var(--paper-300)" : h ? "var(--paper-200)" : "transparent",
      transition: "var(--transition-ui)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 18
  }))));
}
function Brand() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(MopMark, {
    size: 24,
    style: {
      color: "var(--ink-900)"
    },
    knockout: "var(--surface-page)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) var(--text-lg)/1 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "Slop Mop"));
}
function Steps({
  at
}) {
  const steps = ["Account", "Free feed", "Permission"];
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      gap: "var(--space-6)",
      font: "var(--type-label)"
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      color: i === at ? "var(--text-body)" : "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "var(--type-mono-label)",
      background: i < at ? "var(--ink-900)" : i === at ? "var(--mop-500)" : "var(--paper-200)",
      color: i < at ? "var(--paper-000)" : "var(--ink-900)"
    }
  }, i < at ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 11,
    strokeWidth: 3
  }) : i + 1), s)));
}

/** Phase 2 onboarding, step 2: pick the one feed Slop Mop cleans for free. */
function PickFeed({
  value,
  onChange,
  onNext
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: acctSx.page
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement(Steps, {
    at: 1
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: acctSx.h1
  }, "Pick your free feed"), /*#__PURE__*/React.createElement("p", {
    style: acctSx.sub
  }, "Slop Mop cleans one site for free. You can switch it once every 30 days, or get Slop Mop XL to clean all of them.")), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": "Free feed",
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, FEEDS.map(f => {
    const on = value === f.id;
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      type: "button",
      role: "radio",
      "aria-checked": on,
      onClick: () => onChange(f.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-5)",
        textAlign: "left",
        cursor: "pointer",
        padding: "var(--space-6)",
        borderRadius: "var(--radius-md)",
        background: "var(--surface-card)",
        color: "var(--text-body)",
        border: `var(--border-width) solid ${on ? "var(--ink-900)" : "var(--border-hairline)"}`,
        boxShadow: on ? "0 0 0 1px var(--ink-900)" : "var(--shadow-card)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: "50%",
        border: `2px solid ${on ? "var(--ink-900)" : "var(--ink-300)"}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none"
      }
    }, on && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "var(--ink-900)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        gap: 2,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-heading)"
      }
    }, f.name), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-sm)",
        color: "var(--text-muted)"
      }
    }, f.note)), /*#__PURE__*/React.createElement("span", {
      style: acctSx.mono
    }, f.host));
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    disabled: !value,
    onClick: onNext
  }, "Mop ", FEEDS.find(f => f.id === value)?.name || "this feed"), /*#__PURE__*/React.createElement("span", {
    style: acctSx.mono
  }, "next change allowed 30 days after you pick"))));
}

/** Phase 2 onboarding, step 3: our explanation before Chrome's own optional-permission dialog. */
function Permission({
  feed,
  granted,
  onAllow,
  onSkip
}) {
  const f = FEEDS.find(x => x.id === feed) || FEEDS[0];
  return /*#__PURE__*/React.createElement("main", {
    style: acctSx.page
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Brand, null), /*#__PURE__*/React.createElement(Steps, {
    at: 2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: acctSx.h1
  }, "Let Slop Mop read ", f.host), /*#__PURE__*/React.createElement("p", {
    style: acctSx.sub
  }, "Chrome will ask next. Slop Mop only gets access to the sites you allow, one at a time, and you can take it back from the extension's menu.")), /*#__PURE__*/React.createElement("div", {
    style: acctSx.card
  }, /*#__PURE__*/React.createElement("span", {
    style: acctSx.label
  }, "On ", f.host, ", Slop Mop will"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: "var(--space-7)",
      display: "grid",
      gap: "var(--space-3)",
      font: "var(--type-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("li", null, "read posts as they load, and send their text to the Slop Mop server to be scored"), /*#__PURE__*/React.createElement("li", null, "add a mop icon beside each post, and fold the ones you'd rather not read")), /*#__PURE__*/React.createElement("span", {
    style: acctSx.label
  }, "It won't"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: "var(--space-7)",
      display: "grid",
      gap: "var(--space-3)",
      font: "var(--type-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("li", null, "read your messages, your profile or anything you type (unless you press \"Check this draft\")"), /*#__PURE__*/React.createElement("li", null, "run on any other site"))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, granted ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
    tone: "clean"
  }, "Allowed"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Open ", f.name, " \u2192")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onAllow
  }, "Allow ", f.host), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    onClick: onSkip
  }, "Not now")))));
}

/** Secondary, outlined ghost: transparent at rest, tints red on hover because it's a removal. */
function RemoveBtn({
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      all: "unset",
      cursor: "pointer",
      boxSizing: "border-box",
      height: 30,
      padding: "0 var(--space-5)",
      borderRadius: "var(--radius-sm)",
      border: `var(--border-width) solid ${h ? "var(--red-500)" : "var(--border-default)"}`,
      background: h ? "var(--red-100)" : "transparent",
      color: h ? "var(--red-700)" : "var(--text-body)",
      font: "var(--weight-semibold) 13px/1 var(--font-body)",
      transition: "var(--transition-ui)"
    }
  }, "Remove");
}

/** Phase 1–2 account settings: free feed + next change date, plan + billing, linked browsers (cap 5), sign out, delete. */
function AccountSettings({
  plan = "free",
  browsers,
  onRemove,
  onBack
}) {
  const xl = plan === "xl";
  return /*#__PURE__*/React.createElement("main", {
    style: acctSx.page
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(AcctHeader, {
    settingsOpen: true,
    onSettings: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    style: {
      all: "unset",
      cursor: "pointer",
      justifySelf: "start",
      font: "var(--weight-semibold) 13px/1.3 var(--font-body)",
      color: "var(--text-muted)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "\u2190 Back to your dashboard"), /*#__PURE__*/React.createElement("h1", {
    style: acctSx.h1
  }, "Account settings")), /*#__PURE__*/React.createElement("section", {
    style: acctSx.card
  }, /*#__PURE__*/React.createElement("span", {
    style: acctSx.label
  }, "Free feed"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      flexWrap: "wrap",
      opacity: xl ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement(FeedChip, {
    id: "linkedin"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    disabled: true
  }, "Change")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-label)",
      color: "var(--text-muted)"
    }
  }, xl ? "Slop Mop XL cleans every supported site, so your free feed doesn't matter while you're on it." : "You can change your free feed again on November 6.")), /*#__PURE__*/React.createElement("section", {
    style: acctSx.card
  }, /*#__PURE__*/React.createElement("span", {
    style: acctSx.label
  }, "Plan"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-heading)"
    }
  }, xl ? "Slop Mop XL" : "Free"), xl && /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: "var(--type-ui)"
    }
  }, "Manage billing")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-label)",
      color: "var(--text-muted)"
    }
  }, xl ? "Renews November 14 · billed by Stripe. Cancel any time; you keep XL until the period ends." : "One feed, 250 checks a day."), !xl && /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    iconAfter: "arrow-right"
  }, "Get the XL mop")), /*#__PURE__*/React.createElement("section", {
    style: {
      ...acctSx.card,
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      paddingBottom: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: acctSx.label
  }, "Linked browsers"), /*#__PURE__*/React.createElement("span", {
    style: acctSx.mono
  }, browsers.length, " of 5")), browsers.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    style: acctSx.row
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-ui)"
    }
  }, b.name, b.current && /*#__PURE__*/React.createElement("span", {
    style: {
      ...acctSx.mono,
      marginLeft: 8
    }
  }, "this browser")), /*#__PURE__*/React.createElement("span", {
    style: acctSx.mono
  }, "Device ", b.id, " \xB7 last seen ", b.seen)), !b.current && /*#__PURE__*/React.createElement(RemoveBtn, {
    onClick: () => onRemove(b.id)
  }))), browsers.length >= 5 && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-5) 0 0",
      font: "var(--type-label)",
      color: "var(--red-700)"
    }
  }, "That's the limit. Remove one to sign in somewhere new.")), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      paddingTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      all: "unset",
      cursor: "pointer",
      padding: "var(--space-2) 0",
      font: "var(--weight-semibold) 13px/1.3 var(--font-body)",
      color: "var(--text-body)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "Sign out"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      all: "unset",
      cursor: "pointer",
      padding: "var(--space-2) 0",
      font: "var(--weight-semibold) 13px/1.3 var(--font-body)",
      color: "var(--red-700)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "Delete account")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-label)",
      color: "var(--text-faint)",
      maxWidth: "var(--site-measure)"
    }
  }, "Deleting your account removes your email, plan and linked browsers straight away. Your past votes stay in the anonymous tallies \u2014 they were never tied to your name.")));
}
Object.assign(window, {
  AcctHeader,
  FEEDS,
  acctSx,
  FeedChip,
  PickFeed,
  Permission,
  AccountSettings,
  AcctBrand: Brand,
  AcctSteps: Steps
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/account/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/account/Upgrade.jsx
try { (() => {
const UP = window.SlopMopDesignSystem_ca9143;
const upSx = {
  page: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "var(--space-9) var(--space-7)",
    display: "grid",
    gap: "var(--space-8)",
    color: "var(--text-body)"
  },
  head: {
    margin: 0,
    font: "var(--weight-bold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-faint)"
  },
  h1: {
    margin: 0,
    font: "var(--weight-bold) var(--text-2xl)/1.1 var(--font-display)",
    letterSpacing: "var(--tracking-tight)"
  },
  body: {
    margin: 0,
    font: "var(--weight-regular) 14px/1.5 var(--font-body)",
    color: "var(--text-muted)",
    maxWidth: "56ch"
  },
  meta: {
    font: "var(--weight-regular) 11px/1.4 var(--font-mono)",
    color: "var(--text-faint)"
  },
  card: {
    background: "var(--surface-card)",
    border: "var(--border-width) solid var(--border-hairline)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-card)",
    padding: "var(--space-7)",
    display: "grid",
    gap: "var(--space-6)"
  }
};
const PLANS = [{
  id: "month",
  label: "Monthly",
  price: "$5.99",
  per: "/ month",
  note: "Cancel any time"
}, {
  id: "year",
  label: "Yearly",
  price: "$59.99",
  per: "/ year",
  note: "$5.00 a month · save 17%"
}];
const PERKS = [["Every feed", "LinkedIn, X, Reddit and Facebook — not just one."], ["The sites you read", "Articles, comments and reviews, scored when you ask."], ["Your inbox", "The Gmail and Outlook plugins."], ["Higher limits", "More checks every day than the free 250."]];
const STEPS = ["Plan", "Checkout", "Access"];
function UpSteps({
  at
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, STEPS.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      font: "var(--weight-semibold) 12px/1 var(--font-body)",
      color: i <= at ? "var(--text-body)" : "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: i < at ? "var(--ink-900)" : i === at ? "var(--mop-500)" : "var(--track)",
      color: i < at ? "var(--paper-000)" : "var(--ink-900)",
      font: "var(--weight-bold) 11px/1 var(--font-body)"
    }
  }, i < at ? /*#__PURE__*/React.createElement(UP.Icon, {
    name: "check",
    size: 11,
    strokeWidth: 3
  }) : i + 1), s)));
}
function PlanOption({
  p,
  on,
  onPick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "radio",
    "aria-checked": on,
    onClick: onPick,
    style: {
      all: "unset",
      cursor: "pointer",
      position: "relative",
      boxSizing: "border-box",
      display: "grid",
      gap: "var(--space-3)",
      padding: "var(--space-6)",
      borderRadius: "var(--radius-md)",
      background: on ? "var(--surface-card)" : "var(--paper-100)",
      border: `1.5px solid ${on ? "var(--ink-900)" : "var(--border-default)"}`,
      boxShadow: on ? "var(--shadow-raised)" : "none",
      transition: "var(--transition-ui)"
    }
  }, p.id === "year" && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -10,
      right: 12,
      padding: "3px 7px",
      borderRadius: 3,
      background: "var(--mop-500)",
      color: "var(--text-on-accent)",
      font: "var(--weight-bold) 10px/1 var(--font-body)",
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    }
  }, "Best value"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, p.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--weight-bold) var(--text-3xl)/1 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, p.price), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) 13px/1 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, p.per)), /*#__PURE__*/React.createElement("span", {
    style: upSx.meta
  }, p.note), on && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 12,
      left: "auto",
      right: p.id === "year" ? "auto" : 12,
      ...(p.id === "year" ? {
        left: 12,
        top: 12
      } : {}),
      width: 0,
      height: 0
    }
  }));
}

/* 1 — pick a plan. */
function PlanStep({
  plan,
  setPlan,
  onNext
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: upSx.head
  }, "Upgrade"), /*#__PURE__*/React.createElement("h1", {
    style: upSx.h1
  }, "Get the XL mop"), /*#__PURE__*/React.createElement("p", {
    style: upSx.body
  }, "Your free mop cleans one feed. XL cleans every feed, the sites you read and your inbox.")), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": "Billing period",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)"
    }
  }, PLANS.map(p => /*#__PURE__*/React.createElement(PlanOption, {
    key: p.id,
    p: p,
    on: plan === p.id,
    onPick: () => setPlan(p.id)
  }))), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5) var(--space-7)",
      alignItems: "start"
    }
  }, PERKS.map(([t, d]) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "grid",
      gridTemplateColumns: "20px minmax(0,1fr)",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "var(--mop-100)",
      color: "var(--mop-900)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(UP.Icon, {
    name: "check",
    size: 12,
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: 2,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--weight-semibold) 14px/1.3 var(--font-body)"
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) 13px/1.4 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      justifyItems: "start"
    }
  }, /*#__PURE__*/React.createElement(UP.Button, {
    variant: "primary",
    size: "lg",
    iconAfter: "arrow-right",
    onClick: onNext
  }, "Continue to checkout \xB7 ", PLANS.find(p => p.id === plan).price), /*#__PURE__*/React.createElement("span", {
    style: upSx.meta
  }, "secure checkout by Polar \xB7 taxes calculated at checkout \xB7 cancel any time from your account")));
}

/* 2 — Polar checkout, embedded on slopmop.lol. (Extension pages can't load Polar's script, so the extension opens this page in a tab.) */
function CheckoutStep({
  plan,
  onPaid,
  onBack
}) {
  const p = PLANS.find(x => x.id === plan);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    style: {
      all: "unset",
      cursor: "pointer",
      justifySelf: "start",
      font: "var(--weight-semibold) 13px/1.3 var(--font-body)",
      color: "var(--text-muted)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "\u2190 Change plan"), /*#__PURE__*/React.createElement("h1", {
    style: upSx.h1
  }, "Checkout")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) 220px",
      gap: "var(--space-6)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "region",
    "aria-label": "Polar checkout",
    style: {
      ...upSx.card,
      minHeight: 300,
      alignContent: "center",
      justifyItems: "center",
      textAlign: "center",
      background: "var(--paper-100)",
      border: "1.5px dashed var(--border-strong)",
      boxShadow: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: upSx.head
  }, "Polar embedded checkout"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...upSx.body,
      maxWidth: "36ch"
    }
  }, "Polar's checkout renders here: email, card, tax and the ", p.label.toLowerCase(), " plan. No account details are typed into Slop Mop."), /*#__PURE__*/React.createElement(UP.Button, {
    variant: "solid",
    onClick: onPaid
  }, "Simulate a paid checkout")), /*#__PURE__*/React.createElement("aside", {
    style: {
      ...upSx.card,
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: upSx.head
  }, "Order"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      font: "var(--weight-semibold) 14px/1.3 var(--font-body)"
    }
  }, "Slop Mop XL", /*#__PURE__*/React.createElement("span", null, p.price)), /*#__PURE__*/React.createElement("span", {
    style: upSx.meta
  }, p.label.toLowerCase(), " \xB7 ", p.note.toLowerCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      background: "var(--border-hairline)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--weight-regular) 12px/1.45 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "If the embed can't load, Polar's hosted checkout opens instead and sends you back here when you're done."))));
}

/* 3 — back from checkout: you're XL; now let it read every site. */
function AccessStep({
  granted,
  onAllow,
  onLater
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      padding: "var(--space-4) var(--space-5)",
      borderRadius: "var(--radius-sm)",
      background: "var(--blue-100)",
      border: "1px solid var(--blue-200)",
      color: "var(--blue-700)",
      font: "var(--weight-semibold) 13px/1.3 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement(UP.Icon, {
    name: "check",
    size: 15,
    strokeWidth: 3
  }), "You're on Slop Mop XL. A receipt is on its way from Polar."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: upSx.head
  }, "One last step"), /*#__PURE__*/React.createElement("h1", {
    style: upSx.h1
  }, granted ? "Your mop can reach everywhere" : "Let Slop Mop access all sites"), /*#__PURE__*/React.createElement("p", {
    style: upSx.body
  }, granted ? "XL is ready on every feed and site. Articles and comments are scored when you click their mop, so checks are only spent on what you ask about." : "To mop more than one feed, Chrome needs your OK for Slop Mop to read the pages you visit. It reads post and article text to score it, and never stores it.")), granted ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(UP.Button, {
    variant: "primary",
    size: "lg",
    iconAfter: "arrow-right"
  }, "Back to your dashboard"), /*#__PURE__*/React.createElement("span", {
    style: upSx.meta
  }, "access granted \xB7 change it any time in Chrome's extension settings")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: "var(--space-4)"
    }
  }, [["eye", "Reads the text of posts, articles and comments on the page"], ["shield-check", "Sends a one-way hash to score it. No author names, no post text kept"], ["x", "Never posts, clicks, reads your messages or touches passwords"]].map(([ic, t]) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      font: "var(--weight-regular) 14px/1.4 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(UP.Icon, {
    name: ic,
    size: 16
  })), t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(UP.Button, {
    variant: "primary",
    size: "lg",
    onClick: onAllow
  }, "Allow access"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onLater,
    style: {
      all: "unset",
      cursor: "pointer",
      font: "var(--weight-semibold) 13px/1.3 var(--font-body)",
      color: "var(--text-muted)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "Not now")), /*#__PURE__*/React.createElement("span", {
    style: upSx.meta
  }, "Chrome will ask you to confirm next. Without access, XL keeps working on your free feed only.")));
}
function UpgradeShell({
  at,
  done,
  children
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: upSx.page
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(UP.Wordmark, {
    size: 18
  }), /*#__PURE__*/React.createElement(UpSteps, {
    at: done ? STEPS.length : at
  })), children);
}

/** Click-through: plan → Polar checkout → access. */
function UpgradeFlow() {
  const [step, setStep] = React.useState(0);
  const [plan, setPlan] = React.useState("year");
  const [granted, setGranted] = React.useState(false);
  return /*#__PURE__*/React.createElement(UpgradeShell, {
    at: step,
    done: granted
  }, step === 0 && /*#__PURE__*/React.createElement(PlanStep, {
    plan: plan,
    setPlan: setPlan,
    onNext: () => setStep(1)
  }), step === 1 && /*#__PURE__*/React.createElement(CheckoutStep, {
    plan: plan,
    onBack: () => setStep(0),
    onPaid: () => setStep(2)
  }), step === 2 && /*#__PURE__*/React.createElement(AccessStep, {
    granted: granted,
    onAllow: () => setGranted(true),
    onLater: () => {}
  }));
}
/** One static screen per step. */
function UpgradeScreen({
  step,
  granted
}) {
  const [plan, setPlan] = React.useState("year");
  return /*#__PURE__*/React.createElement(UpgradeShell, {
    at: step,
    done: step === 2 && granted
  }, step === 0 && /*#__PURE__*/React.createElement(PlanStep, {
    plan: plan,
    setPlan: setPlan,
    onNext: () => {}
  }), step === 1 && /*#__PURE__*/React.createElement(CheckoutStep, {
    plan: plan,
    onBack: () => {},
    onPaid: () => {}
  }), step === 2 && /*#__PURE__*/React.createElement(AccessStep, {
    granted: granted,
    onAllow: () => {},
    onLater: () => {}
  }));
}
Object.assign(window, {
  UpgradeFlow,
  UpgradeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/account/Upgrade.jsx", error: String((e && e.message) || e) }); }

// ui_kits/extension/Onboarding.jsx
try { (() => {
const OB = window.SlopMopDesignSystem_ca9143;
const OB_ZONES = {
  mild: {
    possibly: 67,
    likely: 88
  },
  moderate: {
    possibly: 40,
    likely: 70
  },
  aggressive: {
    possibly: 29,
    likely: 49
  }
};
const OB_POSTS = [{
  id: "a",
  author: "Greg Tanner",
  title: "Sales leader | Speaker | Girl dad",
  score: 84,
  humanVoice: 0.44,
  usefulness: 0.08,
  readerResponse: 0.18,
  community: {
    no: 0,
    maybe: 2,
    probably: 14
  },
  tells: {
    formulaicHook: 0.91,
    engagementBait: 0.77,
    manufacturedNarrative: 0.64,
    contrastFraming: 0.58
  },
  body: "My 4 year old taught me more about closing than any sales trainer ever did.\n\nShe asked for ice cream. I said no. She asked again.\n\nRead that again."
}, {
  id: "b",
  author: "Priya Raman",
  title: "Staff engineer, payments",
  score: 12,
  humanVoice: 0.74,
  usefulness: 0.81,
  readerResponse: 0.22,
  community: null,
  tells: {
    formalHedging: 0.22
  },
  body: "We shaved 400ms off checkout by moving the fraud check off the critical path. Writeup in comments — the boring part (queue backpressure) is the part that mattered."
}, {
  id: "c",
  author: "Marcus Bell",
  title: "Helping B2B leaders unlock growth",
  score: 61,
  humanVoice: 0.21,
  usefulness: 0.09,
  readerResponse: 0.71,
  community: {
    no: 1,
    maybe: 4,
    probably: 9
  },
  tells: {
    emptyEvaluation: 0.74,
    engagementBait: 0.68,
    contrastFraming: 0.52
  },
  body: "Most teams don't have a strategy problem. They have a clarity problem.\n\nStrategy without clarity is noise.\n\nComment YES if this resonates."
}, {
  id: "d",
  author: "Dana Whitfield",
  title: "Founder & CEO, Northbeam Labs",
  score: 46,
  humanVoice: 0.32,
  usefulness: 0.4,
  readerResponse: 0.35,
  community: null,
  tells: {
    hypeMarketing: 0.58,
    emptyEvaluation: 0.44
  },
  body: "Thrilled to share we've closed our seed round! Grateful for the journey and excited to unlock the next chapter."
}];
const OB_TINT = {
  no: "blue",
  maybe: "yellow",
  probably: "red"
};
const obSx = {
  wrap: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "0 var(--space-9)"
  },
  kicker: {
    font: "var(--weight-bold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase"
  },
  h2: {
    margin: 0,
    font: "var(--weight-bold) var(--text-3xl)/1.1 var(--font-display)",
    letterSpacing: "var(--tracking-tight)"
  },
  lede: {
    margin: 0,
    font: "var(--type-body)",
    fontSize: "var(--text-lg)",
    color: "var(--text-muted)",
    maxWidth: "52ch"
  }
};
function obVerdict(p, z) {
  return p.score >= z.likely ? "likely" : p.score >= z.possibly ? "possibly" : "fine";
}
function obHiddenIds(s) {
  const z = OB_ZONES[s.sensitivity];
  return OB_POSTS.filter(p => s.enabled && s.mode === "hide" && !s.restored[p.id] && (s.votes[p.id] ? s.votes[p.id] === "probably" : obVerdict(p, z) === "likely")).map(p => p.id);
}

/** A browser window: toolbar with the extension icon, LinkedIn-ish feed inside. Everything works. */
function DemoBrowser({
  s,
  set
}) {
  const z = OB_ZONES[s.sensitivity];
  const hiddenIds = obHiddenIds(s);
  const iconState = !s.enabled ? "disabled" : "unchecked";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: "var(--radius-lg)",
      overflow: "visible",
      boxShadow: "0 24px 64px rgba(0,0,0,.45)",
      background: "#F4F2EE"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      height: 44,
      padding: "0 var(--space-5)",
      background: "#E7E9EC",
      borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
      borderBottom: "1px solid #D6D9DD"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 6
    }
  }, ["#FF5F57", "#FEBC2E", "#28C840"].map(c => /*#__PURE__*/React.createElement("i", {
    key: c,
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: c
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 28,
      borderRadius: 14,
      background: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "0 var(--space-5)",
      font: "var(--type-body-sm)",
      color: "#5F6368"
    }
  }, "linkedin.com/feed"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set({
      popup: !s.popup,
      panel: null
    }),
    "aria-label": "Open Slop Mop",
    style: {
      all: "unset",
      cursor: "pointer",
      position: "relative",
      borderRadius: "var(--radius-sm)",
      outline: s.popup ? "2px solid var(--blue-500)" : "none",
      outlineOffset: 1
    }
  }, /*#__PURE__*/React.createElement(OB.MopIcon, {
    surface: "toolbar",
    state: iconState,
    count: s.enabled && hiddenIds.length ? hiddenIds.length : undefined
  }), !s.touchedToolbar && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "ob-pulse",
    style: {
      position: "absolute",
      inset: -4,
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--mop-500)",
      pointerEvents: "none"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 560,
      overflowY: "auto",
      padding: "var(--space-6)",
      display: "grid",
      gap: "var(--space-5)",
      alignContent: "start",
      borderRadius: "0 0 var(--radius-lg) var(--radius-lg)"
    },
    onClick: () => s.popup && set({
      popup: false
    })
  }, OB_POSTS.map(p => {
    const verdict = obVerdict(p, z),
      vote = s.votes[p.id];
    if (hiddenIds.includes(p.id)) {
      return /*#__PURE__*/React.createElement(OB.FoldStrip, {
        key: p.id,
        tone: vote === "maybe" ? "yellow" : "red",
        density: "compact",
        stats: {
          today: hiddenIds.length,
          week: 23 + hiddenIds.length,
          month: 86,
          total: 341
        },
        onRestore: () => set({
          restored: {
            ...s.restored,
            [p.id]: true
          }
        })
      });
    }
    const flagged = verdict !== "fine";
    const tint = !s.enabled ? "disabled" : vote ? OB_TINT[vote] : flagged ? verdict === "likely" ? "red" : "yellow" : "unchecked";
    const open = s.panel === p.id;
    return /*#__PURE__*/React.createElement("article", {
      key: p.id,
      style: {
        position: "relative",
        background: "#fff",
        border: "1px solid #E0DFDC",
        borderRadius: 8,
        padding: "12px 14px",
        font: "var(--type-body-sm)",
        color: "#1B1B18"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#E8E6E1",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        display: "block"
      }
    }, p.author), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#5E5D59",
        fontSize: 12
      }
    }, p.title)), s.enabled && /*#__PURE__*/React.createElement(OB.MopIcon, {
      state: tint,
      onClick: e => {
        e && e.stopPropagation && e.stopPropagation();
        set({
          panel: open ? null : p.id,
          popup: false,
          touchedPost: true
        });
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#5E5D59",
        fontWeight: 700,
        letterSpacing: 1,
        padding: "0 4px"
      }
    }, "\xB7\xB7\xB7")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        whiteSpace: "pre-line",
        lineHeight: 1.45
      }
    }, p.body), open && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 46,
        right: 8,
        zIndex: 6
      },
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(OB.WhyCard, {
      verdict: verdict,
      score: p.score,
      mode: s.mode,
      tells: p.tells,
      humanVoice: p.humanVoice,
      usefulness: p.usefulness,
      readerResponse: p.readerResponse,
      possibly: z.possibly,
      likely: z.likely,
      community: p.community,
      checksToday: {
        used: 138,
        limit: 250
      },
      vote: vote || null,
      onVote: v => set({
        votes: {
          ...s.votes,
          [p.id]: v
        }
      }),
      style: {
        width: 320
      }
    })));
  })), s.popup && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 50,
      right: 8,
      zIndex: 8,
      transform: "scale(.82)",
      transformOrigin: "top right"
    }
  }, /*#__PURE__*/React.createElement(window.Popup, {
    state: {
      feed: s.feed || "linkedin",
      enabled: s.enabled,
      mode: s.mode,
      sensitivity: s.sensitivity,
      hidden: {
        today: hiddenIds.length,
        week: 23 + hiddenIds.length,
        month: 86,
        total: 341
      },
      flagged: {
        today: 0,
        total: 0
      },
      usage: {
        state: "ok",
        used: 138,
        limit: 250,
        resets: "12:00 AM"
      }
    },
    set: x => set({
      ...("enabled" in x ? {
        enabled: x.enabled
      } : {}),
      ...("mode" in x ? {
        mode: x.mode,
        restored: {}
      } : {}),
      ...("sensitivity" in x ? {
        sensitivity: x.sensitivity,
        restored: {}
      } : {})
    })
  })));
}
function Hint({
  done,
  next,
  onDo,
  children
}) {
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onDo,
    style: {
      all: "unset",
      boxSizing: "border-box",
      width: "100%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      font: "var(--type-ui)",
      fontWeight: next ? 600 : 500,
      color: done ? "var(--ink-400)" : next ? "var(--paper-000)" : "var(--ink-300)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: done ? "var(--mop-500)" : "transparent",
      border: done ? "none" : `1.5px solid ${next ? "var(--mop-500)" : "var(--ink-500)"}`,
      color: "var(--ink-900)"
    }
  }, done && /*#__PURE__*/React.createElement(OB.Icon, {
    name: "check",
    size: 12,
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: done ? "line-through" : "none",
      textUnderlineOffset: 3
    }
  }, children)));
}
function Never({
  icon,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-md)",
      background: "var(--paper-200)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--ink-900)"
    }
  }, /*#__PURE__*/React.createElement(OB.Icon, {
    name: icon,
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)",
      fontSize: "var(--text-lg)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, children));
}
const OB_FEEDS = [{
  id: "linkedin",
  name: "LinkedIn",
  host: "linkedin.com"
}, {
  id: "x",
  name: "X",
  host: "x.com"
}, {
  id: "reddit",
  name: "Reddit",
  host: "reddit.com"
}, {
  id: "facebook",
  name: "Facebook",
  host: "facebook.com"
}];

/** The free-feed pick: one of four, required before Start mopping enables. */
function FeedPick({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": "Your free feed",
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, OB_FEEDS.map(f => {
    const on = value === f.id;
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      type: "button",
      role: "radio",
      "aria-checked": on,
      onClick: () => onChange(f.id),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        height: 38,
        padding: "0 var(--space-6) 0 var(--space-5)",
        cursor: "pointer",
        borderRadius: "var(--radius-pill)",
        font: "var(--type-ui)",
        transition: "var(--transition-ui)",
        border: `var(--border-width) solid ${on ? "var(--ink-900)" : "var(--border-default)"}`,
        background: on ? "var(--ink-900)" : "var(--paper-000)",
        color: on ? "var(--paper-000)" : "var(--text-body)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        borderRadius: "50%",
        flex: "none",
        boxSizing: "border-box",
        border: on ? "4px solid var(--mop-500)" : "1.5px solid var(--ink-300)",
        background: on ? "var(--ink-900)" : "transparent"
      }
    }), f.name);
  }));
}
const XL_PERKS = [{
  icon: "eye-off",
  title: "Every social feed",
  body: "LinkedIn, X, Reddit and Facebook, all at once — not just your one free feed."
}, {
  icon: "send",
  title: "Your inbox, too",
  body: "Flags slop in Gmail and Outlook, and checks your own emails before you hit send."
}, {
  icon: "gauge",
  title: "Higher limits",
  body: "Far more checks a day, so a long scroll never runs the mop dry."
}, {
  icon: "flag",
  title: "Scores everywhere else",
  body: "A Mess Index on search results, plus scores on comments, reviews and articles."
}];

/** First-run page — a full tab. Exterior register: the product demonstrates itself, then privacy, then XL. */
function Onboarding() {
  const [s, setS] = React.useState({
    enabled: true,
    mode: "hide",
    sensitivity: "moderate",
    popup: false,
    panel: null,
    votes: {},
    restored: {},
    touchedToolbar: false,
    touchedPost: false,
    done: false,
    feed: null
  });
  const set = x => setS(p => ({
    ...p,
    ...x,
    ...("popup" in x && x.popup ? {
      touchedToolbar: true
    } : {})
  }));
  const unfolded = Object.keys(s.restored).length > 0,
    voted = Object.values(s.votes).some(Boolean);
  const feed = OB_FEEDS.find(f => f.id === s.feed);
  // Each checklist row performs its own step, so the list works as a shortcut as well as a guide.
  const doToolbar = () => set({
    popup: true,
    panel: null
  });
  const doUnfold = () => {
    const h = obHiddenIds(s);
    if (h.length) return set({
      restored: {
        ...s.restored,
        [h[0]]: true
      },
      popup: false,
      panel: null
    });
    set({
      enabled: true,
      mode: "hide",
      sensitivity: "moderate",
      votes: {},
      restored: {
        a: true
      },
      popup: false,
      panel: null
    });
  };
  const showC = {
    enabled: true,
    restored: {
      ...s.restored,
      c: true
    },
    popup: false,
    panel: "c",
    touchedPost: true
  };
  const doPanel = () => set(showC);
  const doVote = () => set({
    ...showC,
    votes: {
      ...s.votes,
      c: s.votes.c && s.votes.c !== "probably" ? s.votes.c : "no"
    }
  });
  const stepsDone = [s.touchedToolbar, unfolded, s.touchedPost, voted].filter(Boolean).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--ink-900)",
      color: "var(--paper-000)",
      padding: "var(--space-11) 0 var(--space-12)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...obSx.wrap,
      display: "grid",
      gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)",
      gap: "var(--space-10)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-8)",
      alignContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(OB.MopMark, {
    size: 28,
    knockout: "var(--ink-900)",
    style: {
      color: "var(--mop-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) var(--text-lg)/1 var(--font-display)"
    }
  }, "Slop Mop is installed.")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--text-5xl)/1.02 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "Go on. Mop something."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      fontSize: "var(--text-lg)",
      color: "var(--ink-300)",
      maxWidth: "40ch"
    }
  }, "This is a real feed with the real extension on it. Try it before you open LinkedIn."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      padding: "var(--space-6) var(--space-7)",
      borderRadius: "var(--radius-md)",
      border: "2px solid var(--mop-500)",
      background: "rgba(245,180,0,.06)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--weight-bold) 11px/1.2 var(--font-body)",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--mop-500)"
    }
  }, stepsDone === 4 ? "You've got it" : "Try it — four things"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--ink-400)"
    }
  }, stepsDone, " / 4")), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Hint, {
    onDo: doToolbar,
    done: s.touchedToolbar,
    next: !s.touchedToolbar
  }, "Click the mop in the toolbar and switch to Highlight"), /*#__PURE__*/React.createElement(Hint, {
    onDo: doUnfold,
    done: unfolded,
    next: s.touchedToolbar && !unfolded
  }, "Click a folded strip to bring a post back"), /*#__PURE__*/React.createElement(Hint, {
    onDo: doPanel,
    done: s.touchedPost,
    next: s.touchedToolbar && unfolded && !s.touchedPost
  }, "Click a post's mop to see why it scored that way"), /*#__PURE__*/React.createElement(Hint, {
    onDo: doVote,
    done: voted,
    next: s.touchedToolbar && unfolded && s.touchedPost && !voted
  }, "Disagree? Vote. Your call beats Jev's.")))), /*#__PURE__*/React.createElement(DemoBrowser, {
    s: s,
    set: set
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-12) 0",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...obSx.wrap,
      display: "grid",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...obSx.kicker,
      color: "var(--text-faint)"
    }
  }, "What it keeps"), /*#__PURE__*/React.createElement("h2", {
    style: obSx.h2
  }, "Nothing about you, nothing about them.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement(Never, {
    icon: "file-text",
    title: "No post content"
  }, "Jev reads the text to judge it. The server keeps a one-way hash, never the words."), /*#__PURE__*/React.createElement(Never, {
    icon: "eye-off",
    title: "No authors"
  }, "Slop Mop judges writing, not people. Author names are never stored."), /*#__PURE__*/React.createElement(Never, {
    icon: "user-round-check",
    title: "Votes aren't yours"
  }, "Your votes count anonymously. They're tied to a salted hash of a random install id \u2014 never your name or account.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-12) 0 180px",
      background: "var(--paper-100)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...obSx.wrap,
      display: "grid",
      gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)",
      gap: "var(--space-10)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)",
      position: "sticky",
      top: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...obSx.kicker,
      color: "var(--mop-900)",
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 6px",
      borderRadius: 3,
      background: "var(--ink-900)",
      color: "var(--paper-000)"
    }
  }, "Upgrade available"), "Slop Mop XL"), /*#__PURE__*/React.createElement("h2", {
    style: obSx.h2
  }, "One feed is free. The XL mop does the whole house."), /*#__PURE__*/React.createElement("p", {
    style: obSx.lede
  }, "Free cleans the one feed you pick, with 250 checks a day, for good. XL takes the mop everywhere you read \u2014 and everywhere you write."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(OB.Button, {
    variant: "secondary",
    size: "lg"
  }, "Get the XL mop"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "price tbc"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "var(--space-5)"
    }
  }, XL_PERKS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.title,
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      padding: "var(--space-7)",
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "var(--radius-sm)",
      background: "var(--mop-100)",
      color: "var(--mop-900)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(OB.Icon, {
    name: p.icon,
    size: 18
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)"
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, p.body)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      bottom: 0,
      zIndex: 20,
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border-hairline)",
      boxShadow: "0 -8px 24px rgba(22,24,26,.08)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...obSx.wrap,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-7)",
      padding: "var(--space-6) var(--space-9)",
      flexWrap: "wrap"
    }
  }, s.done ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      font: "var(--type-heading)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "var(--mop-500)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(OB.Icon, {
    name: "check",
    size: 14,
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", null, "You're set. The mop is on for ", feed.name, ".")) : /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-4)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--type-heading)"
    }
  }, "Pick your free feed"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "250 checks a day \xB7 switch every 30 days \xB7 XL mops them all")), /*#__PURE__*/React.createElement(FeedPick, {
    value: s.feed,
    onChange: f => set({
      feed: f
    })
  })), /*#__PURE__*/React.createElement(OB.Button, {
    variant: "primary",
    size: "lg",
    iconAfter: "arrow-right",
    disabled: !feed,
    onClick: () => s.done ? null : set({
      done: true
    })
  }, s.done ? `Open ${feed.name}` : feed ? `Start mopping ${feed.name}` : "Start mopping"))));
}
window.Onboarding = Onboarding;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/extension/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/extension/Popup.jsx
try { (() => {
const {
  Switch,
  SensitivityToggle,
  MopMark,
  UpgradePrompt,
  Button,
  Icon
} = window.SlopMopDesignSystem_ca9143;
const MODE_NOTE = {
  hide: "Slop folds into a paper strip. Click it to unfold.",
  highlight: "Nothing is hidden. The mop on each post turns yellow or red."
};
const SENS_NOTE = {
  mild: "Only the clearest slop. Fewest false alarms.",
  moderate: "The default balance.",
  aggressive: "Catches more, and is wrong more often."
};
const PERIODS = [["today", "Today", "today"], ["week", "Week", "this week"], ["month", "Month", "this month"], ["total", "All time", "since you installed"]];

/* Same type roles as WhyCard: head 11 bold caps ink · sub 11 semibold caps faint · body 13 · note 12 muted · meta 11 mono faint.
   Spacing: 16 section padding, 12 between head, control and note. */
const popupSx = {
  head: {
    margin: 0,
    font: "var(--weight-bold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-body)"
  },
  sub: {
    font: "var(--weight-semibold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-faint)"
  },
  note: {
    margin: 0,
    color: "var(--text-muted)",
    font: "var(--weight-regular) 12px/1.45 var(--font-body)"
  },
  meta: {
    font: "var(--weight-regular) 11px/1.4 var(--font-mono)",
    color: "var(--text-faint)"
  },
  section: {
    display: "grid",
    gap: "var(--space-5)",
    padding: "var(--space-6) 0",
    borderBottom: "1px solid var(--border-hairline)"
  }
};

/* A tiny feed, drawn the way each mode treats it. Shapes only — the words are on the card. */
const MINI_MOP = {
  red: ["var(--red-100)", "var(--red-500)"],
  yellow: ["var(--mop-100)", "var(--mop-500)"],
  neutral: ["var(--paper-200)", "var(--ink-400)"]
};
function MiniPost({
  mop = "neutral"
}) {
  const [wash, glyph] = MINI_MOP[mop];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      flex: "none",
      display: "grid",
      gap: 4,
      padding: "7px",
      background: "var(--mini-post)",
      border: "1px solid var(--border-hairline)",
      borderRadius: 3
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: 3,
      width: "55%",
      borderRadius: 2,
      background: "var(--ink-200)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: 3,
      width: "88%",
      borderRadius: 2,
      background: "var(--ink-100)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: 3,
      width: "72%",
      borderRadius: 2,
      background: "var(--ink-100)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      right: 3,
      width: 17,
      height: 17,
      borderRadius: "50%",
      background: wash,
      boxShadow: mop === "neutral" ? "none" : `0 0 0 1px ${glyph}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(MopMark, {
    size: 12,
    knockout: wash,
    style: {
      color: glyph
    }
  })));
}
function MiniFold() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flex: "none",
      alignItems: "center",
      gap: 4,
      height: 24,
      boxSizing: "border-box",
      padding: "0 6px",
      borderRadius: 3,
      border: "1px solid var(--border-hairline)",
      background: "var(--mini-post)"
    }
  }, /*#__PURE__*/React.createElement(MopMark, {
    size: 14,
    knockout: "var(--mini-post)",
    style: {
      color: "var(--red-500)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: 2,
      width: 30,
      borderRadius: 1,
      background: "var(--ink-200)"
    }
  }));
}
function ModeCard({
  on,
  label,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "radio",
    "aria-checked": on,
    onClick: onClick,
    style: {
      all: "unset",
      position: "relative",
      boxSizing: "border-box",
      cursor: "pointer",
      display: "grid",
      gap: "var(--space-4)",
      padding: "var(--space-4)",
      borderRadius: "var(--radius-md)",
      background: on ? "var(--paper-000)" : "var(--paper-100)",
      border: `1px solid ${on ? "var(--ink-900)" : "var(--border-hairline)"}`,
      boxShadow: on ? "0 0 0 1px var(--ink-900), var(--shadow-raised)" : "none",
      transition: "var(--transition-ui)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      padding: "6px 6px 0",
      height: 96,
      boxSizing: "border-box",
      overflow: "hidden",
      borderRadius: "var(--radius-sm)",
      background: on ? "var(--mini-feed-on)" : "var(--mini-feed)",
      opacity: on ? 1 : 0.4,
      filter: on ? "none" : "grayscale(.6)",
      transition: "var(--transition-ui)"
    }
  }, children), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `${on ? "var(--weight-bold)" : "var(--weight-medium)"} 13px/1.2 var(--font-body)`,
      color: "var(--text-body)",
      textAlign: "center"
    }
  }, label), on && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: -7,
      right: -7,
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "var(--ink-900)",
      color: "var(--paper-000)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 0 2px var(--paper-000)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12,
    strokeWidth: 3
  })));
}

/** Slop mopped: one number, cycling day → week → month → all time on its own; tap a period to hold it. */
function Mopped({
  hidden,
  off
}) {
  const [pick, setI] = React.useState(0);
  const [held, setHeld] = React.useState(false);
  const i = off ? PERIODS.length - 1 : pick; // off: pinned to all time, no rotation
  React.useEffect(() => {
    if (off || held || typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI(x => (x + 1) % PERIODS.length), 2600);
    return () => clearInterval(t);
  }, [held, off]);
  const [key,, phrase] = PERIODS[i];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-4)",
      minHeight: 36
    }
  }, /*#__PURE__*/React.createElement("b", {
    key: key,
    style: {
      font: "var(--weight-bold) 34px/1 var(--font-display)",
      letterSpacing: "var(--tracking-tight)",
      fontVariantNumeric: "tabular-nums",
      animation: "popupNum var(--dur-slow) var(--ease-standard)"
    }
  }, hidden[key].toLocaleString()), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) 13px/1.3 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "posts mopped ", phrase)), /*#__PURE__*/React.createElement("span", {
    role: "tablist",
    "aria-label": "Period",
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, PERIODS.map(([k, l], j) => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    role: "tab",
    "aria-selected": j === i,
    onClick: () => {
      setI(j);
      setHeld(true);
    },
    style: {
      all: "unset",
      cursor: "pointer",
      flex: 1,
      textAlign: "center",
      padding: "var(--space-3) 0 0",
      borderTop: `2px solid ${j === i ? "var(--ink-900)" : "var(--border-hairline)"}`,
      ...popupSx.sub,
      color: j === i ? "var(--text-body)" : "var(--text-faint)",
      transition: "var(--transition-ui)"
    }
  }, l))));
}

/** Session expired: Slop Mop is off until the reader signs in again. One action — the method they used last, tagged as such.
    No PII on screen: the email is typed fresh (format-checked in the browser) rather than shown back. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function SignedOut({
  method = "google",
  onSignIn
}) {
  const [step, setStep] = React.useState("choose"); // choose | email | sent
  const [val, setVal] = React.useState("");
  const valid = EMAIL_RE.test(val.trim());
  const tag = /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -8,
      right: 10,
      padding: "1px 6px",
      borderRadius: 3,
      background: "var(--ink-900)",
      color: "var(--paper-000)",
      font: "var(--weight-bold) 10px/1.4 var(--font-body)",
      letterSpacing: "0.06em",
      textTransform: "uppercase"
    }
  }, "Last used");
  const quiet = {
    all: "unset",
    cursor: "pointer",
    justifySelf: "center",
    font: "var(--weight-medium) 12px/1.3 var(--font-body)",
    color: "var(--text-muted)",
    textDecoration: "underline",
    textUnderlineOffset: 2
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)",
      padding: "var(--space-7) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...popupSx.sub,
      color: "var(--red-700)"
    }
  }, "Off \xB7 signed out"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--text-lg)/1.2 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, step === "sent" ? "Check your email." : "Sign in to keep mopping."), /*#__PURE__*/React.createElement("p", {
    style: popupSx.note
  }, step === "sent" ? "Open the link in this browser. It works once and expires in 15 minutes." : "Your session ran out, so nothing is being checked. Security makes us hang up the mop now and then — sign in and it picks up right where you left off.")), step === "choose" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: method === "google" ? onSignIn : () => setStep("email")
  }, method === "google" ? "Continue with Google" : "Continue with email"), tag), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: quiet,
    onClick: method === "google" ? () => setStep("email") : onSignIn
  }, method === "google" ? "Use email instead" : "Use Google instead")), step === "email" && /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (valid) setStep("sent");
    },
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: popupSx.sub
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    autoFocus: true,
    autoComplete: "email",
    inputMode: "email",
    value: val,
    placeholder: "you@example.com",
    onChange: e => setVal(e.target.value),
    "aria-invalid": val.length > 0 && !valid,
    style: {
      height: 40,
      padding: "0 var(--space-5)",
      borderRadius: "var(--radius-sm)",
      font: "var(--type-body)",
      color: "var(--text-body)",
      background: "var(--paper-000)",
      outline: "none",
      border: `1px solid ${val.length > 3 && !valid ? "var(--red-500)" : valid ? "var(--ink-900)" : "var(--border-default)"}`
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: !valid,
    onClick: () => valid && setStep("sent")
  }, "Email me a sign-in link"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: quiet,
    onClick: () => setStep("choose")
  }, "Back")), step === "sent" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    onClick: () => setStep("email")
  }, "Send it again"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: quiet,
    onClick: onSignIn
  }, "I've opened it")));
}

/** Off: just the lifetime tally and one big way back on. The switch still works; this is the obvious path. */
function TurnedOff({
  total,
  onEnable
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-7)",
      padding: "var(--space-7) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: popupSx.sub
  }, "Off \xB7 nothing is being checked"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-4)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--weight-bold) 34px/1 var(--font-display)",
      letterSpacing: "var(--tracking-tight)",
      fontVariantNumeric: "tabular-nums"
    }
  }, total.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) 13px/1.3 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "posts mopped since you installed"))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onEnable
  }, "Enable Slop Mop"));
}

/** A popup section that folds to one line: heading, the current value as a quiet summary, and a chevron. */
function Fold({
  title,
  summary,
  open,
  onToggle,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...popupSx.section,
      gap: open ? "var(--space-5)" : 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-expanded": open,
    onClick: onToggle,
    style: {
      all: "unset",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      margin: "-4px 0",
      padding: "4px 0"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...popupSx.head,
      flex: "none"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: "right",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      font: "var(--weight-medium) 12px/1.2 var(--font-body)",
      color: "var(--text-muted)",
      opacity: open ? 0 : 1,
      transition: "opacity var(--dur-fast) var(--ease-standard)"
    }
  }, summary), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 16,
    style: {
      flex: "none",
      color: "var(--text-faint)",
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--dur-base) var(--ease-standard)"
    }
  })), open && children);
}

/* Which feed this popup is mopping. Monochrome letter tiles stand in for each site's mark — swap in the official marks
   (and follow their brand rules) when this ships. XL readers get the yellow XL tile and "All feeds". */
const FEED_MARK = {
  linkedin: ["in", "LinkedIn"],
  x: ["X", "X"],
  reddit: ["r/", "Reddit"],
  facebook: ["f", "Facebook"]
};
function FeedLock({
  plan,
  feed
}) {
  const xl = plan === "xl";
  const [glyph, name] = xl ? ["XL", "All feeds"] : FEED_MARK[feed] || FEED_MARK.linkedin;
  return /*#__PURE__*/React.createElement("span", {
    title: xl ? "Slop Mop XL: every supported feed" : `Your free feed: ${name}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      height: 24,
      padding: "0 var(--space-4) 0 3px",
      borderRadius: "var(--radius-pill)",
      background: xl ? "var(--ink-900)" : "var(--paper-200)",
      color: xl ? "var(--paper-000)" : "var(--text-body)",
      boxShadow: "inset 0 0 0 1px var(--border-strong)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: xl ? "var(--mop-500)" : "var(--ink-900)",
      color: xl ? "var(--ink-900)" : "var(--paper-000)",
      font: "var(--weight-bold) 9px/1 var(--font-body)",
      letterSpacing: "-0.02em"
    }
  }, glyph), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) 12px/1 var(--font-body)"
    }
  }, name));
}

/** The toolbar popup, 360px. Same type roles as the details panel. `usage` drives Checks today and the limit state. */
function Popup({
  state,
  set
}) {
  const {
    enabled: on,
    mode,
    sensitivity,
    hidden,
    usage,
    problem,
    device = "7F3A·92C1",
    copied,
    session,
    lastMethod,
    email,
    plan = "free",
    feed = "linkedin"
  } = state;
  const expired = session === "expired";
  const enabled = on && !expired;
  const full = usage.state !== "ok";
  const atLimit = usage.state === "limit";
  const left = full ? 0 : usage.limit - usage.used;
  // At the daily limit everything but Checks today + the XL block starts condensed: the one thing to see is the limit.
  // The footer (About & privacy · My account · version) is never collapsible.
  const [folds, setFolds] = React.useState(state.folded || (usage.state === "limit" ? {
    mode: true,
    sens: true,
    mopped: true
  } : {}));
  const tog = k => () => setFolds(f => ({
    ...f,
    [k]: !f[k]
  }));
  const dim = {
    opacity: enabled ? 1 : 0.45,
    pointerEvents: enabled ? "auto" : "none",
    transition: "opacity var(--dur-base) var(--ease-standard)"
  };
  const usageNote = atLimit ? null : usage.state === "paused" ? `Checking is paused here: this network's IP looks like a cloud or hosting address (some VPNs and corporate networks do this). Slop Mop will try again at ${usage.resets}.` : usage.state === "disabled" ? "This install has been disabled by the Slop Mop server." : `Each new post uses one. Resets at ${usage.resets}.`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "var(--popup-width)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-raised)",
      overflow: "hidden",
      font: "var(--type-body-sm)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      color: "var(--ink-900)"
    }
  }, /*#__PURE__*/React.createElement(MopMark, {
    size: 22
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--weight-semibold) var(--text-lg)/1 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "Slop Mop")), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 1,
      height: 18,
      background: "var(--border-default)",
      margin: "0 var(--space-4)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      filter: enabled ? "none" : "grayscale(1)",
      opacity: enabled ? 1 : 0.45
    }
  }, /*#__PURE__*/React.createElement(FeedLock, {
    plan: plan,
    feed: feed
  }))), /*#__PURE__*/React.createElement(Switch, {
    checked: enabled,
    disabled: expired,
    onChange: v => set({
      enabled: v
    }),
    "aria-label": "Enable Slop Mop"
  })), expired ? /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "0 var(--popup-pad)"
    }
  }, /*#__PURE__*/React.createElement(SignedOut, {
    method: lastMethod,
    onSignIn: () => set({
      session: "ok",
      enabled: true
    })
  })) : !enabled ? /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "0 var(--popup-pad)"
    }
  }, /*#__PURE__*/React.createElement(TurnedOff, {
    total: hidden.total,
    onEnable: () => set({
      enabled: true
    })
  })) : /*#__PURE__*/React.createElement("main", {
    style: {
      padding: "0 var(--popup-pad)",
      ...dim
    }
  }, /*#__PURE__*/React.createElement(Fold, {
    title: "Mode",
    summary: mode === "hide" ? "Hide posts" : "Highlight only",
    open: !folds.mode,
    onToggle: tog("mode")
  }, /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": "Mode",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(ModeCard, {
    on: mode === "hide",
    label: "Hide posts",
    onClick: () => set({
      mode: "hide"
    })
  }, /*#__PURE__*/React.createElement(MiniPost, null), /*#__PURE__*/React.createElement(MiniFold, null), /*#__PURE__*/React.createElement(MiniPost, null)), /*#__PURE__*/React.createElement(ModeCard, {
    on: mode === "highlight",
    label: "Highlight only",
    onClick: () => set({
      mode: "highlight"
    })
  }, /*#__PURE__*/React.createElement(MiniPost, null), /*#__PURE__*/React.createElement(MiniPost, {
    mop: "red"
  }), /*#__PURE__*/React.createElement(MiniPost, {
    mop: "yellow"
  }))), /*#__PURE__*/React.createElement("p", {
    style: popupSx.note
  }, MODE_NOTE[mode])), /*#__PURE__*/React.createElement(Fold, {
    title: "Sensitivity",
    summary: sensitivity[0].toUpperCase() + sensitivity.slice(1),
    open: !folds.sens,
    onToggle: tog("sens")
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...popupSx.note,
      marginTop: "calc(var(--space-3) * -1)"
    }
  }, SENS_NOTE[sensitivity]), /*#__PURE__*/React.createElement(SensitivityToggle, {
    value: sensitivity,
    onChange: v => set({
      sensitivity: v
    }),
    showThreshold: false
  })), /*#__PURE__*/React.createElement(Fold, {
    title: "Slop mopped",
    summary: `${hidden.total.toLocaleString()} all time`,
    open: !folds.mopped,
    onToggle: tog("mopped")
  }, /*#__PURE__*/React.createElement(Mopped, {
    hidden: hidden,
    off: !enabled
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      ...popupSx.section,
      borderBottom: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...popupSx.head,
      color: atLimit ? "var(--red-700)" : "var(--text-body)"
    }
  }, "Checks today"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...popupSx.meta,
      color: full ? "var(--red-700)" : "var(--text-faint)",
      fontWeight: full ? 600 : 400
    }
  }, full ? `none left · resets ${usage.resets}` : `${left} remaining`)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: "block",
      height: atLimit ? 8 : 6,
      borderRadius: "var(--radius-pill)",
      background: "var(--paper-300)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: "100%",
      width: `${full ? 100 : Math.min(100, usage.used / usage.limit * 100)}%`,
      borderRadius: "var(--radius-pill)",
      background: full ? "var(--red-500)" : "var(--ink-400)",
      transition: "width var(--dur-slow) var(--ease-standard)"
    }
  })), usageNote && /*#__PURE__*/React.createElement("p", {
    style: popupSx.note
  }, usageNote), problem && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "grid",
      gap: "var(--space-2)",
      padding: "var(--space-4) var(--space-5)",
      borderRadius: "var(--radius-sm)",
      background: "var(--red-100)",
      border: "1px solid var(--red-200)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...popupSx.sub,
      color: "var(--red-700)"
    }
  }, "Last problem \xB7 ", problem.ago), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) 12px/1.45 var(--font-body)",
      color: "var(--red-700)",
      overflowWrap: "anywhere"
    }
  }, problem.message)), atLimit && /*#__PURE__*/React.createElement(UpgradePrompt, {
    surface: "popup",
    reason: "limit",
    limit: usage.limit,
    resets: usage.resets
  }))), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "var(--space-5) var(--space-6)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      color: "var(--text-faint)",
      font: "var(--weight-medium) 11px/1.3 var(--font-body)",
      fontVariantNumeric: "tabular-nums",
      borderTop: "1px solid var(--border-hairline)",
      background: "var(--paper-100)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      set({
        screen: "onboarding"
      });
    }
  }, "About & privacy"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "My account"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set({
      copied: true
    }),
    title: "Your device ID. Click to copy it, with the version and the last problem, for a support message.",
    style: {
      all: "unset",
      cursor: "pointer",
      color: copied ? "var(--text-body)" : "var(--text-faint)"
    }
  }, copied ? "Device ID copied" : `Device: ${device}`), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "v0.2.7")));
}
window.Popup = Popup;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/extension/Popup.jsx", error: String((e && e.message) || e) }); }

// ui_kits/feed/FeedItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  FoldStrip,
  WhyCard,
  MopIcon,
  NoticePanel
} = window.SlopMopDesignSystem_ca9143;

/* A deliberately plain stand-in for a LinkedIn post. Slop Mop never restyles the host post — it adds a mop icon beside
   the "…" menu, or replaces the post with a fold strip. */
function FeedPost({
  post,
  icon
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: "#fff",
      border: "1px solid #E0DFDC",
      borderRadius: 8,
      padding: "12px 16px 8px",
      font: "var(--type-body-sm)",
      color: "#1B1B18"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "#E8E6E1",
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: 1,
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, post.author), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#5E5D59",
      fontSize: 12
    }
  }, post.title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#8A8A85",
      fontSize: 12
    }
  }, post.age)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      alignSelf: "flex-start"
    }
  }, icon, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5E5D59",
      fontWeight: 700,
      letterSpacing: 1
    }
  }, "\xB7\xB7\xB7"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 10px",
      whiteSpace: "pre-line",
      lineHeight: 1.45
    }
  }, post.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      alignItems: "center",
      paddingTop: 8,
      borderTop: "1px solid #EFEEEB",
      color: "#5E5D59",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, post.reactions, " reactions"), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, post.comments, " comments"), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, post.reposts, " reposts")));
}
function verdictOf(post, zones) {
  if (post.lowConfidence) return "unsure";
  return post.score >= zones.likely ? "likely" : post.score >= zones.possibly ? "possibly" : "fine";
}
const VOTE_TINT = {
  no: "blue",
  maybe: "yellow",
  probably: "red"
};
function FeedItem({
  post,
  mode,
  zones,
  stats,
  open,
  setOpen
}) {
  const [vote, setVote] = React.useState(null);
  const [restored, setRestored] = React.useState(false);
  const [hoverFold, setHoverFold] = React.useState(false);
  const verdict = verdictOf(post, zones);
  const flagged = verdict === "likely" || verdict === "possibly";
  const hiddenNow = mode === "hide" && !restored && (vote ? vote === "probably" : verdict === "likely");
  // The icon tint, in both modes: a vote beats the score; otherwise a flagged post shows its verdict color
  // (in Hide mode Possibly stays visible but yellow; Likely folds, and keeps its red once unfolded).
  const tint = vote ? VOTE_TINT[vote] : flagged ? verdict === "likely" ? "red" : "yellow" : "unchecked";
  const panelProps = {
    verdict,
    score: post.score,
    mode,
    tells: post.tells,
    humanVoice: post.humanVoice,
    usefulness: post.usefulness,
    readerResponse: post.readerResponse,
    possibly: zones.possibly,
    likely: zones.likely,
    community: post.community,
    checksToday: {
      used: 138,
      limit: 250
    },
    blocked: post.lowConfidence && post.score >= zones.possibly
  };
  // Panels drop down inside the feed column (never over the sidebar). The hover tooltip is click-through, as shipped,
  // so it can never steal the hover from the strip and flicker.
  const panel = interactive => /*#__PURE__*/React.createElement("div", {
    style: interactive ? {
      position: "absolute",
      top: 48,
      right: 8,
      zIndex: 30
    } : {
      position: "absolute",
      top: "calc(100% + 6px)",
      right: 0,
      zIndex: 30,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(WhyCard, _extends({}, panelProps, {
    interactive: interactive,
    vote: vote,
    onVote: interactive ? setVote : undefined
  })));
  if (hiddenNow) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      },
      onMouseEnter: () => setHoverFold(true),
      onMouseLeave: () => setHoverFold(false)
    }, /*#__PURE__*/React.createElement(FoldStrip, {
      tone: vote ? vote === "maybe" ? "yellow" : "red" : verdict === "possibly" ? "yellow" : "red",
      stats: stats,
      onRestore: () => {
        setRestored(true);
        setHoverFold(false);
      }
    }), hoverFold && panel(false));
  }
  const isOpen = open === post.id;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(FeedPost, {
    post: post,
    icon: /*#__PURE__*/React.createElement(MopIcon, {
      state: tint,
      onClick: () => setOpen(isOpen ? null : post.id)
    })
  }), isOpen && panel(true));
}

/* "Check this draft": the mop button beside Post in LinkedIn's composer (content/composer.ts). */
function Composer() {
  const [text, setText] = React.useState("Excited to share that I've been thinking a lot about leadership lately.\n\nHere's the thing: it's not about the title. It's about the people.\n\nAgree?");
  const [state, setState] = React.useState(null); // null | busy | short | result
  const check = () => {
    if (state && state !== "busy") return setState(null);
    if (text.trim().length < 20) return setState("short");
    setState("busy");
    setTimeout(() => setState("result"), 700);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "var(--feed-post-width)",
      maxWidth: "100%",
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 4px 24px rgba(0,0,0,.18)",
      font: "var(--type-body-sm)",
      color: "#1B1B18"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 16px",
      borderBottom: "1px solid #EFEEEB",
      fontWeight: 600,
      fontSize: 15
    }
  }, "Create a post"), /*#__PURE__*/React.createElement("textarea", {
    value: text,
    onChange: e => {
      setText(e.target.value);
      setState(null);
    },
    style: {
      display: "block",
      width: "100%",
      boxSizing: "border-box",
      minHeight: 170,
      border: 0,
      resize: "none",
      padding: 16,
      font: "15px/1.45 var(--font-body)",
      color: "#1B1B18",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 8,
      padding: "8px 16px 12px",
      borderTop: "1px solid #EFEEEB"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: check,
    "aria-label": "Check this draft with Slop Mop",
    title: "Check this draft with Slop Mop (uses one of your daily checks)",
    style: {
      all: "unset",
      width: 40,
      height: 40,
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "var(--ink-600)",
      background: state ? "var(--paper-200)" : "transparent"
    }
  }, state === "busy" ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: 3
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      width: 4,
      height: 4,
      borderRadius: "50%",
      background: "var(--ink-500)"
    }
  }))) : /*#__PURE__*/React.createElement(window.SlopMopDesignSystem_ca9143.MopMark, {
    size: 24,
    knockout: "var(--paper-000)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 32,
      padding: "0 16px",
      borderRadius: 16,
      background: "#0A66C2",
      color: "#fff",
      fontWeight: 600
    }
  }, "Post")), state === "short" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      bottom: 64
    }
  }, /*#__PURE__*/React.createElement(NoticePanel, {
    kind: "tooShort"
  })), state === "result" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "calc(100% + 12px)",
      top: 0
    }
  }, /*#__PURE__*/React.createElement(WhyCard, {
    own: true,
    draft: {
      used: 139,
      limit: 250
    },
    verdict: "possibly",
    score: 58,
    mode: "hide",
    interactive: false,
    tells: {
      contrastFraming: 0.7,
      engagementBait: 0.62,
      emptyEvaluation: 0.48,
      formulaicHook: 0.4
    },
    humanVoice: 0.3,
    usefulness: 0.1
  })));
}
Object.assign(window, {
  FeedPost,
  FeedItem,
  Composer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/feed/FeedItem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/feed/posts.js
try { (() => {
/* Values follow the shipped model: `score` is the 0–100 display score (shared/display.ts), tells are Jev's 0–1 per tell,
   the three counter-signals are peers, and lowConfidence (meanConfidence < 0.25) fails open. Zone lines per sensitivity
   on the display scale, from displayScore(yellowAt) / displayScore(threshold): */
window.SLOP_ZONES = {
  mild: {
    possibly: 67,
    likely: 88
  },
  moderate: {
    possibly: 40,
    likely: 70
  },
  aggressive: {
    possibly: 29,
    likely: 49
  }
};
window.SLOP_FEED = [{
  id: "p1",
  author: "Dana Whitfield",
  title: "Founder & CEO, Northbeam Labs",
  age: "3h",
  reactions: 412,
  comments: 96,
  reposts: 31,
  score: 78,
  lowConfidence: false,
  humanVoice: 0.12,
  usefulness: 0.15,
  readerResponse: 0.38,
  community: {
    probably: 3,
    maybe: 1,
    no: 2
  },
  tells: {
    manufacturedNarrative: 0.79,
    contrastFraming: 0.72,
    hypeMarketing: 0.41,
    emptyEvaluation: 0.55,
    engagementBait: 0.6,
    formulaicHook: 0.66
  },
  body: "I fired my best performer last week.\n\nHere's why it was the best decision I've ever made.\n\nIt's not just about performance — it's about culture. What I learned wasn't merely a lesson in management; it was a profound reminder that leadership is about the hard calls.\n\nAgree?"
}, {
  id: "p2",
  author: "Priya Raman",
  title: "Staff engineer, payments",
  age: "5h",
  reactions: 88,
  comments: 14,
  reposts: 2,
  score: 12,
  lowConfidence: false,
  humanVoice: 0.74,
  usefulness: 0.81,
  readerResponse: 0.22,
  community: null,
  tells: {
    formalHedging: 0.22
  },
  body: "We shaved 400ms off checkout by moving the fraud check off the critical path. Took three weeks, two of them arguing about it. Writeup in comments — the boring part (queue backpressure) is the part that mattered."
}, {
  id: "p3",
  author: "Marcus Bell",
  title: "Helping B2B leaders unlock growth",
  age: "7h",
  reactions: 1204,
  comments: 240,
  reposts: 88,
  score: 61,
  lowConfidence: false,
  humanVoice: 0.21,
  usefulness: 0.09,
  readerResponse: 0.71,
  community: {
    probably: 9,
    maybe: 4,
    no: 1
  },
  tells: {
    emptyEvaluation: 0.74,
    engagementBait: 0.68,
    contrastFraming: 0.52,
    formulaicHook: 0.4
  },
  body: "Most teams don't have a strategy problem. They have a clarity problem.\n\nStrategy without clarity is noise.\nClarity without execution is theater.\n\nComment YES if this resonates."
}, {
  id: "p4",
  author: "Ellen Okafor",
  title: "Designer",
  age: "9h",
  reactions: 26,
  comments: 9,
  reposts: 0,
  score: 55,
  lowConfidence: true,
  humanVoice: 0.63,
  usefulness: 0.3,
  readerResponse: 0.12,
  community: null,
  tells: {
    manneredProse: 0.52,
    contrastFraming: 0.44
  },
  body: "Spent Saturday redrawing the same icon 40 times and I still don't like it. Posting it anyway — pretty sure #37 is the one, sort of."
}, {
  id: "p5",
  author: "Greg Tanner",
  title: "Sales leader | Speaker | Girl dad",
  age: "11h",
  reactions: 74,
  comments: 11,
  reposts: 1,
  score: 84,
  lowConfidence: false,
  humanVoice: 0.44,
  usefulness: 0.08,
  readerResponse: 0.18,
  community: {
    probably: 14,
    maybe: 2,
    no: 0
  },
  tells: {
    formulaicHook: 0.91,
    engagementBait: 0.77,
    manufacturedNarrative: 0.64,
    contrastFraming: 0.58,
    hypeMarketing: 0.2
  },
  body: "My 4 year old taught me more about closing than any sales trainer ever did.\n\nShe asked for ice cream.\n\nI said no.\n\nShe asked again.\n\nRead that again.\n\nPersistence isn't annoying. It's belief.\n\nWho needed to hear this today? \ud83d\udc47"
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/feed/posts.js", error: String((e && e.message) || e) }); }

// ui_kits/placements/Placements.jsx
try { (() => {
const PL = window.SlopMopDesignSystem_ca9143;
const PL_TONE = {
  fine: {
    bg: "var(--blue-100)",
    text: "var(--blue-700)",
    border: "var(--blue-200)",
    word: "Looks fine",
    mop: "blue"
  },
  possibly: {
    bg: "var(--mop-100)",
    text: "var(--mop-900)",
    border: "var(--mop-500)",
    word: "Possibly slop",
    mop: "yellow"
  },
  likely: {
    bg: "var(--red-100)",
    text: "var(--red-700)",
    border: "var(--red-500)",
    word: "Likely slop",
    mop: "red"
  }
};
const plVerdict = n => n >= 70 ? "likely" : n >= 40 ? "possibly" : "fine";
const plSx = {
  head: {
    margin: 0,
    font: "var(--weight-bold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-body)"
  },
  sub: {
    font: "var(--weight-semibold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-faint)"
  },
  meta: {
    font: "var(--weight-regular) 11px/1.4 var(--font-mono)",
    color: "var(--text-faint)"
  },
  host: {
    background: "#fff",
    borderRadius: 8,
    border: "1px solid #E3E3E3"
  }
};

/** A verdict chip for a single piece of writing: mop + word (+ score). */
function Chip({
  n,
  score = true,
  small
}) {
  const t = PL_TONE[plVerdict(n)];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: small ? 20 : 22,
      padding: "0 7px 0 5px",
      borderRadius: "var(--radius-xs)",
      background: t.bg,
      color: t.text,
      border: `1px solid ${t.border}`,
      font: "var(--weight-semibold) 12px/1 var(--font-body)",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement(PL.MopMark, {
    size: 13,
    knockout: t.bg,
    style: {
      color: t.text
    }
  }), t.word, score && /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--weight-semibold) 11px/1 var(--font-mono)",
      opacity: 0.8
    }
  }, n));
}

/** Mess Index — a whole site, never a single page: the average score of every page Slop Mop has checked there. */
function MessIndex({
  value,
  pages,
  compact
}) {
  const v = plVerdict(value),
    t = PL_TONE[v];
  const badge = {
    fine: ["var(--blue-500)", "var(--paper-000)"],
    possibly: ["var(--mop-500)", "var(--ink-900)"],
    likely: ["var(--red-500)", "var(--paper-000)"]
  }[v];
  const label = value >= 70 ? "Messy site" : value >= 40 ? "Mixed site" : "Tidy site";
  return /*#__PURE__*/React.createElement("span", {
    title: `Mess Index ${value} / 100 — the average across ${pages.toLocaleString()} pages checked on this site`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: compact ? 22 : 26,
      padding: "0 8px 0 3px",
      borderRadius: "var(--radius-pill)",
      background: "var(--paper-000)",
      border: `1px solid ${t.border}`,
      whiteSpace: "nowrap",
      verticalAlign: "middle"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: compact ? 16 : 20,
      height: compact ? 16 : 20,
      padding: "0 4px",
      borderRadius: "var(--radius-pill)",
      background: badge[0],
      color: badge[1],
      font: "var(--weight-bold) 11px/1 var(--font-mono)"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) 12px/1 var(--font-body)",
      color: t.text
    }
  }, compact ? "Mess Index" : label));
}
function Case({
  n,
  title,
  unit,
  treatment,
  why,
  children,
  wide
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      gridColumn: wide ? "1 / -1" : "auto",
      display: "grid",
      gap: "var(--space-5)",
      alignContent: "start",
      padding: "var(--space-7)",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: plSx.sub
  }, n), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--text-lg)/1.2 var(--font-display)"
    }
  }, title), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: "grid",
      gridTemplateColumns: "84px minmax(0,1fr)",
      gap: "var(--space-2) var(--space-4)",
      font: "var(--weight-regular) 13px/1.45 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: plSx.sub
  }, "Judges"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0
    }
  }, unit), /*#__PURE__*/React.createElement("dt", {
    style: plSx.sub
  }, "Shows"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0
    }
  }, treatment), /*#__PURE__*/React.createElement("dt", {
    style: plSx.sub
  }, "Why"), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      color: "var(--text-muted)"
    }
  }, why))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      borderRadius: "var(--radius-md)",
      background: "var(--paper-200)"
    }
  }, children));
}

/* 1 — Search results: site-level only. */
function SearchResults() {
  const rows = [{
    url: "northbeam.io › blog › leadership",
    title: "10 Game-Changing Leadership Lessons That Will Transform Your Team",
    desc: "In today's fast-paced world, leadership is more important than ever. Unlock your potential with these…",
    mess: 82,
    pages: 1240
  }, {
    url: "martinfowler.com › articles › patterns",
    title: "Patterns of Distributed Systems",
    desc: "A collection of patterns from mainstream open source distributed systems, with the code that…",
    mess: 11,
    pages: 3108
  }, {
    url: "hbr.org › 2026 › 09 › managing-up",
    title: "How to Manage Up Without Managing Out",
    desc: "Most advice on managing up assumes your boss wants to be managed. Here's what to do when…",
    mess: 46,
    pages: 18402
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...plSx.host,
      padding: "16px 20px",
      display: "grid",
      gap: 20,
      font: "14px/1.45 Arial, sans-serif",
      color: "#202124"
    }
  }, rows.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.title,
    style: {
      display: "grid",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12,
      color: "#4D5156"
    }
  }, /*#__PURE__*/React.createElement(MessIndex, {
    value: r.mess,
    pages: r.pages,
    compact: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "#EEE"
    }
  }), r.url), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 19,
      lineHeight: 1.3,
      color: "#1A0DAB",
      textDecoration: "none"
    }
  }, r.title), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#4D5156"
    }
  }, r.desc))));
}

/* 2 — On a site: the toolbar popup leads with that site's Mess Index. */
function SitePopupHead() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 340,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-hairline)",
      boxShadow: "var(--shadow-raised)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      padding: "var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(PL.MopMark, {
    size: 22,
    style: {
      color: "var(--ink-900)"
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      font: "var(--weight-semibold) var(--text-lg)/1 var(--font-display)"
    }
  }, "Slop Mop")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: plSx.head
  }, "This site"), /*#__PURE__*/React.createElement("span", {
    style: plSx.meta
  }, "northbeam.io")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(MessIndex, {
    value: 82,
    pages: 1240
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-regular) 12px/1.4 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "across 1,240 pages checked")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      height: 8,
      borderRadius: 999,
      overflow: "visible",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: "40%",
      background: "var(--blue-200)",
      borderRadius: "999px 0 0 999px"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      width: "30%",
      background: "var(--mop-200)"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      flex: 1,
      background: "var(--red-200)",
      borderRadius: "0 999px 999px 0"
    }
  }), /*#__PURE__*/React.createElement("i", {
    style: {
      position: "absolute",
      left: "82%",
      top: -4,
      width: 16,
      height: 16,
      marginLeft: -8,
      borderRadius: "50%",
      background: "var(--ink-900)",
      border: "2px solid #fff",
      boxSizing: "border-box"
    }
  }))));
}

/* 3 — A single article: the article's own score at the byline; click for the panel. */
function Article() {
  const [open, setOpen] = React.useState(false);
  const [vote, setVote] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...plSx.host,
      position: "relative",
      padding: "24px 28px",
      font: "17px/1.6 Georgia, serif",
      color: "#222"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "12px/1 Arial, sans-serif",
      color: "#777",
      letterSpacing: ".04em",
      textTransform: "uppercase"
    }
  }, "Opinion \xB7 Work"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "8px 0 10px",
      font: "700 26px/1.2 Georgia, serif"
    }
  }, "The Future of Work Is Here \u2014 And It's More Human Than Ever"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      margin: "0 0 14px",
      font: "13px/1 Arial, sans-serif",
      color: "#666"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "#E8E6E1"
    }
  }), "By J. Writer \xB7 6 min read", /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-expanded": open,
    onClick: () => setOpen(true),
    style: {
      all: "unset",
      cursor: "pointer",
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    n: 78
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "#555"
    }
  }, "In an era of unprecedented change, organizations must navigate a complex landscape. It's not just about technology; it's about people\u2026"), open && /*#__PURE__*/React.createElement("div", {
    onMouseLeave: () => setOpen(false),
    style: {
      position: "absolute",
      top: 104,
      right: 12,
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement(PL.WhyCard, {
    verdict: "likely",
    score: 78,
    mode: "highlight",
    vote: vote,
    onVote: setVote,
    tells: {
      hypeMarketing: 0.82,
      contrastFraming: 0.71,
      emptyEvaluation: 0.6,
      tradeoffFreePromises: 0.44,
      formulaicHook: 0.3,
      manneredProse: 0.26
    },
    humanVoice: 0.12,
    usefulness: 0.18,
    readerResponse: 0.08,
    community: {
      no: 1,
      maybe: 2,
      probably: 6
    },
    checksToday: {
      used: 138,
      limit: 250
    }
  })));
}

/* 4 — An article list: not pre-scored (that would spend a check per headline). Every row carries a dimmed mop;
   hover undims it, click scores on demand — loading panel, then the real panel, and the mop takes its color. */
const AL_TELLS = {
  1: {
    hypeMarketing: 0.86,
    formulaicHook: 0.72,
    emptyEvaluation: 0.58,
    tradeoffFreePromises: 0.41
  },
  3: {
    engagementBait: 0.66,
    formulaicHook: 0.52,
    contrastFraming: 0.31
  },
  0: {
    formalHedging: 0.12
  },
  2: {
    emptyEvaluation: 0.14
  }
};
function ArticleList() {
  const items = [{
    t: "Inside the quiet rewrite of the city's bus network",
    n: 14,
    hv: 0.74,
    us: 0.81,
    rr: 0.4
  }, {
    t: "7 Mindset Shifts That Will Revolutionize How You Lead",
    n: 84,
    hv: 0.12,
    us: 0.1,
    rr: 0.18
  }, {
    t: "Why the new tariff schedule matters for small importers",
    n: 22,
    hv: 0.62,
    us: 0.77,
    rr: 0.35
  }, {
    t: "We asked 5 CEOs about AI. Their answers will surprise you",
    n: 58,
    hv: 0.3,
    us: 0.34,
    rr: 0.5
  }];
  const [hover, setHover] = React.useState(null);
  const [open, setOpen] = React.useState(null);
  const [status, setStatus] = React.useState({}); // i → "loading" | "done"
  const timers = React.useRef({});
  const hideT = React.useRef(null);
  React.useEffect(() => () => {
    Object.values(timers.current).forEach(clearTimeout);
    clearTimeout(hideT.current);
  }, []);
  // Leaving the mop or the panel closes it; a short grace lets the pointer cross the gap between them.
  const stay = () => clearTimeout(hideT.current);
  const leave = () => {
    clearTimeout(hideT.current);
    hideT.current = setTimeout(() => setOpen(null), 180);
  };
  const score = i => {
    stay();
    setOpen(i);
    if (status[i]) return;
    setStatus(s => ({
      ...s,
      [i]: "loading"
    }));
    timers.current[i] = setTimeout(() => setStatus(s => ({
      ...s,
      [i]: "done"
    })), 2600);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...plSx.host,
      padding: "8px 0",
      font: "16px/1.35 Georgia, serif",
      color: "#1A1A1A",
      position: "relative"
    }
  }, items.map((it, i) => {
    const v = plVerdict(it.n),
      st = status[i],
      on = hover === i;
    const icon = st === "done" ? PL_TONE[v].mop : "unchecked";
    const dim = !st && !on && open !== i;
    return /*#__PURE__*/React.createElement("div", {
      key: it.t,
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null),
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        borderTop: i ? "1px solid #EEE" : 0,
        background: on ? "#FAFAF8" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 56,
        height: 40,
        borderRadius: 4,
        background: "#E8E6E1",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontWeight: 700
      }
    }, it.t), /*#__PURE__*/React.createElement("span", {
      onMouseEnter: stay,
      onMouseLeave: leave,
      style: {
        flex: "none",
        opacity: dim ? 0.3 : 1,
        transition: "opacity var(--dur-base) var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement(PL.MopIcon, {
      state: icon,
      onClick: () => score(i),
      label: st ? "Slop Mop: see the score" : "Slop Mop: score this article (uses one check)"
    })), open === i && /*#__PURE__*/React.createElement("div", {
      onMouseEnter: stay,
      onMouseLeave: leave,
      style: {
        position: "absolute",
        right: 8,
        top: "calc(100% - 4px)",
        zIndex: 6
      }
    }, /*#__PURE__*/React.createElement(PL.WhyCard, {
      loading: st !== "done",
      verdict: v,
      score: it.n,
      mode: "highlight",
      tells: AL_TELLS[i],
      humanVoice: it.hv,
      usefulness: it.us,
      readerResponse: it.rr,
      community: i === 1 ? {
        no: 0,
        maybe: 2,
        probably: 7
      } : null,
      checksToday: {
        used: 138 + Object.keys(status).length,
        limit: 250
      },
      onVote: () => {}
    })));
  })), /*#__PURE__*/React.createElement("span", {
    style: plSx.meta
  }, "hover a row \xB7 click its mop to score it"));
}

/* 5 — Comments: tinted mop only, no hover. Hide mode collapses a comment to one line. */
function Comments({
  hide
}) {
  const cs = [{
    who: "jkessler",
    age: "2h",
    text: "The queue thing bit us too. We ended up with a per-tenant semaphore — ugly, but it held.",
    n: 9
  }, {
    who: "growthwithdev",
    age: "1h",
    text: "Great insights! Such a valuable perspective. Thanks for sharing — truly game-changing stuff! 🙌",
    n: 81
  }, {
    who: "mara_t",
    age: "40m",
    text: "You moved the check, you didn't remove it; the risk just lives somewhere else now.",
    n: 14
  }, {
    who: "insights_daily",
    age: "22m",
    text: "This. Absolutely this. Leadership is a journey, not a destination.",
    n: 62
  }];
  const [shown, setShown] = React.useState({});
  const [open, setOpen] = React.useState(null);
  const hideT = React.useRef(null);
  React.useEffect(() => () => clearTimeout(hideT.current), []);
  const stay = () => clearTimeout(hideT.current);
  const leave = () => {
    clearTimeout(hideT.current);
    hideT.current = setTimeout(() => setOpen(null), 180);
  };
  const CM_TELLS = {
    9: {
      formalHedging: 0.1
    },
    81: {
      emptyEvaluation: 0.88,
      hypeMarketing: 0.74,
      engagementBait: 0.52
    },
    14: {
      contrastFraming: 0.22
    },
    62: {
      manneredProse: 0.61,
      emptyEvaluation: 0.48,
      formulaicHook: 0.36
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...plSx.host,
      position: "relative",
      padding: 12,
      display: "grid",
      gap: 2,
      font: "14px/1.45 var(--font-body)",
      color: "#1A1A1B"
    }
  }, cs.map(c => {
    const v = plVerdict(c.n);
    if (hide && v === "likely" && !shown[c.who]) {
      return /*#__PURE__*/React.createElement("button", {
        key: c.who,
        type: "button",
        onClick: () => {
          setShown({
            ...shown,
            [c.who]: true
          });
          stay();
          setOpen(c.who);
        },
        style: {
          all: "unset",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 6,
          background: "var(--paper-100)",
          border: "1px dashed var(--border-default)",
          font: "var(--weight-medium) 12px/1.3 var(--font-body)",
          color: "var(--text-muted)"
        }
      }, /*#__PURE__*/React.createElement(PL.MopMark, {
        size: 13,
        knockout: "var(--paper-100)",
        style: {
          color: "var(--red-500)"
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          textDecoration: "underline",
          textUnderlineOffset: 2
        }
      }, "Mopped up a sloppy one"));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: c.who,
      style: {
        position: "relative",
        display: "grid",
        gap: 2,
        padding: "8px 10px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        color: "#576F76"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "#1A1A1B"
      }
    }, c.who), c.age, /*#__PURE__*/React.createElement("span", {
      onMouseEnter: stay,
      onMouseLeave: leave,
      style: {
        display: "inline-flex",
        transform: "scale(.72)",
        transformOrigin: "left center",
        marginRight: -8
      }
    }, /*#__PURE__*/React.createElement(PL.MopIcon, {
      state: PL_TONE[v].mop,
      onClick: () => {
        stay();
        setOpen(c.who);
      },
      label: `Slop Mop: ${PL_TONE[v].word}`
    }))), /*#__PURE__*/React.createElement("span", null, c.text), open === c.who && /*#__PURE__*/React.createElement("div", {
      onMouseEnter: stay,
      onMouseLeave: leave,
      style: {
        position: "absolute",
        left: 6,
        top: 30,
        zIndex: 6
      }
    }, /*#__PURE__*/React.createElement(PL.WhyCard, {
      verdict: v,
      score: c.n,
      mode: hide ? "hide" : "highlight",
      tells: CM_TELLS[c.n],
      humanVoice: v === "fine" ? 0.78 : 0.18,
      usefulness: v === "fine" ? 0.7 : 0.08,
      readerResponse: v === "fine" ? 0.42 : 0.1,
      community: v === "likely" ? {
        no: 0,
        maybe: 1,
        probably: 4
      } : null,
      checksToday: {
        used: 138,
        limit: 250
      },
      onVote: () => {}
    })));
  }));
}

/* 6 — Reviews: word always visible, plus a summary that can hide the slop reviews. */
function Reviews() {
  const rs = [{
    stars: 5,
    title: "Absolutely transformative experience!",
    text: "This product exceeded all my expectations. A must-have for anyone looking to elevate their daily routine. Highly recommend!",
    n: 76
  }, {
    stars: 3,
    title: "Fine, but the lid leaks",
    text: "Keeps coffee hot for about four hours, not the eight on the box. The lid drips if you tilt it past 45°.",
    n: 8
  }, {
    stars: 5,
    title: "Game changer!!",
    text: "Love it love it love it. Best purchase ever, you won't regret it.",
    n: 71
  }];
  const [hide, setHide] = React.useState(false);
  const [open, setOpen] = React.useState(null);
  const hideT = React.useRef(null);
  React.useEffect(() => () => clearTimeout(hideT.current), []);
  const stay = () => clearTimeout(hideT.current);
  const leave = () => {
    clearTimeout(hideT.current);
    hideT.current = setTimeout(() => setOpen(null), 180);
  };
  const RV_TELLS = {
    76: {
      hypeMarketing: 0.81,
      emptyEvaluation: 0.72,
      tradeoffFreePromises: 0.44
    },
    8: {
      formalHedging: 0.06
    },
    71: {
      engagementBait: 0.58,
      emptyEvaluation: 0.66,
      hypeMarketing: 0.5
    }
  };
  const slop = rs.filter(r => plVerdict(r.n) === "likely").length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...plSx.host,
      padding: 16,
      display: "grid",
      gap: 14,
      font: "14px/1.45 Arial, sans-serif",
      color: "#0F1111"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 10px",
      borderRadius: 6,
      background: "var(--paper-100)",
      font: "var(--weight-regular) 13px/1.3 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", null, slop, " of ", rs.length), " reviews read like slop"), /*#__PURE__*/React.createElement(PL.Switch, {
    checked: hide,
    onChange: setHide,
    style: {
      marginLeft: "auto"
    },
    "aria-label": "Hide slop reviews"
  }), /*#__PURE__*/React.createElement(PL.MopMark, {
    size: 16,
    knockout: "var(--paper-100)",
    style: {
      color: "var(--ink-900)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-medium) 12px/1 var(--font-body)",
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, "Hide them")), rs.filter(r => !(hide && plVerdict(r.n) === "likely")).map(r => /*#__PURE__*/React.createElement("div", {
    key: r.title,
    style: {
      position: "relative",
      display: "grid",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    onMouseEnter: stay,
    onMouseLeave: leave,
    style: {
      display: "inline-flex",
      transform: "scale(.72)",
      transformOrigin: "left center",
      marginRight: -8
    }
  }, /*#__PURE__*/React.createElement(PL.MopIcon, {
    state: PL_TONE[plVerdict(r.n)].mop,
    onClick: () => {
      stay();
      setOpen(r.title);
    },
    label: `Slop Mop: ${PL_TONE[plVerdict(r.n)].word}`
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#DE7921",
      letterSpacing: 1
    }
  }, "★".repeat(r.stars), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#DDD"
    }
  }, "★".repeat(5 - r.stars))), /*#__PURE__*/React.createElement("b", null, r.title)), /*#__PURE__*/React.createElement("span", null, r.text), open === r.title && /*#__PURE__*/React.createElement("div", {
    onMouseEnter: stay,
    onMouseLeave: leave,
    style: {
      position: "absolute",
      left: -4,
      top: 28,
      zIndex: 6
    }
  }, /*#__PURE__*/React.createElement(PL.WhyCard, {
    verdict: plVerdict(r.n),
    score: r.n,
    mode: "highlight",
    tells: RV_TELLS[r.n],
    humanVoice: r.n < 40 ? 0.82 : 0.14,
    usefulness: r.n < 40 ? 0.88 : 0.06,
    readerResponse: r.n < 40 ? 0.5 : 0.12,
    community: r.n >= 70 ? {
      no: 1,
      maybe: 1,
      probably: 5
    } : null,
    checksToday: {
      used: 138,
      limit: 250
    },
    onVote: () => {}
  })))));
}

/* 7 — Social feeds (X, Reddit, Facebook): exactly the LinkedIn treatment. */
function SocialFeed() {
  const [open, setOpen] = React.useState(false);
  const hideT = React.useRef(null);
  React.useEffect(() => () => clearTimeout(hideT.current), []);
  const stay = () => clearTimeout(hideT.current);
  const leave = () => {
    clearTimeout(hideT.current);
    hideT.current = setTimeout(() => setOpen(false), 180);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...plSx.host,
      position: "relative",
      padding: "12px 14px",
      font: "15px/1.4 var(--font-body)",
      color: "#0F1419"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: "#E8E6E1"
    }
  }), /*#__PURE__*/React.createElement("b", null, "Growth Guru"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#536471"
    }
  }, "@growthguru \xB7 2h"), /*#__PURE__*/React.createElement("span", {
    onMouseEnter: stay,
    onMouseLeave: leave,
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(PL.MopIcon, {
    state: "yellow",
    onClick: () => {
      stay();
      setOpen(true);
    }
  }))), "Unpopular opinion: consistency beats talent. Every. Single. Time. \uD83E\uDDF5\uD83D\uDC47", open && /*#__PURE__*/React.createElement("div", {
    onMouseEnter: stay,
    onMouseLeave: leave,
    style: {
      position: "absolute",
      right: 8,
      top: 48,
      zIndex: 6
    }
  }, /*#__PURE__*/React.createElement(PL.WhyCard, {
    verdict: "possibly",
    score: 56,
    mode: "hide",
    tells: {
      formulaicHook: 0.74,
      engagementBait: 0.58,
      contrastFraming: 0.32
    },
    humanVoice: 0.4,
    usefulness: 0.22,
    readerResponse: 0.46,
    community: {
      no: 3,
      maybe: 4,
      probably: 2
    },
    checksToday: {
      used: 138,
      limit: 250
    },
    onVote: () => {}
  }))), /*#__PURE__*/React.createElement(PL.FoldStrip, {
    tone: "red",
    density: "minimal"
  }));
}

/* 8 — Inbox (Phase 3): row mop in the list, chip when opened, check-before-send on compose. */
function Inbox() {
  const rows = [["Northbeam Labs", "🚀 Unlock your team's full potential this quarter", 86], ["Priya Raman", "Re: fraud check latency numbers", 10], ["The Weekly Leader", "5 things top performers never say", 63]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...plSx.host,
      overflow: "hidden",
      font: "14px/1.3 Arial, sans-serif",
      color: "#202124"
    }
  }, rows.map(([f, s, n], i) => {
    const v = plVerdict(n);
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        display: "grid",
        gridTemplateColumns: "150px minmax(0,1fr)",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderTop: i ? "1px solid #EEE" : 0,
        background: v === "likely" ? "#FBFBFA" : "#fff"
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontWeight: v === "likely" ? 400 : 700,
        color: v === "likely" ? "#5F6368" : "#202124"
      }
    }, f), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "none",
        width: 23,
        height: 23,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        transform: "scale(.72)",
        transformOrigin: "0 0"
      }
    }, /*#__PURE__*/React.createElement(PL.MopIcon, {
      state: PL_TONE[v].mop,
      label: `Slop Mop: ${PL_TONE[v].word}`
    }))), /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: v === "likely" ? "#5F6368" : "#202124"
      }
    }, s)));
  }));
}
Object.assign(window, {
  Case,
  SearchResults,
  SitePopupHead,
  Article,
  ArticleList,
  Comments,
  Reviews,
  SocialFeed,
  Inbox
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/placements/Placements.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/HeroGraphic.jsx
try { (() => {
/* The slopmop.lol hero graphic: a LinkedIn feed mid-mop. Slop folds away, a borderline post keeps its yellow mop with the
   details panel open, and a plain useful post survives untouched — the "bad writing, not AI" promise, shown not told. */
const heroSM = window.SlopMopDesignSystem_ca9143;
function HeroPost({
  author,
  title,
  body,
  mop,
  stats
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: "#fff",
      border: "1px solid #E0DFDC",
      borderRadius: 8,
      padding: "12px 14px 8px",
      font: "var(--type-body-sm)",
      color: "#1B1B18"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "#E8E6E1",
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: 1,
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, author), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#5E5D59",
      fontSize: 12,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, title)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      alignSelf: "flex-start"
    }
  }, mop, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 32,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#5E5D59",
      fontWeight: 700,
      letterSpacing: 1
    }
  }, "\xB7\xB7\xB7"))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 8px",
      whiteSpace: "pre-line",
      lineHeight: 1.45,
      textWrap: "pretty"
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      paddingTop: 6,
      borderTop: "1px solid #EFEEEB",
      color: "#5E5D59",
      fontSize: 12
    }
  }, stats));
}
const HERO_W = 540,
  HERO_H = 940;
function HeroGraphic({
  style
}) {
  const ref = React.useRef(null);
  const [k, setK] = React.useState(1);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setK(Math.min(1, el.clientWidth / HERO_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const strip = (tone, k) => /*#__PURE__*/React.createElement(heroSM.FoldStrip, {
    key: k,
    tone: tone,
    density: "minimal",
    label: "This post was hidden"
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      width: "100%",
      maxWidth: HERO_W,
      height: HERO_H * k,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: HERO_W,
      height: HERO_H,
      transform: `scale(${k})`,
      transformOrigin: "top left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 380,
      background: "#F4F2EE",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-5)",
      display: "grid",
      gap: "var(--space-3)",
      boxSizing: "border-box",
      boxShadow: "0 24px 64px rgba(0,0,0,.45)"
    }
  }, /*#__PURE__*/React.createElement(HeroPost, {
    author: "Priya Raman",
    title: "Staff engineer, payments",
    body: "We shaved 400ms off checkout by moving the fraud check off the critical path. Took three weeks, two of them arguing about it.",
    mop: /*#__PURE__*/React.createElement(heroSM.MopIcon, {
      state: "unchecked"
    }),
    stats: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "88 reactions"), /*#__PURE__*/React.createElement("span", null, "14 comments"))
  }), strip("red", "a"), /*#__PURE__*/React.createElement(HeroPost, {
    author: "Marcus Bell",
    title: "Helping B2B leaders unlock growth",
    body: "Most teams don't have a strategy problem. They have a clarity problem.\n\nComment YES if this resonates.",
    mop: /*#__PURE__*/React.createElement(heroSM.MopIcon, {
      state: "yellow",
      hover: true
    }),
    stats: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "1,204 reactions"), /*#__PURE__*/React.createElement("span", null, "240 comments"))
  }), strip("red", "c"), strip("yellow", "d"), strip("red", "e"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--ink-500)",
      textAlign: "center",
      paddingTop: "var(--space-1)"
    }
  }, "14 posts scanned \xB7 9 folded \xB7 5 left to read")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 286,
      right: 0,
      transform: "scale(.8)",
      transformOrigin: "top right",
      boxShadow: "0 24px 64px rgba(0,0,0,.45)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement(heroSM.WhyCard, {
    verdict: "possibly",
    score: 61,
    mode: "hide",
    interactive: true,
    vote: null,
    onVote: () => {},
    tells: {
      emptyEvaluation: 0.74,
      engagementBait: 0.68,
      contrastFraming: 0.52,
      formulaicHook: 0.4
    },
    humanVoice: 0.21,
    usefulness: 0.09,
    readerResponse: 0.71,
    community: {
      probably: 9,
      maybe: 4,
      no: 1
    },
    checksToday: {
      used: 41,
      limit: 250
    }
  }))));
}
Object.assign(window, {
  HeroGraphic,
  HeroPost
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/HeroGraphic.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/Sections.jsx
try { (() => {
const SM = window.SlopMopDesignSystem_ca9143;
const siteSx = {
  wrap: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "0 var(--space-9)"
  },
  kicker: {
    font: "var(--weight-bold) 11px/1.2 var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--text-faint)"
  },
  h2: {
    margin: 0,
    font: "var(--weight-bold) var(--text-3xl)/1.1 var(--font-display)",
    letterSpacing: "var(--tracking-tight)"
  },
  lede: {
    margin: 0,
    font: "var(--type-body)",
    fontSize: "var(--text-lg)",
    color: "var(--text-muted)",
    maxWidth: "58ch"
  },
  body: {
    margin: 0,
    font: "var(--type-body)",
    color: "var(--text-muted)",
    maxWidth: "var(--site-measure)"
  },
  section: {
    padding: "var(--space-12) 0",
    borderBottom: "1px solid var(--border-hairline)"
  },
  link: {
    font: "var(--type-ui)",
    textDecoration: "none",
    color: "var(--text-muted)"
  }
};
function Nav() {
  const links = [["#how", "How it works"], ["#modes", "Modes"], ["#jev", "Why it's free"], ["#faq", "FAQ"], ["#install", "Install"], ["#", "Help"], ["#", "About"]];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...siteSx.wrap,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-7)",
      height: 60
    }
  }, /*#__PURE__*/React.createElement(SM.Wordmark, {
    size: 19
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-7)",
      flexWrap: "wrap"
    }
  }, links.map(([h, l]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: h,
    style: siteSx.link
  }, l)), /*#__PURE__*/React.createElement(SM.Button, {
    size: "sm",
    variant: "primary",
    icon: "download"
  }, "Add to browser"))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--ink-900)",
      color: "var(--paper-000)",
      padding: "var(--space-12) 0",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...siteSx.wrap,
      display: "grid",
      gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)",
      gap: "var(--space-10)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--text-5xl)/1.03 var(--font-display)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "LinkedIn is filling up with slop. Bring a mop."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      fontSize: "var(--text-lg)",
      color: "var(--ink-300)",
      maxWidth: "50ch"
    }
  }, "Everyone is posting more to be seen. AI makes posting even easier. That's a lot more to sift through for the few posts worth reading. Slop Mop scores each post before you reach it and folds the mess away before you step in it."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      color: "var(--paper-000)"
    }
  }, /*#__PURE__*/React.createElement("b", null, "A bad-writing detector, not an AI detector."), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-300)"
    }
  }, "Useful posts survive the mop however they were drafted.")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SM.Button, {
    variant: "primary",
    size: "lg",
    icon: "download"
  }, "Add to browser \u2014 free"), /*#__PURE__*/React.createElement("a", {
    href: "#email",
    style: {
      ...siteSx.link,
      color: "var(--ink-300)",
      textDecoration: "underline",
      textUnderlineOffset: 3
    }
  }, "Get the monthly stats instead")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--ink-400)"
    }
  }, "desktop Chrome-compatible extension \xB7 judged by Jev \xB7 LinkedIn only, for now")), /*#__PURE__*/React.createElement(window.HeroGraphic, null)));
}
function WhyExists() {
  return /*#__PURE__*/React.createElement("section", {
    style: siteSx.section
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...siteSx.wrap,
      display: "grid",
      gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)",
      gap: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: siteSx.h2
  }, "Why this exists"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: siteSx.lede
  }, "I wanted to try out Jev, a new type of AI model whose focus is decision probability, on a real pain point in my immediate circle: the slop problem on LinkedIn. The judgement criteria are built on Graphite's ", /*#__PURE__*/React.createElement("a", {
    href: "https://graphite.io/five-percent/research/ai-tells"
  }, "AI tells research"), " rather than on a detector score."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...siteSx.body,
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement("b", null, "Slop Mop targets bad writing, not AI assistance."), " A post judged useful to readers is shielded even when it reads like a template."))));
}
function Step({
  n,
  title,
  chip,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start",
      padding: "var(--space-7)",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      ...siteSx.kicker,
      padding: "3px 7px",
      borderRadius: 3,
      background: "var(--paper-200)",
      color: "var(--text-muted)"
    }
  }, chip)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)",
      fontSize: "var(--text-lg)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, children));
}
function How() {
  return /*#__PURE__*/React.createElement("section", {
    id: "how",
    style: {
      ...siteSx.section,
      background: "var(--paper-100)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...siteSx.wrap,
      display: "grid",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: siteSx.h2
  }, "How it works"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Step, {
    n: "01",
    chip: "ahead of the viewport",
    title: "Reads ahead"
  }, "Posts are pulled before they reach your view, and Jev's speed means the verdict is ready by the time you see them."), /*#__PURE__*/React.createElement(Step, {
    n: "02",
    chip: "12 answers \u2192 1 score",
    title: "Asks Jev"
  }, "Twelve questions go out in parallel: nine writing signs, two counter-signals \u2014 does it sound like a person, is it useful to readers \u2014 and one tiebreaker."), /*#__PURE__*/React.createElement(Step, {
    n: "03",
    chip: "fold or flag",
    title: "Folds or flags"
  }, "Past your threshold a post folds into a compact strip, or its mop turns yellow or red in Highlight mode. Hover either for the full breakdown."), /*#__PURE__*/React.createElement(Step, {
    n: "04",
    chip: "no \xB7 maybe \xB7 probably",
    title: "Takes your vote"
  }, "The mop sits beside the post's \"\u2026\" menu. Vote No, Maybe or Probably: your call beats Jev's on your feed and counts anonymously toward the research.")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      ...siteSx.link,
      color: "var(--text-link)"
    }
  }, "See more: the Slopprint, the three bars and how the score adds up \u2192")));
}
Object.assign(window, {
  Nav,
  Hero,
  WhyExists,
  How,
  siteSx
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/Sections2.jsx
try { (() => {
const SM2 = window.SlopMopDesignSystem_ca9143;
const sx2 = () => window.siteSx;
const DEMO_ZONES = {
  mild: {
    possibly: 67,
    likely: 88
  },
  moderate: {
    possibly: 40,
    likely: 70
  },
  aggressive: {
    possibly: 29,
    likely: 49
  }
};
const DEMO_POSTS = [{
  id: "a",
  who: "Sample post",
  age: "3h · edited",
  score: 82,
  body: "Most founders won't like this.\n\nI turned down a seven-figure acquisition offer at 24.\n\nIt wasn't just about the money — it was about the mission. Agree? 🚀",
  tells: {
    formulaicHook: 0.88,
    engagementBait: 0.8,
    contrastFraming: 0.74,
    manufacturedNarrative: 0.6
  },
  humanVoice: 0.2,
  usefulness: 0.05,
  readerResponse: 0.3,
  community: {
    no: 1,
    maybe: 2,
    probably: 11
  }
}, {
  id: "b",
  who: "Borderline post",
  age: "7h",
  score: 45,
  body: "Spent the weekend rewriting our onboarding email. Open rate moved from 31% to 44%.\n\nFurthermore, the shorter version may provide a better experience for people landing in the product for the first time.",
  tells: {
    formalHedging: 0.71,
    emptyEvaluation: 0.32
  },
  humanVoice: 0.55,
  usefulness: 0.62,
  readerResponse: 0.2,
  community: null
}];
const DEMO_TINT = {
  no: "blue",
  maybe: "yellow",
  probably: "red"
};
const demoVerdict = (p, z) => p.score >= z.likely ? "likely" : p.score >= z.possibly ? "possibly" : "fine";

/** Two modes, three levels — the live demo. Same rules as the extension. */
function Modes() {
  const [mode, setMode] = React.useState("hide");
  const [sens, setSens] = React.useState("moderate");
  const [open, setOpen] = React.useState(null);
  const [votes, setVotes] = React.useState({});
  const [restored, setRestored] = React.useState({});
  const z = DEMO_ZONES[sens];
  const vs = DEMO_POSTS.map(p => demoVerdict(p, z));
  const hidden = DEMO_POSTS.filter((p, i) => mode === "hide" && !restored[p.id] && (votes[p.id] ? votes[p.id] === "probably" : vs[i] === "likely"));
  const outcome = mode === "hide" ? `${hidden.length} of 2 folded` : `${vs.filter(v => v !== "fine").length} of 2 flagged`;
  const reset = () => {
    setRestored({});
    setOpen(null);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "modes",
    style: sx2().section
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sx2().wrap,
      display: "grid",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: sx2().h2
  }, "Two modes, three levels"), /*#__PURE__*/React.createElement("p", {
    style: sx2().lede
  }, "Pick how much you want to see, then how far the judgement goes. Try both on the two posts below: click a post's mop for what Jev noticed, and vote when it gets you wrong.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)",
      fontSize: "var(--text-lg)"
    }
  }, "Hide"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...sx2().body,
      font: "var(--type-body-sm)"
    }
  }, "The post folds into a strip. \"Show post\" unfolds it in place \u2014 nothing is deleted, muted, blocked or reported.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)",
      fontSize: "var(--text-lg)"
    }
  }, "Highlight"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...sx2().body,
      font: "var(--type-body-sm)"
    }
  }, "The post stays exactly where it is. Its mop turns yellow for possibly slop and red for likely slop, and every verdict carries a word."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "300px minmax(0,1fr)",
      gap: "var(--space-9)",
      alignItems: "start",
      padding: "var(--space-8)",
      borderRadius: "var(--radius-lg)",
      background: "#F4F2EE"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)",
      position: "sticky",
      top: 84
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...sx2().kicker,
      color: "var(--red-700)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--red-500)"
    }
  }), "Live \u2014 the posts respond"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: sx2().kicker
  }, "Mode"), /*#__PURE__*/React.createElement(SM2.SegmentedControl, {
    value: mode,
    onChange: v => {
      setMode(v);
      reset();
    },
    options: [{
      value: "hide",
      label: "Hide posts"
    }, {
      value: "highlight",
      label: "Highlight only"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: sx2().kicker
  }, "Sensitivity"), /*#__PURE__*/React.createElement(SM2.SensitivityToggle, {
    value: sens,
    onChange: v => {
      setSens(v);
      reset();
    },
    showThreshold: false
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--weight-semibold) 15px/1.4 var(--font-body)"
    }
  }, mode === "hide" ? "Hide" : "Highlight", " + ", sens[0].toUpperCase() + sens.slice(1), " = ", outcome)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      minWidth: 0
    }
  }, DEMO_POSTS.map((p, i) => {
    const v = vs[i],
      vote = votes[p.id];
    if (hidden.includes(p)) return /*#__PURE__*/React.createElement(SM2.FoldStrip, {
      key: p.id,
      tone: vote === "maybe" ? "yellow" : "red",
      density: "compact",
      stats: {
        today: 9,
        week: 61,
        month: 240,
        total: 1803
      },
      onRestore: () => setRestored({
        ...restored,
        [p.id]: true
      })
    });
    const tint = vote ? DEMO_TINT[vote] : v === "likely" ? "red" : v === "possibly" ? "yellow" : "unchecked";
    const isOpen = open === p.id;
    return /*#__PURE__*/React.createElement("article", {
      key: p.id,
      style: {
        position: "relative",
        background: "#fff",
        border: "1px solid #E0DFDC",
        borderRadius: 8,
        padding: "14px 16px",
        font: "var(--type-body-sm)",
        color: "#1B1B18"
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#E8E6E1"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("b", null, p.who), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#5E5D59",
        fontSize: 12
      }
    }, p.age)), /*#__PURE__*/React.createElement(SM2.MopIcon, {
      state: tint,
      onClick: () => setOpen(isOpen ? null : p.id)
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#5E5D59",
        fontWeight: 700,
        letterSpacing: 1
      }
    }, "\xB7\xB7\xB7")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        whiteSpace: "pre-line",
        lineHeight: 1.5
      }
    }, p.body), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 50,
        right: 8,
        zIndex: 10
      }
    }, /*#__PURE__*/React.createElement(SM2.WhyCard, {
      verdict: v,
      score: p.score,
      mode: mode,
      tells: p.tells,
      humanVoice: p.humanVoice,
      usefulness: p.usefulness,
      readerResponse: p.readerResponse,
      possibly: z.possibly,
      likely: z.likely,
      community: p.community,
      checksToday: {
        used: 41,
        limit: 250
      },
      vote: vote || null,
      onVote: x => setVotes({
        ...votes,
        [p.id]: x
      })
    })));
  })))));
}
const SIGNS = [["Scroll-stopper", "one line, then a gap"], ["Engagement bait", "“agree?”, “comment yes”"], ["Hype words", "“unlock”, “paradigm shift”"], ["Empty praise", "“meaningful”, no detail"], ["No-catch promises", "“without sacrificing anything”"], ["“Not X, but Y”", "definition by contrast"], ["Flowery prose", "flourish over directness"], ["Stiff phrasing", "“furthermore”, “may provide”"], ["Too-tidy story", "anecdote to neat lesson"]];
function Free() {
  const facts = [["Twelve questions, one call", "Nine writing signs, two counter-signals and a tiebreaker, asked in parallel against the post text and its public engagement counts."], ["One slop score", "The answers are weighted into one score out of 100 and compared with your threshold. When Jev isn't confident, the post is left alone."], ["Usefulness shield", "A post judged genuinely useful, or that readers genuinely engaged with, has a large share taken off its score. It's finding bad writing, not just bad AI writing."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "jev",
    style: {
      ...sx2().section,
      background: "var(--paper-100)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sx2().wrap,
      display: "grid",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: sx2().h2
  }, "Why it's free"), /*#__PURE__*/React.createElement("p", {
    style: sx2().lede
  }, "The judging runs on ", /*#__PURE__*/React.createElement("a", {
    href: "https://typesafe.ai"
  }, "Jev"), ", used as a programming primitive rather than a chat call: a question, a definition, and a decision back. No account, no API key, no per-post cost to pass on to you.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "var(--space-7)"
    }
  }, facts.map(([t, b]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "grid",
      gap: "var(--space-3)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)",
      fontSize: "var(--text-lg)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      padding: "var(--space-8)",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...sx2().kicker,
      color: "var(--text-body)"
    }
  }, "The nine signs"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "0 var(--space-8)"
    }
  }, SIGNS.map(([n, e]) => /*#__PURE__*/React.createElement("li", {
    key: n,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      padding: "var(--space-4) 0",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-4)",
      font: "var(--type-ui)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: "var(--mop-500)"
    }
  }), n), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)",
      textAlign: "right"
    }
  }, e)))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, "Three more protect good content \u2014 ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--blue-700)"
    }
  }, "sounds like a person"), ", ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--blue-700)"
    }
  }, "useful to readers"), " and ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--blue-700)"
    }
  }, "reader response"), ". All three can only lower the score."))));
}
function Install() {
  const steps = [["Download and unzip", "Grab the .zip and unzip it somewhere you won't delete by accident — Chrome reads the folder every time it starts, so Downloads is a bad home for it."], ["Open the extensions page", "Paste chrome://extensions into the address bar, then turn on Developer mode with the toggle in the top right."], ["Load unpacked", "Click Load unpacked and select the unzipped folder — the one containing manifest.json, not its parent."], ["Open LinkedIn", "Reload any open LinkedIn tab. The mop appears in your toolbar; pin it to reach the modes and sensitivity quickly."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "install",
    style: sx2().section
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sx2().wrap,
      display: "grid",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(SM2.Badge, {
    tone: "warn"
  }, "Store listing in review"), /*#__PURE__*/React.createElement("h2", {
    style: sx2().h2
  }, "Installing it before the store does"), /*#__PURE__*/React.createElement("p", {
    style: sx2().lede
  }, "The Chrome Web Store listing takes anywhere from a few days to a few weeks. Rather than sit on a finished extension, here it is as a .zip \u2014 the same mechanism every extension developer uses daily.")), /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "var(--space-5)"
    }
  }, steps.map(([t, b], i) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start",
      padding: "var(--space-7)",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--ink-900)",
      color: "var(--paper-000)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      font: "var(--weight-bold) 13px/1 var(--font-body)"
    }
  }, i + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, b)))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SM2.Button, {
    variant: "primary",
    size: "lg",
    icon: "download"
  }, "Download Slop Mop \u2014 free"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "slopmop-extension-0.2.7.zip")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
      gap: "var(--space-7)",
      paddingTop: "var(--space-7)",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, "\"Disable developer mode extensions\""), " \u2014 Chrome shows this on startup for any unpacked extension. Dismissing it leaves Slop Mop running. It stops once you install from the store."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)"
    }
  }, "\"Read and change your data on linkedin.com\""), " \u2014 that is the whole permission, the minimum needed to read post text and draw over the feed."))));
}
function Email() {
  const [v, setV] = React.useState("");
  const [done, setDone] = React.useState(false);
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  return /*#__PURE__*/React.createElement("section", {
    id: "email",
    style: {
      ...sx2().section,
      background: "var(--ink-900)",
      color: "var(--paper-000)",
      borderBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sx2().wrap,
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
      gap: "var(--space-10)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sx2().h2,
      color: "var(--paper-000)"
    }
  }, "See what the whole set looks like"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...sx2().lede,
      color: "var(--ink-300)"
    }
  }, "How often each sign fires, what share of a feed folds at each level, and how often the community disagrees with the score. Roughly once a month.")), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)",
      fontSize: "var(--text-lg)"
    }
  }, "You're on the list."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--ink-300)",
      font: "var(--type-body-sm)"
    }
  }, "The first set of numbers goes out at the end of the month.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: v,
    onChange: e => setV(e.target.value),
    placeholder: "you@example.com",
    "aria-label": "Email",
    style: {
      flex: 1,
      minWidth: 0,
      height: 44,
      padding: "0 var(--space-5)",
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${v.length > 3 && !ok ? "var(--red-500)" : "var(--ink-600)"}`,
      background: "var(--ink-800)",
      color: "var(--paper-000)",
      font: "var(--type-body)",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement(SM2.Button, {
    variant: "primary",
    size: "lg",
    disabled: !ok,
    onClick: () => setDone(true)
  }, "Send me the stats")), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--ink-400)"
    }
  }, "optional \xB7 one email a month \xB7 unsubscribe in one click"))));
}
const FAQS = [["What is Slop Mop?", "A Chrome extension that helps reduce low-value writing in your LinkedIn feed. It reads posts before they reach your view, asks Jev twelve questions about the writing, and gives each post a score out of 100. Likely slop folds into a strip, or its mop turns red. Nothing is deleted from LinkedIn — think of it as a spam filter for writing that makes you sigh."], ["Is Slop Mop an AI-content detector?", "No. It's designed to identify low-value writing rather than decide whether a human or AI produced it. AI-assisted writing can be excellent; human-written posts can be spectacular slop. Slop Mop asks a more useful question: is this worth your attention?"], ["How does it decide whether a post is slop?", "Nine questions look for writing signs associated with slop. Two counter-signals ask whether it sounds like a person and whether it's useful to readers, and reader response shields posts people genuinely engaged with. Click any post's mop to see exactly what it noticed."], ["Does it block, delete, mute or report posts?", "No. It changes only what you see in your browser. In Hide mode a post folds into a strip you can reopen; in Highlight mode it stays put and its mop changes color. Slop Mop makes recommendations. You make the call."], ["What happens when it gets a post wrong?", "Tell it. Every post has a mop beside its menu: vote No, Maybe or Probably. Your vote overrides Jev for what you see, and counts anonymously toward the research."], ["What does it keep?", "No post content — only a one-way hash of the text. No author names. Votes are tied to a salted hash of a random install id, never your name or account."]];
function Faq() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    style: sx2().section
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sx2().wrap,
      display: "grid",
      gridTemplateColumns: "minmax(0,0.75fr) minmax(0,1.25fr)",
      gap: "var(--space-10)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: sx2().h2
  }, "Questions? We've mopped up a few."), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-hairline)"
    }
  }, FAQS.map(([q, a], i) => /*#__PURE__*/React.createElement("div", {
    key: q,
    style: {
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-expanded": open === i,
    onClick: () => setOpen(open === i ? -1 : i),
    style: {
      all: "unset",
      cursor: "pointer",
      boxSizing: "border-box",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-5)",
      padding: "var(--space-6) 0",
      font: "var(--type-heading)",
      fontSize: "var(--text-lg)"
    }
  }, q, /*#__PURE__*/React.createElement(SM2.Icon, {
    name: "chevron-down",
    size: 18,
    style: {
      color: "var(--text-faint)",
      transform: open === i ? "rotate(180deg)" : "none",
      transition: "transform var(--dur-base) var(--ease-standard)"
    }
  })), open === i && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 var(--space-6)",
      font: "var(--type-body)",
      color: "var(--text-muted)",
      maxWidth: "62ch"
    }
  }, a))))));
}
function Footer() {
  const links = ["Home", "How it works", "About", "Help", "Privacy policy", "LinkedIn"];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "var(--space-9) 0",
      background: "var(--paper-100)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sx2().wrap,
      display: "grid",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SM2.Wordmark, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: sx2().link
  }, l)))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "made by Tom Frazier \xB7 hello@slopmop.lol \xB7 not affiliated with LinkedIn \xB7 signs derived from Graphite's AI tells research \xB7 judging by Typesafe Jev")));
}
Object.assign(window, {
  Modes,
  Free,
  Install,
  Email,
  Faq,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/Sections2.jsx", error: String((e && e.message) || e) }); }

__ds_ns.SignUpCard = __ds_scope.SignUpCard;

__ds_ns.UpgradePrompt = __ds_scope.UpgradePrompt;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.SensitivitySlider = __ds_scope.SensitivitySlider;

__ds_ns.SENSITIVITY_STOPS = __ds_scope.SENSITIVITY_STOPS;

__ds_ns.SensitivityToggle = __ds_scope.SensitivityToggle;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GLYPHS = __ds_scope.GLYPHS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.MopIcon = __ds_scope.MopIcon;

__ds_ns.MopMark = __ds_scope.MopMark;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.FoldStrip = __ds_scope.FoldStrip;

__ds_ns.HighlightFrame = __ds_scope.HighlightFrame;

__ds_ns.NOTICES = __ds_scope.NOTICES;

__ds_ns.NoticePanel = __ds_scope.NoticePanel;

__ds_ns.ScoreZones = __ds_scope.ScoreZones;

__ds_ns.Slopprint = __ds_scope.Slopprint;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.VoteControl = __ds_scope.VoteControl;

__ds_ns.OUTCOMES = __ds_scope.OUTCOMES;

__ds_ns.WhyCard = __ds_scope.WhyCard;

__ds_ns.TONE = __ds_scope.TONE;

__ds_ns.VERDICTS = __ds_scope.VERDICTS;

__ds_ns.VOTE_TONE = __ds_scope.VOTE_TONE;

__ds_ns.VOTE_NAME = __ds_scope.VOTE_NAME;

__ds_ns.TELLS = __ds_scope.TELLS;

})();
