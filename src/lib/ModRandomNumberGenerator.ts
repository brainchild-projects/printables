import NumberGenerator from './NumberGenerator';
import { maxMustNotBeLessThanMin } from './numberGeneratorErrors';
import { randomGenerator } from './RandomNumberGenerator';

export type MathRandom = () => number;

function rangeKey(max: number, min: number) {
  return `${max}:${min}`;
}

class ModRandomNumberGenerator implements NumberGenerator {
  rangeCache: Map<string, number[]>;

  constructor() {
    this.rangeCache = new Map();
  }

  getRangeArray(max: number, min: number): number[] {
    maxMustNotBeLessThanMin(max, min);
    const key = rangeKey(max, min);
    const stored = this.rangeCache.get(key);
    if (stored !== undefined && stored.length > 0) {
      return stored;
    }
    const range: number[] = [];
    for (let i = min; i <= max; i++) {
      range.push(i);
    }
    this.rangeCache.set(key, range);
    return range;
  }

  pickRandomFromRange(max: number, min: number): number {
    const range = this.getRangeArray(max, min);
    // pick a random position
    return range
      .splice(randomGenerator.integer(range.length - 1), 1)[0];
  }

  integer(max: number, min = 0): number {
    return this.pickRandomFromRange(max, min);
  }
}

export const modRandomGenerator = new ModRandomNumberGenerator();

export default ModRandomNumberGenerator;
