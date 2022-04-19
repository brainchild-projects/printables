import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import LocalStore from '../lib/LocalStore';
import { PaperSize, Orientation, US_LETTER } from '../lib/paperSizes';
import useSettings from '../pages/useSettings';

export interface PaperOptions {
  margin: string;
  orientation: Orientation;
  scale: number;
  paperSize: PaperSize;
}
interface PaperPreviewProps {
  children: ReactNode;
  optionsKey: string;
  margin?: string | number;
  orientation?: string;
  scale?: number;
}

type UpdatePaperOptions = (options: PaperOptions) => void;

export interface PaperOptionsData {
  options: PaperOptions;
  setOptions: UpdatePaperOptions;
}

const defaultPaperPreviewOptions: PaperOptions = {
  margin: '10mm',
  orientation: 'portrait',
  scale: 1,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  paperSize: US_LETTER,
};

const noop = () => { };

const PaperOptionsContext = createContext<PaperOptionsData>({
  options: defaultPaperPreviewOptions,
  setOptions: noop,
});

export function usePaperOptions(): PaperOptionsData {
  return useContext<PaperOptionsData>(PaperOptionsContext);
}

interface PaperSizeJson {
  name: string;
  code: string;
  width: number;
  height: number;
}

function PaperOptionsProvider({
  children, margin = '10mm', orientation = 'portrait', scale = 1,
  optionsKey,
}: PaperPreviewProps): JSX.Element {
  const optionsStore = LocalStore.createCached<PaperOptions>(
    `paperOptions:${optionsKey}`,
    (rawData: unknown) => {
      const savedData = rawData as Record<string, unknown>;
      const paperSize = (savedData).paperSize as PaperSizeJson;
      savedData.paperSize = new PaperSize(
        paperSize.name,
        {
          width: paperSize.width,
          height: paperSize.height,
          code: paperSize.code,
        },
      );
      return savedData as unknown as PaperOptions;
    },
  );
  const settings = useSettings();
  const defaultOptions = {
    ...defaultPaperPreviewOptions,
    paperSize: settings.data.defaultPaperSize || defaultPaperPreviewOptions.paperSize,
    margin: typeof margin === 'number' ? `${margin}mm` : margin,
    orientation,
    scale,
  } as PaperOptions;

  const [paperOptions, setPaperOptions] = useState(defaultOptions);

  useEffect(() => {
    const savedData = optionsStore.get();
    if (savedData) {
      setPaperOptions(savedData as unknown as PaperOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPaperOptions, optionsKey]);

  const paperOptionsValue = useMemo(() => {
    const setOptions = (options: PaperOptions) => {
      const updated = {
        ...paperOptions,
        ...options,
      };
      optionsStore.set(updated);
      setPaperOptions(updated);
    };
    return {
      options: paperOptions,
      setOptions,
    };
  }, [paperOptions, optionsStore]);

  return (
    <PaperOptionsContext.Provider
      value={paperOptionsValue}
    >
      {children}
    </PaperOptionsContext.Provider>
  );
}

PaperOptionsProvider.defaultProps = {
  margin: '10mm',
  orientation: 'portrait',
  scale: 1,
};

export default PaperOptionsProvider;
