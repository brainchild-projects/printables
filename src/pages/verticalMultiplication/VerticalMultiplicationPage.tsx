import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeVerticalMultiplicationForm from './CustomizeVerticalMultiplicationForm';
import VerticalMultiplicationData from './VerticalMultiplicationData';
import PreviewVerticalMultiplication from './PreviewVerticalMultiplication';

const defaultData: VerticalMultiplicationData = {
  count: 10,
  multiplier: { from: 0, to: 9 },
  multiplicand: { from: 0, 'to': 9 },
  product: { 'from': 0, 'to': 100 },
  problemGeneration: 'factors',
  columns: 2,
};
const key = 'verticalMultiplication';

function VerticalMultiplicationPage(): JSX.Element {
  const { data, onChange } = usePageState<VerticalMultiplicationData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Vertical Multiplication"
      optionsKey={key}
      customizeForm={(
        <CustomizeVerticalMultiplicationForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewVerticalMultiplication data={data} />
    </PrintableUI>
  );
}

export default VerticalMultiplicationPage;
