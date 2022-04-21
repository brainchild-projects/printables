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
  spaced?: boolean;
}

function TextField({
  id, name, label, onChange, value, spaced = false,
}: TextFieldProps): JSX.Element {
  const theId = id ?? generateId('input-text', name);
  const theLabel = label ?? titleize(name);
  return (
    <FieldSet spaced={spaced}>
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
  spaced: false,
};

export default TextField;
