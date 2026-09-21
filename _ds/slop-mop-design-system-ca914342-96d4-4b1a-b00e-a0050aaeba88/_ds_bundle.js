/* @ds-bundle: {"format":4,"namespace":"SlopMopDesignSystem_ca9143","components":[{"name":"Checkbox","sourcePath":"components/controls/Checkbox.jsx"},{"name":"SegmentedControl","sourcePath":"components/controls/SegmentedControl.jsx"},{"name":"SensitivitySlider","sourcePath":"components/controls/SensitivitySlider.jsx"},{"name":"Switch","sourcePath":"components/controls/Switch.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"GLYPHS","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"MopMark","sourcePath":"components/core/MopMark.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"FoldStrip","sourcePath":"components/verdict/FoldStrip.jsx"},{"name":"HighlightFrame","sourcePath":"components/verdict/HighlightFrame.jsx"},{"name":"StatTile","sourcePath":"components/verdict/StatTile.jsx"},{"name":"StatsDial","sourcePath":"components/verdict/StatsDial.jsx"},{"name":"WhyCard","sourcePath":"components/verdict/WhyCard.jsx"}],"sourceHashes":{"components/controls/Checkbox.jsx":"174bef180e17","components/controls/SegmentedControl.jsx":"dcc575c52623","components/controls/SensitivitySlider.jsx":"b42f9d20b713","components/controls/Switch.jsx":"5a4e505f0a0e","components/core/Badge.jsx":"fb91f60ee856","components/core/Button.jsx":"d2a4770a69af","components/core/Card.jsx":"d751de1a6a50","components/core/Icon.jsx":"0523e9f04b9b","components/core/IconButton.jsx":"6b5d747c0e69","components/core/MopMark.jsx":"ae1a6398d9d2","components/core/Wordmark.jsx":"22c2f8829842","components/verdict/FoldStrip.jsx":"0b67e0a635c5","components/verdict/HighlightFrame.jsx":"196176e18d53","components/verdict/StatTile.jsx":"f90d88398a20","components/verdict/StatsDial.jsx":"d9b1324cf22d","components/verdict/WhyCard.jsx":"b4a4ad8f83a6","ui_kits/extension/Onboarding.jsx":"2d08a82fdf5d","ui_kits/extension/Popup.jsx":"74bbe38ca933","ui_kits/feed/FeedItem.jsx":"81401a12946a","ui_kits/feed/posts.js":"3242a810b858","ui_kits/site/Sections.jsx":"c1abc4fa7f42"},"inlinedExternals":[],"unexposedExports":[]} */

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
      background: "var(--gradient-sensitivity)",
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

// components/core/MopMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The Slop Mop mark, exactly as supplied. Handle and head take `currentColor`;
 * the three bristle strokes take the surface colour behind the mark.
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
    stroke: knockout,
    strokeWidth: "1.15",
    strokeLinecap: "round"
  }));
}
Object.assign(__ds_scope, { MopMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MopMark.jsx", error: String((e && e.message) || e) }); }

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
/** The ~44px strip that replaces a hidden post in Hide mode. */
function FoldStrip({
  label = "This post was hidden",
  reasons = [],
  score,
  onRestore,
  restored,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--fold-height)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      padding: "0 var(--space-6)",
      borderRadius: "var(--radius-sm)",
      border: "var(--border-width) solid var(--border-hairline)",
      background: "var(--gradient-fold)",
      boxShadow: "var(--shadow-card)",
      cursor: "pointer",
      transition: "var(--transition-ui)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MopMark, {
    size: 18,
    knockout: "var(--paper-000)",
    style: {
      color: "var(--ink-400)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-ui)",
      color: "var(--text-body)"
    }
  }, label), reasons.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, reasons.slice(0, 2).join(" · ")), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-5)"
    }
  }, typeof score === "number" && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, score.toFixed(2)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRestore,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      height: 26,
      padding: "0 var(--space-5)",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer",
      transition: "var(--transition-ui)",
      border: "var(--border-width) solid var(--border-default)",
      background: hover ? "var(--paper-100)" : "var(--paper-000)",
      color: "var(--text-body)",
      font: "var(--type-label)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevrons-up-down",
    size: 13
  }), restored ? "Shown" : "Show post"))));
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
    text: "Some AI tells"
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

