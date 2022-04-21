import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
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

const noop = () => { };

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

const optionsStore = LocalStore.create<InstanceOptions>({ key: 'instanceOptions' });

function InstanceOptionsProvider({
  children,
  hasAlreadyPrinted = false,
}: InstanceProps): JSX.Element {
  const defaultOptions = {
    ...defaultInstanceOptions,
    hasAlreadyPrinted,
  } as InstanceOptions;

  const [instanceOptions, setInstanceOptions] = useState(defaultOptions);

  useEffect(() => {
    const savedData = optionsStore.get();
    if (savedData) {
      setInstanceOptions(savedData as unknown as InstanceOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInstanceOptions]);

  const instanceOptionsValue = useMemo(() => {
    const setOptions = (options: InstanceOptions) => {
      const updated = {
        ...instanceOptions,
        ...options,
      };
      optionsStore.set(updated);
      setInstanceOptions(updated);
    };
    return {
      options: instanceOptions, setOptions,
    };
  }, [instanceOptions]);

  return (
    <InstanceOptionsContext.Provider
      value={instanceOptionsValue}
    >
      {children}
    </InstanceOptionsContext.Provider>
  );
}

InstanceOptionsProvider.defaultProps = {
  hasAlreadyPrinted: false,
};

export default InstanceOptionsProvider;
