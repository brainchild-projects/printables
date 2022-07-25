import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeCompareNumbersForm from './CustomizeCompareNumbersForm';
import CompareNumbersData from './CompareNumbersData';
import PreviewCompareNumbers from './PreviewCompareNumbers';

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
