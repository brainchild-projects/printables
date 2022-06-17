import SkipCountingProblem from './SkipCountingProblem';

describe('SkipCountingProblem', () => {
  describe('sequence()', () => {
    it('can return correct sequence skip by ones', () => {
      const problem = new SkipCountingProblem({
        skipBy: 1,
        start: 0,
        length: 5,
        blankAt: 3,
      });
      expect(problem.sequence(true)).toEqual([0, 1, 2, 3, 4]);
    });

    it('can return correct sequence skip by ones with blanks', () => {
      const problem = new SkipCountingProblem({
        skipBy: 1,
        start: 0,
        length: 5,
        blankAt: 3,
      });
      expect(problem.sequence()).toEqual([0, 1, 2, '_', 4]);
    });

    it('can return correct sequence skip by 2s', () => {
      const problem = new SkipCountingProblem({
        skipBy: 2,
        start: 10,
        length: 4,
        blankAt: 3,
      });
      expect(problem.sequence(true)).toEqual([10, 12, 14, 16]);
    });

    it('can return correct sequence skip by 2s with blanks', () => {
      const problem = new SkipCountingProblem({
        skipBy: 2,
        start: 10,
        length: 4,
        blankAt: 3,
      });
      expect(problem.sequence()).toEqual([10, 12, 14, '_']);
    });
  });
});
