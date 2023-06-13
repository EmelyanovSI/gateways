import { createSlice } from '@reduxjs/toolkit';
import { ThemeMode } from '../constants';
import { getThemeMode } from '../utils';
import { ThemeState } from './state';

const { Dark, Light } = ThemeMode;

const initialState: ThemeState = {
  mode: getThemeMode()
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === Light ? Dark : Light;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
