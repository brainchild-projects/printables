import NumberGenerator from './NumberGenerator';
import { maxMustNotBeLessThanMin } from './numberGeneratorErrors';

export type MathRandom = () => number;

type ScalingMap<T> = Map<T, number>;

function scaledRoulette<T>(scales: ScalingMap<T>): T {
  const r = Math.random();
  const total = Array.from(scales.values())
    .reduce<number>((sum, n) => sum + n, 0);

  let current = 0;
  for (const [item, weight] of scales) {
    current += weight / total;
    if (r <= current) {
      return item;
    }
  }

  throw Error('There is a problem with the scales');
}

const scalesCache = new Map<number, ScalingMap<number>>([]);

function getScales(magnitude: number): ScalingMap<number> {
  const map = scalesCache.get(magnitude);
  if (map === undefined) {
    const scales = new Map<number, number>([]);
    for (let i = 0; i < magnitude; i++) {
      const exp = i + 1;
      scales.set(10 ** exp, exp ** i);
    }
    scalesCache.set(magnitude, scales);
    return scales;
  }
  return map;
}

class RandomNumberGenerator implements NumberGenerator {
  rand: MathRandom;

  constructor(rand: MathRandom) {
    this.rand = rand;
  }

  integer(max: number, min = 0): number {
    maxMustNotBeLessThanMin(max, min);
    return Math.floor(this.rand() * (max - min + 1) + min);
  }

  stepMagnitude(magnitude: number): number {
    const mag = Math.round(magnitude);
    if (mag < 1) {
      throw Error('Magnitude must be an integer 1 or greater');
    }
    return this.integer(scaledRoulette(getScales(mag)));
  }
}

export const randomGenerator = new RandomNumberGenerator(Math.random);

export default RandomNumberGenerator;
