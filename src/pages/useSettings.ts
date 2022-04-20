import { PaperSize, PaperSizeJSON, US_LETTER } from '../lib/paperSizes';
import SettingsData from './settings/SettingsData';
import usePageState from './usePageState';

const defaultData: SettingsData = {
  defaultPaperSize: US_LETTER,
};
const key = 'settings';

function useSettings() {
  return usePageState<SettingsData>({
    key,
    defaultData,
    transformFromStore: (cached) => {
      if (cached === null) {
        return cached;
      }
      const { defaultPaperSize } = cached;
      if (defaultPaperSize instanceof PaperSize) {
        return cached as unknown as SettingsData;
      }
      const {
        name, width, height,
      } = defaultPaperSize as PaperSizeJSON;
      return {
        ...cached,
        defaultPaperSize: new PaperSize(
          name,
          {
            width,
            height,
          },
        ),
      } as unknown as SettingsData;
    },
  });
}

export default useSettings;
