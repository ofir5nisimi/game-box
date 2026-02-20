/**
 * Color by Number — Puzzle Templates
 *
 * 7 SVG-based puzzles at varying difficulty levels.
 * Each puzzle contains sections defined by SVG path data,
 * with label positions for equation text.
 *
 * Puzzles:
 *  1. ⭐ Star (Easy, 6 sections)
 *  2. ❤️ Heart (Easy, 7 sections)
 *  3. 🏠 House (Medium, 10 sections)
 *  4. 🦋 Butterfly (Medium, 12 sections)
 *  5. 🚀 Rocket (Hard, 14 sections)
 *  6. 🏰 Castle (Hard, 13 sections)
 *  7. ⛵ Sailboat (Hard, 12 sections)
 */

import type { PuzzleTemplate } from '../types.ts';

// ─── Puzzle 1: Star ⭐ (Easy) ───────────────────────────────

const starPuzzle: PuzzleTemplate = {
    id: 'star',
    name: 'Star',
    nameHe: 'כוכב',
    difficulty: 'easy',
    previewIcon: '⭐',
    viewBox: '0 0 400 400',
    sections: [
        { id: 1, path: 'M200,20 L240,140 L160,140 Z', labelX: 200, labelY: 100, colorIndex: 3 },
        { id: 2, path: 'M240,140 L380,150 L280,220 Z', labelX: 300, labelY: 175, colorIndex: 3 },
        { id: 3, path: 'M280,220 L330,370 L220,290 Z', labelX: 280, labelY: 300, colorIndex: 1 },
        { id: 4, path: 'M220,290 L180,290 L200,200 Z', labelX: 200, labelY: 265, colorIndex: 6 },
        { id: 5, path: 'M180,290 L70,370 L120,220 Z', labelX: 120, labelY: 300, colorIndex: 1 },
        { id: 6, path: 'M120,220 L20,150 L160,140 Z', labelX: 100, labelY: 175, colorIndex: 3 },
    ],
};

// ─── Puzzle 2: Heart ❤️ (Easy) ──────────────────────────────

const heartPuzzle: PuzzleTemplate = {
    id: 'heart',
    name: 'Heart',
    nameHe: 'לב',
    difficulty: 'easy',
    previewIcon: '❤️',
    viewBox: '0 0 400 400',
    sections: [
        { id: 1, path: 'M200,120 C200,60 130,20 80,60 C30,100 40,160 100,200 L200,120 Z', labelX: 120, labelY: 100, colorIndex: 1 },
        { id: 2, path: 'M200,120 C200,60 270,20 320,60 C370,100 360,160 300,200 L200,120 Z', labelX: 280, labelY: 100, colorIndex: 1 },
        { id: 3, path: 'M100,200 L200,120 L200,220 L150,250 Z', labelX: 155, labelY: 200, colorIndex: 7 },
        { id: 4, path: 'M300,200 L200,120 L200,220 L250,250 Z', labelX: 245, labelY: 200, colorIndex: 7 },
        { id: 5, path: 'M150,250 L200,220 L200,300 L130,280 Z', labelX: 165, labelY: 260, colorIndex: 1 },
        { id: 6, path: 'M250,250 L200,220 L200,300 L270,280 Z', labelX: 235, labelY: 260, colorIndex: 1 },
        { id: 7, path: 'M130,280 L200,300 L270,280 L200,380 Z', labelX: 200, labelY: 330, colorIndex: 7 },
    ],
};

// ─── Puzzle 3: House 🏠 (Medium) ────────────────────────────

