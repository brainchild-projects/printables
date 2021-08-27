import replaceWithDelimeter, { ReplaceParam } from './replaceWithDelimeter';

interface TestData {
  description: string;
  subject: string;
  param: ReplaceParam;
  expected: string;
  expectedComment?: string;
}

describe('replaceWithDelimeter', () => {
  const testData: TestData[] = [
    {
      description: 'a simple string',
      subject: 'this is a <tagged> string',
      param: {
        prefix: '<',
        suffix: '>',
        replacement: 'wonderful',
      },
      expected: 'this is a <wonderful> string',
    },
    {
      description: 'an html element',
      subject: 'I have <strong>feelings</strong> about this',
      param: {
        prefix: '<strong>',
        suffix: '</strong>',
        replacement: 'doubts',
      },
      expected: 'I have <strong>doubts</strong> about this',
    },
    {
      description: 'a subject with multiple instances of tag',
      subject: '<free>dom from <fries>',
      param: {
        prefix: '<',
        suffix: '>',
        replacement: 'bore',
      },
      expected: '<bore>dom from <fries>',
    },
    {
      description: 'a subject without matching delimeters',
      subject: 'my wooden heart',
      param: {
        prefix: '<',
        suffix: '>',
        replacement: 'iron',
      },
      expected: 'my wooden heart',
      expectedComment: 'will do nothing',
    },
  ];

  testData.forEach(({
    description, subject, param, expected, expectedComment,
  }) => {
    describe(`when replacing ${description}`, () => {
      let result: string;
      beforeEach(() => {
        result = replaceWithDelimeter(subject, param);
      });

      // eslint-disable-next-line jest/valid-title
      it(expectedComment === undefined ? 'returns correct result' : expectedComment, () => {
        expect(result).toEqual(expected);
      });
    });
  });
});
