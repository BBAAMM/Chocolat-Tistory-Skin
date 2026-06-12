# Graph Report - Chocolat-Tistory-Skin  (2026-06-12)

## Corpus Check
- 57 files · ~55,205 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 94 nodes · 97 edges · 21 communities (19 shown, 2 thin omitted)
- Extraction: 79% EXTRACTED · 21% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.85)
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
- [[_COMMUNITY_Home Cover Grid Refactor|Home Cover Grid Refactor]]
- [[_COMMUNITY_Design Polish & Modals|Design Polish & Modals]]
- [[_COMMUNITY_Tailwind TS Config|Tailwind TS Config]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_Component Inventory|Component Inventory]]
- [[_COMMUNITY_Tailwind TS Config Object|Tailwind TS Config Object]]
- [[_COMMUNITY_Project README|Project README]]

## God Nodes (most connected - your core abstractions)
1. `Chocolat Skin Redesign Plan` - 8 edges
2. `Design Polish Plan` - 7 edges
3. `Chocolat Skin Claude Guide` - 6 edges
4. `Lighthouse Refactoring Proposal` - 6 edges
5. `Cover Refactor Plan` - 6 edges
6. `Performance Refactor Plan` - 6 edges
7. `Chocolat Skin Redesign Spec` - 6 edges
8. `Aesthetic Direction (Dark Minimal x Warm Accent)` - 5 edges
9. `Files` - 4 edges
10. `Cover Tree Structure (s_cover_rep)` - 4 edges

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

## Communities (21 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.33
Nodes (5): Article Left Sticky Ad Implementation Plan, Files, Task 1: Add CSS to `input.css`, Task 2: Modify `skin.html` — wrap `<main>` and add aside, Task 3: Final build + verify

### Community 1 - "Ads & Performance Refactor"
Cohesion: 0.24
Nodes (10): Featured Grid Ad Full-width Mobile Fix, Performance Refactor Plan, Profile Image CLS Prevention, Sidebar Fluid Ad Hidden-state Defer, AdSense Container Width 250px Fix, FontAwesome JS Kit to Inline SVG Sprite, jQuery $ is not a function Fix, Lighthouse Refactoring Proposal (+2 more)

### Community 2 - "Redesign: Reading Progress & TOC"
Cohesion: 0.20
Nodes (14): Half Hero + Inline Nav (cover-hero), Chocolat Skin Redesign Plan, reading-progress.js, reading-time.js, sticky-nav.js (Redesign Plan), Sticky TOC Article Layout, toc-generator.js, Article Header Warm Dark Gradient (+6 more)

### Community 3 - "Design System & Replacer Guide"
Cohesion: 0.20
Nodes (12): Tailwind Build Workflow (input.css to style.css), Chocolat Skin Claude Guide, Color Palette (Dark Chocolat), Cover Tree Structure (s_cover_rep), Tistory Replacer Tag System, Z-index Layering Scale, Aesthetic Direction (Dark Minimal x Warm Accent), DESIGN.md Color Palette (+4 more)

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
- **23 isolated node(s):** `Task 1: Add CSS to `input.css``, `Task 2: Modify `skin.html` — wrap `<main>` and add aside`, `Task 3: Final build + verify`, `autoprefixer`, `postcss` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Performance Refactor Plan` connect `Ads & Performance Refactor` to `Redesign: Reading Progress & TOC`, `Design System & Replacer Guide`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `Aesthetic Direction (Dark Minimal x Warm Accent)` connect `Design System & Replacer Guide` to `Redesign: Reading Progress & TOC`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **What connects `Task 1: Add CSS to `input.css``, `Task 2: Modify `skin.html` — wrap `<main>` and add aside`, `Task 3: Final build + verify` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._