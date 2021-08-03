import React, { ReactNode } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { usePaperOptions } from './PaperOptionsProvider';

const paperPageStyles = makeStyles(() => ({
  paper: {
    margin: '0 auto 20px',
    position: 'relative',
    overflow: 'hidden',
    pageBreakBefore: 'always',
    breakBefore: 'always',

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

function PaperPage({ children }: PaperPreviewProps): JSX.Element {
  const { options } = usePaperOptions();
  const {
    margin, orientation, scale, paperSize,
  } = options;
  const classes = paperPageStyles();
  const paperStyle: CSSProperties = {
    aspectRatio: paperSize.aspectRatioStr(orientation),
    width: paperSize.orientationWidth(orientation),
  };

  if (scale !== 1) {
    paperStyle.transform = `scale(${scale})`;
  }

  const dimensionStyles = paperSize.dimensionsStr(orientation);

  return (
    <Paper
      className={`printable-paper ${classes.paper}`}
      style={paperStyle}
      component="section"
    >
      <div
        className={`${classes.content} printable-paper-content`}
        style={{ padding: margin, ...dimensionStyles }}
      >
        {children}
      </div>
    </Paper>
  );
}

export default PaperPage;
