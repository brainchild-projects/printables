import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizeNumberGridForm from './CustomizeNumberGridForm.js';
import NumberGridData from './NumberGridData.js';
import PreviewNumberGrid from './PreviewNumberGrid.js';

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
