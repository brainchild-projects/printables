import React from 'react';
import { makeStyles } from '@material-ui/core';
import ProblemListItem from '../../components/ProblemListItem';
import Addition from '../../lib/math/Addition';
import pairsByRanges from '../../lib/pairsByRanges';
import AdditionSubtractionData from './AdditionSubtractionData';
import AdditionSentenceBasic, { AdditionAddends, AdditionBlankPosition } from '../../components/math/AdditionSentenceBasic';
import Subtraction from '../../lib/math/Subtraction';
import SubtractionSentenceBasic, { SubtractionBlankPosition } from '../../components/math/SubtractionSentenceBasic';

type Range = { from: number, to: number };

export function generateItems(
  {
    rangeFrom, rangeTo, count, customAddendsA, customAddendsB, problemGeneration,
  }: AdditionSubtractionData,
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
  const pairs = pairsByRanges(rangeA, rangeB, count);
  return pairs.map((pair) => Addition.create(...pair));
}

export const blankTypes: AdditionBlankPosition[] = ['addendA', 'addendB', 'sum'];
export const blankTypesAddends: AdditionAddends[] = ['addendA', 'addendB'];

const styles = makeStyles({
  wrap: {
    display: 'flex',
    width: '100%',

    '& > span': {
      flex: 1,
    },
  },
});

function subtractionFromAddition(
  addition: Addition,
  subtrahendPosition: AdditionAddends,
): Subtraction {
  const [subtrahend, difference] = subtrahendPosition === 'addendA'
    ? [addition.addendA, addition.addendB]
    : [addition.addendB, addition.addendA];
  return Subtraction.create({ subtrahend, difference });
}

function getSubtractionBlank(
  subtrahendPosition: AdditionAddends,
  blank: AdditionBlankPosition,
): SubtractionBlankPosition {
  if (blank === 'sum') {
    return 'minuend';
  }
  if (blank === subtrahendPosition) {
    return 'subtrahend';
  }
  return 'difference';
}

export interface AdditionSubtractionItemProps {
  addition: Addition;
  showAnswer?: boolean;
  blank?: AdditionBlankPosition;
  fontSize?: number;
  subtrahend: AdditionAddends;
  blanksOnAddition: boolean;
}
function AdditionSubtractionItem({
  addition, blank = 'sum', showAnswer = false, fontSize = 20,
  subtrahend, blanksOnAddition,
}: AdditionSubtractionItemProps): JSX.Element {
  const label = `Addition Problem${showAnswer ? ' Answer' : ''}`;
  const subtraction = subtractionFromAddition(addition, subtrahend);
  const subtractionBlank = getSubtractionBlank(subtrahend, blank);

  const classes = styles();

  return (
    <ProblemListItem
      className="addition-sentence-item"
      label={label}
      fontSize={fontSize}
    >
      <div className={classes.wrap}>
        <span data-subtrahend={subtrahend}>
          Since &nbsp;&nbsp;&nbsp;
          <AdditionSentenceBasic
            addition={addition}
            blank={blanksOnAddition ? blank : undefined}
            showAnswer={showAnswer}
          />
        </span>
        {' '}
        <span data-sub-blank={subtractionBlank}>
          Then &nbsp;&nbsp;&nbsp;
          <SubtractionSentenceBasic
            subtraction={subtraction}
            blank={subtractionBlank}
            showAnswer={showAnswer}
          />
        </span>
      </div>
    </ProblemListItem>
  );
}

AdditionSubtractionItem.defaultProps = {
  showAnswer: false,
  blank: 'sum',
  fontSize: 20,
};

export default AdditionSubtractionItem;
