# Tistory 치환자 전체 레퍼런스

공식 문서: https://tistory.github.io/document-tistory-skin/

---

## 글로벌 (`<s_t3>` 필수)

| 치환자 | 설명 |
|---|---|
| `[##_title_##]` | 블로그 제목 |
| `[##_desc_##]` | 블로그 설명 |
| `[##_image_##]` | 블로그 대표 이미지 URL |
| `[##_blog_image_##]` | 블로그 이미지 IMG 태그 |
| `[##_blogger_##]` | 블로그 주인 필명 |
| `[##_blog_link_##]` | 블로그 URL |
| `[##_rss_url_##]` | RSS 주소 |
| `[##_taglog_link_##]` | 태그로그 URL |
| `[##_guestbook_link_##]` | 방명록 URL |
| `[##_page_title_##]` | 페이지 제목 |
| `[##_body_id_##]` | 페이지 타입 ID (index/post/category/archive/tag/search/guestbook/location) |
| `[##_blog_menu_##]` | 블로그 메뉴 목록 |
| `[##_revenue_list_upper_##]` | 홈/목록 상단 광고 |
| `[##_revenue_list_lower_##]` | 홈/목록 하단 광고 |

---

## 홈 커버

```
<s_cover_group>
  <s_cover_rep>
    <s_cover name="커버이름">
      [##_cover_title_##]   ← 커버 제목
      [##_cover_url_##]     ← 커버 URL
      <s_cover_url>...</s_cover_url>   ← URL 있을 때만 렌더
      <s_cover_item>
        <s_cover_item_article_info>   ← 아티클 타입만
        <s_cover_item_not_article_info>  ← 비아티클 타입만
        <s_cover_item_thumbnail>      ← 썸네일 있을 때만
      </s_cover_item>
    </s_cover>
  </s_cover_rep>
</s_cover_group>
```

| 치환자 | 설명 |
|---|---|
| `[##_cover_title_##]` | 커버 제목 |
| `[##_cover_url_##]` | 커버 URL |
| `[##_cover_item_title_##]` | 콘텐츠 제목 |
| `[##_cover_item_summary_##]` | 콘텐츠 요약 |
| `[##_cover_item_url_##]` | 콘텐츠 URL |
| `[##_cover_item_thumbnail_##]` | 콘텐츠 이미지 |
| `[##_cover_item_category_##]` | 카테고리명 (아티클) |
| `[##_cover_item_category_url_##]` | 카테고리 URL (아티클) |
| `[##_cover_item_date_##]` | 날짜시간 yyyy.mm.dd HH:MM (아티클) |
| `[##_cover_item_simple_date_##]` | 날짜 yyyy.mm.dd (아티클) |
| `[##_cover_item_comment_count_##]` | 댓글 수 (아티클) |

---

## 글 (`<s_article_rep>`)

```
<s_article_rep>
  <s_index_article_rep>   ← 목록 페이지만
    <s_article_rep_thumbnail>
      [##_article_rep_thumbnail_raw_url_##]
    </s_article_rep_thumbnail>
  </s_index_article_rep>
  <s_permalink_article_rep>   ← 상세 페이지만
    <s_tag_label>...</s_tag_label>
    <s_article_related>
      <s_article_related_rep>
        <s_article_related_rep_thumbnail>
          [##_article_related_rep_thumbnail_link_##]
        </s_article_related_rep_thumbnail>
      </s_article_related_rep>
    </s_article_related>
    <s_rp>...</s_rp>
  </s_permalink_article_rep>
</s_article_rep>
```

| 치환자 | 설명 |
|---|---|
| `[##_article_rep_link_##]` | 글 URL |
| `[##_article_rep_title_##]` | 글 제목 |
| `[##_article_rep_category_##]` | 카테고리명 |
| `[##_article_rep_category_link_##]` | 카테고리 URL |
| `[##_article_rep_author_##]` | 작성자 |
| `[##_article_rep_date_##]` | 날짜시간 yyyy. m. d. HH:MM |
| `[##_article_rep_simple_date_##]` | 날짜 yyyy. m. d. |
| `[##_article_rep_desc_##]` | 본문 |
| `[##_article_rep_summary_##]` | 요약 (목록용) |
| `[##_article_rep_thumbnail_url_##]` | 썸네일 URL |
| `[##_article_rep_thumbnail_raw_url_##]` | 썸네일 원본 URL |
| `[##_article_rep_rp_cnt_##]` | 댓글 수 |
| `[##_article_rep_rp_link_##]` | 댓글 토글 onclick |
| `[##_article_related_rep_title_##]` | 관련글 제목 |
| `[##_article_related_rep_link_##]` | 관련글 URL |
| `[##_article_related_rep_thumbnail_link_##]` | 관련글 썸네일 |

