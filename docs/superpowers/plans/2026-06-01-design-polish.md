# Design Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 구현된 컴포넌트의 다크 테마 일관성을 확보하고 CSS 버그와 UX 개선 7개 항목을 수정한다.

**Architecture:** 컴포넌트별 순차 수정. 각 태스크는 독립적이며, 마지막 태스크에서 Tailwind CSS를 빌드해 output.css를 생성한다. Tistory 치환자 태그(`[##_..._##]`, `<s_...>`) 구조는 절대 변경하지 않는다.

**Tech Stack:** HTML (Tistory 치환자), Tailwind CSS (style.css → output.css), Vanilla JS (GSAP), FontAwesome CDN

---

## 파일 변경 범위

| 파일 | 변경 이유 |
|---|---|
| `style.css` | CSS 전역 오염 버그 수정, `.custom-card-recent` 다크화 |
| `index.html` | 검색 모달, 카테고리 모달, 아티클 헤더, 최근 글 섹션, 슬라이더 인디케이터 |
| `images/hamburger-button.js` | 카테고리 모달 닫기 버튼, FAB 아이콘 토글 |
| `images/slider-changer.js` | 숫자 인디케이터 업데이트 로직 |
| `output.css` | Tailwind 빌드 결과물 (직접 편집 금지) |

---

## Task 1: CSS 전역 오염 버그 수정 + custom-card-recent 다크화

**Files:**
- Modify: `style.css:39-52`

- [ ] **Step 1: 현재 상태 확인**

```bash
grep -n "h1," style.css
grep -n "custom-card-recent" style.css
```

Expected:
```
44:  .content-details h1,
45:  h2 {
39:  .custom-card-recent {
```

- [ ] **Step 2: style.css 두 곳 수정**

`style.css:39-41`의 `.custom-card-recent`:
```css
/* 변경 전 */
.custom-card-recent {
  @apply max-w-screen-lg min-h-[200px] bg-gray-100;
}

/* 변경 후 */
.custom-card-recent {
  @apply max-w-screen-lg min-h-[200px] bg-gray-700;
}
```

`style.css:44-46`의 CSS 버그 수정:
```css
/* 변경 전 — h2가 페이지 전체에 적용됨 */
.content-details h1,
h2 {
  @apply font-highlight text-3xl mt-5 mb-4 text-yellow-200;
}

/* 변경 후 — .content-details 내부로 스코프 제한 */
.content-details h1,
.content-details h2 {
  @apply font-highlight text-3xl mt-5 mb-4 text-yellow-200;
}
```

- [ ] **Step 3: 수정 확인**

```bash
grep -n -A1 "content-details h1" style.css
grep -n "custom-card-recent" -A1 style.css
```

Expected:
```
44:  .content-details h1,
45:  .content-details h2 {
39:  .custom-card-recent {
40:    @apply max-w-screen-lg min-h-[200px] bg-gray-700;
```

- [ ] **Step 4: 커밋**

```bash
git add style.css
git commit -m "fix: scope .content-details h2 selector and darken card-recent bg"
```

---

## Task 2: 검색 모달 다크화

**Files:**
- Modify: `index.html` — `#search-modal` 내부 div (약 191-199번 줄)

- [ ] **Step 1: 현재 상태 확인**

```bash
grep -n "bg-gray-300" index.html
```

Expected:
```
192:        class="relative w-3/4 md:w-1/2 lg:w-1/3 bg-gray-300 p-3 rounded-lg flex items-center"
```

- [ ] **Step 2: search-modal 내부 div 수정**

`index.html`에서 `#search-modal` 내부 `.relative` div 전체를 교체:

```html
<!-- 변경 전 -->
<div
  class="relative w-3/4 md:w-1/2 lg:w-1/3 bg-gray-300 p-3 rounded-lg flex items-center"
>
  <i class="fa fa-search text-gray-600 mr-3"></i>
  <input
    type="text"
    class="w-full bg-transparent border-none outline-none"
    placeholder="검색어를 입력하세요..."
  />
</div>

<!-- 변경 후 -->
<div
  class="relative w-3/4 md:w-1/2 lg:w-1/3 bg-gray-800 border border-gray-700 p-3 rounded-lg flex items-center"
>
  <i class="fa fa-search text-gray-400 mr-3"></i>
  <input
    type="text"
    class="w-full bg-transparent border-none outline-none text-gray-200 placeholder-gray-500"
    placeholder="검색어를 입력하세요..."
  />
</div>
```

