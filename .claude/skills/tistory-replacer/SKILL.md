---
name: tistory-replacer
description: >
  Use when writing or modifying Tistory skin HTML (index.html), working with
  Tistory replacer tags ([##_..._##], <s_...>), or implementing new page sections
  such as covers, article views, lists, comments, or tag clouds.
---

Tistory 치환자 레퍼런스. 자세한 내용은 replacer-reference.md 참조.

## 핵심 규칙
- `<s_t3>` 로 `#wrap` 전체를 반드시 감쌀 것 (Tistory 공통 JS 삽입)
- 그룹 치환자 `<s_NAME>...</s_NAME>` 쌍 누락 금지
- `[##_body_id_##]` 값으로 현재 페이지 타입 판별 가능 (index, post, category 등)

## 페이지별 주요 태그

| 페이지 | 최상위 태그 | 하위 태그 |
|---|---|---|
| 홈 커버 | `<s_cover_group>` | `<s_cover_rep>` → `<s_cover name="...">` → `<s_cover_item>` |
| 글 본문 | `<s_article_rep>` | `<s_permalink_article_rep>` (상세), `<s_index_article_rep>` (목록) |
| 공지 | `<s_notice_rep>` | `<s_permalink_article_rep>` / `<s_index_article_rep>` |
| 보호글 | `<s_article_protected>` | `<s_permalink_article_rep>` / `<s_index_article_rep>` |
| 카테고리/목록 | `<s_list>` | `<s_list_rep>` → `<s_list_rep_thumbnail>` |
| 댓글 | `<s_rp>` | `<s_rp_container>` → `<s_rp_rep>` |
| 태그 클라우드 | `<s_tag>` | `<s_tag_rep>` |

## 자주 쓰는 치환자 빠른 참조

**글로벌**
- `[##_title_##]` 블로그 제목 · `[##_blog_link_##]` 블로그 URL · `[##_page_title_##]` 페이지 제목

**글 공통** (`article_rep` / `notice_rep` / `list_rep` 모두 동일 패턴)
- `[##_*_title_##]` 제목 · `[##_*_link_##]` URL · `[##_*_desc_##]` 본문
- `[##_*_category_##]` 카테고리명 · `[##_*_date_##]` 날짜 · `[##_*_author_##]` 작성자
- `[##_*_summary_##]` 요약 (index only) · `[##_*_thumbnail_raw_url_##]` 썸네일 원본 URL

**댓글 간편**
- `[##_comment_group_##]` — 댓글 수/목록/입력폼 자동 렌더링 (커스터마이징 불필요 시)

**태그 클라우드**
- `[##_tag_name_##]` · `[##_tag_link_##]` · `[##_tag_class_##]` (cloud1~cloud5, 빈도 순)
