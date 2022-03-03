import React, { useState } from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import NumberField from '../../components/forms/NumberField';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';
import numberOrEmpty from '../../lib/numberOrEmpty';
import PlaceValuesData from './PlaceValuesData';

const magnitudes: Map<string, string> = new Map([
  ['tens', 'Tens'], ['hundreds', 'Hundreds'],
]);

interface CustomizePlaceValuesFormProps {
  onChange: (data: PlaceValuesData) => void;
  initialData: PlaceValuesData;
}

function CustomizePlaceValuesForm({
  initialData, onChange,
}: CustomizePlaceValuesFormProps): JSX.Element {
  const [data, setData] = useState<PlaceValuesData>(initialData);

  const updateData = (updated: PlaceValuesData): void => {
    setData(updated);
    onChange(updated);
  };

  return (
    <CustomizeForm
      onBeforePrint={() => true}
      name="Worksheet"
    >
      <NumberField
        name="count"
        label="Number of Problems"
        value={numberOrEmpty(data.count)}
        onChange={(count) => {
          updateData({ ...data, count });
        }}
      />
      <SelectField
        name="magnitude"
        value={data.magnitude}
        onChange={(value) => {
          updateData({ ...data, magnitude: value });
        }}
      >
        {stringMapToOptions(magnitudes)}
      </SelectField>
    </CustomizeForm>
  );
}

export default CustomizePlaceValuesForm;
