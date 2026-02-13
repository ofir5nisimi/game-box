/**
 * CategoryFilter — Category Selection Component
 *
 * Pill-shaped filter buttons for game categories:
 * הכל 🌟 · חשבון 🔢 · אנגלית 🔤 · כיף 🎉
 *
 * Features:
 * - Active state with gradient background + shadow glow
 * - Scale-pop animation on click
 * - Emits callback when category changes
 */

import { Component } from '../core/Component.ts';
import type { CategoryFilter as CategoryFilterType } from '../types/index.ts';

interface CategoryFilterState {
    active: CategoryFilterType;
}

interface CategoryItem {
    id: CategoryFilterType;
    label: string;
}

const CATEGORIES: CategoryItem[] = [
    { id: 'all', label: '🌟 הכל' },
    { id: 'math', label: '🔢 חשבון' },
    { id: 'english', label: '🔤 אנגלית' },
    { id: 'fun', label: '🎉 כיף' },
];

export class CategoryFilter extends Component<CategoryFilterState> {
    private onChange: (category: CategoryFilterType) => void;

    constructor(container: HTMLElement, initialCategory: CategoryFilterType, onChange: (category: CategoryFilterType) => void) {
        super(container, { active: initialCategory });
        this.onChange = onChange;
    }

    render(): string {
        const buttons = CATEGORIES.map((cat) => {
            const isActive = this.state.active === cat.id ? 'active' : '';
            return `<button class="category-btn ${isActive}" data-category="${cat.id}">${cat.label}</button>`;
        }).join('');

        return `<nav class="category-filter">${buttons}</nav>`;
    }

    mount(): void {
        super.mount();
        this.attachListeners();
    }

    protected afterRender(): void {
        this.attachListeners();
    }

    /** Update the active category from outside */
    setActive(category: CategoryFilterType): void {
        if (category !== this.state.active) {
            this.setState({ active: category });
        }
    }

    private attachListeners(): void {
        this.addEventListenerAll('.category-btn', 'click', (e) => {
            const btn = (e.currentTarget ?? e.target) as HTMLElement;
            const category = btn.dataset['category'] as CategoryFilterType | undefined;
            if (category && category !== this.state.active) {
                this.setState({ active: category });
                this.onChange(category);
            }
        });
    }
}
