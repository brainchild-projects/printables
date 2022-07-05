import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeNumbersToWordsForm from './CustomizeNumbersToWordsForm';
import NumbersToWordsData from './NumbersToWordsData';
import PreviewNumbersToWords from './PreviewNumbersToWords';

const defaultData: NumbersToWordsData = {
  magnitude: 'tens',
  count: 10,
};
const key = 'numbersToWords';

function NumbersToWordsPage(): JSX.Element {
  const { data, onChange } = usePageState<NumbersToWordsData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Numbers to Words"
      optionsKey={key}
      customizeForm={(
        <CustomizeNumbersToWordsForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewNumbersToWords customData={data} />
    </PrintableUI>
  );
}

export default NumbersToWordsPage;
