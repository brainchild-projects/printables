import React from 'react';
import arrayToOptions from './arrayToOptions';
import SelectField from './SelectField';
import { getPaperSizeFromName, paperSizeArray } from '../../lib/paperSizes';
import PaperSize from '../../lib/PaperSize';
import useSettings from '../../pages/useSettings';

interface SelectPaperSizeFieldProps {
  name?: string;
  label?: string | undefined;
  id?: string | undefined;
  paperSizes?: PaperSize[] | undefined;
  value: PaperSize;
  onChange: (value: PaperSize) => void;
}

function SelectPaperSizeField({
  value, onChange, label, id, name = 'paperSize', paperSizes,
}: SelectPaperSizeFieldProps): JSX.Element {
  const settings = useSettings();
  const combinedPaperSizes = paperSizes ?? [
    ...paperSizeArray,
    ...settings.data.customPaperSizes,
  ];
  const onChangePaperSize = (sizeName: string) => {
    onChange(getPaperSizeFromName(sizeName, combinedPaperSizes));
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
        arrayToOptions(combinedPaperSizes.map((size) => size.name))
      }
    </SelectField>
  );
}

SelectPaperSizeField.defaultProps = {
  name: 'paperSize',
  label: undefined,
  id: undefined,
  paperSizes: undefined,
};

export default SelectPaperSizeField;
