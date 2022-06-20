import React from 'react';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import Stringable from '../lib/Stringable';

const styles = makeStyles(() => ({
  problemBlank: {
    borderBottom: '0.1em solid', // 2px
    paddingLeft: '0.2em', // 1mm
    paddingRight: '0.2em', // 1mm

    display: 'inline-block',
    minWidth: '1.6em', // 32px
    textAlign: 'center',

    '&.problem-blank-wide': {
      minWidth: '2.6em',
      paddingLeft: '0.6em',
      paddingRight: '0.6em',
    },

    '& > .underline': {
      color: 'transparent',
    },
  },
}));

type BlankWidth = 'short' | 'wide';

export interface BlankProps {
  answer: string | number | Stringable;
  showAnswer: boolean;
  width?: BlankWidth;
}

const underlines = (length: number): string => {
  let str = '_';
  for (let i = 0; i < length; i++) {
    str += '_';
  }
  return str;
};

function Blank({ answer, showAnswer, width }: BlankProps) {
  const classes = styles();
  return (
    <span className={classNames(
      'problem-blank',
      `problem-blank-${width ?? 'short'}`,
      classes.problemBlank,
    )}
    >
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

Blank.defaultProps = {
  width: 'short',
};

export default Blank;
