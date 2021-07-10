import React from 'react';
import {
  AppBar, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = makeStyles(() => ({
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

const PrintablesAppBar = (): JSX.Element => {
  const classes = styles();
  return (
    <div className={classes.wrap}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            <Link to="/" className={classes.homeLink}>
              Printables
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PrintablesAppBar;
