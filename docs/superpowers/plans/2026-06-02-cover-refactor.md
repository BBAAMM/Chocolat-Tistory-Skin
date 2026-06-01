# Cover 리팩토링 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `cover-grid`를 `cover-featured`(2×2 `<s_cover_item>` 그리드)와 `cover-latest`(피드 + `<s_sidebar>`)로 분리하여 Tistory 커버 명세를 완전히 준수한다.

**Architecture:** `<s_cover_rep>` 안의 세 named cover(hero/featured/latest)가 각각 단일 역할을 갖는다. 사이드바는 커스텀 프로필 카드 + `<s_sidebar_element>` 치환자로 동적으로 렌더링된다. 하드코딩된 URL·썸네일·카테고리·태그는 모두 제거한다.

**Tech Stack:** HTML(Tistory 치환자), Tailwind CSS(`input.css` → `style.css`), npx tailwindcss

---

## 파일 맵

| 파일 | 변경 유형 | 내용 |
|---|---|---|
| `skin.html` | Modify | cover-grid 제거, cover-featured + cover-latest 추가, s_list 사이드바 교체 |
| `input.css` | Modify | `.sidebar-menu` 제거, `.sidebar-widget` 추가 |
| `style.css` | Rebuild | tailwindcss 빌드 출력 |
| `CLAUDE.md` | Modify | 커버 트리 업데이트 |

---

## Task 1: skin.html — cover-grid를 cover-featured + cover-latest로 교체

**Files:**
- Modify: `skin.html:242-453`

- [ ] **Step 1: cover-grid 전체 블록을 두 커버로 교체**

`skin.html`에서 아래 old_string을 new_string으로 교체한다.

**old_string** (line 242~453, `</s_cover_rep>` 포함):
```
            <!-- Recent Posts Section(main)[90%] -->
            <!-- TODO(1.14.2025) : Add Custom link -->
            <!-- TODO(3.2.2025) : Make Grid Layout -->
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
                            <figure class="flex gap-4 p-4 items-center">
                              <s_cover_item_thumbnail>
                                <div class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                                  <img
                                    class="w-full h-full object-cover"
                                    loading="lazy"
                                    src="//i1.daumcdn.net/thumb/C240x240.fwebp.q85/?fname=[##_cover_item_thumbnail_##]"
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

                  <!-- 프로필 카드 -->
                  <div class="bg-gray-800 rounded-xl p-5 flex flex-col items-center gap-3 text-center border border-gray-700">
                    <div class="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-pink-300 to-yellow-300 flex-shrink-0">
                      <img
                        src="https://github.com/BBAAMM.png"
                        alt="프로필"
                        class="w-full h-full object-cover"
                        onerror="this.parentElement.innerHTML='<span style=\'font-size:2rem\'>🍫</span>'"
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

                  <!-- 카테고리 ([##_blog_menu_##]) -->
                  <div>
                    <div class="flex items-center gap-3 mb-3">
                      <span class="font-english text-xs font-bold tracking-widest text-yellow-300">CATEGORIES</span>
                      <div class="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <div class="sidebar-menu">
                      [##_blog_menu_##]
                    </div>
                  </div>

                  <!-- 태그 (하드코딩) -->
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

              </div>
            </s_cover>
          </s_cover_rep>
```

