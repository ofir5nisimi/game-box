/**
 * Game Box — Main Entry Point
 *
 * Bootstraps the application, registers all games, and starts the router.
 */

import { App } from './core/App.ts';
import { GameInfo } from './models/GameInfo.ts';
import { GameRegistry } from './models/GameRegistry.ts';

// ─── Game Registration ────────────────────────────────────────

function registerGames(registry: GameRegistry): void {
    // Fun games 🎉
    registry.register(new GameInfo({
        id: 'tic-tac-toe',
        title: 'Tic-Tac-Toe',
        titleHe: 'איקס עיגול',
        description: 'Classic X and O game!',
        icon: '❌⭕',
        category: 'fun',
        color: '#9b59b6',
        isAvailable: false,
        gameClass: null,
    }));

    registry.register(new GameInfo({
        id: 'connect-four',
        title: 'Connect Four',
        titleHe: '4 בשורה',
        description: 'Drop discs and connect four in a row!',
        icon: '🔴🟡',
        category: 'fun',
        color: '#e74c3c',
        isAvailable: false,
        gameClass: null,
    }));

    registry.register(new GameInfo({
        id: 'memory-cards',
        title: 'Memory Cards',
        titleHe: 'משחק זיכרון',
        description: 'Find matching pairs!',
        icon: '🃏',
        category: 'fun',
        color: '#FF6B9D',
        isAvailable: false,
        gameClass: null,
    }));

    // Math games 🔢
    registry.register(new GameInfo({
        id: 'math-quiz',
        title: 'Math Quiz',
        titleHe: 'חידון חשבון',
        description: 'Test your math skills!',
        icon: '➕✖️',
        category: 'math',
        color: '#f39c12',
        isAvailable: false,
        gameClass: null,
    }));

    registry.register(new GameInfo({
        id: 'add-subtract',
        title: 'Add & Subtract',
        titleHe: 'חיבור וחיסור',
        description: 'Practice addition and subtraction!',
        icon: '➕➖',
        category: 'math',
        color: '#e67e22',
        isAvailable: false,
        gameClass: null,
    }));

    registry.register(new GameInfo({
        id: 'color-by-number',
        title: 'Color by Number',
        titleHe: 'צביעה לפי מספרים',
        description: 'Solve math to reveal the picture!',
        icon: '🎨',
        category: 'math',
        color: '#1abc9c',
        isAvailable: false,
        gameClass: null,
    }));

    // English games 🔤
    registry.register(new GameInfo({
        id: 'english-letters',
        title: 'English Letters',
        titleHe: 'אותיות באנגלית',
        description: 'Learn the English alphabet!',
        icon: '🔤',
        category: 'english',
        color: '#2ecc71',
        isAvailable: false,
        gameClass: null,
    }));

    registry.register(new GameInfo({
        id: 'spell-it',
        title: 'Spell It!',
        titleHe: 'איות מילים',
        description: 'Practice spelling English words!',
        icon: '✏️',
        category: 'english',
        color: '#27ae60',
        isAvailable: false,
        gameClass: null,
    }));
}

// ─── Bootstrap ────────────────────────────────────────────────

function bootstrap(): void {
    const rootElement = document.getElementById('app');
    if (!rootElement) {
        throw new Error('Root element #app not found in the DOM.');
    }

    // Create and populate the game registry
    const registry = new GameRegistry();
    registerGames(registry);

    // Initialize the app with the registry
    const app = App.getInstance(rootElement, registry);
    app.start();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}
