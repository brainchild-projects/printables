import Subtraction from './Subtraction';

describe('.create()', () => {
  it('can create from just minuend and subtrahend', () => {
    const sub = Subtraction.create({ minuend: 10, subtrahend: 6 });
    expect(sub.difference).toEqual(4);
  });

  it('can create from just subtrahend and difference', () => {
    const sub = Subtraction.create({ subtrahend: 3, difference: 9 });
    expect(sub.minuend).toEqual(12);
  });

  it('can create from just minuend and difference', () => {
    const sub = Subtraction.create({ minuend: 14, difference: 8 });
    expect(sub.subtrahend).toEqual(6);
  });
});
