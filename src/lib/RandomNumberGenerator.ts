import NumberGenerator from './NumberGenerator';
import { maxMustNotBeLessThanMin } from './numberGeneratorErrors';

export type MathRandom = () => number;

class RandomNumberGenerator implements NumberGenerator {
  rand: MathRandom;

  constructor(rand: MathRandom) {
    this.rand = rand;
  }

  integer(max: number, min = 0): number {
    maxMustNotBeLessThanMin(max, min);
    return Math.floor(this.rand() * (max - min + 1) + min);
  }
}

export const randomGenerator = new RandomNumberGenerator(Math.random);

export default RandomNumberGenerator;
