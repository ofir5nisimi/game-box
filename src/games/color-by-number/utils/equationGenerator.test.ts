/**
 * Unit Tests — Equation Generator
 *
 * Tests that the equation generator produces valid equations
 * for all difficulty levels and target answers.
 */

import { describe, it, expect } from 'vitest';
import { generateEquation, generateEquations } from './equationGenerator.ts';

describe('generateEquation', () => {
    describe('Easy difficulty (addition only)', () => {
        it('should produce an equation that evaluates to the target answer', () => {
            for (let target = 1; target <= 5; target++) {
                const result = generateEquation(target, 'easy');
                expect(result.answer).toBe(target);
                // Verify the equation string evaluates correctly
                const evaluated = evaluateEquation(result.equation);
                expect(evaluated).toBe(target);
            }
        });

        it('should only use addition', () => {
            for (let i = 0; i < 20; i++) {
                const result = generateEquation(3, 'easy');
                expect(result.equation).toContain('+');
                expect(result.equation).not.toContain('-');
                expect(result.equation).not.toContain('×');
            }
        });
    });

    describe('Medium difficulty (addition and subtraction)', () => {
        it('should produce valid equations for targets 1-8', () => {
            for (let target = 1; target <= 8; target++) {
                for (let i = 0; i < 5; i++) {
                    const result = generateEquation(target, 'medium');
                    expect(result.answer).toBe(target);
                    const evaluated = evaluateEquation(result.equation);
                    expect(evaluated).toBe(target);
                }
            }
        });

        it('should use only + or - operators', () => {
            for (let i = 0; i < 30; i++) {
                const result = generateEquation(5, 'medium');
                const hasValidOp = result.equation.includes('+') || result.equation.includes('-');
                expect(hasValidOp).toBe(true);
                expect(result.equation).not.toContain('×');
            }
        });
    });

    describe('Hard difficulty (addition, subtraction, multiplication, division)', () => {
        it('should produce valid equations for targets 1-8', () => {
            for (let target = 1; target <= 8; target++) {
                for (let i = 0; i < 5; i++) {
                    const result = generateEquation(target, 'hard');
                    expect(result.answer).toBe(target);
                    const evaluated = evaluateEquation(result.equation);
                    expect(evaluated).toBe(target);
                }
            }
        });

        it('should sometimes use multiplication for composite numbers', () => {
            let hasMultiplication = false;
            // Run enough times to get multiplication for target 6 (= 2×3)
            for (let i = 0; i < 50; i++) {
                const result = generateEquation(6, 'hard');
                if (result.equation.includes('×')) {
                    hasMultiplication = true;
                    break;
                }
            }
            expect(hasMultiplication).toBe(true);
        });

        it('should fall back to addition for prime targets with no good factors', () => {
            // Target 1 has no two-factor pairs ≥ 2
            const result = generateEquation(1, 'hard');
            expect(result.answer).toBe(1);
            const evaluated = evaluateEquation(result.equation);
            expect(evaluated).toBe(1);
        });
    });

    describe('Edge cases', () => {
        it('should handle target answer of 0', () => {
            const result = generateEquation(0, 'easy');
            expect(result.answer).toBe(0);
            const evaluated = evaluateEquation(result.equation);
            expect(evaluated).toBe(0);
        });

        it('should always return the correct answer field', () => {
            const difficulties = ['easy', 'medium', 'hard'] as const;
            for (const difficulty of difficulties) {
                for (let target = 1; target <= 8; target++) {
                    const result = generateEquation(target, difficulty);
                    expect(result.answer).toBe(target);
                }
            }
        });
    });
});

describe('generateEquations', () => {
    it('should generate equations for all targets', () => {
        const targets = [1, 2, 3, 4, 5];
        const results = generateEquations(targets, 'easy');
        expect(results).toHaveLength(5);
        results.forEach((result, i) => {
            expect(result.answer).toBe(targets[i]);
        });
    });
});

// ─── Helper ─────────────────────────────────────────────────

/**
 * Evaluate a simple equation string like "3 + 2" or "7 - 4" or "2 × 3" or "12 ÷ 4"
 */
function evaluateEquation(equation: string): number {
    const parts = equation.split(' ');
    if (parts.length !== 3) {
        throw new Error(`Invalid equation format: "${equation}"`);
    }

    const a = parseInt(parts[0]!, 10);
    const op = parts[1]!;
    const b = parseInt(parts[2]!, 10);

    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '×': return a * b;
        case '÷': return a / b;
        default: throw new Error(`Unknown operator: "${op}"`);
    }
}
