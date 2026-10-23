/* slopmop.lol — page behaviour. No framework; the design-system components are mounted by islands.js. */
(function () {
  /* ---------- site settings: edit here ---------- */
  var SITE = {
    storeUrl: "https://chromewebstore.google.com/detail/slop-mop/bhndmmjpeedeamimjijhagjgcibkdlho",
    /* Other stores. "Add to browser" sends each browser to its own store; an empty one falls back to storeUrl
       (Chrome Web Store, which Comet, Brave, Opera, Arc, Vivaldi and other Chromium browsers also use). */
    edgeStoreUrl: "",
    firefoxStoreUrl: "",
    safariStoreUrl: "",
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

  /* ---------- analytics events (GA4). Consent mode in the page head decides whether cookies are used. ---------- */
  function gaEvent(name, params) { try { if (window.gtag) window.gtag("event", name, params || {}); } catch (e) {} }
  function where(el) {
    if (el.closest(".nav")) return "nav";
    if (el.closest("footer")) return "footer";
    var sec = el.closest("section");
    if (sec && (sec.id || sec.classList[0])) return sec.id || sec.classList[0];
    return location.pathname.replace(/^\/|\.html$/g, "") || "home";
  }
  window.slopmopTrack = gaEvent;

  /* store + product hunt + social links */
  var ua = navigator.userAgent;
  var browser = /Edg\//.test(ua) ? "edge" : /Firefox\//.test(ua) ? "firefox" : (/Safari\//.test(ua) && !/Chrome\/|Chromium\/|CriOS|Android/.test(ua)) ? "safari" : "chrome";
  var storeUrl = { edge: SITE.edgeStoreUrl, firefox: SITE.firefoxStoreUrl, safari: SITE.safariStoreUrl }[browser] || SITE.storeUrl;
  $$("[data-add]").forEach(function (a) {
    a.href = storeUrl; a.target = "_blank"; a.rel = "noopener";
    /* Key event: someone heading to their browser's store to install. */
    a.addEventListener("click", function () { gaEvent("add_to_browser", { link_location: where(a), link_url: storeUrl, browser: browser }); });
  });
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
        .then(function (r) {
          if (!r.ok) throw new Error();
          note.textContent = "You're on the list. The first numbers go out at the end of the month."; input.value = "";
          gaEvent("generate_lead", { lead_source: "newsletter", form_location: where(form) });
        })
        .catch(function () { note.textContent = "That didn't go through. Try again in a minute."; note.classList.add("err"); })
        .then(function () { btn.disabled = false; });
    });
  });

  /* Ask AI buttons and press links: which assistant people reach for, and which mention they open */
  $$("[data-ask]").forEach(function (a) { a.addEventListener("click", function () { gaEvent("ask_ai", { tool: a.getAttribute("data-ask"), link_location: where(a) }); }); });
  $$("[data-press]").forEach(function (a) { a.addEventListener("click", function () { gaEvent("press_click", { outlet: a.getAttribute("data-press") }); }); });

  /* contact form: send stays off until name, a well-formed email and a message are all filled in */
  $$("form[data-contact]").forEach(function (form) {
    var name = $("[name=name]", form), email = $("[name=email]", form), msg = $("[name=message]", form);
    var btn = $("button[type=submit]", form), status = $(".contact-status", form), err = $("#c-email-err", form);
    var EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;
    function emailOk() { return EMAIL.test(email.value.trim()); }
    function check() {
      btn.disabled = !(name.value.trim() && emailOk() && msg.value.trim());
      var bad = email.value.trim() !== "" && !emailOk();
      email.setAttribute("aria-invalid", bad ? "true" : "false");
      if (err) err.hidden = !(bad && email.dataset.touched);
    }
    [name, email, msg].forEach(function (f) { f.addEventListener("input", check); });
    email.addEventListener("blur", function () { email.dataset.touched = "1"; check(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); email.dataset.touched = "1"; check();
      if (btn.disabled) return;
      btn.disabled = true; status.classList.remove("err"); status.textContent = "Sending…";
      fetch(SITE.emailEndpoint, { method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw new Error(); })
        .then(function () {
          gaEvent("generate_lead", { lead_source: "contact_form", form_location: "contact" });
          form.innerHTML = '<div class="contact-done"><h2 class="h-2">Thanks. Message sent.</h2><p class="lede">We reply by email, usually within two working days.</p></div>';
        })
        .catch(function () {
          status.classList.add("err");
          status.innerHTML = 'That didn\'t go through. Try again, or email <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a>.';
          check();
        });
    });
    check();
  });

  /* account-deleted feedback: optional; Send needs some text, and the email only if one is typed must be well formed.
     No analytics event: this page sends nothing beyond its page view. */
  $$("form[data-feedback]").forEach(function (form) {
    var msg = $("[name=message]", form), email = $("[name=email]", form), btn = $("button[type=submit]", form);
    var status = $(".contact-status", form), err = $("#f-email-err", form);
    var EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/;
    function emailOk() { var v = email.value.trim(); return v === "" || EMAIL.test(v); }
    function check() {
      btn.disabled = !(msg.value.trim() && emailOk());
      email.setAttribute("aria-invalid", emailOk() ? "false" : "true");
      if (err) err.hidden = emailOk() || !email.dataset.touched;
    }
    [msg, email].forEach(function (f) { f.addEventListener("input", check); });
    email.addEventListener("blur", function () { email.dataset.touched = "1"; check(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); email.dataset.touched = "1"; check();
      if (btn.disabled) return;
      btn.disabled = true; status.classList.remove("err"); status.textContent = "Sending…";
      fetch(form.getAttribute("data-endpoint") || SITE.emailEndpoint, { method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw new Error(); })
        .then(function () { form.innerHTML = '<div class="contact-done"><h2 class="h-2">Thanks for telling us.</h2><p class="lede">We read every one.</p></div>'; })
        .catch(function () {
          status.classList.add("err");
          status.innerHTML = 'That didn\'t go through. Try again, or email <a href="mailto:hello@slopmop.lol">hello@slopmop.lol</a>.';
          check();
        });
    });
    check();
  });

  /* tour video */
  var dlg = $("dialog.tour");
  $$("[data-tour]").forEach(function (b) { b.addEventListener("click", function () { gaEvent("tour_open", { link_location: where(b) }); if (dlg && dlg.showModal) { dlg.showModal(); var v = $("video", dlg); if (v) v.play().catch(function () {}); } }); });
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
      setTimeout(function () { wordText.textContent = chip.getAttribute("data-label"); logo.src = chip.getAttribute("data-logo"); word.style.setProperty("--c", chip.getAttribute("data-color")); word.toggleAttribute("data-ink", chip.hasAttribute("data-ink")); word.classList.remove("swap"); }, reduceMotion ? 0 : 200);
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
        if (cycles >= 2 && next === 0) stop(); /* two laps, then rest on LinkedIn: no endless loop */
      }, 1800);
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
    var playing = !reduceMotion, hover = false, offset = 0, last = 0, tween = null, hold = 0, speed = 36; /* px per second */
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
      } else if (playing && !hover && ts > hold) { offset += speed * dt; }
      paint(); requestAnimationFrame(frame);
    }
    m.addEventListener("mouseenter", function () { hover = true; });
    m.addEventListener("mouseleave", function () { hover = false; });
    m.addEventListener("focusin", function () { hover = true; });
    m.addEventListener("focusout", function () { hover = false; });
    $$("[data-marquee-step]", m).forEach(function (b) {
      b.addEventListener("click", function () {
        /* Centre the next card in the direction pressed. Measured from where the current move will land,
           so quick repeat presses step one card each. */
        var dir = +b.getAttribute("data-marquee-step"), base = tween ? tween.to : offset;
        var mr = m.getBoundingClientRect(), mid = mr.left + mr.width / 2, shift = base - offset, best = null;
        $$(".asset", track).forEach(function (c) {
          var r = c.getBoundingClientRect(), d = r.left + r.width / 2 - shift - mid;
          if (dir > 0 ? d > 2 : d < -2) { if (best === null || Math.abs(d) < Math.abs(best)) best = d; }
        });
        var to = base + (best === null ? dir * step() : best);
        tween = { from: offset, to: to, t0: performance.now(), d: reduceMotion ? 1 : 420 };
        hold = performance.now() + 4000; /* let the centred card be read before autoplay resumes */
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
    var items = $$(".tell-item", tellRoot), mob = $("[data-tell-mob]", tellRoot);
    function openTell(idx, focus) {
      idx = (idx + items.length) % items.length;
      items.forEach(function (it, k) {
        it.classList.toggle("open", k === idx);
        $(".tell-btn", it).setAttribute("aria-expanded", k === idx ? "true" : "false");
      });
      tellRoot.setAttribute("data-current", idx);
      if (mob) {
        $("[data-tm-n]", mob).textContent = (idx < 9 ? "0" : "") + (idx + 1);
        $("[data-tm-label]", mob).textContent = $(".tell-open b", items[idx]).textContent;
        $("[data-tm-desc]", mob).textContent = $(".tell-open p", items[idx]).textContent;
      }
      document.dispatchEvent(new CustomEvent("slopmop:tell", { detail: { index: idx, id: items[idx].getAttribute("data-tell") } }));
      if (focus) { var o = $(".tell-open", items[idx]); if (o) o.focus(); }
    }
    items.forEach(function (it, k) { $(".tell-btn", it).addEventListener("click", function () { openTell(k, true); }); });
    $$("[data-tell-step]", tellRoot).forEach(function (b) {
      b.addEventListener("click", function () { openTell(+tellRoot.getAttribute("data-current") + (+b.getAttribute("data-tell-step"))); keepTellInView(); });
    });
    /* On phones the strip and the example share one screen: if a step leaves part of them off screen, bring them back. */
    var keepTellInView = function () {
      if (!mob || !mob.offsetParent) return;
      var stage = $(".tell-card", tellRoot), top = mob.getBoundingClientRect().top, bottom = stage.getBoundingClientRect().bottom;
      var navH = ($(".nav") || { offsetHeight: 64 }).offsetHeight + 12;
      if (top < navH || bottom > window.innerHeight) window.scrollBy({ top: top - navH, behavior: reduceMotion ? "auto" : "smooth" });
    };
    /* Swipe the example left or right to step through the tells. */
    var sx = null, sy = 0, card = $(".tell-card", tellRoot);
    card.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    card.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) openTell(+tellRoot.getAttribute("data-current") + (dx < 0 ? 1 : -1));
    }, { passive: true });
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


  /* ---------- cookie banner (UK/EEA/US). Google Analytics is the only thing it covers.
     The page head sets Consent Mode defaults; this records the visitor's choice and updates them. ---------- */
  var CONSENT_KEY = "slopmop:consent";
  function readConsent() { try { var c = JSON.parse(localStorage.getItem(CONSENT_KEY)); return c && c.v === 1 && Date.now() - c.t < 365 * 864e5 ? c : null; } catch (e) { return null; } }
  function clearGaCookies() {
    document.cookie.split(";").forEach(function (c) {
      var n = c.split("=")[0].trim();
      if (/^_ga/.test(n)) ["", "; domain=" + location.hostname, "; domain=." + location.hostname.replace(/^www\./, "")].forEach(function (d) {
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
      });
    });
  }
  function setConsent(analytics) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: 1, analytics: analytics, t: Date.now() })); } catch (e) {}
    if (window.gtag) window.gtag("consent", "update", { analytics_storage: analytics ? "granted" : "denied" });
    if (!analytics) clearGaCookies();
  }
  var banner = null;
  function showBanner() {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "consent"; banner.setAttribute("role", "dialog"); banner.setAttribute("aria-live", "polite"); banner.setAttribute("aria-label", "Cookie choice");
      var priv = (document.querySelector('a[href$="privacy.html"]') || { getAttribute: function () { return "privacy.html"; } }).getAttribute("href");
      banner.innerHTML = '<p><b>Cookies, just for counting visits.</b> We use Google Analytics cookies to see which pages are useful. No ads, no selling data. ' +
        '<a href="' + priv + '#this-website-and-google-analytics">How it works</a></p>' +
        '<div class="consent-btns"><button class="btn btn-secondary btn-sm" type="button" data-consent="0">Reject</button>' +
        '<button class="btn btn-secondary btn-sm" type="button" data-consent="1">Accept</button></div>';
      $$("[data-consent]", banner).forEach(function (b) {
        b.addEventListener("click", function () { setConsent(b.getAttribute("data-consent") === "1"); banner.hidden = true; });
      });
      document.body.appendChild(banner);
    }
    banner.hidden = false;
  }
  if (!readConsent()) showBanner();
  $$("[data-consent-open]").forEach(function (b) { b.addEventListener("click", showBanner); });

  /* ---------- theme: system / light / dark. The head script sets data-theme before paint; this keeps it in step. ---------- */
  var themeMq = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  function themePref() { try { return localStorage.getItem("theme") || "system"; } catch (e) { return "system"; } }
  function applyTheme() {
    var p = themePref(), dark = p === "dark" || (p === "system" && themeMq && themeMq.matches);
    if (dark) document.documentElement.setAttribute("data-theme", "dark"); else document.documentElement.removeAttribute("data-theme");
    $$("[data-theme-set]").forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-theme-set") === p ? "true" : "false"); });
  }
  $$(".theme-pick").forEach(function (g) { g.hidden = false; });
  $$("[data-theme-set]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-theme-set");
      try { if (v === "system") localStorage.removeItem("theme"); else localStorage.setItem("theme", v); } catch (e) {}
      applyTheme(); gaEvent("theme", { theme: v });
    });
  });
  if (themeMq && themeMq.addEventListener) themeMq.addEventListener("change", applyTheme);
  applyTheme();

  /* ---------- on-this-page nav: mark the section being read ---------- */
  $$(".toc").forEach(function (toc) {
    var links = $$('a[href^="#"]', toc), secs = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    if (!links.length) return;
    var ticking = false;
    function spy() {
      ticking = false;
      var line = 140, i = 0;
      secs.forEach(function (s, k) { if (s && s.getBoundingClientRect().top <= line) i = k; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) i = secs.length - 1;
      links.forEach(function (a, k) { if (k === i) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
    spy();
  });

  /* ---------- band preview: silent loop that plays only while on screen; controls appear on hover or focus ---------- */
  $$("video[data-preview]").forEach(function (v) {
    var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    v.muted = true;
    function show() { v.controls = true; } function hide() { if (document.activeElement !== v) v.controls = false; }
    v.addEventListener("mouseenter", show); v.addEventListener("mouseleave", hide);
    v.addEventListener("focus", show); v.addEventListener("blur", hide);
    v.tabIndex = 0;
    if (still || !("IntersectionObserver" in window)) { v.preload = "metadata"; return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { v.play().catch(function () {}); } else { v.pause(); } });
    }, { threshold: 0.25 }).observe(v);
    v.addEventListener("play", function once() { v.removeEventListener("play", once); gaEvent("preview_play", {}); });
  });
})();

