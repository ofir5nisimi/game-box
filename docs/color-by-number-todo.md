# 🎨 Color by Number — TODO

> Phase-by-phase implementation plan for the Color by Number game.
> Architecture doc: [color-by-number-arch.md](./color-by-number-arch.md)

---

## Phase A — Data & Core Logic ✅

- [x] `src/games/color-by-number/types.ts` — TypeScript interfaces:
  - `PuzzleTemplate`, `PuzzleSection`, `ColorEntry`, `ColorByNumberState`
  - `Difficulty` type (`'easy' | 'medium' | 'hard'`)
- [x] `src/games/color-by-number/data/palette.ts` — Shared color palette (8 colors with Hebrew names)
- [x] `src/games/color-by-number/utils/equationGenerator.ts`:
  - Generate random equation for a given answer + difficulty
  - Easy: addition only (1–5)
  - Medium: addition & subtraction (1–10)
  - Hard: addition, subtraction & multiplication (1–12)
- [x] `src/games/color-by-number/data/puzzles.ts` — 5 SVG puzzle templates:
  - ⭐ Star (Easy, 6 sections)
  - ❤️ Heart (Easy, 7 sections)
  - 🏠 House (Medium, 10 sections)
  - 🦋 Butterfly (Medium, 12 sections)
  - 🚀 Rocket (Hard, 14 sections)
- [x] Unit tests for equation generator (10/10 passing)

---

## Phase B — Game UI Components ✅

- [x] `src/games/color-by-number/ColorByNumber.ts` — Main game class:
  - Extends `Component`
  - State management (difficulty, puzzle, phase)
  - Phase transitions: select-difficulty → select-puzzle → playing → complete
- [x] `src/games/color-by-number/components/DifficultySelector.ts`:
  - 3 buttons: קל / בינוני / קשה
  - Gradient active states matching main app style
- [x] `src/games/color-by-number/components/PuzzleSelector.ts`:
  - Grid of puzzle cards with emoji icon preview
  - Filter by selected difficulty
- [x] `src/games/color-by-number/components/PuzzleCanvas.ts`:
  - SVG rendering with `<path>` elements per section
  - Click/tap handling on sections
  - Visual states: unsolved (gray), selected (pulsing border), solved (color fill)
- [x] `src/games/color-by-number/components/ColorPalette.ts`:
  - Horizontal row of color swatches
  - Number label on each swatch
  - Hebrew color name tooltip
- [x] `src/games/color-by-number/components/MathInput.ts`:
  - Equation display area (e.g., `5 + 3 = ?`)
  - Number pad (0–9) with big touch targets (≥44px)
  - Submit button
  - Correct/wrong feedback animation
- [x] `src/games/color-by-number/components/ScoreBar.ts`:
  - Back button
  - Puzzle name + icon
  - Progress bar (sections completed / total)
  - Score counter

---

## Phase C — Game Logic & Integration

- [ ] Wire up section selection → equation display → answer validation
- [ ] Score tracking:
  - +10 first try, +5 second try, +2 third+ try
  - +20 completion bonus
  - +50 perfect score bonus
- [ ] Progress tracking (completed sections count)
- [ ] `src/games/color-by-number/components/CelebrationOverlay.ts`:
  - Confetti + stars animation
  - Final score display
  - "Play Again" / "Back to Home" buttons
- [ ] Register game in `GameRegistry` as `isAvailable: true`
- [ ] Wire up `GameShell` → `ColorByNumber` via `gameClass`

---

## Phase D — Styling & Polish

- [ ] `src/games/color-by-number/styles/color-by-number.css`:
  - SVG section states (unsolved, selected, solved)
  - Golden pulse border animation
  - Color flood-fill transition (0.4s)
  - Wrong answer shake animation
  - Sparkle burst on section complete
  - Number pad styling (big rounded buttons)
  - Celebration overlay
- [ ] Mobile responsive layout:
  - SVG scales to viewport width
  - Number pad full-width on small screens
  - Color palette horizontal scroll on narrow screens
- [ ] Accessibility:
  - Keyboard navigation for sections
  - Focus indicators
  - Screen reader labels
- [ ] Final testing pass:
  - Play through all 5 puzzles at each difficulty
  - Verify color mapping correctness
  - Test RTL layout
  - Test on mobile viewport
