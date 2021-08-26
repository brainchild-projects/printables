import copyrightYear from './copyrightYear';

interface TestData {
  description: string;
  now: Date;
  startYear: number;
  expected: string;
}

describe('copyrightYear', () => {
  const data: TestData[] = [
    {
      description: 'now is also start year',
      startYear: 2021,
      now: new Date(2021, 7, 26),
      expected: '2021',
    },
    {
      description: 'now is the year after',
      startYear: 2020,
      now: new Date(2021, 1, 1),
      expected: '2020-2021',
    },
  ];

  data.forEach(({
    description, startYear, now, expected,
  }) => {
    describe(`when ${description}`, () => {
      let result: string;
      beforeEach(() => {
        result = copyrightYear({ startYear, now });
      });

      it('returns expected format', () => {
        expect(result).toEqual(expected);
      });
    });
  });
});
