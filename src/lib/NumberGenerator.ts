export type IntegerGeneratorFunction = (max: number, min?: number) => number;

export interface IntegerGenerator {
  integer: IntegerGeneratorFunction;
}
export default interface NumberGenerator {
  integer: IntegerGeneratorFunction,
}
