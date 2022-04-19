import React from 'react';
import arrayToOptions from './arrayToOptions';
import SelectField from './SelectField';
import paperSizes, { getPaperSizeFromName, PaperSize } from '../../lib/paperSizes';

interface SelectPaperSizeFieldProps {
  name?: string;
  label?: string | undefined;
  id?: string | undefined;
  value: PaperSize;
  onChange: (value: PaperSize) => void;
}

function SelectPaperSizeField({
  value, onChange, label, id, name = 'paperSize',
}: SelectPaperSizeFieldProps): JSX.Element {
  const onChangePaperSize = (sizeName: string) => {
    onChange(getPaperSizeFromName(sizeName));
  };
  return (
    <SelectField
      name={name}
      id={id}
      value={value.name}
      label={label}
      onChange={onChangePaperSize}
    >
      {
        arrayToOptions(
          Array.from(paperSizes.values()).map((size) => size.name),
        )
      }
    </SelectField>
  );
}

SelectPaperSizeField.defaultProps = {
  name: 'paperSize',
  label: undefined,
  id: undefined,
};

export default SelectPaperSizeField;
