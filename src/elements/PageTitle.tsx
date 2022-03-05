import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { ReactNode } from 'react';

const styles = makeStyles(() => ({
  heading: {
    textAlign: 'center',
  },
}));
interface PageTitleProps {
  children: ReactNode;
}

function PageTitle({ children }: PageTitleProps): JSX.Element {
  const classes = styles();
  return (
    <Typography
      variant="h6"
      component="h2"
      className={classes.heading}
    >
      {children}
    </Typography>
  );
}

export default PageTitle;
