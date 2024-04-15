import React, { useState } from 'react';
import { StyledTextField, FormContainer, Column, FormRow, StyledDatePicker  } from '../../../Utils/StyledForm';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Accordion from '@mui/material/Accordion';
import InputLabel from '@mui/material/InputLabel';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useForm from '../../Formulario/useForm';
import { validateForm } from '../../Formulario/validation';
import Fade from '@mui/material/Fade';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
const today = dayjs();

export default function AccordionTransition({ onDataChange, formData }) {
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
    'funcionario'
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
          '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
          '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none', backgroundColor: 'transparent', },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography fontSize={20} fontWeight={600}>Dados Adicionais</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormContainer>
            <Column>
              {/*Nome Mãe*/}
              <FormRow>
                <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Nome Mãe
                </InputLabel>
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="text"
                  autoComplete="off"
                  error={errors.nomeMae}
                  value={values.nomeMae || ''}
                  onChange={(e) => handleFormChange('nomeMae', e.target.value)}
                  onBlur={(e) => handleFormChange('nomeMae', e.target.value)}
                />
                {renderErrorMessage('nomeMae')}
              </FormRow>
              {/*Admissão*/}
              <FormRow>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Admissão
                  </InputLabel>
                  <StyledDatePicker
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="date"
                    name="admissao"
                    error={errors.admissao}
                    value={values.admissao || null}
                    onChange={(newValue) => { handleFormChange('admissao', newValue); }}
                  />
                </ LocalizationProvider>
              </FormRow>
            </Column>
            <Column>
              {/*Nome Pai*/}
              <FormRow>
                <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Nome Pai
                </InputLabel>
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="text"
                  autoComplete="off"
                  error={errors.nomePai}
                  value={values.nomePai || ''}
                  onChange={(e) => handleFormChange('nomePai', e.target.value)}
                  onBlur={(e) => handleFormChange('nomePai', e.target.value)}
                />
                {renderErrorMessage('nomePai')}
              </FormRow>
              {/*Demissão*/}
              <FormRow>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Demissão
                  </InputLabel>
                  <StyledDatePicker
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="date"
                    name="demissao"
                    error={errors.demissao}
                    value={values.demissao || null}
                    onChange={(newValue) => { handleFormChange('demissao', newValue); }}
                  />
                </ LocalizationProvider>
              </FormRow>
            </Column>
            
          </FormContainer>
          <FormContainer>
            <Column>
              {/*Estado Civil*/}
              <FormRow>
                <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Estado Civil
                </InputLabel>
                <StyledTextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="text"
                  autoComplete="off"
                  error={errors.estadoCivil}
                  value={values.estadoCivil || ''}
                  onChange={(e) => handleFormChange('estadoCivil', e.target.value)}
                />
              </FormRow>
            </Column>
          </FormContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}