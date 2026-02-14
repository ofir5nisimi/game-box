/**
 * GameShell — Game Container Component
 *
 * Wrapper displayed when navigating to a game route:
 * - Animated back button
 * - Score display area (for future use)
 * - Coming soon splash for unavailable games
 * - Slide-in page transition
 */

import { Component } from '../core/Component.ts';
import type { GameInfo } from '../models/GameInfo.ts';

interface GameShellState {
  game: GameInfo | null;
  score: number;
}

export class GameShell extends Component<GameShellState> {
  constructor(container: HTMLElement, game: GameInfo | null) {
    super(container, { game, score: 0 });
  }

  render(): string {
    const { game } = this.state;

    if (!game) {
      return this.renderNotFound();
    }

    if (!game.isAvailable) {
      return this.renderComingSoon(game);
    }

    // For available games, render the game shell
    // (individual games will be implemented in future phases)
    return this.renderGameContainer(game);
  }

  mount(): void {
    super.mount();
    this.attachListeners();
  }

  protected afterRender(): void {
    this.attachListeners();
  }

  /** Update the score display */
  updateScore(newScore: number): void {
    this.setState({ score: newScore });
  }

  private renderNotFound(): string {
    return `
      <div class="game-shell anim-slide-in-right" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;">
        <a href="#/" class="btn-back" style="position:absolute;top:var(--space-5);right:var(--space-5);">
          → חזרה הביתה
        </a>
        <div style="text-align:center;" class="anim-fade-in">
          <div style="font-size:5rem;margin-bottom:var(--space-4);">❓</div>
          <h2 style="margin-bottom:var(--space-3);">משחק לא נמצא</h2>
          <p style="color:var(--text-secondary);">Game not found</p>
        </div>
      </div>
    `;
  }

  private renderComingSoon(game: GameInfo): string {
    return `
      <div class="game-shell anim-slide-in-right" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;">
        <a href="#/" class="btn-back" style="position:absolute;top:var(--space-5);right:var(--space-5);">
          → חזרה הביתה
        </a>
        <div style="text-align:center;" class="anim-fade-in">
          <div style="font-size:5rem;margin-bottom:var(--space-4);" class="anim-float">${game.icon}</div>
          <h2 style="margin-bottom:var(--space-3);">${game.titleHe}</h2>
          <div class="badge badge-coming-soon anim-shimmer" style="font-size:var(--font-size-lg);padding:var(--space-2) var(--space-5);">
            ✨ בקרוב... ✨
          </div>
        </div>
      </div>
    `;
  }

  private renderGameContainer(game: GameInfo): string {
    return `
      <div class="game-shell anim-slide-in-right">
        <div class="game-shell__header">
          <a href="#/" class="btn-back">
            → חזרה הביתה
          </a>
          <div class="game-shell__title">
            <span class="game-shell__icon">${game.icon}</span>
            <h2>${game.titleHe}</h2>
          </div>
          <div class="game-shell__score">
            ניקוד: <span class="score-value">${this.state.score}</span>
          </div>
        </div>
        <div class="game-shell__content" id="game-content">
          <!-- Game instance will be mounted here in future phases -->
          <div style="display:flex;align-items:center;justify-content:center;min-height:60vh;color:var(--text-secondary);">
            <p>Game implementation coming soon...</p>
          </div>
        </div>
      </div>
    `;
  }

  private attachListeners(): void {
    // Back button is a regular link, no custom handling needed
    // Individual game listeners will be attached when games are implemented
  }
}