- [ ] **Step 3: 수정 확인**

```bash
grep -n "bg-gray-800 border border-gray-700" index.html
```

Expected: 해당 줄 출력됨.

- [ ] **Step 4: 커밋**

```bash
git add index.html
git commit -m "style: darken search modal to match dark theme"
```

---

## Task 3: 카테고리 모달 다크화 + 닫기 버튼 추가

**Files:**
- Modify: `index.html` — `#category-modal` (약 203-206번 줄)
- Modify: `images/hamburger-button.js` — 닫기 버튼 이벤트 추가

- [ ] **Step 1: 현재 상태 확인**

```bash
grep -n "category-modal" index.html
```

Expected:
```
203:    <div id="category-modal" class="fixed inset-0 bg-white p-5 hidden">
```

- [ ] **Step 2: category-modal div 교체**

```html
<!-- 변경 전 -->
<div id="category-modal" class="fixed inset-0 bg-white p-5 hidden">
  <h2>Categories</h2>
  <!-- Category content here -->
</div>

<!-- 변경 후 -->
<div id="category-modal" class="fixed inset-0 bg-gray-900 text-gray-200 p-6 hidden">
  <div class="flex justify-between items-center mb-6">
    <h2 class="font-highlight text-2xl text-pink-200">Categories</h2>
    <button
      id="category-close"
      class="w-10 h-10 rounded-full bg-gray-800 text-gray-200 flex items-center justify-center hover:bg-gray-700 transition duration-200"
    >
      <i class="fa fa-xmark text-xl"></i>
    </button>
  </div>
  <!-- Category content here -->
</div>
```

- [ ] **Step 3: hamburger-button.js에 닫기 버튼 이벤트 추가**

`hamburger-button.js`의 `overlay.addEventListener` 블록 **다음**에 추가:

```js
// 변경 전 (파일 끝 부분)
  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    searchModal.classList.add("hidden");
    categoryModal.classList.add("hidden");
  });
});

// 변경 후 — categoryClose 리스너 추가
  overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    searchModal.classList.add("hidden");
    categoryModal.classList.add("hidden");
  });

  const categoryClose = document.getElementById("category-close");
  categoryClose.addEventListener("click", function () {
    overlay.classList.add("hidden");
    categoryModal.classList.add("hidden");
  });
});
```

- [ ] **Step 4: 수정 확인**

```bash
grep -n "bg-gray-900" index.html
grep -n "category-close" index.html hamburger-button.js
```

Expected: 양쪽 파일에서 해당 줄 출력됨.

- [ ] **Step 5: 커밋**

```bash
git add index.html images/hamburger-button.js
git commit -m "style: darken category modal and add close button"
```

---

## Task 4: FAB 버튼 아이콘 토글 (bars ↔ xmark)

**Files:**
- Modify: `images/hamburger-button.js` — hamburgerButton click 리스너

- [ ] **Step 1: 현재 상태 확인**

```bash
grep -n "hamburgerButton.addEventListener" images/hamburger-button.js
```

Expected:
```
16:  hamburgerButton.addEventListener("click", function () {
```

- [ ] **Step 2: click 리스너에 아이콘 토글 추가**

```js
// 변경 전
  hamburgerButton.addEventListener("click", function () {
    menuButtons.classList.toggle("hidden");
    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.toggle("show");
      }, index * 100);
    });
  });

// 변경 후
  hamburgerButton.addEventListener("click", function () {
    const icon = hamburgerButton.querySelector("i");
    menuButtons.classList.toggle("hidden");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.toggle("show");
      }, index * 100);
    });
  });
```

- [ ] **Step 3: 수정 확인**

```bash
grep -n "fa-xmark" images/hamburger-button.js
```

Expected: 해당 줄 출력됨.

- [ ] **Step 4: 커밋**

```bash
git add images/hamburger-button.js
git commit -m "feat: toggle hamburger button icon between bars and xmark"
```

---

## Task 5: 아티클 헤더 Warm Dark 그라디언트

**Files:**
- Modify: `index.html` — `s_permalink_article_rep > main > .title-header` (약 652-667번 줄)

- [ ] **Step 1: 현재 상태 확인**

```bash
grep -n "bg-yellow-300" index.html
```

Expected:
```
653:                  class="title-header w-full h-[70vh] flex flex-col justify-center items-center gap-5 bg-yellow-300"
```

- [ ] **Step 2: .title-header 수정**

