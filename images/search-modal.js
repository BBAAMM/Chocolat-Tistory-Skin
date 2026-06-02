/* search-modal.js — open/close the Tistory search modal.
   Triggers: #hero-search-btn, #sticky-search-btn, ⌘K / Ctrl-K. Esc closes. */
(function () {
  function start() {
    var modal = document.getElementById("search-modal");
    if (!modal) return;
    var input = modal.querySelector("input");

    function open() {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      if (input) setTimeout(function () { input.focus(); }, 40);
    }
    function close() {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      if (input) input.blur();
    }
    function toggle() {
      modal.classList.contains("hidden") ? open() : close();
    }

    ["hero-search-btn", "sticky-search-btn", "fab-search-btn"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.addEventListener("click", function (e) { e.preventDefault(); open(); });
    });

    // click on backdrop closes; click inside the card does not
    modal.addEventListener("mousedown", function (e) {
      if (!e.target.closest(".search-card")) close();
    });

    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); toggle();
      } else if (e.key === "Escape") {
        close();
      }
    });
  }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
