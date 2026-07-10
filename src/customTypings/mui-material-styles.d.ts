import { DefaultTheme as DefaultMuiTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

declare module '@mui/material' {
  interface DefaultTheme extends DefaultMuiTheme, Theme {
  }
}
