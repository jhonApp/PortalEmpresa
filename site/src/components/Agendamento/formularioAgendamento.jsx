import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledDatePicker, StyledTimePicker, StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../Utils/StyledForm';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Checkbox from '@mui/material/Checkbox';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';

dayjs.locale('pt-br');

const FormularioAgendamento = ({ onDataChange, onFieldValidationChange }) => {
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
      dataInicial: null,
      horaEntrada: null,
      horaSaida: null,
      dataFim: null,
      obs: '',
    },
    validateForm,
    'agendamento'
  );

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    const isValid = handleValidation(fieldName);
    onDataChange({ ...values, [fieldName]: value }); // Atualize todos os dados do formulário e chame onDataChange
    onFieldValidationChange (isValid);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="pt-br">
      <StyledPaper sx={{background:'#FAFAFA'}} elevation={1}>
        <FormContainer>
          <Column>
            <FormRow>
              <StyledDatePicker
                label="Data Inicial *"
                variant="outlined"
                fullWidth
                margin="normal"
                name="dataInicial"
                error={errors.dataInicial}
                value={values.dataInicial}
                onChange={(e) => { handleFormChange('dataInicial', e); }}
                onBlur={() => handleValidation('dataInicial')}
              />
              {renderErrorMessage('dataInicial')}
            </FormRow>
            <FormRow>
              <StyledTimePicker
                label="Hora de Entrada *"
                variant="outlined"
                fullWidth
                margin="normal"
                type="time"
                name="horaEntrada"
                ampm={false}
                inputFormat="HH:mm"
                error={errors.horaEntrada}
                value={values.horaEntrada}
                onChange={(e) => handleFormChange('horaEntrada', e)}
                onBlur={() => handleValidation('horaEntrada')}
              />
            </FormRow>
          </Column>
          <Column>
            <FormRow>
              <StyledTimePicker
                label="Hora de Saída"
                variant="outlined"
                fullWidth
                margin="normal"
                type="time"
                name="horaSaida"
                ampm={false}
                inputFormat="HH:mm"
                error={errors.horaSaida}
                value={values.horaSaida}
                onChange={(e) => handleFormChange('horaSaida', e)}
                onBlur={() => handleValidation('horaSaida')}
              />
            </FormRow>
            <FormRow>
              <StyledDatePicker
                label="Data Fim *"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                name="dataFim"
                error={errors.dataFim}
                value={values.dataFim}
                onChange={(e) => handleFormChange('dataFim', e)}
                onBlur={() => handleValidation('dataFim')}
              />
            </FormRow>
          </Column>
        </FormContainer>
        <FormRow>
          <StyledTextField
            label="Observação"
            variant="outlined"
            fullWidth
            margin="normal"
            name="obs"
            style={{ width: '100%' }}
            multiline
            error={errors.obs}
            value={values.obs}
            onChange={(e) => handleFormChange('obs', e.target.value)}
            onBlur={() => handleValidation('obs')}
          />
        </FormRow>
        {/* <FormRow style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
            sx={{
                padding: '9px 9px 9px 0px !important',
                '& .MuiSvgIcon-root': { color: '#C4C7D4' }
            }}
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />
            <span sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}>Comunicar a empresa quando o visitante chegar</span>
        </FormRow> */}
      </StyledPaper>
    </LocalizationProvider>
  );
};

export default FormularioAgendamento;
