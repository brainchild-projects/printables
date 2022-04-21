import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent } from 'react';
import generateId from '../../lib/generateId';
import parseEventValueAsFloat from '../../lib/parseEventValueAsFloat';
import parseEventValueAsInt from '../../lib/parseEventValueAsInt';
import titleize from '../../lib/titlelize';
import FieldSet from './FieldSet';

interface NumberFieldProps {
  name: string;
  id?: string;
  label?: string;
  onChange: (value: number, event: ChangeEvent) => void;
  value: unknown;
  min?: number;
  max?: number;
  step?: number;
  integer?: boolean;
  spaced?: boolean;
}

function NumberField({
  id, name, label, onChange, value, min, max, step, integer, spaced = false,
}: NumberFieldProps): JSX.Element {
  const theId = id ?? generateId('input-number', name);
  const theLabel = label ?? titleize(name);
  return (
    <FieldSet spaced={spaced}>
      <TextField
        type="number"
        name={name}
        id={theId}
        label={theLabel}
        InputLabelProps={{ shrink: true }}
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e) => {
          const val: number = integer ? parseEventValueAsInt(e) : parseEventValueAsFloat(e);
          onChange(val, e);
        }}
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
  id: null,
  label: null,
  integer: false,
  spaced: false,
};

export default NumberField;
