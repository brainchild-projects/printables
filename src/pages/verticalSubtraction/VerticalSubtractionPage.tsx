import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizeVerticalSubtractionForm from './CustomizeVerticalSubtractionForm.js';
import VerticalSubtractionData from './VerticalSubtractionData.js';
import PreviewVerticalSubtraction from './PreviewVerticalSubtraction.js';

const defaultData: VerticalSubtractionData = {
  problemGeneration: 'subtrahend and difference',
  count: 10,
  minuend: { 'from': 0, 'to': 9 },
  subtrahend: { 'from': 0, 'to': 9 },
  difference: { 'from': 0, 'to': 9 },
  columns: 1,
};
const key = 'verticalSubtraction';

function VerticalSubtractionPage(): JSX.Element {
  const { data, onChange } = usePageState<VerticalSubtractionData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Vertical Subtraction"
      optionsKey={key}
      customizeForm={(
        <CustomizeVerticalSubtractionForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewVerticalSubtraction data={data} />
    </PrintableUI>
  );
}

export default VerticalSubtractionPage;
