import React, {
  createContext, ReactNode, useContext, useState,
} from 'react';
import { PaperSize, Orientation, US_LETTER } from '../lib/paperSizes';

interface PaperOptions {
  margin: string;
  orientation: Orientation;
  scale: number;
  paperSize: PaperSize;
}
interface PaperPreviewProps {
  children: ReactNode;
  margin?: string | number;
  orientation?: string;
  scale?: number;
}

type UpdatePaperOptions = (options: PaperOptions) => void;

interface PaperOptionsData {
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

const noop = () => {};

const PaperOptionsContext = createContext<PaperOptionsData>({
  options: defaultPaperPreviewOptions,
  setOptions: noop,
});

export function usePaperOptions(): PaperOptionsData {
  return useContext<PaperOptionsData>(PaperOptionsContext);
}
function PaperOptionsProvider({
  children, margin = '10mm', orientation = 'portrait', scale = 1,
}: PaperPreviewProps): JSX.Element {
  const [paperOptions, setPaperOptions] = useState({
    ...defaultPaperPreviewOptions,
    margin: typeof margin === 'number' ? `${margin}mm` : margin,
    orientation,
    scale,
  } as PaperOptions);

  const setOptions = (options: PaperOptions) => {
    setPaperOptions({
      ...paperOptions,
      ...options,
    });
  };

  return (
    <PaperOptionsContext.Provider
      value={{
        options: paperOptions, setOptions,
      }}
    >
      { children }
    </PaperOptionsContext.Provider>
  );
}

PaperOptionsProvider.defaultProps = {
  margin: '10mm',
  orientation: 'landscape',
  scale: 1,
};

export default PaperOptionsProvider;
