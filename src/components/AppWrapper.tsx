import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, makeStyles, MuiThemeProvider } from '@material-ui/core';
import BaseStyle from './BaseStyle';
import PrintablesAppBar from './PrintablesAppBar';
import ScrollToTop from './ScrollToTop';
import {
  allLinks, basePath, mainLinks, mathLinks, miscLinks,
} from '../lib/linkMap';

const styles = makeStyles(() => ({
  main: {
    backgroundSize: 'cover',
    padding: '76px 0 0',
  },
}));

const theme = createTheme({
  palette: {
    background: {
      default: '#efedee',
      paper: '#ffffff',
    },
  },
});

const linkMap = {
  allLinks, miscLinks, mainLinks, mathLinks,
};

function AppWrapper(): JSX.Element {
  const classes = styles();
  const routes: Array<JSX.Element> = Array.from(allLinks.entries())
    .map(([path, link]) => {
      if (path === '/') {
        return <Route path={path} key={path} element={<link.loader linkMap={linkMap} />} />;
      }
      return <Route path={path} key={path} element={<link.loader />} />;
    });
  return (
    <Router basename={basePath}>
      <ScrollToTop />
      <MuiThemeProvider theme={theme}>
        <BaseStyle />
        <PrintablesAppBar linkMap={linkMap} />
        <main className={`${classes.main} print-ignore print-auto-max-width AppWrapper`}>
          <Routes>{routes}</Routes>
        </main>
      </MuiThemeProvider>
    </Router>
  );
}

export default AppWrapper;
