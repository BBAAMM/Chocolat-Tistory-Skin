/* chapter-bar.js — Direction C: sticky chapter bar for articles.
   Builds chapter segments from <h2> in #article-view, tracks scroll to fill
   segments + a continuous underline, shows the current chapter name + %,
   and opens a dropdown listing every section (h2/h3). Replaces the old
   hover-dock TOC + top reading-progress bar. */
(function () {
  function start() {
    var view = document.getElementById("article-view");
    var bar = document.getElementById("chapter-bar");
    if (!bar) return;
    if (!view) { bar.remove(); return; }

    var heads = Array.prototype.slice.call(view.querySelectorAll("h2, h3"));
    var chapters = heads.filter(function (h) { return h.tagName === "H2"; });
    if (chapters.length === 0) { bar.remove(); return; }

    // stable ids
    var seen = {};
    heads.forEach(function (h) {
      if (!h.id) {
        var base = h.textContent.trim().replace(/\s+/g, "-").toLowerCase().replace(/[^\w가-힣-]/g, "") || "section";
        seen[base] = (seen[base] || 0) + 1;
        h.id = seen[base] > 1 ? base + "-" + seen[base] : base;
      }
    });

    function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
    function pad(n) { return (n < 10 ? "0" : "") + n; }

    var segs = chapters.map(function (h, i) {
      return '<button class="cb-seg" data-i="' + i + '" title="' + esc(h.textContent.trim()) + '"><span class="cb-seg-fill"></span></button>';
    }).join("");
    var menu = heads.map(function (h) {
      var sub = h.tagName === "H3";
      return '<a href="#' + h.id + '" class="cb-menu-link' + (sub ? " sub" : "") + '" data-id="' + h.id + '">' + esc(h.textContent.trim()) + "</a>";
    }).join("");

    bar.innerHTML =
      '<div class="cb-inner">' +
        '<button class="cb-now" type="button" aria-expanded="false" aria-label="목차 열기">' +
          '<i class="fa fa-list-ul"></i>' +
          '<span class="cb-now-idx"></span>' +
          '<span class="cb-now-title"></span>' +
          '<i class="fa fa-chevron-down cb-caret"></i>' +
        "</button>" +
        '<div class="cb-segs">' + segs + "</div>" +
        '<span class="cb-pct">0%</span>' +
      "</div>" +
      '<div class="cb-progress"><span></span></div>' +
      '<div class="cb-menu">' + menu + "</div>";
    bar.hidden = false;

    var nowIdx = bar.querySelector(".cb-now-idx");
    var nowTitle = bar.querySelector(".cb-now-title");
    var pctEl = bar.querySelector(".cb-pct");
    var lineEl = bar.querySelector(".cb-progress > span");
    var segEls = Array.prototype.slice.call(bar.querySelectorAll(".cb-seg"));
    var nowBtn = bar.querySelector(".cb-now");
    var menuEl = bar.querySelector(".cb-menu");

    function chapterTops() {
      return chapters.map(function (h) { return h.getBoundingClientRect().top + window.scrollY; });
    }

    function compute() {
      var rect = view.getBoundingClientRect();
      var startY = rect.top + window.scrollY - 120;
      var endY = rect.top + window.scrollY + rect.height - window.innerHeight + 120;
      var p = (window.scrollY - startY) / Math.max(1, endY - startY);
      p = Math.max(0, Math.min(1, p));
      var pct = Math.round(p * 100);
      pctEl.textContent = pct + "%";
      lineEl.style.width = pct + "%";

      var probe = window.scrollY + 150;
      var ct = chapterTops();
      var cur = 0;
      for (var i = 0; i < ct.length; i++) { if (ct[i] <= probe) cur = i; }
      nowIdx.textContent = pad(cur + 1);
      nowTitle.textContent = chapters[cur].textContent.trim();

      for (var j = 0; j < segEls.length; j++) {
        var fillEl = segEls[j].querySelector(".cb-seg-fill");
        var f = 0;
        if (j < cur) f = 100;
        else if (j === cur) {
          var top = ct[j];
          var next = (j + 1 < ct.length) ? ct[j + 1] : (endY + window.innerHeight);
          f = Math.max(0, Math.min(1, (probe - top) / Math.max(1, next - top))) * 100;
        }
        fillEl.style.width = f + "%";
        segEls[j].classList.toggle("active", j === cur);
      }
    }

    function jump(id) {
      var el = document.getElementById(id);
      if (!el) return;
      var top = el.getBoundingClientRect().top + window.scrollY - 112;
      window.scrollTo({ top: top, behavior: "smooth" });
    }

    segEls.forEach(function (s) {
      s.addEventListener("click", function () { jump(chapters[+s.getAttribute("data-i")].id); });
    });
    nowBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = bar.classList.toggle("open");
      nowBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function () {
      bar.classList.remove("open");
      nowBtn.setAttribute("aria-expanded", "false");
    });
    menuEl.addEventListener("click", function (e) {
      var a = e.target.closest(".cb-menu-link");
      if (!a) return;
      e.preventDefault();
      jump(a.getAttribute("data-id"));
      bar.classList.remove("open");
      nowBtn.setAttribute("aria-expanded", "false");
    });

    // scroll-spy for the dropdown's active link (finer, includes h3)
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          menuEl.querySelectorAll(".cb-menu-link.active").forEach(function (a) { a.classList.remove("active"); });
          var link = menuEl.querySelector('.cb-menu-link[data-id="' + en.target.id + '"]');
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-112px 0px -70% 0px", threshold: 0 });
    heads.forEach(function (h) { spy.observe(h); });

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(function () { compute(); ticking = false; }); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", compute);
    compute();
  }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
