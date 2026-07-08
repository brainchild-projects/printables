import React from 'react';
import classNames from 'classnames';
import AdditionSentenceBasic, { AdditionBlankPosition } from '../../components/math/AdditionSentenceBasic.js';
import ProblemListItem from '../../components/ProblemListItem.js';
import Addition from '../../lib/math/Addition.js';
import pairsByRanges from '../../lib/pairsByRanges.js';
import AftbData from './AftbData.js';
import NumberPair from '../../lib/NumberPair.js';
import pairsBySumRange from '../../lib/pairsBySumRange.js';

type Range = { from: number, to: number };

export function generateAdditionSentences(
  {
    rangeFrom, rangeTo, sumRangeFrom, sumRangeTo,
    problems, customAddendsA, customAddendsB, problemGeneration,
  }: AftbData,
): Addition[] {
  let pairs: NumberPair[];

  if (problemGeneration === 'custom sum') {
    pairs = pairsBySumRange({ from: sumRangeFrom, to: sumRangeTo }, problems);
  } else {
    let rangeA: Range;
    let rangeB: Range;
    if (problemGeneration === 'custom addends') {
      rangeA = customAddendsA;
      rangeB = customAddendsB;
    } else {
      rangeA = { from: rangeFrom, to: rangeTo };
      rangeB = rangeA;
    }
    pairs = pairsByRanges(rangeA, rangeB, problems);
  }

  return pairs.map((pair) => Addition.create(...pair));
}

export const blankTypes: AdditionBlankPosition[] = ['addendA', 'addendB', 'sum'];
export const blankTypesAddends: AdditionBlankPosition[] = ['addendA', 'addendB'];
export interface AdditionSentenceProps {
  addition: Addition;
  showAnswer?: boolean;
  blank?: AdditionBlankPosition;
  fontSize?: number;
  className?: string;
}

function AdditionSentence({
  addition, blank = 'sum', showAnswer = false, fontSize = 20, className = '',
}: AdditionSentenceProps): JSX.Element {
  const label = `Addition Problem${showAnswer ? ' Answer' : ''}`;
  return (
    <ProblemListItem
      className={classNames('addition-sentence-item', className)}
      label={label}
      fontSize={fontSize}
    >
      <AdditionSentenceBasic
        addition={addition}
        blank={blank}
        showAnswer={showAnswer}
      />
    </ProblemListItem>
  );
}

AdditionSentence.defaultProps = {
  showAnswer: false,
  blank: 'sum',
  fontSize: 20,
  className: '',
};

export default AdditionSentence;