// components/verdict/StatsDial.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Half-moon dial: arc spans 0 → personal daily record; the dot is today. */
function StatsDial({
  today = 0,
  record = 1,
  size = 180,
  caption = "hidden today",
  style,
  ...rest
}) {
  const isRecord = today >= record && today > 0;
  const scale = Math.max(1, isRecord ? today : record);
  const t = Math.min(1, today / scale);
  const r = size / 2 - 14,
    cx = size / 2,
    cy = size / 2;
  const a = Math.PI * (1 - t);
  const dot = {
    x: cx + r * Math.cos(a),
    y: cy - r * Math.sin(a)
  };
  const arc = (from, to) => {
    const a0 = Math.PI * (1 - from),
      a1 = Math.PI * (1 - to);
    // The half-moon never spans more than 180°, so the large-arc flag is always 0.
    return `M ${cx + r * Math.cos(a0)} ${cy - r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy - r * Math.sin(a1)}`;
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "grid",
      justifyItems: "center",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size / 2 + 10,
    viewBox: `0 0 ${size} ${size / 2 + 10}`,
    role: "img",
    "aria-label": `${today} ${caption}, personal record ${Math.max(record, today)}`
  }, /*#__PURE__*/React.createElement("path", {
    d: arc(0, 1),
    fill: "none",
    stroke: "var(--paper-200)",
    strokeWidth: "8",
    strokeLinecap: "round"
  }), t > 0.002 && /*#__PURE__*/React.createElement("path", {
    d: arc(0, t),
    fill: "none",
    stroke: isRecord ? "var(--red-500)" : "var(--mop-500)",
    strokeWidth: "8",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: dot.x,
    cy: dot.y,
    r: "6",
    fill: "var(--paper-000)",
    stroke: isRecord ? "var(--red-500)" : "var(--mop-500)",
    strokeWidth: "2.5"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "calc(var(--space-5) * -1)",
      display: "grid",
      justifyItems: "center",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${Math.round(size * 0.22)}px/1 var(--font-display)`,
      letterSpacing: "var(--tracking-tight)",
      color: "var(--text-body)"
    }
  }, today), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      color: isRecord ? "var(--red-500)" : "var(--text-muted)"
    }
  }, isRecord ? "New record" : caption)));
}
Object.assign(__ds_scope, { StatsDial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/StatsDial.jsx", error: String((e && e.message) || e) }); }

// components/verdict/WhyCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hover explainer: the top tells plus the usefulness shield that offset them. */
function WhyCard({
  tells = [],
  shield = 0,
  score,
  verdict = "hidden",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: 268,
      padding: "var(--space-6)",
      background: "var(--surface-card)",
      color: "var(--text-body)",
      border: "var(--border-width) solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-pop)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-heading)"
    }
  }, "Why ", verdict), typeof score === "number" && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "score ", score.toFixed(2))), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: "var(--space-5)"
    }
  }, tells.map(t => /*#__PURE__*/React.createElement("li", {
    key: t.name,
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      font: "var(--type-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("span", null, t.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, t.value.toFixed(2))), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 4,
      borderRadius: 2,
      background: "var(--paper-200)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: "100%",
      width: `${Math.round(t.value * 100)}%`,
      background: "var(--mop-500)"
    }
  }))))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-5) 0 0",
      paddingTop: "var(--space-5)",
      borderTop: "1px solid var(--border-hairline)",
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "usefulness shield \u2212", shield.toFixed(2)));
}
Object.assign(__ds_scope, { WhyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/verdict/WhyCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/extension/Onboarding.jsx
try { (() => {
const {
  Wordmark,
  Button,
  Checkbox,
  Icon,
  Badge
} = window.SlopMopDesignSystem_ca9143;
function Point({
  icon,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("li", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 2,
      color: "var(--ink-900)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-heading)",
      fontSize: "var(--text-md)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 2,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, children)));
}
function Onboarding({
  ack,
  setAck,
  onContinue
}) {
  return /*#__PURE__*/React.createElement(window.PopupShell, {
    width: 380
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-7) var(--space-7) var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-5) 0 0",
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, "A few things to know before you turn this on.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-7)",
      display: "grid",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "warn"
  }, "Research purposes only"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Point, {
    icon: "send",
    title: "Post text leaves your browser"
  }, "The text of feed posts is sent to the Slop Mop server and on to TypeSafe's Jev to be classified. Author names are never sent."), /*#__PURE__*/React.createElement(Point, {
    icon: "database",
    title: "Nothing is stored"
  }, "The server keeps no post text and no answers. Request bodies are not logged."), /*#__PURE__*/React.createElement(Point, {
    icon: "user-round-check",
    title: "It judges writing, not people"
  }, "Slop Mop targets bad AI writing. Useful AI-assisted posts are shielded by engagement and usefulness.")), /*#__PURE__*/React.createElement(Checkbox, {
    checked: ack,
    onChange: setAck,
    label: "I understand, and I'm using this for research purposes only."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    disabled: !ack,
    onClick: onContinue,
    iconAfter: "arrow-right"
  }, "Turn on Slop Mop"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-mono)",
      color: "var(--text-faint)",
      textAlign: "center"
    }
  }, "reversible any time from the popup")));
}
window.Onboarding = Onboarding;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/extension/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/extension/Popup.jsx
try { (() => {
const {
  Wordmark,
  Switch,
  SegmentedControl,
  SensitivitySlider,
  StatsDial,
  StatTile,
  Badge,
  Button,
  IconButton,
  Icon,
  Card
} = window.SlopMopDesignSystem_ca9143;
function PopupShell({
  children,
  width = 360
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      background: "var(--surface-card)",
      border: "1px solid var(--border-hairline)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-raised)",
      overflow: "hidden"
    }
  }, children);
}
function PopupHeader({
  enabled,
  onSettings
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-5) var(--space-6)",
      borderBottom: "1px solid var(--border-hairline)",
      background: "var(--paper-100)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      filter: enabled ? "none" : "grayscale(1)",
      opacity: enabled ? 1 : 0.55
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 16
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: enabled ? "ink" : "neutral",
    mono: true
  }, enabled ? "on" : "off")), /*#__PURE__*/React.createElement(IconButton, {
    icon: "settings-2",
    label: "Settings",
    onClick: onSettings
  }));
}
function Row({
  label,
  children,
  hint
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      color: "var(--text-muted)"
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, hint)), children);
}
function Popup({
  state,
  set
}) {
  const {
    enabled,
    mode,
    sensitivity,
    today,
    record,
    flagged
  } = state;
  const dim = {
    opacity: enabled ? 1 : 0.45,
    pointerEvents: enabled ? "auto" : "none",
    transition: "opacity var(--dur-base) var(--ease-standard)"
  };
  return /*#__PURE__*/React.createElement(PopupShell, null, /*#__PURE__*/React.createElement(PopupHeader, {
    enabled: enabled
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      display: "grid",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    size: "lg",
    checked: enabled,
    onChange: v => set({
      enabled: v
    }),
    label: enabled ? "Mopping" : "Paused",
    description: enabled ? "New posts are scanned before you reach them" : "Folds opened, outlines removed"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-7)",
      ...dim
    }
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Mode"
  }, /*#__PURE__*/React.createElement(SegmentedControl, {
    value: mode,
    onChange: v => set({
      mode: v
    }),
    options: [{
      value: "hide",
      label: "Hide",
      icon: "eye-off"
    }, {
      value: "highlight",
      label: "Highlight",
      icon: "flag"
    }]
  })), /*#__PURE__*/React.createElement(Row, {
    label: "Sensitivity",
    hint: "applies instantly"
  }, /*#__PURE__*/React.createElement(SensitivitySlider, {
    value: sensitivity,
    onChange: v => set({
      sensitivity: v
    })
  })), /*#__PURE__*/React.createElement(Row, {
    label: mode === "hide" ? "Hidden today" : "Flagged today"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      justifyItems: "center",
      gap: "var(--space-5)",
      padding: "var(--space-5) 0 0",
      background: "var(--paper-100)",
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(StatsDial, {
    today: mode === "hide" ? today : flagged,
    record: record,
    size: 176,
    caption: mode === "hide" ? "hidden today" : "flagged today"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--space-2)",
      width: "100%",
      padding: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Week",
    value: "86"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Month",
    value: "341"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "All",
    value: "2.9k"
  }))))), /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      paddingTop: "var(--space-5)",
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 13
  }), " nothing stored"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "scroll-text",
    onClick: () => set({
      screen: "onboarding"
    })
  }, "Disclosure"))));
}
window.Popup = Popup;
window.PopupShell = PopupShell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/extension/Popup.jsx", error: String((e && e.message) || e) }); }

// ui_kits/feed/FeedItem.jsx
try { (() => {
const {
  Icon,
  Badge,
  FoldStrip,
  HighlightFrame,
  WhyCard
} = window.SlopMopDesignSystem_ca9143;

/* A deliberately plain stand-in for a LinkedIn feed post. Slop Mop never restyles
   the host post — it only wraps, outlines or replaces it. */
function FeedPost({
  post
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
      gap: 1
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
  }, post.age, " \xB7 \uD83C\uDF10"))), /*#__PURE__*/React.createElement("p", {
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
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC4D ", post.reactions), /*#__PURE__*/React.createElement("span", null, post.comments, " comments"), /*#__PURE__*/React.createElement("span", null, post.reposts, " reposts")));
}
function AnalyzingRow() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      height: 28,
      padding: "0 var(--space-5)",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-sunken)",
      border: "1px dashed var(--border-default)",
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "loader",
    size: 13
  }), " analysing 3 posts ahead of the viewport\u2026");
}
function FeedItem({
  post,
  mode,
  threshold,
  hovered,
  onHover,
  restored,
  onRestore
}) {
  const flagged = post.score >= threshold;
  const warn = post.score >= threshold * 0.6 && post.score < threshold;
  const showWhy = hovered === post.id && (flagged || warn);
  const why = /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: "calc(100% + 12px)",
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement(WhyCard, {
    verdict: mode === "hide" ? "hidden" : "flagged",
    score: post.score,
    shield: post.shield,
    tells: post.tells
  }));
  if (mode === "hide" && flagged && !restored) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      },
      onMouseEnter: () => onHover(post.id),
      onMouseLeave: () => onHover(null)
    }, /*#__PURE__*/React.createElement(FoldStrip, {
      score: post.score,
      reasons: post.tells.map(t => t.name.toLowerCase()),
      onRestore: onRestore
    }), showWhy && why);
  }
  const body = /*#__PURE__*/React.createElement(FeedPost, {
    post: post
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    },
    onMouseEnter: () => onHover(post.id),
    onMouseLeave: () => onHover(null)
  }, mode === "highlight" && (flagged || warn) ? /*#__PURE__*/React.createElement(HighlightFrame, {
    level: flagged ? "danger" : "warn"
  }, body) : body, restored && mode === "hide" && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: -10,
      left: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "Unfolded by you")), showWhy && mode === "highlight" && why);
}
window.FeedPost = FeedPost;
window.FeedItem = FeedItem;
window.AnalyzingRow = AnalyzingRow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/feed/FeedItem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/feed/posts.js
try { (() => {
window.SLOP_FEED = [{
  id: "p1",
  author: "Dana Whitfield",
  title: "Founder & CEO, Northbeam Labs",
  age: "3h",
  reactions: 412,
  comments: 96,
  reposts: 31,
  score: 0.78,
  shield: 0.06,
  tells: [{
    name: "Hype vocabulary",
    value: 0.86
  }, {
    name: "Manufactured narrative",
    value: 0.79
  }],
  body: "I fired my best performer last week.\n\nHere's why it was the best decision I've ever made.\n\nIt's not just about performance — it's about culture. What I learned wasn't merely a lesson in management; it was a profound reminder that leadership is about the hard calls.\n\nAgree?"
}, {
  id: "p2",
  author: "Priya Raman",
  title: "Staff engineer, payments",
  age: "5h",
  reactions: 88,
  comments: 14,
  reposts: 2,
  score: 0.18,
  shield: 0.31,
  tells: [{
    name: "Formal hedging",
    value: 0.22
  }, {
    name: "Empty evaluation",
    value: 0.14
  }],
  body: "We shaved 400ms off checkout by moving the fraud check off the critical path. Took three weeks, two of them arguing about it. Writeup in comments — the boring part (queue backpressure) is the part that mattered."
}, {
  id: "p3",
  author: "Marcus Bell",
  title: "Helping B2B leaders unlock growth",
  age: "7h",
  reactions: 1204,
  comments: 240,
  reposts: 88,
  score: 0.62,
  shield: 0.22,
  tells: [{
    name: "Empty evaluation",
    value: 0.74
  }, {
    name: "Engagement bait",
    value: 0.68
  }],
  body: "Most teams don't have a strategy problem. They have a clarity problem.\n\nStrategy without clarity is noise.\nClarity without execution is theatre.\n\nComment YES if this resonates."
}, {
  id: "p4",
  author: "Ellen Okafor",
  title: "Designer",
  age: "9h",
  reactions: 26,
  comments: 9,
  reposts: 0,
  score: 0.41,
  shield: 0.18,
  tells: [{
    name: "Mannered prose",
    value: 0.52
  }, {
    name: "Contrast framing",
    value: 0.44
  }],
  body: "Spent Saturday redrawing the same icon 40 times and I still don't like it. Posting it anyway — pretty sure #37 is the one, sort of."
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/feed/posts.js", error: String((e && e.message) || e) }); }

// ui_kits/site/Sections.jsx
try { (() => {
const {
  Wordmark,
  Button,
  Badge,
  Card,
  Icon,
  FoldStrip,
  SensitivitySlider,
  SegmentedControl
} = window.SlopMopDesignSystem_ca9143;
function Nav() {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "var(--space-5) var(--space-9)",
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 19
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#how",
    style: {
      font: "var(--type-ui)",
      textDecoration: "none",
      color: "var(--text-muted)"
    }
  }, "How it works"), /*#__PURE__*/React.createElement("a", {
    href: "#tells",
    style: {
      font: "var(--type-ui)",
      textDecoration: "none",
      color: "var(--text-muted)"
    }
  }, "The tells"), /*#__PURE__*/React.createElement("a", {
    href: "#privacy",
    style: {
      font: "var(--type-ui)",
      textDecoration: "none",
      color: "var(--text-muted)"
    }
  }, "Privacy"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: "download"
  }, "Add to Chrome")));
}
function Hero() {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      padding: "var(--space-13) var(--space-9) var(--space-12)",
      background: "var(--paper-100)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: "0 auto",
      display: "grid",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "warn"
  }, "Research purposes only"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: "var(--weight-bold) var(--text-5xl)/1.06 var(--font-display)",
      letterSpacing: "var(--tracking-tight)",
      maxWidth: "15ch"
    }
  }, "Fold the slop out of your feed."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "52ch",
      font: "var(--type-body)",
      fontSize: "var(--text-lg)",
      color: "var(--text-muted)"
    }
  }, "Slop Mop reads LinkedIn posts before you do, asks Jev how sloppy each one is, and folds the bad ones into a paper strip. Open any of them with one click."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: "download"
  }, "Add to Chrome"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    iconAfter: "arrow-right"
  }, "Read how it judges"))));
}
function DemoStrip() {
  const [mode, setMode] = React.useState("hide");
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-11) var(--space-9)",
      background: "var(--paper-200)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: "0 auto",
      display: "grid",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      color: "var(--text-muted)"
    }
  }, "Try it"), /*#__PURE__*/React.createElement(SegmentedControl, {
    style: {
      width: 240
    },
    value: mode,
    onChange: setMode,
    options: [{
      value: "hide",
      label: "Hide",
      icon: "eye-off"
    }, {
      value: "highlight",
      label: "Highlight",
      icon: "flag"
    }]
  })), mode === "hide" && !open ? /*#__PURE__*/React.createElement(FoldStrip, {
    score: 0.78,
    reasons: ["hype vocabulary", "manufactured narrative"],
    onRestore: () => setOpen(true)
  }) : /*#__PURE__*/React.createElement(window.SamplePost, {
    flagged: mode === "highlight",
    onFold: () => {
      setOpen(false);
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "sample post \xB7 score 0.78 \xB7 threshold 0.50 (moderate)")));
}
function Step({
  n,
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
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, n), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: "var(--type-heading)"
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
      padding: "var(--space-12) var(--space-9)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: "0 auto",
      display: "grid",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-display)",
      fontSize: "var(--text-2xl)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "How it works"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement(Step, {
    n: "01",
    title: "Reads ahead"
  }, "Posts are pulled roughly 1,500px before they reach your viewport, so the verdict is ready when you arrive."), /*#__PURE__*/React.createElement(Step, {
    n: "02",
    title: "Asks Jev"
  }, "Twelve questions go out in one parallel call \u2014 eleven writing tells plus a usefulness check that shields genuinely good posts."), /*#__PURE__*/React.createElement(Step, {
    n: "03",
    title: "Folds or flags"
  }, "Above your threshold, the post folds into a paper strip. Below it, nothing happens at all."), /*#__PURE__*/React.createElement(Step, {
    n: "04",
    title: "Fails open"
  }, "Server down, timeout, or low confidence? The post is left exactly as LinkedIn rendered it."))));
}
const TELLS = [["Definition by contrast", "“not just X, it's Y”"], ["Empty evaluation", "“meaningful”, “profound”, no detail"], ["Tradeoff-free promises", "“without sacrificing anything”"], ["Formal hedging", "“furthermore”, “may provide”"], ["Hype vocabulary", "“unlock”, “elevate”, “paramount”"], ["Mannered prose", "flourish instead of directness"], ["Formulaic hook", "scroll-stopper opener, broetry"], ["Manufactured narrative", "tidy anecdote → lesson arc"], ["Engagement bait", "“Agree?”, “Comment YES”"], ["Human voice", "counter-signal: first person, specifics"]];
function Tells() {
  return /*#__PURE__*/React.createElement("section", {
    id: "tells",
    style: {
      padding: "var(--space-12) var(--space-9)",
      background: "var(--paper-100)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: "0 auto",
      display: "grid",
      gap: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      maxWidth: "58ch"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-display)",
      fontSize: "var(--text-2xl)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "What counts as slop"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body)",
      color: "var(--text-muted)"
    }
  }, "The tell library is built on Graphite's comparison of 10,000 pre-ChatGPT human articles against 90,000 model-written ones. Jev judges each pattern against its definition \u2014 nothing here is a regex.")), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: "var(--space-2)"
    }
  }, TELLS.map(([name, eg]) => /*#__PURE__*/React.createElement("li", {
    key: name,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      padding: "var(--space-5) 0",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-ui)"
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)",
      textAlign: "right"
    }
  }, eg))))));
}
function Privacy() {
  const items = [["send", "What leaves your browser", "Post text and public engagement counts. Never your name, never the author's."], ["database", "What is stored", "Nothing. The server keeps no text and no answers, and request bodies aren't logged."], ["shield-check", "What it won't do", "It doesn't post, follow, message, or scrape. It reads what your own session already rendered."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "privacy",
    style: {
      padding: "var(--space-12) var(--space-9)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: "0 auto",
      display: "grid",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-display)",
      fontSize: "var(--text-2xl)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, "Plainly"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "var(--space-6)"
    }
  }, items.map(([icon, title, body]) => /*#__PURE__*/React.createElement(Card, {
    key: title
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-900)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "var(--space-5) 0 var(--space-3)",
      font: "var(--type-heading)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, body))))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-12) var(--space-9)",
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: "0 auto",
      display: "grid",
      gap: "var(--space-7)",
      justifyItems: "start"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "var(--type-display)",
      fontSize: "var(--text-3xl)",
      letterSpacing: "var(--tracking-tight)",
      maxWidth: "16ch"
    }
  }, "Your feed, minus the paradigm shifts."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "download"
  }, "Add to Chrome"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    icon: "code"
  }, "Read the source"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "var(--space-9)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 15,
    showDot: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "research project \xB7 not affiliated with LinkedIn \xB7 powered by TypeSafe Jev"));
}
function SamplePost({
  flagged,
  onFold
}) {
  const {
    HighlightFrame
  } = window.SlopMopDesignSystem_ca9143;
  const post = /*#__PURE__*/React.createElement("article", {
    style: {
      background: "#fff",
      border: "1px solid #E0DFDC",
      borderRadius: 8,
      padding: "14px 16px",
      font: "var(--type-body-sm)",
      color: "#1B1B18"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      whiteSpace: "pre-line",
      lineHeight: 1.45
    }
  }, "I fired my best performer last week.\n\nHere's why it was the best decision I've ever made.\n\nIt's not just about performance — it's about culture. Agree?"), /*#__PURE__*/React.createElement("button", {
    onClick: onFold,
    style: {
      marginTop: 12,
      background: "transparent",
      border: 0,
      padding: 0,
      cursor: "pointer",
      font: "var(--type-mono)",
      color: "var(--text-faint)"
    }
  }, "\u21BA fold it again"));
  return flagged ? /*#__PURE__*/React.createElement(HighlightFrame, {
    level: "danger"
  }, post) : post;
}
Object.assign(window, {
  Nav,
  Hero,
  DemoStrip,
  How,
  Tells,
  Privacy,
  CTA,
  Footer,
  SamplePost
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.SensitivitySlider = __ds_scope.SensitivitySlider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.GLYPHS = __ds_scope.GLYPHS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.MopMark = __ds_scope.MopMark;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.FoldStrip = __ds_scope.FoldStrip;

__ds_ns.HighlightFrame = __ds_scope.HighlightFrame;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.StatsDial = __ds_scope.StatsDial;

__ds_ns.WhyCard = __ds_scope.WhyCard;

})();
