import React, { useEffect, useState } from 'react';
import PrintableUI from '../../components/PrintableUI';
import LocalStore from '../../lib/LocalStore';
import CustomizePatternsForm from './CustomizePatternsForm';
import PatternsData from './PatternsData';
import PreviewPatterns from './PreviewPatterns';

const defaultPatternsData: PatternsData = {
  count: 10,
};

function PatternsPage(): JSX.Element | null {
  const [data, setData] = useState<PatternsData | null>(defaultPatternsData);
  const dataStore = LocalStore.createCached<PatternsData>('patterns');
  const onChange = (updatedData: PatternsData): void => {
    const updated = { ...data, ...updatedData };
    dataStore.set(updated);
    setData(updated);
  };

  useEffect(() => {
    const savedData = dataStore.get();
    setData(savedData || defaultPatternsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStore]);

  if (data === null) {
    return null;
  }

  return (
    <PrintableUI
      title="Patterns"
      optionsKey="patterns"
      customizeForm={(
        <CustomizePatternsForm
          onBeforePrint={() => true}
          onChange={onChange}
          initialData={data}
        />
      )}
    >
      <PreviewPatterns patternsData={data} />
    </PrintableUI>
  );
}

export default PatternsPage;
