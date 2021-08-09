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

export type BlankPosition = 'addendA' | 'addendB' | 'sum';
export const blankTypes: BlankPosition[] = ['addendA', 'addendB', 'sum'];
export const blankTypesAddends: BlankPosition[] = ['addendA', 'addendB'];
export interface AdditionSentenceProps {
  addition: Addition;
  showAnswer?: boolean;
  blank?: BlankPosition;
}

const blankElement = (<span className="blank">___</span>);
interface BlankOrNumberProps {
  expected: BlankPosition;
  value: number;
}

function blankOrNumberGenerator(blank: BlankPosition, showAnswer: boolean) {
  return ({ value, expected }: BlankOrNumberProps): JSX.Element => (
    showAnswer || blank !== expected
      ? <span>{value}</span>
      : blankElement
  );
}

function AdditionSentence({
  addition, blank = 'sum', showAnswer = false,
}: AdditionSentenceProps): JSX.Element {
  const BlankOrNumber = blankOrNumberGenerator(blank, showAnswer);
  return (
    <li className="addition-sentence-item">
      <BlankOrNumber
        value={addition.addendA}
        expected="addendA"
      />
      {' + '}
      <BlankOrNumber
        value={addition.addendB}
        expected="addendB"
      />
      {' = '}
      <BlankOrNumber
        value={addition.sum()}
        expected="sum"
      />
    </li>
  );
}

AdditionSentence.defaultProps = {
  showAnswer: false,
  blank: 'sum',
};

export default AdditionSentence;
