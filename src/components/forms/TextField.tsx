import MuiTextField from '@material-ui/core/TextField';
import React, { ChangeEvent } from 'react';
import generateId from '../../lib/generateId';
import titleize from '../../lib/titlelize';
import FieldSet from './FieldSet';

interface TextFieldProps {
  name: string;
  id?: string;
  label?: string;
  onChange: (value: string, event: ChangeEvent) => void;
  value: unknown;
}

function TextField({
  id, name, label, onChange, value,
}: TextFieldProps): JSX.Element {
  const theId = id ?? generateId('input-text', name);
  const theLabel = label ?? titleize(name);
  return (
    <FieldSet>
      <MuiTextField
        name={name}
        id={theId}
        label={theLabel}
        InputLabelProps={{ shrink: true }}
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e) => {
          const val: string = e.target.value;
          onChange(val, e);
        }}
      />
    </FieldSet>
  );
}

TextField.defaultProps = {
  id: null,
  label: null,
};

export default TextField;
