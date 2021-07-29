import React, { ReactNode } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { usePaperOptions } from './PaperOptionsProvider';

const paperPageStyles = makeStyles(() => ({
  paper: {
    margin: '0 auto 20px',
    position: 'relative',
    overflow: 'hidden',

    '@media print': {
      borderRadius: 0,
      boxShadow: 'none',
      margin: 0,
    },
  },

  content: {
    boxSizing: 'border-box',
    display: 'flex',
    flexGrow: 1,
    transformOrigin: 'top left',

    '& > h1:first-child': {
      marginTop: 0,
    },
  },
}));

interface PaperPreviewProps {
  children: ReactNode;
}

function PaperPage({
  children,
}: PaperPreviewProps): JSX.Element {
  const { options } = usePaperOptions();
  const { margin, orientation, scale } = options;
  const classes = paperPageStyles();
  const paperStyle: CSSProperties = orientation === 'landscape'
    ? {
      aspectRatio: '297 / 210',
      width: '297mm',
    }
    : {
      aspectRatio: '210 / 297',
      width: '210mm',
    };

  if (scale !== 1) {
    paperStyle.transform = `scale(${scale})`;
  }

  const contentStyles = orientation === 'landscape'
    ? {
      width: '297mm',
      height: '210mm',
    }
    : {
      width: '210mm',
      height: '297mm',
    };

  return (
    <Paper
      className={`printable-paper ${classes.paper}`}
      style={paperStyle}
    >
      <div
        className={`${classes.content} printable-paper-content`}
        style={{ padding: margin, ...contentStyles }}
      >
        {children}
      </div>
    </Paper>
  );
}

export default PaperPage;
