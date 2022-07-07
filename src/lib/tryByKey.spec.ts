import tryByKey from './tryByKey';

describe('tryByKey()', () => {
  it('retries on unique numbers', () => {
    const keys = [1, 8, 3, 1, 2, 4, 8];
    const got: number[] = [];
    const limitedRetries = tryByKey();
    for (let i = 0; i < keys.length; i++) {
      limitedRetries(keys[i], () => got.push(keys[i]));
    }
    expect(got).toEqual([1, 8, 3, 2, 4]);
  });
});
