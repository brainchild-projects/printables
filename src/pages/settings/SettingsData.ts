import PaperSize, { PaperSizeJSON } from '../../lib/PaperSize';

export default interface SettingsData {
  defaultPaperSize: PaperSize;
  customPaperSizes: PaperSize[];
}

export interface SettingsDataJSON {
  defaultPaperSize: PaperSizeJSON;
  customPaperSizes: PaperSizeJSON[];
}
