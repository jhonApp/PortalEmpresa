import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Logo from './logoSection';
import LoginForm from './loginForm';

const StyledGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1.6fr 1fr',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  margin: '0',
  padding: '0',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: '1fr',
    marginLeft: '0',
    gridTemplateRows: '150px 1fr',
  },
});

const Login = () => {
  return (
    <StyledGrid>
      <Logo />
      <LoginForm />
    </StyledGrid>
  );
};

export default Login;