/**
 * Equation Generator — Creates random math equations for a given answer
 *
 * Given a target answer and difficulty level, generates a random
 * equation string and its correct answer.
 *
 * Examples:
 *   generateEquation(5, 'easy')   → { equation: "2 + 3", answer: 5 }
 *   generateEquation(3, 'medium') → { equation: "7 - 4", answer: 3 }
 *   generateEquation(6, 'hard')   → { equation: "2 × 3", answer: 6 }
 */

import type { Difficulty } from '../types.ts';
import { DIFFICULTY_CONFIGS } from '../types.ts';

export interface GeneratedEquation {
    equation: string;
    answer: number;
}

/**
 * Generate a random equation that evaluates to the given target answer.
 */
export function generateEquation(targetAnswer: number, difficulty: Difficulty): GeneratedEquation {
    const config = DIFFICULTY_CONFIGS[difficulty];
    const operations = config.operations;

    // Pick a random operation
    const op = operations[Math.floor(Math.random() * operations.length)]!;

    let equation: string;

    switch (op) {
        case '+':
            equation = generateAddition(targetAnswer, config.maxNumber);
            break;
        case '-':
            equation = generateSubtraction(targetAnswer, config.maxNumber);
            break;
        case '×':
            equation = generateMultiplication(targetAnswer, config.maxNumber);
            break;
        default:
            equation = generateAddition(targetAnswer, config.maxNumber);
    }

    return { equation, answer: targetAnswer };
}

/**
 * Generate an addition equation: a + b = target
 */
function generateAddition(target: number, _maxNumber: number): string {
    // Pick a random first operand between 0 and target
    const a = Math.floor(Math.random() * target);
    const b = target - a;
    return `${a} + ${b}`;
}

/**
 * Generate a subtraction equation: a - b = target
 * where a > target so result is positive
 */
function generateSubtraction(target: number, maxNumber: number): string {
    // b is what we subtract, pick random b between 1 and (maxNumber - target)
    const maxB = Math.min(maxNumber - target, maxNumber);
    const b = maxB > 0 ? 1 + Math.floor(Math.random() * maxB) : 1;
    const a = target + b;
    return `${a} - ${b}`;
}

/**
 * Generate a multiplication equation: a × b = target
 * Falls back to addition if target has no useful factors
 */
function generateMultiplication(target: number, maxNumber: number): string {
    // Find all factor pairs for the target
    const factors: Array<[number, number]> = [];
    for (let i = 2; i <= Math.min(target, maxNumber); i++) {
        if (target % i === 0) {
            const other = target / i;
            if (other >= 2 && other <= maxNumber) {
                factors.push([i, other]);
            }
        }
    }

    // If no good factor pairs, fall back to addition
    if (factors.length === 0) {
        return generateAddition(target, maxNumber);
    }

    const [a, b] = factors[Math.floor(Math.random() * factors.length)]!;
    return `${a} × ${b}`;
}

/**
 * Generate multiple unique equations for a set of target answers.
 */
export function generateEquations(
    targets: number[],
    difficulty: Difficulty,
): GeneratedEquation[] {
    return targets.map((target) => generateEquation(target, difficulty));
}
