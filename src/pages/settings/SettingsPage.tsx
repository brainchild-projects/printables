import React from 'react';
import SettingsForm from './SettingsForm.js';
import MajorPageTitle from '../../elements/MajorPageTitle.js';
import useSettings from '../useSettings.js';
import styleIt from '../../components/styleIt.js';
import Box from '../../components/uiElements/Box.js';

const styles = styleIt(() => ({
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
