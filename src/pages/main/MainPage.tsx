import React from 'react';
import {
  List, ListItem, ListItemText, Container,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import Hero from '../../components/Hero';
import Footer from './Footer';
import LinkRouter from '../../elements/LinkRouter';

const paperStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundImage: 'url(/printables-bg2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    margin: '-76px 0',
    minHeight: 'calc(100vh - 64px)',
  },
  mainContent: {
    padding: theme.spacing(4),
    maxWidth: 500,
    margin: '0 auto',
  },
  list: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
  },
}));

interface NavigationLink {
  path: string;
  text: string;
}

const worksheetlinks: NavigationLink[] = [
  {
    path: '/addition-fill-the-blanks',
    text: 'Addition: Fill the Blanks',
  },
  {
    path: '/worksheet-patterns',
    text: 'Patterns',
  },
  {
    path: '/worksheet-place-values',
    text: 'Place Values',
  },
  {
    path: '/worksheet-numbers-to-words',
    text: 'Numbers to Words',
  },
];

function MainPage(): JSX.Element {
  const classes = paperStyles();
  return (
    <div className={classes.wrapper}>
      <Hero title="Printables" subtitle="Printable Materials for Education" />
      <Container>
        <Paper className={classes.mainContent}>
          <Typography variant="h4" component="h2">Common</Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText secondary="Generate a printable calendar for the month">
                <LinkRouter to="/calendar">Calendar</LinkRouter>
              </ListItemText>
            </ListItem>
          </List>
          <Typography variant="h4" component="h2">Worksheets</Typography>
          <List className={classes.list} aria-label="Worksheets">
            {
              worksheetlinks.map(({ path, text }) => (
                <ListItem key={path}>
                  <ListItemText>
                    <LinkRouter to={path}>{text}</LinkRouter>
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
        </Paper>
        <Footer />
      </Container>
    </div>
  );
}

export default MainPage;
