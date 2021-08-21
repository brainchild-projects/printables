import React, { useEffect, useState } from 'react';
import PrintableUI from '../../components/PrintableUI';
import LocalStore from '../../lib/LocalStore';
import AftbData from './AftbData';
import CustomizeAftbForm from './CustomizeAftbForm';
import PreviewAftb from './PreviewAftb';

const defaultAftbData = {
  rangeFrom: 0,
  rangeTo: 9,
  problems: 20,
  blankStrategy: 'sum',
  problemGeneration: 'single range',
  customAddendsA: { from: 0, to: 9 },
  customAddendsB: { from: 0, to: 9 },
} as AftbData;

const AdditionFillTheBlanksPage = (): JSX.Element => {
  const [aftbData, setAftbData] = useState<AftbData | null>(null);
  const onPrint = () => true;
  const aftbDataStore = LocalStore.create<AftbData>('aftbData');
  const onChange = (data: AftbData): void => {
    const updated = { ...aftbData, ...data };
    aftbDataStore.set(updated);
    setAftbData(updated);
  };

  useEffect(() => {
    const savedData = aftbDataStore.get();
    setAftbData(savedData || defaultAftbData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (aftbData === null) {
    return <></>;
  }

  return (
    <PrintableUI
      title="Addition: Fill in the Blanks"
      optionsKey="aftb"
      customizeForm={(
        <CustomizeAftbForm
          onBeforePrint={onPrint}
          onChange={onChange}
          initialData={aftbData}
        />
      )}
    >
      <PreviewAftb aftbData={aftbData} />
    </PrintableUI>
  );
};

export default AdditionFillTheBlanksPage;
