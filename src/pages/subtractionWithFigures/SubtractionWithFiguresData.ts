import Range from '../../lib/Range';

export type ProblemGeneration = 'minuend' | 'subtrahend and difference';
export const problemGenerationOptions = new Map([
  ['minuend', 'Minuend'],
  ['subtrahend and difference', 'Subtrahend and Difference'],
]);

export default interface SubtractionWithFiguresData {
  count: number;
  problemGeneration: ProblemGeneration;
  minuend: Range;
  subtrahend: Range;
  difference: Range;
  columns: number;
}
