# Chocolat Skin Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** skin.html 전체 재설계 — 하프 히어로 + 인라인 네비 → sticky 전환, 홈 2컬럼(TOP POSTS 2×2 / LATEST 피드 / 사이드바), 아티클 스티키 TOC + 진행 바, 목록 페이지 2컬럼 필터 사이드바.

**Architecture:** skin.html 단일 파일을 태스크별로 섹션 교체. 신규 JS 4개(sticky-nav, reading-progress, reading-time, toc-generator) 추가, 기존 slider-changer.js·hamburger-button.js 제거. Tailwind CSS 인라인 클래스 위주, style.css는 커스텀 컴포넌트(TOC active 등)만 추가.

**Tech Stack:** Tistory 치환자(s_cover / s_cover_item / s_list_rep 등), Tailwind CSS (CDN + build), GSAP + TextPlugin (타이프라이터 유지), FontAwesome 6 CDN, Vanilla JS ES6 (import/export 불가 — 전역 함수 방식)

**Build:** `npx tailwindcss -i ./style.css -o ./output.css --minify` (변경 후 반드시 실행)

---

## 파일 맵

| 액션 | 경로 | 역할 |
|---|---|---|
| 수정 | `skin.html` | 메인 HTML (모든 섹션 교체) |
| 수정 | `style.css` | TOC active 추가, FAB 관련 제거 |
| 수정 | `index.xml` | cover-slider → cover-hero, cover-categories 제거 |
| 생성 | `images/sticky-nav.js` | 히어로 sentinel → sticky nav 전환 + 검색 모달 제어 |
| 생성 | `images/reading-progress.js` | 아티클 페이지 전용 읽기 진행 바 |
| 생성 | `images/reading-time.js` | 글자수 카운트 → 읽기 시간 계산 |
| 생성 | `images/toc-generator.js` | h2/h3 파싱 → TOC 동적 생성 + IntersectionObserver |
| 삭제 | `images/slider-changer.js` | 슬라이더 제거로 불필요 |
| 삭제 | `images/hamburger-button.js` | FAB 제거로 불필요 |

---

## Task 1: 기존 컴포넌트 정리 (Cleanup)

**수정 파일:** `skin.html`, `style.css`

FAB·카테고리 모달·슬라이더 2·3번 슬라이드·snap-scroll을 제거해 충돌 없는 베이스를 만든다.

- [ ] **Step 1: `<html>` 태그에서 snap 관련 클래스 제거**

`skin.html` 2번째 줄을:
```html
<html
  lang="ko"
  class="snap-y overflow-x-hidden overflow-y-scroll snap-proximity scroll-smooth min-w-[320px]"
>
```
아래로 교체:
```html
<html
  lang="ko"
  class="overflow-x-hidden overflow-y-scroll scroll-smooth min-w-[320px]"
>
```

- [ ] **Step 2: `<head>`에서 구 JS 스크립트 태그 제거 후 신규 4개 추가**

아래 두 줄을:
```html
    <script defer src="./images/slider-changer.js"></script>
    <script defer src="./images/hamburger-button.js"></script>
```
아래로 교체:
```html
    <script defer src="./images/sticky-nav.js"></script>
    <script defer src="./images/reading-progress.js"></script>
    <script defer src="./images/reading-time.js"></script>
    <script defer src="./images/toc-generator.js"></script>
```

- [ ] **Step 3: `<body>` 내 FAB 전체 블록 제거**

아래 블록(154~181번 줄) 전체 삭제:
```html
    <!-- Floating Hamburger Menu -->
    <div class="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50">
      ...
    </div>
```

- [ ] **Step 4: overlay div 제거**

```html
    <!-- Overlay -->
    <div id="overlay" class="fixed inset-0 bg-black bg-opacity-50 hidden"></div>
```
위 줄 삭제.

- [ ] **Step 5: category-modal 제거**

```html
    <!-- Category Modal -->
    <div id="category-modal" class="fixed inset-0 bg-gray-900 text-gray-200 p-6 hidden">
      ...
    </div>
```
위 블록 전체 삭제.

- [ ] **Step 6: cover-slider 내 2번·3번 슬라이드 제거**

`<s_cover name="cover-slider">` 안에서 아래 두 블록 삭제:
```html
                  <!-- Second Slide[30%](1.7.2025) -->
                  <div
                    id="second-slider"
                    ...
                  </div>

                  <!-- Third Slide[10%](1.7.2025) -->
                  <div
                    id="third-slider"
                    ...
                  </div>
```
또한 슬라이더 내부 네비게이션 화살표(`#prev`, `#next` div)와 슬라이드 인디케이터 div도 함께 제거.

- [ ] **Step 7: `<s_cover name="cover-categories">` 섹션 전체 제거**

`<!-- Popular Contents Section[90%] -->` 주석부터 `</s_cover>` 닫는 태그까지 전체 삭제.

- [ ] **Step 8: `style.css`에서 FAB 관련 스타일 제거**

`style.css`의 `/* #region Hamburger Button Style Customize */` 블록 전체 삭제:
```css
  /* #region Hamburger Button Style Customize */
  #menu-buttons { ... }
  .menu-button { ... }
  .menu-button.show { ... }
  #overlay { ... }
  #search-modal,
  #category-modal { ... }
  #search-modal .relative { ... }
  /* #endregion */
```
그리고 검색 모달 z-index만 아래와 같이 재추가:
```css
  /* Modal z-index */
  #search-modal { z-index: 20; }
```

- [ ] **Step 9: `style.css`에서 `.custom-card-popular` 제거**

```css
  /* Popular contents cards */
  .custom-card-popular {
    @apply w-[160px] h-[160px] ...;
  }
```
위 블록 삭제.

