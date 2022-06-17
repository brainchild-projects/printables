import NumberGenerator from './NumberGenerator';
import { maxMustNotBeLessThanMin } from './numberGeneratorErrors';
import Range from './Range';

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

function asInteger(n: number, max: number, min: number): number {
  maxMustNotBeLessThanMin(max, min);
  return Math.floor(n * (max - min + 1) + min);
}

function circular(r: number): number {
  return Math.sqrt((r - 1) ** 2); // Circular easeout
}

function randNormal(min: number, max: number, rand: MathRandom): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand(); // Converting [0,1) to (0,1)
  while (v === 0) v = rand();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = randNormal(min, max, rand); // resample between 0 and 1 if out of range
  }
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
}

class RandomNumberGenerator implements NumberGenerator {
  rand: MathRandom;

  constructor(rand: MathRandom) {
    this.rand = rand;
  }

  integer(max: number, min = 0): number {
    return asInteger(this.rand(), max, min);
  }

  integerR(range: Range): number {
    return this.integer(range.to, range.from);
  }

  integerBiasLess(max: number, min = 0): number {
    return asInteger(circular(this.rand()), max, min);
  }

  integerBiasGreater(max: number, min = 0): number {
    return asInteger(1 - circular(this.rand()), max, min);
  }

  integerNormal(max: number, min = 0): number {
    return asInteger(randNormal(0, 1, this.rand), max, min);
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
