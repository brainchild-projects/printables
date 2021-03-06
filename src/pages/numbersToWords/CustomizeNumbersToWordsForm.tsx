import React from 'react';
import arrayToOptions from '../../components/forms/arrayToOptions';
import CustomizeForm from '../../components/forms/CustomizeForm';
import NumberField from '../../components/forms/NumberField';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';
import { Magnitude, magnitudes } from '../../lib/math/magnitude';
import NumbersToWordsData, { NumbersToWordsProblemType, problemTypes } from './NumbersToWordsData';

interface CustomizeNumbersToWordsFormProps {
  onChange: (data: NumbersToWordsData) => void;
  data: NumbersToWordsData;
}

function CustomizeNumbersToWordsForm({
  data, onChange,
}: CustomizeNumbersToWordsFormProps): JSX.Element {
  return (
    <CustomizeForm name="Worksheet">
      <SelectField<NumbersToWordsProblemType>
        name="problemType"
        value={data.problemType}
        onChange={(problemType) => onChange({ ...data, problemType })}
      >
        {stringMapToOptions(problemTypes)}
      </SelectField>
      <NumberField
        name="count"
        label="Number of Problems"
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
    </CustomizeForm>
  );
}

export default CustomizeNumbersToWordsForm;
