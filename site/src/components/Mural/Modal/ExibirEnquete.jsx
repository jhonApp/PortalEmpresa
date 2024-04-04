import React from 'react';
import { StyledFormControlLabel, StyledPaper } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { RadioGroup, Typography, Link, Radio } from '@mui/material';
import useForm from '../../Formulario/useForm';
import InputMask from 'react-input-mask';

const ExibiEnquete = ({ enquetes, sub, description, onDataChange, onFieldValidationChange, formData }) => {
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

  const labelStyle = {
    fontSize: '16px',
    fontWeight: 600
  };

  console.log(enquetes)
  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    const isValid = handleValidation(fieldName);
    console.log(isValid);
    onDataChange({ ...values, [fieldName]: value });
    onFieldValidationChange(isValid);
  };

  return (
    <StyledPaper sx={{ background: '#FAFAFA' }} elevation={1}>
      <Typography variant="h6" component="h7" style={{ fontWeight: 600, fontSize: 24 }}>
        {sub}
      </Typography>
      <StyledPaper sx={{ marginTop: 1, background: '#F5F5F5', border: '1px solid #ABACB2', padding: '10px', textAlign: 'start' }}>
        <div variant="h3" style={{ margin: 12}}>
          <RadioGroup
            aria-labelledby="status-radio"
            name="status-radio"
          >
              {enquetes.map((enquete, index) => (
                <StyledFormControlLabel key={index} value={enquete.opcao} control={<Radio />} label={<Typography style={labelStyle}>{enquete.descricao}</Typography>} />
              ))}
          </RadioGroup>
        </div>
      </StyledPaper>
      <Link variant="h6" component="h7" style={{ color: '#0000EE', fontWeight: 600, float: 'left', lineHeight: '2.6', textDecoration: 'none', cursor: 'pointer', fontSize: 16, textAlign: 'start' }}>
        {"Clica aqui para abrir o anexo"}
      </Link>
    </StyledPaper>
  );
};

export default ExibiEnquete;