- [ ] **Step 10: 빌드 후 HTML 열어 콘솔 에러 없는지 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
브라우저에서 `skin.html` 열고 DevTools Console에 JS 에러 없는지 확인.

- [ ] **Step 11: 불필요해진 JS 파일 삭제**

```bash
git rm images/slider-changer.js images/hamburger-button.js
```

- [ ] **Step 12: Commit**

```bash
git add skin.html style.css
git commit -m "refactor: remove FAB, sliders, cover-categories, snap-scroll, old JS files"
```

---

## Task 2: index.xml 커버 정의 업데이트

**수정 파일:** `index.xml`

- [ ] **Step 1: index.xml `<cover>` 블록을 아래로 교체**

```xml
  <cover>
    <item>
      <name>cover-hero</name>
      <label><![CDATA[히어로]]></label>
      <description><![CDATA[하프 히어로 + 인라인 네비게이션]]></description>
    </item>
    <item>
      <name>cover-grid</name>
      <label><![CDATA[홈 메인]]></label>
      <description><![CDATA[TOP POSTS 2×2 + LATEST 피드 + 사이드바]]></description>
    </item>
  </cover>
```

- [ ] **Step 2: Commit**

```bash
git add index.xml
git commit -m "chore: update index.xml cover definitions (cover-hero, cover-grid)"
```

---

## Task 3: 하프 히어로 + 인라인 네비게이션 (`cover-hero`)

**수정 파일:** `skin.html`

기존 `<s_cover name="cover-slider">` 전체를 교체.

- [ ] **Step 1: 기존 cover-slider 섹션 전체를 아래로 교체**

```html
            <s_cover name="cover-hero">
              <section
                id="hero-section"
                class="relative w-full h-[50vh] flex flex-col justify-between p-5 bg-gradient-to-b from-gray-800 to-black"
              >
                <!-- 인라인 네비게이션 -->
                <div class="flex items-center justify-between">
                  <a href="/" class="font-english font-bold text-pink-300 tracking-widest text-sm select-none">
                    CHOCOLAT
                  </a>
                  <nav class="flex items-center gap-5">
                    <a href="/" class="font-ko text-gray-400 hover:text-gray-200 text-sm transition duration-200">홈</a>
                    <a href="/category" class="font-ko text-gray-400 hover:text-gray-200 text-sm transition duration-200">카테고리</a>
                    <a href="/tag" class="font-ko text-gray-400 hover:text-gray-200 text-sm transition duration-200">태그</a>
                    <button id="hero-search-btn" class="text-gray-400 hover:text-pink-300 transition duration-200" aria-label="검색">
                      <i class="fa fa-search text-sm"></i>
                    </button>
                  </nav>
                </div>
                <!-- 타이프라이터 -->
                <div class="flex items-center gap-4 select-none">
                  <span
                    id="typewriter"
                    class="font-welcome text-white break-words text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                  >
                    [##_cover_title_##]
                  </span>
                  <span class="w-[2.5px] h-[1.1em] bg-pink-300 animate-blink flex-shrink-0"></span>
                </div>
                <!-- 서브 태그라인 -->
                <div class="font-ko text-gray-500 text-sm tracking-wider">
                  Python · Java · 자율주행 · 프로젝트
                </div>
              </section>
            </s_cover>
```

- [ ] **Step 2: 빌드 + 브라우저 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- 히어로가 화면 절반(50vh)을 차지하는지
- 상단에 로고·네비 링크가 보이는지
- 타이프라이터 텍스트가 하단에 위치하는지
- 아래로 스크롤 시 다음 섹션이 살짝 보이는지

- [ ] **Step 3: Commit**

```bash
git add skin.html
git commit -m "feat: replace full-screen slider with 50vh half-hero + inline nav"
```

---

## Task 4: Sticky Navigation JS

**생성 파일:** `images/sticky-nav.js`

히어로가 뷰포트를 벗어나면 상단 고정 바가 나타나고, 검색 모달 제어도 담당.

- [ ] **Step 1: 읽기 진행 바 + sticky nav HTML을 `<body>` 열리자마자 추가**

`skin.html`의 `<body id="[##_body_id_##]"...>` 바로 아래에 삽입:
```html
    <!-- 읽기 진행 바 (아티클 페이지에서만 표시) -->
    <div
      id="reading-progress"
      class="fixed top-0 left-0 h-0.5 z-50 w-0 hidden"
      style="background: linear-gradient(to right, #f9a8d4, #fde047); transition: width 0.1s linear;"
    ></div>

    <!-- Sticky Navigation (히어로 스크롤 후 등장) -->
    <nav
      id="sticky-nav"
      class="fixed top-0 left-0 right-0 z-40 h-12 flex items-center justify-between px-5 border-b border-gray-800"
      style="background: rgba(17,17,17,0.97); backdrop-filter: blur(8px); transform: translateY(-100%); opacity: 0; transition: transform 0.3s ease, opacity 0.3s ease;"
    >
      <a href="/" class="font-english font-bold text-pink-300 tracking-widest text-sm">CHOCOLAT</a>
      <div class="flex items-center gap-5">
        <a href="/" class="font-ko text-gray-400 hover:text-gray-200 text-sm transition duration-200">홈</a>
        <a href="/category" class="font-ko text-gray-400 hover:text-gray-200 text-sm transition duration-200">카테고리</a>
        <a href="/tag" class="font-ko text-gray-400 hover:text-gray-200 text-sm transition duration-200">태그</a>
        <button id="sticky-search-btn" class="text-gray-400 hover:text-pink-300 transition duration-200" aria-label="검색">
          <i class="fa fa-search text-sm"></i>
        </button>
      </div>
    </nav>
```

