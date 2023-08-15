import { Link, Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import styleIt from '../../components/styleIt';

const styles = styleIt(() => ({
  footer: {
    textAlign: 'center',
    padding: [32, 0],
    margin: [48, 0, 16],
    color: '#757575',
  },
}));

function Footer(): JSX.Element {
  const classes = styles();
  return (
    <footer className={classNames(classes.footer, 'no-print')}>
      <Typography component="p">
        Copyright ©
        {' '}
        <span className="copyright-year">2021-2022</span>
        {' '}
        Wayne Duran
      </Typography>
      <Typography component="p">
        Help us out on
        {' '}
        <a
          href="https://github.com/brainchild-projects/printables"
        >
          GitHub
        </a>
      </Typography>
      <Typography component="p" variant="caption">
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
