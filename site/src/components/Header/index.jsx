import React from 'react';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import { SignOut } from 'phosphor-react';

const FlexDiv = styled('div')({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
});

const Header = () => {
  return (
    <AppBar position="static" sx={{ background: '#242C48', height: '64px', boxShadow: 'none' }}>
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div>
          <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', color: '#fff', fontSize: '16px', textAlign: 'left' }}>
            Home
          </Typography>
        </div>
        <FlexDiv>
          <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', color: '#fff', fontSize: '16px', textAlign: 'center', marginRight: '24px' }}>
            Olá, fulano West Union
          </Typography>
          <SignOut size={24} sx={{ marginTop: '-2px' }} />
        </FlexDiv>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