const housePuzzle: PuzzleTemplate = {
    id: 'house',
    name: 'House',
    nameHe: 'בית',
    difficulty: 'medium',
    previewIcon: '🏠',
    viewBox: '0 0 400 400',
    sections: [
        { id: 1, path: 'M200,30 L50,170 L200,170 Z', labelX: 140, labelY: 140, colorIndex: 1 },
        { id: 2, path: 'M200,30 L350,170 L200,170 Z', labelX: 260, labelY: 140, colorIndex: 1 },
        { id: 3, path: 'M280,50 L320,50 L320,120 L280,95 Z', labelX: 300, labelY: 85, colorIndex: 8 },
        { id: 4, path: 'M70,170 L200,170 L200,270 L70,270 Z', labelX: 135, labelY: 220, colorIndex: 3 },
        { id: 5, path: 'M200,170 L330,170 L330,270 L200,270 Z', labelX: 265, labelY: 220, colorIndex: 3 },
        { id: 6, path: 'M70,270 L155,270 L155,380 L70,380 Z', labelX: 112, labelY: 325, colorIndex: 3 },
        { id: 7, path: 'M155,270 L245,270 L245,380 L155,380 Z', labelX: 200, labelY: 330, colorIndex: 8 },
        { id: 8, path: 'M245,270 L330,270 L330,380 L245,380 Z', labelX: 287, labelY: 325, colorIndex: 3 },
        { id: 9, path: 'M95,195 L155,195 L155,250 L95,250 Z', labelX: 125, labelY: 225, colorIndex: 2 },
        { id: 10, path: 'M245,195 L305,195 L305,250 L245,250 Z', labelX: 275, labelY: 225, colorIndex: 2 },
    ],
};

// ─── Puzzle 4: Butterfly 🦋 (Medium) ────────────────────────

const butterflyPuzzle: PuzzleTemplate = {
    id: 'butterfly',
    name: 'Butterfly',
    nameHe: 'פרפר',
    difficulty: 'medium',
    previewIcon: '🦋',
    viewBox: '0 0 400 400',
    sections: [
        { id: 1, path: 'M200,100 C160,40 60,30 40,100 C30,140 60,160 100,150 L200,100 Z', labelX: 110, labelY: 90, colorIndex: 6 },
        { id: 2, path: 'M200,100 L100,150 C60,160 40,180 60,200 L200,160 Z', labelX: 120, labelY: 155, colorIndex: 3 },
        { id: 3, path: 'M100,90 C90,75 70,75 65,90 C60,105 75,115 90,110 C105,105 110,95 100,90 Z', labelX: 82, labelY: 95, colorIndex: 2 },
        { id: 4, path: 'M200,200 L60,200 C40,220 30,260 50,300 L200,240 Z', labelX: 110, labelY: 240, colorIndex: 5 },
        { id: 5, path: 'M200,240 L50,300 C70,340 120,360 160,340 L200,300 Z', labelX: 130, labelY: 310, colorIndex: 7 },
        { id: 6, path: 'M110,260 C100,250 85,250 80,260 C75,275 85,285 100,280 C115,275 120,265 110,260 Z', labelX: 96, labelY: 268, colorIndex: 4 },
        { id: 7, path: 'M200,100 C240,40 340,30 360,100 C370,140 340,160 300,150 L200,100 Z', labelX: 290, labelY: 90, colorIndex: 6 },
        { id: 8, path: 'M200,100 L300,150 C340,160 360,180 340,200 L200,160 Z', labelX: 280, labelY: 155, colorIndex: 3 },
        { id: 9, path: 'M300,90 C310,75 330,75 335,90 C340,105 325,115 310,110 C295,105 290,95 300,90 Z', labelX: 318, labelY: 95, colorIndex: 2 },
        { id: 10, path: 'M200,200 L340,200 C360,220 370,260 350,300 L200,240 Z', labelX: 290, labelY: 240, colorIndex: 5 },
        { id: 11, path: 'M200,240 L350,300 C330,340 280,360 240,340 L200,300 Z', labelX: 270, labelY: 310, colorIndex: 7 },
        { id: 12, path: 'M190,80 L210,80 L215,340 L185,340 Z', labelX: 200, labelY: 200, colorIndex: 8 },
    ],
};

// ─── Puzzle 5: Rocket 🚀 (Hard) ─────────────────────────────