- [ ] **Step 2: `images/sticky-nav.js` 생성**

```javascript
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
```

- [ ] **Step 3: 검색 모달 `z-index` 확인**

`skin.html`의 `#search-modal` div가 `z-index: 20` (sticky nav z-40 아래)인지 확인.
현재 `style.css`에 `#search-modal { z-index: 20; }`이 있으면 OK. 없으면 추가.

- [ ] **Step 4: 빌드 + 브라우저 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- 히어로 안에서 sticky nav가 보이지 않는지
- 스크롤해서 히어로 지나면 상단 바가 부드럽게 나타나는지
- 검색 버튼 클릭 시 검색 모달이 뜨는지
- Esc 키로 모달이 닫히는지

- [ ] **Step 5: Commit**

```bash
git add skin.html images/sticky-nav.js style.css
git commit -m "feat: add sticky nav with IntersectionObserver hero sentinel"
```

---

## Task 5: 읽기 진행 바

**생성 파일:** `images/reading-progress.js`

아티클 페이지(`#article-view` 존재 시)에만 진행 바가 노출.

- [ ] **Step 1: `images/reading-progress.js` 생성**

```javascript
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
```

- [ ] **Step 2: 빌드 + 아티클 페이지에서 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- 홈 페이지에서 진행 바가 보이지 않는지 (`#article-view` 없으므로)
- 아티클 페이지 스크롤 시 상단에 분홍→노랑 그라디언트 바가 채워지는지

- [ ] **Step 3: Commit**

```bash
git add images/reading-progress.js
git commit -m "feat: add reading progress bar (article pages only)"
```

---

## Task 6: 홈 — 2컬럼 레이아웃 + TOP POSTS + LATEST 피드 (`cover-grid` 재구성)

**수정 파일:** `skin.html`

기존 `<s_cover name="cover-grid">` 전체를 TOP POSTS 2×2 + LATEST 피드 + 사이드바를 담는 2컬럼 레이아웃으로 교체. 아래 Step에서 사이드바는 빈 placeholder만 넣고 Task 7에서 채운다.

- [ ] **Step 1: 기존 `<s_cover name="cover-grid">` 전체를 아래로 교체**

```html
            <s_cover name="cover-grid">
              <div class="flex flex-col lg:flex-row gap-5 p-5 bg-[#0d0d0d]">

                <!-- ── 피드 컬럼 ── -->
                <div class="flex-1 min-w-0 flex flex-col gap-8">

                  <!-- TOP POSTS 2×2 -->
                  <section id="section-top-posts">
                    <div class="flex items-center gap-3 mb-4">
                      <span class="font-english text-xs font-bold tracking-widest text-yellow-300">TOP POSTS</span>
                      <div class="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">

                      <!-- ★ 핀 글 1 — URL·썸네일·카테고리·제목·조회수를 실제 값으로 교체 -->
                      <a href="/글URL1" class="custom-card bg-gray-800 group overflow-hidden rounded-lg block">
                        <div class="relative">
                          <img
                            class="w-full h-32 object-cover"
                            loading="lazy"
                            src="//i1.daumcdn.net/thumb/C300x200.fwebp.q85/?fname=썸네일URL1"
                            alt=""
                          />
                          <span class="absolute top-2 right-2 bg-black/70 text-yellow-300 text-xs font-bold px-2 py-0.5 rounded-md">
                            👁 1.2k
                          </span>
                        </div>
                        <div class="p-3">
                          <span class="inline-block font-ko font-bold text-xs rounded-3xl bg-pink-300 text-gray-900 px-2 py-0.5 mb-1">카테고리1</span>
                          <div class="font-highlight font-bold text-sm text-yellow-300 line-clamp-2">글 제목1</div>
                        </div>
                      </a>

                      <!-- ★ 핀 글 2 -->
                      <a href="/글URL2" class="custom-card bg-gray-800 group overflow-hidden rounded-lg block">
                        <div class="relative">
                          <img
                            class="w-full h-32 object-cover"
                            loading="lazy"
                            src="//i1.daumcdn.net/thumb/C300x200.fwebp.q85/?fname=썸네일URL2"
                            alt=""
                          />
                          <span class="absolute top-2 right-2 bg-black/70 text-yellow-300 text-xs font-bold px-2 py-0.5 rounded-md">
                            👁 980
                          </span>
                        </div>
                        <div class="p-3">
                          <span class="inline-block font-ko font-bold text-xs rounded-3xl bg-pink-300 text-gray-900 px-2 py-0.5 mb-1">카테고리2</span>
                          <div class="font-highlight font-bold text-sm text-yellow-300 line-clamp-2">글 제목2</div>
                        </div>
                      </a>

                      <!-- ★ 핀 글 3 -->
                      <a href="/글URL3" class="custom-card bg-gray-800 group overflow-hidden rounded-lg block">
                        <div class="relative">
                          <img
                            class="w-full h-32 object-cover"
                            loading="lazy"
                            src="//i1.daumcdn.net/thumb/C300x200.fwebp.q85/?fname=썸네일URL3"
                            alt=""
                          />
                          <span class="absolute top-2 right-2 bg-black/70 text-yellow-300 text-xs font-bold px-2 py-0.5 rounded-md">
                            👁 741
                          </span>
                        </div>
                        <div class="p-3">
                          <span class="inline-block font-ko font-bold text-xs rounded-3xl bg-pink-300 text-gray-900 px-2 py-0.5 mb-1">카테고리3</span>
                          <div class="font-highlight font-bold text-sm text-yellow-300 line-clamp-2">글 제목3</div>
                        </div>
                      </a>

                      <!-- ★ 핀 글 4 -->
                      <a href="/글URL4" class="custom-card bg-gray-800 group overflow-hidden rounded-lg block">
                        <div class="relative">
                          <img
                            class="w-full h-32 object-cover"
                            loading="lazy"
                            src="//i1.daumcdn.net/thumb/C300x200.fwebp.q85/?fname=썸네일URL4"
                            alt=""
                          />
                          <span class="absolute top-2 right-2 bg-black/70 text-yellow-300 text-xs font-bold px-2 py-0.5 rounded-md">
                            👁 603
                          </span>
                        </div>
                        <div class="p-3">
                          <span class="inline-block font-ko font-bold text-xs rounded-3xl bg-pink-300 text-gray-900 px-2 py-0.5 mb-1">카테고리4</span>
                          <div class="font-highlight font-bold text-sm text-yellow-300 line-clamp-2">글 제목4</div>
                        </div>
                      </a>

                    </div>
                  </section>

                  <!-- LATEST 피드 -->
                  <section id="section-latest">
                    <div class="flex items-center gap-3 mb-4">
                      <span class="font-english text-xs font-bold tracking-widest text-yellow-300">LATEST</span>
                      <div class="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <ul class="flex flex-col gap-3">
                      <s_cover_item>
                        <li class="custom-card custom-card-recent hover:bg-gray-700 transition duration-200 rounded-lg overflow-hidden">
                          <a href="[##_cover_item_url_##]">
                            <figure class="flex gap-3 p-3 items-center">
                              <s_cover_item_thumbnail>
                                <div class="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                  <img
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                    src="//i1.daumcdn.net/thumb/C200x200.fwebp.q85/?fname=[##_cover_item_thumbnail_##]"
                                    alt=""
                                  />
                                </div>
                              </s_cover_item_thumbnail>
                              <div class="flex-1 min-w-0">
                                <s_cover_item_article_info>
                                  <span class="inline-block font-ko font-bold text-xs rounded-3xl bg-pink-300 text-gray-900 px-2 py-0.5 mb-1">
                                    [##_cover_item_category_##]
                                  </span>
                                </s_cover_item_article_info>
                                <div class="font-highlight font-bold text-sm sm:text-base text-yellow-300 line-clamp-2 mb-1">
                                  [##_cover_item_title_##]
                                </div>
                                <div class="font-ko text-xs text-gray-400 line-clamp-1">
                                  [##_cover_item_summary_##]
                                </div>
                              </div>
                            </figure>
                          </a>
                        </li>
                      </s_cover_item>
                    </ul>
                  </section>

                </div>
                <!-- ── 피드 컬럼 끝 ── -->

                <!-- ── 사이드바 (Task 7에서 채움) ── -->
                <aside id="home-sidebar" class="hidden lg:flex flex-col gap-6 w-64 flex-shrink-0">
                  <!-- placeholder: Task 7에서 내용 추가 -->
                </aside>

              </div>
            </s_cover>
```

