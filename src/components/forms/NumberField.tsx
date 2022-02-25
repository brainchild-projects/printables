import { InputProps } from '@material-ui/core/Input/Input';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import FieldSet from './FieldSet';

interface NumberFieldProps {
  id: string;
  name: string;
  label: string;
  onChange: InputProps['onChange'];
  value: unknown;
  min?: number;
  max?: number;
  step?: number;
}

function NumberField({
  id, name, label, onChange, value, min, max, step,
}: NumberFieldProps): JSX.Element {
  return (
    <FieldSet>
      <TextField
        type="number"
        name={name}
        id={id}
        label={label}
        InputLabelProps={{ shrink: true }}
        fullWidth
        variant="outlined"
        value={value}
        onChange={onChange}
        inputProps={{
          min, max, step,
        }}
      />
    </FieldSet>
  );
}

NumberField.defaultProps = {
  min: null,
  max: null,
  step: null,
};

export default NumberField;
