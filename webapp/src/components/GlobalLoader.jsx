import React from 'react';
import { Box, Backdrop, CircularProgress, Typography } from '@mui/material';
import { useApp } from '../context/AppContext';

const GlobalLoader = () => {
  const { loadingDemo } = useApp();

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!!loadingDemo}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress color="inherit" />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading demo data...
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default GlobalLoader;
