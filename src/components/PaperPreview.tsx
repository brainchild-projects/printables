import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core';

const paperPreviewStyles = makeStyles(() => ({
  preview: {
    padding: 0,
    overflow: 'auto',
  },
}));
interface PaperPreviewProps {
  children: ReactNode;
}

function PaperPreview({ children }: PaperPreviewProps): JSX.Element {
  const classes = paperPreviewStyles();

  return (
    <div
      id="paper-preview"
      className={`paper-preview ${classes.preview}`}
    >
      { children }
    </div>
  );
}

export default PaperPreview;
