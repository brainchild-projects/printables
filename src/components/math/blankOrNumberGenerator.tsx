import React from 'react';
import Blank from '../Blank';

interface BlankOrNumberProps {
  expected: string;
  value: number;
}

export default function blankOrNumberGenerator(
  showAnswer: boolean,
  blank: string | undefined,
) {
  return function bOrNg({ value, expected }: BlankOrNumberProps): JSX.Element {
    return blank === expected
      ? (<Blank answer={value} showAnswer={showAnswer} />)
      // eslint-disable-next-line react/jsx-no-useless-fragment
      : (<>{value}</>);
  };
}
