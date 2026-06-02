/* toc-generator.js — build TOC from h2/h3 in #article-view,
   scroll-spy highlight, smooth-scroll on click (offset for fixed nav). */
(function () {
  function start() {
    var view = document.getElementById("article-view");
    var deskNav = document.getElementById("toc-desktop-nav");
    var mobNav = document.getElementById("toc-mobile-nav");
    var sidebar = document.getElementById("article-toc");
    var mobBox = document.getElementById("toc-mobile-container");
    if (!view) return;

    var headings = view.querySelectorAll("h2, h3");
    if (headings.length === 0) {
      if (sidebar) sidebar.remove();
      if (mobBox) mobBox.remove();
      return;
    }

    // assign stable ids
    var seen = {};
    Array.prototype.forEach.call(headings, function (h) {
      if (!h.id) {
        var base = h.textContent.trim().replace(/\s+/g, "-").toLowerCase().replace(/[^\w가-힣-]/g, "");
        if (!base) base = "section";
        seen[base] = (seen[base] || 0) + 1;
        h.id = seen[base] > 1 ? base + "-" + seen[base] : base;
      }
    });

    function buildHTML() {
      return Array.prototype.map.call(headings, function (h) {
        var isH3 = h.tagName === "H3";
        return '<a href="#' + h.id + '" class="toc-link' + (isH3 ? " pl-4" : "") +
          '" data-id="' + h.id + '"><span>' + h.textContent.trim() + "</span></a>";
      }).join("");
    }
    var html = buildHTML();
    if (deskNav) deskNav.innerHTML = html;
    if (mobNav) mobNav.innerHTML = html;

    // smooth scroll (no scrollIntoView)
    function onClick(e) {
      var a = e.target.closest(".toc-link");
      if (!a) return;
      e.preventDefault();
      var id = a.getAttribute("data-id");
      var el = document.getElementById(id);
      if (!el) return;
      var top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: top, behavior: "smooth" });
      if (mobBox && mobBox.open) mobBox.open = false;
    }
    if (deskNav) deskNav.addEventListener("click", onClick);
    if (mobNav) mobNav.addEventListener("click", onClick);

    // scroll-spy
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          document.querySelectorAll(".toc-link.active").forEach(function (a) { a.classList.remove("active"); });
          document.querySelectorAll('.toc-link[data-id="' + en.target.id + '"]').forEach(function (a) { a.classList.add("active"); });
        }
      });
    }, { rootMargin: "-90px 0px -65% 0px", threshold: 0 });
    Array.prototype.forEach.call(headings, function (h) { obs.observe(h); });
  }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
