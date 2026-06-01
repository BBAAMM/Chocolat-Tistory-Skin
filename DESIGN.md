# DESIGN.md — Chocolat Skin Design System

> `frontend-design` plugin이 참조하는 브랜드 토큰 파일.
> 새 섹션/컴포넌트 디자인 시 이 파일을 기준으로 미적 방향을 잡는다.

## Aesthetic Direction

**컨셉**: Dark Minimal × Warm Accent
- 무거운 다크 배경 + 초콜릿 톤 warm accent 포인트
- 클린한 레이아웃, 대담한 타이포그래피, 미묘한 모션
- "개발 기술 블로그"지만 차갑지 않은 개성 있는 다크 테마

**피해야 할 것**: 보라색 그라디언트, 흰 배경 기본 카드, 시스템 sans-serif 단독 사용, 균일한 그리드

## Color Palette

| 역할 | Tailwind | Hex |
|---|---|---|
| Background (darkest) | `bg-[#121212]` | #121212 |
| Surface / Card | `bg-gray-800` | #1f2937 |
| Surface alt | `bg-gray-700` | #374151 |
| Light section | `bg-gray-200` | #e5e7eb |
| Accent primary | `bg-pink-300` / `text-pink-200` | #f9a8d4 |
| Accent secondary | `text-yellow-300` | #fde047 |
| Text primary | `text-gray-200` | #e5e7eb |
| Text muted | `text-gray-400` | #9ca3af |
| Text on-light | `text-gray-800` | #1f2937 |

Accent gradient (메인 슬라이드): `bg-gradient-to-b from-gray-800 to-black`

## Typography

| 역할 | 키 | 폰트 | 용도 |
|---|---|---|---|
| Display / Hero | `font-welcome` | Moirai One | 슬라이더 타이틀 |
| Highlight / Title | `font-highlight` | HSSanTokki | 카드 제목, 섹션 타이틀 |
| Body Korean | `font-ko` | WooJu | 본문, 요약, 설명 |
| Body English | `font-english` | Montserrat Alternates | 영문 본문 |

**크기 스케일** (모바일 퍼스트):
- Hero: `text-5xl sm:text-6xl md:text-7xl lg:text-8xl`
- Section title: `text-3xl` / Card title: `text-md sm:text-2xl` / Body: `text-sm lg:text-md`
- Responsive 단일값: `text-[clamp(1rem,5.5vw,3.5rem)]` (article 제목)

## Layout

- 컨테이너: full-width, edge-to-edge 섹션 (max-w 없음)
- 카드 그리드: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
- 간격: `p-5`, `gap-5`, `gap-8`
- 모서리: `rounded-lg` (카드), `rounded-3xl` (뱃지/버튼), `rounded-full` (FAB)
- 메인 페이지: `snap-y snap-proximity`, 섹션 단위 스크롤

## Motion

- 커서 깜빡임: `animate-blink` (CSS keyframes, `step-end`)
- Hover: `transition duration-200/300 ease-in-out`
- Hover FAB: `hover:bg-pink-600`, 카드: `hover:scale-105 hover:shadow-lg`
- 슬라이더: GSAP `translateX`, `ease: "power4.out"`, duration 0.8s
- 타이프라이터: GSAP TextPlugin (첫 슬라이드)
- 햄버거 메뉴 버튼: `opacity`+`scale` 0→1, 100ms stagger

## Component Inventory

### 구현됨
| 컴포넌트 | 설명 |
|---|---|
| **FloatingFAB** | 우하단 fixed, 햄버거 → 검색/카테고리/홈 버튼 펼침 |
| **HeroSlider** | full-screen snap, 3슬라이드 (1번만 완성) |
| **CategoryGrid** | 2×3→3×2→4×2 그리드, 아이콘+제목 카드 |
| **RecentGrid** | 좌: featured 큰 카드 / 우: 리스트 카드 |
| **ArticleHeader** | 70vh 황색(`bg-yellow-300`) 배경 + 카테고리/제목/날짜 |
| **ArticleBody** | `rounded-t-3xl rounded-b-xl`, `shadow-2xl shadow-black` |
| **ListItem** | 카테고리/제목/요약/썸네일 수평 카드 (`custom-card-recent`) |

### 미구현 (TODO)
- Second/Third 슬라이드 콘텐츠
- Category Modal 실제 콘텐츠 (현재 빈 div)
- 프로필 페이지
- 태그 클라우드
- 댓글 섹션 (`[##_comment_group_##]` 치환자만 존재)
