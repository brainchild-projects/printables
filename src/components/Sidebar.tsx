import React, { useState } from 'react';

import {
  Drawer, IconButton,
  Collapse,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { LinkMap } from '../lib/linkMap';
import { SectionLinks } from '../lib/LinkAndLoaderInterface';
import ListItemLink from './ListItemLink';
import styleIt from './styleIt';
import Box from './uiElements/Box';
import List from './uiElements/List';
import ListItem from './uiElements/ListItem';
import ListItemIcon from './uiElements/ListItemIcon';
import ListItemText from './uiElements/ListItemText';
import Divider from './uiElements/Divider';

interface LinkMapToggle {
  mathLinksOpen: boolean;
  miscLinksOpen: boolean;
}

type LinkMapToggleKey = keyof LinkMapToggle;

const styles = styleIt(() => ({
  nested: {
    paddingLeft: 30,
  },
}));

function nestedLinks(links: SectionLinks): JSX.Element[] {
  const classes = styles();
  return Array.from(links.entries()).map(([path, { text }]) => (
    <ListItem
      button
      key={path}
      component={ListItemLink}
      to={path}
      className={classes.nested}
    >
      <ListItemText>{text}</ListItemText>
    </ListItem>
  ));
}

interface ExpandableLinksProps {
  toggle: () => void;
  open: boolean;
  label: string;
  links: SectionLinks;
}

function ExpandableLinks({
  toggle, open, label, links,
}: ExpandableLinksProps): JSX.Element {
  return (
    <>
      <ListItem button onClick={toggle}>
        <ListItemText>{label}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open}>
        <List>
          {nestedLinks(links)}
        </List>
      </Collapse>
    </>
  );
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  linkMap: LinkMap;
}

function Sidebar({ open, onClose, linkMap }: SidebarProps): JSX.Element {
  const { mathLinks, miscLinks } = linkMap;
  const [openLinks, setOpenLinks] = useState<LinkMapToggle>({
    mathLinksOpen: false,
    miscLinksOpen: false,
  });

  const toggleLinksOpen = (key: LinkMapToggleKey) => () => {
    setOpenLinks({
      ...openLinks,
      [key]: !openLinks[key],
    });
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    // variant="persistent"
    >
      <Box>
        <IconButton
          onClick={onClose}
          aria-label="Close Menu"
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
      <Divider dark />
      <nav aria-label="Sidebar Navigation">
        <List component="div">
          <ExpandableLinks
            label="Math Worksheets"
            toggle={toggleLinksOpen('mathLinksOpen')}
            links={mathLinks}
            open={openLinks.mathLinksOpen}
          />
          <ExpandableLinks
            label="Miscellaneous"
            toggle={toggleLinksOpen('miscLinksOpen')}
            links={miscLinks}
            open={openLinks.miscLinksOpen}
          />
          <Divider dark />

          <ListItem
            button
            component={Link}
            to="/settings"
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
        </List>
      </nav>
    </Drawer>
  );
}

export default Sidebar;
