import React from 'react';
import SettingsForm from './SettingsForm';
import MajorPageTitle from '../../elements/MajorPageTitle';
import useSettings from '../useSettings';
import styleIt from '../../components/styleIt';
import Box from '../../components/uiElements/Box';

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
