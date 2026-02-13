/**
 * GameInfo — Immutable Game Metadata
 *
 * Holds all the information needed to display a game card
 * and launch the game. Properties are readonly to enforce immutability.
 *
 * @example
 * ```ts
 * const game = new GameInfo({
 *   id: 'tic-tac-toe',
 *   title: 'Tic-Tac-Toe',
 *   titleHe: 'איקס עיגול',
 *   description: 'Classic X and O game!',
 *   icon: '❌⭕',
 *   category: 'fun',
 *   color: '#9b59b6',
 *   isAvailable: false,
 *   gameClass: null,
 * });
 * ```
 */

import type { IGameInfo, GameCategory, GameConstructor } from '../types/index.ts';

export class GameInfo {
    readonly id: string;
    readonly title: string;
    readonly titleHe: string;
    readonly description: string;
    readonly icon: string;
    readonly category: GameCategory;
    readonly color: string;
    readonly isAvailable: boolean;
    readonly gameClass: GameConstructor | null;

    constructor(config: IGameInfo) {
        this.id = config.id;
        this.title = config.title;
        this.titleHe = config.titleHe;
        this.description = config.description;
        this.icon = config.icon;
        this.category = config.category;
        this.color = config.color;
        this.isAvailable = config.isAvailable;
        this.gameClass = config.gameClass;
    }
}
