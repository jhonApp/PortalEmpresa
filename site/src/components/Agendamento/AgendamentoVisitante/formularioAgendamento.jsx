import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';
import { StyledDatePicker, StyledTimePicker, StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Checkbox from '@mui/material/Checkbox';
import { validateForm } from '../../Formulario/validation';
import useForm from '../../Formulario/useForm';
import { fontSize } from '@mui/system';

dayjs.locale('pt-br');
const today = dayjs();

const FormularioAgendamento = ({ onDataChange, onFieldValidationChange, formData }) => {
  const [locale, setLocale] = useState('pt-br');
  const {
    values,
    errors,
    handleChange,
    handleValidation,
    renderErrorMessage
  } = useForm(
    formData,
    validateForm,
    'agendamento2'
  );

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale); // Função para atualizar o estado da localidade
  };

  const handleFormChange = (fieldName, value) => {
    let updatedValue = value;
  
    // Verificar se o campo é telefone e se o valor é válido
    if (fieldName === 'horaEntrada' || fieldName === 'horaSaida') {
      updatedValue = dayjs(value, "HH:mm").format('HH:mm');
    }
  
    const updatedValues = { ...values, [fieldName]: updatedValue };
    handleChange(fieldName, updatedValue);
    const isValid = handleValidation(fieldName);
    console.log(isValid)
    onDataChange(updatedValues);
    onFieldValidationChange(isValid);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setChegada(isChecked);
    handleFormChange('chegada', isChecked);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <StyledPaper sx={{background:'#FAFAFA'}} elevation={1}>
        <FormContainer>
          <Column>
            <FormRow>
              <StyledDatePicker
                label="Data Inicial *"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                name="dataInicial"
                minDate={today}
                error={errors.dataInicial}
                value={values.dataInicial || null}
                onChange={(newValue) => { handleFormChange('dataInicial', newValue); }}
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
              {renderErrorMessage('horaEntrada')}
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
              {renderErrorMessage('horaSaida')}
            </FormRow>
            <FormRow>
              <StyledDatePicker
                label="Data Fim *"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                name="dataFim"
                minDate={today}
                error={errors.dataFim}
                value={values.dataFim || null}
                onChange={(e) => handleFormChange('dataFim', e)}
                onBlur={() => handleValidation('dataFim')}
              />
              {renderErrorMessage('dataFim')}
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
            value={values.obs || ''}
            onChange={(e) => handleFormChange('obs', e.target.value)}
            onBlur={() => handleValidation('obs')}
          />
        </FormRow>
        <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 30 }}>
            <Checkbox
              sx={{
                  padding: '0px 0px 0px 0px !important',
                  '& .MuiSvgIcon-root': { color: '#C4C7D4' }
              }}
              checked={values.chegada || false}
              error={errors.chegada}
              onChange={(e) => {
                values.chegada = e.target.checked;
                handleFormChange('chegada', e.target.checked);
              }}
              inputProps={{ 'aria-label': 'primary checkbox' }}   
            />
            <Typography sx ={{marginLeft: 1, fontSize: 14}}>Comunicar a empresa quando o visitante chegar</Typography>
        </FormRow>
      </StyledPaper>
    </LocalizationProvider>
  );
};

export default FormularioAgendamento;
