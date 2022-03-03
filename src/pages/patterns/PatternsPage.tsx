import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizePatternsForm from './CustomizePatternsForm';
import PatternsData from './PatternsData';
import PreviewPatterns from './PreviewPatterns';

const defaultPatternsData: PatternsData = {
  count: 10,
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
