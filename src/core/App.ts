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
import { GameInfo } from '../models/GameInfo.ts';
import { ParticleBackground } from '../components/ParticleBackground.ts';
import { Header } from '../components/Header.ts';
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

        <!-- Category Filter -->
        <nav class="category-filter">
          ${this.renderCategoryButton('all', '🌟 הכל')}
          ${this.renderCategoryButton('math', '🔢 חשבון')}
          ${this.renderCategoryButton('english', '🔤 אנגלית')}
          ${this.renderCategoryButton('fun', '🎉 כיף')}
        </nav>

        <!-- Game Cards Grid -->
        <div class="game-grid" id="game-grid">
          ${games.map((game, i) => this.renderGameCard(game, i)).join('')}
        </div>
      </div>
    `;

        // Mount the Header component
        const headerMount = this.rootElement.querySelector('#header-mount');
        if (headerMount) {
            if (this.header) this.header.unmount();
            this.header = new Header(headerMount as HTMLElement);
            this.header.mount();
        }

        this.attachHomeListeners();
    }

    /**
     * Launch a game by its ID.
     */
    launchGame(gameId: string): void {
        const game = this.registry.getGame(gameId);
        this.eventBus.emit('game:start', { gameId });

        const title = game ? game.titleHe : gameId;
        const icon = game ? game.icon : '🎮';

        this.rootElement.innerHTML = `
      <div class="home-screen" style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;">
        <a href="#/" class="btn-back" id="back-btn" style="position:absolute;top:var(--space-5);right:var(--space-5);">
          → חזרה הביתה
        </a>
        <div style="text-align:center;" class="anim-fade-in">
          <div style="font-size:5rem;margin-bottom:var(--space-4);" class="anim-float">${icon}</div>
          <h2 style="margin-bottom:var(--space-3);">${title}</h2>
          <div class="badge badge-coming-soon anim-shimmer" style="font-size:var(--font-size-lg);padding:var(--space-2) var(--space-5);">
            ✨ ...בקרוב ✨
          </div>
        </div>
      </div>
    `;
    }

    // ─── Rendering Helpers ──────────────────────────────────────

    /**
     * Render a single category filter button.
     */
    private renderCategoryButton(category: CategoryFilter, label: string): string {
        const isActive = this.activeCategory === category ? 'active' : '';
        return `<button class="category-btn ${isActive}" data-category="${category}">${label}</button>`;
    }

    /**
     * Render a single game card.
     */
    private renderGameCard(game: GameInfo, index: number): string {
        const comingSoonClass = game.isAvailable ? '' : 'coming-soon';
        const badge = game.isAvailable
            ? ''
            : '<span class="badge badge-coming-soon game-card__badge">...בקרוב ✨</span>';

        return `
      <div class="card game-card anim-fade-in-stagger ${comingSoonClass}"
           data-game-id="${game.id}"
           data-category="${game.category}"
           style="animation-delay: ${index * 0.06}s;"
           role="button"
           tabindex="0"
           aria-label="${game.title} — ${game.titleHe}">
        ${badge}
        <div class="game-card__icon">${game.icon}</div>
        <div class="game-card__title-he">${game.titleHe}</div>
        <div class="game-card__title-en">${game.title}</div>
        <div class="game-card__description">${game.description}</div>
      </div>
    `;
    }

    // ─── Event Listeners ────────────────────────────────────────

    /**
     * Attach interactive event listeners to the home screen.
     */
    private attachHomeListeners(): void {
        // Category filter buttons
        this.rootElement.querySelectorAll('.category-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const category = (btn as HTMLElement).dataset['category'] as CategoryFilter;
                if (category && category !== this.activeCategory) {
                    this.activeCategory = category;
                    this.eventBus.emit('category:change', { category });
                    this.showHome();
                }
            });
        });

        // Game card clicks
        this.rootElement.querySelectorAll('.game-card').forEach((card) => {
            card.addEventListener('click', () => {
                const gameId = (card as HTMLElement).dataset['gameId'];
                if (gameId) {
                    this.router.navigate(`/game/${gameId}`);
                }
            });

            // Keyboard accessibility
            card.addEventListener('keydown', (e) => {
                if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
                    e.preventDefault();
                    const gameId = (card as HTMLElement).dataset['gameId'];
                    if (gameId) {
                        this.router.navigate(`/game/${gameId}`);
                    }
                }
            });
        });
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
