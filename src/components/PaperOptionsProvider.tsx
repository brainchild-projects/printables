import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import LocalStore from '../lib/LocalStore';
import PaperSize, { Orientation, PaperSizeJSON } from '../lib/PaperSize';
import { US_LETTER } from '../lib/paperSizes';
import useSettings from '../pages/useSettings';
import { footerNames } from './printElements/Footers';

interface PaperOptionsCommon {
  margin: string;
  orientation: Orientation;
  scale: number;
  footer: string;
}

export interface PaperOptions extends PaperOptionsCommon {
  paperSize: PaperSize;
}

export interface PaperOptionsJSON extends PaperOptionsCommon {
  paperSize: PaperSizeJSON;
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
  paperSize: US_LETTER,
  footer: footerNames[0],
};

const noop = () => { };

const PaperOptionsContext = createContext<PaperOptionsData>({
  options: defaultPaperPreviewOptions,
  setOptions: noop,
});

export function usePaperOptions(): PaperOptionsData {
  return useContext<PaperOptionsData>(PaperOptionsContext);
}

function PaperOptionsProvider({
  children, margin = '10mm', orientation = 'portrait', scale = 1,
  optionsKey,
}: PaperPreviewProps): JSX.Element {
  const optionsStore = LocalStore.createCached<PaperOptions, PaperOptionsJSON>({
    key: `paperOptions:${optionsKey}`,
    fromJSON: (json) => ({
      margin: json.margin,
      orientation: json.orientation,
      scale: json.scale,
      paperSize: PaperSize.fromJSON(json.paperSize),
      footer: json.footer,
    }),
    toJSON: (data) => ({
      margin: data.margin,
      orientation: data.orientation,
      scale: data.scale,
      paperSize: PaperSize.toJSON(data.paperSize),
      footer: data.footer,
    }),
  });
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
