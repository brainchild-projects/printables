import React from 'react';
import NumberGenerator from '../../lib/NumberGenerator';
import AftbData from './AftbData';

interface AdditionSentenceProps {
  addendA: number;
  addendB: number;
}

interface AdditionSentenceData extends AdditionSentenceProps {
  key: string;
}

export function generateAdditionSentences(
  { rangeFrom, rangeTo, problems }: AftbData,
  generator: NumberGenerator,
): AdditionSentenceData[] {
  const generated: AdditionSentenceData[] = [];
  for (let index = 0; index < problems; index++) {
    generated.push({
      key: `problem-${index + 1}`,
      addendA: generator.integer(rangeTo, rangeFrom),
      addendB: generator.integer(rangeTo, rangeFrom),
    });
  }
  return generated;
}

function AdditionSentence({
  addendA, addendB,
}: AdditionSentenceProps): JSX.Element {
  return (
    <li className="addition-sentence-item">
      {addendA}
      {' '}
      +
      {' '}
      {addendB}
      {' '}
      = ___
      {' '}
    </li>
  );
}

export default AdditionSentence;
