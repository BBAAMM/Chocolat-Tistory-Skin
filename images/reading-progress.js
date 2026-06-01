document.addEventListener("DOMContentLoaded", function () {
  const bar = document.getElementById("reading-progress");
  const articleView = document.getElementById("article-view");

  // 아티클 페이지에서만 활성화
  if (!bar || !articleView) return;

  bar.classList.remove("hidden");

  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(100, progress) + "%";
        ticking = false;
      });
      ticking = true;
    }
  });
});