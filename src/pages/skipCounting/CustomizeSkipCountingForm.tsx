import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import SkipCountingData from './SkipCountingData';
import NumberField from '../../components/forms/NumberField';

interface CustomizeSkipCountingFormProps {
  onChange: (data: SkipCountingData) => void;
  data: SkipCountingData;
}

function CustomizeSkipCountingForm({
  data, onChange,
}: CustomizeSkipCountingFormProps): JSX.Element {
  return (
    <CustomizeForm name="Worksheet">
      <NumberField
        name="count"
        label="Count"
        value={data.count}
        onChange={(count) => onChange({ ...data, count })}
      />
      <NumberField
        name="skipCountBy"
        label="Skip Count By"
        value={data.skipCountBy}
        onChange={(skipCountBy) => onChange({ ...data, skipCountBy })}
      />
      <NumberField
        name="columns"
        value={data.columns}
        max={4}
        min={1}
        onChange={(columns) => onChange({ ...data, columns })}
      />
    </CustomizeForm>
  );
}

export default CustomizeSkipCountingForm;
