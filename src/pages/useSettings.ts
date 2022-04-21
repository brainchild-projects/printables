import { US_LETTER } from '../lib/paperSizes';
import PaperSize from '../lib/PaperSize';
import SettingsData, { SettingsDataJSON } from './settings/SettingsData';
import usePageState from './usePageState';

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
