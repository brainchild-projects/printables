import { Link } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styleIt from '../../components/styleIt.js';
import Typography from '../../components/uiElements/Typography.js';

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
  const [year, setYear] = useState(() => (new Date()).getFullYear());
  const yearUpdater = () => {
    const now = new Date();
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const nextDayInMs = nextDay.getTime() - now.getTime();

    setTimeout(() => {
      const newYear = (new Date()).getFullYear();
      if (newYear !== year) {
        setYear(newYear);
      }
      yearUpdater();
    }, nextDayInMs);
  }

  useEffect(yearUpdater);

  return (
    <footer className={classNames(classes.footer, 'no-print')}>
      <Typography component="p" color="inherit">
        Copyright ©
        {' '}
        <span className="copyright-year">2021-{year}</span>
        {' '}
        Wayne Duran
      </Typography>
      <Typography component="p" color="inherit">
        Help us out on
        {' '}
        <a
          href="https://github.com/brainchild-projects/printables"
        >
          GitHub
        </a>
      </Typography>
      <Typography component="p" variant="caption" color="inherit">
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
