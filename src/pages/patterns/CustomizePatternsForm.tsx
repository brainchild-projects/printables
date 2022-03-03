import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import NumberField from '../../components/forms/NumberField';
import numberOrEmpty from '../../lib/numberOrEmpty';
import PatternsData from './PatternsData';

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
        value={numberOrEmpty(data.count)}
        onChange={(count) => {
          onChange({ ...data, count });
        }}
      />
    </CustomizeForm>
  );
}

export default CustomizePatternsForm;
