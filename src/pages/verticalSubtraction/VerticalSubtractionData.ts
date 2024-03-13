import Range from '../../lib/Range';

export type ProblemGeneration = 'minuend' | 'subtrahend and difference';
export const problemGenerationOptions = new Map<ProblemGeneration, string>([
  ['minuend', 'Minuend'],
  ['subtrahend and difference', 'Subtrahend and Difference'],
]);

export default interface VerticalSubtractionData {
  count: number;
  problemGeneration: ProblemGeneration;
  minuend: Range;
  subtrahend: Range;
  difference: Range;
  columns: number;
}
