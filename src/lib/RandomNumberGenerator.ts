import NumberGenerator from './NumberGenerator';

export type MathRandom = () => number;

class RandomNumberGenerator implements NumberGenerator {
  rand: MathRandom;

  constructor(rand: MathRandom) {
    this.rand = rand;
  }

  integer(max: number, min = 0): number {
    if (max < min) {
      throw Error('max should not be less than min');
    }
    return Math.floor(this.rand() * (max - min + 1) + min);
  }
}

export default RandomNumberGenerator;
