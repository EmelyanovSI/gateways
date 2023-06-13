import React from 'react';
import { AppBar, CssBaseline, IconButton, Toolbar } from '@mui/material';
import { Brightness7, Brightness3 } from '@mui/icons-material';
import GatewayList from './components/GatewayList';
import appTheme from './appTheme';
import { useAppDispatch, useAppSelector } from './hooks';
import { toggleTheme } from './redux/themeSlice';
import { ThemeMode } from './constants';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state.theme.mode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <IconButton edge="start" color="inherit" onClick={handleThemeToggle}>
            {mode === ThemeMode.Light ? <Brightness3 /> : <Brightness7 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <GatewayList />
    </>
  );
};

export default appTheme(App);
