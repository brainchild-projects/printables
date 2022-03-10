import { useEffect, useState } from 'react';
import LocalStore from '../lib/LocalStore';

interface PageStateArgs<T> {
  key: string,
  defaultData: T,
}

function usePageState<T>({ key, defaultData }: PageStateArgs<T>) {
  const dataStore = LocalStore.createCached<T>(key);
  const [data, setData] = useState<T>({
    ...defaultData, ...dataStore.get(),
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