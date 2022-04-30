import { SubtractionBlankPosition } from '../../components/math/SubtractionSentenceBasic';
import Range from '../../lib/Range';

export type BlankPosition = SubtractionBlankPosition | 'random';
export const blankPositions = new Map<BlankPosition, string>([
  ['difference', 'Difference'],
  ['minuend', 'Minuend'],
  ['subtrahend', 'Subtrahend'],
  ['random', 'Random'],
]);

export type ProblemGeneration = 'minuend' | 'subtrahend and difference';
export const problemGenerationOptions = new Map<ProblemGeneration, string>([
  ['minuend', 'Minuend'],
  ['subtrahend and difference', 'Subtrahend and Difference'],
]);

export default interface SubtractionFillInTheBlanksData {
  count: number;
  problemGeneration: ProblemGeneration;
  minuend: Range;
  subtrahend: Range;
  difference: Range;
  blankPosition: BlankPosition;
  columns: number;
  fontSize: number;
}
