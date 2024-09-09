import React from 'react';
import CustomizeForm from '../../components/forms/CustomizeForm';
import VerticalMultiplicationData, { problemGenerationOptions } from './VerticalMultiplicationData';
import NumberField from '../../components/forms/NumberField';
import NumberRangeSlider from '../../components/forms/NumberRangeSlider';
import SelectField from '../../components/forms/SelectField';
import stringMapToOptions from '../../components/forms/stringMapToOptions';
import { ProblemGeneration } from '../../lib/math/generateMultiplicationProblems';

interface CustomizeVerticalMultiplicationFormProps {
  onChange: (data: VerticalMultiplicationData) => void;
  data: VerticalMultiplicationData;
}

function CustomizeVerticalMultiplicationForm({
  data, onChange,
}: CustomizeVerticalMultiplicationFormProps): JSX.Element {
  const { problemGeneration } = data;
  let generationOptions: JSX.Element;
  switch (problemGeneration) {
    case 'product':
      generationOptions = (
        <NumberRangeSlider
          label="Product"
          id="numberRangeProduct"
          from={data.product.from}
          to={data.product.to}
          magnitude={2}
          onChange={(product) => onChange({ ...data, product })}
        />
      );
      break;
    default:
      generationOptions = (
        <>
          <NumberRangeSlider
            label="Multiplier"
            id="numberRangeMultiplier"
            from={data.multiplier.from}
            to={data.multiplier.to}
            magnitude={2}
            onChange={(multiplier) => onChange({ ...data, multiplier })}
          />
          <NumberRangeSlider
            label="Multiplicand"
            id="numberRangeMultiplicand"
            from={data.multiplicand.from}
            to={data.multiplicand.to}
            magnitude={2}
            onChange={(multiplicand) => onChange({ ...data, multiplicand })}
          />
        </>
      );
      break;
  }
  return (
    <CustomizeForm name="Worksheet">
      <NumberField
        name="count"
        label="Count"
        value={data.count}
        onChange={(count) => onChange({ ...data, count })}
      />
      <SelectField
        name="problemGeneration"
        label="Problem Generation"
        value={problemGeneration}
        onChange={(value: unknown) => {
          onChange({
            ...data,
            problemGeneration: value as ProblemGeneration,
          });
        }}
      >
        {stringMapToOptions(problemGenerationOptions)}
      </SelectField>
      {generationOptions}
      <NumberField
        name="columns"
        label="Columns"
        value={data.columns}
        onChange={(columns) => onChange({ ...data, columns })}
      />
    </CustomizeForm>
  );
}

export default CustomizeVerticalMultiplicationForm;
