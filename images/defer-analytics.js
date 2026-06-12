var GA_ID = 'G-KMC8MV5ELT';

function loadGtag() {
  var s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  s.async = true;
  document.head.appendChild(s);
  s.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  };
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(loadGtag);
} else {
  setTimeout(loadGtag, 3000);
}
