import React, { useState } from 'react';
import {
  AppBar, IconButton,
  Toolbar, Typography,
  createTheme, MuiThemeProvider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { LinkMap } from '../lib/linkMap';
import Sidebar from './Sidebar';

const styles = makeStyles(() => ({
  appBar: {
    backgroundColor: '#333333',
  },
  wrap: {
    minHeight: 64,
  },
  homeLink: {
    color: 'inherit',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

interface PrintablesAppBarProps {
  linkMap: LinkMap;
}

function PrintablesAppBar({ linkMap }: PrintablesAppBarProps): JSX.Element {
  const classes = styles();
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpenSidebar(!openSidebar);
  };

  const closeDrawer = () => {
    setOpenSidebar(false);
  };

  return (
    <div className={classNames(classes.wrap, 'no-print')}>
      <MuiThemeProvider theme={theme}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Open Menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              <Link to="/" className={classes.homeLink}>
                Printables
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar
          open={openSidebar}
          onClose={closeDrawer}
          linkMap={linkMap}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default PrintablesAppBar;
