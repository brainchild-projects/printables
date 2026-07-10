/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Theme as MUITheme, DeprecatedThemeOptions as MUIThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles/createTheme' {
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
  interface DeprecatedThemeOptions extends MUIThemeOptions {
    accent?: {
      main?: string;
    };
    appDrawer?: {
      width?: React.CSSProperties['width'];
      breakpoint?: Breakpoint;
    };
    // spacing?: (space: number) => number;
  }
  export function createTheme(options?: DeprecatedThemeOptions): Theme;
}
