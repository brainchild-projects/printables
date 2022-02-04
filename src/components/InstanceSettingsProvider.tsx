import React, {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import LocalStore from '../lib/LocalStore';

/// These are options for this specific printable app instance
interface InstanceOptions {
  // Has the user printed before?
  hasAlreadyPrinted: boolean;
}

type UpdateInstanceOptions = (options: InstanceOptions) => void;

interface InstanceOptionsData {
  options: InstanceOptions;
  setOptions: UpdateInstanceOptions;
}

const defaultInstanceOptions: InstanceOptions = {
  hasAlreadyPrinted: false,
};

const noop = () => {};

const InstanceOptionsContext = createContext<InstanceOptionsData>({
  options: defaultInstanceOptions,
  setOptions: noop,
});

export function useInstanceOptions(): InstanceOptionsData {
  return useContext<InstanceOptionsData>(InstanceOptionsContext);
}

interface InstanceProps {
  children: ReactNode;
  hasAlreadyPrinted?: boolean;
}

function InstanceOptionsProvider({
  children,
  hasAlreadyPrinted = false,
}: InstanceProps): JSX.Element {
  const optionsStore = LocalStore.create<InstanceOptions>(
    'instanceOptions',
    (rawData: unknown) => {
      const savedData = rawData as Record<string, unknown>;
      return savedData as unknown as InstanceOptions;
    },
  );
  const defaultOptions = {
    ...defaultInstanceOptions,
    hasAlreadyPrinted,
  } as InstanceOptions;

  const [instanceOptions, setInstanceOptions] = useState(defaultOptions);

  const setOptions = (options: InstanceOptions) => {
    const updated = {
      ...instanceOptions,
      ...options,
    };
    optionsStore.set(updated);
    setInstanceOptions(updated);
  };

  useEffect(() => {
    const savedData = optionsStore.get();
    if (savedData) {
      setInstanceOptions(savedData as unknown as InstanceOptions);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInstanceOptions]);

  return (
    <InstanceOptionsContext.Provider
      value={{
        options: instanceOptions, setOptions,
      }}
    >
      { children }
    </InstanceOptionsContext.Provider>
  );
}

InstanceOptionsProvider.defaultProps = {
  hasAlreadyPrinted: false,
};

export default InstanceOptionsProvider;
