import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';
import { Props, PropsCallback } from './MultiPaperPage';
import styleIt from './styleIt';

interface ProblemListProps {
  children: ReactNode;
  className?: string;
  columns: number;
  columnGap?: number;
  style?: CSSProperties;
  label?: string;
}

const styles = styleIt(() => ({
  // All em units equivalent are based on a 20px font size base
  list: {
    margin: 0,
    padding: 0,
    columnCount: '2',
    columnWidth: 'auto',
    counterReset: 'problem',

    '& > li': {
      counterIncrement: 'problem',
    },

    '& > li::marker': {
      content: 'counter(problem) "."',
    },
  },
}));

function isAnIntGreaterThan1(n: unknown): boolean {
  return typeof n === 'number' && Number.isInteger(n) && n > 1;
}

function ProblemList({
  children, className, columns, columnGap, style, label,
}: ProblemListProps): JSX.Element {
  const classes = styles();
  const cols = isAnIntGreaterThan1(columns) ? columns : 1;
  const gap = `${columnGap ?? 1}em`;
  const styleUsed = { ...style, columns: cols, columnGap: gap };

  return (
    <ol
      className={classNames(
        'problems',
        classes.list,
        className,
      )}
      style={styleUsed}
      aria-label={label ?? 'Problems'}
    >
      {children}
    </ol>
  );
}

const propsCallback: PropsCallback = (inputProps: Props, { memberIndex }) => ({
  ...inputProps,
  style: {
    counterReset: `problem ${memberIndex}`,
  },
});

ProblemList.propsCallback = propsCallback;

ProblemList.defaultProps = {
  className: null,
  columnGap: 2,
  style: null,
  label: null,
};

export default ProblemList;
