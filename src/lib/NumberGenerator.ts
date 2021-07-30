export type IntegerGeneratorFunction = (max: number, min?: number) => number;
export default interface NumberGenerator {
  integer: IntegerGeneratorFunction,
}
