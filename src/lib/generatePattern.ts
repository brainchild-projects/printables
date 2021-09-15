export type GeneratePatternFunction = (elements: string[], count: number) => string[];

function generatePattern(elements: string[], count: number): string[] {
  const result: string[] = [];
  const numberOfElements = elements.length;
  for (let i = 0; i < count; i++) {
    result.push(elements[i % numberOfElements]);
  }
  return result;
}

export default generatePattern;
