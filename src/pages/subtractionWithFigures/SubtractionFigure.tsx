import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import Subtraction from '../../lib/math/Subtraction';
import CrossableCircle from './CrossableCircle';

const styles = makeStyles(() => ({
  wrap: {
    fontSize: '2em',
    lineHeight: 0.6,
    position: 'relative',
    left: '-0.05em',
    marginBottom: '0.4em',
  },
  shapeWrap: {
    margin: '0 0.05em',
    display: 'inline-block',
    width: '20px',
    height: '20px',
  },
}));

interface SubtractionFigureProps {
  subtraction: Subtraction;
  showAnswer: boolean;
}

function generateFigures(
  subtraction: Subtraction,
  showAnswer: boolean,
  shapeWrapClassName: string,
) {
  const count = subtraction.minuend;
  const toCross = subtraction.subtrahend;
  const chars: JSX.Element[] = [];
  while (chars.length < count && count > 0) {
    const crossed = showAnswer && chars.length < toCross;
    chars.push(
      <span className={shapeWrapClassName}>
        <CrossableCircle crossed={crossed} />
      </span>,
    );
  }
  return chars;
}

function renderRows(chars: JSX.Element[], shapeWrapClassName: string): JSX.Element {
  let rows: JSX.Element;
  if (chars.length > 5) {
    const splitAt = Math.ceil(chars.length / 2);
    rows = (
      <>
        {chars.slice(0, splitAt)}
        <br />
        {chars.slice(splitAt)}
      </>
    );
  } else {
    rows = (
      <>
        {chars}
        <br />
        <span className={shapeWrapClassName}>&nbsp;</span>
      </>
    );
  }
  return rows;
}

function SubtractionFigure({ subtraction, showAnswer }: SubtractionFigureProps): JSX.Element {
  const classes = styles();
  const chars = generateFigures(subtraction, showAnswer, classes.shapeWrap);
  const rows = renderRows(chars, classes.shapeWrap);
  return (
    <div className={classNames('subtraction-figure', classes.wrap)}>{rows}</div>
  );
}

export default SubtractionFigure;
