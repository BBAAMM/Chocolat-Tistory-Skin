---
name: tw-component
description: >
  Use when a repeated class pattern in index.html needs extracting, or a new UI
  element needs custom styling in style.css. Pass component name/purpose via $ARGUMENTS.
---

"$ARGUMENTS"에 해당하는 Tailwind 컴포넌트를 style.css에 추가한다.

```css
@layer utilities {
  .새컴포넌트명 {
    @apply ... ;
  }
}
```
(`@layer components` 아님 — 기존 코드와 레이어 통일)

## 규칙
- **네이밍**: `custom-*` prefix + kebab-case (기존: `custom-card`, `custom-card-recent`, `custom-card-popular`)
- **디자인 토큰**: DESIGN.md 참조. 핵심 — 텍스트 `text-gray-200`, 포인트 `bg-pink-300`/`text-yellow-300`, 폰트 `font-highlight`(제목) `font-ko`(본문)
- **output.css 편집 금지** — style.css만 편집 후 `npx tailwindcss -i ./style.css -o ./output.css --minify` 실행 안내

## 완료 후
index.html에 새 클래스 적용 → 브라우저 레이아웃 확인 안내
