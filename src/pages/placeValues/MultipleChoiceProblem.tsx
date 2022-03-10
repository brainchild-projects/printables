import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import React, { ReactNode } from 'react';

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

  // top: -2px;
  // left: -28px;
  // width: 28px;
  // border: 0.1em solid;
  // height: 28px;
  // position: absolute;
  // border-radius: 100%;
  // content: ' ';

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

interface MultipleChoiceProblemProps {
  children: ReactNode;
  choices: Array<string>;
  showAnswer: boolean;
  answer: number;
}

function MultipleChoiceProblem({
  children, choices, answer, showAnswer,
}: MultipleChoiceProblemProps): JSX.Element {
  const classes = styles();
  return (
    <>
      <p className={classes.statement}>{children}</p>
      <ol className={classes.choices}>
        {
          choices.map((choice, i) => (
            <li
              className={showAnswer && answer === i ? classes.answer : ''}
              key={choice}
              aria-label="Choice"
            >
              {choice}
            </li>
          ))
        }
      </ol>
    </>
  );
}

export default MultipleChoiceProblem;
