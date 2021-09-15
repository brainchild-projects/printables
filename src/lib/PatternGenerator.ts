import generatePattern, { GeneratePatternFunction } from './generatePattern';
import getRandomShape, { ShapeFunction } from './getRandomShape';

interface PatternGeneratorParams {
  shapeFn: ShapeFunction;
  patternFn: GeneratePatternFunction;
  length: number;
}

class PatternGenerator {
  shapeFn: ShapeFunction;

  patternFn: GeneratePatternFunction;

  length: number;

  constructor({
    length,
    shapeFn,
    patternFn,
  }: PatternGeneratorParams) {
    this.length = length;
    this.shapeFn = shapeFn;
    this.patternFn = patternFn;
  }

  static create(length: number): PatternGenerator {
    return new PatternGenerator({
      length,
      shapeFn: getRandomShape,
      patternFn: generatePattern,
    });
  }

  generate(pattern: string): string[] {
    const elements = this.getElementsFromPattern(pattern);
    return this.patternFn(elements, this.length);
  }

  getElementsFromPattern(pattern: string): string[] {
    const map: Map<string, string> = new Map();
    const elements: string[] = [];
    pattern.split('').forEach((char) => {
      const storedElement = map.get(char);
      if (storedElement !== undefined) {
        elements.push(storedElement);
      } else {
        let element = this.shapeFn();
        const maxRetries = 300; // arbitrary
        let retry = 0;
        while (retry < maxRetries && elements.includes(element)) {
          element = this.shapeFn();
          retry += 1;
        }
        map.set(char, element);
        elements.push(element);
      }
    });
    return elements;
  }
}

export default PatternGenerator;
