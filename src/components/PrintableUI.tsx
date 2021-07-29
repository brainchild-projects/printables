import React, { ReactNode } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import PaperPreview from './PaperPreview';
import PaperOptionsProvider from './PaperOptionsProvider';

const pageStyles = makeStyles((theme) => ({
  container: {
    marginTop: '-64px',
    alignItems: 'stretch',

    '& > .MuiGrid-item': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  column: {},
  main: {
    overflow: 'auto',

    '@media print': {
      width: '100% !important',
      maxWidth: 'none',
      flexBasis: 'auto',
      overflow: 'visible',
    },
  },
  sideColumn: {
    paddingTop: theme.spacing(2),
  },
}));

interface PrintableUIProps {
  children: ReactNode;
  customizeForm: ReactNode;
  title: string;
}

function PrintableUI({ children, title, customizeForm }: PrintableUIProps): JSX.Element {
  const classes = pageStyles();
  return (
    <PaperOptionsProvider>
      <Grid container spacing={3} className={`${classes.container} print-ignore`}>
        <Grid item xs={3} sm={2} className={`${classes.column} no-print`}>
          <section aria-label="Customize Calendar" className={classes.sideColumn}>
            <Typography variant="h5" component="h1">{title}</Typography>
            {customizeForm}
          </section>
        </Grid>
        <Grid item xs={9} sm={10} className={`${classes.main} print-ignore`}>
          <section aria-label="Preview">
            <PaperPreview>{children}</PaperPreview>
          </section>
        </Grid>
      </Grid>
    </PaperOptionsProvider>
  );
}

export default PrintableUI;
