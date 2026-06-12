# Article Left Sticky Ad — Design Spec

**Date:** 2026-06-12  
**Scope:** Permalink article page only (`s_article_rep > s_permalink_article_rep`)

---

## Goal

Add a sticky advertisement column on the left side of the article content area, visible on desktop (xl: 1280px+) only. Scrolls with the page but remains fixed in viewport via `position: sticky`.

## Non-Goals

- Not shown on home/list/category pages
- No right-side counterpart
- No change to mobile layout

---

## Implementation

### 1. HTML (`skin.html`)

Wrap `<main class="w-full flex flex-col">` inside `s_permalink_article_rep` with a new flex container. Add a left `<aside>` for the ad before `<main>`.

```html
<div class="article-ad-layout">

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
    <!-- existing article content unchanged -->
  </main>

</div>
```

**Key points:**
- `top-20` (80px) clears the sticky nav (`h-14` = 56px) with headroom
- `matchMedia('(min-width: 1280px)')` mirrors existing home sidebar ad pattern — prevents push on hidden elements
- `xl:flex-1 xl:min-w-0` on `<main>` allows proper flex shrinking; `w-full` remains for mobile

### 2. CSS (`input.css`)

Add near the `.article-shell` section:

```css
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

**Why `align-items` omitted:** Default `stretch` is intentional — aside stretches to match `<main>` height, giving `position: sticky` its full scroll range.

### 3. Build

```bash
npx tailwindcss -i ./input.css -o ./style.css --minify
```

---

## Constraints

- Tistory: no `import/export` in JS → IIFE pattern used ✓
- No new JS file needed (inline script sufficient)
- `style.css` direct edit forbidden → only `input.css`
- `<s_t3>` wrapper unaffected (change is inside `s_article_rep`)
