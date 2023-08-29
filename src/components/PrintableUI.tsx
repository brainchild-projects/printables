import React, { ReactNode } from 'react';
import classNames from 'classnames';
import PaperPreview from './PaperPreview';
import PaperOptionsProvider from './PaperOptionsProvider';
import Footer from '../pages/main/Footer';
import InstanceOptionsProvider from './InstanceSettingsProvider';
import styleIt from './styleIt';
import Grid from './uiElements/Grid';
import Typography from './uiElements/Typography';

const pageStyles = styleIt(() => ({
  container: {
    marginTop: '-64px',
    alignItems: 'stretch',
    maxWidth: '100vw',
    padding: [0, 16],

    '& > .MuiGrid-item': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '&.grid-container > .grid-item': {
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
    paddingTop: 16,
  },
}));

interface PrintableUIProps {
  children: ReactNode;
  customizeForm: ReactNode;
  title: string;
  defaultOrientation?: 'portrait' | 'landscape' | undefined;
  optionsKey: string;
}

function PrintableUI({
  children, title, customizeForm, defaultOrientation, optionsKey: key,
}: PrintableUIProps): JSX.Element {
  const classes = pageStyles();
  return (
    <InstanceOptionsProvider>
      <PaperOptionsProvider orientation={defaultOrientation} optionsKey={key}>
        <Grid
          container
          spacing={3}
          className={classNames(
            classes.container,
            'print-ignore',
            'print-auto-max-width',
          )}
        >
          <Grid
            item
            xs={3}
            sm={2}
            className={classNames(classes.column, 'no-print')}
          >
            <section aria-label="Customize Form" className={classes.sideColumn}>
              <Typography variant="h5" component="h1">{title}</Typography>
              {customizeForm}
            </section>
          </Grid>
          <Grid
            item
            xs={9}
            sm={10}
            className={classNames(classes.main, 'print-ignore')}
          >
            <section aria-label="Preview">
              <PaperPreview>{children}</PaperPreview>
            </section>
          </Grid>
        </Grid>
        <Footer />
      </PaperOptionsProvider>
    </InstanceOptionsProvider>
  );
}

PrintableUI.defaultProps = {
  defaultOrientation: undefined,
};

export default PrintableUI;
