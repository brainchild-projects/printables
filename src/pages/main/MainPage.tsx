import React from 'react';
import { Link } from 'react-router-dom';
import {
  List, ListItem, ListItemText, Container,
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core';
import Hero from '../../components/Hero';

const paperStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundImage: 'url(https://dl.dropboxusercontent.com/s/znjm86wbjxql2dh/printables-bg2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '-76px 0',
    minHeight: 'calc(100vh - 64px)',
  },
  mainContent: {
    padding: theme.spacing(4),
  },
}));

const MainPage = (): JSX.Element => {
  const classes = paperStyles();
  return (
    <div className={classes.wrapper}>
      <Hero title="Printables" subtitle="Printable materials for Education" />
      <Container>
        <Paper className={classes.mainContent}>
          <Typography variant="h4" component="h2">Common</Typography>
          <List>
            <ListItem>
              <ListItemText secondary="Generate a printable calendar for the month">
                <Link to="/calendar">Calendar</Link>
              </ListItemText>
            </ListItem>
          </List>
          <Typography variant="h4" component="h2">Worksheets</Typography>
          <List aria-label="Worksheets">
            <ListItem>
              <ListItemText>
                <Link to="/addition-fill-the-blanks">Addition: Fill the Blanks</Link>
              </ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Container>
    </div>
  );
};

export default MainPage;
