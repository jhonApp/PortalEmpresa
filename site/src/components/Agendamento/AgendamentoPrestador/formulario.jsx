import React, { useState , useEffect } from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { Checkbox, Typography } from '@mui/material';
import useForm from '../../Formulario/useForm';
import InputMask from 'react-input-mask';

const Formulario = ({ onDataChange, onFieldValidationChange , formData }) => {
  const [values, setValues] = useState({});
  const {
    errors,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'agendamento'
  );

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      setValues(formData);
    }
  }, [formData, setValues]);

  const handleFormChange = (fieldName, value) => {
    const updatedValues = { ...values, [fieldName]: value };
    setValues(updatedValues);
    handleChange(fieldName, value);
    const isValid = handleValidation(fieldName);
    onDataChange(updatedValues);
    onFieldValidationChange(isValid);
  };

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
              type="number"
              autoComplete="off"
              error={errors.rgCpf}
              value={values.rgCpf || ''}
              onChange={(e) => handleFormChange('rgCpf', e.target.value)}
              onBlur={(e) => handleFormChange('rgCpf', e.target.value)}

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
              autoComplete="off"
              error={errors.nomeCompleto}
              value={values.nomeCompleto || ''}
              onChange={(e) => handleFormChange('nomeCompleto', e.target.value)}
              onBlur={(e) => handleFormChange('nomeCompleto', e.target.value)}
            />
            {renderErrorMessage('nomeCompleto')}
          </FormRow>
          <FormRow>
            <StyledTextField
              label="Email *"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              error={errors.email}
              value={values.email || ''}
              onChange={(e) => handleFormChange('email', e.target.value)}
              onBlur={(e) => handleFormChange('email', e.target.value)}
            />
            {renderErrorMessage('email')}
          </FormRow>
        </Column>
        <Column>
          <FormRow>
            <InputMask
              mask="(99) 99999-9999"
              maskChar=" "
              value={values.telefone || ''}
              onChange={(e) => handleFormChange('telefone', e.target.value)}
            >
              {() => <StyledTextField
                label="Telefone"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="off"
                type="text"
                error={errors.telefone}
              />}
            </InputMask>
          </FormRow>
          <FormRow>
            <StyledTextField
              label="Empresa"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              error={errors.empresa}
              value={values.empresa || ''}
              onChange={(e) => handleFormChange('empresa', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <StyledTextField
              label="Serviço"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              error={errors.servico}
              value={values.servico || ''}
              onChange={(e) => handleFormChange('servico', e.target.value)}
            />
          </FormRow>
          
        </Column>
      </FormContainer>
      <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 30 }}>
        <Checkbox
          sx={{
            padding: '0px 0px 0px 0px !important',
            '& .MuiSvgIcon-root': { color: '#C4C7D4' }
          }}
          checked={values.confirmacao || false}
          error={errors.confirmacao}
          onChange={(e) => {
            values.confirmacao = e.target.checked;
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