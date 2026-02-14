/**
 * Color by Number — Shared Color Palette
 *
 * 8 colors with Hebrew names, mapped to answer numbers 1–8.
 */

import type { ColorEntry } from '../types.ts';

export const COLOR_PALETTE: readonly ColorEntry[] = [
    { number: 1, color: '#ff6b6b', nameHe: 'אדום', nameEn: 'Red' },
    { number: 2, color: '#4ecdc4', nameHe: 'כחול', nameEn: 'Blue' },
    { number: 3, color: '#ffd93d', nameHe: 'צהוב', nameEn: 'Yellow' },
    { number: 4, color: '#6bcb77', nameHe: 'ירוק', nameEn: 'Green' },
    { number: 5, color: '#9b59b6', nameHe: 'סגול', nameEn: 'Purple' },
    { number: 6, color: '#ff8a5c', nameHe: 'כתום', nameEn: 'Orange' },
    { number: 7, color: '#ff6b81', nameHe: 'ורוד', nameEn: 'Pink' },
    { number: 8, color: '#c4915e', nameHe: 'חום', nameEn: 'Brown' },
] as const;

/**
 * Get a color entry by its number (1-based).
 */
export function getColorByNumber(num: number): ColorEntry | undefined {
    return COLOR_PALETTE.find((c) => c.number === num);
}
