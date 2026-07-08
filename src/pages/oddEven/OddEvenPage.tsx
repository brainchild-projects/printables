import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizeOddEvenForm from './CustomizeOddEvenForm.js';
import OddEvenData from './OddEvenData.js';
import PreviewOddEven from './PreviewOddEven.js';

const defaultData: OddEvenData = {
  count: 10,
  problemType: 'blanks',
};
const key = 'oddEven';

function OddEvenPage(): JSX.Element {
  const { data, onChange } = usePageState<OddEvenData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Odd Even"
      optionsKey={key}
      customizeForm={(
        <CustomizeOddEvenForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewOddEven data={data} />
    </PrintableUI>
  );
}

export default OddEvenPage;