```html
<!-- 변경 전 -->
<div
  class="title-header w-full h-[70vh] flex flex-col justify-center items-center gap-5 bg-yellow-300"
>
  <a
    class="w-fit text-center p-2 rounded-3xl text-sm md:text-base text-gray-200 font-semibold bg-gray-800 hover:text-gray-900 hover:bg-pink-300 transition duration-200 ease-in-out"
    href="[##_article_rep_category_link_##]"
    >[##_article_rep_category_##]</a
  >
  <h1 class="text-center text-responsive font-bold">
    [##_article_rep_title_##]
  </h1>
  <div class="text-center text-base font-semibold">
    <span class="author">[##_article_rep_author_##]</span>
    <span class="date">[##_article_rep_date_##]</span>
  </div>
</div>

<!-- 변경 후 -->
<div
  class="title-header w-full h-[70vh] flex flex-col justify-center items-center gap-5 bg-gradient-to-br from-yellow-900 via-gray-800 to-gray-900"
>
  <a
    class="w-fit text-center p-2 rounded-3xl text-sm md:text-base text-gray-200 font-semibold bg-gray-800 hover:text-yellow-200 hover:bg-pink-300 transition duration-200 ease-in-out"
    href="[##_article_rep_category_link_##]"
    >[##_article_rep_category_##]</a
  >
  <h1 class="text-center text-responsive font-bold text-yellow-300">
    [##_article_rep_title_##]
  </h1>
  <div class="text-center text-base font-semibold text-gray-400">
    <span class="author">[##_article_rep_author_##]</span>
    <span class="date">[##_article_rep_date_##]</span>
  </div>
</div>
```

- [ ] **Step 3: 수정 확인**

```bash
grep -n "from-yellow-900" index.html
grep -n "text-yellow-300" index.html | grep "text-responsive"
```

Expected: 양쪽 줄 모두 출력됨.

- [ ] **Step 4: 커밋**

```bash
git add index.html
git commit -m "style: replace article header yellow bg with warm dark gradient"
```

---

## Task 6: 최근 글 섹션 (cover-grid) 다크화

**Files:**
- Modify: `index.html` — `#section-recent-contents` main 요소 및 featured 카드 (약 428-511번 줄)

- [ ] **Step 1: 현재 상태 확인**

```bash
grep -n "bg-gray-200" index.html
grep -n "bg-gray-100" index.html
```

Expected:
```
429:                class="snap-start w-full h-fit min-h-screen ... bg-gray-200 text-gray-800 mb-10"
437:                  <div class="custom-card w-full lg:w-1/2 grow-1 bg-gray-100">
```

- [ ] **Step 2: main 섹션 배경 교체**

`<main id="section-recent-contents" ...>`의 클래스:
```html
<!-- 변경 전 -->
class="snap-start w-full h-fit min-h-screen flex flex-col justify-center items-center p-5 bg-gray-200 text-gray-800 mb-10"

<!-- 변경 후 -->
class="snap-start w-full h-fit min-h-screen flex flex-col justify-center items-center p-5 bg-gradient-to-b from-[#1c1410] to-gray-800 text-gray-200 mb-10"
```

- [ ] **Step 3: featured 카드 배경 및 텍스트 색상 교체**

Featured 카드 div:
```html
<!-- 변경 전 -->
<div class="custom-card w-full lg:w-1/2 grow-1 bg-gray-100">

<!-- 변경 후 -->
<div class="custom-card w-full lg:w-1/2 grow-1 bg-gray-700">
```

Featured 카드 제목 div:
```html
<!-- 변경 전 -->
<div class="title w-fit h-fit font-highlight font-bold text-3xl p-5">

<!-- 변경 후 -->
<div class="title w-fit h-fit font-highlight font-bold text-3xl p-5 text-yellow-300">
```

Featured 카드 설명 div:
```html
<!-- 변경 전 -->
<div class="desc font-ko text-sm lg:text-lg p-5">

<!-- 변경 후 -->
<div class="desc font-ko text-sm lg:text-lg p-5 text-gray-300">
```

- [ ] **Step 4: 수정 확인**

```bash
grep -n "from-\[#1c1410\]" index.html
grep -n "bg-gray-200" index.html
```

Expected: 첫 번째 명령에서 해당 줄 출력, 두 번째 명령에서 **출력 없음**.

- [ ] **Step 5: 커밋**

```bash
git add index.html
git commit -m "style: darken cover-grid section with warm dark gradient"
```

---

## Task 7: 슬라이더 숫자 인디케이터 추가

