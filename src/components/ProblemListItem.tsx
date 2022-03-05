import { makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface ProblemListItemProps {
  children: ReactNode;
  label?: string;
  fontSize?: number;
  className?: string;
}

const defaultFontSize = 20;
const defaultLabel = 'Problem';

const styles = makeStyles(() => ({
  // All em units equivalent are based on a 20px font size base
  li: {
    padding: '1.15em 0 1.15em 1.15em', // '6mm 0 6mm 6mm', // 23px
    marginLeft: '1.9em', // '10mm', // 38px
    '-webkit-column-break-inside': 'avoid',
    pabeBreakInside: 'avoid',
    breakInside: 'avoid',

    '&::marker': {
      fontSize: '0.8em', // 16px
    },
  },
}));

function ProblemListItem({
  children, label, fontSize, className,
}: ProblemListItemProps): JSX.Element {
  const classes = styles();
  const paddedClassName = className ? ` ${className}` : '';
  return (
    <li
      className={`${classes.li}${paddedClassName}`}
      aria-label={label ?? defaultLabel}
      style={{ fontSize: `${fontSize ?? defaultFontSize}px` }}
    >
      {children}
    </li>
  );
}

ProblemListItem.defaultProps = {
  fontSize: defaultFontSize,
  className: '',
  label: defaultLabel,
};

export default ProblemListItem;
