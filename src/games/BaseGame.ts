/**
 * BaseGame — Abstract Base Class for All Games
 *
 * Every game in Game Box extends this class.
 * It provides the common lifecycle (start, pause, resume, reset, destroy)
 * and integrates with the Component system for rendering.
 *
 * Subclasses MUST implement: start(), reset(), render()
 *
 * @example
 * ```ts
 * class TicTacToeGame extends BaseGame {
 *   start(): void { ... }
 *   reset(): void { ... }
 *   render(): string { return '<div>...</div>'; }
 * }
 * ```
 */

import { Component } from '../core/Component.ts';
import { EventBus } from '../core/EventBus.ts';
import type { AppEvents, GameState, GameResult } from '../types/index.ts';

export interface BaseGameState {
    score: number;
    gameState: GameState;
}

export abstract class BaseGame extends Component<BaseGameState> {
    protected eventBus: EventBus<AppEvents>;

    constructor(container: HTMLElement, eventBus: EventBus<AppEvents>) {
        super(container, {
            score: 0,
            gameState: 'idle',
        });
        this.eventBus = eventBus;
    }

    // ─── Abstract Methods (must be implemented by each game) ────

    /** Initialize and start the game */
    abstract start(): void;

    /** Reset the game to its initial state */
    abstract reset(): void;

    // render() is already abstract from Component

    // ─── Lifecycle Methods ──────────────────────────────────────

    /** Pause the game */
    pause(): void {
        if (this.state.gameState === 'playing') {
            this.setState({ gameState: 'paused' });
            this.eventBus.emit('game:pause', undefined);
        }
    }

    /** Resume a paused game */
    resume(): void {
        if (this.state.gameState === 'paused') {
            this.setState({ gameState: 'playing' });
            this.eventBus.emit('game:resume', undefined);
        }
    }

    /** Clean up and destroy the game */
    destroy(): void {
        this.setState({ gameState: 'idle' });
        this.unmount();
    }

    // ─── Score ──────────────────────────────────────────────────

    /** Get the current score */
    getScore(): number {
        return this.state.score;
    }

    // ─── Protected Helpers ──────────────────────────────────────

    /**
     * Called when the game ends. Emits the 'game:end' event.
     * @param result — The game result with score, win status, and duration.
     */
    protected onGameEnd(result: GameResult): void {
        this.setState({ gameState: 'ended' });
        this.eventBus.emit('game:end', result);
    }

    /**
     * Play a UI sound effect.
     * @param _soundName — Name of the sound file in public/assets/sounds/
     */
    protected playSound(_soundName: string): void {
        // Sound implementation will be added in Phase 10 (Polish)
        // const audio = new Audio(`/assets/sounds/${soundName}.mp3`);
        // audio.play().catch(() => {});
    }
}
