import React from 'react';
import PrintableUI from '../../components/PrintableUI';
import usePageState from '../usePageState';
import CustomizePlaceValuesForm from './CustomizePlaceValuesForm';
import PlaceValuesData from './PlaceValuesData';
import PreviewPlaceValues from './PreviewPlaceValues';

const defaultPlaceValuesData = {
  count: 10,
  magnitude: 'tens',
} as PlaceValuesData;
const dataKey = 'placeValues';

function PlaceValuesPage(): JSX.Element {
  const { data, onChange } = usePageState<PlaceValuesData>({
    key: dataKey, defaultData: defaultPlaceValuesData,
  });
  return (
    <PrintableUI
      title="Place Values"
      optionsKey={dataKey}
      customizeForm={(
        <CustomizePlaceValuesForm
          onChange={onChange}
          initialData={data}
        />
      )}
    >
      <PreviewPlaceValues customData={data} />
    </PrintableUI>
  );
}

export default PlaceValuesPage;
