/* reading-time.js — estimate reading time from article text.
   Korean readers ~ 500 chars/min; fills #reading-time with "N분". */
(function () {
  function start() {
    var view = document.getElementById("article-view");
    var out = document.getElementById("reading-time");
    if (!view || !out) return;
    var text = view.textContent || "";
    var chars = text.replace(/\s/g, "").length;
    var minutes = Math.max(1, Math.round(chars / 500));
    out.textContent = minutes + "분";
  }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
