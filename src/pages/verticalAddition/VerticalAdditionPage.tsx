import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizeVerticalAdditionForm from './CustomizeVerticalAdditionForm.js';
import VerticalAdditionData from './VerticalAdditionData.js';
import PreviewVerticalAddition from './PreviewVerticalAddition.js';

const defaultData: VerticalAdditionData = {
  count: 10,
  range: { from: 0, to: 9 },
  problemGeneration: 'single range',
  customAddendsA: { from: 0, to: 9 },
  customAddendsB: { from: 0, to: 9 },
  noRegroupingRange: { from: 0, to: 99 },
  columns: 2,
};
const key = 'verticalAddition';

function VerticalAdditionPage(): JSX.Element {
  const { data, onChange } = usePageState<VerticalAdditionData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Vertical Addition"
      optionsKey={key}
      customizeForm={(
        <CustomizeVerticalAdditionForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewVerticalAddition data={data} />
    </PrintableUI>
  );
}

export default VerticalAdditionPage;
