import React from 'react';
import PrintableUI from '../../components/PrintableUI.js';
import usePageState from '../usePageState.js';
import CustomizePlaceValuesForm from './CustomizePlaceValuesForm.js';
import PlaceValuesData from './PlaceValuesData.js';
import PreviewPlaceValues from './PreviewPlaceValues.js';

const defaultPlaceValuesData: PlaceValuesData = {
  count: 10,
  magnitude: 'tens',
  solution: 'blanks',
  columns: 1,
};
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
          data={data}
        />
      )}
    >
      <PreviewPlaceValues customData={data} />
    </PrintableUI>
  );
}

export default PlaceValuesPage;
