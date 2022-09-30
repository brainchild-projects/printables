import { DefaultTheme as DefaultMuiTheme } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createTheme';

declare module '@material-ui/core' {
  interface DefaultTheme extends DefaultMuiTheme, Theme {
  }
}
