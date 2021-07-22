import React, { ReactNode } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const paperPreviewStyles = makeStyles(() => ({
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
    // position: 'absolute',
    // top: 0,
    // left: 0,
    transformOrigin: 'top left',

    '& > h1:first-child': {
      marginTop: 0,
    },
  },
}));

interface PaperPreviewProps {
  children: ReactNode;
  margin?: string | number;
  orientation?: string;
  scale?: number;
}

function PaperPreview({
  children, margin = '10mm', orientation = 'landscape', scale = 1,
}: PaperPreviewProps): JSX.Element {
  const classes = paperPreviewStyles();
  const paperMargin = typeof margin === 'number' ? `${margin}mm` : margin;
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
      id="printable-paper"
      className={`printable-paper ${classes.paper}`}
      style={paperStyle}
    >
      <div
        className={`${classes.content} printable-paper-content`}
        style={{ padding: paperMargin, ...contentStyles }}
      >
        {children}
      </div>
    </Paper>
  );
}

PaperPreview.defaultProps = {
  margin: '10mm',
  orientation: 'landscape',
  scale: 1,
};

export default PaperPreview;
