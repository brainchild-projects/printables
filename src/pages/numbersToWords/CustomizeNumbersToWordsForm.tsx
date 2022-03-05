import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import NumberField from '../../components/forms/NumberField';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider';
import numberOrEmpty from '../../lib/numberOrEmpty';
import NumbersToWordsData from './NumbersToWordsData';

interface CustomizeNumbersToWordsFormProps {
  onChange: (data: NumbersToWordsData) => void;
  data: NumbersToWordsData;
}

function CustomizeNumbersToWordsForm({
  data, onChange,
}: CustomizeNumbersToWordsFormProps): JSX.Element {
  return (
    <CustomizeForm name="Worksheet">
      <NumberField
        name="count"
        label="Number of Problems"
        value={numberOrEmpty(data.count)}
        onChange={(count) => onChange({ ...data, count })}
      />
      <NumberRangeSlider
        label="Number Range"
        id="number-range-slider"
        data-test="number-range-slider"
        onChange={(range) => {
          onChange({ ...data, range });
        }}
        from={data.range.from}
        to={data.range.to}
        magnitude={3}
      />
    </CustomizeForm>
  );
}

export default CustomizeNumbersToWordsForm;
