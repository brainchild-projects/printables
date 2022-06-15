import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeNumberGridForm from './CustomizeNumberGridForm';
import NumberGridData from './NumberGridData';
import PreviewNumberGrid from './PreviewNumberGrid';

const defaultData: NumberGridData = {
  skipCountToggle: false,
  skipCount: 10,
  showAnswerKey: true,
  customInstructions: '',
};
const key = 'numberGrid';

function NumberGridPage(): JSX.Element {
  const { data, onChange } = usePageState<NumberGridData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Number Grid"
      optionsKey={key}
      customizeForm={(
        <CustomizeNumberGridForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewNumberGrid data={data} />
    </PrintableUI>
  );
}

export default NumberGridPage;
