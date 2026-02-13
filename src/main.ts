/**
 * Game Box — Main Entry Point
 *
 * Bootstraps the application, registers games, and starts the router.
 */

import { App } from './core/App.ts';

// ─── Bootstrap ────────────────────────────────────────────────

function bootstrap(): void {
    const rootElement = document.getElementById('app');
    if (!rootElement) {
        throw new Error('Root element #app not found in the DOM.');
    }

    const app = App.getInstance(rootElement);

    // Game registration will be added in Phase 3
    // registry.register(new GameInfo({ ... }));

    app.start();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}
