/**
 * DifficultySelector — Choose Easy, Medium, or Hard
 *
 * 3 gradient pill buttons for selecting game difficulty.
 */

import { Component } from '../../../core/Component.ts';
import type { Difficulty } from '../types.ts';
import { DIFFICULTY_CONFIGS } from '../types.ts';

interface DifficultySelectorState {
    selected: Difficulty | null;
}

export class DifficultySelector extends Component<DifficultySelectorState> {
    private onSelect: (difficulty: Difficulty) => void;

    constructor(container: HTMLElement, onSelect: (difficulty: Difficulty) => void) {
        super(container, { selected: null });
        this.onSelect = onSelect;
    }

    render(): string {
        const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
        const emojis: Record<Difficulty, string> = { easy: '🌟', medium: '⚡', hard: '🔥' };

        const buttons = difficulties.map((d) => {
            const config = DIFFICULTY_CONFIGS[d];
            const activeClass = this.state.selected === d ? 'active' : '';
            return `
                <button class="cbn-difficulty-btn ${activeClass}" data-difficulty="${d}">
                    <span class="cbn-difficulty-emoji">${emojis[d]}</span>
                    <span class="cbn-difficulty-label">${config.labelHe}</span>
                    <span class="cbn-difficulty-sublabel">${config.label}</span>
                </button>
            `;
        }).join('');

        return `
            <div class="cbn-difficulty-selector">
                <h2 class="cbn-section-title">בחר רמת קושי</h2>
                <div class="cbn-difficulty-buttons">${buttons}</div>
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
        this.addEventListenerAll('.cbn-difficulty-btn', 'click', (e) => {
            const target = (e.currentTarget as HTMLElement);
            const difficulty = target.dataset['difficulty'] as Difficulty;
            if (difficulty) {
                this.setState({ selected: difficulty });
                this.onSelect(difficulty);
            }
        });
    }
}
