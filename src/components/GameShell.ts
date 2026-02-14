/**
 * GameShell — Game Container Component
 *
 * Wrapper displayed when navigating to a game route:
 * - Animated back button
 * - Score display area (for future use)
 * - Coming soon splash for unavailable games
 * - Mounts actual game class inside #game-content when available
 */

import { Component } from '../core/Component.ts';
import type { GameInfo } from '../models/GameInfo.ts';

interface GameShellState {
  game: GameInfo | null;
  score: number;
}

export class GameShell extends Component<GameShellState> {
  /** The mounted game instance (if any). */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private gameInstance: any = null;

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

    // For available games, render a shell with a mount point
    return this.renderGameContainer(game);
  }

  mount(): void {
    super.mount();
    this.attachListeners();
    this.mountGameInstance();
  }

  protected afterRender(): void {
    this.attachListeners();
    this.mountGameInstance();
  }

  unmount(): void {
    // Unmount the game instance before clearing the shell
    if (this.gameInstance && typeof this.gameInstance.unmount === 'function') {
      this.gameInstance.unmount();
      this.gameInstance = null;
    }
    super.unmount();
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

  private renderGameContainer(_game: GameInfo): string {
    return `
      <div class="game-shell anim-slide-in-right">
        <div class="game-shell__content" id="game-content">
          <!-- Game instance will mount here -->
        </div>
      </div>
    `;
  }

  /**
   * If the game has a gameClass, instantiate and mount it into #game-content.
   */
  private mountGameInstance(): void {
    const { game } = this.state;
    if (!game || !game.isAvailable || !game.gameClass) return;

    const contentEl = this.element.querySelector('#game-content') as HTMLElement | null;
    if (!contentEl) return;

    // Instantiate the game class
    const GameClass = game.gameClass;
    this.gameInstance = new GameClass(contentEl);

    // If the game supports setOnExit, wire it up to navigate home
    if (typeof this.gameInstance.setOnExit === 'function') {
      this.gameInstance.setOnExit(() => {
        window.location.hash = '#/';
      });
    }

    // Mount the game
    this.gameInstance.mount();
  }

  private attachListeners(): void {
    // Back button is a regular link, no custom handling needed
  }
}
