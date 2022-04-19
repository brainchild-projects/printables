import { useEffect, useState } from 'react';
import LocalStore from '../lib/LocalStore';

type TransformFromStore<T> = (cachedData: Record<string, unknown> | null) => (T | null);
interface PageStateArgs<T> {
  key: string,
  defaultData: T,
  transformFromStore?: TransformFromStore<T> | undefined;
}

function usePageState<T>({ key, defaultData, transformFromStore }: PageStateArgs<T>) {
  const dataStore = LocalStore.createCached<T>(key);
  const cached = dataStore.get();
  const [data, setData] = useState<T>({
    ...defaultData,
    ...(
      transformFromStore === undefined
        ? cached
        : transformFromStore(cached as Record<string, unknown>)
    ),
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
