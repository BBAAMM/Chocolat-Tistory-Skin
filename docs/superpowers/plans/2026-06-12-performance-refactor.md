# Performance Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Google SpeedInsight 모바일 61점 → 75점+, LCP/FCP 개선을 위해 통제 가능한 5가지 렌더 차단·에러·CLS 원인 제거

**Architecture:** 렌더 차단 Google Fonts를 비차단 preload 패턴으로 교체, sticky-nav 강제 리플로우 캐싱, AdSense 250px 에러 2건(그리드 너무 좁음·사이드바 숨김 초기화) 수정, 프로필 이미지 CLS 방지

**Tech Stack:** HTML (skin.html), Vanilla JS (images/), Tailwind CSS (input.css)

---

## 현재 기준선

| 지표 | 현재 |
|------|------|
| Performance (모바일) | 61 |
| Performance (데스크탑) | 71 |

## 이미 완료된 항목 (작업 불필요)

- ✅ `cdn.tailwindcss.com` 제거
- ✅ FontAwesome JS Kit → SVG 스프라이트
- ✅ `post-fallback.png` → `.webp` (12KB)
- ✅ GA `requestIdleCallback` 지연 로드
- ✅ Moirai One woff2 preload
- ✅ `font-display: swap` (커스텀 폰트 + Google Fonts URL)

## 통제 불가 항목 (이 계획에 미포함)

| 항목 | 원인 |
|------|------|
| Unused JS 377KB | Tistory 플랫폼 주입 |
| Cache lifetimes 367KB/984KB | Tistory CDN 헤더 |
| Document request latency 44KB | Tistory 서버 |
| Legacy JS 28KB | Tistory/jQuery 주입 |
| Unused CSS 13KB | Tailwind base layer (unavoidable) |

---

## 파일 맵

| 파일 | 변경 이유 |
|------|-----------|
| `skin.html:27-31` | Google Fonts → 비차단 preload 패턴, jsDelivr preconnect 추가 |
| `skin.html:184` | Featured 그리드 ad-cell: `col-span-2 md:col-span-1` (250px 에러) |
| `skin.html:247-249` | 홈 사이드바 fluid ad: hidden 상태 초기화 방지 |
| `skin.html:213` | GitHub 프로필 이미지: `width`/`height` 추가 (CLS) |
| `images/sticky-nav.js:18` | `hero.offsetHeight` 스크롤 핸들러 내 반복 읽기 → 캐싱 |

---

## Task 1: 비차단 Google Fonts 로드

**파일:**
- Modify: `skin.html:27-31`

**영향:** Render-blocking 3,370ms (모바일) / 500ms (데스크탑) 제거, Font display 90ms 개선, LCP request discovery 개선

### 현재 코드 (`skin.html:26-32`)

```html
<!-- #region Font Dependency -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<!-- Preload Moirai One Latin woff2 (covers logo 'C' — LCP critical) -->
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/moiraione/v3/2sDbZGFUgJLJmby6xgNGf0KcBg.woff2" />
<link href="https://fonts.googleapis.com/css2?family=Moirai+One&family=Montserrat+Alternates:wght@600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet" />
<!-- #endregion -->
```

- [ ] **Step 1: `skin.html:26-32` Font Dependency 블록 교체**

`skin.html`에서 아래 old → new 로 교체:

```html
<!-- #region Font Dependency -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://fastly.jsdelivr.net" crossorigin />
<!-- Preload Moirai One Latin woff2 (covers logo 'C' — LCP critical) -->
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/moiraione/v3/2sDbZGFUgJLJmby6xgNGf0KcBg.woff2" />
<!-- Non-blocking Google Fonts (LoadCSS pattern) -->
<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="https://fonts.googleapis.com/css2?family=Moirai+One&family=Montserrat+Alternates:wght@600;700&family=Space+Grotesk:wght@400;600;700&display=swap" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Moirai+One&family=Montserrat+Alternates:wght@600;700&family=Space+Grotesk:wght@400;600;700&display=swap" /></noscript>
<!-- #endregion -->
```

변경 포인트:
- `rel="preconnect"` 한 줄 추가: `fastly.jsdelivr.net` (WooJu·HSSanTokki CDN)
- Google Fonts `<link rel="stylesheet">` → `<link rel="preload" as="style" onload="...">` + `<noscript>` 폴백

- [ ] **Step 2: 브라우저에서 검증**

