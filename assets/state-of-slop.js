// State of Slop: the (i) token panels. Hover or focus shows a panel, a tap pins it,
// and the close button or Escape hides it until the pointer leaves.
(function () {
  var infos = document.querySelectorAll(".sos-info");
  function close(info) {
    info.classList.remove("is-open");
    info.classList.add("is-dismissed");
    info.querySelector(".sos-info-btn").setAttribute("aria-expanded", "false");
  }
  infos.forEach(function (info) {
    var btn = info.querySelector(".sos-info-btn");
    btn.addEventListener("click", function () {
      var open = !info.classList.contains("is-open");
      info.classList.toggle("is-open", open);
      info.classList.toggle("is-dismissed", !open);
      btn.setAttribute("aria-expanded", String(open));
    });
    info.querySelector(".sos-tip-x").addEventListener("click", function (ev) {
      ev.stopPropagation();
      close(info);
      info.dataset.hold = "1";
      btn.focus();
    });
    info.addEventListener("mouseleave", function () {
      if (!info.classList.contains("is-open")) info.classList.remove("is-dismissed");
    });
    btn.addEventListener("focus", function () {
      if (info.dataset.hold) delete info.dataset.hold;
      else info.classList.remove("is-dismissed");
    });
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") infos.forEach(close);
  });
  document.addEventListener("click", function (ev) {
    infos.forEach(function (info) { if (!info.contains(ev.target) && info.classList.contains("is-open")) close(info); });
  });
})();
