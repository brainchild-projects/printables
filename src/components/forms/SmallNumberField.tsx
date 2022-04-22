import React from 'react';
import { FormControl, InputProps, TextField } from '@material-ui/core';
import './SmallNumberField.css';
import generateId from '../../lib/generateId';
import titleize from '../../lib/titlelize';

interface SmallNumberFieldProps {
  name: string;
  id?: string;
  label?: string;
  value: number;
  onChange: InputProps['onChange'];
  min?: number | undefined;
  max?: number | undefined;
}

function SmallNumberField({
  name, id = undefined, label = undefined, value, onChange, min = 0, max,
}: SmallNumberFieldProps): JSX.Element {
  const theId = id ?? generateId('input-number', name);
  const theLabel = label ?? titleize(name);
  return (
    <FormControl>
      <TextField
        id={theId}
        value={value}
        name={name}
        margin="dense"
        onChange={onChange}
        type="number"
        label={theLabel}
        variant="outlined"
        size="small"
        inputProps={{
          step: 1,
          min,
          max,
          type: 'number',
          className: 'hidden-spinners',
          'data-testid': theId,
        }}
      />
    </FormControl>
  );
}

SmallNumberField.defaultProps = {
  min: 0,
  max: undefined,
  id: undefined,
  label: undefined,
};

export default SmallNumberField;
