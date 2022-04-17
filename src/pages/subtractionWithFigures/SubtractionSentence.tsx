import React from 'react';
import Blank from '../../components/Blank';
import ProblemListItem from '../../components/ProblemListItem';
import Subtraction from '../../lib/math/Subtraction';

type SubtractionBlankPosition = 'difference' | 'minuend' | 'subtrahend';

interface BlankOrNumberProps {
  expected: SubtractionBlankPosition;
  value: number;
}

function blankOrNumberGenerator(blank: SubtractionBlankPosition, showAnswer: boolean) {
  return function bOrNg({ value, expected }: BlankOrNumberProps): JSX.Element {
    return blank === expected
      ? (<Blank answer={value} showAnswer={showAnswer} />)
      // eslint-disable-next-line react/jsx-no-useless-fragment
      : (<>{value}</>);
  };
}

interface SubtractionSentenceProps {
  subtraction: Subtraction;
  blank?: SubtractionBlankPosition;
  showAnswer: boolean;
  prefix?: JSX.Element | string;
}

function SubtractionSentence({
  subtraction,
  blank = 'difference',
  showAnswer = false,
  prefix,
}: SubtractionSentenceProps): JSX.Element {
  const BlankOrNumber = blankOrNumberGenerator(blank, showAnswer);
  const { minuend, subtrahend, difference } = subtraction;
  return (
    <ProblemListItem
      className="subtraction-with-figures-problem-item"
      label={`Subtraction With Figures ${showAnswer ? 'Answer' : 'Problem'}`}
    >
      {prefix}
      <BlankOrNumber
        value={minuend}
        expected="minuend"
      />
      {' - '}
      <BlankOrNumber
        value={subtrahend}
        expected="subtrahend"
      />
      {' = '}
      <BlankOrNumber
        value={difference}
        expected="difference"
      />
    </ProblemListItem>
  );
}

SubtractionSentence.defaultProps = {
  blank: 'difference',
  prefix: '',
};

export default SubtractionSentence;
