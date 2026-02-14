/**
 * ColorPalette — Number → Color Legend
 *
 * Displays the shared color palette as a horizontal row of swatches,
 * each labeled with its number. Helps the player know which color
 * corresponds to which answer.
 */

import { Component } from '../../../core/Component.ts';
import type { ColorEntry } from '../types.ts';
import { COLOR_PALETTE } from '../data/palette.ts';

interface ColorPaletteState {
    colors: readonly ColorEntry[];
    maxNumber: number; // Only show colors up to this number
}

export class ColorPalette extends Component<ColorPaletteState> {
    constructor(container: HTMLElement, maxNumber: number = 8) {
        super(container, { colors: COLOR_PALETTE, maxNumber });
    }

    render(): string {
        const swatches = this.state.colors
            .filter((c) => c.number <= this.state.maxNumber)
            .map((c) => `
                <div class="cbn-swatch" title="${c.nameHe}">
                    <div class="cbn-swatch-color" style="background:${c.color};">
                        ${c.number}
                    </div>
                    <span class="cbn-swatch-label">${c.nameHe}</span>
                </div>
            `).join('');

        return `
            <div class="cbn-color-palette">
                <div class="cbn-palette-row">${swatches}</div>
            </div>
        `;
    }

    mount(): void {
        super.mount();
    }
}
