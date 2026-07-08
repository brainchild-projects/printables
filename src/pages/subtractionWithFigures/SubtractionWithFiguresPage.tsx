import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizeSubtractionWithFiguresForm from './CustomizeSubtractionWithFiguresForm.js';
import SubtractionWithFiguresData from './SubtractionWithFiguresData.js';
import PreviewSubtractionWithFigures from './PreviewSubtractionWithFigures.js';

const defaultData: SubtractionWithFiguresData = {
  count: 10,
  problemGeneration: 'minuend',
  minuend: { from: 2, to: 20 },
  subtrahend: { from: 0, to: 9 },
  difference: { from: 0, to: 9 },
  columns: 2,
};
const key = 'subtractionWithFigures';

function SubtractionWithFiguresPage(): JSX.Element {
  const { data, onChange } = usePageState<SubtractionWithFiguresData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Subtraction with Figures"
      optionsKey={key}
      customizeForm={(
        <CustomizeSubtractionWithFiguresForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewSubtractionWithFigures data={data} />
    </PrintableUI>
  );
}

export default SubtractionWithFiguresPage;
