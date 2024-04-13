import React, { useState , useEffect } from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { Checkbox, Typography, InputLabel } from '@mui/material';
import useForm from '../../Formulario/useForm';
import InputMask from 'react-input-mask';

const Formulario = ({ formData, onDataChange, invalidFields, screenValidation }) => {
  const [values, setValues] = useState({});
  const {
    errors,
    handleChange,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'agendamento'
  );

  useEffect(() => {
    screenValidation('agendamento');
  }, []);

  const handleFormChange = (fieldName, value) => {
    const updatedValues = { ...values, [fieldName]: value };
    setValues(updatedValues);
    handleChange(fieldName, value);
    onDataChange(updatedValues);
  };
  
  return (
    <StyledPaper sx={{background:'#FAFAFA'}} elevation={1}>
      <FormContainer>
        <Column>
          {/* RG ou CPF */}
          <FormRow>
            <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                RG ou CPF *
            </InputLabel>
            <StyledTextField
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              error={invalidFields.some(field => field.field === 'rgCpf')}
              value={formData.rgCpf || ''}
              onChange={(e) => handleFormChange('rgCpf', e.target.value)}
            />
            {renderErrorMessage('rgCpf')}
          </FormRow>
          {/* Email */}
          <FormRow>
            <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
              Email *
            </InputLabel>
            <StyledTextField
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              error={invalidFields.some(field => field.field === 'email')}
              value={formData.email || ''}
              onChange={(e) => handleFormChange('email', e.target.value)}
            />
            {renderErrorMessage('email')}
          </FormRow>
          {/* Empresa */}
          <FormRow>
            <InputLabel shrink sx={{ fontSize: 20, color:'#666666', fontWeight: 600, textAlign: 'start'}}>
              Empresa
            </InputLabel>
            <StyledTextField
              variant="outlined"
              fullWidth
              margin="normal"
              disabled
              type="text"
              autoComplete="off"
              error={errors.empresa}
              value={formData.empresa || ''}
              onChange={(e) => handleFormChange('empresa', e.target.value)}
            />
          </FormRow>
        </Column>
        <Column>
          {/* Nome Completo */}
          <FormRow>
            <InputLabel shrink htmlFor="rgCpf-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
              Nome Completo *
            </InputLabel>
            <StyledTextField
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              error={invalidFields.some(field => field.field === 'nomeCompleto')}
              value={formData.nomeCompleto || ''}
              onChange={(e) => handleFormChange('nomeCompleto', e.target.value)}
            />
            {renderErrorMessage('nomeCompleto')}
          </FormRow>
          {/* Telefone */}
          <FormRow>
            <InputMask
              mask="(99) 99999-9999"
              maskChar=" "
              value={formData.telefone || ''}
              onChange={(e) => handleFormChange('telefone', e.target.value)}
            >
              {() => 
              <div>
                <InputLabel shrink htmlFor="tel-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Telefone
                </InputLabel>
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  autoComplete="off"
                  type="text"
                  error={errors.telefone}
                />
              </div>}
            </InputMask>
          </FormRow>
          {/* Serviço */}
          <FormRow>
            <InputLabel shrink htmlFor="tel-input" sx={{ fontSize: 20, color:'#666666', fontWeight: 600, textAlign: 'start'}}>
              Serviço
            </InputLabel>
            <StyledTextField
              variant="outlined"
              fullWidth
              disabled
              margin="normal"
              type="text"
              autoComplete="off"
              error={errors.servico}
              value={formData.servico || ''}
              onChange={(e) => handleFormChange('servico', e.target.value)}
            />
          </FormRow>
        </Column>
      </FormContainer>
      {/* Confirmação */}
      <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 30 }}>
        <Checkbox
          sx={{
            padding: '0px 0px 0px 0px !important',
            '& .MuiSvgIcon-root': { color: '#C4C7D4' }
          }}
          checked={formData.confirmacao || false}
          error={errors.confirmacao}
          onChange={(e) => {
            formData.confirmacao = e.target.checked;
            handleFormChange('confirmacao', e.target.checked);
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}   
        />
        <Typography sx ={{marginLeft: 1, fontSize: 14, fontWeight: 600}}>Confirmo que as informações acima são verdadeiras *</Typography>
      </FormRow>
    </StyledPaper>
  );
};

export default Formulario;