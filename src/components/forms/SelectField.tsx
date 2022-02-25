import Select from '@material-ui/core/Select';
import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import React from 'react';
import FieldSet from './FieldSet';

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  onChange: SelectInputProps['onChange'];
  value: unknown;
  children?: React.ReactNode;
}

function SelectField({
  id, name, label, onChange, value, children,
}: SelectFieldProps): JSX.Element {
  return (
    <FieldSet
      label={label}
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
        {children}
      </Select>
    </FieldSet>
  );
}

SelectField.defaultProps = {
  children: null,
};

export default SelectField;
