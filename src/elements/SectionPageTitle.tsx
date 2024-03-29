import React, { ElementType, ReactNode } from 'react';
import styleIt from '../components/styleIt';
import Grid from '../components/uiElements/Grid';
import Typography, { Variant } from '../components/uiElements/Typography';

const styles = styleIt(() => ({
  margins: {
    marginTop: 20,
    marginBottom: 10,
  },
}));

interface SectionPageTitleProps {
  children: ReactNode;
  level?: number;
  endAction?: ReactNode | undefined;
}

function SectionPageTitle({ children, level = 1, endAction }: SectionPageTitleProps): JSX.Element {
  const classes = styles();
  const variant = `h${4 + level}` as Variant;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component = `h${2 + level}` as ElementType<any>;

  if (endAction) {
    return (
      <Grid
        container
        justifyContent="space-between"
        className={classes.margins}
      >
        <Grid
          item
        >
          <Typography
            variant={variant}
            component={component}
          >
            {children}
          </Typography>
        </Grid>
        <Grid
          item
          style={{ textAlign: 'right' }}
        >
          {endAction}
        </Grid>
      </Grid>
    );
  }

  return (
    <Typography
      variant={variant}
      component={component}
      className={classes.margins}
    >
      {children}
    </Typography>
  );
}

SectionPageTitle.defaultProps = {
  level: 1,
  endAction: undefined,
};

export default SectionPageTitle;
