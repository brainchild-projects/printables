import React from 'react';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import classNames from 'classnames';
import ProblemListItem from '../../components/ProblemListItem';
import Addition from '../../lib/math/Addition';

const styles = makeStyles(() => ({
  mainWrap: {
    display: 'flex',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  addendRow: {
    alignSelf: 'flex-end',
    flexShrink: 1,
    textAlign: 'right',
    position: 'relative',
  },
  answerRow: {
    flexGrow: 1,
    textAlign: 'right',
    alignSelf: 'flex-end',
    paddingTop: '0.2em',
  },
  lastRow: {
    display: 'flex',
    borderBottom: '2px solid',
    paddingBottom: '0.2em',
  },
  operator: {
    left: 0,
    paddingRight: '1em',
  },
  number: {
    //
  },
}));

interface VerticalAdditionItemProps {
  add: Addition;
  showAnswer: boolean;
}

export default function VerticalAdditionItem({
  add, showAnswer,
}: VerticalAdditionItemProps): JSX.Element {
  const classes = styles();
  return (
    <ProblemListItem
      className="vertical-addition-problem-item"
      label={`Vertical Addition ${showAnswer ? 'Answer' : 'Problem'}`}
    >
      <div className={classes.mainWrap}>
        <div className={classes.wrap}>
          <span className={classes.addendRow}>
            <span className="number">{add.addendA}</span>
            {' '}
          </span>
          <span className={classNames(classes.addendRow, classes.lastRow)}>
            <span className={classes.operator}>+</span>
            {' '}
            <span className={classes.number}>{add.addendB}</span>
          </span>
          <span className={classes.answerRow}>
            {' '}
            {showAnswer ? add.sum() : (<>&nbsp;</>)}
          </span>
        </div>
      </div>
    </ProblemListItem>
  );
}
