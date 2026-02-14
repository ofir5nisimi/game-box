/**
 * Game Box — Shared Type Definitions
 *
 * Central type definitions used across the entire application.
 * Import from '@/types' or '../../types' in any module.
 */

// ─── Game Categories ───────────────────────────────────────────

/** Available game categories */
export type GameCategory = 'math' | 'english' | 'fun';

/** Category including the "all" filter option */
export type CategoryFilter = GameCategory | 'all';

// ─── Game State ────────────────────────────────────────────────

/** Game lifecycle state */
export type GameState = 'idle' | 'playing' | 'paused' | 'ended';

/** Result emitted when a game ends */
export interface GameResult {
    readonly score: number;
    readonly won: boolean;
    readonly duration: number; // milliseconds
}

// ─── Game Info ──────────────────────────────────────────────────

/**
 * Constructor type for game classes.
 * The actual type validation happens at registration time in main.ts.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GameConstructor = new (container: HTMLElement, eventBus?: any) => any;

/** Configuration for registering a game in the registry */
export interface IGameInfo {
    readonly id: string;
    readonly title: string;
    readonly titleHe: string;
    readonly description: string;
    readonly icon: string;
    readonly category: GameCategory;
    readonly color: string;
    readonly isAvailable: boolean;
    readonly gameClass: GameConstructor | null;
}

// ─── Events ─────────────────────────────────────────────────────

/** Typed event map — keys are event names, values are payload types */
export interface AppEvents {
    'game:start': { gameId: string };
    'game:end': GameResult;
    'game:pause': undefined;
    'game:resume': undefined;
    'navigate': { route: string };
    'category:change': { category: CategoryFilter };
}

// ─── Router ─────────────────────────────────────────────────────

/** A route handler function */
export type RouteHandler = (params: Record<string, string>) => void;

/** Route definition with path pattern and handler */
export interface RouteDefinition {
    pattern: RegExp;
    paramNames: string[];
    handler: RouteHandler;
}
