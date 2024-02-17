import React from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../Utils/StyledForm';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';

const Formulario = ({ onDataChange, onFieldValidationChange }) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleValidation,
    renderErrorMessage,
    clearMessage,
  } = useForm(
    {
      rgCpf: '',
      nomeCompleto: '',
      email: '',
    },
    validateForm,
    'agendamento'
  );

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    const isValid = handleValidation(fieldName);
    onDataChange({ ...values, [fieldName]: value }); // Atualize todos os dados do formulário e chame onDataChange
    onFieldValidationChange (isValid); // Chame a função de callback para atualizar o estado no componente pai
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
              error={errors.rgCpf}
              value={values.rgCpf}
              onChange={(e) => handleFormChange('rgCpf', e.target.value)}
              onBlur={() => handleValidation('rgCpf')}
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
              error={errors.nomeCompleto}
              value={values.nomeCompleto}
              onChange={(e) => handleFormChange('nomeCompleto', e.target.value)}
              onBlur={() => handleValidation('nomeCompleto')}
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
              error={errors.email}
              value={values.email || ''}
              onChange={(e) => handleFormChange('email', e.target.value)}
              onBlur={() => handleValidation('email')}
            />
            {renderErrorMessage('email')}
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
              error={errors.telefone}
              value={values.telefone || ''}
              onChange={(e) => handleFormChange('telefone', e.target.value)}
            />
          </FormRow>
          <FormRow>
            <StyledTextField
              label="Empresa"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
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
              error={errors.servico}
              value={values.servico || ''}
              onChange={(e) => handleFormChange('servico', e.target.value)}
            />
          </FormRow>
        </Column>
      </FormContainer>
    </StyledPaper>
  );
};

export default Formulario;