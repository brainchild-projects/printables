import getWeekDates, { Weeks } from './getWeekDates';

interface TestData {
  month: Date;
  expected: Weeks;
}

describe('getWeekDates()', () => {
  const tests = new Map<string, TestData>([
    [
      'month that starts on the first day of the week',
      {
        month: new Date(2022, 4),
        expected: [
          [
            { value: 1, current: true },
            { value: 2, current: true },
            { value: 3, current: true },
            { value: 4, current: true },
            { value: 5, current: true },
            { value: 6, current: true },
            { value: 7, current: true },
          ],
          [
            { value: 8, current: true },
            { value: 9, current: true },
            { value: 10, current: true },
            { value: 11, current: true },
            { value: 12, current: true },
            { value: 13, current: true },
            { value: 14, current: true },
          ],
          [
            { value: 15, current: true },
            { value: 16, current: true },
            { value: 17, current: true },
            { value: 18, current: true },
            { value: 19, current: true },
            { value: 20, current: true },
            { value: 21, current: true },
          ],
          [
            { value: 22, current: true },
            { value: 23, current: true },
            { value: 24, current: true },
            { value: 25, current: true },
            { value: 26, current: true },
            { value: 27, current: true },
            { value: 28, current: true },
          ],
          [
            { value: 29, current: true },
            { value: 30, current: true },
            { value: 31, current: true },
            { value: 1, current: false },
            { value: 2, current: false },
            { value: 3, current: false },
            { value: 4, current: false },
          ],
        ],
      },
    ],
    [
      'month that starts on a weekday',
      {
        month: new Date(2022, 5),
        expected: [
          [
            { value: 29, current: false },
            { value: 30, current: false },
            { value: 31, current: false },
            { value: 1, current: true },
            { value: 2, current: true },
            { value: 3, current: true },
            { value: 4, current: true },
          ],
          [
            { value: 5, current: true },
            { value: 6, current: true },
            { value: 7, current: true },
            { value: 8, current: true },
            { value: 9, current: true },
            { value: 10, current: true },
            { value: 11, current: true },
          ],
          [
            { value: 12, current: true },
            { value: 13, current: true },
            { value: 14, current: true },
            { value: 15, current: true },
            { value: 16, current: true },
            { value: 17, current: true },
            { value: 18, current: true },
          ],
          [
            { value: 19, current: true },
            { value: 20, current: true },
            { value: 21, current: true },
            { value: 22, current: true },
            { value: 23, current: true },
            { value: 24, current: true },
            { value: 25, current: true },
          ],
          [
            { value: 26, current: true },
            { value: 27, current: true },
            { value: 28, current: true },
            { value: 29, current: true },
            { value: 30, current: true },
            { value: 1, current: false },
            { value: 2, current: false },
          ],
        ],
      },
    ],
    [
      'month that has 6 weeks',
      {
        month: new Date(2022, 6),
        expected: [
          [
            { value: 26, current: false },
            { value: 27, current: false },
            { value: 28, current: false },
            { value: 29, current: false },
            { value: 30, current: false },
            { value: 1, current: true },
            { value: 2, current: true },
          ],
          [
            { value: 3, current: true },
            { value: 4, current: true },
            { value: 5, current: true },
            { value: 6, current: true },
            { value: 7, current: true },
            { value: 8, current: true },
            { value: 9, current: true },
          ],
          [
            { value: 10, current: true },
            { value: 11, current: true },
            { value: 12, current: true },
            { value: 13, current: true },
            { value: 14, current: true },
            { value: 15, current: true },
            { value: 16, current: true },
          ],
          [
            { value: 17, current: true },
            { value: 18, current: true },
            { value: 19, current: true },
            { value: 20, current: true },
            { value: 21, current: true },
            { value: 22, current: true },
            { value: 23, current: true },
          ],
          [
            { value: 24, current: true },
            { value: 25, current: true },
            { value: 26, current: true },
            { value: 27, current: true },
            { value: 28, current: true },
            { value: 29, current: true },
            { value: 30, current: true },
          ],
          [
            { value: 31, current: true },
            { value: 1, current: false },
            { value: 2, current: false },
            { value: 3, current: false },
            { value: 4, current: false },
            { value: 5, current: false },
            { value: 6, current: false },
          ],
        ],
      },
    ],
  ]);

  for (const [description, test] of tests) {
    it(`correctly generates weeks for ${description}`, () => {
      const result = getWeekDates(test.month);
      expect(result).toEqual(test.expected);
    });
  }
});
