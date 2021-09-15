import React from 'react';
import { randomGenerator } from '../../lib/RandomNumberGenerator';
import roundRobinRange from '../../lib/roundRobinRange';
import Addition from './Addition';
import AftbData from './AftbData';

type Range = { from: number, to: number };

export function generateAdditionSentences(
  {
    rangeFrom, rangeTo, problems, customAddendsA, customAddendsB, problemGeneration,
  }: AftbData,
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
  while (generated.length < problems) {
    const pairBag = possiblePairs.slice(0);
    for (let i = 0; i < pairBag.length && generated.length < problems; i++) {
      const pair = pairBag.splice(randomGenerator.integer(pairBag.length - 1), 1)[0];
      generated.push(Addition.create(...pair));
    }
  }
  return generated;
}

export type AdditionBlankPosition = 'addendA' | 'addendB' | 'sum';
export const blankTypes: AdditionBlankPosition[] = ['addendA', 'addendB', 'sum'];
export const blankTypesAddends: AdditionBlankPosition[] = ['addendA', 'addendB'];
export interface AdditionSentenceProps {
  addition: Addition;
  showAnswer?: boolean;
  blank?: AdditionBlankPosition;
}
interface BlankOrNumberProps {
  expected: AdditionBlankPosition;
  value: number;
}

const underlines = (length: number): string => {
  let str = '_';
  for (let i = 0; i < length; i++) {
    str += '_';
  }
  return str;
};

function blankOrNumberGenerator(blank: AdditionBlankPosition, showAnswer: boolean) {
  return ({ value, expected }: BlankOrNumberProps): JSX.Element => (
    blank === expected
      ? (
        <span className="problem-blank">
          {
            showAnswer
              ? value
              : (
                <span className="underline">
                  { underlines(value.toString().length) }
                </span>
              )
          }
        </span>
      )
      : (<>{ value }</>)
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
