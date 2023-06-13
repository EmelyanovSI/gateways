import React from 'react';
import { Box, CssBaseline, LinearProgress } from '@mui/material';
import skeletonTheme from './skeletonTheme';

const AppSkeleton = () => (
  <Box>
    <CssBaseline />
    <LinearProgress />
  </Box>
);

export default skeletonTheme(AppSkeleton);
