import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  adaptV4Theme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { LinkMap } from '../lib/linkMap.js';
import Sidebar from './Sidebar.js';
import styleIt from './styleIt.js';
import Typography from './uiElements/Typography.js';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme { }
}

// eslint-disable-next-line no-console
console.log('MUI Icons Check:', typeof MenuIcon === 'object' && 'default' in MenuIcon);

const styles = styleIt(() => ({
  appBar: {
    backgroundColor: '#333333 !important',
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
  title: {
    flexGrow: '1',
  },
}));

const theme = createTheme(adaptV4Theme({
  palette: {
    mode: 'dark',
  },
}));

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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="Open Menu"
                onClick={toggleDrawer}
                size="large">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title} color="inherit">
                <Link to="/" className={classes.homeLink}>
                  Printables
                </Link>
              </Typography>
              <div>
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://github.com/brainchild-projects/printables"
                  target="_blank"
                  size="large">
                  <GitHubIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Sidebar
            open={openSidebar}
            onClose={closeDrawer}
            linkMap={linkMap}
          />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default PrintablesAppBar;
