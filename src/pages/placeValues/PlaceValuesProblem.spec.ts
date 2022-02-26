import PlaceValuesProblem from './PlaceValuesProblem';

interface TestItem {
  number: number;
  expectedOnes: number;
  expectedTens: number;
  expectedHundreds: number;
}

describe('PlaceValuesProblem', () => {
  const items: Array<TestItem> = [
    {
      number: 8,
      expectedOnes: 8,
      expectedTens: 0,
      expectedHundreds: 0,
    },
    {
      number: 0,
      expectedOnes: 0,
      expectedTens: 0,
      expectedHundreds: 0,
    },
    {
      number: 12,
      expectedOnes: 2,
      expectedTens: 1,
      expectedHundreds: 0,
    },
    {
      number: 98,
      expectedOnes: 8,
      expectedTens: 9,
      expectedHundreds: 0,
    },
    {
      number: 156,
      expectedOnes: 6,
      expectedTens: 5,
      expectedHundreds: 1,
    },
    {
      number: 555,
      expectedOnes: 5,
      expectedTens: 5,
      expectedHundreds: 5,
    },
  ];

  items.forEach((item) => {
    let problem: PlaceValuesProblem;
    beforeEach(() => {
      problem = new PlaceValuesProblem(item.number);
    });

    it('returns correct ones place', () => {
      expect(problem.ones()).toEqual(item.expectedOnes);
    });

    it('returns correct tens place', () => {
      expect(problem.tens()).toEqual(item.expectedTens);
    });

    it('returns correct hundreds place', () => {
      expect(problem.hundreds()).toEqual(item.expectedHundreds);
    });
  });
});