- [ ] **Step 2: 빌드 + 브라우저 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- TOP POSTS 2×2 그리드가 히어로 아래 나타나는지
- LATEST 피드에 `<s_cover_item>` 아이템들이 렌더링되는지 (Tistory 환경에서는 실제 글 목록 표시)
- 로컬에서는 빈 리스트로 보여도 구조(레이아웃)가 맞는지 확인

- [ ] **Step 3: Commit**

```bash
git add skin.html
git commit -m "feat: add home 2-col layout with TOP POSTS 2x2 and LATEST feed"
```

---

## Task 7: 홈 — 사이드바 (프로필 + 카테고리 + 태그)

**수정 파일:** `skin.html`

Task 6에서 빈 placeholder로 둔 `<aside id="home-sidebar">` 내용을 채운다.

- [ ] **Step 1: `<aside id="home-sidebar">` 내용을 아래로 교체**

```html
                <aside id="home-sidebar" class="hidden lg:flex flex-col gap-6 w-64 flex-shrink-0">

                  <!-- 프로필 카드 -->
                  <div class="bg-gray-800 rounded-xl p-5 flex flex-col items-center gap-3 text-center border border-gray-700">
                    <div class="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-pink-300 to-yellow-300 flex-shrink-0">
                      <img
                        src="https://github.com/BBAAMM.png"
                        alt="프로필"
                        class="w-full h-full object-cover"
                        onerror="this.parentElement.innerHTML='<span class=\'text-2xl\'>🍫</span>'"
                      />
                    </div>
                    <div>
                      <div class="font-highlight font-bold text-gray-200 text-sm">김승범</div>
                      <div class="font-ko text-gray-400 text-xs mt-1 leading-relaxed">
                        개발 시행착오와 프로젝트를 기록합니다
                      </div>
                    </div>
                    <div class="flex gap-3">
                      <a
                        href="https://github.com/BBAAMM"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-400 hover:text-pink-300 transition duration-200"
                        aria-label="GitHub"
                      >
                        <i class="fa-brands fa-github text-lg"></i>
                      </a>
                      <a
                        href="mailto:developer.ksb@gmail.com"
                        class="text-gray-400 hover:text-pink-300 transition duration-200"
                        aria-label="이메일"
                      >
                        <i class="fa fa-envelope text-lg"></i>
                      </a>
                    </div>
                  </div>

                  <!-- 카테고리 (하드코딩 — 실제 카테고리 URL·글 수로 교체) -->
                  <div>
                    <div class="flex items-center gap-3 mb-3">
                      <span class="font-english text-xs font-bold tracking-widest text-yellow-300">CATEGORIES</span>
                      <div class="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <ul class="flex flex-col gap-1">
                      <li>
                        <a href="/category/팀%20프로젝트" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-gray-100 transition duration-200">
                          <span class="w-2 h-2 rounded-full bg-pink-300 flex-shrink-0"></span>
                          <span class="font-ko text-sm flex-1">팀 프로젝트</span>
                          <span class="text-gray-600 text-xs">12</span>
                        </a>
                      </li>
                      <li>
                        <a href="/category/팀%20프로젝트/자율주행%20개발%28baqu4%29" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-gray-100 transition duration-200">
                          <span class="w-2 h-2 rounded-full bg-yellow-300 flex-shrink-0"></span>
                          <span class="font-ko text-sm flex-1">자율주행 개발</span>
                          <span class="text-gray-600 text-xs">8</span>
                        </a>
                      </li>
                      <li>
                        <a href="/category/Python" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-gray-100 transition duration-200">
                          <span class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                          <span class="font-ko text-sm flex-1">Python</span>
                          <span class="text-gray-600 text-xs">15</span>
                        </a>
                      </li>
                      <li>
                        <a href="/category/Java" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-gray-100 transition duration-200">
                          <span class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                          <span class="font-ko text-sm flex-1">Java</span>
                          <span class="text-gray-600 text-xs">6</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <!-- 태그 (하드코딩 — 실제 태그·URL로 교체) -->
                  <div>
                    <div class="flex items-center gap-3 mb-3">
                      <span class="font-english text-xs font-bold tracking-widest text-yellow-300">TAGS</span>
                      <div class="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <a href="/tag/Python" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-yellow-300 hover:border-yellow-300 transition duration-200">#Python</a>
                      <a href="/tag/자율주행" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-pink-300 hover:border-pink-300 transition duration-200">#자율주행</a>
                      <a href="/tag/Java" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-gray-200 hover:border-gray-500 transition duration-200">#Java</a>
                      <a href="/tag/딥러닝" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-yellow-300 hover:border-yellow-300 transition duration-200">#딥러닝</a>
                      <a href="/tag/프로젝트" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-pink-300 hover:border-pink-300 transition duration-200">#프로젝트</a>
                      <a href="/tag/MBTI" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-gray-200 hover:border-gray-500 transition duration-200">#MBTI</a>
                      <a href="/tag/알고리즘" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-gray-200 hover:border-gray-500 transition duration-200">#알고리즘</a>
                    </div>
                  </div>

                </aside>
```

