import { darkScrollbar } from '@mui/material';
import { createTheme, Theme } from '@mui/material/styles';
import { ThemeMode } from '../constants';

const theme = {
  [ThemeMode.Light]: createTheme({
    palette: {
      mode: ThemeMode.Light
    }
  }),
  [ThemeMode.Dark]: createTheme({
    palette: {
      mode: ThemeMode.Dark
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: darkScrollbar()
        }
      }
    }
  })
};

export const getTheme = (mode: ThemeMode = ThemeMode.Light): Theme => {
  return theme[mode] ?? createTheme();
};
