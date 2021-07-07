import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const PrintablesAppBar = (): JSX.Element => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6">Printables</Typography>
    </Toolbar>
  </AppBar>
);

export default PrintablesAppBar;
