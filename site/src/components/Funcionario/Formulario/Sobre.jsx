import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledTextField, StyledSelectField, FormContainer, FormControlSelect, Column, FormRow, StyledDatePicker  } from '../../../Utils/StyledForm';
import { Checkbox, Typography, Fade, MenuItem, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import InputMask from 'react-input-mask';
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

export default function AccordionTransition({ invalidFields, onDataChange, formData }) {
  const [expanded, setExpanded] = React.useState(false);
  const [cartoes, setCartoes] = useState(null);
  const [cargos, setCargos] = useState(null);
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
    onDataChange({ ...values, [fieldName]: value });
  };
  console.log(formData)
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
          <Typography fontSize={20} fontWeight={600}>Sobre</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <FormContainer>
              <Column>
                {/*Nome Completo*/}
                <FormRow>
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Nome Completo *
                  </InputLabel>
                  <StyledTextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    autoComplete="off"
                    error={invalidFields.some(field => field.field === 'nome')}
                    value={values.nome || ''}
                    onChange={(e) => handleFormChange('nome', e.target.value)}
                    onBlur={(e) => handleFormChange('nome', e.target.value)}

                  />
                  {renderErrorMessage('nome')}
                </FormRow>
                {/*CPF*/}
                <FormRow>
                  <InputMask
                      mask="999.999.999-99"
                      maskChar=" "
                      value={values.cpf || ''}
                      onChange={(e) => handleFormChange('cpf', e.target.value)}>
                      {() => (
                        <div>
                          <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                            CPF *
                          </InputLabel>
                          <StyledTextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={invalidFields.some(field => field.field === 'cpf')}
                          />
                          {renderErrorMessage('cpf')}
                        </div>
                      )}
                  </InputMask>
                </FormRow>
              </Column>
              <Column>
                {/*Data Nascimento*/}
                <FormRow>
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Data Nascimento *
                  </InputLabel>
                  <StyledDatePicker
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="date"
                    name="dataNascimento"
                    error={invalidFields.some(field => field.field === 'dataNascimento')}
                    value={values.dataNascimento || null}
                    onChange={(newValue) => { handleFormChange('dataNascimento', newValue); }}
                  />
                  {renderErrorMessage('dataNascimento')}
                </FormRow>
                {/*RG*/}
                <FormRow>
                  <InputMask
                      mask="99.999.999-9"
                      maskChar=" "
                      value={values.rg || ''}
                      onChange={(e) => handleFormChange('rg', e.target.value)}
                    >
                      {() => (
                        <div>
                          <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                            RG *
                          </InputLabel>
                          <StyledTextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={invalidFields.some(field => field.field === 'rg')}
                          />
                          {renderErrorMessage('rg')}
                        </div>
                      )}
                  </InputMask>
                </FormRow>
              </Column>
            </FormContainer>
            <FormContainer>
              <Column>
                {/*Email*/}
                <FormRow>
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Email *
                  </InputLabel>
                  <StyledTextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    autoComplete="off"
                    error={invalidFields.some(field => field.field === 'email')}
                    value={values.email || ''}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    onBlur={(e) => handleFormChange('email', e.target.value)}
                  />
                  {renderErrorMessage('email')}
                </FormRow>
                <FormRow>
                  {/*Cartão*/}
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Cartão
                  </InputLabel>
                  <StyledSelectField
                      label="cartão"
                      value={values.selectedCartao}
                      options={cartoes ? cartoes.map((cartao) => ({ label: cartao.codigoCartao, value: cartao.codigoCartao })) : []}
                      getOptionLabel={(option) => option.label.toString()}
                      onChange={(e, value) => handleFormChange('selectedCartao', value.value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          variant="outlined"
                        />
                      )}
                    />
                </FormRow>
              </Column>
              <Column>
                {/*Telefone*/}
                <FormRow>
                  <InputMask
                      mask="(99) 99999-9999"
                      maskChar=" "
                      value={values.telefone || ''}
                      onChange={(e) => handleFormChange('telefone', e.target.value)}
                    >
                      {() => (
                        <div>
                          <InputLabel shrink htmlFor="tel-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                            Telefone *
                          </InputLabel>
                          <StyledTextField 
                            id="tel-input"
                            type="text"
                            autoComplete="off"
                            name="telefone"
                            error={errors.telefone}
                          />
                          {renderErrorMessage('telefone')}
                        </div>
                      )}
                  </InputMask>
                </FormRow>
                {/*Cargo*/}
                <FormRow>
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                    Cargo
                  </InputLabel>
                  <StyledSelectField
                    label="cargo"
                    value={values.selectedCargo}
                    options={cargos ? cargos.map((cargo) => ({ label: `${cargo.nome}`, value: cargo.codigo })) : []}
                    onChange={(event, newValue) => handleFormChange('selectedCargo', newValue.value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        variant="outlined"
                      />
                    )}
                  />
                </FormRow>
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