**new_string:**
```
            <s_cover name="cover-featured">
              <section id="section-featured" class="bg-[#0d0d0d] px-5 pt-8 pb-2">
                <div class="flex items-center gap-3 mb-4">
                  <span class="font-english text-xs font-bold tracking-widest text-yellow-300">FEATURED</span>
                  <div class="flex-1 h-px bg-gray-800"></div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <s_cover_item>
                    <a href="[##_cover_item_url_##]" class="custom-card bg-gray-800 group overflow-hidden rounded-lg block">
                      <s_cover_item_thumbnail>
                        <img
                          class="w-full h-40 object-cover"
                          loading="lazy"
                          src="//i1.daumcdn.net/thumb/C300x200.fwebp.q85/?fname=[##_cover_item_thumbnail_##]"
                          alt=""
                        />
                      </s_cover_item_thumbnail>
                      <div class="p-3">
                        <s_cover_item_article_info>
                          <span class="inline-block font-ko font-bold text-xs rounded-3xl bg-pink-300 text-gray-900 px-2 py-0.5 mb-1">
                            [##_cover_item_category_##]
                          </span>
                        </s_cover_item_article_info>
                        <div class="font-highlight font-bold text-sm text-yellow-300 line-clamp-2">
                          [##_cover_item_title_##]
                        </div>
                      </div>
                    </a>
                  </s_cover_item>
                </div>
              </section>
            </s_cover>

            <s_cover name="cover-latest">
              <div class="flex flex-col lg:flex-row gap-5 p-5 bg-[#0d0d0d]">

                <!-- ── 피드 컬럼 ── -->
                <div class="flex-1 min-w-0 flex flex-col gap-4">
                  <div class="flex items-center gap-3 mb-1">
                    <span class="font-english text-xs font-bold tracking-widest text-yellow-300">LATEST</span>
                    <div class="flex-1 h-px bg-gray-800"></div>
                  </div>
                  <ul class="flex flex-col gap-3">
                    <s_cover_item>
                      <li class="custom-card custom-card-recent hover:bg-gray-700 transition duration-200 rounded-lg overflow-hidden">
                        <a href="[##_cover_item_url_##]">
                          <figure class="flex gap-4 p-4 items-center">
                            <s_cover_item_thumbnail>
                              <div class="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                                <img
                                  class="w-full h-full object-cover"
                                  loading="lazy"
                                  src="//i1.daumcdn.net/thumb/C240x240.fwebp.q85/?fname=[##_cover_item_thumbnail_##]"
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
                </div>
                <!-- ── 피드 컬럼 끝 ── -->

                <!-- ── 사이드바 ── -->
                <aside id="home-sidebar" class="hidden lg:flex flex-col gap-6 w-64 flex-shrink-0">

                  <!-- 프로필 카드 (커스텀 고정) -->
                  <div class="bg-gray-800 rounded-xl p-5 flex flex-col items-center gap-3 text-center border border-gray-700">
                    <div class="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-pink-300 to-yellow-300 flex-shrink-0">
                      <img
                        src="https://github.com/BBAAMM.png"
                        alt="프로필"
                        class="w-full h-full object-cover"
                        onerror="this.parentElement.innerHTML='<span style=\'font-size:2rem\'>🍫</span>'"
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

                  <!-- s_sidebar 위젯 -->
                  <s_sidebar>
                    <s_sidebar_element>
                      <div class="sidebar-widget" data-type="[##_sidebar_element_type_##]">
                        <div class="flex items-center gap-3 mb-3">
                          <span class="font-english text-xs font-bold tracking-widest text-yellow-300 uppercase">
                            [##_sidebar_element_title_##]
                          </span>
                          <div class="flex-1 h-px bg-gray-800"></div>
                        </div>
                        <div class="sidebar-widget-body">
                          [##_sidebar_element_content_##]
                        </div>
                      </div>
                    </s_sidebar_element>
                  </s_sidebar>

                </aside>
                <!-- ── 사이드바 끝 ── -->

              </div>
            </s_cover>
          </s_cover_rep>
```

- [ ] **Step 2: 구조 검증**

```bash
grep -c 's_cover name=' skin.html
```
Expected output: `3` (cover-hero, cover-featured, cover-latest)

```bash
grep '글URL\|썸네일URL\|카테고리[0-9]\|글 제목[0-9]' skin.html
```
Expected output: (출력 없음 — 하드코딩 완전 제거)

- [ ] **Step 3: 커밋**

```bash
git add skin.html
git commit -m "refactor: replace cover-grid with cover-featured + cover-latest"
```

---

## Task 2: skin.html — s_list 사이드바를 s_sidebar로 교체

**Files:**
- Modify: `skin.html` (`<s_list>` 내 aside 블록)

