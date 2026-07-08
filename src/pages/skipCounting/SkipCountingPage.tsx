import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizeSkipCountingForm from './CustomizeSkipCountingForm.js';
import SkipCountingData from './SkipCountingData.js';
import PreviewSkipCounting from './PreviewSkipCounting.js';

const defaultData: SkipCountingData = {
  count: 10,
  skipCountBy: 10,
  columns: 1,
};
const key = 'skipCounting';

function SkipCountingPage(): JSX.Element {
  const { data, onChange } = usePageState<SkipCountingData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Skip Counting"
      optionsKey={key}
      customizeForm={(
        <CustomizeSkipCountingForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewSkipCounting data={data} />
    </PrintableUI>
  );
}

export default SkipCountingPage;
