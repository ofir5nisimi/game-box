/**
 * GameGrid — Game Cards Grid Container Component
 *
 * Manages the responsive grid of game cards:
 * - Auto-fit CSS Grid layout
 * - Maps GameInfo array to GameCard components
 * - Handles card click navigation
 * - Responsive breakpoints
 */

import { Component } from '../core/Component.ts';
import { GameCard } from './GameCard.ts';
import type { GameInfo } from '../models/GameInfo.ts';

interface GameGridState {
    games: GameInfo[];
}

export class GameGrid extends Component<GameGridState> {
    private onGameClick: (gameId: string) => void;
    private gameCards: GameCard[] = [];

    constructor(
        container: HTMLElement,
        games: GameInfo[],
        onGameClick: (gameId: string) => void
    ) {
        super(container, { games });
        this.onGameClick = onGameClick;
    }

    render(): string {
        // Create a placeholder container for each card
        const cardsHtml = this.state.games
            .map((_game, index) => `<div class="game-card-mount" data-card-index="${index}"></div>`)
            .join('');

        return `<div class="game-grid">${cardsHtml}</div>`;
    }

    mount(): void {
        super.mount();
        this.mountGameCards();
    }

    protected afterRender(): void {
        this.unmountGameCards();
        this.mountGameCards();
    }

    unmount(): void {
        this.unmountGameCards();
        super.unmount();
    }

    /** Update the grid with new games */
    updateGames(games: GameInfo[]): void {
        this.setState({ games });
    }

    private mountGameCards(): void {
        const mounts = this.querySelectorAll<HTMLElement>('.game-card-mount');
        mounts.forEach((mount, index) => {
            const game = this.state.games[index];
            if (game) {
                const card = new GameCard(mount, game, index, this.onGameClick);
                card.mount();
                this.gameCards.push(card);
            }
        });
    }

    private unmountGameCards(): void {
        for (const card of this.gameCards) {
            card.unmount();
        }
        this.gameCards = [];
    }
}
