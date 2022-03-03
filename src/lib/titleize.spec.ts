import titleize from './titlelize';

interface TestData {
  input: string;
  expected: string;
}
describe('titlelize', () => {
  const testData: Array<TestData> = [
    {
      input: 'Boo',
      expected: 'Boo',
    },
    {
      input: 'foo',
      expected: 'Foo',
    },
    {
      input: 'fooBar',
      expected: 'Foo Bar',
    },
    {
      input: 'zoo_car',
      expected: 'Zoo Car',
    },
    {
      input: 'mage-matic',
      expected: 'Mage Matic',
    },
    {
      input: 'MightMakesRight',
      expected: 'Might Makes Right',
    },
  ];

  testData.forEach(({ input, expected }) => {
    it(`transforms "${input}" to "${expected}"`, () => {
      expect(titleize(input)).toEqual(expected);
    });
  });
});
