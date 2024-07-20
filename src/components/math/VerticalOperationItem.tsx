import React from 'react';
import classNames from 'classnames';
import ProblemListItem from '../ProblemListItem';
import styleIt from '../styleIt'; 

const styles = styleIt(() => ({
  mainWrap: {
    display: 'flex',
  },
  wrap: {
    display: 'flex',
    flexDirection: 'column',
  },
  numberRow: {
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
}));

interface VerticalOperationItemProps {
  numbers: number[];
  answer: number;
  operator: string;
  showAnswer: boolean;
  className: string;
  label: string;
}

export default function VerticalOperationItem({
  numbers, showAnswer, operator, answer, className, label,
}: VerticalOperationItemProps): JSX.Element {
  const classes = styles();
  return (
    <ProblemListItem
      className={className}
      label={`${label} ${showAnswer ? 'Answer' : 'Problem'}`}
    >
      <div className={classes.mainWrap}>
        <div className={classes.wrap}>
          {
            numbers.map((num, index) => {
              const lastRow = index === numbers.length - 1;
              return (
                <span
                  className={
                    classNames(
                      classes.numberRow,
                      lastRow ? classes.lastRow : null,
                    )
                  }
                >
                  {
                    lastRow && (
                      <>
                        <span className={classes.operator}>{operator}</span>
                        {' '}
                      </>
                    )
                  }
                  <span>{num.toLocaleString()}</span>
                  {' '}
                </span>
              );
            })
          }
          <span className={classes.answerRow}>
            {showAnswer ? answer.toLocaleString() : (<>&nbsp;</>)}
          </span>
        </div>
      </div>
    </ProblemListItem>
  );
}

