import Addition from './Addition';

describe('Addition', () => {
  it('can get sum', () => {
    const addition = new Addition(1, 2);
    expect(addition.sum()).toEqual(3);
  });
});
