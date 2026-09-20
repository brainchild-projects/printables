import React from 'react';
import Blank from '../Blank.js';

interface BlankOrNumberProps {
  expected: string;
  value: number;
  showAnswer: boolean,
  blank: string | undefined,
}

export default function BlankOrNumber({ value, expected, showAnswer, blank }: BlankOrNumberProps): JSX.Element {
  return blank === expected
    ? (<Blank answer={value} showAnswer={showAnswer} />)
    : (<>{value}</>);
}
