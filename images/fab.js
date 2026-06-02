/* fab.js — floating action button: expand / collapse quick actions,
   appear after scrolling, "위로" scrolls to top. */
(function () {
  function start() {
    var root = document.getElementById("fab-root");
    if (!root) return;
    var main = document.getElementById("fab-main");
    var actions = document.getElementById("fab-actions");
    var topBtn = document.getElementById("fab-top-btn");
    var open = false;

    function setOpen(v) {
      open = v;
      if (actions) {
        actions.style.opacity = v ? "1" : "0";
        actions.style.pointerEvents = v ? "auto" : "none";
        actions.style.transform = v ? "translateY(0)" : "translateY(10px)";
      }
      if (main) main.style.transform = v ? "rotate(45deg)" : "rotate(0)";
    }
    if (main) main.addEventListener("click", function () { setOpen(!open); });
    if (topBtn) topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false);
    });
    // close on outside click
    document.addEventListener("click", function (e) {
      if (open && !root.contains(e.target)) setOpen(false);
    });

    function vis() {
      var show = window.scrollY > 240 || open;
      root.style.opacity = show ? "1" : "0";
      root.style.pointerEvents = show ? "auto" : "none";
    }
    window.addEventListener("scroll", vis, { passive: true });
    setOpen(false); vis();
  }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
