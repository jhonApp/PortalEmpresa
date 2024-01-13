import React from 'react';
import { Box, Paper, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import portalLogin from '../../assets/images/portal_login.svg';
import portalIconSVG from '../../assets/images/icones/Portal Empresa II.svg';

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

const StyledPaper = styled(Paper)({
  padding: (theme) => theme.spacing(3),
  width: 350,
  textAlign: 'center',
  marginLeft: '70px',
  boxShadow: 'none'
});

const StyledFormControl = styled(FormControl)({
    width: '100%',
    marginBottom: (theme) => theme.spacing(2),
  });
  
  const StyledTextField = styled(TextField)({
    borderRadius: '12px',
    marginBottom: '0px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
    },
  });

const StyledImageContainer = styled('div')({
  background: '#242c48',
  borderRadius: '50px 50px 1000px 50px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledImage = styled('img')({
  width: '90%',
  marginTop: '8%'
});

const StyledImageLogo = styled('img')({
    width: '23%',
    marginBottom: '5%'
  });

const StyledLogoText = styled('div')({
  color:'#fff',
  marginRight: '18%',
  marginTop:'5%'
});

const StyledButton = styled(Button)({
    background: 'transparent',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    marginTop: '25px',
    boxShadow: 'none',
    '&:hover': {
      background: '#242c48',
      color: '#fff',
    },
  });

const StyledTitle = styled(Typography)({
    fontSize: 'clamp(16px, 2vw, 25px)',
    fontWeight: 'bold',
    color: '#242c48',
    position: 'absolute',
    top: '7.5rem'
  });

const Login = () => {
  return (
    <StyledGrid>
      {/* Logo/Image */}
      <StyledImageContainer>
        <StyledLogoText>
          <StyledImageLogo src={portalIconSVG} alt="Logo" />
          <Typography variant="h4" sx={{fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 'bold', marginBottom: '10px' }}>
            Portal Empresa
          </Typography>
          <Typography variant="body1" sx={{fontSize: 'clamp(12px, 2vw, 16px)'}}>
            Controle de acesso e mais segurança para a sua empresa.
          </Typography>
        </StyledLogoText>
        <StyledImage src={portalLogin} alt="Logo" />
      </StyledImageContainer>

      <StyledPaper elevation={3}>
        {/* Condomínio Select */}
        <StyledTitle variant="h2">
            Login Condômino
        </StyledTitle>
        <StyledFormControl variant="outlined">
          <InputLabel id="condominio-label">Condomínio</InputLabel>
          <Select labelId="condominio-label" label="Condomínio" sx={{borderRadius: 3}}>
            <MenuItem value={1}>Condomínio 1</MenuItem>
            <MenuItem value={2}>Condomínio 2</MenuItem>
            <MenuItem value={3}>Condomínio 3</MenuItem>
          </Select>
        </StyledFormControl>

        {/* Email Input */}
        <StyledTextField label="Email" variant="outlined" fullWidth margin="normal" />

        {/* Password Input */}
        <StyledTextField label="Senha" variant="outlined" fullWidth margin="normal" type="password" />

        {/* Login Button */}
        <StyledButton variant="contained" fullWidth>
          Entrar
        </StyledButton>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
            <Link to="./loginVisitante">Clique aqui para entrar como visitante</Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
            Esqueceu a senha? <a href="#">Recuperar Senha</a>
        </Typography>
      </StyledPaper>
    </StyledGrid>
  );
};

export default Login;