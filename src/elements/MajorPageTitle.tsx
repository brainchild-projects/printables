import React, { ReactNode } from 'react';
import styleIt from '../components/styleIt';
import PageTitle from './PageTitle';

const styles = styleIt(() => ({
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
