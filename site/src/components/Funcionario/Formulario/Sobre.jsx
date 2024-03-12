import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledTextField, StyledSelectField, FormContainer, FormControlSelect, Column, FormRow, StyledDatePicker  } from '../../../Utils/StyledForm';
import { Checkbox, Typography, Fade, MenuItem } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import InputLabel from '@mui/material/InputLabel';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useForm from '../../Formulario/useForm';
import { validateForm } from '../../Formulario/validation';
import { listarCartao } from '../../../../service/cartaoService';
import { listarCargo } from '../../../../service/cargoService';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export default function AccordionTransition({ onDataChange, onFieldValidationChange, formData }) {
  const [expanded, setExpanded] = React.useState(false);
  const [cartoes, setCartoes] = useState([]);
  const [cargos, setCargos] = useState([]);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const dataCartoes = await listarCartao();
        setCartoes(dataCartoes);
        const dataCargos = await listarCargo();
        console.log(dataCargos);
        setCargos(dataCargos);
      } catch (error) {
        console.error('Erro ao obter condomínios:', error);
      }
    }
    fetchData();
  }, []);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    const isValid = handleValidation(fieldName);
    onDataChange({ ...values, [fieldName]: value });
    onFieldValidationChange (isValid);
    console.log(formData)
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
          <Typography fontWeight={600}>Sobre</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <FormContainer>
              <Column>
                {/*Nome Completo*/}
                <FormRow>
                  <StyledTextField
                    label="Nome Completo *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    autoComplete="off"
                    error={errors.nome}
                    value={values.nome || ''}
                    onChange={(e) => handleFormChange('nome', e.target.value)}
                    onBlur={(e) => handleFormChange('nome', e.target.value)}

                  />
                  {renderErrorMessage('nome')}
                </FormRow>
                {/*CPF*/}
                <FormRow>
                  <StyledTextField
                    label="CPF *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    autoComplete="off"
                    error={errors.cpf}
                    value={values.cpf || ''}
                    onChange={(e) => handleFormChange('cpf', e.target.value)}
                    onBlur={(e) => handleFormChange('cpf', e.target.value)}
                  />
                  {renderErrorMessage('cpf')}
                </FormRow>
              </Column>
              <Column>
                {/*Data Nascimento*/}
                <FormRow>
                  <StyledDatePicker
                    label="Data Nascimento *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="date"
                    name="dataNascimento"
                    error={errors.dataNascimento}
                    value={values.dataNascimento || null}
                    onChange={(newValue) => { handleFormChange('dataNascimento', newValue); }}
                    onBlur={() => handleValidation('dataNascimento')}
                  />
                  {renderErrorMessage('dataNascimento')}
                </FormRow>
                {/*RG*/}
                <FormRow>
                  <StyledTextField
                    label="RG *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    autoComplete="off"
                    error={errors.rg}
                    value={values.rg || ''}
                    onChange={(e) => handleFormChange('rg', e.target.value)}
                    onBlur={(e) => handleFormChange('rg', e.target.value)}
                  />
                  {renderErrorMessage('rg')}
                </FormRow>
              </Column>
            </FormContainer>
            <FormContainer>
              <Column>
                {/*Email*/}
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
                {/*Cartão*/}
                <FormControlSelect variant="outlined" style={{ marginTop: 10 }}>
                    <InputLabel id="cartao-label">Cartão</InputLabel>
                    <StyledSelectField
                      labelId="cartao-label"
                      label="cartão"
                      value={values.selectedCartao}
                      onChange={(e) => handleFormChange('selectedCartao', e.target.value)}
                      >
                      {cartoes.map(cartao => (
                        <MenuItem value={cartao.codigoCartao}> {cartao.codigoCartao} </MenuItem>
                      ))}
                    </StyledSelectField>
                </FormControlSelect>
              </Column>
              <Column>
                {/*Telefone*/}
                <FormRow>
                  <StyledTextField
                    label="Telefone *"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    autoComplete="off"
                    error={errors.telefone}
                    value={values.telefone || ''}
                    onChange={(e) => handleFormChange('telefone', e.target.value)}
                    onBlur={(e) => handleFormChange('telefone', e.target.value)}
                  />
                  {renderErrorMessage('telefone')}
                </FormRow>
                {/*Cargo*/}
                <FormControlSelect variant="outlined" style={{ marginTop: 10 }}>
                    <InputLabel id="cargo-label">Cargo</InputLabel>
                    <StyledSelectField
                      labelId="cargo-label"
                      label="cargo"
                      value={values.selectedCargo}
                      onChange={(e) => handleFormChange('selectedCargo', e.target.value)}
                    >
                      {cargos.map(cargo => (
                        <MenuItem value={cargo.codigo}> {cargo.nome} </MenuItem>
                      ))}
                    </StyledSelectField>
                </FormControlSelect>
              </Column>
            </FormContainer>
            <FormContainer>
              <Column>
                {/*RecebeVisita*/}
                <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                  <Checkbox
                    sx={{
                      padding: '0px 0px 0px 0px !important',
                      '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                    }}
                    checked={values.recebeVisita || false}
                    error={errors.recebeVisita}
                    onChange={(e) => {
                      values.recebeVisita = e.target.checked;
                      handleFormChange('recebeVisita', e.target.checked);
                    }}
                    inputProps={{ 'aria-label': 'primary checkbox' }}   
                  />
                  <Typography sx ={{marginLeft: 1, fontSize: 14}}>Recebe Visita</Typography>
                </FormRow>
              </Column>
              <Column>
                {/*AcessoPortal*/}
                <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                    <Checkbox
                      sx={{
                        padding: '0px 0px 0px 0px !important',
                        '& .MuiSvgIcon-root': { color: '#C4C7D4' }
                      }}
                      checked={values.acessoPortal || false}
                      error={errors.acessoPortal}
                      onChange={(e) => {
                        values.acessoPortal = e.target.checked;
                        handleFormChange('acessoPortal', e.target.checked);
                      }}
                      inputProps={{ 'aria-label': 'primary checkbox' }}   
                    />
                    <Typography sx ={{marginLeft: 1, fontSize: 14}}>Possui acesso ao portal</Typography>
                </FormRow>
              </Column>
            </FormContainer>
          </LocalizationProvider>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}