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
    ['2 vs 1', {
      args: [{ from: 0, to: 1 }, { from: 2, to: 2 }, 4],
      pairs: [
        [0, 2],
        [1, 2],
        [2, 0],
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

  it('generates sufficiently unique pairs', () => {
    const pairings = randomPairsByRanges(
      { from: 0, to: 100 },
      { from: 0, to: 100 },
      20,
    );
    expect(setPairs(pairings).size).toEqual(pairings.length);
  });
});
