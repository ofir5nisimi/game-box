/**
 * App — Application Singleton
 *
 * Central controller that owns the Router, EventBus, and GameRegistry.
 * Manages the top-level view lifecycle (home screen vs. active game).
 *
 * @example
 * ```ts
 * const app = App.getInstance();
 * app.start(); // Mounts the home screen and starts the router
 * ```
 */

import { Router } from './Router.ts';
import { EventBus } from './EventBus.ts';
import { Component } from './Component.ts';
import { GameRegistry } from '../models/GameRegistry.ts';
import type { AppEvents } from '../types/index.ts';

export class App {
    private static instance: App | null = null;

    private router: Router;
    private eventBus: EventBus<AppEvents>;
    private registry: GameRegistry;
    private rootElement: HTMLElement;
    private currentView: Component | null = null;

    private constructor(rootElement: HTMLElement, registry: GameRegistry) {
        this.rootElement = rootElement;
        this.registry = registry;
        this.router = new Router();
        this.eventBus = new EventBus<AppEvents>();
    }

    /**
     * Get or create the singleton App instance.
     * @param rootElement — Required on first call; the #app container element.
     * @param registry — Required on first call; the populated GameRegistry.
     */
    static getInstance(rootElement?: HTMLElement, registry?: GameRegistry): App {
        if (!App.instance) {
            if (!rootElement || !registry) {
                throw new Error('App.getInstance() requires rootElement and registry on first call.');
            }
            App.instance = new App(rootElement, registry);
        }
        return App.instance;
    }

    /**
     * Bootstrap the application — register routes and start the router.
     * This is called once from main.ts after registering all games.
     */
    start(): void {
        this.setupRoutes();
        this.router.start();
    }

    /**
     * Get the typed EventBus for pub/sub communication.
     */
    getEventBus(): EventBus<AppEvents> {
        return this.eventBus;
    }

    /**
     * Get the router for programmatic navigation.
     */
    getRouter(): Router {
        return this.router;
    }

    /**
     * Get the game registry.
     */
    getRegistry(): GameRegistry {
        return this.registry;
    }

    /**
     * Navigate to a specific route.
     */
    navigateTo(route: string): void {
        this.router.navigate(route);
    }

    /**
     * Show the home screen.
     * Called by the router when navigating to '/'.
     */
    showHome(): void {
        this.setView(null); // Will be replaced with HomeScreen in Phase 8
        this.rootElement.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100vh;color:white;font-family:'Rubik',sans-serif;">
        <h1>🎮 Game Box — Loading...</h1>
      </div>
    `;
    }

    /**
     * Launch a game by its ID.
     * Called by the router when navigating to '/game/:id'.
     */
    launchGame(gameId: string): void {
        this.eventBus.emit('game:start', { gameId });
        // GameShell integration will be added in Phase 9
        this.rootElement.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:100vh;color:white;font-family:'Rubik',sans-serif;">
        <div style="text-align:center;">
          <h1>🎮 ${gameId}</h1>
          <p>...בקרוב</p>
          <a href="#/" style="color:#e94560;">חזרה הביתה ←</a>
        </div>
      </div>
    `;
    }

    // ─── Private ────────────────────────────────────────────────

    /**
     * Register all application routes.
     */
    private setupRoutes(): void {
        this.router.register('/', () => this.showHome());
        this.router.register('/game/:id', (params) => {
            if (params['id']) {
                this.launchGame(params['id']);
            }
        });
    }

    /**
     * Switch the current view, unmounting the previous one if present.
     */
    private setView(view: Component | null): void {
        if (this.currentView) {
            this.currentView.unmount();
        }
        this.currentView = view;
    }
}
