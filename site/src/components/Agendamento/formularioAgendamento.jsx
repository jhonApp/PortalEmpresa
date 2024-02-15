import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledDatePicker, StyledTimePicker, StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../Utils/StyledForm';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Checkbox from '@mui/material/Checkbox';

dayjs.locale('pt-br');

const FormularioAgendamento = ({ onDataChange }) => {
  const [checked, setChecked] = React.useState(false);

  const [formData, setFormData] = useState({
    dataInicial: null,
    horaEntrada: null,
    dataFim: null,
    horaSaida: null,
    obs: '',
  });

  const handleChange = (e) => {
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
                value={formData.dataInicial}
                onChange={handleChange}
                inputFormat="DD/MM/YYYY"
              />
            </FormRow>
            <FormRow>
              <StyledTimePicker
                label="Hora de Entrada *"
                variant="outlined"
                fullWidth
                margin="normal"
                type="time"
                name="horaEntrada"
                value={formData.horaEntrada}
                onChange={handleChange}
                ampm={false}
                inputFormat="HH:mm"
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
                value={formData.horaSaida}
                onChange={handleChange}
                ampm={false}
                inputFormat="HH:mm"
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
                value={formData.dataFim}
                onChange={handleChange}
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
            value={formData.obs}
            onChange={handleChange}
            multiline
          />
        </FormRow>
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
            <span sx={{ fontFamily: '"Roboto","Helvetica","Arial",sans-serif' }}>Comunicar a empresa quando o visitante chegar</span>
        </FormRow>
      </StyledPaper>
    </LocalizationProvider>
  );
};

export default FormularioAgendamento;
