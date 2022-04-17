import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
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

function SubtractionFigure({ subtraction, showAnswer }: SubtractionFigureProps): JSX.Element {
  const count = subtraction.minuend;
  const toCross = subtraction.subtrahend;
  const chars: JSX.Element[] = [];
  const classes = styles();

  while (chars.length < count && count > 0) {
    if (showAnswer && chars.length < toCross) {
      chars.push(
        <span className={classes.shapeWrap}>
          <CrossableCircle crossed />
        </span>,
      );
    } else {
      chars.push(
        <span className={classes.shapeWrap}>
          <CrossableCircle />
        </span>,
      );
    }
  }
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
        <span className={classes.shapeWrap}>&nbsp;</span>
      </>
    );
  }
  return (
    <div className={`subtraction-figure ${classes.wrap}`}>{rows}</div>
  );
}

export default SubtractionFigure;