**Files:**
- Modify: `index.html` — `#slider-container` 내부 navigation div 다음
- Modify: `images/slider-changer.js` — `gsapSnapToSlide` 함수

- [ ] **Step 1: 현재 slider-container 구조 확인**

```bash
grep -n "id=\"prev\"\|id=\"next\"\|slider-container" index.html
```

Expected: `prev`, `next` 버튼을 감싼 navigation div 위치 확인.

- [ ] **Step 2: index.html — 인디케이터 HTML 추가**

navigation div (`<div class="absolute top-1/2 ...">`) 바로 **다음**에 추가:

```html
<!-- 슬라이더 내비게이션 div 바로 다음에 삽입 -->
<div
  class="absolute bottom-6 w-full flex justify-center items-center gap-2 pointer-events-none select-none"
>
  <span id="current-slide" class="text-pink-300 font-bold font-english">01</span>
  <span class="text-gray-400 font-english">/</span>
  <span id="total-slides" class="text-gray-400 font-english">03</span>
</div>
```

- [ ] **Step 3: slider-changer.js — updateIndicator 함수 추가 및 호출**

파일 상단 변수 선언 다음(`let currentIndex = 0;` 이후)에 함수 추가:

```js
// 추가할 함수
function updateIndicator(index) {
  const current = document.getElementById("current-slide");
  if (current) current.textContent = String(index + 1).padStart(2, "0");
}
```

`gsapSnapToSlide` 함수의 `slides.forEach` 블록 **다음**에 호출 추가:

```js
// 변경 전
function gsapSnapToSlide(index, duration = 0.8) {
  // ... gsap.to() ...

  slides.forEach((slide, idx) => {
    slide.classList.remove("active", "inactive");
    if (idx === index) {
      slide.classList.add("active");
    } else {
      slide.classList.add("inactive");
    }
  });
}

// 변경 후
function gsapSnapToSlide(index, duration = 0.8) {
  // ... gsap.to() ...

  slides.forEach((slide, idx) => {
    slide.classList.remove("active", "inactive");
    if (idx === index) {
      slide.classList.add("active");
    } else {
      slide.classList.add("inactive");
    }
  });

  updateIndicator(index);
}
```

- [ ] **Step 4: 수정 확인**

```bash
grep -n "updateIndicator\|current-slide\|total-slides" index.html images/slider-changer.js
```

Expected: `index.html`에서 `current-slide`, `total-slides`, `slider-changer.js`에서 `updateIndicator` 출력됨.

- [ ] **Step 5: 커밋**

```bash
git add index.html images/slider-changer.js
git commit -m "feat: add slide number indicator (01 / 03) to hero slider"
```

---

## Task 8: Tailwind CSS 빌드

**Files:**
- Generate: `output.css`

- [ ] **Step 1: 빌드 실행**

```bash
npx tailwindcss -i ./style.css -o ./output.css --minify
```

Expected: `output.css` 생성 완료 메시지. 오류 없음.

- [ ] **Step 2: 새 클래스가 output.css에 포함됐는지 확인**

```bash
grep -c "from-yellow-900\|from-\[#1c1410\]\|bg-gray-700\|bg-gray-800\|bg-gray-900" output.css
```

Expected: 0보다 큰 숫자 출력. (Tailwind CDN 병용이므로 일부 클래스는 CDN에서 처리될 수 있음)

- [ ] **Step 3: 커밋**

```bash
git add output.css
git commit -m "build: rebuild output.css after design polish changes"
```

---

## 성공 기준 체크리스트

구현 완료 후 Tistory 스킨 편집기에 `output.css` 내용 붙여넣기 전 로컬 `index.html`로 확인:

- [ ] 모든 섹션에 흰/라이트 배경 없음
- [ ] 검색 모달이 `bg-gray-800` 다크로 표시됨
- [ ] 카테고리 모달이 `bg-gray-900` 다크로 표시되고 X 버튼 동작함
- [ ] 아티클 헤더가 warm dark 그라디언트로 표시됨
- [ ] 최근 글 섹션이 초콜릿 warm dark 그라디언트로 표시됨
- [ ] 슬라이더 하단에 `01 / 03` 형식 인디케이터 표시되고 슬라이드 전환 시 업데이트됨
- [ ] FAB 버튼 클릭 시 bars ↔ xmark 아이콘 토글됨
- [ ] 아티클 본문 외부 h2 태그에 `font-highlight text-3xl text-yellow-200` 스타일 미적용됨
