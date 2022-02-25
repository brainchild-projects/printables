import React from 'react';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import Select from '@material-ui/core/Select/Select';
import FieldSet from './FieldSet';

const fontSizes = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96,
];

interface FontSizeFieldProps {
  id?: string;
  name?: string;
  onChange: SelectInputProps['onChange'];
  value: number;
}

function FontSizeField({
  id = 'select-font-size', name = 'fontSize', onChange, value,
}: FontSizeFieldProps): JSX.Element {
  return (
    <FieldSet
      label="Font Size"
      id={id}
    >
      <Select
        native
        name={name}
        id={id}
        fullWidth
        variant="filled"
        value={value}
        onChange={onChange}
      >
        {
          Array.from(fontSizes.values()).map((size) => (
            <option key={`font-size-${size}`} value={size}>{size}</option>
          ))
        }
      </Select>
    </FieldSet>
  );
}

FontSizeField.defaultProps = {
  id: 'select-font-size',
  name: 'fontSize',
};

export default FontSizeField;
