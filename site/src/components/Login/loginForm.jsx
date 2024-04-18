import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Button,
  Autocomplete,
  FormControl,
  InputLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { autenticacao } from '../../../api/autenticacao';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Message from '../Message';
import useForm from '../Formulario/useForm';
import { validateForm } from '../Formulario/validation'
import validateAndSetInvalidFields from '../Formulario/useValidation';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SelectConexao from './selectConexao';
import CircularProgress from '@mui/material/CircularProgress';

const StyledButton = styled(Button)(({ theme, disabled }) => ({
  background: '#242c48',
  color: '#fff',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  marginTop: '25px',
  borderRadius: '20px',
  boxShadow: 'none',
  '&:hover': {
    background: '#242c48',
    color: '#fff',
  },
  '&.Mui-disabled': {
    background: '#242c48',
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
  }
}));

const StyledTextField = styled(TextField)({
  borderRadius: '20px',
  marginBottom: '0px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
  },
});

const StyledTextPassword = styled(OutlinedInput)({
  borderRadius: '20px',
  marginBottom: '0px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    border: '2px solid #000', // Defina a cor da borda
  },
  '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
    color: '#000',
    border: '2px solid #000', // Defina a cor da borda
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
  position: 'relative',
});

const StyledFormControlLabel = styled(FormControlLabel)({
  float:'left',
  '& .Mui-checked': {
    color: '#242c48'
  },
  '& .css-8je8zh-MuiTouchRipple-root': {
    color: '#242c48'
  },
});

const FormContainer = styled('div')({
  display: 'flex',
  gap: '12px',
  flexDirection: 'column',
  alignItems: 'center',
});

const FormSection = styled('div')({
  marginBottom: (theme) => theme.spacing(2),
  width: '100%',
});

const LoginForm = () => {
  const navigate = useNavigate();
  const currentScreen = 'login';
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [savedCredentials, setSavedCredentials] = useState(null);
  const [listaConexao, setConexoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => { event.preventDefault(); };
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
      email: savedCredentials ? savedCredentials.email : '',
      password: savedCredentials ? savedCredentials.password : ''
    },
    validateForm,
    currentScreen
  );

  useEffect(() => {
    if (rememberMe && savedCredentials) {
      handleChange('email', savedCredentials.email);
      handleChange('password', savedCredentials.password);
    }
  }, [rememberMe, savedCredentials]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await autenticacao(values.email, values.password, values.condominio);
      if (rememberMe) {
        setSavedCredentials({ email: values.email, password: values.password, condominio: values.condominio });
        localStorage.setItem('savedCredentials', JSON.stringify({ email: values.email, password: values.password, condominio: values.condominio }));
      } else {
        setSavedCredentials(null);
        localStorage.removeItem('savedCredentials');
      }
      setTimeout(() => {
        navigate('/system/');
        setLoading(false);
      }, 5000);
    } catch (error) {
      showErrorToast(error.message);
      setLoading(false);
    }
  };
  
  

  const handleMessageClose = () => {
    clearMessage();
  };

  useEffect(() => {
    const storedCredentials = localStorage.getItem('savedCredentials');
    if (storedCredentials) {
      setSavedCredentials(JSON.parse(storedCredentials));
      setRememberMe(true);
    }
    
  }, []); 

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleOptionChange = (event, newValue) => {
    console.log(newValue.conexao)
    handleChange('condominio', newValue.conexao);
  };

  return (
    <StyledPaper elevation={3} style={{margin:'0 auto'}}>
      <StyledTitle variant="h2">Login</StyledTitle>
      <Typography variant="body2" color="textSecondary" style={{ marginBottom: '20px' }}>
        Informe suas credenciais de acesso
      </Typography>
      
      <FormContainer>
        {/*Condominio*/}
        <FormSection>
          <SelectConexao onChange={handleOptionChange} />
        </FormSection>

        {/*Email*/}
        <FormSection>
          <StyledTextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={invalidFields.some(field => field.field === 'email')}
          />
          {renderErrorMessage('email')}
        </FormSection>

        {/*Senha*/}
        <FormControl sx={{ m: 1, width: '44ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <StyledTextPassword
            id="outlined-adornment-password"
            value={values.password}
            error={invalidFields.some(field => field.field === 'password')}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => handleChange('password', e.target.value)}
            onKeyDown={handleEnterKey}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
          />
          {renderErrorMessage('email')}
        </FormControl>
      </FormContainer>
      <FormSection>
        <StyledFormControlLabel 
          control={<Switch checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
          label="Lembrar de mim" 
        />
      </FormSection>
      <StyledButton
          fullWidth
          variant="contained"
          disabled={loading}
          onClick={handleLogin}
        >
        Entrar
        {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: '#fff',
            position: 'absolute',
          }}
        />
      )}
      </StyledButton>
      
      <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
        Copyright Grupo Detk 2024
      </Typography>
    </StyledPaper>
  )
};

export default LoginForm;