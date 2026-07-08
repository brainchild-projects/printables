import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import AftbData from './AftbData.js';
import CustomizeAftbForm from './CustomizeAftbForm.js';
import PreviewAftb from './PreviewAftb.js';

const defaultAftbData = {
  rangeFrom: 0,
  rangeTo: 9,
  sumRangeFrom: 0,
  sumRangeTo: 9,
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
          data={data}
        />
      )}
    >
      <PreviewAftb aftbData={data} />
    </PrintableUI>
  );
}

export default AdditionFillTheBlanksPage;
