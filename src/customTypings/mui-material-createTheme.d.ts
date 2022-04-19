/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Theme as MUITheme, ThemeOptions as MUIThemeOptions } from '@material-ui/core/styles/createTheme';

declare module '@material-ui/core/styles/createTheme' {
  interface Theme extends MUITheme {
    appDrawer: {
      width: React.CSSProperties['width'];
      breakpoint: Breakpoint;
    },
    accent: {
      main: string;
    };
    // spacing: (space: number) => number;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions extends MUIThemeOptions {
    accent?: {
      main?: string;
    };
    appDrawer?: {
      width?: React.CSSProperties['width'];
      breakpoint?: Breakpoint;
    };
    // spacing?: (space: number) => number;
  }
  export function createTheme(options?: ThemeOptions): Theme;
}
