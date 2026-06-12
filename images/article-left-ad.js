(function () {
  if (!window.matchMedia('(min-width: 1536px)').matches) return;
  var ad = document.querySelector('.article-left-ad');
  var header = document.getElementById('article-permalink-header');
  if (!ad || !header) return;

  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      ad.classList.remove('is-visible');
    } else {
      ad.classList.add('is-visible');
    }
  }).observe(header);
})();
