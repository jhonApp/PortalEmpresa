import React from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { Checkbox, Typography, Link } from '@mui/material';
import useForm from '../../Formulario/useForm';
import InputMask from 'react-input-mask';

const ExibiComunicado = ({ sub, description, onDataChange, onFieldValidationChange, formData }) => {
  const {
    values,
    errors,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'agendamento'
  );

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    const isValid = handleValidation(fieldName);
    console.log(isValid);
    onDataChange({ ...values, [fieldName]: value });
    onFieldValidationChange (isValid);
  };

  return (
    <StyledPaper sx={{background:'#FAFAFA'}} elevation={1}>
        <Typography variant="h6" component="h7" style={{ fontWeight: 600, fontSize: 18 }}>
            {sub}
        </Typography>
        <StyledPaper sx={{marginTop: 1, background:'#F5F5F5', border: '1px solid #ABACB2', padding:'10px', textAlign:'start'}}>
            <Typography variant="h3" style={{ marginBottom: 2, fontSize: 13 }}>
                {description}
            </Typography>
        </StyledPaper>
        <Link variant="h6" component="h7" style={{ fontWeight: 600, float: 'left', lineHeight: '2.6', textDecoration: 'none', cursor:'pointer', fontSize: 14, textAlign:'start' }}>
            {"Clica aqui para abrir o anexo"}
        </Link>
    </StyledPaper>
  );
};

export default ExibiComunicado;