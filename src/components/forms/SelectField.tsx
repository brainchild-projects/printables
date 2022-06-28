import Select from '@material-ui/core/Select';
import React from 'react';
import generateId from '../../lib/generateId';
import HtmlFieldChangeEvent from '../../lib/HtmlFieldChangeEvent';
import titleize from '../../lib/titlelize';
import FieldSet from './FieldSet';

interface SelectFieldProps<T extends string> {
  id?: string;
  name: string;
  label?: string;
  onChange: (value: T, event: HtmlFieldChangeEvent) => void;
  value: unknown;
  children?: React.ReactNode;
}

function SelectField<T extends string>({
  id, name, label, onChange, value, children,
}: SelectFieldProps<T>): JSX.Element {
  const theId = id ?? generateId('select', name);
  const theLabel = label ?? titleize(name);
  return (
    <FieldSet
      label={theLabel}
      id={theId}
    >
      <Select
        native
        name={name}
        id={theId}
        fullWidth
        variant="filled"
        value={value}
        onChange={(event) => {
          onChange(event.target.value as T, event as HtmlFieldChangeEvent);
        }}
      >
        {children}
      </Select>
    </FieldSet>
  );
}

SelectField.defaultProps = {
  children: null,
  id: null,
  label: null,
};

export default SelectField;
