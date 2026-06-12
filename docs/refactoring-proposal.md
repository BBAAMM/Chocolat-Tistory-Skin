# 리팩터링 제안서

> 기준: Lighthouse 리포트 `codezaram.tistory.com-20260609T002829.html`  
> 측정일: 2026-06-09 | 측정 URL: https://codezaram.tistory.com/

---

## 현재 점수

| 카테고리 | 점수 | 상태 |
|---|---|---|
| Performance | **28** | 위험 |
| Accessibility | 92 | 양호 |
| Best Practices | 92 | 양호 |
| SEO | 100 | 완벽 |

핵심 Web Vitals:

| 지표 | 현재 | 목표 |
|---|---|---|
| FCP | 6.1s | < 1.8s |
| LCP | 10.1s | < 2.5s |
| TTI | 19.4s | < 3.8s |
| TBT | 3,040ms | < 200ms |
| Speed Index | 7.1s | < 3.4s |
| CLS | 0.047 | < 0.1 ✓ |

---

## 수정 가능한 문제 (우선순위 순)

### 🔴 P0 — `cdn.tailwindcss.com` 제거 (126KB + 렌더 블로킹)

**현황**: `skin.html:51`에 CDN Tailwind 로드 + `skin.html:63`에 컴파일된 `style.css`도 로드.  
둘 다 로드 중 → 126KB JS 낭비, 클라이언트 사이드 JIT 컴파일로 메인 스레드 차지.

```html
<!-- 제거 대상 -->
<script src="https://cdn.tailwindcss.com"></script>
```

**조치**: 해당 `<script>` 태그 삭제. `style.css`만 사용.  
**절감**: ~126KB JS, 렌더 블로킹 제거, 메인 스레드 파싱/컴파일 시간 단축.

---

### 🔴 P0 — FontAwesome JS Kit → 인라인 SVG 교체 (549KB → ~2KB)

**현황**: `skin.html:39`에 FA JS Kit. 로드 크기 **549KB**, 전체 아이콘셋 fetch.

실제 사용 아이콘 목록:

| 아이콘 | 위치 |
|---|---|
| `fa-search` | 검색 버튼 (다수) |
| `fa-hashtag` | FAB 태그 링크 |
| `fa-arrow-up` | FAB 위로, 푸터 |
| `fa-plus` | FAB 메인 |
| `fa-clock` | 읽기 시간 |
| `fa-chevron-left/right` | 페이지네이션 |
| `fa-github` (brands) | 소셜 링크 |
| `fa-envelope` | 소셜 링크 |
| `fa-rss` | 소셜 링크 |
| `fa-arrow-right` | 카테고리 hover |

총 10개. SVG 인라인 `<symbol>` + `<use>` 패턴으로 교체 가능.

**조치**:
1. `skin.html:39` FA Kit `<script>` 제거.
2. `<head>` 내 SVG sprite 블록 추가 (`display:none`).
3. 모든 `<i class="fa ...">` → `<svg><use href="#icon-name"/></svg>` 교체.

**절감**: ~549KB 네트워크 요청 제거, JS 실행 시간 대폭 단축.

---

### 🔴 P0 — `post-fallback.png` → WebP 변환 (575KB → ~30KB)

**현황**: `images/post-fallback.png` = **575KB** PNG.  
`input.css:116`에서 CSS background로 사용:

```css
.duo { background: url("./images/post-fallback.png") center/cover; }
```

**조치**:
```bash
cwebp -q 80 images/post-fallback.png -o images/post-fallback.webp
```

CSS를 `image-set()` 또는 단순히 `.webp` 경로로 교체.  
**절감**: ~540KB (93% 감소).

---

### 🟠 P1 — jQuery `$ is not a function` 에러 수정

**현황**: 콘솔에 `Uncaught TypeError: $ is not a function` 2건.  
Tistory가 jQuery를 주입하지만 skin.html의 스크립트가 jQuery보다 먼저 실행되는 타이밍 문제.

**조치 후보**:
1. jQuery 의존 코드를 `DOMContentLoaded` 이벤트 리스너로 감싸기.
2. 또는 `$` 대신 `document.querySelector` 사용 (jQuery 의존성 제거).

코드 위치: 정확한 파일 특정 필요 (grep `\$(`으로 검색).

---

### 🟠 P1 — AdSense 광고 컨테이너 너비 에러 수정

**현황**:
```
TagError: Fluid responsive ads must be at least 250px wide: availableWidth=0
TagError: Fluid responsive ads must be at least 250px wide: availableWidth=172
```

`availableWidth=0`은 숨겨진 컨테이너 내 광고 초기화 문제.  
`availableWidth=172`은 모바일에서 컨테이너가 250px 미만.

**조치**:
- `availableWidth=0`: 광고 슬롯이 `display:none` 상태일 때 초기화되는지 확인. lazy 초기화 적용.
- `availableWidth=172`: 해당 광고 컨테이너에 `min-width: 250px` 또는 Fluid 타입 대신 다른 광고 유형 사용.

---

### 🟡 P2 — Google Fonts 미사용 CSS 제거 (13KB)

**현황**: Google Fonts에서 13KB CSS 미사용.  
현재 로드 중인 패밀리 확인 후 실제 사용하지 않는 weight/variant 제거.

`skin.html`의 Google Fonts `<link>` 태그에서 불필요한 family/weight 파라미터 제거.

---

### 🟡 P2 — 429 에러 원인 조사

**현황**: 특정 리소스에서 `Failed to load resource: 429` 발생.  
어떤 리소스인지 Lighthouse 상세에서 특정되지 않았으나, 반복 호출 중인 API/CDN 요청 가능성.

**조치**: Chrome DevTools Network 탭에서 429 응답 URL 확인 후 중복 요청 제거 또는 캐싱 적용.

---

## 통제 불가 항목 (참고)

| 리소스 | 크기 | 이유 |
|---|---|---|
| Tistory admin 스크립트 | 199KB | Tistory 플랫폼 주입 |
| Google Tag Manager | 180KB | GTM 설정 (블로그 소유자 선택) |
| AdSense JS | 172KB | 애드센스 수익화 필요 |
| jQuery | 30KB | Tistory 주입 |

---

## 예상 효과

| 항목 | 절감 |
|---|---|
| CDN Tailwind 제거 | ~126KB JS |
| FontAwesome 교체 | ~549KB JS |
| post-fallback.png WebP 변환 | ~540KB Image |
| **합계** | **~1.2MB** |

1.2MB 감소 시 LCP 10.1s → 예상 4~5s 수준, Performance 점수 50+ 목표 가능.  
(GTM·AdSense 등 통제 불가 항목이 점수 상한 제약)

---

## 작업 순서 (권장)

```
1. cdn.tailwindcss.com 제거 → 빌드 후 style.css 검증
2. post-fallback.png WebP 변환 + input.css 수정 → 빌드
3. FontAwesome SVG sprite 교체 (공수 최대, 별도 PR 권장)
4. jQuery $ 에러 수정
5. AdSense 컨테이너 너비 수정
6. Google Fonts 미사용 제거
```