// Content library: copy-link buttons and the glossary's search and filters.
(function () {
  function ga(name, p) { try { if (window.gtag) window.gtag("event", name, p || {}); } catch (e) {} }
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (b) {
    b.addEventListener("click", function () {
      var url = b.getAttribute("data-copy");
      var done = function () { b.classList.add("done"); setTimeout(function () { b.classList.remove("done"); }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () {}); else { window.prompt("Copy this link", url); }
      ga("share", { method: "copy", item_id: location.pathname });
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-share]"), function (a) {
    a.addEventListener("click", function () { ga("share", { method: a.getAttribute("data-share"), item_id: location.pathname }); });
  });
  var input = document.querySelector("[data-gl-search]");
  if (!input) return;
  var kind = "all";
  var items = Array.prototype.slice.call(document.querySelectorAll(".gl-list li"));
  var groups = Array.prototype.slice.call(document.querySelectorAll(".gl-group"));
  var empty = document.querySelector(".gl-empty");
  var jump = document.querySelector(".gl-jump");
  function apply() {
    var q = input.value.trim().toLowerCase(), shown = 0;
    items.forEach(function (li) {
      var k = li.getAttribute("data-kind");
      var okKind = kind === "all" || k === kind || (k === "both" && (kind === "ai" || kind === "human"));
      var ok = okKind && (!q || li.getAttribute("data-q").indexOf(q) !== -1);
      li.hidden = !ok; if (ok) shown++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector("li:not([hidden])"); });
    empty.hidden = shown > 0;
    if (jump) jump.hidden = !!q || kind !== "all";
  }
  input.addEventListener("input", apply);
  Array.prototype.forEach.call(document.querySelectorAll("[data-gl-kind]"), function (b) {
    b.addEventListener("click", function () {
      kind = b.getAttribute("data-gl-kind");
      Array.prototype.forEach.call(document.querySelectorAll("[data-gl-kind]"), function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      apply();
    });
  });
  var q0 = new URLSearchParams(location.search).get("q");
  if (q0) { input.value = q0; apply(); }
})();

/* tell figures on How it works: each runs its own WebGL lamp, and browsers keep only a handful of WebGL
   contexts alive (fewer on phones), dropping the oldest. Unload the figures far off screen so the ones
   in view keep their lamps; the frame keeps its height, so nothing moves. */
(function () {
  var frames = document.querySelectorAll(".tell-fig iframe");
  if (!frames.length || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var f = e.target, src = f.getAttribute("data-src") || f.getAttribute("src");
      f.setAttribute("data-src", src);
      if (e.isIntersecting) { if (f.getAttribute("src") !== src) f.setAttribute("src", src); }
      else if (f.getAttribute("src") !== "about:blank") f.setAttribute("src", "about:blank");
    });
  }, { rootMargin: "1200px 0px" });
  frames.forEach(function (f) { io.observe(f); });
})();
