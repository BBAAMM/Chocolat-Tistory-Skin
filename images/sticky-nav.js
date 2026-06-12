/* sticky-nav.js — top nav behaviour.
   • Home (has #hero-section): nav reveals after the hero scrolls away.
   • Other pages (category / tag / search / article — no hero): nav is
     shown permanently so the header is always visible. */
(function () {
  function start() {
    var nav = document.getElementById("sticky-nav");
    if (!nav) return;
    var hero = document.getElementById("hero-section");

    if (!hero) {
      nav.style.transform = "translateY(0)";
      nav.style.opacity = "1";
      document.body.classList.add("nav-pinned");
      return;
    }

    var _threshold = null;
    function threshold() {
      if (_threshold === null) _threshold = hero.offsetHeight - 60;
      return _threshold;
    }
    window.addEventListener('resize', function () { _threshold = null; }, { passive: true });
    var shown = false;
    function update() {
      var should = window.scrollY > threshold();
      if (should === shown) return;
      shown = should;
      nav.style.transform = should ? "translateY(0)" : "translateY(-100%)";
      nav.style.opacity = should ? "1" : "0";
    }
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () { update(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    update();
  }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
