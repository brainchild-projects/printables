import React, { useEffect, useState } from 'react';
import PrintableUI from '../../components/PrintableUI';
import LocalStore from '../../lib/LocalStore';
import CustomizePlaceValuesForm from './CustomizePlaceValuesForm';
import PlaceValuesData from './PlaceValuesData';
import PreviewPlaceValues from './PreviewPlaceValues';

const defaultPlaceValuesData = {
  count: 10,
  magnitude: 'tens',
} as PlaceValuesData;

function PlaceValuesPage(): JSX.Element {
  const [data, setData] = useState<PlaceValuesData>(defaultPlaceValuesData);
  const dataStore = LocalStore.createCached<PlaceValuesData>('placeValues');
  const onChange = (updatedData: PlaceValuesData): void => {
    const updated = { ...data, ...updatedData };
    dataStore.set(updated);
    setData(updated);
  };

  useEffect(() => {
    const savedData = dataStore.get();
    setData(savedData || defaultPlaceValuesData);
  }, [dataStore]);
  return (
    <PrintableUI
      title="Place Values"
      optionsKey="placeValues"
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
