import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizePatternsForm from './CustomizePatternsForm.js';
import PatternsData from './PatternsData.js';
import PreviewPatterns from './PreviewPatterns.js';

const defaultPatternsData: PatternsData = {
  count: 10,
  blankPosition: 'end',
};
const dataKey = 'patterns';

function PatternsPage(): JSX.Element {
  const { data, onChange } = usePageState<PatternsData>({
    key: dataKey, defaultData: defaultPatternsData,
  });

  return (
    <PrintableUI
      title="Patterns"
      optionsKey={dataKey}
      customizeForm={(
        <CustomizePatternsForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewPatterns patternsData={data} />
    </PrintableUI>
  );
}

export default PatternsPage;
