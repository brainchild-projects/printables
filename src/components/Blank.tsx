import React from 'react';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import Stringable from '../lib/Stringable';

const styles = makeStyles(() => ({
  problemBlank: {
    borderBottom: '0.1em solid', // 2px
    display: 'inline-block',
    minWidth: '1.6em', // 32px
    textAlign: 'center',

    '&.problem-blank-narrow': {
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: 0,
    },

    '&.problem-blank-short': {
      paddingLeft: '0.2em', // 1mm
      paddingRight: '0.2em', // 1mm
    },

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

type BlankWidth = 'short' | 'wide' | 'narrow';

export interface BlankProps {
  answer: string | number | Stringable;
  showAnswer: boolean;
  width?: BlankWidth;
  lineWidth?: string | number | undefined;
}

const underlines = (length: number): string => {
  let str = '_';
  for (let i = 0; i < length; i++) {
    str += '_';
  }
  return str;
};

function Blank({
  answer, showAnswer, width, lineWidth,
}: BlankProps) {
  const classes = styles();
  return (
    <span
      className={classNames(
        'problem-blank',
        `problem-blank-${width ?? 'short'}`,
        classes.problemBlank,
      )}
      style={{ borderWidth: lineWidth ?? '0.1em' }}
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
  lineWidth: undefined,
};

export default Blank;
