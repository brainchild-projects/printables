import React from 'react';
import Subtraction from '../../lib/math/Subtraction.js';
import BlankOrNumber from './BlankOrNumber.js';

export type SubtractionBlankPosition = 'difference' | 'minuend' | 'subtrahend';
export const subtractionBlankPositions: SubtractionBlankPosition[] = [
  'difference', 'minuend', 'subtrahend',
];

interface SubtractionBasicProps {
  subtraction: Subtraction;
  showAnswer?: boolean;
  blank?: SubtractionBlankPosition | undefined;
}

function SubtractionSentenceBasic({
  subtraction, blank = undefined, showAnswer = false,
}: SubtractionBasicProps): JSX.Element {
  const { minuend, subtrahend, difference } = subtraction;
  return (
    <>
      <BlankOrNumber
        value={minuend}
        expected="minuend"
        blank={blank}
        showAnswer={showAnswer}
      />
      {' - '}
      <BlankOrNumber
        value={subtrahend}
        expected="subtrahend"
        blank={blank}
        showAnswer={showAnswer}
      />
      {' = '}
      <BlankOrNumber
        value={difference}
        expected="difference"
        blank={blank}
        showAnswer={showAnswer}
      />
    </>
  );
}

SubtractionSentenceBasic.defaultProps = {
  showAnswer: false,
  blank: undefined,
};

export default SubtractionSentenceBasic;
