import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ background: '#242C48', height: '100px' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', color: '#fff', fontSize: '17px', textAlign: 'left', marginLeft: 'auto', marginTop: '40px' }}>
          Olá, fulano - WEST TOWERS
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
