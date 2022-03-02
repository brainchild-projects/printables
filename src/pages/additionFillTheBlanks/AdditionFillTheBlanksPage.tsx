import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
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
  fontSize: 20,
  columns: 2,
} as AftbData;

const dataKey = 'aftbData';

function AdditionFillTheBlanksPage(): JSX.Element {
  const { data, onChange } = usePageState<AftbData>({
    key: dataKey,
    defaultData: defaultAftbData,
  });

  return (
    <PrintableUI
      title="Addition: Fill in the Blanks"
      optionsKey="aftb"
      customizeForm={(
        <CustomizeAftbForm
          onChange={onChange}
          initialData={data}
        />
      )}
    >
      <PreviewAftb aftbData={data} />
    </PrintableUI>
  );
}

export default AdditionFillTheBlanksPage;
