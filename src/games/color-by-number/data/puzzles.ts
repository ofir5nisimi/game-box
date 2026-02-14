/**
 * Color by Number — Puzzle Templates
 *
 * 5 SVG-based puzzles at varying difficulty levels.
 * Each puzzle contains sections defined by SVG path data,
 * with label positions for equation text.
 *
 * Puzzles:
 *  1. ⭐ Star (Easy, 6 sections)
 *  2. ❤️ Heart (Easy, 7 sections)
 *  3. 🏠 House (Medium, 10 sections)
 *  4. 🦋 Butterfly (Medium, 12 sections)
 *  5. 🚀 Rocket (Hard, 14 sections)
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
        // Top triangle
        {
            id: 1,
            path: 'M200,20 L240,140 L160,140 Z',
            labelX: 200, labelY: 100,
            colorIndex: 3, // Yellow
        },
        // Upper-right triangle
        {
            id: 2,
            path: 'M240,140 L380,150 L280,220 Z',
            labelX: 300, labelY: 175,
            colorIndex: 3, // Yellow
        },
        // Lower-right triangle
        {
            id: 3,
            path: 'M280,220 L330,370 L220,290 Z',
            labelX: 280, labelY: 300,
            colorIndex: 1, // Red
        },
        // Bottom triangle
        {
            id: 4,
            path: 'M220,290 L180,290 L200,200 Z',
            labelX: 200, labelY: 265,
            colorIndex: 6, // Orange
        },
        // Lower-left triangle
        {
            id: 5,
            path: 'M180,290 L70,370 L120,220 Z',
            labelX: 120, labelY: 300,
            colorIndex: 1, // Red
        },
        // Upper-left triangle
        {
            id: 6,
            path: 'M120,220 L20,150 L160,140 Z',
            labelX: 100, labelY: 175,
            colorIndex: 3, // Yellow
        },
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
        // Top-left bump
        {
            id: 1,
            path: 'M200,120 C200,60 130,20 80,60 C30,100 40,160 100,200 L200,120 Z',
            labelX: 120, labelY: 100,
            colorIndex: 1, // Red
        },
        // Top-right bump
        {
            id: 2,
            path: 'M200,120 C200,60 270,20 320,60 C370,100 360,160 300,200 L200,120 Z',
            labelX: 280, labelY: 100,
            colorIndex: 1, // Red
        },
        // Upper-left body
        {
            id: 3,
            path: 'M100,200 L200,120 L200,220 L150,250 Z',
            labelX: 155, labelY: 200,
            colorIndex: 7, // Pink
        },
        // Upper-right body
        {
            id: 4,
            path: 'M300,200 L200,120 L200,220 L250,250 Z',
            labelX: 245, labelY: 200,
            colorIndex: 7, // Pink
        },
        // Lower-left body
        {
            id: 5,
            path: 'M150,250 L200,220 L200,300 L130,280 Z',
            labelX: 165, labelY: 260,
            colorIndex: 1, // Red
        },
        // Lower-right body
        {
            id: 6,
            path: 'M250,250 L200,220 L200,300 L270,280 Z',
            labelX: 235, labelY: 260,
            colorIndex: 1, // Red
        },
        // Bottom point
        {
            id: 7,
            path: 'M130,280 L200,300 L270,280 L200,380 Z',
            labelX: 200, labelY: 330,
            colorIndex: 7, // Pink
        },
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
        // Roof left
        {
            id: 1,
            path: 'M200,30 L50,170 L200,170 Z',
            labelX: 140, labelY: 140,
            colorIndex: 1, // Red
        },
        // Roof right
        {
            id: 2,
            path: 'M200,30 L350,170 L200,170 Z',
            labelX: 260, labelY: 140,
            colorIndex: 1, // Red
        },
        // Chimney
        {
            id: 3,
            path: 'M280,50 L320,50 L320,120 L280,95 Z',
            labelX: 300, labelY: 85,
            colorIndex: 8, // Brown
        },
        // Wall upper-left
        {
            id: 4,
            path: 'M70,170 L200,170 L200,270 L70,270 Z',
            labelX: 135, labelY: 220,
            colorIndex: 3, // Yellow
        },
        // Wall upper-right
        {
            id: 5,
            path: 'M200,170 L330,170 L330,270 L200,270 Z',
            labelX: 265, labelY: 220,
            colorIndex: 3, // Yellow
        },
        // Wall lower-left
        {
            id: 6,
            path: 'M70,270 L155,270 L155,380 L70,380 Z',
            labelX: 112, labelY: 325,
            colorIndex: 3, // Yellow
        },
        // Door
        {
            id: 7,
            path: 'M155,270 L245,270 L245,380 L155,380 Z',
            labelX: 200, labelY: 330,
            colorIndex: 8, // Brown
        },
        // Wall lower-right
        {
            id: 8,
            path: 'M245,270 L330,270 L330,380 L245,380 Z',
            labelX: 287, labelY: 325,
            colorIndex: 3, // Yellow
        },
        // Window left
        {
            id: 9,
            path: 'M95,195 L155,195 L155,250 L95,250 Z',
            labelX: 125, labelY: 225,
            colorIndex: 2, // Blue
        },
        // Window right
        {
            id: 10,
            path: 'M245,195 L305,195 L305,250 L245,250 Z',
            labelX: 275, labelY: 225,
            colorIndex: 2, // Blue
        },
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
        // Left upper wing top
        {
            id: 1,
            path: 'M200,100 C160,40 60,30 40,100 C30,140 60,160 100,150 L200,100 Z',
            labelX: 110, labelY: 90,
            colorIndex: 6, // Orange
        },
        // Left upper wing bottom
        {
            id: 2,
            path: 'M200,100 L100,150 C60,160 40,180 60,200 L200,160 Z',
            labelX: 120, labelY: 155,
            colorIndex: 3, // Yellow
        },
        // Left upper wing spot
        {
            id: 3,
            path: 'M100,90 C90,75 70,75 65,90 C60,105 75,115 90,110 C105,105 110,95 100,90 Z',
            labelX: 82, labelY: 95,
            colorIndex: 2, // Blue
        },
        // Left lower wing top
        {
            id: 4,
            path: 'M200,200 L60,200 C40,220 30,260 50,300 L200,240 Z',
            labelX: 110, labelY: 240,
            colorIndex: 5, // Purple
        },
        // Left lower wing bottom
        {
            id: 5,
            path: 'M200,240 L50,300 C70,340 120,360 160,340 L200,300 Z',
            labelX: 130, labelY: 310,
            colorIndex: 7, // Pink
        },
        // Left lower wing spot
        {
            id: 6,
            path: 'M110,260 C100,250 85,250 80,260 C75,275 85,285 100,280 C115,275 120,265 110,260 Z',
            labelX: 96, labelY: 268,
            colorIndex: 4, // Green
        },
        // Right upper wing top (mirror)
        {
            id: 7,
            path: 'M200,100 C240,40 340,30 360,100 C370,140 340,160 300,150 L200,100 Z',
            labelX: 290, labelY: 90,
            colorIndex: 6, // Orange
        },
        // Right upper wing bottom
        {
            id: 8,
            path: 'M200,100 L300,150 C340,160 360,180 340,200 L200,160 Z',
            labelX: 280, labelY: 155,
            colorIndex: 3, // Yellow
        },
        // Right upper wing spot
        {
            id: 9,
            path: 'M300,90 C310,75 330,75 335,90 C340,105 325,115 310,110 C295,105 290,95 300,90 Z',
            labelX: 318, labelY: 95,
            colorIndex: 2, // Blue
        },
        // Right lower wing top
        {
            id: 10,
            path: 'M200,200 L340,200 C360,220 370,260 350,300 L200,240 Z',
            labelX: 290, labelY: 240,
            colorIndex: 5, // Purple
        },
        // Right lower wing bottom
        {
            id: 11,
            path: 'M200,240 L350,300 C330,340 280,360 240,340 L200,300 Z',
            labelX: 270, labelY: 310,
            colorIndex: 7, // Pink
        },
        // Body (center)
        {
            id: 12,
            path: 'M190,80 L210,80 L215,340 L185,340 Z',
            labelX: 200, labelY: 200,
            colorIndex: 8, // Brown
        },
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
        // Nose cone top
        {
            id: 1,
            path: 'M200,20 L230,80 L170,80 Z',
            labelX: 200, labelY: 60,
            colorIndex: 1, // Red
        },
        // Nose cone bottom
        {
            id: 2,
            path: 'M170,80 L230,80 L240,130 L160,130 Z',
            labelX: 200, labelY: 108,
            colorIndex: 1, // Red
        },
        // Body upper-left
        {
            id: 3,
            path: 'M160,130 L200,130 L200,210 L155,210 Z',
            labelX: 178, labelY: 170,
            colorIndex: 3, // Yellow
        },
        // Body upper-right
        {
            id: 4,
            path: 'M200,130 L240,130 L245,210 L200,210 Z',
            labelX: 222, labelY: 170,
            colorIndex: 3, // Yellow
        },
        // Window
        {
            id: 5,
            path: 'M200,155 C215,155 225,165 225,180 C225,195 215,205 200,205 C185,205 175,195 175,180 C175,165 185,155 200,155 Z',
            labelX: 200, labelY: 182,
            colorIndex: 2, // Blue
        },
        // Body middle-left
        {
            id: 6,
            path: 'M155,210 L200,210 L200,290 L150,290 Z',
            labelX: 175, labelY: 250,
            colorIndex: 3, // Yellow
        },
        // Body middle-right
        {
            id: 7,
            path: 'M200,210 L245,210 L250,290 L200,290 Z',
            labelX: 225, labelY: 250,
            colorIndex: 3, // Yellow
        },
        // Body lower-left
        {
            id: 8,
            path: 'M150,290 L200,290 L200,350 L145,350 Z',
            labelX: 175, labelY: 320,
            colorIndex: 1, // Red
        },
        // Body lower-right
        {
            id: 9,
            path: 'M200,290 L250,290 L255,350 L200,350 Z',
            labelX: 225, labelY: 320,
            colorIndex: 1, // Red
        },
        // Left fin
        {
            id: 10,
            path: 'M150,260 L80,340 L80,380 L145,350 Z',
            labelX: 115, labelY: 325,
            colorIndex: 6, // Orange
        },
        // Right fin
        {
            id: 11,
            path: 'M250,260 L320,340 L320,380 L255,350 Z',
            labelX: 285, labelY: 325,
            colorIndex: 6, // Orange
        },
        // Flame center
        {
            id: 12,
            path: 'M175,350 L225,350 L210,420 L190,420 Z',
            labelX: 200, labelY: 385,
            colorIndex: 3, // Yellow
        },
        // Flame left
        {
            id: 13,
            path: 'M145,350 L175,350 L170,400 L140,380 Z',
            labelX: 157, labelY: 375,
            colorIndex: 6, // Orange
        },
        // Flame right
        {
            id: 14,
            path: 'M225,350 L255,350 L260,380 L230,400 Z',
            labelX: 243, labelY: 375,
            colorIndex: 6, // Orange
        },
    ],
};

// ─── Export All Puzzles ─────────────────────────────────────

export const ALL_PUZZLES: readonly PuzzleTemplate[] = [
    starPuzzle,
    heartPuzzle,
    housePuzzle,
    butterflyPuzzle,
    rocketPuzzle,
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