- [ ] **Step 2: 빌드 + 브라우저 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- 데스크탑(≥1024px)에서 사이드바가 피드 오른쪽에 표시되는지
- 모바일(< 1024px)에서 사이드바가 숨겨지는지 (`hidden lg:flex`)
- 프로필 이미지 로드 실패 시 이모지 fallback이 표시되는지
- 카테고리 hover 색상이 적용되는지

- [ ] **Step 3: Commit**

```bash
git add skin.html
git commit -m "feat: add home sidebar with profile, categories, tags"
```

---

## Task 8: 아티클 헤더 재설계 (브레드크럼 + 40vh + 읽기 시간 슬롯)

**수정 파일:** `skin.html`

`<s_permalink_article_rep>` 내 `.title-header` 블록을 교체.

- [ ] **Step 1: `<main>` 클래스에서 `justify-center items-center` 제거**

기존:
```html
    <main class="w-screen flex flex-col justify-center items-center">
```
교체 후:
```html
    <main class="w-screen flex flex-col">
```
(2컬럼 레이아웃은 자체 `max-w-screen-xl mx-auto`로 중앙 정렬하므로 `items-center` 불필요)

- [ ] **Step 2: `.title-header` div 전체를 아래로 교체**

기존:
```html
                <div
                  class="title-header w-full h-[70vh] flex flex-col justify-center items-center gap-5 bg-gradient-to-br from-yellow-900 via-gray-800 to-gray-900"
                >
                  <a class="..." href="[##_article_rep_category_link_##]">[##_article_rep_category_##]</a>
                  <h1 class="text-center text-responsive font-bold text-yellow-300">...</h1>
                  <div class="text-center text-base font-semibold text-gray-400">
                    <span class="author">[##_article_rep_author_##]</span>
                    <span class="date">[##_article_rep_date_##]</span>
                  </div>
                </div>
```

교체 후:
```html
                <div
                  class="title-header w-full min-h-[40vh] flex flex-col justify-end pb-8 px-5 md:px-10 bg-gradient-to-br from-yellow-900 via-gray-800 to-gray-900"
                >
                  <!-- 브레드크럼 -->
                  <nav class="flex items-center gap-2 text-xs text-gray-500 mb-4 font-ko" aria-label="breadcrumb">
                    <a href="/" class="hover:text-gray-300 transition duration-200">홈</a>
                    <span class="text-gray-700">/</span>
                    <a href="[##_article_rep_category_link_##]" class="hover:text-pink-300 transition duration-200">
                      [##_article_rep_category_##]
                    </a>
                  </nav>
                  <!-- 제목 -->
                  <h1 class="text-responsive font-bold text-yellow-300 mb-4 leading-tight">
                    [##_article_rep_title_##]
                  </h1>
                  <!-- 메타 -->
                  <div class="flex flex-wrap items-center gap-3">
                    <a
                      class="w-fit p-2 rounded-3xl text-sm text-gray-200 font-semibold bg-gray-800 hover:text-yellow-200 hover:bg-pink-300 transition duration-200"
                      href="[##_article_rep_category_link_##]"
                    >[##_article_rep_category_##]</a>
                    <span class="font-ko text-sm text-gray-400">[##_article_rep_author_##]</span>
                    <span class="font-ko text-sm text-gray-400">[##_article_rep_date_##]</span>
                    <span class="font-ko text-sm text-gray-500 flex items-center gap-1">
                      <i class="fa fa-clock text-xs"></i>
                      <span id="reading-time">--</span> 읽기
                    </span>
                  </div>
                </div>
```