const rocketPuzzle: PuzzleTemplate = {
    id: 'rocket',
    name: 'Rocket',
    nameHe: 'רקטה',
    difficulty: 'hard',
    previewIcon: '🚀',
    viewBox: '0 0 400 450',
    sections: [
        { id: 1, path: 'M200,20 L230,80 L170,80 Z', labelX: 200, labelY: 60, colorIndex: 1 },
        { id: 2, path: 'M170,80 L230,80 L240,130 L160,130 Z', labelX: 200, labelY: 108, colorIndex: 1 },
        { id: 3, path: 'M160,130 L200,130 L200,210 L155,210 Z', labelX: 178, labelY: 170, colorIndex: 3 },
        { id: 4, path: 'M200,130 L240,130 L245,210 L200,210 Z', labelX: 222, labelY: 170, colorIndex: 3 },
        { id: 5, path: 'M200,155 C215,155 225,165 225,180 C225,195 215,205 200,205 C185,205 175,195 175,180 C175,165 185,155 200,155 Z', labelX: 200, labelY: 182, colorIndex: 2 },
        { id: 6, path: 'M155,210 L200,210 L200,290 L150,290 Z', labelX: 175, labelY: 250, colorIndex: 3 },
        { id: 7, path: 'M200,210 L245,210 L250,290 L200,290 Z', labelX: 225, labelY: 250, colorIndex: 3 },
        { id: 8, path: 'M150,290 L200,290 L200,350 L145,350 Z', labelX: 175, labelY: 320, colorIndex: 1 },
        { id: 9, path: 'M200,290 L250,290 L255,350 L200,350 Z', labelX: 225, labelY: 320, colorIndex: 1 },
        { id: 10, path: 'M150,260 L80,340 L80,380 L145,350 Z', labelX: 115, labelY: 325, colorIndex: 6 },
        { id: 11, path: 'M250,260 L320,340 L320,380 L255,350 Z', labelX: 285, labelY: 325, colorIndex: 6 },
        { id: 12, path: 'M175,350 L225,350 L210,420 L190,420 Z', labelX: 200, labelY: 385, colorIndex: 3 },
        { id: 13, path: 'M145,350 L175,350 L170,400 L140,380 Z', labelX: 157, labelY: 375, colorIndex: 6 },
        { id: 14, path: 'M225,350 L255,350 L260,380 L230,400 Z', labelX: 243, labelY: 375, colorIndex: 6 },
    ],
};

// ─── Puzzle 6: Castle 🏰 (Hard) ─────────────────────────────

const castlePuzzle: PuzzleTemplate = {
    id: 'castle',
    name: 'Castle',
    nameHe: 'טירה',
    difficulty: 'hard',
    previewIcon: '🏰',
    viewBox: '0 0 400 400',
    sections: [
        // Left tower roof
        { id: 1, path: 'M50,100 L90,40 L130,100 Z', labelX: 90, labelY: 80, colorIndex: 1 },
        // Left tower body
        { id: 2, path: 'M55,100 L125,100 L125,210 L55,210 Z', labelX: 90, labelY: 158, colorIndex: 3 },
        // Left tower window
        { id: 3, path: 'M72,125 L108,125 L108,170 L72,170 Z', labelX: 90, labelY: 150, colorIndex: 2 },
        // Center tower roof
        { id: 4, path: 'M140,75 L200,15 L260,75 Z', labelX: 200, labelY: 55, colorIndex: 1 },
        // Center tower body
        { id: 5, path: 'M145,75 L255,75 L255,210 L145,210 Z', labelX: 200, labelY: 145, colorIndex: 3 },
        // Center tower window
        { id: 6, path: 'M172,100 L228,100 L228,155 L172,155 Z', labelX: 200, labelY: 130, colorIndex: 2 },
        // Right tower roof
        { id: 7, path: 'M270,100 L310,40 L350,100 Z', labelX: 310, labelY: 80, colorIndex: 1 },
        // Right tower body
        { id: 8, path: 'M275,100 L345,100 L345,210 L275,210 Z', labelX: 310, labelY: 158, colorIndex: 3 },
        // Right tower window
        { id: 9, path: 'M292,125 L328,125 L328,170 L292,170 Z', labelX: 310, labelY: 150, colorIndex: 2 },
        // Main wall
        { id: 10, path: 'M55,210 L345,210 L345,380 L55,380 Z', labelX: 200, labelY: 295, colorIndex: 6 },
        // Gate arch
        { id: 11, path: 'M155,260 C155,225 245,225 245,260 L245,380 L155,380 Z', labelX: 200, labelY: 320, colorIndex: 8 },
        // Left wall window
        { id: 12, path: 'M80,245 L130,245 L130,295 L80,295 Z', labelX: 105, labelY: 273, colorIndex: 2 },
        // Right wall window
        { id: 13, path: 'M270,245 L320,245 L320,295 L270,295 Z', labelX: 295, labelY: 273, colorIndex: 2 },
    ],
};

