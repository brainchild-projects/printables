import { makeStyles } from '@material-ui/core';
import React from 'react';
import { usePaperOptions } from '../PaperOptionsProvider';

const footerStyles = makeStyles(() => ({
  footer: {
    display: 'flex',
    padding: '10mm 5mm 5mm 0',
    width: '60%',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  footerName: {
    flexGrow: 1,
    display: 'flex',
    paddingRight: '2em',
  },
  label: {
    flexGrow: 0,
    fontWeight: 'normal',
    paddingRight: '0.3em',
  },
  footerDate: {
    flexGrow: 1,
    display: 'flex',
  },
  footerBlank: {
    flexGrow: 1,
    borderBottom: '1px solid black',
  },
}));

interface WorksheetFooterProps {
  itemCount: number;
}

function WorksheetFooter({ itemCount }: WorksheetFooterProps): JSX.Element {
  const { options } = usePaperOptions();
  const classes = footerStyles();
  return (
    <section
      className={classes.footer}
      style={{
        bottom: options.margin,
        right: options.margin,
      }}
    >
      <div className={classes.footerName}>
        <strong className={classes.label}>Score:</strong>
        <span className={classes.footerBlank} />
        <span>
          out of
          {' '}
          {itemCount}
        </span>
      </div>
      <div className={classes.footerDate}>
        <strong className={classes.label}>Time:</strong>
        <span className={classes.footerBlank} />
        <span>minutes</span>
      </div>
    </section>
  );
}

export default WorksheetFooter;
