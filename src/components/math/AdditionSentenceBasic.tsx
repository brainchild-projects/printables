import React from 'react';
import Addition from '../../lib/math/Addition.js';
import BlankOrNumber from './BlankOrNumber.js';

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
  return (
    <>
      <BlankOrNumber
        value={addition.addendA}
        expected="addendA"
        blank={blank}
        showAnswer={showAnswer}
      />
      {' + '}
      <BlankOrNumber
        value={addition.addendB}
        expected="addendB"
        blank={blank}
        showAnswer={showAnswer}
      />
      {' = '}
      <BlankOrNumber
        value={addition.sum()}
        expected="sum"
        blank={blank}
        showAnswer={showAnswer}
      />
    </>
  );
}

AdditionSentenceBasic.defaultProps = {
  showAnswer: false,
  blank: undefined,
};

export default AdditionSentenceBasic;
