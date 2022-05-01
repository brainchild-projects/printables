import React from 'react';
import { makeStyles } from '@material-ui/core';
import FooterProps from './FooterProps';

const styles = makeStyles(() => ({
  footer: {
    display: 'flex',
    padding: '10mm 5mm 5mm 0',
    justifyContent: 'flex-end',
  },
  footerName: {
    display: 'flex',
    width: '70mm',
  },
  label: {
    flexGrow: 0,
    fontWeight: 'normal',
    paddingRight: '0.3em',
  },
  footerBlank: {
    flexGrow: 1,
    borderBottom: '1px solid black',
  },
}));

function FooterScore({ itemCount }: FooterProps): JSX.Element {
  const classes = styles();
  return (
    <section
      className={classes.footer}
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
    </section>
  );
}

export default FooterScore;
