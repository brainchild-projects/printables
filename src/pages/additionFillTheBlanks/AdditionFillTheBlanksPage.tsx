import React, { useState } from 'react';
import PrintableUI from '../../components/PrintableUI';
import AftbData from './AftbData';
import CustomizeAftbForm from './CustomizeAftbForm';
import PreviewAftb from './PreviewAftb';

const AdditionFillTheBlanksPage = (): JSX.Element => {
  const [aftbData, setAftbData] = useState<AftbData>(({
    rangeFrom: 0,
    rangeTo: 9,
    problems: 20,
    blankStrategy: 'sum',
    problemGeneration: 'single range',
    customAddendsA: { from: 0, to: 9 },
    customAddendsB: { from: 0, to: 9 },
  }));
  const onPrint = () => true;
  const onChange = (data: AftbData): void => {
    setAftbData({ ...aftbData, ...data });
  };

  return (
    <PrintableUI
      title="Addition: Fill in the Blanks"
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
