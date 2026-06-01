document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("sticky-nav");
  const hero = document.getElementById("hero-section");
  const searchModal = document.getElementById("search-modal");
  const searchBtns = [
    document.getElementById("hero-search-btn"),
    document.getElementById("sticky-search-btn"),
  ].filter(Boolean);

  // Sticky nav: IntersectionObserver on hero section
  if (nav && hero) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          nav.style.transform = "translateY(0)";
          nav.style.opacity = "1";
        } else {
          nav.style.transform = "translateY(-100%)";
          nav.style.opacity = "0";
        }
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  }

  // 검색 모달 — hero + sticky nav 버튼 모두 연결
  if (searchModal) {
    searchBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        searchModal.classList.toggle("hidden");
        if (!searchModal.classList.contains("hidden")) {
          searchModal.querySelector("input")?.focus();
        }
      });
    });
    document.addEventListener("click", (e) => {
      if (!searchModal.contains(e.target)) {
        searchModal.classList.add("hidden");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") searchModal.classList.add("hidden");
    });
  }
});
