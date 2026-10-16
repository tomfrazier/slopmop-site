/* The Slop Report charts: switch the range, sort, show a table view, and a hover/focus tooltip per bar.
   The bars are already in the HTML, so the page reads fine without this script. */
(function () {
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  $$("[data-tellchart]").forEach(function (card) {
    var data = {}; try { data = JSON.parse(card.querySelector(".tb-data").textContent); } catch (e) {}
    var list = card.querySelector(".tb-list"), table = card.querySelector(".tb-table"), tip = card.querySelector(".chart-tip");
    var rows = $$(".tb-row", list), sortBtn = card.querySelector("[data-sort]"), tableBtn = card.querySelector("[data-table]");
    var setBtns = $$("[data-set]", card), current = (setBtns.filter(function (b) { return b.getAttribute("aria-pressed") === "true"; })[0] || {}).dataset;
    var key = current ? current.set : Object.keys(data)[0], sorted = false, order = rows.slice();

    function render() {
      var d = data[key] || {};
      rows.forEach(function (r) {
        var v = d[r.dataset.name]; if (v == null) return;
        r.querySelector(".tb-bar").style.width = v + "%";
        r.querySelector(".tb-val").textContent = v + "%";
        r.dataset.v = v;
      });
      // counter-signals stay on top as a group; within each group, library order or strongest first
      var arr = order.slice();
      if (sorted) arr.sort(function (a, b) {
        var ga = a.classList.contains("counter") ? 0 : 1, gb = b.classList.contains("counter") ? 0 : 1;
        return ga - gb || (+b.dataset.v) - (+a.dataset.v);
      });
      arr.forEach(function (r) { list.appendChild(r); });
    }
    setBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        key = b.dataset.set;
        setBtns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        render();
      });
    });
    if (sortBtn) sortBtn.addEventListener("click", function () {
      sorted = !sorted; sortBtn.setAttribute("aria-pressed", sorted ? "true" : "false");
      sortBtn.textContent = sorted ? "Sort: library order" : "Sort: strongest first";
      render();
    });
    if (tableBtn) tableBtn.addEventListener("click", function () {
      var on = table.hidden; table.hidden = !on; list.hidden = on;
      tableBtn.setAttribute("aria-pressed", on ? "true" : "false");
      tableBtn.textContent = on ? "Show chart" : "Show table";
    });

    function show(r) {
      var label = (data[key] && Object.keys(data).length > 1) ? " · " + (setBtns.filter(function (b) { return b.dataset.set === key; })[0] || { textContent: "" }).textContent : "";
      tip.innerHTML = "<b></b><span class=\"mono\"></span><div></div>";
      tip.querySelector("b").textContent = r.dataset.name;
      tip.querySelector(".mono").textContent = (r.dataset.v || r.querySelector(".tb-val").textContent.replace("%", "")) + "% average strength" + label;
      tip.querySelector("div").textContent = r.querySelector(".tb-help").textContent;
      tip.hidden = false;
      var cr = card.getBoundingClientRect(), rr = r.getBoundingClientRect();
      var top = rr.bottom - cr.top + 6, left = Math.min(Math.max(8, rr.left - cr.left + 140), cr.width - tip.offsetWidth - 8);
      tip.style.top = top + "px"; tip.style.left = left + "px";
    }
    function hide() { tip.hidden = true; }
    rows.forEach(function (r) {
      r.addEventListener("mouseenter", function () { show(r); });
      r.addEventListener("focus", function () { show(r); });
      r.addEventListener("mouseleave", hide);
      r.addEventListener("blur", hide);
    });
    render();
  });
})();
