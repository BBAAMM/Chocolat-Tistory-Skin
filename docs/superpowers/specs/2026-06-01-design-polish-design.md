# Design Polish — Chocolat Tistory Skin

**날짜**: 2026-06-01  
**범위**: 기존 구현 완성도 향상 — 다크 테마 일관성, CSS 버그, UX 개선  
**접근 방식**: 컴포넌트별 순차 수정 (치환자 구조 보호)

---

## 배경 및 목표

현재 구현된 컴포넌트들이 DESIGN.md의 "Dark Minimal × Warm Accent" 방향과 어긋나는 지점이 여러 곳 존재한다. 새 기능 추가 없이 기존 컴포넌트의 완성도를 올리는 것이 목표.

**피해야 할 것** (DESIGN.md 명시): 흰 배경 기본 카드, 보라색 그라디언트, 시스템 sans-serif 단독 사용.

---

## 변경 항목 (7개)

### 1. 아티클 헤더 배경

**파일**: `index.html` — `s_permalink_article_rep > .title-header`

| | 변경 전 | 변경 후 |
|---|---|---|
| 배경 | `bg-yellow-300` | `bg-gradient-to-br from-yellow-900 via-gray-800 to-gray-900` |
| 제목 색상 | `text-gray-800` (어두운 글자) | `text-yellow-300` |
| 카테고리 링크 | `hover:text-gray-900` | `hover:text-yellow-200` |

근거: 70vh 황색 배경은 다크 테마 흐름을 단절시킴. Warm dark 그라디언트로 브랜드 컬러(초콜릿 톤)를 유지하면서 다크 일관성 확보.

---

### 2. 최근 글 섹션 (cover-grid) 배경 및 카드

**파일**: `index.html` — `cover-grid > <main>`, `style.css` — `.custom-card-recent`

| | 변경 전 | 변경 후 |
|---|---|---|
| 섹션 배경 | `bg-gray-200 text-gray-800` | `bg-gradient-to-b from-[#1c1410] to-gray-800 text-gray-200` |
| Featured 카드 배경 | `bg-gray-100` | `bg-gray-700` |
| Featured 제목 | `text-gray-800` (기본) | `text-yellow-300` |
| Featured 설명 | `text-gray-800` (기본) | `text-gray-300` |
| List 카드 (`custom-card-recent`) | `bg-gray-100` | `bg-gray-700` |

근거: `bg-gray-200`은 DESIGN.md "피해야 할 것: 흰 배경 기본 카드" 위반. 아티클 헤더와 동일한 초콜릿 warm dark 톤으로 섹션 간 연속성 확보.

---

### 3. 검색 모달

**파일**: `index.html` — `#search-modal > .relative`

| | 변경 전 | 변경 후 |
|---|---|---|
| 배경 | `bg-gray-300` | `bg-gray-800 border border-gray-700` |
| 검색 아이콘 | `text-gray-600` | `text-gray-400` |
| Input placeholder | (기본 다크) | `placeholder-gray-500 text-gray-200` |

---

### 4. 카테고리 모달

**파일**: `index.html` — `#category-modal`

| | 변경 전 | 변경 후 |
|---|---|---|
| 배경 | `bg-white p-5` | `bg-gray-900 text-gray-200 p-6` |
| 구조 | 빈 `<h2>Categories</h2>` | 헤더 + 닫기 버튼(X) + 콘텐츠 영역 |

닫기 버튼은 기존 `hamburger-button.js`의 `overlay` 클릭 이벤트 재사용. 치환자 연결은 이번 범위 밖(TODO 유지).

---

### 5. 슬라이더 숫자 인디케이터

**파일**: `index.html` — `#slider-container`, `images/slider-changer.js`

- `#slider-container` 하단 중앙에 `<div id="slide-indicator">` 추가
- 형식: `<span id="current-slide">01</span> / <span id="total-slides">03</span>`
- 스타일: `text-gray-400`, 현재 슬라이드 번호는 `text-pink-300 font-bold`
- `slider-changer.js`에서 슬라이드 전환 시 `current-slide` 텍스트 업데이트 (2자리 zero-pad)

---

### 6. CSS 전역 오염 버그 수정

**파일**: `style.css:44`

```css
/* 변경 전 — h2가 전역 적용됨 */
.content-details h1,
h2 { ... }

/* 변경 후 — 스코프 제한 */
.content-details h1,
.content-details h2 { ... }
```

근거: 현재 셀렉터는 페이지 내 모든 `h2`에 `font-highlight text-3xl text-yellow-200` 등을 적용함. 카테고리 모달 헤더, 관련 글 섹션 등 의도치 않은 영향 제거.

---

### 7. FAB 버튼 active 상태 아이콘

**파일**: `images/hamburger-button.js`

- 메뉴 열릴 때: `fa-bars` → `fa-xmark`
- 메뉴 닫힐 때: `fa-xmark` → `fa-bars`
- `hamburgerButton.querySelector('i')`의 classList로 교체

---

## 변경하지 않는 것

- 슬라이더 2·3번 콘텐츠 (TODO 유지)
- 카테고리 모달 실제 치환자 연결 (TODO 유지)
- `s_index_article_rep` 주석 해제 (TODO 유지)
- 카테고리 카드 아이콘 (`fa-tree` → 카테고리별 아이콘): 콘텐츠 결정 사항, 범위 밖
- `tailwind.config.js` 수정 없음

---

## 파일별 변경 범위

| 파일 | 변경 내용 |
|---|---|
| `index.html` | 항목 1·2·3·4·5 (HTML 구조 및 클래스) |
| `style.css` | 항목 2(`.custom-card-recent`) + 항목 6(CSS 버그) |
| `images/slider-changer.js` | 항목 5 (인디케이터 업데이트 로직) |
| `images/hamburger-button.js` | 항목 7 (아이콘 교체) |

빌드 후 `output.css` 업데이트 필요.

---

## 성공 기준

- [ ] 모든 섹션이 `bg-[#121212]` 또는 다크 계열 배경 사용
- [ ] 흰/라이트 배경 카드 없음
- [ ] 검색/카테고리 모달이 다크 오버레이 위에 자연스럽게 표시
- [ ] 슬라이더에서 현재 슬라이드 번호(`01 / 03`) 표시됨
- [ ] 아티클 페이지의 h2가 아티클 본문 내에서만 스타일 적용됨
- [ ] FAB 열릴 때 X 아이콘으로 전환됨
