import React from 'react';
import Addition from '../../lib/math/Addition';
import blankOrNumberGenerator from './blankOrNumberGenerator';

export type AdditionAddends = 'addendA' | 'addendB';
export type AdditionBlankPosition = AdditionAddends | 'sum';

interface AdditionSentenceBasicProps {
  addition: Addition;
  showAnswer?: boolean;
  blank?: AdditionBlankPosition | undefined;
}

function AdditionSentenceBasic({
  addition, blank = undefined, showAnswer = false,
}: AdditionSentenceBasicProps): JSX.Element {
  const BlankOrNumber = blankOrNumberGenerator(showAnswer, blank);
  return (
    <>
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
    </>
  );
}

AdditionSentenceBasic.defaultProps = {
  showAnswer: false,
  blank: undefined,
};

export default AdditionSentenceBasic;
