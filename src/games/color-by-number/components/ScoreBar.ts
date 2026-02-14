/**
 * ScoreBar — Game Header with Back, Title, Progress, and Score
 *
 * Displays at the top of the gameplay screen.
 */

import { Component } from '../../../core/Component.ts';

interface ScoreBarState {
    puzzleName: string;
    puzzleIcon: string;
    score: number;
    completed: number;
    total: number;
}

export class ScoreBar extends Component<ScoreBarState> {
    private onBack: () => void;

    constructor(
        container: HTMLElement,
        puzzleName: string,
        puzzleIcon: string,
        total: number,
        onBack: () => void,
    ) {
        super(container, {
            puzzleName,
            puzzleIcon,
            score: 0,
            completed: 0,
            total,
        });
        this.onBack = onBack;
    }

    render(): string {
        const { puzzleName, puzzleIcon, score, completed, total } = this.state;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

        return `
            <div class="cbn-score-bar">
                <button class="cbn-back-btn" aria-label="חזרה">← חזרה</button>
                <div class="cbn-score-title">
                    <span class="cbn-score-icon">${puzzleIcon}</span>
                    <span class="cbn-score-name">${puzzleName}</span>
                </div>
                <div class="cbn-score-stats">
                    <div class="cbn-progress-wrapper">
                        <div class="cbn-progress-bar" style="width:${pct}%"></div>
                    </div>
                    <span class="cbn-score-display">⭐ ${score}</span>
                </div>
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
        this.addEventListener('.cbn-back-btn', 'click', () => {
            this.onBack();
        });
    }

    /**
     * Update score and progress (called by parent).
     */
    updateProgress(score: number, completed: number): void {
        this.setState({ score, completed });
    }
}
