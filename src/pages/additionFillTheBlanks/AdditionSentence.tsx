import React from 'react';
import Blank from '../../components/Blank';
import ProblemListItem from '../../components/ProblemListItem';
import pairsByRanges from '../../lib/pairsByRanges';
import Addition from './Addition';
import AftbData from './AftbData';

type Range = { from: number, to: number };

export function generateAdditionSentences(
  {
    rangeFrom, rangeTo, problems, customAddendsA, customAddendsB, problemGeneration,
  }: AftbData,
): Addition[] {
  let rangeA: Range;
  let rangeB: Range;
  if (problemGeneration === 'custom addends') {
    rangeA = customAddendsA;
    rangeB = customAddendsB;
  } else {
    rangeA = { from: rangeFrom, to: rangeTo };
    rangeB = rangeA;
  }

  const pairs = pairsByRanges(rangeA, rangeB, problems);
  return pairs.map((pair) => Addition.create(...pair));
}

export type AdditionBlankPosition = 'addendA' | 'addendB' | 'sum';
export const blankTypes: AdditionBlankPosition[] = ['addendA', 'addendB', 'sum'];
export const blankTypesAddends: AdditionBlankPosition[] = ['addendA', 'addendB'];
export interface AdditionSentenceProps {
  addition: Addition;
  showAnswer?: boolean;
  blank?: AdditionBlankPosition;
  fontSize?: number;
}
interface BlankOrNumberProps {
  expected: AdditionBlankPosition;
  value: number;
}

function blankOrNumberGenerator(blank: AdditionBlankPosition, showAnswer: boolean) {
  return function bOrNg({ value, expected }: BlankOrNumberProps): JSX.Element {
    return blank === expected
      ? (<Blank answer={value} showAnswer={showAnswer} />)
      // eslint-disable-next-line react/jsx-no-useless-fragment
      : (<>{value}</>);
  };
}

function AdditionSentence({
  addition, blank = 'sum', showAnswer = false, fontSize = 20,
}: AdditionSentenceProps): JSX.Element {
  const BlankOrNumber = blankOrNumberGenerator(blank, showAnswer);
  const label = `Addition Problem${showAnswer ? ' Answer' : ''}`;
  return (
    <ProblemListItem
      className="addition-sentence-item"
      label={label}
      fontSize={fontSize}
    >
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
    </ProblemListItem>
  );
}

AdditionSentence.defaultProps = {
  showAnswer: false,
  blank: 'sum',
  fontSize: 20,
};

export default AdditionSentence;
