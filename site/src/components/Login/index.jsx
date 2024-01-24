import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import Logo from './logoSection';
import LoginForm from './loginForm';

const StyledGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '0.9fr 1fr',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  marginTop: '8vh',
  marginLeft: '14vh',

  // Adicionando regras de mídia para larguras de tela menores
  '@media (max-width: 1000px)': {
    gridTemplateColumns: '1fr', // Uma coluna para telas menores
    marginLeft: '0', // Remova a margem lateral
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