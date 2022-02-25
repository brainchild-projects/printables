import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import FieldSet from '../../components/forms/FieldSet';
import NumberField from '../../components/forms/NumberField';
import numberOrEmpty from '../../lib/numberOrEmpty';
import PatternsData from './PatternsData';

export interface CustomizePatternsFormProps {
  onBeforePrint: (data: PatternsData) => boolean,
  onChange: (data: PatternsData) => void,
  initialData: PatternsData,
}

function CustomizePatternsForm({
  initialData, onChange,
}: CustomizePatternsFormProps): JSX.Element {
  const [data, setData] = useState<PatternsData>(initialData);

  const updateData = (updated: PatternsData): void => {
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
        id="input-patterns-count"
        label="Number of Problems"
        value={numberOrEmpty(data.count)}
        onChange={(event: ChangeEvent<{ value: unknown }>) => {
          const count = Number.parseInt(event.target.value as string, 10);
          updateData({ ...data, count });
        }}
      />
    </CustomizeForm>
  );
}

export default CustomizePatternsForm;