---

## 공지 (`<s_notice_rep>`)

글 치환자와 동일 패턴, prefix만 `notice_rep_`로 변경.

| 치환자 | 설명 |
|---|---|
| `[##_notice_rep_link_##]` | URL |
| `[##_notice_rep_title_##]` | 제목 |
| `[##_notice_rep_desc_##]` | 본문 |
| `[##_notice_rep_author_##]` | 작성자 (팀블로그) |
| `[##_notice_rep_date_##]` | 날짜시간 |
| `[##_notice_rep_summary_##]` | 요약 (목록용) |
| `[##_notice_rep_thumbnail_raw_url_##]` | 썸네일 원본 URL |

---

## 목록 (`<s_list>`)

```
<s_list>
  <s_list_rep>
    <s_list_rep_thumbnail>
      [##_list_rep_thumbnail_raw_url_##]
    </s_list_rep_thumbnail>
  </s_list_rep>
</s_list>
```

| 치환자 | 설명 |
|---|---|
| `[##_list_conform_##]` | 목록 제목 (카테고리명/태그명 등) |
| `[##_list_style_##]` | 목록 스타일 |
| `[##_list_rep_link_##]` | 글 URL |
| `[##_list_rep_title_##]` | 글 제목 |
| `[##_list_rep_category_##]` | 카테고리명 |
| `[##_list_rep_date_##]` | 날짜 |
| `[##_list_rep_summary_##]` | 요약 |
| `[##_list_rep_thumbnail_raw_url_##]` | 썸네일 원본 URL |

---

## 댓글 (`<s_rp>`)

```
<s_rp>
  [##_comment_group_##]   ← 간편 렌더링 (커스터마이징 불필요 시)

  <!-- 또는 직접 구성 -->
  <s_rp_container>
    <s_rp_rep>
      [##_rp_rep_id_##] [##_rp_rep_name_##]
      [##_rp_rep_desc_##] [##_rp_rep_date_##]
      [##_rp_rep_logo_##]
      [##_rp_rep_onclick_delete_##] [##_rp_rep_onclick_reply_##]
      <s_rp2_container>
        <s_rp2_rep>...</s_rp2_rep>
      </s_rp2_container>
    </s_rp_rep>
  </s_rp_container>
  <s_rp_input_form>
    <s_rp_member>...</s_rp_member>
    <s_rp_guest>
      [##_rp_input_name_##] [##_rp_input_password_##]
      [##_rp_input_homepage_##] [##_rp_input_is_secret_##]
    </s_rp_guest>
    [##_rp_input_comment_##]
    [##_rp_onclick_submit_##]
  </s_rp_input_form>
</s_rp>
```

---

## 태그 클라우드 (`<s_tag>`)

```
<s_tag>
  <s_tag_rep>
    <a href="[##_tag_link_##]" class="[##_tag_class_##]">[##_tag_name_##]</a>
  </s_tag_rep>
</s_tag>
```

`[##_tag_class_##]` 값: `cloud1`(최다) ~ `cloud5`(최소)

---

## 보호글 (`<s_article_protected>`)

```
<s_article_protected>
  <s_index_article_rep>...</s_index_article_rep>
  <s_permalink_article_rep>
    [##_article_rep_desc_##]   ← 비밀번호 입력 폼 포함
    [##_article_dissolve_##]   ← form onsubmit 핸들러
    [##_article_password_##]   ← password input id/name
  </s_permalink_article_rep>
</s_article_protected>
```

---

## 관리자 기능 (`<s_ad_div>`)

관리 권한 있을 때만 렌더. 글 편집/삭제/상태변경 버튼용.

| 치환자 | 설명 |
|---|---|
| `[##_s_ad_m_link_##]` | 수정 링크 |
| `[##_s_ad_m_onclick_##]` | 수정창 onclick |
| `[##_s_ad_s1_label_##]` | 현재 발행 상태 |
| `[##_s_ad_s2_label_##]` | 다음 발행 상태 |
| `[##_s_ad_s2_onclick_##]` | 상태 변경 onclick |
| `[##_s_ad_d_onclick_##]` | 삭제 onclick |
