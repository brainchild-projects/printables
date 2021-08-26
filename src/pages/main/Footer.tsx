import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const styles = makeStyles((theme) => ({
  footer: {
    textAlign: 'center',
    padding: theme.spacing(4, 0),
    margin: theme.spacing(6, 0, 2),
    color: theme.palette.grey[600],
  },
}));

const Footer = (): JSX.Element => {
  const classes = styles();
  return (
    <footer className={`${classes.footer} no-print`}>
      <Typography>
        Copyright ©
        {' '}
        <span className="copyright-year">2021</span>
        {' '}
        Wayne Duran
      </Typography>
    </footer>
  );
};

export default Footer;
