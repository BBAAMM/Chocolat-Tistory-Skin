/* reading-progress.js — top progress bar + sticky-TOC meter %.
   Active only on article pages (when #article-view exists). */
(function () {
  function start() {
    var bar = document.getElementById("reading-progress");
    var view = document.getElementById("article-view");
    if (!bar || !view) return;
    bar.classList.remove("hidden");

    var meterFill = document.getElementById("toc-meter-fill");
    var meterText = document.getElementById("toc-meter-text");

    function compute() {
      // progress is measured across the article body, not the whole document
      var rect = view.getBoundingClientRect();
      var start = rect.top + window.scrollY - 120;          // body top
      var end = rect.top + window.scrollY + rect.height - window.innerHeight + 120;
      var p = (window.scrollY - start) / Math.max(1, end - start);
      p = Math.max(0, Math.min(1, p));
      var pct = Math.round(p * 100);
      bar.style.width = pct + "%";
      if (meterFill) meterFill.style.width = pct + "%";
      if (meterText) meterText.textContent = pct + "% 읽음";
    }
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () { compute(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener("resize", compute);
    compute();
  }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
