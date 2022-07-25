import React from 'react';
import { Divider } from '@material-ui/core';
import CustomizeForm from '../../components/forms/CustomizeForm';
import CompareNumbersData from './CompareNumbersData';
import NumberField from '../../components/forms/NumberField';
import { Magnitude, magnitudes } from '../../lib/math/magnitude';
import SelectField from '../../components/forms/SelectField';
import arrayToOptions from '../../components/forms/arrayToOptions';

interface CustomizeCompareNumbersFormProps {
  onChange: (data: CompareNumbersData) => void;
  data: CompareNumbersData;
}

function CustomizeCompareNumbersForm({
  data, onChange,
}: CustomizeCompareNumbersFormProps): JSX.Element {
  return (
    <CustomizeForm name="Worksheet">
      <NumberField
        name="count"
        label="Count"
        value={data.count}
        onChange={(count) => onChange({ ...data, count })}
      />
      <SelectField<Magnitude>
        name="magnitude"
        value={data.magnitude}
        onChange={(magnitude) => onChange({ ...data, magnitude })}
      >
        {arrayToOptions(magnitudes, true)}
      </SelectField>

      <Divider variant="middle" />
      <NumberField
        name="columns"
        value={data.columns}
        onChange={(columns) => onChange({ ...data, columns })}
        min={1}
        max={10}
      />

    </CustomizeForm>
  );
}

export default CustomizeCompareNumbersForm;
