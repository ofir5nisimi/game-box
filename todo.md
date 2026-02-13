# 🎮 Game Box — Landing Page TODO

> Phase-by-phase implementation plan for the main home screen.
> Each game will have its own architecture doc + todo file when added.

---

## Phase 1 — Project Scaffold ✅

- [x] Initialize Vite project with TypeScript template
- [x] Configure `tsconfig.json` (strict mode, ES2022, DOM types)
- [x] Configure `vite.config.ts`
- [x] Create `index.html` with RTL support, Google Fonts, `<div id="app">`
- [x] Create `src/main.ts` entry point (empty bootstrap)

---

## Phase 2 — Core Framework ✅

- [x] `src/types/index.ts` — shared interfaces & types (`GameCategory`, `GameState`, `IGameInfo`, `AppEvents`, `GameResult`)
- [x] `src/core/EventBus.ts` — generic typed pub/sub `EventBus<TEvents>`
- [x] `src/core/Component.ts` — abstract generic `Component<TState>` with lifecycle (`render`, `mount`, `unmount`, `setState`)
- [x] `src/core/Router.ts` — hash-based SPA router
- [x] `src/core/App.ts` — singleton app controller (owns Router, EventBus, GameRegistry)

---

## Phase 3 — Data Models & Game Registry ✅

- [x] `src/models/GameInfo.ts` — immutable `GameInfo` class with `readonly` props
- [x] `src/models/GameRegistry.ts` — typed `Map<string, GameInfo>` with category filtering
- [x] `src/games/BaseGame.ts` — abstract `BaseGame` extending `Component` (stub, no games yet)
- [x] Register all 8 games as "coming soon" entries in `main.ts`

---

## Phase 4 — Design System (CSS) ✅

- [x] `src/styles/variables.css` — full design token system:
  - Color palette (navy bg, pink-red primary, category colors)
  - Spacing scale (4px base)
  - Border-radius tokens (pill, card, circle)
  - Box shadows (glow effects, card elevation)
  - Font families (Rubik, Fredoka One)
  - Transition/animation duration tokens
- [x] `src/styles/reset.css` — modern CSS reset
- [x] `src/styles/typography.css` — Google Fonts imports, heading hierarchy, RTL
- [x] `src/styles/animations.css` — keyframes library:
  - `float` — slow vertical drift for background shapes
  - `bounce-in` — bouncy entrance for logo
  - `wobble` — card hover effect
  - `fade-in` — gentle opacity entrance
  - `pulse-glow` — pulsing glow on active elements
  - `spin-slow` — slow rotation for decorative elements
  - `confetti-fall` — confetti particles dropping
  - `scale-pop` — satisfying click feedback
- [x] `src/styles/index.css` — master file with `@layer` ordering

---

## Phase 5 — Animated Background ✅

- [x] `src/components/ParticleBackground.ts`:
  - Full-screen `<canvas>` behind all content
  - Floating shapes: ⭐ stars, � circles, 🔺 triangles, 💎 diamonds
  - Randomized colors from the palette
  - Slow drift + subtle rotation
  - Parallax-like depth (different sizes & speeds)
  - Responsive — resizes with window
  - GPU-accelerated via `requestAnimationFrame`
- [x] `src/styles/components.css` — canvas positioning & z-index layers

---

## Phase 6 — Header & Logo ✅

- [x] `src/components/Header.ts`:
  - Large playful "🎮 Game Box" title with Fredoka One font
  - Bounce-in entrance animation on load
  - Emoji sparkle effects ✨ around the logo
  - Subtle hover animation (scale + glow)
  - Confetti burst on logo click
  - Hebrew subtitle: "!המשחקים הכי כיפיים" with Rubik font

---

## Phase 7 — Category Filter ✅

- [x] `src/components/CategoryFilter.ts`:
  - Pill-shaped filter buttons in a horizontal scrollable row
  - Categories: הכל 🌟 · חשבון 🔢 · אנגלית 🔤 · כיף 🎉
  - Active state with gradient background + shadow glow
  - Smooth color transition on switch
  - Scale-pop animation on click
  - Emits `category:change` event via EventBus

---

## Phase 8 — Game Cards Grid

- [ ] `src/components/GameCard.ts`:
  - Large card with rounded corners + glassmorphism effect
  - Big emoji icon (animated idle float)
  - Game title in both Hebrew and English
  - Category-colored accent strip on the card edge
  - Hover: wobble + glow + slight scale-up
  - "...בקרוב" (coming soon) animated badge for unavailable games
  - Click ripple effect
  - Micro-animation: icon does a little dance on hover
- [ ] `src/components/HomeScreen.ts`:
  - Responsive CSS Grid layout (auto-fit, min 200px cards)
  - Staggered fade-in entrance for cards
  - Filters game cards based on selected category
  - Smooth layout transitions when filtering (cards slide into place)
- [ ] `src/styles/home.css` — grid layout, card styles, responsive breakpoints

---

## Phase 9 — Game Shell (Placeholder)

- [ ] `src/components/GameShell.ts`:
  - Wrapper displayed when navigating to a game route
  - Animated "back to home" button with ← arrow
  - Score display area (for future use)
  - "Coming soon!" splash with animation for unavailable games
  - Smooth page transition (slide-in from right)

---

## Phase 10 — Polish & Integration

- [ ] Wire up `App.ts` — full lifecycle: boot → home → filter → navigate → back
- [ ] Router integration: `#/` → home, `#/game/:id` → GameShell
- [ ] Test all category filtering with smooth transitions
- [ ] Test responsive layout on mobile / tablet / desktop widths
- [ ] Test RTL layout correctness
- [ ] Performance check — animation smoothness (60fps target)
- [ ] Add subtle UI sound effects (optional, if assets available):
  - Click feedback
  - Category switch whoosh
  - Card hover pop
- [ ] Final visual polish pass — spacing, shadows, consistency

---

## Phase 11 — Mobile & PWA

- [ ] `manifest.json` — PWA manifest for install-to-home-screen
- [ ] Service worker for offline caching
- [ ] App icons (192px, 512px) for PWA
- [ ] `env(safe-area-inset-*)` for notched phones (iPhone X+)
- [ ] Reduce particle count on mobile (detect `matchMedia` or screen width)
- [ ] Add `-webkit-backdrop-filter` prefix for older Safari
- [ ] Touch gesture support for games (swipe, tap feedback)
- [ ] Orientation handling (lock or adapt for landscape/portrait)
- [ ] Viewport meta refinement (`user-scalable=no` for game screens)
- [ ] Test on real devices: iOS Safari, Android Chrome, tablet

---

## 🚀 After This

Each game will be added as a separate task with its own:
- `architecture-{game-name}.md` — game-specific design doc
- `todo-{game-name}.md` — step-by-step implementation checklist
- New folder under `src/games/{game-name}/`
