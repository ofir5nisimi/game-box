/**
 * MathInput — Equation Display + Answer Input
 *
 * Shows the current equation and a number pad for input.
 * Provides correct/wrong feedback animations.
 */

import { Component } from '../../../core/Component.ts';

interface MathInputState {
    equation: string;
    currentInput: string;
    feedback: 'none' | 'correct' | 'wrong';
    visible: boolean;
}

export class MathInput extends Component<MathInputState> {
    private onSubmit: (answer: number) => void;

    constructor(container: HTMLElement, onSubmit: (answer: number) => void) {
        super(container, {
            equation: '',
            currentInput: '',
            feedback: 'none',
            visible: false,
        });
        this.onSubmit = onSubmit;
    }

    render(): string {
        if (!this.state.visible) {
            return '<div class="cbn-math-input cbn-math-input--hidden"></div>';
        }

        const { equation, currentInput, feedback } = this.state;
        const feedbackClass = feedback !== 'none' ? `cbn-math-input--${feedback}` : '';
        const feedbackMsg = feedback === 'wrong' ? '<span class="cbn-feedback-msg">נסה שוב!</span>' : '';

        const numpad = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n) => `
            <button class="cbn-numpad-btn" data-num="${n}">${n}</button>
        `).join('');

        return `
            <div class="cbn-math-input ${feedbackClass}">
                <div class="cbn-equation-display">
                    <span class="cbn-equation-text">${equation} = </span>
                    <span class="cbn-equation-answer">${currentInput || '?'}</span>
                    ${feedbackMsg}
                </div>
                <div class="cbn-numpad">
                    ${numpad}
                    <button class="cbn-numpad-btn cbn-numpad-clear" data-action="clear">⌫</button>
                    <button class="cbn-numpad-btn cbn-numpad-submit" data-action="submit">✓</button>
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
        // Number buttons
        this.addEventListenerAll('.cbn-numpad-btn[data-num]', 'click', (e) => {
            const target = e.currentTarget as HTMLElement;
            const num = target.dataset['num'];
            if (num !== undefined) {
                const newInput = this.state.currentInput + num;
                // Limit to 2 digits
                if (newInput.length <= 2) {
                    this.setState({ currentInput: newInput, feedback: 'none' });
                }
            }
        });

        // Clear button
        this.addEventListener('.cbn-numpad-clear', 'click', () => {
            this.setState({ currentInput: '', feedback: 'none' });
        });

        // Submit button
        this.addEventListener('.cbn-numpad-submit', 'click', () => {
            if (this.state.currentInput) {
                this.onSubmit(parseInt(this.state.currentInput, 10));
            }
        });
    }

    /**
     * Show the input panel with a new equation.
     */
    showEquation(equation: string): void {
        this.setState({
            equation,
            currentInput: '',
            feedback: 'none',
            visible: true,
        });
    }

    /**
     * Show correct feedback and hide after a delay.
     */
    showCorrect(): void {
        this.setState({ feedback: 'correct' });
        setTimeout(() => {
            this.setState({ visible: false });
        }, 600);
    }

    /**
     * Show wrong feedback.
     */
    showWrong(): void {
        this.setState({ feedback: 'wrong', currentInput: '' });
    }

    /**
     * Hide the input panel.
     */
    hide(): void {
        this.setState({ visible: false });
    }
}
