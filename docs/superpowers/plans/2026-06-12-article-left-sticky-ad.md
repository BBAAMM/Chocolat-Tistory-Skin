# Article Left Sticky Ad Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a sticky AdSense ad column on the left side of article permalink pages, visible on xl (1280px+) desktop only.

**Architecture:** Wrap `<main>` in a flex-row container (`.article-ad-layout`). A new `<aside class="article-left-ad">` sits left of `<main>` with a `sticky top-20` inner div. CSS hides the aside below 1280px; the flex layout only activates at xl+. Ad init follows the existing `matchMedia` pattern to avoid pushing to hidden elements.

**Tech Stack:** Vanilla HTML, Tailwind (via `input.css` custom CSS), AdSense IIFE inline script

---

## Files

- Modify: `input.css` — add `.article-left-ad` and `.article-ad-layout` styles after `.article-shell` block (line ~216)
- Modify: `skin.html` — wrap `<main class="w-full flex flex-col">` (line 410) through `</main>` (line 484) with flex container + add `<aside>`
- Rebuilt: `style.css` — output of build command (never edit directly)

---

### Task 1: Add CSS to `input.css`

**Files:**
- Modify: `input.css` after line 216 (after `.article-shell` media query)

- [ ] **Step 1: Insert CSS block**

In `input.css`, after line 216 (`@media (min-width: 768px) { .article-shell { ... } }`), add:

```css

/* ============================================================
   Article left sticky ad column (xl+ desktop only)
   ============================================================ */
.article-left-ad { display: none; }

@media (min-width: 1280px) {
  .article-ad-layout { display: flex; }
  .article-left-ad {
    display: block;
    width: 160px;
    flex-shrink: 0;
    padding-right: 0.75rem;
  }
}
```

- [ ] **Step 2: Verify build compiles**

```bash
npx tailwindcss -i ./input.css -o ./style.css
```

Expected: exits 0, no errors. `style.css` updated timestamp.

- [ ] **Step 3: Commit**

```bash
git add input.css style.css
git commit -m "feat(ads): add article-left-ad layout CSS"
```

---

### Task 2: Modify `skin.html` — wrap `<main>` and add aside

**Files:**
- Modify: `skin.html` lines 410 and 484

- [ ] **Step 1: Add opening wrapper + aside before `<main>`**

In `skin.html`, replace line 410:
```html
              <main class="w-full flex flex-col">
```
with:
```html
              <div class="article-ad-layout">

              <!-- 아티클 왼쪽 사이드 광고 (xl+ 데스크탑) -->
              <aside class="article-left-ad">
                <div class="sticky top-20">
                  <ins class="adsbygoogle"
                       style="display:block"
                       data-ad-client="ca-pub-9700755749825783"
                       data-ad-slot="4037078819"
                       data-ad-format="auto"
                       data-full-width-responsive="true"></ins>
                  <script>
                    (function() {
                      var ins = document.currentScript.previousElementSibling;
                      function init() { (adsbygoogle = window.adsbygoogle || []).push({}); }
                      if (ins.offsetParent !== null) {
                        init();
                      } else {
                        var mq = window.matchMedia('(min-width: 1280px)');
                        function onMatch(e) {
                          if (e.matches) { init(); mq.removeEventListener('change', onMatch); }
                        }
                        if (mq.matches) { init(); } else { mq.addEventListener('change', onMatch); }
                      }
                    })();
                  </script>
                </div>
              </aside>

              <main class="w-full xl:flex-1 xl:min-w-0 flex flex-col">
```

- [ ] **Step 2: Close wrapper after `</main>`**

Replace line 484:
```html
              </main>
```
with:
```html
              </main>
              </div><!-- /article-ad-layout -->
```

- [ ] **Step 3: Verify Tistory tag pairs intact**

```bash
grep -c "<s_permalink_article_rep>" skin.html
grep -c "</s_permalink_article_rep>" skin.html
grep -c "<s_article_rep>" skin.html
grep -c "</s_article_rep>" skin.html
```

Expected: each pair returns `1`.

- [ ] **Step 4: Commit**

```bash
git add skin.html
git commit -m "feat(ads): add sticky left ad column to article permalink layout"
```

---

### Task 3: Final build + verify

**Files:**
- Rebuilt: `style.css`

- [ ] **Step 1: Minified build**

```bash
npx tailwindcss -i ./input.css -o ./style.css --minify
```

Expected: exits 0, no errors.

- [ ] **Step 2: Verify CSS present in output**

```bash
grep -c "article-left-ad" style.css
```

Expected: `1` (minified, so one occurrence of the class).

- [ ] **Step 3: Verify `<s_t3>` wrapper still intact**

```bash
grep -c "<s_t3>" skin.html
grep -c "</s_t3>" skin.html
```

Expected: each returns `1`.

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "build: minify CSS with article left ad styles"
```
