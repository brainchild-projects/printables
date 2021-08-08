import React from 'react';
import { IntegerGenerator } from '../../lib/NumberGenerator';
import Addition from './Addition';
import AftbData from './AftbData';

export function generateAdditionSentences(
  { rangeFrom, rangeTo, problems }: AftbData,
  generator: IntegerGenerator,
): Addition[] {
  const generated: Addition[] = [];
  for (let index = 0; index < problems; index++) {
    generated.push(new Addition(
      generator.integer(rangeTo, rangeFrom),
      generator.integer(rangeTo, rangeFrom),
    ));
  }
  return generated;
}
interface AdditionSentenceProps {
  addition: Addition;
  showAnswer?: boolean;
}

function AdditionSentence({
  addition, showAnswer = false,
}: AdditionSentenceProps): JSX.Element {
  return (
    <li className="addition-sentence-item">
      {addition.addendA}
      {' '}
      +
      {' '}
      {addition.addendB}
      {' '}
      =
      {' '}
      {
        showAnswer
          ? addition.sum()
          : <span className="blank">___</span>
      }
    </li>
  );
}

AdditionSentence.defaultProps = {
  showAnswer: false,
};

export default AdditionSentence;
