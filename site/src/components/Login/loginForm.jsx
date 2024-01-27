import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { autenticacao } from '../../../api/autenticacao';
import Message from '../Message';
import useForm from '../Formulario/useForm';
import { validateForm } from '../Formulario/validation'
import { useNavigate } from 'react-router-dom';


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

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const FormSection = styled('div')({
  marginBottom: (theme) => theme.spacing(2),
  width: '100%',
});

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    values,
    errors,
    message,
    messageType,
    handleChange,
    handleSubmit,
    handleValidation,
    renderErrorMessage,
    clearMessage,
  } = useForm(
    {
      email: '',
      password: '',
      selectedCondominio: '',
    },
    validateForm
  );

  const handleLogin = async () => {
    await handleSubmit(async () => {
      await autenticacao(values.email, values.password);
      navigate('/dashboard');
    });
  };

  const handleCondominioChange = (e) => {
    handleChange('selectedCondominio', e.target.value);
  };

  const handleMessageClose = () => {
    clearMessage();
  };

  return (
    <StyledPaper elevation={3}>
      <StyledTitle variant="h2">Login Condômino</StyledTitle>
      
      <FormContainer>
        <FormSection>
          <FormControl variant="outlined" error={errors.selectedCondominio} style={{ width: '100%' }}>
            <InputLabel id="condominio-label">Condomínio</InputLabel>
            <Select
              labelId="condominio-label"
              label="Condomínio"
              value={values.selectedCondominio}
              onChange={handleCondominioChange}
            >
              <MenuItem value={1}>Condomínio 1</MenuItem>
              <MenuItem value={2}>Condomínio 2</MenuItem>
              <MenuItem value={3}>Condomínio 3</MenuItem>
            </Select>
          </FormControl>
          {renderErrorMessage('selectedCondominio')}
        </FormSection>

        <FormSection>
          <StyledTextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            onBlur={handleValidation}
          />
          {renderErrorMessage('email')}
        </FormSection>

        <FormSection>
          <StyledTextField
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={values.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            onBlur={handleValidation}
          />
          {renderErrorMessage('password')}
        </FormSection>
      </FormContainer>

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