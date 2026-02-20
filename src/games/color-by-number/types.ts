/**
 * Color by Number — Type Definitions
 *
 * All interfaces and types for the Color by Number game.
 */

// ─── Difficulty ─────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
    readonly label: string;
    readonly labelHe: string;
    readonly operations: readonly string[];
    readonly maxNumber: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
    easy: {
        label: 'Easy',
        labelHe: 'קל',
        operations: ['+'],
        maxNumber: 5,
    },
    medium: {
        label: 'Medium',
        labelHe: 'בינוני',
        operations: ['+', '-'],
        maxNumber: 10,
    },
    hard: {
        label: 'Hard',
        labelHe: 'קשה',
        operations: ['+', '-', '×', '÷'],
        maxNumber: 20,
    },
};

// ─── Color Palette ──────────────────────────────────────────

export interface ColorEntry {
    readonly number: number;
    readonly color: string;
    readonly nameHe: string;
    readonly nameEn: string;
}

// ─── Puzzle ─────────────────────────────────────────────────

export interface PuzzleSection {
    readonly id: number;
    readonly path: string;          // SVG path data
    readonly labelX: number;        // x position for equation label
    readonly labelY: number;        // y position for equation label
    readonly colorIndex: number;    // which palette color this should be
}

export interface PuzzleTemplate {
    readonly id: string;
    readonly name: string;
    readonly nameHe: string;
    readonly difficulty: Difficulty;
    readonly previewIcon: string;
    readonly viewBox: string;       // SVG viewBox
    readonly sections: readonly PuzzleSection[];
}

// ─── Game State ─────────────────────────────────────────────

export type GamePhase = 'select-difficulty' | 'select-puzzle' | 'playing' | 'complete';

export interface SectionState {
    readonly sectionId: number;
    readonly equation: string;
    readonly answer: number;
    attempts: number;
    solved: boolean;
}

export interface ColorByNumberState {
    phase: GamePhase;
    difficulty: Difficulty;
    puzzle: PuzzleTemplate | null;
    sections: SectionState[];
    selectedSectionId: number | null;
    score: number;
    totalSections: number;
    completedCount: number;
}