// ─── Puzzle 7: Sailboat ⛵ (Hard) ────────────────────────────

const sailboatPuzzle: PuzzleTemplate = {
    id: 'sailboat',
    name: 'Sailboat',
    nameHe: 'מפרשית',
    difficulty: 'hard',
    previewIcon: '⛵',
    viewBox: '0 0 400 400',
    sections: [
        // Mast
        { id: 1, path: 'M195,35 L205,35 L205,275 L195,275 Z', labelX: 200, labelY: 155, colorIndex: 8 },
        // Main sail upper
        { id: 2, path: 'M205,45 L205,155 L330,155 Z', labelX: 248, labelY: 125, colorIndex: 3 },
        // Main sail lower
        { id: 3, path: 'M205,155 L205,260 L330,260 L330,155 Z', labelX: 268, labelY: 210, colorIndex: 3 },
        // Jib sail upper
        { id: 4, path: 'M195,55 L195,155 L90,155 Z', labelX: 160, labelY: 128, colorIndex: 1 },
        // Jib sail lower
        { id: 5, path: 'M195,155 L195,250 L90,250 L90,155 Z', labelX: 143, labelY: 205, colorIndex: 1 },
        // Hull deck
        { id: 6, path: 'M50,280 L350,280 L340,310 L60,310 Z', labelX: 200, labelY: 297, colorIndex: 6 },
        // Hull left
        { id: 7, path: 'M60,310 L200,310 L180,365 L95,365 Z', labelX: 134, labelY: 340, colorIndex: 8 },
        // Hull right
        { id: 8, path: 'M200,310 L340,310 L305,365 L180,365 Z', labelX: 256, labelY: 340, colorIndex: 8 },
        // Flag
        { id: 9, path: 'M205,35 L245,20 L245,50 Z', labelX: 230, labelY: 37, colorIndex: 7 },
        // Main sail stripe
        { id: 10, path: 'M205,195 L205,235 L315,235 L315,195 Z', labelX: 260, labelY: 218, colorIndex: 2 },
        // Water left
        { id: 11, path: 'M20,370 L190,370 L170,395 L20,395 Z', labelX: 105, labelY: 385, colorIndex: 2 },
        // Water right
        { id: 12, path: 'M190,370 L380,370 L380,395 L170,395 Z', labelX: 280, labelY: 385, colorIndex: 2 },
    ],
};

// ─── Export All Puzzles ─────────────────────────────────────

export const ALL_PUZZLES: readonly PuzzleTemplate[] = [
    starPuzzle,
    heartPuzzle,
    housePuzzle,
    butterflyPuzzle,
    rocketPuzzle,
    castlePuzzle,
    sailboatPuzzle,
];

/**
 * Get puzzles filtered by difficulty.
 */
export function getPuzzlesByDifficulty(difficulty: string): PuzzleTemplate[] {
    return ALL_PUZZLES.filter((p) => p.difficulty === difficulty);
}

/**
 * Get a single puzzle by ID.
 */
export function getPuzzleById(id: string): PuzzleTemplate | undefined {
    return ALL_PUZZLES.find((p) => p.id === id);
}
