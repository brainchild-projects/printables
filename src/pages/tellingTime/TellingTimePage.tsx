import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizeTellingTimeForm from './CustomizeTellingTimeForm';
import TellingTimeData from './TellingTimeData';
import PreviewTellingTime from './PreviewTellingTime';

const defaultData: TellingTimeData = {
  count: 9,
  problemType: 'hours',
  columns: 3,
};
const key = 'tellingTime';

function TellingTimePage(): JSX.Element {
  const { data, onChange } = usePageState<TellingTimeData>({
    key, defaultData,
  });
  return (
    <PrintableUI
      title="Telling Time"
      optionsKey={key}
      customizeForm={(
        <CustomizeTellingTimeForm
          onChange={onChange}
          data={data}
        />
      )}
    >
      <PreviewTellingTime data={data} />
    </PrintableUI>
  );
}

export default TellingTimePage;
