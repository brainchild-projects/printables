import { useEffect, useState } from 'react';
import LocalStore, { FromJSON, ToJSON } from '../lib/LocalStore';

interface PageStateArgs<T, K = T> {
  key: string,
  defaultData: T,
  toJSON?: ToJSON<T, K> | undefined;
  fromJSON?: FromJSON<T, K> | undefined;
}

function usePageState<T, K = T>({
  key, defaultData, toJSON, fromJSON,
}: PageStateArgs<T, K>) {
  const dataStore = LocalStore.createCached<T, K>({
    key, toJSON, fromJSON,
  });
  const cached = dataStore.get();
  const [data, setData] = useState<T>({
    ...defaultData,
    ...(cached || {}),
  } as T);
  const onChange = (updatedData: T): void => {
    const updated = { ...data, ...updatedData };
    dataStore.set(updated);
    setData(updated);
  };

  useEffect(() => {
    const savedData = dataStore.get();
    if (savedData) {
      setData({ ...defaultData, ...savedData });
    } else {
      setData(defaultData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStore]);

  return { data, setData, onChange };
}

export default usePageState;
