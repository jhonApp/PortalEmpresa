import React, { useState } from 'react';
import { StyledTextField, StyledTimePicker, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Divider from '@mui/material/Divider';
import { Checkbox, Typography, Fade } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import InputLabel from '@mui/material/InputLabel';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useForm from '../../Formulario/useForm';
import { validateForm } from '../../Formulario/validation';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
const today = dayjs();

export default function AccordionTransition({ invalidFields, onDataChange, formData }) {
  const [expanded, setExpanded] = React.useState(false);
  const [locale, setLocale] = useState('pt-br');
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
    onDataChange({ ...values, [fieldName]: value });
  };

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          backgroundColor: 'transparent',
          borderBottom: '1px solid #BCC0CF',
          '& .MuiAccordion-region': { height: expanded ? '422px' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none', backgroundColor: 'transparent', },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          
          id="panel1-header"
        >
          <Typography fontSize={20} fontWeight={600}>Configuração de Acesso</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormContainer>
            <Column>
              {/*Hora Entrada*/}
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Horário de Entrada *
                </InputLabel>
                <FormRow>
                  <StyledTimePicker
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="time"
                    name="horaEntrada"
                    ampm={false}
                    inputFormat="HH:mm"
                    error={invalidFields.some(field => field.field === 'horaEntrada')}
                    value={values.horaEntrada}
                    onChange={(e) => handleFormChange('horaEntrada', e)}
                  />
                </FormRow>
              </ LocalizationProvider>
              {/*Segunda*/}
              <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  sx={{
                    padding: '0px 0px 0px 0px !important',
                    '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                  }}
                  checked={values.segunda || false}
                  error={errors.segunda}
                  onChange={(e) => {
                    values.segunda = e.target.checked;
                    handleFormChange('segunda', e.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}   
                />
                <Typography sx ={{marginLeft: 1, fontSize: 14, fontWeight: '600'}}>Segunda-Feira</Typography>
              </FormRow>
            </Column>
            <Column>
              {/*Hora Saída*/}
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <FormRow>
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Horário de Saída *
                  </InputLabel>
                  <StyledTimePicker
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="time"
                    name="horaSaida"
                    ampm={false}
                    inputFormat="HH:mm"
                    error={invalidFields.some(field => field.field === 'horaSaida')}
                    value={values.horaSaida}
                    onChange={(e) => handleFormChange('horaSaida', e)}
                  />
                </FormRow>
              </ LocalizationProvider>
              {/*Sexta*/}
              <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  sx={{
                    padding: '0px 0px 0px 0px !important',
                    '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                  }}
                  checked={values.sexta || false}
                  error={errors.sexta}
                  onChange={(e) => {
                    values.sexta = e.target.checked;
                    handleFormChange('sexta', e.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}   
                />
                <Typography sx ={{marginLeft: 1, fontSize: 14, fontWeight: '600'}}>Sexta-Feira</Typography>
              </FormRow>
            </Column>
          </FormContainer>
          <FormContainer>
            <Column>
              {/*Terça*/}
              <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  sx={{
                    padding: '0px 0px 0px 0px !important',
                    '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                  }}
                  checked={values.terca || false}
                  error={errors.terca}
                  onChange={(e) => {
                    values.terca = e.target.checked;
                    handleFormChange('terca', e.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}   
                />
                <Typography sx ={{marginLeft: 1, fontSize: 14, fontWeight: '600'}}>Terça-Feira</Typography>
              </FormRow>
              {/*Quarta*/}
              <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  sx={{
                    padding: '0px 0px 0px 0px !important',
                    '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                  }}
                  checked={values.quarta || false}
                  error={errors.quarta}
                  onChange={(e) => {
                    values.quarta = e.target.checked;
                    handleFormChange('quarta', e.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}   
                />
                <Typography sx ={{marginLeft: 1, fontSize: 14, fontWeight: '600'}}>Quarta-Feira</Typography>
              </FormRow>
              {/*Quinta*/}
              <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  sx={{
                    padding: '0px 0px 0px 0px !important',
                    '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                  }}
                  checked={values.quinta || false}
                  error={errors.quinta}
                  onChange={(e) => {
                    values.quinta = e.target.checked;
                    handleFormChange('quinta', e.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}   
                />
                <Typography sx ={{marginLeft: 1, fontSize: 14, fontWeight: '600'}}>Quinta-Feira</Typography>
              </FormRow>
            </Column>
            <Column>
              {/*Sábado*/}
              <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  sx={{
                    padding: '0px 0px 0px 0px !important',
                    '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                  }}
                  checked={values.sabado || false}
                  error={errors.sabado}
                  onChange={(e) => {
                    values.sabado = e.target.checked;
                    handleFormChange('sabado', e.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}   
                />
                <Typography sx ={{marginLeft: 1, fontSize: 14, color: '#FE4141', fontWeight: '600'}}>Sábado</Typography>
              </FormRow>
              {/*Domingo*/}
              <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  sx={{
                    padding: '0px 0px 0px 0px !important',
                    '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                  }}
                  checked={values.domingo || false}
                  error={errors.domingo}
                  onChange={(e) => {
                    values.domingo = e.target.checked;
                    handleFormChange('domingo', e.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}   
                />
                <Typography sx ={{marginLeft: 1, fontSize: 14, color: '#FE4141', fontWeight: '600'}}>Domingo</Typography>
              </FormRow>
              {/*Feriado*/}
              <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Checkbox
                  sx={{
                    padding: '0px 0px 0px 0px !important',
                    '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                  }}
                  checked={values.feriado || false}
                  error={errors.feriado}
                  onChange={(e) => {
                    values.feriado = e.target.checked;
                    handleFormChange('feriado', e.target.checked);
                  }}
                  inputProps={{ 'aria-label': 'primary checkbox' }}   
                />
                <Typography sx ={{marginLeft: 1, fontSize: 14, color: '#FE4141', fontWeight: '600' }}>Feriados</Typography>
              </FormRow>
            </Column>
          </FormContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}