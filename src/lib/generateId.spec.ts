import generateId from './generateId';

interface TestData {
  prefix: string,
  name: string,
  expected: string,
}

describe('generateId', () => {
  const testData: Array<TestData> = [
    {
      prefix: 'foo',
      name: 'bar',
      expected: 'foo-bar',
    },
    {
      prefix: 'zoo',
      name: 'barBaz',
      expected: 'zoo-bar-baz',
    },
    {
      prefix: 'extreme',
      name: 'ManicPreacher',
      expected: 'extreme-manic-preacher',
    },
  ];

  testData.forEach(({ prefix, name, expected }) => {
    it(`generates id for "${prefix}" and "${name}"`, () => {
      expect(generateId(prefix, name)).toEqual(expected);
    });
  });
});
