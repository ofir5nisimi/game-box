/**
 * Header — Logo & Title Component
 *
 * Displays the "🎮 Game Box" logo with:
 * - Bounce-in entrance animation
 * - Floating sparkle emojis around the title
 * - Hover animation (scale + glow)
 * - Confetti burst on logo click
 * - Hebrew subtitle
 */

import { Component } from '../core/Component.ts';

interface HeaderState {
    showConfetti: boolean;
}

export class Header extends Component<HeaderState> {
    constructor(container: HTMLElement) {
        super(container, { showConfetti: false });
    }

    render(): string {
        return `
      <header class="home-header">
        <div class="sparkle-container">
          <span class="sparkle">✨</span>
          <span class="sparkle">⭐</span>
          <span class="sparkle">✨</span>
          <span class="sparkle">💫</span>
          <h1 class="home-logo anim-bounce-in" id="logo">🎮 Game Box</h1>
        </div>
        <p class="home-subtitle">!המשחקים הכי כיפיים</p>
        ${this.state.showConfetti ? this.renderConfetti() : ''}
      </header>
    `;
    }

    mount(): void {
        super.mount();
        this.addEventListener('#logo', 'click', () => this.triggerConfetti());
    }

    protected afterRender(): void {
        this.addEventListener('#logo', 'click', () => this.triggerConfetti());
    }

    // ─── Confetti ─────────────────────────────────────────────

    private triggerConfetti(): void {
        this.setState({ showConfetti: true });

        // Remove confetti after animation completes
        setTimeout(() => {
            this.setState({ showConfetti: false });
        }, 3000);
    }

    private renderConfetti(): string {
        const confettiColors = ['#e94560', '#ffd93d', '#2ecc71', '#9b59b6', '#f39c12', '#55efc4'];
        const emojis = ['🎉', '⭐', '🌟', '💫', '🎊', '✨', '🎮', '🕹️'];
        let html = '<div class="confetti-container" aria-hidden="true">';

        for (let i = 0; i < 20; i++) {
            const color = confettiColors[i % confettiColors.length];
            const emoji = emojis[i % emojis.length];
            const left = 20 + Math.random() * 60; // 20%–80% horizontal spread
            const delay = Math.random() * 0.8;
            const duration = 2 + Math.random() * 1.5;

            html += `
        <span class="confetti-piece anim-confetti"
              style="left:${left}%;
                     animation-delay:${delay}s;
                     animation-duration:${duration}s;
                     color:${color};">
          ${emoji}
        </span>`;
        }

        html += '</div>';
        return html;
    }
}
