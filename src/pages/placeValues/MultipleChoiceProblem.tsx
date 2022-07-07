import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React, { ReactNode } from 'react';
import formatNumber from '../../lib/formatNumber';
import uniqueElements from '../../lib/uniqueElements';

const styles = makeStyles(() => ({
  choices: {
    listStyleType: 'lower-alpha',
    // columnCount: 3,
    display: 'flex',
    paddingLeft: '0.95em',

    '& > li': {
      flex: 1,
      fontSize: '0.8em',
      position: 'relative',
    },
  },

  answer: {
    '&::before': {
      content: '" "',
      width: '1.4em',
      height: '1.4em',
      border: '0.1em solid',
      borderRadius: '100%',
      position: 'absolute',
      top: '0.1em',
      left: '-1.5em',
    },
  },

  statement: {
    marginTop: 0,
  },
}));

type Choice = string | number;

interface ChoiceItemProps {
  showAnswer: boolean;
  answer: Choice;
  choice: Choice;
  answerClass: string;
  noNumberFormat: boolean;
}

function ChoiceItem({
  showAnswer, answer, choice, answerClass, noNumberFormat,
}: ChoiceItemProps) {
  return (
    <li
      className={showAnswer && answer === choice ? answerClass : ''}
      key={choice}
      aria-label="Choice"
    >
      {
        typeof choice === 'number' && !noNumberFormat
          ? formatNumber(choice)
          : choice
      }
    </li>
  );
}

interface MultipleChoiceProblemProps {
  children: ReactNode;
  choices: Choice[];
  showAnswer: boolean;
  answer: Choice;
  noNumberFormat?: boolean;
}

function MultipleChoiceProblem({
  children, choices, answer, showAnswer, noNumberFormat = false,
}: MultipleChoiceProblemProps) {
  const classes = styles();
  return (
    <>
      <p className={classes.statement}>{children}</p>
      <ol className={classes.choices}>
        {
          uniqueElements(choices).map((choice) => (
            <ChoiceItem
              showAnswer={showAnswer}
              answer={answer}
              choice={choice}
              answerClass={classes.answer}
              noNumberFormat={noNumberFormat}
            />
          ))
        }
      </ol>
    </>
  );
}

MultipleChoiceProblem.defaultProps = {
  noNumberFormat: false,
};

export default MultipleChoiceProblem;
