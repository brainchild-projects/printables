import { DefaultTheme as DefaultMuiTheme } from '@material-ui/core/node_modules/@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createTheme';

declare module '@material-ui/core/node_modules/@material-ui/styles' {
  interface DefaultTheme extends DefaultMuiTheme, Theme {
  }
}
