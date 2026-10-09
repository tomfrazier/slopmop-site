/* slopmop.lol — page behaviour. No framework; the design-system components are mounted by islands.js. */
(function () {
  /* ---------- site settings: edit here ---------- */
  var SITE = {
    storeUrl: "https://chromewebstore.google.com/detail/slop-mop/bhndmmjpeedeamimjijhagjgcibkdlho",
    productHuntUrl: "https://www.producthunt.com/products/slop-mop",
    emailEndpoint: "https://formspree.io/f/xaenejjw",
    /* The top announcement bar (Product Hunt). Set to true to show it again. */
    announcementBar: false,
    /* Social icons in the footer stay hidden until a URL is filled in. */
    social: {
      linkedin: "",
      x: "",
      bluesky: "",
      threads: "",
      youtube: "",
      github: "",
      producthunt: ""
    }
  };
  window.SLOPMOP_SITE = SITE;

  var ICON_PAUSE = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* store + product hunt + social links */
  $$("[data-add]").forEach(function (a) { a.href = SITE.storeUrl; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-ph]").forEach(function (a) { if (SITE.productHuntUrl) { a.href = SITE.productHuntUrl; } a.hidden = !(SITE.announcementBar && SITE.productHuntUrl); });
  $$("[data-social]").forEach(function (a) {
    var url = SITE.social[a.getAttribute("data-social")];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  });
  var yr = $("[data-year]"); if (yr) yr.textContent = new Date().getFullYear();

  /* nav */
  var nav = $(".nav"), toggle = $(".nav-toggle");
  if (toggle) toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* monthly stats signup */
  $$("form[data-subscribe]").forEach(function (form) {
    var note = $(".note", form), input = $("input[type=email]", form), btn = $("button", form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = "That address doesn't look right."; note.classList.add("err"); input.focus(); return; }
      btn.disabled = true; note.classList.remove("err"); note.textContent = "Sending…";
      fetch(SITE.emailEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email: email, source: "slopmop.lol", _subject: "Slop Mop monthly stats signup" }) })
        .then(function (r) { if (!r.ok) throw new Error(); note.textContent = "You're on the list. The first numbers go out at the end of the month."; input.value = ""; })
        .catch(function () { note.textContent = "That didn't go through. Try again in a minute."; note.classList.add("err"); })
        .then(function () { btn.disabled = false; });
    });
  });

  /* tour video */
  var dlg = $("dialog.tour");
  $$("[data-tour]").forEach(function (b) { b.addEventListener("click", function () { if (dlg && dlg.showModal) { dlg.showModal(); var v = $("video", dlg); if (v) v.play().catch(function () {}); } }); });
  if (dlg) {
    $(".close", dlg).addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("close", function () { var v = $("video", dlg); if (v) v.pause(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }

  /* ---------- hero: the network the page is "built for" ---------- */
  var hero = $("[data-networks]");
  if (hero) {
    var chips = $$(".chip[data-net]", hero), word = $(".net-word", hero), wordText = $(".word", word), logo = $(".net-logo img", word);
    var pauseBtn = $(".stack-pause", hero), order = chips.map(function (c) { return c.getAttribute("data-net"); });
    var i = 0, timer = null, stopped = reduceMotion, cycles = 0;
    function set(net, user) {
      var chip = chips.filter(function (c) { return c.getAttribute("data-net") === net; })[0]; if (!chip) return;
      i = order.indexOf(net);
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      word.classList.add("swap");
      setTimeout(function () { wordText.textContent = chip.getAttribute("data-label"); logo.src = chip.getAttribute("data-logo"); word.style.setProperty("--c", chip.getAttribute("data-color")); word.classList.remove("swap"); }, reduceMotion ? 0 : 200);
      document.dispatchEvent(new CustomEvent("slopmop:network", { detail: { net: net } }));
      if (user) stop();
    }
    function stop() { stopped = true; clearInterval(timer); if (pauseBtn) { pauseBtn.setAttribute("aria-label", "Play network tour"); pauseBtn.innerHTML = ICON_PLAY; } }
    function play() {
      stopped = false; if (pauseBtn) { pauseBtn.setAttribute("aria-label", "Pause network tour"); pauseBtn.innerHTML = ICON_PAUSE; }
      clearInterval(timer);
      timer = setInterval(function () {
        var next = (i + 1) % order.length;
        if (next === 0) { cycles++; }
        set(order[next]);
        if (cycles >= 1 && next === 0) stop(); /* one lap, then rest on LinkedIn: no endless loop */
      }, 2400);
    }
    chips.forEach(function (c) { c.addEventListener("click", function () { set(c.getAttribute("data-net"), true); }); });
    if (pauseBtn) pauseBtn.addEventListener("click", function () { if (stopped) { cycles = 0; play(); } else stop(); });
    var stackEl = $(".stack", hero);
    if (stackEl) { stackEl.addEventListener("mouseenter", function () { if (!stopped) { clearInterval(timer); stackEl._held = true; } });
      stackEl.addEventListener("mouseleave", function () { if (stackEl._held && !stopped) { stackEl._held = false; play(); } }); }
    if (!stopped) play(); else stop();
  }

  /* ---------- kit carousel: autoplay, pause on hover, arrows nudge one card either way ---------- */
  $$("[data-marquee]").forEach(function (m) {
    var track = $(".marquee-track", m), toggle = $("[data-marquee-toggle='" + m.id + "']");
    var playing = !reduceMotion, hover = false, offset = 0, last = 0, tween = null, speed = 36; /* px per second */
    function half() { return track.scrollWidth / 2; }
    function step() { var c = $(".asset", track); return c ? c.getBoundingClientRect().width + 16 : 380; }
    function wrap(x) { var w = half(); return w ? ((x % w) + w) % w : 0; }
    function paint() { track.style.transform = "translateX(" + (-wrap(offset)) + "px)"; }
    function frame(ts) {
      var dt = last ? Math.min(64, ts - last) / 1000 : 0; last = ts;
      if (tween) {
        var k = Math.min(1, (ts - tween.t0) / tween.d), e = 1 - Math.pow(1 - k, 3);
        offset = tween.from + (tween.to - tween.from) * e;
        if (k >= 1) tween = null;
      } else if (playing && !hover) { offset += speed * dt; }
      paint(); requestAnimationFrame(frame);
    }
    m.addEventListener("mouseenter", function () { hover = true; });
    m.addEventListener("mouseleave", function () { hover = false; });
    m.addEventListener("focusin", function () { hover = true; });
    m.addEventListener("focusout", function () { hover = false; });
    $$("[data-marquee-step]", m).forEach(function (b) {
      b.addEventListener("click", function () {
        var from = offset, to = (tween ? tween.to : offset) + (+b.getAttribute("data-marquee-step")) * step();
        tween = { from: from, to: to, t0: performance.now(), d: reduceMotion ? 1 : 420 };
      });
    });
    if (toggle) {
      var setToggle = function () { toggle.setAttribute("aria-label", playing ? "Pause carousel" : "Play carousel"); toggle.innerHTML = playing ? ICON_PAUSE : ICON_PLAY; };
      toggle.addEventListener("click", function () { playing = !playing; setToggle(); });
      setToggle();
    }
    requestAnimationFrame(frame);
  });

  /* ---------- quote: words darken with scroll; fully dark near the top ---------- */
  var rv = document.querySelector("[data-reveal]");
  if (rv) {
    var ws = Array.prototype.slice.call(rv.querySelectorAll("span"));
    var paint = function () {
      var r = rv.getBoundingClientRect(), vh = window.innerHeight;
      var p = reduceMotion ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.85 - vh * 0.2)));
      var n = Math.round(p * ws.length);
      ws.forEach(function (w, k) { w.classList.toggle("on", k < n); });
    };
    window.addEventListener("scroll", paint, { passive: true }); window.addEventListener("resize", paint); paint();
  }

  /* ---------- counter-signal bars grow once ---------- */
  var grows = $$("[data-grow]");
  if (grows.length) {
    if ("IntersectionObserver" in window && !reduceMotion) {
      var gio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); gio.unobserve(e.target); } }); }, { threshold: 0.6 });
      grows.forEach(function (g) { gio.observe(g); });
    } else grows.forEach(function (g) { g.classList.add("in"); });
  }

  /* ---------- horizontal flow: pinned while the track slides; the blue line's tip stays at the viewport centre ---------- */
  var hf = $("[data-hflow]");
  if (hf) {
    var track = $(".hflow-track", hf), steps2 = $$(".hstep", hf), base2 = $(".hflow-line .base", hf), drawn2 = $(".hflow-line .drawn", hf), svg2 = $(".hflow-line", hf);
    var nodes = [], span = 0;
    var isStatic = function () { return reduceMotion || window.innerWidth <= 900; };
    var measure = function () {
      hf.classList.toggle("static", isStatic());
      track.style.transform = "";
      nodes = steps2.map(function (s) { var n = $(".hnode", s); return s.offsetLeft + n.offsetLeft; });
      var first = nodes[0], last = nodes[nodes.length - 1];
      span = last - first;
      var y = 16;
      svg2.setAttribute("width", track.scrollWidth); svg2.style.width = track.scrollWidth + "px";
      [base2, drawn2].forEach(function (l) { l.setAttribute("x1", first); l.setAttribute("y1", y); l.setAttribute("y2", y); });
      base2.setAttribute("x2", last);
      if (isStatic()) { hf.style.height = ""; drawn2.setAttribute("x2", last); steps2.forEach(function (s) { s.classList.add("passed"); }); return; }
      hf.style.height = (window.innerHeight - 64 + span) + "px";
      move();
    };
    var move = function () {
      if (isStatic() || !nodes.length) return;
      var r = hf.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (64 - r.top) / span));
      var col = $("#how .wrap") || hf, cr = col.getBoundingClientRect(), pad = parseFloat(getComputedStyle(col).paddingLeft) || 0;
      var first = steps2[0], lastS = steps2[steps2.length - 1];
      var startTx = cr.left + pad - first.offsetLeft;                                   /* first card on the page's left edge */
      var endTx = cr.right - pad - (lastS.offsetLeft + lastS.offsetWidth);              /* last card on its right edge */
      if (endTx > startTx) endTx = startTx;
      var tip = nodes[0] + p * span;
      var tx = startTx + p * (endTx - startTx);
      track.style.transform = "translateX(" + tx + "px)";
      drawn2.setAttribute("x2", tip);
      steps2.forEach(function (s, k) { s.classList.toggle("passed", nodes[k] <= tip + 1); });
    };
    window.addEventListener("scroll", move, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    document.addEventListener("slopmop:islands", measure);
    setTimeout(measure, 400);
  }


  /* ---------- help: "turning it off" plays once when it comes into view; Replay runs it again ---------- */
  $$("[data-offdemo]").forEach(function (d) {
    var cap = $(".od-cap", d), timers = [];
    var lines = ["Click the mop in your toolbar…", "…and flip the switch.", "Off is a real off: no scanning, no server calls, every mop goes grey."];
    function run() {
      timers.forEach(clearTimeout); timers = [];
      d.classList.remove("s1", "s2", "s3"); cap.textContent = lines[0];
      if (reduceMotion) { d.classList.add("s1", "s2", "s3"); cap.textContent = lines[2]; return; }
      timers.push(setTimeout(function () { d.classList.add("s1"); }, 400));
      timers.push(setTimeout(function () { d.classList.add("s2"); cap.textContent = lines[1]; }, 1400));
      timers.push(setTimeout(function () { d.classList.add("s3"); cap.textContent = lines[2]; }, 2100));
    }
    var replay = $("[data-offdemo-replay]", d.parentNode);
    if (replay) replay.addEventListener("click", run);
    if ("IntersectionObserver" in window) {
      var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { run(); o.disconnect(); } }, { threshold: 0.6 });
      o.observe(d);
    } else run();
  });

  /* ---------- nine tells accordion ---------- */
  var tellRoot = $("[data-tells]");
  if (tellRoot) {
    var items = $$(".tell-item", tellRoot);
    function openTell(idx, focus) {
      idx = (idx + items.length) % items.length;
      items.forEach(function (it, k) {
        it.classList.toggle("open", k === idx);
        $(".tell-btn", it).setAttribute("aria-expanded", k === idx ? "true" : "false");
      });
      tellRoot.setAttribute("data-current", idx);
      document.dispatchEvent(new CustomEvent("slopmop:tell", { detail: { index: idx, id: items[idx].getAttribute("data-tell") } }));
      if (focus) { var o = $(".tell-open", items[idx]); if (o) o.focus(); }
    }
    items.forEach(function (it, k) { $(".tell-btn", it).addEventListener("click", function () { openTell(k, true); }); });
    $$("[data-tell-step]", tellRoot).forEach(function (b) {
      b.addEventListener("click", function () { openTell(+tellRoot.getAttribute("data-current") + (+b.getAttribute("data-tell-step"))); });
    });
    openTell(0);
  }

  /* ---------- process flow: path drawn by scroll position, cards fade in once ---------- */
  var flow = $("[data-flow]");
  if (flow) {
    var steps = $$(".flow-step", flow), svg = $(".flow-path", flow), base, drawn, len = 0;
    function layout() {
      if (!svg || window.innerWidth <= 900) return;
      var fr = flow.getBoundingClientRect(), pts = steps.map(function (s) {
        var n = $(".flow-node", s).getBoundingClientRect();
        return [n.left - fr.left + n.width / 2, n.top - fr.top + n.height / 2];
      });
      var d = "M" + pts[0][0] + " " + pts[0][1];
      for (var k = 1; k < pts.length; k++) {
        var a = pts[k - 1], b = pts[k], my = (a[1] + b[1]) / 2;
        d += " C" + a[0] + " " + my + " " + b[0] + " " + my + " " + b[0] + " " + b[1];
      }
      svg.setAttribute("viewBox", "0 0 " + fr.width + " " + fr.height);
      base = base || svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
      drawn = drawn || svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
      base.setAttribute("d", d); drawn.setAttribute("d", d); drawn.setAttribute("class", "drawn");
      len = drawn.getTotalLength(); drawn.style.strokeDasharray = len; draw();
    }
    function draw() {
      if (!drawn || !len) return;
      var r = flow.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      drawn.style.strokeDashoffset = reduceMotion ? 0 : len * (1 - p);
    }
    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -20% 0px" });
      steps.forEach(function (s) { io.observe(s); });
    } else { steps.forEach(function (s) { s.classList.add("in"); }); }
    window.addEventListener("scroll", draw, { passive: true });
    window.addEventListener("resize", layout);
    window.addEventListener("load", layout);
    document.addEventListener("slopmop:islands", layout);
    setTimeout(layout, 300);
  }

})();