- [ ] **Step 1: s_list 사이드바 교체**

`skin.html`에서 아래 old_string을 new_string으로 교체한다.

**old_string:**
```
                  <!-- 카테고리 필터 ([##_blog_menu_##]) -->
                  <div>
                    <div class="flex items-center gap-3 mb-3">
                      <span class="font-english text-xs font-bold tracking-widest text-yellow-300">CATEGORIES</span>
                      <div class="flex-1 h-px bg-gray-800"></div>
                    </div>
                    <div class="sidebar-menu">
                      [##_blog_menu_##]
                    </div>
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
```

**new_string:**
```
                  <!-- s_sidebar 위젯 -->
                  <s_sidebar>
                    <s_sidebar_element>
                      <div class="sidebar-widget" data-type="[##_sidebar_element_type_##]">
                        <div class="flex items-center gap-3 mb-3">
                          <span class="font-english text-xs font-bold tracking-widest text-yellow-300 uppercase">
                            [##_sidebar_element_title_##]
                          </span>
                          <div class="flex-1 h-px bg-gray-800"></div>
                        </div>
                        <div class="sidebar-widget-body">
                          [##_sidebar_element_content_##]
                        </div>
                      </div>
                    </s_sidebar_element>
                  </s_sidebar>
```

- [ ] **Step 2: 검증**

```bash
grep -c 'sidebar-menu' skin.html
```
Expected output: `0` (`.sidebar-menu` 클래스 완전 제거)

```bash
grep -c '<s_sidebar>' skin.html
```
Expected output: `2` (cover-latest + s_list 각 1개)

- [ ] **Step 3: 커밋**

```bash
git add skin.html
git commit -m "refactor: replace s_list sidebar hardcoding with s_sidebar"
```

---

## Task 3: input.css — sidebar-menu 제거, sidebar-widget 추가

**Files:**
- Modify: `input.css`

- [ ] **Step 1: `.sidebar-menu` 블록 제거**

`input.css`에서 아래 old_string을 제거한다 (new_string은 빈 문자열).

**old_string:**
```
  /* Sidebar category menu (vertical, from [##_blog_menu_##]) */
  .sidebar-menu ul {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sidebar-menu ul li a {
    @apply flex items-center px-3 py-2 rounded-lg text-gray-300 text-sm transition duration-200 font-ko;
    padding-left: 2.25rem;
    position: relative;
  }
  .sidebar-menu ul li a::before {
    content: '';
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #f9a8d4;
    flex-shrink: 0;
  }
  .sidebar-menu ul li a:hover {
    @apply bg-gray-800 text-gray-100;
  }
  /* 서브카테고리 들여쓰기 */
  .sidebar-menu ul ul li a {
    padding-left: 3rem;
  }
  .sidebar-menu ul ul li a::before {
    left: 1.25rem;
    background-color: #fde047;
    width: 0.375rem;
    height: 0.375rem;
  }
```

**new_string:** *(빈 문자열 — 완전 삭제)*

- [ ] **Step 2: `.sidebar-widget` 스타일 추가**

`input.css`의 `.blog-nav ul li a:hover` 블록 바로 뒤에 추가한다.

**old_string:**
```
  .blog-nav ul li a:hover {
    @apply text-gray-200;
  }
```

