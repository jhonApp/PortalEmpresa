import React, { useState , useLayoutEffect  } from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow, BootstrapInput } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { Checkbox, Typography, InputLabel } from '@mui/material';
import useForm from '../../Formulario/useForm';
import InputMask from 'react-input-mask';

const Formulario = ({ onDataChange, formData, invalidFields, screenValidation, action }) => {
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
  
  useLayoutEffect(() => {
    screenValidation('agendamento');
  }, []);

  const handleFormChange = (fieldName, value) => {
    console.log(formData)
    const updatedValues = { ...values, [fieldName]: value };
    setValues(updatedValues);
    handleChange(fieldName, value);
    onDataChange(updatedValues);
  };

  return (
    <StyledPaper sx={{background:'#FAFAFA'}} elevation={1}>
      <FormContainer>
        <Column>
          {/* RgCpf */}
          <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                RG ou CPF *
              </InputLabel>
              <StyledTextField 
                id="rgCpf-input"
                type="text"
                autoComplete="off"
                error={invalidFields.some(field => field.field === 'rgCpf')}
                value={formData.rgCpf || ''}
                disabled={action === 'view'}
                onChange={(e) => handleFormChange('rgCpf', e.target.value)} />
              {renderErrorMessage('rgCpf')}
          </FormRow>
          {/* Email */}
          <FormRow>
              <InputLabel shrink htmlFor="email-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                Email *
              </InputLabel>
              <StyledTextField 
                id="email-input"
                type="text"
                autoComplete="off"
                disabled={action === 'view'}
                error={invalidFields.some(field => field.field === 'email')}
                value={formData.email || ''}
                onChange={(e) => { handleFormChange('email', e.target.value); }}
              />
            {renderErrorMessage('email')}
          </FormRow>
          {/* Empresa */}
          <FormRow>
            <InputLabel shrink htmlFor="empresa-input" sx={{ fontSize: 20, color:'#666666', fontWeight: 600, textAlign: 'start'}}>
              Empresa
            </InputLabel>
            <StyledTextField 
              id="empresa-input"
              type="text"
              autoComplete="off"
              name="empresa"
              disabled
              error={errors.empresa}
              value={formData.empresa || ''}
              onChange={(e) => { handleFormChange('empresa', e.target.value) }}
            />
            {renderErrorMessage('empresa')}
          </FormRow>
        </Column>
        <Column>
          {/* Nome Completo */}
          <FormRow>
            <InputLabel shrink htmlFor="nome-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
              Nome Completo *
            </InputLabel>
            <StyledTextField 
              id="nome-input"
              type="text"
              autoComplete="off"
              name="nomeCompleto"
              disabled={action === 'view'}
              error={invalidFields.some(field => field.field === 'nomeCompleto')}
              value={formData.nomeCompleto || ''}
              onChange={(e) => { handleFormChange('nomeCompleto', e.target.value) }}
            />
            {renderErrorMessage('nomeCompleto')}
          </FormRow>
          {/* telefone */}
          <FormRow>
            <InputMask
              mask="(99) 99999-9999"
              maskChar=" "
              value={formData.telefone || ''}
              onChange={(e) => handleFormChange('telefone', e.target.value)}
            >
              {() => (
                <div>
                  <InputLabel shrink htmlFor="tel-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Telefone
                  </InputLabel>
                  <StyledTextField 
                    id="tel-input"
                    type="text"
                    disabled={action === 'view'}
                    autoComplete="off"
                    name="telefone"
                    error={errors.telefone}
                  />
                  {renderErrorMessage('telefone')}
                </div>
              )}
            </InputMask>
          </FormRow>
          {/* Serviço */}
          <FormRow>
            <InputLabel shrink htmlFor="servico-input" sx={{ fontSize: 20, color:'#666666', fontWeight: 600, textAlign: 'start'}}>
              Serviço
            </InputLabel>
            <StyledTextField 
              id="servico-input"
              type="text"
              autoComplete="off"
              disabled
              name="servico"
              error={errors.servico}
              value={formData.servico || ''}
              onChange={(e) => { handleFormChange('servico', e.target.value) }}
            />
            {renderErrorMessage('servico')}
          </FormRow>
        </Column>
      </FormContainer>
      {/* Chegada */}
      <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 30 }}>
        <Checkbox
          sx={{
            padding: '0px 0px 0px 0px !important',
            '& .MuiSvgIcon-root': { color: '#C4C7D4' }
          }}
          checked={formData.confirmacao || false}
          error={invalidFields.some(field => field.field === 'confirmacao')}
          disabled={action === 'view'}
          onChange={(e) => {
            formData.confirmacao = e.target.checked;
            handleFormChange('confirmacao', e.target.checked);
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}   
        />
        <Typography sx ={{marginLeft: 1, fontSize: 14}}>Confirmo que as informações acima são verdadeiras *</Typography>
      </FormRow>
    </StyledPaper>
  );
};

export default Formulario;