- [ ] **Step 3: 빌드 + 브라우저 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- 헤더 높이가 40vh로 줄어 본문이 더 빨리 나타나는지
- 브레드크럼이 상단에, 제목이 중간, 메타(카테고리·작성자·날짜·읽기시간)가 하단에 배치되는지
- `id="reading-time"` 요소가 `--`로 표시되는지 (Task 9 전)

- [ ] **Step 4: Commit**

```bash
git add skin.html
git commit -m "feat: redesign article header — 40vh, breadcrumb, reading time slot"
```

---

## Task 9: 읽기 시간 JS

**생성 파일:** `images/reading-time.js`

- [ ] **Step 1: `images/reading-time.js` 생성**

```javascript
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
```

- [ ] **Step 2: 빌드 + 아티클 페이지에서 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- 아티클 헤더에 `N분 읽기` 형태로 표시되는지
- 짧은 글(< 400자)은 `1분`으로 표시되는지

- [ ] **Step 3: Commit**

```bash
git add images/reading-time.js
git commit -m "feat: add reading time estimation from article character count"
```

---

## Task 10: 아티클 — 스티키 TOC 레이아웃 + toc-generator.js

**수정 파일:** `skin.html`  
**생성 파일:** `images/toc-generator.js`, `style.css` (TOC active 스타일 추가)

- [ ] **Step 1: `<s_permalink_article_rep>` 내 본문 영역 전체를 2컬럼 레이아웃으로 교체**

헤더 `</div>` 닫는 태그 이후부터 `</s_rp>` 앞까지, 즉 기존:
```html
                <section
                  class="w-[95vw] sm:w-[90vw] md:w-[80vw] justify-center items-center mt-10 mb-10 ..."
                >
                  <div class="post-content content-details ..." id="article-view">
                    [##_article_rep_desc_##]
                  </div>
                  <s_tag_label>...</s_tag_label>
                </section>
                <s_article_related>...</s_article_related>
                <s_rp>...</s_rp>
```
을 아래로 교체:

```html
                <!-- 2컬럼: 본문 + 스티키 TOC -->
                <div class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 flex gap-8 mt-10 mb-10 items-start">

                  <!-- 본문 컬럼 -->
                  <div class="flex-1 min-w-0 flex flex-col gap-6">

                    <!-- 모바일 접이식 TOC (lg 미만에서 표시) -->
                    <details id="toc-mobile-container" class="lg:hidden bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <summary class="font-english text-xs font-bold tracking-widest text-yellow-300 cursor-pointer select-none">
                        목차
                      </summary>
                      <nav id="toc-mobile-nav" class="mt-3 flex flex-col gap-1"></nav>
                    </details>

                    <!-- 아티클 본문 -->
                    <section class="p-7 md:p-10 lg:p-16 rounded-t-3xl rounded-b-xl bg-gray-800 text-gray-200 shadow-2xl shadow-black">
                      <div
                        class="post-content content-details text-base lg:text-lg"
                        id="article-view"
                      >
                        [##_article_rep_desc_##]
                      </div>
                      <s_tag_label>
                        <div class="tags mt-8 pt-6 border-t border-gray-700">
                          <div class="flex flex-wrap gap-2 items-center">
                            [##_tag_label_rep_##]
                          </div>
                        </div>
                      </s_tag_label>
                    </section>

                  </div>
                  <!-- 본문 컬럼 끝 -->

                  <!-- 스티키 TOC (lg 이상에서 표시) -->
                  <aside id="article-toc" class="hidden lg:block w-56 flex-shrink-0">
                    <div class="sticky top-20">
                      <div class="font-english text-xs font-bold tracking-widest text-yellow-300 mb-4">목차</div>
                      <nav id="toc-desktop-nav" class="toc-nav flex flex-col gap-1"></nav>
                    </div>
                  </aside>

                </div>
                <!-- 2컬럼 끝 -->

                <!-- 관련 글 -->
                <s_article_related>
                  <div class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 mb-10">
                    <div class="related-articles p-7 md:p-10 rounded-t-3xl rounded-b-xl bg-gray-800 text-gray-200 shadow-2xl shadow-black">
                      <h2>
                        <strong class="text-xl font-highlight">'[##_article_rep_category_##]'</strong>
                      </h2>
                      <ul class="flex flex-col gap-3 mt-4">
                        <s_article_related_rep>
                          <li class="w-full flex flex-col justify-center items-center rounded-2xl bg-gray-700">
                            <a
                              class="w-full flex text-md items-center justify-between p-5 font-ko text-gray-200"
                              href="[##_article_related_rep_link_##]"
                            >
                              <span class="text-md font-ko font-bold">[##_article_related_rep_title_##]</span>
                              <span class="thum">
                                <s_article_related_rep_thumbnail>
                                  <img
                                    class="rounded-3xl"
                                    loading="lazy"
                                    src="//i1.daumcdn.net/thumb/C50x50.fwebp.q85/?fname=[##_article_related_rep_thumbnail_link_##]"
                                    alt=""
                                  />
                                </s_article_related_rep_thumbnail>
                              </span>
                            </a>
                          </li>
                        </s_article_related_rep>
                      </ul>
                    </div>
                  </div>
                </s_article_related>

                <!-- 댓글 -->
                <s_rp>
                  <section class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 mb-10">
                    [##_comment_group_##]
                  </section>
                </s_rp>
```

- [ ] **Step 2: `images/toc-generator.js` 생성**