1. Chrome DevTools → Network 탭 → 새로고침
2. `fonts.googleapis.com` 요청 타입이 `preload`로 표시됨 확인
3. Lighthouse Coverage 탭에서 Fonts CSS가 render-blocking 항목에서 사라졌는지 확인
4. 화면에 폰트가 정상 렌더링됨 확인 (FOUT 발생하나 레이아웃 깨짐 없음)

- [ ] **Step 3: 커밋**

```bash
git add skin.html
git commit -m "perf: load Google Fonts non-blocking via preload+onload pattern"
```

---

## Task 2: sticky-nav.js 강제 리플로우 캐싱

**파일:**
- Modify: `images/sticky-nav.js:18`

**영향:** Forced reflow 경고 제거 — 스크롤 핸들러가 매 rAF마다 `hero.offsetHeight` DOM 읽기를 반복하는 것을 방지

### 현재 코드

```js
// sticky-nav.js:15-29
function threshold() { return hero.offsetHeight - 60; }
var shown = false;
function update() {
  var should = window.scrollY > threshold();
  ...
}
```

문제: `threshold()`가 스크롤 핸들러 → `update()` → `requestAnimationFrame` 안에서 매번 `hero.offsetHeight` (layout property) 를 읽음 → 강제 리플로우

- [ ] **Step 1: `images/sticky-nav.js` 수정**

`function threshold() { return hero.offsetHeight - 60; }` 한 줄을 아래로 교체:

```js
var _threshold = null;
function threshold() {
  if (_threshold === null) _threshold = hero.offsetHeight - 60;
  return _threshold;
}
window.addEventListener('resize', function () { _threshold = null; }, { passive: true });
```

전체 파일 기준으로 `start()` 함수 안쪽, `var shown = false;` 위에 배치한다.

최종 `start()` 내부 순서:
```js
var _threshold = null;
function threshold() {
  if (_threshold === null) _threshold = hero.offsetHeight - 60;
  return _threshold;
}
window.addEventListener('resize', function () { _threshold = null; }, { passive: true });
var shown = false;
function update() { ... }
```

- [ ] **Step 2: 검증**

Chrome DevTools → Performance 탭 → 페이지 로드 후 스크롤 Record → "Forced reflow" 경고가 sticky-nav 관련으로 나오지 않는지 확인

- [ ] **Step 3: 커밋**

```bash
git add images/sticky-nav.js
git commit -m "perf: cache hero.offsetHeight to prevent forced reflow on scroll"
```

---

## Task 3: Featured 그리드 광고 — 모바일 너비 250px 미만 수정

**파일:**
- Modify: `skin.html:184`

**영향:** 콘솔 에러 `TagError: availableWidth=172` 제거, 모바일(320-640px)에서 광고 컨테이너가 1열 전체 너비 확보

### 현재 코드 (`skin.html:182-191`)

```html
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <!-- 광고 카드 (그리드 한 칸) -->
  <div class="ad-cell custom-card overflow-hidden choco-ad">
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9700755749825783"
        data-ad-slot="4829759655"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>
```

문제: `grid-cols-2`에서 각 열 너비 = (화면폭 - 패딩 - 갭) / 2. 360px 모바일 기준 약 158px → 250px 미만.

- [ ] **Step 1: `skin.html:184` ad-cell div에 `col-span-2 md:col-span-1` 추가**

```html
<div class="ad-cell custom-card overflow-hidden choco-ad col-span-2 md:col-span-1">
```

효과:
- `< md(768px)`: 광고가 2열 전체 너비 차지 → 전체 너비 확보 (항상 250px 이상)
- `≥ md`: `grid-cols-3` 1칸 = 정상

- [ ] **Step 2: 검증**

1. Chrome DevTools → 모바일 에뮬레이션 (Moto G4, 360px)
2. 콘솔에서 `TagError: availableWidth=` 에러 사라짐 확인
3. 광고가 전체 폭 1열로 렌더링됨 확인

- [ ] **Step 3: 커밋**

```bash
git add skin.html
git commit -m "fix(ads): span featured grid ad full-width on mobile to meet 250px minimum"
```

---

## Task 4: 홈 사이드바 Fluid 광고 — hidden 상태 초기화 방지

**파일:**
- Modify: `skin.html:247-249`

**영향:** 콘솔 에러 `TagError: availableWidth=0` 제거 — 사이드바가 `display:none`인 상태(lg 미만 화면)에서 AdSense fluid ad가 초기화되는 문제

### 현재 코드 (`skin.html:241-250`)

