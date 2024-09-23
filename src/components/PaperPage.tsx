import React, { ReactNode, cloneElement } from 'react';
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
    // The following is used for margins. The width is overriden by the margin width
    // This is done for easier inner dimensions calculation using element.clientWidth
    border: '0px solid rgba(255, 255, 255, 0.0)',

    '& > h1:first-child': {
      marginTop: 0,
    },
  },

  innerWrap: {
    width: '100%',
    overflow: 'hidden',
  },
}));

interface PaperPageProps {
  children: ReactNode;
  noFlexWrap?: boolean;
  pageId?: string;
  ready?: boolean;
  label?: string;
  unlimitedHeight?: boolean;
}

export type NodeWithClassName = React.ReactElement<{ className: string }>;

function isNodeWithClassName(node: unknown): node is NodeWithClassName {
  if (React.isValidElement(node)) {
    return 'className' in (node as React.ReactElement).props;
  }

  return false;
}

export function elementClasser(el: ReactNode, classAttribute: string): ReactNode {
  if (isNodeWithClassName(el)) {
    const { className } = el.props;
    const classNamesCombined = classNames(classAttribute, className as string | null);
    return cloneElement(el, { className: classNamesCombined });
  }

  return el;
}

function addClassesToChildren(children: ReactNode): ReactNode {
  if (children instanceof Array) {
    return children.map((child) => elementClasser(child as ReactNode, 'page-item'));
  }

  if (isNodeWithClassName(children)) {
    return elementClasser(children, 'page-item');
  }

  return children;
}

function PaperPage({
  children, noFlexWrap, pageId, ready = true, label = undefined, unlimitedHeight = false,
}: PaperPageProps): JSX.Element {
  const { options } = usePaperOptions();
  const { margin, orientation, scale, paperSize } = options;
  const classes = paperPageStyles();
  const paperStyle = {
    width: paperSize.orientationWidth(orientation),
    transform: scale !== 1 ? `scale(${scale})` : undefined,
  } as React.CSSProperties;
  if (!unlimitedHeight) {
    paperStyle.aspectRatio = paperSize.aspectRatioStr(orientation);
  }

  const dimensionStyles = paperSize.dimensionsStr(orientation);
  const realChildren = addClassesToChildren(children);

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
        style={{ borderWidth: margin, ...dimensionStyles }}
      >
        {
          noFlexWrap
            ? realChildren
            : (
              <div className={classNames(
                classes.innerWrap,
                'printable-paper-inner-wrap',
              )}
              >
                {realChildren}
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
  unlimitedHeight: false,
};

export default PaperPage;
