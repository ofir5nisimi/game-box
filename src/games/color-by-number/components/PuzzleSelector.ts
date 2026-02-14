/**
 * PuzzleSelector — Choose a puzzle to play
 *
 * Grid of puzzle cards with emoji preview icons,
 * filtered by the selected difficulty.
 */

import { Component } from '../../../core/Component.ts';
import type { PuzzleTemplate, Difficulty } from '../types.ts';
import { getPuzzlesByDifficulty } from '../data/puzzles.ts';

interface PuzzleSelectorState {
    difficulty: Difficulty;
    puzzles: PuzzleTemplate[];
}

export class PuzzleSelector extends Component<PuzzleSelectorState> {
    private onSelect: (puzzle: PuzzleTemplate) => void;

    constructor(
        container: HTMLElement,
        difficulty: Difficulty,
        onSelect: (puzzle: PuzzleTemplate) => void,
    ) {
        const puzzles = getPuzzlesByDifficulty(difficulty);
        super(container, { difficulty, puzzles });
        this.onSelect = onSelect;
    }

    render(): string {
        const cards = this.state.puzzles.map((puzzle) => `
            <button class="cbn-puzzle-card" data-puzzle-id="${puzzle.id}">
                <span class="cbn-puzzle-icon">${puzzle.previewIcon}</span>
                <span class="cbn-puzzle-name">${puzzle.nameHe}</span>
                <span class="cbn-puzzle-name-en">${puzzle.name}</span>
            </button>
        `).join('');

        return `
            <div class="cbn-puzzle-selector">
                <h2 class="cbn-section-title">בחר ציור</h2>
                <div class="cbn-puzzle-grid">${cards}</div>
            </div>
        `;
    }

    mount(): void {
        super.mount();
        this.attachListeners();
    }

    protected afterRender(): void {
        this.attachListeners();
    }

    private attachListeners(): void {
        this.addEventListenerAll('.cbn-puzzle-card', 'click', (e) => {
            const target = (e.currentTarget as HTMLElement);
            const puzzleId = target.dataset['puzzleId'];
            if (puzzleId) {
                const puzzle = this.state.puzzles.find((p) => p.id === puzzleId);
                if (puzzle) {
                    this.onSelect(puzzle);
                }
            }
        });
    }
}
