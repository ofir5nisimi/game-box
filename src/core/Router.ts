/**
 * Router — Hash-Based SPA Router
 *
 * Manages client-side navigation using hash fragments (#/path).
 * Supports parameterized routes like `#/game/:id`.
 *
 * @example
 * ```ts
 * const router = new Router();
 * router.register('/', () => showHome());
 * router.register('/game/:id', ({ id }) => launchGame(id));
 * router.start(); // Begin listening for hash changes
 * ```
 */

import type { RouteHandler, RouteDefinition } from '../types/index.ts';

export class Router {
    private routes: RouteDefinition[] = [];
    private currentRoute = '';
    private onHashChangeBound: () => void;

    constructor() {
        this.onHashChangeBound = this.onHashChange.bind(this);
    }

    /**
     * Register a route with a path pattern and handler.
     * Supports `:param` syntax for dynamic segments.
     *
     * @param path — Route path, e.g. '/' or '/game/:id'
     * @param handler — Function called when route matches
     */
    register(path: string, handler: RouteHandler): void {
        const paramNames: string[] = [];

        // Convert path pattern to regex, extracting param names
        // e.g. '/game/:id' → /^\/game\/([^/]+)$/
        const regexStr = path
            .replace(/:(\w+)/g, (_match, paramName: string) => {
                paramNames.push(paramName);
                return '([^/]+)';
            })
            .replace(/\//g, '\\/');

        const pattern = new RegExp(`^${regexStr}$`);
        this.routes.push({ pattern, paramNames, handler });
    }

    /**
     * Programmatically navigate to a route.
     */
    navigate(path: string): void {
        window.location.hash = `#${path}`;
    }

    /**
     * Get the current route path (without the # prefix).
     */
    getCurrentRoute(): string {
        return this.currentRoute;
    }

    /**
     * Start listening for hash changes and resolve the current hash.
     */
    start(): void {
        window.addEventListener('hashchange', this.onHashChangeBound);
        this.onHashChange(); // Resolve current hash on startup
    }

    /**
     * Stop listening for hash changes.
     */
    stop(): void {
        window.removeEventListener('hashchange', this.onHashChangeBound);
    }

    /**
     * Handle hash change events — match against registered routes.
     */
    private onHashChange(): void {
        const hash = window.location.hash.slice(1) || '/'; // Remove '#', default to '/'
        this.currentRoute = hash;

        for (const route of this.routes) {
            const match = hash.match(route.pattern);
            if (match) {
                // Extract named params from regex capture groups
                const params: Record<string, string> = {};
                route.paramNames.forEach((name, index) => {
                    const value = match[index + 1];
                    if (value !== undefined) {
                        params[name] = value;
                    }
                });

                route.handler(params);
                return;
            }
        }

        // No route matched — navigate to home
        if (hash !== '/') {
            this.navigate('/');
        }
    }
}