```html
<div class="ad-cell">
  <ins class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-9700755749825783"
      data-ad-slot="6279863694"
      data-ad-format="fluid"></ins>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
```

문제: `<aside id="home-sidebar" class="hidden lg:flex">` 내부 — 1024px 미만에서 `display:none`. AdSense가 이 상태에서 push 되면 `availableWidth=0` 에러.

- [ ] **Step 1: `skin.html:247-249` 인라인 스크립트 교체**

```html
  <script>
    (function() {
      var ins = document.currentScript.previousElementSibling;
      if (ins.offsetParent !== null) {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        new IntersectionObserver(function(entries, obs) {
          if (entries[0].isIntersecting) {
            (adsbygoogle = window.adsbygoogle || []).push({});
            obs.disconnect();
          }
        }).observe(ins);
      }
    })();
  </script>
```

설명:
- `ins.offsetParent !== null`: 부모 체인에 `display:none`이 없으면 즉시 push
- 숨겨진 경우: IntersectionObserver로 화면에 나타날 때 push (lg+ 화면에서 사이드바 노출 시)

- [ ] **Step 2: 검증**

1. Chrome DevTools → 모바일 에뮬레이션 (360px)
2. 콘솔에서 `TagError: availableWidth=0` 에러 사라짐 확인
3. 데스크탑(1280px 이상) → 사이드바 광고 정상 로드 확인

- [ ] **Step 3: 커밋**

```bash
git add skin.html
git commit -m "fix(ads): defer home sidebar fluid ad init when container is hidden"
```

---

## Task 5: 프로필 이미지 CLS 방지

**파일:**
- Modify: `skin.html:213`

**영향:** CLS 방지 — `width`/`height` 미지정 시 브라우저가 이미지 다운로드 전 공간 미확보 → Layout shift 발생

### 현재 코드 (`skin.html:213`)

```html
<img src="https://github.com/BBAAMM.png" alt="프로필" class="w-full h-full object-cover" onerror="this.outerHTML='🍫';" />
```

- [ ] **Step 1: `skin.html:213` img 태그에 치수 및 lazy loading 추가**

```html
<img src="https://github.com/BBAAMM.png" alt="프로필" width="64" height="64" loading="lazy" class="w-full h-full object-cover" onerror="this.style.display='none';" />
```

변경 사항:
- `width="64" height="64"`: 브라우저가 다운로드 전 64×64 공간 확보 → CLS 방지
- `loading="lazy"`: 사이드바는 lg 이상에서만 visible, 스크롤 없이는 off-screen 가능
- `onerror`: `this.outerHTML='🍫'` → `this.style.display='none'` (outerHTML 변경은 SVG/Shadow DOM 컨텍스트에서 에러 가능)

- [ ] **Step 2: 검증**

1. Chrome DevTools → Performance 탭 → Lighthouse CLS 항목 확인
2. 프로필 이미지 자리가 즉시 예약됨 (이미지 로드 전후 레이아웃 변화 없음) 확인

- [ ] **Step 3: 커밋**

```bash
git add skin.html
git commit -m "fix: add width/height to profile image to prevent CLS"
```

---

## Self-Review

### Spec coverage 검토

| SpeedInsight 항목 | 대응 Task |
|---|---|
| Render-blocking 3,370ms | Task 1 |
| Font display 90ms | Task 1 (비차단 + display=swap 이미 적용) |
| LCP request discovery | Task 1 (Fonts 비차단 → preload chain 단축) |
| Forced reflow | Task 2 |
| Browser console errors | Task 3 + 4 (AdSense TagError) |
| Improve image delivery / CLS | Task 5 |
| Network dependency tree | Task 1 (jsDelivr preconnect 추가) |
| Unused JS 377KB | ❌ 통제 불가 (Tistory 주입) |
| Unused CSS 13KB | ❌ 통제 불가 (Tailwind base) |
| Cache lifetimes | ❌ 통제 불가 (Tistory CDN) |
| Document latency 44KB | ❌ 통제 불가 (Tistory 서버) |
| Legacy JS 28KB | ❌ 통제 불가 (Tistory 주입) |

### 예상 효과

- Render-blocking 제거 → FCP·LCP 직접 개선 (모바일 3초+ 단축 가능)
- 콘솔 에러 2종 제거 → Best Practices 점수 방어
- CLS 개선 → 통합 점수 안정화
- **목표 달성 가능 범위:** 모바일 70+, 데스크탑 80+ (통제 불가 항목이 상한 제약)
