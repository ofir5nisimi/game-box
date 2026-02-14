/**
 * ColorByNumber — Main Game Class
 *
 * Orchestrates the Color by Number game flow:
 * select-difficulty → select-puzzle → playing → complete
 *
 * Manages state, child components, scoring, and phase transitions.
 */

import './styles/color-by-number.css';
import { Component } from '../../core/Component.ts';
import type { Difficulty, PuzzleTemplate, SectionState, GamePhase } from './types.ts';
import { generateEquation } from './utils/equationGenerator.ts';
import { DifficultySelector } from './components/DifficultySelector.ts';
import { PuzzleSelector } from './components/PuzzleSelector.ts';
import { PuzzleCanvas } from './components/PuzzleCanvas.ts';
import { ColorPalette } from './components/ColorPalette.ts';
import { MathInput } from './components/MathInput.ts';
import { ScoreBar } from './components/ScoreBar.ts';

interface ColorByNumberGameState {
    phase: GamePhase;
    difficulty: Difficulty;
    puzzle: PuzzleTemplate | null;
    sections: SectionState[];
    selectedSectionId: number | null;
    score: number;
    completedCount: number;
}

export class ColorByNumber extends Component<ColorByNumberGameState> {
    // Child component instances
    private difficultySelector: DifficultySelector | null = null;
    private puzzleSelector: PuzzleSelector | null = null;
    private puzzleCanvas: PuzzleCanvas | null = null;
    private colorPalette: ColorPalette | null = null;
    private mathInput: MathInput | null = null;
    private scoreBar: ScoreBar | null = null;

    /** Callback to return to the home screen */
    private onExit: (() => void) | null = null;

    constructor(container: HTMLElement) {
        super(container, {
            phase: 'select-difficulty',
            difficulty: 'easy',
            puzzle: null,
            sections: [],
            selectedSectionId: null,
            score: 0,
            completedCount: 0,
        });
    }

    /**
     * Set the exit callback (called by GameShell or App).
     */
    setOnExit(fn: () => void): void {
        this.onExit = fn;
    }

    render(): string {
        const { phase } = this.state;

        switch (phase) {
            case 'select-difficulty':
                return `<div class="cbn-game cbn-phase-difficulty">
                    <div class="cbn-difficulty-mount"></div>
                </div>`;

            case 'select-puzzle':
                return `<div class="cbn-game cbn-phase-puzzle">
                    <div class="cbn-puzzle-selector-mount"></div>
                </div>`;

            case 'playing':
                return `<div class="cbn-game cbn-phase-playing">
                    <div class="cbn-scorebar-mount"></div>
                    <div class="cbn-canvas-mount"></div>
                    <div class="cbn-palette-mount"></div>
                    <div class="cbn-mathinput-mount"></div>
                </div>`;

            case 'complete':
                return this.renderComplete();

            default:
                return '<div class="cbn-game">Loading...</div>';
        }
    }

    mount(): void {
        super.mount();
        this.mountPhaseComponents();
    }

    protected afterRender(): void {
        this.mountPhaseComponents();
    }

    unmount(): void {
        this.unmountChildren();
        super.unmount();
    }

    // ─── Phase Management ───────────────────────────────────────

    private mountPhaseComponents(): void {
        this.unmountChildren();

        switch (this.state.phase) {
            case 'select-difficulty':
                this.mountDifficultySelector();
                break;
            case 'select-puzzle':
                this.mountPuzzleSelector();
                break;
            case 'playing':
                this.mountGameplay();
                break;
            case 'complete':
                this.mountCompleteListeners();
                break;
        }
    }

    private unmountChildren(): void {
        if (this.difficultySelector?.isMounted) this.difficultySelector.unmount();
        if (this.puzzleSelector?.isMounted) this.puzzleSelector.unmount();
        if (this.puzzleCanvas?.isMounted) this.puzzleCanvas.unmount();
        if (this.colorPalette?.isMounted) this.colorPalette.unmount();
        if (this.mathInput?.isMounted) this.mathInput.unmount();
        if (this.scoreBar?.isMounted) this.scoreBar.unmount();

        this.difficultySelector = null;
        this.puzzleSelector = null;
        this.puzzleCanvas = null;
        this.colorPalette = null;
        this.mathInput = null;
        this.scoreBar = null;
    }

    // ─── Phase: Select Difficulty ───────────────────────────────

    private mountDifficultySelector(): void {
        const mount = this.querySelector('.cbn-difficulty-mount');
        if (!mount) return;

        this.difficultySelector = new DifficultySelector(
            mount as HTMLElement,
            (difficulty) => this.selectDifficulty(difficulty),
        );
        this.difficultySelector.mount();
    }

    private selectDifficulty(difficulty: Difficulty): void {
        this.state.difficulty = difficulty;
        this.setState({ phase: 'select-puzzle', difficulty });
    }

    // ─── Phase: Select Puzzle ───────────────────────────────────

    private mountPuzzleSelector(): void {
        const mount = this.querySelector('.cbn-puzzle-selector-mount');
        if (!mount) return;

        this.puzzleSelector = new PuzzleSelector(
            mount as HTMLElement,
            this.state.difficulty,
            (puzzle) => this.selectPuzzle(puzzle),
        );
        this.puzzleSelector.mount();
    }

    private selectPuzzle(puzzle: PuzzleTemplate): void {
        // Generate equations for each section
        const sections: SectionState[] = puzzle.sections.map((s) => {
            const eq = generateEquation(s.colorIndex, this.state.difficulty);
            return {
                sectionId: s.id,
                equation: eq.equation,
                answer: eq.answer,
                attempts: 0,
                solved: false,
            };
        });

        this.setState({
            phase: 'playing',
            puzzle,
            sections,
            selectedSectionId: null,
            score: 0,
            completedCount: 0,
        });
    }

