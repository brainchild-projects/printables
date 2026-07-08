import { US_LETTER } from '../lib/paperSizes.js';
import PaperSize from '../lib/PaperSize.js';
import SettingsData, { SettingsDataJSON } from './settings/SettingsData.js';
import usePageState from './usePageState.js';

const defaultData: SettingsData = {
  defaultPaperSize: US_LETTER,
  customPaperSizes: [],
};
const key = 'settings';

function fromJSON(obj: SettingsDataJSON): SettingsData {
  const { defaultPaperSize, customPaperSizes } = obj;
  return {
    defaultPaperSize: PaperSize.fromJSON(defaultPaperSize),
    customPaperSizes: PaperSize.fromJSONArray(customPaperSizes || []),
  };
}

function toJSON(data: SettingsData): SettingsDataJSON {
  const { defaultPaperSize, customPaperSizes } = data;
  return {
    defaultPaperSize: PaperSize.toJSON(defaultPaperSize),
    customPaperSizes: PaperSize.toJSONArray(customPaperSizes || []),
  };
}

function useSettings() {
  return usePageState<SettingsData, SettingsDataJSON>({
    key,
    defaultData,
    toJSON,
    fromJSON,
  });
}

export default useSettings;
