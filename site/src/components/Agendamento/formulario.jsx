import React, { useState } from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../Utils/StyledForm';
import Checkbox from '@mui/material/Checkbox';
import { validateForm } from '../Formulario/validation'
import useForm from '../Formulario/useForm';

const Formulario = ({ onDataChange }) => {
  const currentScreen = 'agendamento';

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
      rgCpf: '',
      password: '',
      selectedCondominio: '',
    },
    validateForm,
    currentScreen
  );
  const [checked, setChecked] = React.useState(false);

  const [formData, setFormData] = useState({
    rgCpf: '',
    nomeCompleto: '',
    email: '',
    telefone: '',
    empresa: '',
    servico: ''
  });

  const handleForm = (e) => {
    setChecked(e.target.checked);
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  React.useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  return (
    <StyledPaper sx={{background:'#FAFAFA'}} elevation={1}>
      <FormContainer>
        <Column>
          <FormRow>
            <StyledTextField
              label="RG ou CPF *"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              name="rgCpf"
              value={formData.rgCpf}
              onChange={(e) => handleChange('rgCpf', e.target.value)}
              onBlur={handleValidation}
            />
            {renderErrorMessage('rgCpf')}
          </FormRow>
          <FormRow>
            <StyledTextField
              label="Nome Completo *"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <StyledTextField
              label="Email *"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormRow>
        </Column>
        <Column>
          <FormRow>
            <StyledTextField
              label="Telefone"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <StyledTextField
              label="Empresa"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
            />
          </FormRow>
          <FormRow>
            <StyledTextField
              label="Serviço"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              name="servico"
              value={formData.servico}
              onChange={handleChange}
            />
          </FormRow>
        </Column>
      </FormContainer>
      <FormRow style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          sx={{
            padding: '9px 9px 9px 0px !important',
            '& .MuiSvgIcon-root': { color: '#C4C7D4' }
          }}
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <span sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}>Confirmo que as informações acima são verdadeiras. *</span>
      </FormRow>
    </StyledPaper>
  );
};

export default Formulario;