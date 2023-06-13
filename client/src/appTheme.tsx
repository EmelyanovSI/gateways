import React, { ComponentType } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from './hooks';
import { getTheme } from './theme';

export default function appTheme<T extends object>(Component: ComponentType<T>) {
  const Wrapper = (props: T) => {
    const mode = useAppSelector(state => state.theme.mode);
    const theme = getTheme(mode);

    return (
      <ThemeProvider theme={theme}>
        <Component {...props as T} />
      </ThemeProvider>
    );
  };

  Wrapper.displayName = 'Wrapper';
  return Wrapper;
}
