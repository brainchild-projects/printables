import commaNumberFormat from './commaNumberFormat';

describe('commaNumberFormat', () => {
  const testData = new Map<number, string>([
    [1, '1'],
    [50, '50'],
    [698, '698'],
    [3486, '3,486'],
    [98475, '98,475'],
    [2030232, '2,030,232'],
  ]);

  for (const [num, expected] of testData) {
    it(`formats ${num} to ${expected}`, () => {
      expect(commaNumberFormat(num)).toEqual(expected);
    });
  }
});
