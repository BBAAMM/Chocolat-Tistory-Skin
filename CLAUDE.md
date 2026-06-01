# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 레퍼런스
- 내 블로그: https://codezaram.tistory.com
- Tistory 치환자 공식 문서: https://tistory.github.io/document-tistory-skin/
- GitHub: https://github.com/BBAAMM/Chocolat-Tistory-Skin

## 개발 명령어
```bash
npx tailwindcss -i ./input.css -o ./style.css --watch    # 개발
npx tailwindcss -i ./input.css -o ./style.css --minify   # 빌드
```
빌드 후 `style.css` 내용을 Tistory 스킨 편집기 CSS 필드에 붙여넣기. `style.css` 직접 편집 금지.

## 스택
- **CSS**: `input.css` → Tailwind 소스. 커스텀은 `@layer utilities`에 추가. `style.css` → 컴파일 출력 (`skin.html`이 참조). `index.html`은 CDN(`cdn.tailwindcss.com`) 병용 — 클래스 불일치 주의.
- **JS**: Vanilla ES6, `defer` 로드. `import/export` 사용 불가(Tistory 제약). GSAP·FontAwesome CDN 사용.
- **폰트** (`tailwind.config.js`): `font-welcome`=Moirai One, `font-highlight`=HSSanTokki, `font-ko`=WooJu, `font-english`=Montserrat Alternates

## Tistory 치환자
- 그룹/조건: `<s_NAME>...</s_NAME>` — 값: `[##_NAME_##]`
- **`<s_t3>`로 `#wrap` 전체를 반드시 감쌀 것**

```
<s_t3> > #wrap
├── <s_cover_group> > <s_cover_rep>
│   ├── <s_cover name="cover-hero">         히어로 (구현됨)
│   └── <s_cover name="cover-grid">        홈 메인 (구현됨)
├── <article>
│   ├── <s_page_rep> / <s_notice_rep> / <s_article_protected>
│   ├── <s_article_rep> > <s_permalink_article_rep>  글 본문 (구현됨)
│   │                   > <s_index_article_rep>       글 목록 (주석처리됨)
│   └── <s_list>  카테고리/태그 목록 (구현됨)
└── 태그 영역 (미구현)
```

## 디자인 패턴

**썸네일 URL**: `//i1.daumcdn.net/thumb/C300x300.fwebp.q85/?fname=[##_..._thumbnail_raw_url_##]`

**색상 팔레트**:
| 용도 | 클래스 |
|---|---|
| 배경 (최다크) | `bg-[#121212]` |
| 카드 배경 | `bg-gray-800` |
| 섹션 배경 | `bg-gray-700` |
| 라이트 섹션 | `bg-gray-200` |
| 포인트 | `bg-pink-300` / `text-pink-200` |
| 제목 | `text-yellow-300` |
| 본문 | `text-gray-200` |

**Z-index**: `#overlay`=10, 모달=20, `.menu-button`=30, `#hamburger-button`=50

## 미구현 TODO
- `<s_index_article_rep>` 활성화 (현재 주석처리)
- 2·3번 슬라이드 콘텐츠
- `category-modal` 치환자 연결
- 프로필 페이지, 태그 영역

## 체크리스트
- [ ] 빌드 후 `style.css` 업데이트 (`npx tailwindcss -i ./input.css -o ./style.css --minify`)
- [ ] `<s_t3>` 래퍼 유지, 치환자 태그 쌍 누락 없는지 확인
- [ ] 새 JS 파일 → `images/` + `<head>`에 `defer` 추가
