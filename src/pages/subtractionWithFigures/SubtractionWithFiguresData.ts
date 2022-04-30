import { SubtractionProblemsProps } from '../../lib/math/generateSubtractionProblems';

export type ProblemGeneration = 'minuend' | 'subtrahend and difference';
export const problemGenerationOptions = new Map([
  ['minuend', 'Minuend'],
  ['subtrahend and difference', 'Subtrahend and Difference'],
]);

export default interface SubtractionWithFiguresData extends SubtractionProblemsProps {
  columns: number;
}
