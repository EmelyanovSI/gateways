import React, { ComponentType } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getThemeMode } from './utils';
import { getTheme } from './theme';

export default function skeletonTheme<T extends object>(Component: ComponentType<T>) {
  const Wrapper = (props: T) => {
    const theme = getTheme(getThemeMode());

    return (
      <ThemeProvider theme={theme}>
        <Component {...props as T} />
      </ThemeProvider>
    );
  };

  Wrapper.displayName = 'Wrapper';
  return Wrapper;
}
