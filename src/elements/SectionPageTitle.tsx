import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles(() => ({
  title: {
    marginTop: 20,
    marginBottom: 10,
  },
}));

interface SectionPageTitleProps {
  children: ReactNode;
}

function SectionPageTitle({ children }: SectionPageTitleProps): JSX.Element {
  const classes = styles();
  return (
    <Typography
      variant="h6"
      component="h3"
      className={classes.title}
    >
      {children}
    </Typography>
  );
}

export default SectionPageTitle;
