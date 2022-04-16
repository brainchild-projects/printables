import factorial from './factorial';
import { randomGenerator } from './RandomNumberGenerator';
import Range from './Range';

type Pair = [a: number, b: number];

export default function randomPairsByRanges(aRange: Range, bRange: Range, count: number): Pair[] {
  const pairs: Pair[] = [];
  const found = new Set<string>();
  const maxTries = Math.max(
    factorial(aRange.to - aRange.from + 1) * factorial(bRange.to - bRange.from + 1),
    6,
  );
  let tries = 0;
  let k = 0;
  while (pairs.length < count) {
    k += 1;
    let range1: Range;
    let range2: Range;
    if (k % 2 === 0) {
      range1 = aRange;
      range2 = bRange;
    } else {
      range1 = bRange;
      range2 = aRange;
    }
    const a = randomGenerator.integer(range1.to, range1.from);
    const b = randomGenerator.integer(range2.to, range2.from);
    const key = `${a}:${b}`;
    if (!found.has(key)) {
      pairs.push([a, b]);
      found.add(key);
    } else {
      tries += 1;
    }
    if (tries >= maxTries) {
      found.clear();
      tries = 0;
    }
  }
  return pairs;
}
