/**
 * GameRegistry — Central Game Repository
 *
 * Stores all registered games and provides filtering by category.
 * Games are registered once at startup and queried by the UI components.
 *
 * @example
 * ```ts
 * const registry = new GameRegistry();
 * registry.register(new GameInfo({ id: 'math-quiz', ... }));
 * const mathGames = registry.getByCategory('math');
 * ```
 */

import { GameInfo } from './GameInfo.ts';
import type { CategoryFilter } from '../types/index.ts';

export class GameRegistry {
    private games: Map<string, GameInfo> = new Map();

    /**
     * Register a new game. Throws if a game with the same ID already exists.
     */
    register(gameInfo: GameInfo): void {
        if (this.games.has(gameInfo.id)) {
            throw new Error(`Game with id "${gameInfo.id}" is already registered.`);
        }
        this.games.set(gameInfo.id, gameInfo);
    }

    /**
     * Get a game by its unique ID.
     */
    getGame(id: string): GameInfo | undefined {
        return this.games.get(id);
    }

    /**
     * Get all registered games, in registration order.
     */
    getAllGames(): GameInfo[] {
        return Array.from(this.games.values());
    }

    /**
     * Get games filtered by category.
     * If 'all' is passed, returns all games.
     */
    getByCategory(category: CategoryFilter): GameInfo[] {
        if (category === 'all') {
            return this.getAllGames();
        }
        return this.getAllGames().filter((g) => g.category === category);
    }

    /**
     * Get only games that are currently available (playable).
     */
    getAvailableGames(): GameInfo[] {
        return this.getAllGames().filter((g) => g.isAvailable);
    }

    /**
     * Get total number of registered games.
     */
    get count(): number {
        return this.games.size;
    }
}
