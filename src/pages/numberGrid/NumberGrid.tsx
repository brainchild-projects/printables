import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

const styles = makeStyles(() => ({
  table: {
    borderCollapse: 'collapse',
    width: '170mm',
    margin: '0 auto',
  },
  cell: {
    border: '1px solid #aaa',
    height: '19mm',
    verticalAlign: 'middle',
    textAlign: 'center',
    width: '10%',
    fontSize: '14pt',

    '&.highlight': {
      backgroundColor: '#ccc',
    },
  },
}));

interface NumberGridProps {
  skipCount?: number;
  showAnswer: boolean;
}

function shouldHighlight(n: number, showAnswer: boolean, skipCount?: number): boolean {
  return showAnswer && skipCount !== undefined && (n % skipCount) === 0;
}

function NumberGrid({ skipCount = undefined, showAnswer = false }: NumberGridProps): JSX.Element {
  const rows: JSX.Element[] = [];
  const classes = styles();
  let n = 1;
  for (let i = 0; i < 10; i++) {
    const cells: JSX.Element[] = [];
    const upTo = ((i + 1) * 10) + 1;
    for (; n < (upTo); n++) {
      const highlight = shouldHighlight(n, showAnswer, skipCount);
      cells.push(<td key={n} className={classNames(classes.cell, { highlight })}>{n}</td>);
    }
    rows.push(<tr key={i}>{cells}</tr>);
  }
  return (
    <table className={classes.table} aria-label="Number Grid">
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

NumberGrid.defaultProps = {
  skipCount: undefined,
};

export default NumberGrid;
