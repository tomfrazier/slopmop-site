/* slopmop.lol — the calculators on /calculators/*. Everything runs in the page; nothing typed here is sent anywhere.
   Each calculator is mounted into <div class="calc" data-calc="name">. */
(function () {
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, attrs, html) { var e = document.createElement(tag); for (var k in attrs || {}) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }
  function fmt(n, d) { if (!isFinite(n)) return "–"; return n.toLocaleString("en-GB", { maximumFractionDigits: d == null ? 1 : d, minimumFractionDigits: 0 }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* A form of numeric inputs plus a results panel, recomputed on every input. */
  function numberCalc(root, cfg) {
    var form = el("form", { class: "calc-form", novalidate: "" });
    cfg.inputs.forEach(function (f) {
      var id = root.dataset.calc + "-" + f.k;
      var row = el("label", { class: "calc-field", for: id });
      row.innerHTML = '<span class="calc-label">' + esc(f.label) + '</span><span class="calc-input"><input id="' + id + '" name="' + f.k + '" type="number" inputmode="decimal" min="' + (f.min || 0) + '" max="' + (f.max || 100000) + '" step="' + (f.step || 1) + '" value="' + f.v + '"><span class="calc-unit">' + esc(f.unit || "") + "</span></span>" + (f.hint ? '<small>' + esc(f.hint) + "</small>" : "");
      form.appendChild(row);
    });
    var out = el("div", { class: "calc-out" });
    var how = el("p", { class: "calc-how" });
    root.appendChild(el("p", { class: "calc-kicker mono" }, "change any number · results update as you type"));
    var grid = el("div", { class: "calc-grid" });
    grid.appendChild(form); grid.appendChild(out); root.appendChild(grid); root.appendChild(how);
    function read() { var v = {}; cfg.inputs.forEach(function (f) { var x = parseFloat(form.elements[f.k].value); v[f.k] = isFinite(x) ? Math.max(f.min || 0, x) : 0; }); return v; }
    function run() {
      var r = cfg.compute(read());
      out.innerHTML = r.items.map(function (it, i) { return '<div class="calc-res' + (i === 0 ? " lead" : "") + '"><b>' + it[0] + "</b><span>" + esc(it[1]) + "</span></div>"; }).join("");
      how.innerHTML = "<strong>The arithmetic.</strong> " + r.how;
    }
    form.addEventListener("input", run);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    run();
  }

  var CALCS = {
    "attention-cost": function (root) {
      numberCalc(root, {
        inputs: [
          { k: "posts", label: "Posts you scroll past in a day", v: 120, unit: "posts", hint: "Across every feed you read." },
          { k: "share", label: "Share of them that are slop", v: 40, unit: "%", max: 100, hint: "Your own guess. Try scrolling one feed and counting." },
          { k: "secs", label: "Seconds each one takes to dismiss", v: 6, unit: "seconds", hint: "Reading the hook, deciding, scrolling on." },
          { k: "days", label: "Days a week you scroll", v: 7, unit: "days", max: 7 }
        ],
        compute: function (v) {
          var slop = v.posts * v.share / 100, mins = slop * v.secs / 60, week = mins * v.days / 60, year = week * 52;
          return {
            items: [[fmt(year, 0) + " hours", "a year spent dismissing slop"], [fmt(mins, 1) + " min", "a day"], [fmt(week, 1) + " hours", "a week"], [fmt(year / 8, 1) + " days", "of eight-hour work, every year"], [fmt(slop, 0), "slop posts a day"]],
            how: fmt(v.posts, 0) + " posts × " + fmt(v.share, 0) + "% = " + fmt(slop, 1) + " slop posts a day. × " + fmt(v.secs, 1) + " seconds = " + fmt(mins, 1) + " minutes a day. × " + fmt(v.days, 0) + " days ÷ 60 = " + fmt(week, 1) + " hours a week. × 52 weeks = " + fmt(year, 0) + " hours a year."
          };
        }
      });
    },
    "reading-vs-scrolling-time": function (root) {
      numberCalc(root, {
        inputs: [
          { k: "mins", label: "Minutes a day in feeds", v: 45, unit: "minutes", hint: "Your phone's screen-time report gives a real number." },
          { k: "worth", label: "Share spent on things worth reading", v: 25, unit: "%", max: 100, hint: "Posts you'd be glad you read." },
          { k: "book", label: "Hours to read a typical book", v: 6, unit: "hours", step: 0.5, min: 0.5 }
        ],
        compute: function (v) {
          var year = v.mins * 365 / 60, good = year * v.worth / 100, rest = year - good, books = rest / v.book;
          return {
            items: [[fmt(rest, 0) + " hours", "a year on feed content you wouldn't miss"], [fmt(year, 0) + " hours", "a year in feeds altogether"], [fmt(good, 0) + " hours", "on things worth reading"], [fmt(books, 0) + " books", "you could read in the hours you wouldn't miss"]],
            how: fmt(v.mins, 0) + " minutes × 365 days ÷ 60 = " + fmt(year, 0) + " hours a year. " + fmt(v.worth, 0) + "% of that is " + fmt(good, 0) + " hours worth reading, which leaves " + fmt(rest, 0) + " hours. ÷ " + fmt(v.book, 1) + " hours a book = " + fmt(books, 0) + " books."
          };
        }
      });
    },
    "newsletter-reading-budget": function (root) {
      numberCalc(root, {
        inputs: [
          { k: "n", label: "Newsletters you subscribe to", v: 18, unit: "newsletters" },
          { k: "issues", label: "Issues a week from each, on average", v: 1.5, unit: "issues", step: 0.5 },
          { k: "mins", label: "Minutes to read one issue", v: 6, unit: "minutes", step: 0.5 },
          { k: "keep", label: "Share you'd miss if they stopped", v: 40, unit: "%", max: 100, hint: "Be honest: the ones you'd notice were gone." },
          { k: "budget", label: "Minutes a week you want to spend", v: 60, unit: "minutes" }
        ],
        compute: function (v) {
          var per = v.issues * v.mins, all = v.n * per, keepMins = all * v.keep / 100, fit = per > 0 ? Math.floor(v.budget / per) : 0, cut = Math.max(0, v.n - fit);
          return {
            items: [[fmt(all, 0) + " min", "a week to read every issue"], [fmt(all * 52 / 60, 0) + " hours", "a year at that pace"], [fmt(keepMins, 0) + " min", "a week on the ones you'd miss"], [fmt(fit, 0), "newsletters fit your " + fmt(v.budget, 0) + "-minute budget"], [fmt(cut, 0), cut === 1 ? "newsletter to cut or demote" : "newsletters to cut or demote"]],
            how: fmt(v.n, 0) + " newsletters × " + fmt(v.issues, 1) + " issues × " + fmt(v.mins, 1) + " minutes = " + fmt(all, 0) + " minutes a week. " + fmt(v.keep, 0) + "% of that is " + fmt(keepMins, 0) + " minutes. One newsletter costs " + fmt(per, 1) + " minutes a week, so " + fmt(v.budget, 0) + " minutes fits " + fmt(fit, 0) + " of them."
          };
        }
      });
    },
    "content-value-density": function (root) {
      var HYPE = ["game-changing", "game changer", "game-changer", "unlock", "unlocks", "unlocking", "unleash", "leverage", "leveraging", "seamless", "seamlessly", "robust", "cutting-edge", "innovative", "transformative", "revolutionary", "revolutionise", "revolutionize", "elevate", "empower", "empowering", "supercharge", "next-level", "world-class", "best-in-class", "synergy", "delve", "journey", "landscape", "realm", "tapestry", "paradigm", "disrupt", "disruptive", "incredible", "incredibly", "amazing", "truly", "powerful", "unprecedented", "thrilled", "humbled", "excited to announce"];
      var HEDGE = ["furthermore", "moreover", "additionally", "ultimately", "in conclusion", "it's worth noting", "it is worth noting", "arguably", "potentially", "in today's", "fast-paced", "at the end of the day", "needless to say"];
      var ASK = ["comment", "repost", "share this", "follow me", "follow for", "link in bio", "dm me", "agree?", "thoughts?", "tag someone", "like if", "drop a", "type yes", "smash"];
      var MONTHS = "january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|monday|tuesday|wednesday|thursday|friday|saturday|sunday";
      var SAMPLE_BAD = "I almost quit.\n\nThen I discovered the one framework that changed everything.\n\nIt's not about working harder. It's about working smarter.\n\nThis game-changing approach will unlock unprecedented growth and elevate your journey.\n\nAgree? Comment YES and I'll DM you the guide. ♻️ Repost to help your network.";
      var SAMPLE_GOOD = "We moved our weekly planning from Monday to Thursday in March. Over the next 8 weeks, 14 of 22 sprints finished on time, up from 9 of 22 before. The main change: Priya's team could flag blocked tickets before the weekend instead of after it. It cost us one meeting slot and two grumpy emails from sales.";
      root.innerHTML = '<p class="calc-kicker mono">paste any post, email or article · nothing leaves your browser</p>' +
        '<label class="calc-text-label" for="cvd-text">Text to check</label><textarea id="cvd-text" class="calc-text" rows="8"></textarea>' +
        '<div class="calc-btns"><button type="button" class="btn btn-secondary btn-sm" data-s="bad">Load a sloppy example</button><button type="button" class="btn btn-secondary btn-sm" data-s="good">Load a specific example</button><button type="button" class="btn btn-secondary btn-sm" data-s="clear">Clear</button></div>' +
        '<div class="calc-grid one"><div class="calc-out"></div></div><div class="calc-marked" aria-label="Your text with the markers highlighted"></div><p class="calc-how"></p>';
      var ta = $("textarea", root), out = $(".calc-out", root), marked = $(".calc-marked", root), how = $(".calc-how", root);
      ta.value = SAMPLE_BAD;
      function phraseRx(list) { return new RegExp("(^|[^\\w'])(" + list.map(function (w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")(?=$|[^\\w'])", "gi"); }
      var rxHype = phraseRx(HYPE), rxHedge = phraseRx(HEDGE), rxAsk = phraseRx(ASK);
      var rxNum = /(?:[$£€]\s?)?\b\d[\d,.]*(?:\s?(?:%|percent|k|m|bn|ms|hours?|minutes?|days?|weeks?|months?|years?))?/gi;
      var rxDate = new RegExp("\\b(?:" + MONTHS + ")\\b|\\b(?:19|20)\\d{2}\\b", "gi");
      function run() {
        var t = ta.value, words = (t.match(/[A-Za-z0-9'’-]+/g) || []).length;
        var sentences = Math.max(1, (t.match(/[^.!?\n]+[.!?]?/g) || []).filter(function (x) { return x.trim().length > 1; }).length);
        var nums = (t.match(rxNum) || []).length, dates = (t.match(rxDate) || []).length;
        var names = 0; t.split(/(?<=[.!?\n])\s+/).forEach(function (s) { var ws = s.trim().split(/\s+/).slice(1); ws.forEach(function (w) { if (/^[A-Z][a-z’']+/.test(w) && !/^(I|I'm|I’m|I've|I’ve|I'll|I’ll)$/.test(w)) names++; }); });
        var hype = (t.match(rxHype) || []).length, hedge = (t.match(rxHedge) || []).length, ask = (t.match(rxAsk) || []).length;
        var concrete = nums + dates + names, filler = hype + hedge + ask;
        var per = function (n) { return words ? n / words * 100 : 0; };
        var c100 = per(concrete), f100 = per(filler), avg = words / sentences;
        var verdict = !words ? "Paste some text to start." : c100 >= 8 && f100 < 2 ? "Dense with specifics" : c100 >= 4 && f100 < 4 ? "Some specifics" : f100 >= 4 && c100 < 4 ? "Mostly filler" : "Thin on specifics";
        out.innerHTML = [[fmt(c100, 1), "concrete markers per 100 words"], [fmt(f100, 1), "filler markers per 100 words"], [verdict, "rough reading"], [fmt(words, 0), "words, " + fmt(sentences, 0) + " sentences"], [fmt(avg, 1), "words per sentence"]]
          .map(function (it, i) { return '<div class="calc-res' + (i === 0 ? " lead" : "") + '"><b>' + esc(it[0]) + "</b><span>" + esc(it[1]) + "</span></div>"; }).join("");
        var h = esc(t);
        h = h.replace(phraseRx(HYPE.concat(HEDGE, ASK)), function (m, pre, w) { return pre + '<mark class="f">' + w + "</mark>"; });
        h = h.replace(/(?:[$£€]\s?)?\b\d[\d,.]*(?:\s?(?:%|percent|k|m|bn|ms|hours?|minutes?|days?|weeks?|months?|years?))?/gi, function (m) { return '<mark class="c">' + m + "</mark>"; });
        marked.innerHTML = words ? h.replace(/\n/g, "<br>") : "";
        how.innerHTML = "<strong>How it counts.</strong> Concrete markers are numbers and amounts (" + nums + "), dates and days (" + dates + ") and capitalised names that aren't the first word of a sentence (" + names + "). Filler markers are hype words (" + hype + "), stock transitions and hedges (" + hedge + ") and requests to comment or share (" + ask + "). Each is divided by the word count and multiplied by 100. In the text above, numbers are marked in blue and filler in yellow. This is a word count with rules, not Slop Mop's score: it can't tell whether a number is true or whether the writing is useful.";
      }
      ta.addEventListener("input", run);
      root.addEventListener("click", function (e) { var b = e.target.closest("[data-s]"); if (!b) return; ta.value = b.dataset.s === "bad" ? SAMPLE_BAD : b.dataset.s === "good" ? SAMPLE_GOOD : ""; run(); ta.focus(); });
      run();
    }
  };
  Array.prototype.forEach.call(document.querySelectorAll("[data-calc]"), function (root) {
    var f = CALCS[root.dataset.calc];
    if (f) { root.innerHTML = ""; f(root); }
  });
})();
