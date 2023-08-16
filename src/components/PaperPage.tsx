import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { usePaperOptions } from './PaperOptionsProvider';
import styleIt from './styleIt';
import Paper from './uiElements/Paper';

const paperPageStyles = styleIt(() => ({
  paper: {
    margin: '0 auto 20px',
    position: 'relative',
    overflow: 'hidden',
    breakAfter: 'always',
    transition: '0.3s opacity',
    opacity: 1,

    '&.not-ready': {
      opacity: 0,
    },

    '@media print': {
      borderRadius: 0,
      boxShadow: 'none',
      margin: 0,
    },

    '.print-ready &': {
      borderRadius: 0,
      boxShadow: 'none',
      margin: 0,
    },

    '.print-ready &:first-child': {
      breakAfter: 'always',
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

  innerWrap: {
    width: '100%',
    overflow: 'hidden',
  },
}));

interface PaperPreviewProps {
  children: ReactNode;
  noFlexWrap?: boolean;
  pageId?: string;
  ready?: boolean;
  label?: string;
}

function PaperPage({
  children, noFlexWrap, pageId, ready = true, label = undefined,
}: PaperPreviewProps): JSX.Element {
  const { options } = usePaperOptions();
  const {
    margin, orientation, scale, paperSize,
  } = options;
  const classes = paperPageStyles();
  const paperStyle = {
    aspectRatio: paperSize.aspectRatioStr(orientation),
    width: paperSize.orientationWidth(orientation),
    transform: scale !== 1 ? `scale(${scale})` : undefined,
  };

  const dimensionStyles = paperSize.dimensionsStr(orientation);

  return (
    <Paper
      className={classNames(
        'printable-paper',
        classes.paper,
        { 'not-ready': !ready },
      )}
      style={paperStyle}
      component="section"
      data-page-id={pageId}
      aria-label={label}
    >
      <div
        className={classNames(
          classes.content,
          'printable-paper-content',
        )}
        style={{ padding: margin, ...dimensionStyles }}
      >
        {
          noFlexWrap
            ? children
            : (
              <div className={classNames(
                classes.innerWrap,
                'printable-paper-inner-wrap',
              )}
              >
                {children}
              </div>
            )
        }
      </div>
    </Paper>
  );
}

PaperPage.defaultProps = {
  noFlexWrap: false,
  pageId: undefined,
  ready: true,
  label: undefined,
};

export default PaperPage;
