import React from 'react';
import classNames from 'classnames';
import SubtractionSentenceBasic from '../../components/math/SubtractionSentenceBasic';
import ProblemListItem from '../../components/ProblemListItem';
import Subtraction from '../../lib/math/Subtraction';

export type SubtractionBlankPosition = 'difference' | 'minuend' | 'subtrahend';

interface SubtractionSentenceProps {
  subtraction: Subtraction;
  blank?: SubtractionBlankPosition;
  showAnswer: boolean;
  prefix?: JSX.Element | string;
  fontSize?: number;
  className?: string;
}

function SubtractionSentence({
  subtraction,
  blank = 'difference',
  showAnswer = false,
  prefix,
  fontSize = 20,
  className = '',
}: SubtractionSentenceProps): JSX.Element {
  return (
    <ProblemListItem
      className={classNames('subtraction-with-figures-problem-item', className)}
      label={`Subtraction With Figures ${showAnswer ? 'Answer' : 'Problem'}`}
      fontSize={fontSize}
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
  fontSize: 20,
  className: '',
};

export default SubtractionSentence;
