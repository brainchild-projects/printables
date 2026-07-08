import React from 'react';
import arrayToOptions from '../../components/forms/arrayToOptions.js';
import CustomizeForm from '../../components/forms/CustomizeForm.js';
import NumberField from '../../components/forms/NumberField.js';
import SelectField from '../../components/forms/SelectField.js';
import stringMapToOptions from '../../components/forms/stringMapToOptions.js';
import { Magnitude, magnitudes } from '../../lib/math/magnitude.js';
import NumbersToWordsData, { NumbersToWordsProblemType, problemTypes } from './NumbersToWordsData.js';
import Divider from '../../components/uiElements/Divider.js';
import FontSizeField from '../../components/forms/FontSizeField.js';

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

      <Divider variant="middle" />


      <FontSizeField
        value={data.fontSize}
        onChange={(fontSize) => onChange({ ...data, fontSize })}
      />
    </CustomizeForm >
  );
}

export default CustomizeNumbersToWordsForm;
