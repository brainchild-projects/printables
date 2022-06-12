/* eslint-disable @typescript-eslint/no-namespace */
import { randomGenerator } from '../RandomNumberGenerator';
import noRegroupPair from './noRegroupPair';

function digits(n: number): number[] {
  return n.toString().split('').map((x) => parseFloat(x));
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toAddToLessThanTenWith(otherNumber: number): CustomMatcherResult;
    }
  }
}

expect.extend({
  toAddToLessThanTenWith(aNumber: number, otherNumber: number) {
    if (aNumber + otherNumber > 9) {
      return {
        message: () => `${aNumber} + ${otherNumber} should be less than 10`,
        pass: false,
      };
    }
    return {
      message: () => `${aNumber} + ${otherNumber} should be greater than 9`,
      pass: true,
    };
  },
});

describe('noRegroupPair()', () => {
  it('can return pair for zero', () => {
    const result = noRegroupPair(0);
    expect(result).toBeLessThan(10);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('can return pair for 9', () => {
    const result = noRegroupPair(9);
    expect(result).toEqual(0);
  });

  it('can return pairs for single-digit numbers', () => {
    for (let i = 0; i < 10; i++) {
      const result = noRegroupPair(i);
      expect(result + i).toBeLessThan(10);
    }
  });

  it('can return pairs for 95', () => {
    for (let i = 0; i < 10; i++) {
      const result = noRegroupPair(95);
      expect(result + i).toBeLessThan(100);
    }
  });

  it('can return pair for 99', () => {
    const result = noRegroupPair(99);
    expect(result).toEqual(0);
  });

  describe('can return pairs from any multi-digit range', () => {
    for (let i = 0; i < 50; i++) {
      const a = randomGenerator.integer(9999, 10);
      const b = noRegroupPair(a);
      it(`for ${a} and ${b}`, () => {
        const aDigits = digits(a);
        const bDigits = digits(b);
        for (let j = 0; j < bDigits.length; j++) {
          expect(aDigits[aDigits.length - 1 - j])
            .toAddToLessThanTenWith(bDigits[bDigits.length - 1 - j] || 0);
        }
      });
    }
  });
});
