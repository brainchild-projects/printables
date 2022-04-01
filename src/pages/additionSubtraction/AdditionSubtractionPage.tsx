import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import AdditionSubtractionData from './AdditionSubtractionData';
import CustomizeAdditionSubtractionForm from './CustomizeAdditionSubtractionForm';
import PreviewAdditionSubtraction from './PreviewAdditionSubtraction';

const defaultData: AdditionSubtractionData = {
  rangeFrom: 0,
  rangeTo: 9,
  count: 10,
  problemGeneration: 'single range',
  customAddendsA: { from: 0, to: 9 },
  customAddendsB: { from: 0, to: 9 },
  fontSize: 20,
  columns: 1,
};

const dataKey = 'additionSubtraction';

function AdditionSubtractionPage(): JSX.Element {
  const { data, onChange } = usePageState<AdditionSubtractionData>({
    key: dataKey,
    defaultData,
  });

  return (
    <PrintableUI
      title="Addition-Subtraction Relationship"
      optionsKey="aftb"
      customizeForm={(
        <CustomizeAdditionSubtractionForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewAdditionSubtraction data={data} />
    </PrintableUI>
  );
}

export default AdditionSubtractionPage;