    // ─── Phase: Playing ─────────────────────────────────────────

    private mountGameplay(): void {
        const puzzle = this.state.puzzle;
        if (!puzzle) return;

        // ScoreBar
        const scoreMount = this.querySelector('.cbn-scorebar-mount');
        if (scoreMount) {
            this.scoreBar = new ScoreBar(
                scoreMount as HTMLElement,
                puzzle.nameHe,
                puzzle.previewIcon,
                puzzle.sections.length,
                () => this.goBack(),
            );
            this.scoreBar.mount();
        }

        // PuzzleCanvas
        const canvasMount = this.querySelector('.cbn-canvas-mount');
        if (canvasMount) {
            this.puzzleCanvas = new PuzzleCanvas(
                canvasMount as HTMLElement,
                puzzle,
                this.state.sections,
                (sectionId) => this.selectSection(sectionId),
            );
            this.puzzleCanvas.mount();
        }

        // ColorPalette
        const paletteMount = this.querySelector('.cbn-palette-mount');
        if (paletteMount) {
            // Only show colors that appear in this puzzle
            const maxColor = Math.max(...puzzle.sections.map((s) => s.colorIndex));
            this.colorPalette = new ColorPalette(paletteMount as HTMLElement, maxColor);
            this.colorPalette.mount();
        }

        // MathInput
        const mathMount = this.querySelector('.cbn-mathinput-mount');
        if (mathMount) {
            this.mathInput = new MathInput(
                mathMount as HTMLElement,
                (answer) => this.checkAnswer(answer),
            );
            this.mathInput.mount();
        }
    }

    private selectSection(sectionId: number): void {
        const section = this.state.sections.find((s) => s.sectionId === sectionId);
        if (!section || section.solved) return;

        this.state.selectedSectionId = sectionId;

        // Update canvas highlight
        this.puzzleCanvas?.updateSections(this.state.sections, sectionId);

        // Show equation in MathInput
        this.mathInput?.showEquation(section.equation);
    }

    private checkAnswer(answer: number): void {
        const { selectedSectionId, sections } = this.state;
        if (selectedSectionId === null) return;

        const section = sections.find((s) => s.sectionId === selectedSectionId);
        if (!section) return;

        section.attempts++;

        if (answer === section.answer) {
            // Correct!
            section.solved = true;
            const points = section.attempts === 1 ? 10 : section.attempts === 2 ? 5 : 2;
            const newScore = this.state.score + points;
            const newCompleted = this.state.completedCount + 1;

            this.state.score = newScore;
            this.state.completedCount = newCompleted;
            this.state.selectedSectionId = null;

            // Update children
            this.mathInput?.showCorrect();
            this.puzzleCanvas?.updateSections(sections, null);
            this.scoreBar?.updateProgress(newScore, newCompleted);

            // Check if puzzle complete
            if (newCompleted === this.state.puzzle!.sections.length) {
                const perfectBonus = sections.every((s) => s.attempts === 1) ? 50 : 0;
                const completionBonus = 20;
                this.state.score = newScore + completionBonus + perfectBonus;
                setTimeout(() => {
                    this.setState({ phase: 'complete' });
                }, 800);
            }
        } else {
            // Wrong
            this.mathInput?.showWrong();
        }
    }

    // ─── Phase: Complete ────────────────────────────────────────

    private renderComplete(): string {
        const { puzzle, score, sections } = this.state;
        const isPerfect = sections.every((s) => s.attempts === 1);
        const totalMistakes = sections.reduce((sum, s) => sum + Math.max(0, s.attempts - 1), 0);

        return `
            <div class="cbn-game cbn-phase-complete">
                <div class="cbn-celebration">
                    <div class="cbn-celebration-icon">${puzzle?.previewIcon ?? '🎨'}</div>
                    <h2 class="cbn-celebration-title">כל הכבוד! 🎉</h2>
                    <p class="cbn-celebration-subtitle">סיימת את ${puzzle?.nameHe ?? 'הציור'}!</p>
                    <div class="cbn-celebration-stats">
                        <div class="cbn-stat">
                            <span class="cbn-stat-value">⭐ ${score}</span>
                            <span class="cbn-stat-label">ניקוד</span>
                        </div>
                        <div class="cbn-stat">
                            <span class="cbn-stat-value">${totalMistakes}</span>
                            <span class="cbn-stat-label">טעויות</span>
                        </div>
                        ${isPerfect ? '<div class="cbn-stat cbn-stat--perfect"><span class="cbn-stat-value">🏆</span><span class="cbn-stat-label">מושלם!</span></div>' : ''}
                    </div>
                    <div class="cbn-celebration-buttons">
                        <button class="cbn-btn cbn-btn-primary" data-action="play-again">שחק שוב 🔄</button>
                        <button class="cbn-btn cbn-btn-secondary" data-action="go-home">חזרה הביתה 🏠</button>
                    </div>
                </div>
            </div>
        `;
    }

    private mountCompleteListeners(): void {
        this.addEventListener('[data-action="play-again"]', 'click', () => {
            this.setState({
                phase: 'select-difficulty',
                puzzle: null,
                sections: [],
                selectedSectionId: null,
                score: 0,
                completedCount: 0,
            });
        });

        this.addEventListener('[data-action="go-home"]', 'click', () => {
            if (this.onExit) this.onExit();
        });
    }

    // ─── Navigation ─────────────────────────────────────────────

    private goBack(): void {
        const { phase } = this.state;
        switch (phase) {
            case 'playing':
                this.setState({ phase: 'select-puzzle', selectedSectionId: null });
                break;
            case 'select-puzzle':
                this.setState({ phase: 'select-difficulty' });
                break;
            default:
                if (this.onExit) this.onExit();
        }
    }
}
