import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeOddEvenForm from './CustomizeOddEvenForm';
import OddEvenData from './OddEvenData';
import PreviewOddEven from './PreviewOddEven';

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
