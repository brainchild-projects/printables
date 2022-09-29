import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import OddEvenData from './OddEvenData';
import NumberField from '../../components/forms/NumberField';

interface CustomizeOddEvenFormProps {
  onChange: (data: OddEvenData) => void;
  data: OddEvenData;
}

function CustomizeOddEvenForm({
  data, onChange,
}: CustomizeOddEvenFormProps): JSX.Element {
  return (
    <CustomizeForm name="Worksheet">
      <NumberField
        name="count"
        label="Count"
        value={data.count}
        onChange={(count) => onChange({ ...data, count })}
      />
    </CustomizeForm>
  );
}

export default CustomizeOddEvenForm;
