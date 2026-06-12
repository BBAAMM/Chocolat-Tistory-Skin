# Graph Report - Chocolat-Tistory-Skin  (2026-06-12)

## Corpus Check
- 57 files · ~55,205 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 119 nodes · 115 edges · 24 communities (20 shown, 4 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f8f85153`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Ads & Performance Refactor|Ads & Performance Refactor]]
- [[_COMMUNITY_Redesign Reading Progress & TOC|Redesign: Reading Progress & TOC]]
- [[_COMMUNITY_Design System & Replacer Guide|Design System & Replacer Guide]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Home Cover Grid Refactor|Home Cover Grid Refactor]]
- [[_COMMUNITY_Design Polish & Modals|Design Polish & Modals]]
- [[_COMMUNITY_Tailwind TS Config|Tailwind TS Config]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Component Inventory|Component Inventory]]
- [[_COMMUNITY_Tailwind TS Config Object|Tailwind TS Config Object]]
- [[_COMMUNITY_Project README|Project README]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `Performance Refactoring Implementation Plan` - 11 edges
2. `수정 가능한 문제 (우선순위 순)` - 8 edges
3. `Chocolat Skin Redesign Plan` - 8 edges
4. `Design Polish Plan` - 7 edges
5. `리팩터링 제안서` - 6 edges
6. `Chocolat Skin Claude Guide` - 6 edges
7. `Cover Refactor Plan` - 6 edges
8. `Chocolat Skin Redesign Spec` - 6 edges
9. `Aesthetic Direction (Dark Minimal x Warm Accent)` - 5 edges
10. `Files` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Typography System` --shares_data_with--> `Chocolat Skin Claude Guide`  [INFERRED]
  DESIGN.md → CLAUDE.md
- `Cover Refactor Plan` --references--> `Cover Tree Structure (s_cover_rep)`  [EXTRACTED]
  docs/superpowers/plans/2026-06-02-cover-refactor.md → CLAUDE.md
- `Cover Refactor Design Spec` --references--> `Cover Tree Structure (s_cover_rep)`  [EXTRACTED]
  docs/superpowers/specs/2026-06-02-cover-refactor-design.md → CLAUDE.md
- `Color Palette (Dark Chocolat)` --shares_data_with--> `DESIGN.md Color Palette`  [INFERRED]
  CLAUDE.md → DESIGN.md
- `Chocolat Skin Redesign Spec` --references--> `Aesthetic Direction (Dark Minimal x Warm Accent)`  [EXTRACTED]
  docs/superpowers/specs/2026-06-01-chocolat-skin-redesign.md → DESIGN.md

## Import Cycles
- 1-file cycle: `tailwind.config.ts -> tailwind.config.ts`

## Hyperedges (group relationships)
- **Redesign Article-page JS Components** — plans_chocolat_skin_redesign_reading_progress, plans_chocolat_skin_redesign_reading_time, plans_chocolat_skin_redesign_toc_generator, plans_chocolat_skin_redesign_sticky_nav [EXTRACTED 1.00]
- **AdSense Width/Hidden-init Error Mitigation** — refactoring_proposal_adsense_width, plans_performance_refactor_featured_ad_width, plans_performance_refactor_sidebar_ad_defer, plans_article_left_sticky_ad_matchmedia_init [INFERRED 0.85]
- **Three-Cover Home Split (hero/featured/latest)** — plans_chocolat_skin_redesign_cover_grid, plans_cover_refactor_cover_featured, plans_cover_refactor_cover_latest, claude_cover_tree [EXTRACTED 1.00]
- **Home Cover Sections** — skin_cover_hero, skin_cover_featured, skin_cover_latest, skin_cover_footer [EXTRACTED 1.00]
- **Deferred JS Widgets** — skin_js_stickynav, skin_js_readingtime, skin_js_chapterbar, skin_js_searchmodal, skin_js_fab, skin_js_articleleftad, skin_js_typewriter [EXTRACTED 1.00]
- **Search Modal Triggers** — skin_sticky_nav, skin_cover_hero, skin_fab, skin_search_modal [INFERRED 0.85]

## Communities (24 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.33
Nodes (5): Article Left Sticky Ad Implementation Plan, Files, Task 1: Add CSS to `input.css`, Task 2: Modify `skin.html` — wrap `<main>` and add aside, Task 3: Final build + verify

### Community 1 - "Ads & Performance Refactor"
Cohesion: 0.11
Nodes (18): Performance Refactoring Implementation Plan, Self-Review, Spec coverage 검토, Task 1: 비차단 Google Fonts 로드, Task 2: sticky-nav.js 강제 리플로우 캐싱, Task 3: Featured 그리드 광고 — 모바일 너비 250px 미만 수정, Task 4: 홈 사이드바 Fluid 광고 — hidden 상태 초기화 방지, Task 5: 프로필 이미지 CLS 방지 (+10 more)

### Community 2 - "Redesign: Reading Progress & TOC"
Cohesion: 0.22
Nodes (13): Half Hero + Inline Nav (cover-hero), Chocolat Skin Redesign Plan, reading-progress.js, reading-time.js, sticky-nav.js (Redesign Plan), Sticky TOC Article Layout, toc-generator.js, Article Header Warm Dark Gradient (+5 more)

### Community 3 - "Design System & Replacer Guide"
Cohesion: 0.22
Nodes (11): Tailwind Build Workflow (input.css to style.css), Chocolat Skin Claude Guide, Color Palette (Dark Chocolat), Cover Tree Structure (s_cover_rep), Tistory Replacer Tag System, Z-index Layering Scale, Aesthetic Direction (Dark Minimal x Warm Accent), DESIGN.md Color Palette (+3 more)

### Community 4 - "Community 4"
Cohesion: 0.14
Nodes (13): 🔴 P0 — `cdn.tailwindcss.com` 제거 (126KB + 렌더 블로킹), 🔴 P0 — FontAwesome JS Kit → 인라인 SVG 교체 (549KB → ~2KB), 🔴 P0 — `post-fallback.png` → WebP 변환 (575KB → ~30KB), 🟠 P1 — AdSense 광고 컨테이너 너비 에러 수정, 🟠 P1 — jQuery `$ is not a function` 에러 수정, 🟡 P2 — 429 에러 원인 조사, 🟡 P2 — Google Fonts 미사용 CSS 제거 (13KB), 리팩터링 제안서 (+5 more)

### Community 6 - "Home Cover Grid Refactor"
Cohesion: 0.39
Nodes (8): Home cover-grid 2-col Layout, cover-featured (2x2 Grid), cover-latest (Feed + Sidebar), Cover Refactor Plan, s_sidebar Replacer Migration, sidebar-widget (s_sidebar CSS), Home 2-Column Layout Spec, Cover Refactor Design Spec

### Community 7 - "Design Polish & Modals"
Cohesion: 0.29
Nodes (8): Category Modal Darkening + Close Button, CSS Global Pollution Fix (content-details h2), FAB Icon Toggle (bars/xmark), hamburger-button.js, Design Polish Plan, Search Modal Darkening, Slider Number Indicator, slider-changer.js

### Community 8 - "Tailwind TS Config"
Cohesion: 0.25
Nodes (7): compilerOptions, module, noEmit, exclude, extends, include, $schema

### Community 9 - "Package Dependencies"
Cohesion: 0.40
Nodes (4): dependencies, autoprefixer, postcss, tailwindcss

### Community 10 - "Component Inventory"
Cohesion: 0.67
Nodes (3): Component Inventory, FloatingFAB Component, HeroSlider Component

## Knowledge Gaps
- **47 isolated node(s):** `현재 점수`, `🔴 P0 — `cdn.tailwindcss.com` 제거 (126KB + 렌더 블로킹)`, `🔴 P0 — FontAwesome JS Kit → 인라인 SVG 교체 (549KB → ~2KB)`, `🔴 P0 — `post-fallback.png` → WebP 변환 (575KB → ~30KB)`, `🟠 P1 — jQuery `$ is not a function` 에러 수정` (+42 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Aesthetic Direction (Dark Minimal x Warm Accent)` connect `Design System & Replacer Guide` to `Redesign: Reading Progress & TOC`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `Design Polish Plan` connect `Design Polish & Modals` to `Redesign: Reading Progress & TOC`, `Design System & Replacer Guide`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `Chocolat Skin Redesign Plan` connect `Redesign: Reading Progress & TOC` to `Home Cover Grid Refactor`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `현재 점수`, `🔴 P0 — `cdn.tailwindcss.com` 제거 (126KB + 렌더 블로킹)`, `🔴 P0 — FontAwesome JS Kit → 인라인 SVG 교체 (549KB → ~2KB)` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Ads & Performance Refactor` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._