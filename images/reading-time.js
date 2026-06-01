document.addEventListener("DOMContentLoaded", function () {
  const articleView = document.getElementById("article-view");
  const readingTimeEl = document.getElementById("reading-time");

  if (!articleView || !readingTimeEl) return;

  // 한국어 기준 분당 약 400자
  const text = articleView.innerText || "";
  const charCount = text.trim().replace(/\s+/g, "").length;
  const minutes = Math.max(1, Math.ceil(charCount / 400));
  readingTimeEl.textContent = minutes + "분";
});
