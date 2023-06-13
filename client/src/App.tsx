import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import GatewayList from './components/GatewayList';
import appTheme from './appTheme';

const App: React.FC = () => {
  return (
    <Container>
      <CssBaseline />
      <GatewayList />
    </Container>
  );
};

export default appTheme(App);
