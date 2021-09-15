import generatePattern from './generatePattern';

interface TestData {
  description: string;
  elements: string[];
  count: number;
  expected: string[];
}

describe('generatePattern', () => {
  const testTable: TestData[] = [
    {
      description: '1 element',
      elements: ['b'],
      count: 5,
      expected: ['b', 'b', 'b', 'b', 'b'],
    },
    {
      description: '2 elements',
      elements: ['a', 'b'],
      count: 6,
      expected: ['a', 'b', 'a', 'b', 'a', 'b'],
    },
    {
      description: '3 elements',
      elements: ['a', 'b', 'c'],
      count: 9,
      expected: ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'],
    },
    {
      description: '3 elements with one skip',
      elements: ['a', 'a', 'b'],
      count: 7,
      expected: ['a', 'a', 'b', 'a', 'a', 'b', 'a'],
    },
    {
      description: '3 elements mid skip',
      elements: ['a', 'b', 'b'],
      count: 8,
      expected: ['a', 'b', 'b', 'a', 'b', 'b', 'a', 'b'],
    },
  ];

  testTable.forEach(({
    description, elements, count, expected,
  }) => {
    describe(`When ${description}`, () => {
      let result: string[];
      beforeEach(() => {
        result = generatePattern(elements, count);
      });

      it('returns result correctly', () => {
        expect(result).toEqual(expected);
      });
    });
  });
});
