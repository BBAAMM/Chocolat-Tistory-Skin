document.addEventListener("DOMContentLoaded", function () {
  const articleView = document.getElementById("article-view");
  const tocDesktop = document.getElementById("toc-desktop-nav");
  const tocMobile = document.getElementById("toc-mobile-nav");
  const tocSidebar = document.getElementById("article-toc");
  const tocMobileContainer = document.getElementById("toc-mobile-container");

  if (!articleView) return;

  const headings = articleView.querySelectorAll("h2, h3");

  // 헤딩이 없으면 TOC 전체 숨김
  if (headings.length === 0) {
    tocSidebar?.remove();
    tocMobileContainer?.remove();
    return;
  }

  // 헤딩에 id가 없으면 자동 부여 (중복 방지)
  const idCount = {};
  headings.forEach((heading) => {
    if (!heading.id) {
      let base = heading.textContent
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase()
        .replace(/[^\w가-힣-]/g, "");
      if (!base) base = "section";
      idCount[base] = (idCount[base] || 0) + 1;
      heading.id = idCount[base] > 1 ? `${base}-${idCount[base]}` : base;
    }
  });

  // TOC HTML 생성
  function buildTocHTML() {
    return Array.from(headings)
      .map((h) => {
        const isH3 = h.tagName === "H3";
        return `<a
          href="#${h.id}"
          class="toc-link block text-sm py-1 truncate transition duration-150 ${
            isH3
              ? "pl-4 text-gray-500 hover:text-gray-300"
              : "text-gray-400 hover:text-pink-300"
          }"
          data-id="${h.id}"
        >${h.textContent.trim()}</a>`;
      })
      .join("");
  }

  const tocHTML = buildTocHTML();
  if (tocDesktop) tocDesktop.innerHTML = tocHTML;
  if (tocMobile) tocMobile.innerHTML = tocHTML;

  // IntersectionObserver: 현재 섹션 하이라이트
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".toc-link.active").forEach((a) => {
            a.classList.remove("active");
          });
          document
            .querySelectorAll(`.toc-link[data-id="${entry.target.id}"]`)
            .forEach((a) => {
              a.classList.add("active");
            });
        }
      });
    },
    { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
  );

  headings.forEach((h) => observer.observe(h));
});
