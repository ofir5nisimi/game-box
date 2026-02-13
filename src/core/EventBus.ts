/**
 * EventBus — Typed Pub/Sub Event System
 *
 * Provides decoupled communication between components.
 * Generic type parameter ensures event names and payloads are type-safe.
 *
 * @example
 * ```ts
 * const bus = new EventBus<AppEvents>();
 * bus.on('game:end', (result) => console.log(result.score));
 * bus.emit('game:end', { score: 10, won: true, duration: 45000 });
 * ```
 */

type Listener<T> = (data: T) => void;

export class EventBus<TEvents extends object = Record<string, unknown>> {
    private listeners = new Map<keyof TEvents, Set<Listener<never>>>();

    /**
     * Subscribe to an event.
     * @returns An unsubscribe function for easy cleanup.
     */
    on<K extends keyof TEvents>(
        event: K,
        callback: Listener<TEvents[K]>,
    ): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        const set = this.listeners.get(event)!;
        set.add(callback as Listener<never>);

        // Return unsubscribe function
        return () => {
            set.delete(callback as Listener<never>);
        };
    }

    /**
     * Unsubscribe a specific callback from an event.
     */
    off<K extends keyof TEvents>(
        event: K,
        callback: Listener<TEvents[K]>,
    ): void {
        const set = this.listeners.get(event);
        if (set) {
            set.delete(callback as Listener<never>);
        }
    }

    /**
     * Emit an event with its associated data payload.
     * All registered listeners for this event are called synchronously.
     */
    emit<K extends keyof TEvents>(event: K, data: TEvents[K]): void {
        const set = this.listeners.get(event);
        if (set) {
            for (const callback of set) {
                (callback as Listener<TEvents[K]>)(data);
            }
        }
    }

    /**
     * Remove all listeners for a specific event, or all events if none specified.
     */
    clear(event?: keyof TEvents): void {
        if (event) {
            this.listeners.delete(event);
        } else {
            this.listeners.clear();
        }
    }
}
