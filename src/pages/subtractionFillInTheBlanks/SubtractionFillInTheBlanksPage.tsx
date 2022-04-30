import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeSubtractionFillInTheBlanksForm from './CustomizeSubtractionFillInTheBlanksForm';
import SubtractionFillInTheBlanksData from './SubtractionFillInTheBlanksData';
import PreviewSubtractionFillInTheBlanks from './PreviewSubtractionFillInTheBlanks';

const defaultData: SubtractionFillInTheBlanksData = {
  count: 10,
  problemGeneration: 'minuend',
  minuend: { from: 0, to: 9 },
  subtrahend: { from: 0, to: 9 },
  difference: { from: 0, to: 9 },
  blankPosition: 'difference',
  columns: 2,
  fontSize: 20,
};
const key = 'subtractionFillInTheBlanks';

function SubtractionFillInTheBlanksPage(): JSX.Element {
  const { data, onChange } = usePageState<SubtractionFillInTheBlanksData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Subtraction: Fill in the Blanks"
      optionsKey={key}
      customizeForm={(
        <CustomizeSubtractionFillInTheBlanksForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewSubtractionFillInTheBlanks data={data} />
    </PrintableUI>
  );
}

export default SubtractionFillInTheBlanksPage;
