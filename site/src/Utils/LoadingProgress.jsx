import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress({ isVisible }) {
  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: isVisible ? 'flex' : 'none', backgroundColor: 'rgba(255, 255, 255, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}