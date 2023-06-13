import { DateTime } from 'luxon';
import { ThemeMode } from '../constants';

export const getThemeMode = () => {
  const query = '(prefers-color-scheme: dark)';
  return window.matchMedia(query).matches ? ThemeMode.Dark : ThemeMode.Light;
};

export const getDateString = (date: string = new Date().toISOString()) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
};
