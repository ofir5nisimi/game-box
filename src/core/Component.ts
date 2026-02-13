/**
 * Component — Abstract Base UI Component
 *
 * Every visual element in the app extends this class.
 * Provides a predictable lifecycle: construct → render → mount → [setState → re-render] → unmount.
 *
 * @typeParam TState — The shape of this component's internal state.
 *
 * @example
 * ```ts
 * interface CounterState { count: number }
 *
 * class Counter extends Component<CounterState> {
 *   constructor(container: HTMLElement) {
 *     super(container, { count: 0 });
 *   }
 *   render(): string {
 *     return `<button id="inc">${this.state.count}</button>`;
 *   }
 *   mount(): void {
 *     super.mount();
 *     this.addEventListener('#inc', 'click', () =>
 *       this.setState({ count: this.state.count + 1 }),
 *     );
 *   }
 * }
 * ```
 */
export abstract class Component<TState extends object = Record<string, unknown>> {
    /** Root DOM element this component renders into */
    protected element: HTMLElement;

    /** Internal component state */
    protected state: TState;

    /** Tracks whether the component is currently mounted in the DOM */
    private _isMounted = false;

    /** Stores cleanup functions for event listeners */
    private _cleanupFns: Array<() => void> = [];

    constructor(container: HTMLElement, initialState: TState) {
        this.element = container;
        this.state = { ...initialState };
    }

    // ─── Lifecycle Methods ──────────────────────────────────────

    /**
     * Returns the HTML string for this component.
     * Called on initial mount and after every `setState`.
     */
    abstract render(): string;

    /**
     * Called after the component's HTML is inserted into the DOM.
     * Override to attach event listeners and perform DOM setup.
     * Always call `super.mount()` first.
     */
    mount(): void {
        this.element.innerHTML = this.render();
        this._isMounted = true;
    }

    /**
     * Called when the component is being removed from the DOM.
     * Cleans up all event listeners registered via `addEventListener`.
     * Override for additional cleanup; always call `super.unmount()`.
     */
    unmount(): void {
        this._isMounted = false;

        // Run all cleanup functions (remove event listeners, etc.)
        for (const cleanup of this._cleanupFns) {
            cleanup();
        }
        this._cleanupFns = [];

        this.element.innerHTML = '';
    }

    // ─── State Management ───────────────────────────────────────

    /**
     * Merge partial state and trigger a re-render.
     * Only updates if the component is currently mounted.
     */
    protected setState(partial: Partial<TState>): void {
        this.state = { ...this.state, ...partial };

        if (this._isMounted) {
            // Clean up old listeners before re-rendering
            for (const cleanup of this._cleanupFns) {
                cleanup();
            }
            this._cleanupFns = [];

            this.element.innerHTML = this.render();
            this.afterRender();
        }
    }

    /**
     * Called after each re-render triggered by `setState`.
     * Override to re-attach event listeners after DOM update.
     */
    protected afterRender(): void {
        // Default: no-op. Override in subclasses.
    }

    // ─── DOM Helpers ────────────────────────────────────────────

    /**
     * Query a child element within this component's root.
     * Returns `null` if not found (due to strict null checks).
     */
    protected querySelector<T extends HTMLElement = HTMLElement>(
        selector: string,
    ): T | null {
        return this.element.querySelector<T>(selector);
    }

    /**
     * Query all matching child elements within this component's root.
     */
    protected querySelectorAll<T extends HTMLElement = HTMLElement>(
        selector: string,
    ): NodeListOf<T> {
        return this.element.querySelectorAll<T>(selector);
    }

    /**
     * Add an event listener to a child element, with automatic cleanup on unmount/re-render.
     * @param selector — CSS selector for the target element
     * @param event — DOM event name
     * @param handler — Event handler function
     */
    protected addEventListener<K extends keyof HTMLElementEventMap>(
        selector: string,
        event: K,
        handler: (e: HTMLElementEventMap[K]) => void,
    ): void {
        const el = this.querySelector(selector);
        if (el) {
            el.addEventListener(event, handler);
            this._cleanupFns.push(() => el.removeEventListener(event, handler));
        }
    }

    /**
     * Add an event listener to multiple child elements matching a selector.
     */
    protected addEventListenerAll<K extends keyof HTMLElementEventMap>(
        selector: string,
        event: K,
        handler: (e: HTMLElementEventMap[K]) => void,
    ): void {
        const elements = this.querySelectorAll(selector);
        for (const el of elements) {
            el.addEventListener(event, handler);
            this._cleanupFns.push(() => el.removeEventListener(event, handler));
        }
    }

    /** Whether the component is currently mounted in the DOM */
    get isMounted(): boolean {
        return this._isMounted;
    }
}
