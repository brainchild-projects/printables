import generatePattern from './generatePattern';
import PatternGenerator from './PatternGenerator';

interface TestData {
  description: string;
  pattern: string;
  itemCount: number;
  expected: string[];
}

describe('PatternGenerator', () => {
  const testTable: TestData[] = [
    {
      description: '1 element',
      pattern: 'bbb',
      itemCount: 5,
      expected: ['a', 'a', 'a', 'a', 'a'],
    },
    {
      description: '2 elements',
      pattern: 'xy',
      itemCount: 6,
      expected: ['a', 'b', 'a', 'b', 'a', 'b'],
    },
    {
      description: '3 elements',
      pattern: '123',
      itemCount: 9,
      expected: ['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c'],
    },
    {
      description: '3 elements with one skip',
      pattern: 'kkz',
      itemCount: 7,
      expected: ['a', 'a', 'b', 'a', 'a', 'b', 'a'],
    },
    {
      description: '3 elements mid skip',
      pattern: 'rtt',
      itemCount: 8,
      expected: ['a', 'b', 'b', 'a', 'b', 'b', 'a', 'b'],
    },
    {
      description: '4 elements mid skip',
      pattern: 'xyyz',
      itemCount: 8,
      expected: ['a', 'b', 'b', 'c', 'a', 'b', 'b', 'c'],
    },
  ];

  testTable.forEach(({
    description, pattern, itemCount, expected,
  }) => {
    describe(`When ${description}`, () => {
      let result: string[];
      beforeEach(() => {
        let i = 0;
        // The repetition is to simulate duplicates in shapeFn
        const elements = ['a', 'b', 'b', 'c', 'd'];
        const generator = new PatternGenerator({
          length: itemCount,
          shapeFn: () => {
            const got = elements[i % elements.length];
            i += 1;
            return got;
          },
          patternFn: generatePattern,
        });
        result = generator.generate(pattern);
      });

      it('returns result correctly', () => {
        expect(result).toEqual(expected);
      });
    });
  });
});
