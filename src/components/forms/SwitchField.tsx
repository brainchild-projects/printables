import React, { ChangeEvent } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import generateId from '../../lib/generateId';
import titleize from '../../lib/titlelize';

interface SwitchFieldProps {
  name: string;
  id?: string;
  label?: string;
  onChange: (value: boolean, event: ChangeEvent) => void;
  value: boolean;
}

function SwitchField({
  id, name, label, onChange, value,
}: SwitchFieldProps): JSX.Element {
  const theId = id ?? generateId('input-text', name);
  const theLabel = label ?? titleize(name);

  return (
    <FormControlLabel
      control={(
        <Switch
          checked={value}
          id={theId}
          onChange={(e) => {
            const val: boolean = e.target.checked;
            onChange(val, e);
          }}
          name={name}
          color="primary"
        />
      )}
      label={theLabel}
    />
  );
}

SwitchField.defaultProps = {
  id: null,
  label: null,
};

export default SwitchField;
