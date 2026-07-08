import React from 'react';
import Subtraction from '../../lib/math/Subtraction.js';
import blankOrNumberGenerator from './blankOrNumberGenerator.js';

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
  const BlankOrNumber = blankOrNumberGenerator(showAnswer, blank);
  const { minuend, subtrahend, difference } = subtraction;
  return (
    <>
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
    </>
  );
}

SubtractionSentenceBasic.defaultProps = {
  showAnswer: false,
  blank: undefined,
};

export default SubtractionSentenceBasic;
