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
import { SectionLinks } from '../../lib/LinkAndLoaderInterface';

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

interface LinkMap {
  mathLinks: SectionLinks;
}

interface HomePageProps {
  linkMap: LinkMap;
}

function sectionLinksToListItem(links: SectionLinks): Array<JSX.Element> {
  return Array.from(links.entries()).map(([path, { text }]) => (
    <ListItem key={path}>
      <ListItemText>
        <LinkRouter to={path}>{text}</LinkRouter>
      </ListItemText>
    </ListItem>
  ));
}

function HomePage({ linkMap }: HomePageProps): JSX.Element {
  const { mathLinks } = linkMap;
  const classes = paperStyles();
  return (
    <div className={classes.wrapper}>
      <Hero title="Printables" subtitle="Printable Materials for Education" />
      <Container>
        <Paper className={classes.mainContent}>
          <Typography variant="h4" component="h2">Math Worksheets</Typography>
          <List className={classes.list} aria-label="Worksheets">
            {sectionLinksToListItem(mathLinks)}
          </List>
          <Typography variant="h4" component="h2">Miscellaneous</Typography>
          <List className={classes.list}>
            <ListItem>
              <ListItemText secondary="Generate a printable calendar for the month">
                <LinkRouter to="/calendar">Calendar</LinkRouter>
              </ListItemText>
            </ListItem>
          </List>
        </Paper>
        <Footer />
      </Container>
    </div>
  );
}

export default HomePage;
