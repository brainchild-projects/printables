import React, { ReactNode } from 'react';
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

type WidthTypes = 'short' | 'wide' | 'narrow';
type AnswerType = string | number | Stringable | ReactNode;

export interface BlankProps {
  answer: AnswerType;
  showAnswer: boolean;
  width?: WidthTypes;
  blankWidth?: string | number | undefined;
  lineWidth?: string | number | undefined;
}

const underlines = (answer: AnswerType): string => {
  if (typeof answer === 'string' || typeof answer === 'number') {
    let str = '_';
    for (let i = 0; i < answer.toString().length; i++) {
      str += '_';
    }
    return str;
  }
  return '_';
};

function Blank({
  answer, showAnswer, width, lineWidth, blankWidth,
}: BlankProps) {
  const classes = styles();
  const wrapStyle = {
    borderWidth: lineWidth ?? '0.1em',
    width: blankWidth,
  };
  return (
    <span
      className={classNames(
        'problem-blank',
        `problem-blank-${width ?? 'short'}`,
        classes.problemBlank,
      )}
      style={wrapStyle}
    >
      {
        showAnswer
          ? answer
          : (
            <span className="underline">
              {underlines(answer)}
            </span>
          )
      }
    </span>
  );
}

Blank.defaultProps = {
  width: 'short',
  lineWidth: undefined,
  blankWidth: undefined,
};

export default Blank;
