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
import { ParticleBackground } from '../components/ParticleBackground.ts';
import { Header } from '../components/Header.ts';
import { CategoryFilter as CategoryFilterComponent } from '../components/CategoryFilter.ts';
import { GameGrid } from '../components/GameGrid.ts';
import { GameShell } from '../components/GameShell.ts';
import type { AppEvents, CategoryFilter } from '../types/index.ts';

export class App {
    private static instance: App | null = null;

    private router: Router;
    private eventBus: EventBus<AppEvents>;
    private registry: GameRegistry;
    private rootElement: HTMLElement;
    private currentView: Component | null = null;
    private particleBg: ParticleBackground | null = null;
    private header: Header | null = null;
    private categoryFilter: CategoryFilterComponent | null = null;
    private gameGrid: GameGrid | null = null;
    private gameShell: GameShell | null = null;
    private activeCategory: CategoryFilter = 'all';

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
        // Mount the particle background once (persists across routes)
        this.particleBg = new ParticleBackground(this.rootElement);
        this.particleBg.mount();

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
     * Show the home screen with header, category filter, and game cards.
     */
    showHome(): void {
        this.setView(null);
        const games = this.registry.getByCategory(this.activeCategory);

        this.rootElement.innerHTML = `
      <div class="home-screen">
        <!-- Header (mounted by component) -->
        <div id="header-mount"></div>

        <!-- Category Filter (mounted by component) -->
        <div id="category-filter-mount"></div>

        <!-- Game Cards Grid (mounted by component) -->
        <div id="game-grid-mount"></div>
      </div>
    `;

        // Mount the Header component
        const headerMount = this.rootElement.querySelector('#header-mount');
        if (headerMount) {
            if (this.header) this.header.unmount();
            this.header = new Header(headerMount as HTMLElement);
            this.header.mount();
        }

        // Mount the CategoryFilter component
        const filterMount = this.rootElement.querySelector('#category-filter-mount');
        if (filterMount) {
            if (this.categoryFilter) this.categoryFilter.unmount();
            this.categoryFilter = new CategoryFilterComponent(
                filterMount as HTMLElement,
                this.activeCategory,
                (category) => {
                    this.activeCategory = category;
                    this.eventBus.emit('category:change', { category });
                    this.showHome();
                },
            );
            this.categoryFilter.mount();
        }

        // Mount the GameGrid component
        const gridMount = this.rootElement.querySelector('#game-grid-mount');
        if (gridMount) {
            if (this.gameGrid) this.gameGrid.unmount();
            this.gameGrid = new GameGrid(
                gridMount as HTMLElement,
                games,
                (gameId) => this.router.navigate(`/game/${gameId}`),
            );
            this.gameGrid.mount();
        }

        this.attachHomeListeners();
    }

    /**
     * Launch a game by its ID.
     */
    launchGame(gameId: string): void {
        const game = this.registry.getGame(gameId);
        this.eventBus.emit('game:start', { gameId });

        // Clear the root and mount GameShell
        this.setView(null);
        if (this.gameShell) this.gameShell.unmount();

        this.gameShell = new GameShell(this.rootElement, game ?? null);
        this.gameShell.mount();
    }

    // ─── Rendering Helpers ──────────────────────────────────────





    // ─── Event Listeners ────────────────────────────────────────

    /**
     * Attach interactive event listeners to the home screen.
     */
    private attachHomeListeners(): void {
        // All game interactions now handled by GameGrid component
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
