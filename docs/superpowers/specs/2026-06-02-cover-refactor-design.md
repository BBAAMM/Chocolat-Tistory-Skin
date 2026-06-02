# Cover 리팩토링 설계 스펙

**날짜**: 2026-06-02  
**범위**: `skin.html` 홈 커버 구조 재설계

---

## 목표

`cover-grid` 하나에 뭉쳐 있던 홈 화면을 Tistory 커버 명세에 맞게 세 개의 독립된 커버로 분리한다. 하드코딩된 TOP POSTS를 `<s_cover_item>` 기반으로 교체하고, 사이드바를 `<s_sidebar>` 치환자로 전환한다.

---

## Non-Goals

- `cover-hero` 내부 레이아웃 변경 없음
- `<article>` 영역 (글 상세·목록·카테고리 페이지) 변경 없음
- JS 파일 신규 추가 없음

---

## 전체 구조

```
<s_t3>
  <div id="wrap">
    <s_cover_group>
      <s_cover_rep>
        <s_cover name="cover-hero">      ← 기존 유지
        <s_cover name="cover-featured">  ← 신규 (기존 TOP POSTS 대체)
        <s_cover name="cover-latest">    ← cover-grid 분리·리네임
      </s_cover_rep>
    </s_cover_group>
    <article>...</article>
  </div>
</s_t3>
```

---

## cover-featured

### 역할
Tistory admin에서 수동으로 선정한 피처드 글 4개를 2×2 그리드로 표시한다.

### 치환자
| 치환자 | 용도 |
|---|---|
| `[##_cover_item_url_##]` | 글 링크 |
| `[##_cover_item_title_##]` | 글 제목 |
| `[##_cover_item_category_##]` | 카테고리명 (`<s_cover_item_article_info>` 안) |
| `[##_cover_item_thumbnail_##]` | 썸네일 URL (`<s_cover_item_thumbnail>` 안) |

### 레이아웃
- 섹션 헤더: "FEATURED" 라벨 + 구분선
- `<s_cover_item>` → `grid grid-cols-2 gap-4`
- 각 카드: 썸네일(상단, `h-40`) + 카테고리 뱃지 + 제목 2줄
- 디자인 패턴: 기존 TOP POSTS 카드 스타일 그대로 (`bg-gray-800`, `text-yellow-300`)

### Tistory admin 설정 요건
- `cover-featured` 커버 생성, 글 4개 수동 선정

---

## cover-latest

### 역할
최신 글 피드(좌)와 사이드바(우)를 2컬럼으로 구성한다.

### 피드 컬럼
- 섹션 헤더: "LATEST" 라벨 + 구분선
- `<s_cover_item>` → 수평 리스트 (`flex gap-4 p-4`)
- 썸네일: `w-24 h-24` (`<s_cover_item_thumbnail>` 조건부)
- 카테고리 뱃지, 제목, 요약

### 사이드바 컬럼 (lg 이상, w-64)

#### 프로필 카드 (커스텀 고정)
- GitHub 아바타, 이름, 소개, GitHub/이메일 링크
- 변경 없음

#### `<s_sidebar>` 위젯 영역
```html
<s_sidebar>
  <s_sidebar_element>
    [##_sidebar_element_title_##]
    [##_sidebar_element_content_##]
  </s_sidebar_element>
</s_sidebar>
```
- `[##_sidebar_element_content_##]`: Tistory가 렌더링한 위젯 HTML 주입
- CSS로 `.sidebar-widget` 스타일 적용 (`input.css` `@layer utilities`에 추가)
- 위젯 타입별 스타일 분기: `[##_sidebar_element_type_##]` 값을 `data-type` 속성으로 전달

#### 제거 대상
- `[##_blog_menu_##]` 기반 카테고리 (홈 사이드바)
- `[##_blog_menu_##]` 기반 카테고리 (리스트 페이지 사이드바)
- 하드코딩 태그 링크

---

## CSS 변경 (`input.css`)

### 추가
```css
/* s_sidebar 위젯 공통 */
.sidebar-widget { ... }
.sidebar-widget ul { list-style: none; padding: 0; margin: 0; }
.sidebar-widget ul li a { ... }

/* category 위젯 Tistory 출력 스타일 재정의 */
.sidebar-widget[data-type="category"] ul li a { ... }

/* tag 위젯 */
.sidebar-widget[data-type="tag"] { display: flex; flex-wrap: wrap; gap: 0.5rem; }
```

`data-type` 적용 방법: `<s_sidebar_element>` 래퍼 div에 `data-type="[##_sidebar_element_type_##]"` 어트리뷰트를 직접 부여.

```html
<s_sidebar_element>
  <div class="sidebar-widget" data-type="[##_sidebar_element_type_##]">
    <div class="sidebar-widget-header">[##_sidebar_element_title_##]</div>
    <div class="sidebar-widget-body">[##_sidebar_element_content_##]</div>
  </div>
</s_sidebar_element>
```

### 유지
- `.blog-nav` — sticky nav + hero nav이 `[##_blog_menu_##]`를 계속 사용하므로 유지

### 제거
- `.sidebar-menu` — `<s_sidebar>` 치환자로 대체되므로 제거

---

## CLAUDE.md 업데이트 대상

```
├── <s_cover name="cover-hero">     히어로
├── <s_cover name="cover-featured"> 피처드 2×2 (신규)
└── <s_cover name="cover-latest">   최신 피드 + 사이드바
```

---

## 검증 체크리스트

- [ ] `<s_t3>` 래퍼 유지
- [ ] `<s_cover_rep>` 안에 세 커버 모두 존재
- [ ] `cover-featured`에 `<s_cover_item>` 사용, 하드코딩 없음
- [ ] `cover-latest`에 `<s_sidebar>` + `<s_sidebar_element>` 쌍 유지
- [ ] `[##_blog_menu_##]` nav에서만 사용 (사이드바에서 제거)
- [ ] `npx tailwindcss -i ./input.css -o ./style.css --minify` 성공
