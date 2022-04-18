import { Link, makeStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';

const styles = makeStyles((theme) => ({
  footer: {
    textAlign: 'center',
    padding: theme.spacing(4, 0),
    margin: theme.spacing(6, 0, 2),
    color: theme.palette.grey[600],
  },
}));

function Footer(): JSX.Element {
  const classes = styles();
  return (
    <footer className={classNames(classes.footer, 'no-print')}>
      <Typography component="p">
        Copyright ©
        {' '}
        <span className="copyright-year">2021</span>
        {' '}
        Wayne Duran
      </Typography>
      <Typography component="p">
        Homepage Photo by
        {' '}
        <Link href="https://unsplash.com/@anniespratt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Annie Spratt</Link>
        {' '}
        on
        {' '}
        <Link href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</Link>
      </Typography>
    </footer>
  );
}

export default Footer;
