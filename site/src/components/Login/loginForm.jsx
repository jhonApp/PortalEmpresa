import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { autenticacao  } from '../../../api/autenticacao';
import Message from '../Message';

const StyledTextField = styled(TextField)({
  borderRadius: '12px',
  marginBottom: '0px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
});

const StyledPaper = styled(Paper)({
  padding: (theme) => theme.spacing(3),
  width: 350,
  textAlign: 'center',
  marginLeft: '70px',
  boxShadow: 'none',
});

const StyledTitle = styled(Typography)({
  fontSize: 'clamp(16px, 2vw, 25px)',
  fontWeight: 'bold',
  color: '#242c48',
  position: 'absolute',
  top: '7.5rem',
});

const StyledFormControl = styled(FormControl)({
  width: '100%',
  marginBottom: (theme) => theme.spacing(2),
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

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleMessageClose = () => {
    setMessage('');
    setMessageType('');
  };

  useEffect(() => {
    // Efeito colateral para fechar a mensagem após 3000 milissegundos (3 segundos)
    const timeoutId = setTimeout(handleMessageClose, 3000);

    // Cleanup do efeito colateral
    return () => clearTimeout(timeoutId);
  }, [message, messageType]); // Dependências para o efeito colateral

  const handleLogin = async () => {
    try {
      const response = await autenticacao(email, password);
      setMessage('Login bem-sucedido!');
      setMessageType('success');
    } catch (error) {
      setMessage('Erro de autenticação: Verifique seu e-mail e senha.');
      setMessageType('error');
    }
  };

  return (
    <StyledPaper elevation={3}>
      <StyledTitle variant="h2">Login Condômino</StyledTitle>
      <StyledFormControl variant="outlined">
        <InputLabel id="condominio-label">Condomínio</InputLabel>
        <Select labelId="condominio-label" label="Condomínio">
          <MenuItem value={1}>Condomínio 1</MenuItem>
          <MenuItem value={2}>Condomínio 2</MenuItem>
          <MenuItem value={3}>Condomínio 3</MenuItem>
        </Select>
      </StyledFormControl>

      <StyledTextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        label="Senha"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <StyledButton variant="contained" fullWidth onClick={handleLogin}>
        Entrar
      </StyledButton>

      <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
        <Link to="./loginVisitante">Clique aqui para entrar como visitante</Link>
      </Typography>

      <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
        Esqueceu a senha? <a href="#">Recuperar Senha</a>
      </Typography>
      <Message type={messageType} message={message} onClose={handleMessageClose} />
    </StyledPaper>
  );
};

export default LoginForm;