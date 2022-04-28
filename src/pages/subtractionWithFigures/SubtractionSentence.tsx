import React from 'react';
import SubtractionSentenceBasic from '../../components/math/SubtractionSentenceBasic';
import ProblemListItem from '../../components/ProblemListItem';
import Subtraction from '../../lib/math/Subtraction';

type SubtractionBlankPosition = 'difference' | 'minuend' | 'subtrahend';

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
  return (
    <ProblemListItem
      className="subtraction-with-figures-problem-item"
      label={`Subtraction With Figures ${showAnswer ? 'Answer' : 'Problem'}`}
    >
      {prefix}
      <SubtractionSentenceBasic
        subtraction={subtraction}
        blank={blank}
        showAnswer={showAnswer}
      />
    </ProblemListItem>
  );
}

SubtractionSentence.defaultProps = {
  blank: 'difference',
  prefix: '',
};

export default SubtractionSentence;
