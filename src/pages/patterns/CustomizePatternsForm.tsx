import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm.js';
import NumberField from '../../components/forms/NumberField.js';
import SelectField from '../../components/forms/SelectField.js';
import stringMapToOptions from '../../components/forms/stringMapToOptions.js';
import PatternsData, { BlankPosition, blankPositions } from './PatternsData.js';

export interface CustomizePatternsFormProps {
  onChange: (data: PatternsData) => void,
  data: PatternsData,
}

function CustomizePatternsForm({
  data, onChange,
}: CustomizePatternsFormProps): JSX.Element {
  return (
    <CustomizeForm
      name="Worksheet"
    >
      <NumberField
        name="count"
        label="Number of Problems"
        value={data.count}
        onChange={(count) => {
          onChange({ ...data, count });
        }}
      />
      <SelectField<BlankPosition>
        name="blankPosition"
        label="Blank Position"
        value={data.blankPosition}
        onChange={(blankPosition) => {
          onChange({
            ...data,
            blankPosition,
          });
        }}
      >
        {stringMapToOptions(blankPositions)}
      </SelectField>
    </CustomizeForm>
  );
}

export default CustomizePatternsForm;
