import React from 'react';
import { makeStyles } from '@material-ui/core';
import Stringable from '../lib/Stringable';

const styles = makeStyles(() => ({
  problemBlank: {
    borderBottom: '0.1em solid', // 2px
    paddingLeft: '0.2em', // 1mm
    paddingRight: '0.2em', // 1mm

    display: 'inline-block',
    minWidth: '1.6em', // 32px
    textAlign: 'center',

    '& > .underline': {
      color: 'transparent',
    },
  },
}));

export interface BlankProps {
  answer: string | number | Stringable;
  showAnswer: boolean;
}

const underlines = (length: number): string => {
  let str = '_';
  for (let i = 0; i < length; i++) {
    str += '_';
  }
  return str;
};

function Blank({ answer, showAnswer }: BlankProps): JSX.Element {
  const classes = styles();
  return (
    <span className={`problem-blank ${classes.problemBlank}`}>
      {
        showAnswer
          ? answer
          : (
            <span className="underline">
              {underlines(answer.toString().length)}
            </span>
          )
      }
    </span>
  );
}

export default Blank;
