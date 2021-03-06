import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import SettingsForm from './SettingsForm';
import MajorPageTitle from '../../elements/MajorPageTitle';
import useSettings from '../useSettings';

const styles = makeStyles(() => ({
  wrap: {
    maxWidth: 500,
    width: '100%',
    margin: '0 auto',
  },
}));

function SettingsPage(): JSX.Element {
  const { data, onChange } = useSettings();
  const classes = styles();
  return (
    <Box className={classes.wrap}>
      <MajorPageTitle>Settings</MajorPageTitle>
      <SettingsForm
        onChange={onChange}
        data={data}
      />
    </Box>
  );
}

export default SettingsPage;
