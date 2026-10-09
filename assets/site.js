/* slopmop.lol — page behaviour. No framework; the design-system components are mounted by islands.js. */
(function () {
  /* ---------- site settings: edit here ---------- */
  var SITE = {
    storeUrl: "https://chromewebstore.google.com/detail/slop-mop/bhndmmjpeedeamimjijhagjgcibkdlho",
    productHuntUrl: "https://www.producthunt.com/products/slop-mop",
    emailEndpoint: "https://formspree.io/f/xaenejjw",
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
  $$("[data-ph]").forEach(function (a) { if (SITE.productHuntUrl) { a.href = SITE.productHuntUrl; } else { a.remove(); } });
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
      setTimeout(function () { wordText.textContent = chip.getAttribute("data-label"); logo.src = chip.getAttribute("data-logo"); word.classList.remove("swap"); }, reduceMotion ? 0 : 200);
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
      }, 3800);
    }
    chips.forEach(function (c) { c.addEventListener("click", function () { set(c.getAttribute("data-net"), true); }); });
    if (pauseBtn) pauseBtn.addEventListener("click", function () { if (stopped) { cycles = 0; play(); } else stop(); });
    var stackEl = $(".stack", hero);
    if (stackEl) { stackEl.addEventListener("mouseenter", function () { if (!stopped) { clearInterval(timer); stackEl._held = true; } });
      stackEl.addEventListener("mouseleave", function () { if (stackEl._held && !stopped) { stackEl._held = false; play(); } }); }
    if (!stopped) play(); else stop();
  }

  /* ---------- carousel pause ---------- */
  $$("[data-marquee]").forEach(function (m) {
    var btn = $("[data-marquee-toggle='" + m.id + "']");
    if (!btn) return;
    if (reduceMotion) { btn.hidden = true; return; }
    btn.addEventListener("click", function () {
      var p = m.classList.toggle("paused");
      btn.setAttribute("aria-label", p ? "Play carousel" : "Pause carousel"); btn.innerHTML = p ? ICON_PLAY : ICON_PAUSE;
    });
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
