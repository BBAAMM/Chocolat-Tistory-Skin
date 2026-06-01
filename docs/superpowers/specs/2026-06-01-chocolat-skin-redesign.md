# Chocolat Tistory Skin — 전체 재설계 스펙

**날짜**: 2026-06-01  
**브랜치**: feature/design-polish  
**타겟 독자**: 프로그래머 80% · 정보 검색자 20%  
**테마 방향**: Dark Minimal × Warm Accent (기존 계승)

---

## 1. 디자인 시스템 (변경 없음)

기존 `DESIGN.md` 토큰 그대로 유지.

| 역할 | 값 |
|---|---|
| 배경 | `#121212` |
| 카드/서피스 | `bg-gray-800` (#1f2937) |
| 포인트 | `bg-pink-300` / `text-pink-200` (#f9a8d4) |
| 제목 강조 | `text-yellow-300` (#fde047) |
| 본문 | `text-gray-200` |
| 뮤트 | `text-gray-400` |

폰트: Moirai One (`font-welcome`), HSSanTokki (`font-highlight`), WooJu (`font-ko`), Montserrat Alternates (`font-english`)

---

## 2. 글로벌 요소

### 2-1. 네비게이션 — 인라인 히어로 → sticky 전환

- 히어로 섹션 내부 상단에 `로고(CHOCOLAT) + 메뉴 링크(홈·카테고리·태그·검색 아이콘)` 배치
- 스크롤이 히어로를 벗어나는 순간 `position: fixed` 상단 바로 전환
  - 배경: `bg-gray-900/95 backdrop-blur`
  - 높이: 48px (모바일 44px)
  - 전환: `translateY(-100%) → translateY(0)` opacity fade-in
- 기존 우하단 FAB(햄버거) **제거**
- 검색은 네비 우측 아이콘 → 클릭 시 기존 search-modal 동작 유지
- 카테고리는 네비 링크 → `/category` 직접 이동 (category-modal 제거)

### 2-2. 읽기 진행 바

- `position: fixed; top: 0` 2px 바
- 색상: `from-pink-300 to-yellow-300` 그라디언트
- **아티클 페이지에만** 노출 (홈·목록 페이지 미노출)
- JS: `scrollY / (document.body.scrollHeight - window.innerHeight) * 100`

---

## 3. 홈 페이지

### 3-1. 하프 히어로

```
┌─────────────────────────────────────┐  ← 50vh
│  CHOCOLAT         홈 카테고리 태그 🔍 │  ← 인라인 네비
│                                     │
│         CHOCOLAT  (타이프라이터)     │
│         Python · Java · 자율주행     │
│                                     │
└─────────────────────────────────────┘
│  ↓ 콘텐츠 미리보기 (살짝 보임)       │  ← 50vh 시작
```

- 높이: `h-[50vh]`
- 배경: `bg-gradient-to-br from-gray-800 to-black` (기존 슬라이더 1번 슬라이드 그라디언트)
- 타이프라이터 애니메이션 유지 (기존 `blink-type-writer.js`)
- 기존 슬라이더(2번·3번 슬라이드) **제거**
- `snap-scroll` **제거** → 일반 스크롤

### 3-2. 2컬럼 레이아웃

```
┌──────────────────────┬──────────────┐
│  피드 (flex: 1)       │ 사이드바(w-64)│
│  ① TOP POSTS 2×2     │ - 프로필 카드 │
│  ② LATEST 목록       │ - 카테고리   │
│                      │ - 태그 클라우│
└──────────────────────┴──────────────┘
```

모바일(`< lg`): 사이드바 피드 아래로, 1컬럼

#### ① TOP POSTS 섹션

- `<s_cover name="cover-popular">` 커버 섹션으로 구현
- 글 4개 수동 핀 (HTML 직접 작성, 조회수 뱃지도 하드코딩)
- 카드 구조: 썸네일 이미지(상단) + 카테고리 칩 + 제목 + 조회수 뱃지(우상단 절대 위치)
- 그리드: `grid grid-cols-2 gap-4`
- 섹션 레이블: `TOP POSTS` (yellow, 점선 구분선)

#### ② LATEST 섹션

- `<s_cover name="cover-grid">` + `<s_cover_item>` 치환자
- 아이템 구조: 썸네일(좌, `w-16 h-16`) + 카테고리 칩 + 제목 + 한 줄 요약
- `hover:bg-gray-700 transition` 행 전체 hover
- 섹션 레이블: `LATEST`

#### ③ 사이드바

**프로필 카드**
- 아바타: Tistory 블로그 프로필 이미지 or 하드코딩 이미지
- 블로그명, 한 줄 소개 (`text-gray-400 text-sm`)
- 소셜 링크: GitHub, 이메일 아이콘 (FontAwesome)
- 배경: `bg-gray-800 rounded-xl p-4`

**카테고리 리스트**
- Tistory에 카테고리 목록 치환자 없음 → HTML 하드코딩
- 각 항목: 컬러 닷 + 카테고리명 + 글 개수 (우측 muted) + 카테고리 URL 링크
- 레이블: `CATEGORIES`

**태그 클라우드**
- Tistory에 태그 목록 치환자 없음 → HTML 하드코딩
- 태그 아이템: `border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 hover:text-pink-300 hover:border-pink-300`
- 레이블: `TAGS`

---

## 4. 아티클 페이지 (`<s_permalink_article_rep>`)

### 4-1. 헤더

```
┌─────────────────────────────────────┐
│ 홈 / 자율주행 / 현재 글              │  ← 브레드크럼
│                                     │
│  제목 (text-yellow-300, clamp)      │
│  부제목 (있을 경우)                  │
│                                     │
│  [카테고리] 김승범 · 2025.06.01 ⏱8분│
└─────────────────────────────────────┘
```

- 배경: `bg-gradient-to-br from-yellow-900 via-gray-800 to-gray-900` (기존 유지)
- 높이: `min-h-[40vh]` (기존 70vh → 40vh로 축소, 본문 접근성 개선)
- 읽기 시간: JS로 `#article-view` innerText 글자 수 ÷ 500(글자/분) 계산

### 4-2. 본문 + 스티키 TOC

```
┌───────────────────────┬─────────────┐
│  본문 (flex: 1)        │ TOC (w-56)  │
│                       │ sticky top  │
│  [접이식 TOC - 모바일] │             │
│                       │ ● 섹션 1    │
│  글 내용...           │   ○ 1-1     │
│  코드 블록...         │   ○ 1-2     │
│                       │ ○ 섹션 2    │
└───────────────────────┴─────────────┘
```

**TOC 구현**
- JS로 `#article-view` 내 `h2, h3` 파싱 → 동적 생성
- `IntersectionObserver`로 현재 섹션 감지 → `text-pink-300` 하이라이트
- 데스크탑: 우측 sticky (`lg:sticky lg:top-20`)
- 모바일: 본문 위 접이식 (`<details>` 태그 or JS toggle)
- 배경: `bg-gray-800 rounded-xl p-4`

**본문 컨테이너**
- 너비: `w-[95vw] sm:w-[90vw] md:w-[80vw]` (기존 유지)
- 배경: `bg-gray-800 rounded-t-3xl rounded-b-xl shadow-2xl shadow-black`

### 4-3. 하단 영역

1. **태그**: `<s_tag_label>` 치환자, 기존 스타일 유지 + 개선
2. **관련 글**: `<s_article_related>` 치환자, 기존 리스트 유지
3. **댓글**: `[##_comment_group_##]`, 기존 CSS 유지

---

## 5. 카테고리/태그 목록 페이지 (`<s_list>`)

### 5-1. 카테고리 헤더

- 카테고리명: `[##_list_conform_##]` (font-highlight, text-pink-200)
- 글 개수: JS로 `<li>` 카운트 후 표시
- 배경: `bg-gradient-to-br from-gray-800 to-gray-900 p-8`

### 5-2. 2컬럼: 글 목록 + 필터 사이드바

```
┌───────────────────────┬─────────────┐
│  글 목록 (flex: 1)     │ 사이드바    │
│  <s_list_rep>         │ - 카테고리  │
│  수평 리스트           │ - 태그      │
└───────────────────────┴─────────────┘
```

**글 목록**: 기존 `custom-card-recent` 스타일 유지 (썸네일 + 카테고리 칩 + 제목 + 요약)

**필터 사이드바**: 홈 사이드바와 동일 컴포넌트 재사용 (프로필 카드 제외)

모바일: 사이드바 목록 아래로

---

## 6. 제거되는 것들

| 항목 | 이유 |
|---|---|
| 슬라이더 2번·3번 슬라이드 | 하프 히어로로 대체 |
| `snap-scroll` | 자연스러운 스크롤로 변경 |
| 우하단 FAB (햄버거·검색·홈·카테고리 버튼) | 인라인 네비로 대체 |
| category-modal | 네비 링크로 대체 |
| `<s_cover name="cover-categories">` 카테고리 그리드 | TOP POSTS + LATEST로 대체 |
| `slider-changer.js` | 슬라이더 제거 |

---

## 7. 새로 추가되는 JS

| 파일 | 역할 |
|---|---|
| `images/sticky-nav.js` | 히어로 벗어날 때 sticky nav 전환 |
| `images/reading-progress.js` | 읽기 진행 바 |
| `images/toc-generator.js` | h2/h3 파싱 → TOC 동적 생성 + IntersectionObserver |
| `images/reading-time.js` | 글자수 카운트 → 읽기 시간 계산 |

---

## 8. Tistory 치환자 구조 (변경 후)

```
<s_t3>
  <div id="wrap">
    <s_cover_group>
      <s_cover_rep>
        <!-- ① 히어로: 단독 전체폭 -->
        <s_cover name="cover-hero">
          <section> 하프 히어로 </section>
        </s_cover>

        <!-- ② 2컬럼 레이아웃: 피드 + 사이드바를 하나의 커버에 담음 -->
        <s_cover name="cover-main">
          <div class="flex gap-8 p-5">
            <div class="feed flex-1">
              <!-- TOP POSTS 2×2 (하드코딩) -->
              <!-- LATEST: <s_cover_item> 치환자 -->
            </div>
            <aside id="home-sidebar" class="w-64">
              <!-- 프로필·카테고리·태그 (하드코딩) -->
            </aside>
          </div>
        </s_cover>
      </s_cover_rep>
    </s_cover_group>
    <!-- s_cover_group은 홈 페이지에서만 렌더링 → 사이드바 홈 전용 보장 -->

    <article>
      <s_article_rep>
        <s_permalink_article_rep>         ← 아티클 (구조 변경)
      </s_article_rep>
      <s_list>                            ← 목록 페이지 (2컬럼: 글목록 + 필터사이드바)
    </article>
  </div>
</s_t3>
```

---

## 9. 미구현 유지 항목 (이번 스코프 외)

- 프로필 페이지 (`<s_page_rep>`)
- `<s_notice_rep>` 공지 페이지
- `<s_article_protected>` 보호 글 페이지
- `<s_index_article_rep>` (현재 주석 처리 상태 유지)
