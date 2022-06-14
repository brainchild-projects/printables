import SimpleTime from './SimpleTime';

interface Example {
  input: number[],
  expected: string,
}

describe('SimpleTime', () => {
  describe('toString()', () => {
    const examples: Example[] = [
      {
        input: [6, 30],
        expected: '6:30',
      },
      {
        input: [1, 0],
        expected: '1:00',
      },
      {
        input: [12, 0],
        expected: '12:00',
      },
      {
        input: [4, 7],
        expected: '4:07',
      },
    ];

    for (const { input, expected } of examples) {
      it(`returns correct string for ${expected}`, () => {
        const [hour, minute] = input;
        const time = new SimpleTime(hour, minute);
        expect(time.toString()).toEqual(expected);
      });
    }
  });
});
