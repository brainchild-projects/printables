import roundRobinRange from './roundRobinRange';

type Range = { from: number, to: number };
type PairOfRange = [aRange: Range, bRange: Range];
type NumberPair = [a: number, b: number];
interface TestData {
  args: PairOfRange;
  pairs: NumberPair[]
}

describe('roundRobinRange()', () => {
  const testTable = new Map<string, TestData>([
    ['only zeroes', {
      args: [{ from: 0, to: 0 }, { from: 0, to: 0 }],
      pairs: [[0, 0]],
    }],
    ['1 vs 1', {
      args: [{ from: 1, to: 1 }, { from: 2, to: 2 }],
      pairs: [
        [1, 2],
        [2, 1],
      ],
    }],
    ['2 vs 1', {
      args: [{ from: 0, to: 1 }, { from: 2, to: 2 }],
      pairs: [
        [0, 2],
        [1, 2],
        [2, 0],
        [2, 1],
      ],
    }],
    ['2 vs 2', {
      args: [{ from: 0, to: 1 }, { from: 2, to: 3 }],
      pairs: [
        [0, 2],
        [0, 3],
        [1, 2],
        [1, 3],
        [2, 0],
        [2, 1],
        [3, 0],
        [3, 1],
      ],
    }],
    ['2 vs 2 with overlap', {
      args: [{ from: 0, to: 1 }, { from: 1, to: 2 }],
      pairs: [
        [0, 1],
        [0, 2],
        [1, 1],
        [1, 2],
        [1, 0],
        [2, 0],
        [2, 1],
      ],
    }],
    ['3 vs 3 with overlap', {
      args: [{ from: 0, to: 2 }, { from: 1, to: 3 }],
      pairs: [
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 1],
        [2, 2],
        [2, 3],
        [1, 0],
        [2, 0],
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    }],
  ]);

  testTable.forEach((testData, note) => {
    describe(`When ${note}`, () => {
      let pairings: NumberPair[];

      beforeEach(() => {
        pairings = roundRobinRange(...testData.args);
      });

      it('contains only possible range', () => {
        expect(new Set(pairings)).toEqual(new Set(testData.pairs));
      });
    });
  });
});
