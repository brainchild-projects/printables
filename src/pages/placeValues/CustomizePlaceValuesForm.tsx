import React, { ChangeEvent, useState } from 'react';
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
        id="input-place-values-count"
        label="Number of Problems"
        value={numberOrEmpty(data.count)}
        onChange={(event: ChangeEvent<{ value: unknown; }>) => {
          const count = Number.parseInt(event.target.value as string, 10);
          updateData({ ...data, count });
        }}
      />
      <SelectField
        name="magnitude"
        id="select-magnitude"
        label="Magnitude"
        value={data.magnitude}
        onChange={(event) => {
          updateData({ ...data, magnitude: event.target.value as string });
        }}
      >
        {stringMapToOptions(magnitudes)}
      </SelectField>
    </CustomizeForm>
  );
}

export default CustomizePlaceValuesForm;