```javascript
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
        .replace(/[^\w가-힣-]/g, ""); // 한글 허용
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
  // rootMargin "-80px": sticky nav(48px) + 여유, "-60%": 하단 60% 무시
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
```

- [ ] **Step 3: `style.css`에 TOC active 스타일 추가**

`style.css`의 `@layer utilities { }` 안에 추가:
```css
  /* TOC 현재 섹션 하이라이트 */
  .toc-nav .toc-link.active {
    @apply text-pink-300 font-semibold;
  }
```

- [ ] **Step 4: 빌드 + 브라우저 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- 데스크탑(≥1024px)에서 오른쪽에 TOC 사이드바가 보이는지
- 스크롤 시 현재 섹션 링크가 분홍색으로 하이라이트 되는지
- TOC 링크 클릭 시 해당 헤딩으로 스크롤되는지
- 모바일에서 `<details>` 요약 탭이 열리면 TOC 목록이 나타나는지
- 본문에 h2/h3가 없는 글에서 TOC가 아예 사라지는지

- [ ] **Step 5: Commit**

```bash
git add skin.html images/toc-generator.js style.css
git commit -m "feat: add sticky TOC sidebar with IntersectionObserver active highlight"
```

---

## Task 11: 카테고리/태그 목록 페이지 — 2컬럼 + 필터 사이드바

**수정 파일:** `skin.html`

`<s_list>` 섹션을 2컬럼 레이아웃(글 목록 + 필터 사이드바)으로 재구성.

- [ ] **Step 1: `<s_list>` 전체를 아래로 교체**

기존 `<s_list>` ~ `</s_list>` 전체를:

```html
          <s_list>
            <section class="w-full min-h-screen bg-[#0d0d0d] text-gray-200">

              <!-- 카테고리 헤더 -->
              <header class="w-full bg-gradient-to-br from-gray-800 to-gray-900 px-6 py-10">
                <h1 class="font-highlight text-2xl md:text-3xl text-pink-200 mb-1">
                  [##_list_conform_##]
                </h1>
                <p id="list-count" class="font-ko text-sm text-gray-500"></p>
              </header>

              <!-- 2컬럼: 글 목록 + 필터 사이드바 -->
              <div class="flex flex-col lg:flex-row gap-5 p-5 max-w-screen-xl mx-auto">

                <!-- 글 목록 -->
                <div class="flex-1 min-w-0">
                  <ul class="flex flex-col gap-3" id="list-items">
                    <s_list_rep>
                      <li class="custom-card custom-card-recent bg-gray-800 hover:bg-gray-700 transition duration-200 rounded-lg overflow-hidden">
                        <a
                          href="[##_list_rep_link_##]"
                          data-tiara-action-name="블로그글_클릭"
                          data-tiara-action-kind="ClickContent"
                          data-tiara-copy="[##_list_rep_title_text_##]"
                          data-tiara-image="[##_list_rep_thumbnail_url_##]"
                          data-tiara-click_url="[##_blog_link_##][##_list_rep_link_##]"
                          data-tiara-name="[##_list_rep_title_text_##]"
                          data-tiara-provider="[##_title_##]"
                          data-tiara-plink="[##_list_rep_link_##]"
                          data-tiara-id="[##_list_rep_link_##]"
                        >
                          <figure class="flex gap-3 p-3 items-center">
                            <div class="flex-1 min-w-0">
                              <div class="inline-block font-ko font-bold text-xs rounded-3xl bg-pink-300 text-gray-900 px-2 py-0.5 mb-1">
                                [##_list_rep_category_##]
                              </div>
                              <div class="font-highlight font-bold text-sm sm:text-xl text-yellow-300 line-clamp-2 mb-1">
                                [##_list_rep_title_##]
                              </div>
                              <div class="font-ko text-xs sm:text-sm text-gray-400 line-clamp-2">
                                [##_list_rep_summary_##]
                              </div>
                            </div>
                            <s_list_rep_thumbnail>
                              <div class="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden">
                                <img
                                  class="w-full h-full object-cover"
                                  loading="lazy"
                                  src="//i1.daumcdn.net/thumb/C300x300.fwebp.q85/?fname=[##_list_rep_thumbnail_raw_url_##]"
                                  alt=""
                                />
                              </div>
                            </s_list_rep_thumbnail>
                          </figure>
                        </a>
                      </li>
                    </s_list_rep>
                  </ul>
                </div>
                <!-- 글 목록 끝 -->

                <!-- 필터 사이드바 (홈 사이드바와 동일 컴포넌트, 프로필 제외) -->
                <aside class="hidden lg:flex flex-col gap-6 w-64 flex-shrink-0">

                  <!-- 카테고리 필터 (홈 사이드바와 동일 — URL·글 수 교체) -->
                  <div>
                    <div class="flex items-center gap-3 mb-3">
                      <span class="font-english text-xs font-bold tracking-widest text-yellow-300">CATEGORIES</span>
                      <div class="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <ul class="flex flex-col gap-1">
                      <li>
                        <a href="/category/팀%20프로젝트" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-gray-100 transition duration-200">
                          <span class="w-2 h-2 rounded-full bg-pink-300 flex-shrink-0"></span>
                          <span class="font-ko text-sm flex-1">팀 프로젝트</span>
                          <span class="text-gray-600 text-xs">12</span>
                        </a>
                      </li>
                      <li>
                        <a href="/category/팀%20프로젝트/자율주행%20개발%28baqu4%29" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-gray-100 transition duration-200">
                          <span class="w-2 h-2 rounded-full bg-yellow-300 flex-shrink-0"></span>
                          <span class="font-ko text-sm flex-1">자율주행 개발</span>
                          <span class="text-gray-600 text-xs">8</span>
                        </a>
                      </li>
                      <li>
                        <a href="/category/Python" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-gray-100 transition duration-200">
                          <span class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                          <span class="font-ko text-sm flex-1">Python</span>
                          <span class="text-gray-600 text-xs">15</span>
                        </a>
                      </li>
                      <li>
                        <a href="/category/Java" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-gray-100 transition duration-200">
                          <span class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"></span>
                          <span class="font-ko text-sm flex-1">Java</span>
                          <span class="text-gray-600 text-xs">6</span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <!-- 태그 필터 -->
                  <div>
                    <div class="flex items-center gap-3 mb-3">
                      <span class="font-english text-xs font-bold tracking-widest text-yellow-300">TAGS</span>
                      <div class="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <a href="/tag/Python" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-yellow-300 hover:border-yellow-300 transition duration-200">#Python</a>
                      <a href="/tag/자율주행" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-pink-300 hover:border-pink-300 transition duration-200">#자율주행</a>
                      <a href="/tag/Java" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-gray-200 hover:border-gray-500 transition duration-200">#Java</a>
                      <a href="/tag/딥러닝" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-yellow-300 hover:border-yellow-300 transition duration-200">#딥러닝</a>
                      <a href="/tag/프로젝트" class="border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-pink-300 hover:border-pink-300 transition duration-200">#프로젝트</a>
                    </div>
                  </div>

                </aside>

              </div>
            </section>

            <!-- 글 개수 카운트 (JS) -->
            <script>
              document.addEventListener("DOMContentLoaded", function () {
                const items = document.querySelectorAll("#list-items li");
                const countEl = document.getElementById("list-count");
                if (countEl && items.length > 0) {
                  countEl.textContent = "글 " + items.length + "개";
                }
              });
            </script>
          </s_list>
```

