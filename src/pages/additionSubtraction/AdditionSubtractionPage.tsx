import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import AdditionSubtractionData from './AdditionSubtractionData.js';
import CustomizeAdditionSubtractionForm from './CustomizeAdditionSubtractionForm.js';
import PreviewAddSub from './PreviewAdditionSubtraction.js';

const defaultData: AdditionSubtractionData = {
  rangeFrom: 0,
  rangeTo: 9,
  count: 10,
  problemGeneration: 'single range',
  customAddendsA: { from: 0, to: 9 },
  customAddendsB: { from: 0, to: 9 },
  fontSize: 20,
  columns: 1,
  blanksOnAddition: true,
  subtractionFirst: false,
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
      <PreviewAddSub data={data} />
    </PrintableUI>
  );
}

export default AdditionSubtractionPage;