**new_string:**
```
  .blog-nav ul li a:hover {
    @apply text-gray-200;
  }

  /* s_sidebar 위젯 공통 */
  .sidebar-widget {
    @apply mb-2;
  }
  .sidebar-widget-body ul {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sidebar-widget-body ul li a {
    @apply font-ko text-gray-300 text-sm transition duration-200;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem 0.5rem 2.25rem;
    border-radius: 0.5rem;
    position: relative;
  }
  .sidebar-widget-body ul li a::before {
    content: '';
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #f9a8d4;
  }
  .sidebar-widget-body ul li a:hover {
    @apply bg-gray-800 text-gray-100;
  }
  /* 서브카테고리 */
  .sidebar-widget-body ul ul {
    padding-left: 0.75rem;
  }
  .sidebar-widget-body ul ul li a {
    padding-left: 3rem;
  }
  .sidebar-widget-body ul ul li a::before {
    left: 1.25rem;
    background-color: #fde047;
    width: 0.375rem;
    height: 0.375rem;
  }
  /* 태그 위젯 */
  .sidebar-widget[data-type="tag"] .sidebar-widget-body,
  .sidebar-widget[data-type="tags"] .sidebar-widget-body {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .sidebar-widget[data-type="tag"] .sidebar-widget-body a,
  .sidebar-widget[data-type="tags"] .sidebar-widget-body a {
    @apply border border-gray-700 rounded-lg px-2 py-0.5 text-xs text-gray-400 transition duration-200;
  }
  .sidebar-widget[data-type="tag"] .sidebar-widget-body a:hover,
  .sidebar-widget[data-type="tags"] .sidebar-widget-body a:hover {
    @apply text-pink-300 border-pink-300;
  }
```

- [ ] **Step 3: 검증**

```bash
grep -c 'sidebar-menu' input.css
```
Expected output: `0`

```bash
grep -c 'sidebar-widget' input.css
```
Expected output: ≥ `10`

- [ ] **Step 4: 커밋**

```bash
git add input.css
git commit -m "refactor: replace sidebar-menu with sidebar-widget for s_sidebar"
```

---

## Task 4: CSS 빌드 + 최종 구조 검증

**Files:**
- Rebuild: `style.css`

- [ ] **Step 1: Tailwind 빌드**

```bash
npx tailwindcss -i ./input.css -o ./style.css --minify
```
Expected output:
```
Done in ...ms.
```
빌드 실패 시 오류 메시지를 확인하여 `input.css` 문법 오류를 수정한 뒤 재실행.

- [ ] **Step 2: 치환자 쌍 검증**

```bash
grep -E '<s_cover |</s_cover>' skin.html | grep -v 'name='
```
Expected: `</s_cover>` 3개 (각 커버 닫는 태그)

```bash
grep -E '<s_cover_item>|</s_cover_item>' skin.html
```
Expected: `<s_cover_item>` 2개, `</s_cover_item>` 2개 (featured + latest 각 1쌍)

```bash
grep -E '<s_sidebar>|</s_sidebar>' skin.html
```
Expected: `<s_sidebar>` 2개, `</s_sidebar>` 2개 (home + list 각 1쌍)

```bash
grep -E '<s_sidebar_element>|</s_sidebar_element>' skin.html
```
Expected: `<s_sidebar_element>` 2개, `</s_sidebar_element>` 2개

- [ ] **Step 3: 커밋**

```bash
git add style.css
git commit -m "build: rebuild style.css after cover refactor"
```

---

## Task 5: CLAUDE.md 커버 트리 업데이트

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: 커버 트리 교체**

`CLAUDE.md`에서 아래 old_string을 new_string으로 교체한다.

**old_string:**
```
│   ├── <s_cover name="cover-hero">         히어로 (구현됨)
│   └── <s_cover name="cover-grid">        홈 메인 (구현됨)
```

**new_string:**
```
│   ├── <s_cover name="cover-hero">         히어로 (구현됨)
│   ├── <s_cover name="cover-featured">     피처드 2×2 그리드 (구현됨)
│   └── <s_cover name="cover-latest">       최신 피드 + s_sidebar (구현됨)
```

- [ ] **Step 2: 커밋**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md cover tree after refactor"
```

---

## Tistory Admin 설정 안내 (코드 외)

리팩토링 완료 후 Tistory 스킨 적용 전에 아래를 설정해야 한다:

1. **cover-hero**: 기존 설정 유지
2. **cover-featured**: 새 커버 생성 → 피처드 글 4개 수동 선정
3. **cover-latest**: 새 커버 생성 → 최신 글 자동 표시 설정
4. **사이드바 위젯**: Tistory 블로그 관리 → 꾸미기 → 사이드바에서 카테고리·태그 위젯 활성화
