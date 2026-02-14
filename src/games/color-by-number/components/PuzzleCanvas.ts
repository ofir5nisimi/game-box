/**
 * PuzzleCanvas — SVG Puzzle Rendering & Interaction
 *
 * Renders the puzzle as an SVG with clickable sections.
 * Manages section states: unsolved, selected, solved.
 */

import { Component } from '../../../core/Component.ts';
import type { PuzzleTemplate, SectionState } from '../types.ts';
import { COLOR_PALETTE } from '../data/palette.ts';

interface PuzzleCanvasState {
    puzzle: PuzzleTemplate;
    sections: SectionState[];
    selectedSectionId: number | null;
}

export class PuzzleCanvas extends Component<PuzzleCanvasState> {
    private onSectionSelect: (sectionId: number) => void;

    constructor(
        container: HTMLElement,
        puzzle: PuzzleTemplate,
        sections: SectionState[],
        onSectionSelect: (sectionId: number) => void,
    ) {
        super(container, { puzzle, sections, selectedSectionId: null });
        this.onSectionSelect = onSectionSelect;
    }

    render(): string {
        const { puzzle, sections, selectedSectionId } = this.state;

        const paths = puzzle.sections.map((section) => {
            const sectionState = sections.find((s) => s.sectionId === section.id);
            const isSolved = sectionState?.solved ?? false;
            const isSelected = section.id === selectedSectionId;

            // Determine fill color
            let fill = '#e0e0e0'; // Unsolved: gray
            if (isSolved) {
                const colorEntry = COLOR_PALETTE.find((c) => c.number === section.colorIndex);
                fill = colorEntry?.color ?? '#e0e0e0';
            }

            const strokeColor = isSelected ? '#ffd700' : '#555';
            const strokeWidth = isSelected ? 3 : 1.5;
            const className = [
                'cbn-section',
                isSolved ? 'cbn-section--solved' : 'cbn-section--unsolved',
                isSelected ? 'cbn-section--selected' : '',
            ].filter(Boolean).join(' ');

            // Equation label (hidden when solved)
            const label = isSolved ? '' : `
                <text
                    class="cbn-section-label"
                    x="${section.labelX}"
                    y="${section.labelY}"
                    text-anchor="middle"
                    dominant-baseline="central"
                    data-section-id="${section.id}"
                >${sectionState?.equation ?? '?'}</text>
            `;

            return `
                <path
                    class="${className}"
                    d="${section.path}"
                    fill="${fill}"
                    stroke="${strokeColor}"
                    stroke-width="${strokeWidth}"
                    data-section-id="${section.id}"
                    style="cursor:${isSolved ? 'default' : 'pointer'}"
                />
                ${label}
            `;
        }).join('');

        return `
            <div class="cbn-canvas-wrapper">
                <svg
                    class="cbn-canvas"
                    viewBox="${puzzle.viewBox}"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    ${paths}
                </svg>
            </div>
        `;
    }

    mount(): void {
        super.mount();
        this.attachListeners();
    }

    protected afterRender(): void {
        this.attachListeners();
    }

    private attachListeners(): void {
        // Click on paths
        this.addEventListenerAll('.cbn-section--unsolved', 'click', (e) => {
            const target = e.currentTarget as SVGElement;
            const sectionId = parseInt(target.dataset['sectionId'] ?? '', 10);
            if (!isNaN(sectionId)) {
                this.onSectionSelect(sectionId);
            }
        });

        // Click on labels (text elements)
        this.addEventListenerAll('.cbn-section-label', 'click', (e) => {
            const target = e.currentTarget as SVGElement;
            const sectionId = parseInt(target.dataset['sectionId'] ?? '', 10);
            if (!isNaN(sectionId)) {
                this.onSectionSelect(sectionId);
            }
        });
    }

    /**
     * Update sections state and selected section (called by parent).
     */
    updateSections(sections: SectionState[], selectedSectionId: number | null): void {
        this.setState({ sections, selectedSectionId });
    }
}
