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
    {
      input: 'and-it-begins',
      expected: 'And It Begins',
    },
    {
      input: 'jack_and_jill',
      expected: 'Jack and Jill',
    },
    {
      input: 'the goat and the goatee',
      expected: 'The Goat and the Goatee',
    },
    {
      input: 'This is preposterous',
      expected: 'This Is Preposterous',
    },
    {
      input: 'What is the best thing to do in an emergency?',
      expected: 'What Is the Best Thing to Do in an Emergency?',
    },
  ];

  testData.forEach(({ input, expected }) => {
    it(`transforms "${input}" to "${expected}"`, () => {
      expect(titleize(input)).toEqual(expected);
    });
  });
});
