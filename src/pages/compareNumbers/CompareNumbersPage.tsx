import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizeCompareNumbersForm from './CustomizeCompareNumbersForm.js';
import CompareNumbersData from './CompareNumbersData.js';
import PreviewCompareNumbers from './PreviewCompareNumbers.js';

const defaultData: CompareNumbersData = {
  count: 10,
  magnitude: 'tens',
  columns: 1,
};
const key = 'compareNumbers';

function CompareNumbersPage(): JSX.Element {
  const { data, onChange } = usePageState<CompareNumbersData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Compare Numbers"
      optionsKey={key}
      customizeForm={(
        <CustomizeCompareNumbersForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewCompareNumbers data={data} />
    </PrintableUI>
  );
}

export default CompareNumbersPage;
