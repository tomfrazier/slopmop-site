/* /media: copy buttons for the quotes, bios and boilerplate, and the product video player. */
(function () {
  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest && ev.target.closest("[data-copy]");
    if (!btn) return;
    var el = document.getElementById(btn.getAttribute("data-copy"));
    if (!el) return;
    var src = el.querySelector("blockquote") || el;
    var text = Array.prototype.map.call(src.querySelectorAll("p"), function (p) { return p.textContent.trim(); }).join("\n\n") || src.textContent.trim();
    if (el.querySelector("blockquote")) text = "“" + text + "” — Tom Frazier, founder of Slop Mop and Artimovo";
    var label = btn.lastChild;
    function done(ok) { var was = label.textContent; label.textContent = ok ? "Copied" : "Press Ctrl+C"; setTimeout(function () { label.textContent = was; }, 1600); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    else done(false);
  });
})();

(function () {
  // Product video: no browser controls, sound on, click or tap anywhere to play and pause.
  var box = document.querySelector(".mk-video");
  if (!box) return;
  var video = box.querySelector("video");
  var btn = box.querySelector(".mk-video-play");
  function toggle() { if (video.paused) video.play(); else video.pause(); }
  box.querySelector(".mk-video-stage").addEventListener("click", function (ev) { ev.preventDefault(); toggle(); });
  video.addEventListener("play", function () { box.classList.add("is-playing"); btn.setAttribute("aria-label", "Pause the video"); });
  video.addEventListener("pause", function () { box.classList.remove("is-playing"); btn.setAttribute("aria-label", "Play the video"); });
  video.addEventListener("ended", function () { video.currentTime = 0; });
})();
