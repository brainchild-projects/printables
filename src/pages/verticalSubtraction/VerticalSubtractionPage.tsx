import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeVerticalSubtractionForm from './CustomizeVerticalSubtractionForm';
import VerticalSubtractionData from './VerticalSubtractionData';
import PreviewVerticalSubtraction from './PreviewVerticalSubtraction';

const defaultData: VerticalSubtractionData = {
  count: 10,
  minuend: { 'from':0, 'to':9 },
  subtrahend: { 'from':0, 'to':9 },
  difference: { 'from':0, 'to':9 },
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