> **주의:** `<script>` 태그를 `<s_list>` 안에 직접 넣는 것은 Tistory에서 허용됨. 단, Tistory 스킨 업로드 시 script 태그가 제거될 경우 글 개수 카운트 기능은 생략 가능 (단순 표시 기능).

- [ ] **Step 2: 빌드 + 브라우저 확인**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
확인 사항:
- 카테고리 헤더에 카테고리명이 표시되는지
- 데스크탑에서 글 목록 + 오른쪽 사이드바 2컬럼 레이아웃인지
- 모바일에서 사이드바가 숨겨지는지
- 글 목록 hover 시 배경 변하는지

- [ ] **Step 3: Commit**

```bash
git add skin.html
git commit -m "feat: redesign list page with 2-col layout and filter sidebar"
```

---

## Task 12: 최종 빌드 + 검증

**수정 파일:** `output.css`, `.gitignore`

- [ ] **Step 1: `.gitignore`에 `.superpowers/` 추가 (미추가 시)**

```bash
grep -q ".superpowers" .gitignore || echo ".superpowers/" >> .gitignore
```

- [ ] **Step 2: 최종 Tailwind 빌드**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```
예상 출력: `Done in Xs.`

- [ ] **Step 3: 홈 페이지 점검 체크리스트**

브라우저(데스크탑 1440px, 모바일 375px) 직접 확인:
- [ ] 히어로 50vh, 인라인 네비 표시
- [ ] 히어로 아래 콘텐츠 살짝 보임 (스크롤 유발)
- [ ] 타이프라이터 애니메이션 작동
- [ ] 스크롤 시 sticky nav fade-in
- [ ] TOP POSTS 2×2 카드 표시
- [ ] LATEST 피드 `<s_cover_item>` 글 목록 표시
- [ ] 데스크탑 사이드바 표시 / 모바일 사이드바 숨김
- [ ] 검색 아이콘 클릭 → 검색 모달 열림
- [ ] JS 콘솔 에러 없음

- [ ] **Step 4: 아티클 페이지 점검 체크리스트**

- [ ] 읽기 진행 바 (상단 분홍→노랑 바) 스크롤 시 채워짐
- [ ] 헤더 40vh, 브레드크럼, 읽기 시간 표시
- [ ] 데스크탑 우측 sticky TOC 표시
- [ ] 스크롤 시 TOC 현재 섹션 분홍 하이라이트
- [ ] TOC 링크 클릭 → 해당 섹션으로 스크롤
- [ ] 모바일 접이식 TOC 동작
- [ ] 관련 글, 댓글 섹션 표시

- [ ] **Step 5: 목록 페이지 점검 체크리스트**

- [ ] 카테고리명 + 글 개수 표시
- [ ] 데스크탑 2컬럼 (글 목록 + 사이드바)
- [ ] 모바일 1컬럼 (사이드바 숨김)

- [ ] **Step 6: 최종 커밋**

```bash
git add output.css .gitignore
git commit -m "build: rebuild output.css after full redesign"
```

---

## 빠른 참조

| 커버명 | 파일 내 위치 | 역할 |
|---|---|---|
| `cover-hero` | `<s_cover name="cover-hero">` | 50vh 히어로 + 인라인 네비 |
| `cover-grid` | `<s_cover name="cover-grid">` | TOP POSTS + LATEST + 사이드바 |

| JS 파일 | 의존 DOM id | 역할 |
|---|---|---|
| `sticky-nav.js` | `#hero-section`, `#sticky-nav`, `#search-modal` | sticky nav + 검색 |
| `reading-progress.js` | `#reading-progress`, `#article-view` | 진행 바 |
| `reading-time.js` | `#article-view`, `#reading-time` | 읽기 시간 |
| `toc-generator.js` | `#article-view`, `#toc-desktop-nav`, `#toc-mobile-nav` | TOC |
