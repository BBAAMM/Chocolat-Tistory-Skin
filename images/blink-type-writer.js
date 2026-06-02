/* blink-type-writer.js — hero headline typewriter (no external deps) */
(function () {
  function start() {
    var el = document.getElementById("typewriter");
    if (!el) return;
    // Phrases: data-phrases="a|b|c" overrides; else use current text.
    var attr = el.getAttribute("data-phrases");
    var phrases = attr
      ? attr.split("|").map(function (s) { return s.trim(); }).filter(Boolean)
      : [el.textContent.trim() || "안녕, 세계", "Code, 자람"];
    var i = 0, txt = "", del = false;
    el.textContent = "";
    function tick() {
      var cur = phrases[i % phrases.length];
      if (!del && txt === cur) {
        del = true;
        return setTimeout(tick, 1500);
      }
      if (del && txt === "") {
        del = false; i++;
        return setTimeout(tick, 320);
      }
      txt = del ? cur.slice(0, txt.length - 1) : cur.slice(0, txt.length + 1);
      el.textContent = txt;
      setTimeout(tick, del ? 55 : 110);
    }
    tick();
  }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
