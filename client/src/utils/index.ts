import { ThemeMode } from '../constants';

export const getThemeMode = () => {
  const query = '(prefers-color-scheme: dark)';
  return window.matchMedia(query).matches ? ThemeMode.Dark : ThemeMode.Light;
};
