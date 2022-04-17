import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeSubtractionWithFiguresForm from './CustomizeSubtractionWithFiguresForm';
import SubtractionWithFiguresData from './SubtractionWithFiguresData';
import PreviewSubtractionWithFigures from './PreviewSubtractionWithFigures';

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
