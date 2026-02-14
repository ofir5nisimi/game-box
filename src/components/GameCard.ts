/**
 * GameCard — Individual Game Card Component
 *
 * Displays a single game with:
 * - Glassmorphism card effect
 * - Category-colored accent strip
 * - Emoji icon with hover animation
 * - Hebrew + English titles
 * - Coming soon badge for unavailable games
 * - Click handler to navigate to game
 */

import { Component } from '../core/Component.ts';
import type { GameInfo } from '../models/GameInfo.ts';

interface GameCardState {
    game: GameInfo;
    index: number;
}

export class GameCard extends Component<GameCardState> {
    private onClick: (gameId: string) => void;

    constructor(
        container: HTMLElement,
        game: GameInfo,
        index: number,
        onClick: (gameId: string) => void
    ) {
        super(container, { game, index });
        this.onClick = onClick;
    }

    render(): string {
        const { game, index } = this.state;
        const comingSoonClass = game.isAvailable ? '' : 'coming-soon';
        const badge = game.isAvailable
            ? ''
            : '<span class="badge badge-coming-soon game-card__badge">...בקרוב ✨</span>';

        return `
      <div class="card game-card anim-fade-in-stagger ${comingSoonClass}"
           data-game-id="${game.id}"
           data-category="${game.category}"
           style="animation-delay: ${index * 0.06}s;"
           role="button"
           tabindex="0"
           aria-label="${game.title} — ${game.titleHe}">
        ${badge}
        <div class="game-card__icon">${game.icon}</div>
        <div class="game-card__title-he">${game.titleHe}</div>
        <div class="game-card__title-en">${game.title}</div>
        <div class="game-card__description">${game.description}</div>
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
        // Click handler
        this.addEventListener('.game-card', 'click', () => {
            this.onClick(this.state.game.id);
        });

        // Keyboard accessibility
        this.addEventListener('.game-card', 'keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.onClick(this.state.game.id);
            }
        });
    }

}
