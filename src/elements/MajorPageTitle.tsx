import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core';
import PageTitle from './PageTitle';

const styles = makeStyles(() => ({
  title: {
    marginBottom: 20,
  },
}));

interface MajorPageTitleProps {
  children: ReactNode;
}

function MajorPageTitle({ children }: MajorPageTitleProps): JSX.Element {
  const classes = styles();
  return (
    <PageTitle
      variant="h4"
      className={classes.title}
    >
      {children}
    </PageTitle>
  );
}

export default MajorPageTitle;
