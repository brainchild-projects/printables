import { makeStyles } from '@material-ui/core';
import React from 'react';
import Blank from '../../components/Blank';
import ProblemListItem from '../../components/ProblemListItem';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import roundRobinRange from '../../lib/roundRobinRange';
import Addition from '../additionFillTheBlanks/Addition';
import AdditionSubtractionData from './AdditionSubtractionData';

type Range = { from: number, to: number };

export function generateItems(
  {
    rangeFrom, rangeTo, count, customAddendsA, customAddendsB, problemGeneration,
  }: AdditionSubtractionData,
): Addition[] {
  const generated: Addition[] = [];
  let rangeA: Range;
  let rangeB: Range;
  if (problemGeneration === 'custom addends') {
    rangeA = customAddendsA;
    rangeB = customAddendsB;
  } else {
    rangeA = { from: rangeFrom, to: rangeTo };
    rangeB = rangeA;
  }

  const possiblePairs = roundRobinRange(rangeA, rangeB);
  while (generated.length < count) {
    const pairBag = possiblePairs.slice(0);
    for (let i = 0; i < pairBag.length && generated.length < count; i++) {
      const pair = pairBag.splice(randomGenerator.integer(pairBag.length - 1), 1)[0];
      generated.push(Addition.create(...pair));
    }
  }
  return generated;
}

export type AdditionAddends = 'addendA' | 'addendB';
export type AdditionBlankPosition = AdditionAddends | 'sum';
export const blankTypes: AdditionBlankPosition[] = ['addendA', 'addendB', 'sum'];
export const blankTypesAddends: AdditionAddends[] = ['addendA', 'addendB'];
export interface AdditionSubtractionItemProps {
  addition: Addition;
  showAnswer?: boolean;
  blank?: AdditionBlankPosition;
  fontSize?: number;
  subtrahend: AdditionAddends;
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

const styles = makeStyles({
  wrap: {
    display: 'flex',
    width: '100%',

    '& > span': {
      flex: 1,
    },
  },
});

function AdditionSubtractionItem({
  addition, blank = 'sum', showAnswer = false, fontSize = 20,
  subtrahend,
}: AdditionSubtractionItemProps): JSX.Element {
  const BlankOrNumber = blankOrNumberGenerator(blank, showAnswer);
  const label = `Addition Problem${showAnswer ? ' Answer' : ''}`;
  const subtrahendElement = subtrahend === 'addendA'
    ? <BlankOrNumber value={addition.addendA} expected="addendA" />
    : <BlankOrNumber value={addition.addendB} expected="addendB" />;
  const differenceElement = subtrahend === 'addendA'
    ? <BlankOrNumber value={addition.addendB} expected="addendB" />
    : <BlankOrNumber value={addition.addendA} expected="addendA" />;

  const classes = styles();

  return (
    <ProblemListItem
      className="addition-sentence-item"
      label={label}
      fontSize={fontSize}
    >
      <div className={classes.wrap}>
        <span>
          {'Since '}
          &nbsp;&nbsp;&nbsp;
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
        </span>
        {' '}
        <span>
          {'Then '}
          &nbsp;&nbsp;&nbsp;
          <BlankOrNumber
            value={addition.sum()}
            expected="sum"
          />
          {' - '}
          {subtrahendElement}
          {' = '}
          {differenceElement}
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
