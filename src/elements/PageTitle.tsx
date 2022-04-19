import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

const styles = makeStyles(() => ({
  heading: {
    textAlign: 'center',
  },
}));
interface PageTitleProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string | undefined;
  leftAlign?: boolean;
}

function PageTitle({
  children, variant = 'h6', className, leftAlign = false,
}: PageTitleProps): JSX.Element {
  const classes = styles();
  return (
    <Typography
      variant={variant}
      component="h2"
      className={classNames({ [classes.heading]: !leftAlign }, className)}
    >
      {children}
    </Typography>
  );
}

PageTitle.defaultProps = {
  variant: 'h6',
  className: undefined,
  leftAlign: false,
};

export default PageTitle;
