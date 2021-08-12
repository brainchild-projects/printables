import React from 'react';
import { IntegerGenerator } from '../../lib/NumberGenerator';
import Addition from './Addition';
import AftbData from './AftbData';

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function generateAdditionSentences(
  {
    rangeFrom, rangeTo, problems, customAddendsA, customAddendsB, problemGeneration,
  }: AftbData,
  generator: IntegerGenerator,
): Addition[] {
  const generated: Addition[] = [];
  if (problemGeneration === 'custom addends') {
    for (let index = 0; index < problems; index++) {
      const addendA = generator.integer(customAddendsA.to, customAddendsA.from);
      const addendB = generator.integer(customAddendsB.to, customAddendsB.from);
      generated.push(Addition.create.apply(
        null,
        shuffle([addendA, addendB]) as [addendA: number, addendB: number],
      ));
    }
  } else {
    for (let index = 0; index < problems; index++) {
      generated.push(new Addition(
        generator.integer(rangeTo, rangeFrom),
        generator.integer(rangeTo, rangeFrom),
      ));
    }
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
