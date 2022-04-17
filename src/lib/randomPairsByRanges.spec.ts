import Range from './Range';
import randomPairsByRanges from './randomPairsByRanges';

type TestArgs = [aRange: Range, bRange: Range, count: number];
type NumberPair = [a: number, b: number];
interface TestData {
  args: TestArgs;
  pairs: NumberPair[];
}

function setPairs(pairs: NumberPair[]): Set<string> {
  return new Set(pairs.map(([a, b]) => `${a},${b}`));
}

describe('randomPairsByRanges()', () => {
  const testTable = new Map<string, TestData>([
    ['only zeroes', {
      args: [{ from: 0, to: 0 }, { from: 0, to: 0 }, 1],
      pairs: [[0, 0]],
    }],
    ['only zeroes with count', {
      args: [{ from: 0, to: 0 }, { from: 0, to: 0 }, 3],
      pairs: [[0, 0], [0, 0], [0, 0]],
    }],
    ['1 vs 1', {
      args: [{ from: 1, to: 1 }, { from: 2, to: 2 }, 2],
      pairs: [
        [1, 2],
        [2, 1],
      ],
    }],
  ]);

  testTable.forEach((testData, note) => {
    describe(`When ${note}`, () => {
      let pairings: NumberPair[];

      beforeEach(() => {
        pairings = randomPairsByRanges(...testData.args);
      });

      it('contains only possible range', () => {
        expect(setPairs(pairings)).toEqual(setPairs(testData.pairs));
      });
    });
  });

  describe('on sufficiently large ranges', () => {
    let pairings: NumberPair[];
    beforeEach(() => {
      pairings = randomPairsByRanges(
        { from: 0, to: 100 },
        { from: 0, to: 100 },
        20,
      );
    });

    it('generates sufficiently unique pairs', () => {
      expect(setPairs(pairings).size).toEqual(pairings.length);
    });

    it('generates numbers within ranges', () => {
      pairings.forEach(([a, b]) => {
        expect(a).toBeLessThanOrEqual(100);
        expect(a).toBeGreaterThanOrEqual(0);
        expect(b).toBeLessThanOrEqual(100);
        expect(b).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
