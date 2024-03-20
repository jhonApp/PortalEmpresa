import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledTextField, StyledDatePicker, StyledPaperFiltro, StyledFormControlLabel, FormContainer, Column, FormRow  } from '../../Utils/StyledForm';
import { Dialog, DialogContent, DialogActions , Button, RadioGroup, Paper, useTheme, Radio, FormGroup, FormControl, FormLabel, FormControlLabel  } from '@mui/material';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import { StyledButtonPrimaryFiltro, StyledButtonSecundaryFiltro } from '../../Utils/StyledButton';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

function PopupDialog({ open, handleClose, data, setData }) {
  const theme = useTheme();
  const [locale, setLocale] = useState('pt-br');
  const [formData, setFormData] = useState({});
  const {
    values,
    errors,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'agendamento'
  );

  const handleFormChange = (fieldName, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: value }));
  };
  

  const handleSearch = () => {
    const filters = [
      {
        key: 'userName',
        filterFunc: (item, value) => value && item.userName.toLowerCase().includes(value.toLowerCase())
      },
      {
        key: 'userDoc',
        filterFunc: (item, value) => value && item.userDoc.includes(value)
      },
      {
        key: 'dtValid',
        filterFunc: (item, value) => dayjs(item.dtValid).isAfter(dayjs(value), 'day')
      },
      {
        key: 'dtEnd',
        filterFunc: (item, value) => dayjs(item.dtEnd).isBefore(dayjs(value), 'day')
      },
      {
        key: 'status',
        filterFunc: (item, value) => {
          if (values.todos) return true;
          return item.status === (values.ativo ? 'ativo' : 'inativo');
        }
      },
      {
        key: 'tipo',
        filterFunc: (item, value) => {
          if (values.todos) return true;
          return item.tipo === (values.visitanteSimples ? 'visitanteSimples' : (values.visitanteEspecial ? 'visitanteEspecial' : 'prestadorServico'));
        }
      }
    ];

    let filteredData = [];
    data.forEach(item => {
        filters.every(filter => {
            if (filter.key === 'todos') return true;
            const fieldValue = formData[filter.key];
            console.log(item.userDoc.includes(formData.userDoc))
            if(filter.filterFunc(item, fieldValue)){ 
                filteredData.push(item) 
            }
        });
    });

    console.log(filteredData)
    setData(filteredData);
    handleClose();
  };

  
  
  
  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogContent style={{ padding: '0px' }} >
        <Paper
          style={{
            backgroundColor: '#FAFAFA',
            color: theme.palette.text.primary,
            padding: '30px',
            boxShadow: 'none',
            overflowY: 'auto', 
          }}
        >
          <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', marginBottom: theme.spacing(0), borderBottom: '1px solid #CCCCCC' }}>{"Filtros"}</Typography>
          <StyledPaperFiltro sx={{background:'#FAFAFA'}} elevation={1}>
            <FormContainer>
                <Column>
                    {/*Nome*/}
                    <FormRow>
                        <StyledTextField
                            label="Nome"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            error={errors.userName}
                            value={values.userName}
                            onChange={(e) => handleFormChange('userName', e.target.value)}
                            onBlur={(e) => handleFormChange('userName', e.target.value)}
                        />
                    </FormRow>
                    {/*Data Inicial*/}
                    <FormRow>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                            <StyledDatePicker
                                label="Data Inicial"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="date"
                                name="dtValid"
                                error={errors.dtValid}
                                value={values.dtValid || null}
                                onChange={(newValue) => { handleFormChange('dtValid', newValue); }}
                                onBlur={() => handleValidation('dtValid')}
                            />
                        </LocalizationProvider>
                    </FormRow>
                </Column>
                <Column>
                    {/*RG*/}
                    <FormRow>
                        <StyledTextField
                            label="RG"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            autoComplete="off"
                            error={errors.userDoc}
                            value={values.userDoc}
                            onChange={(e) => handleFormChange('userDoc', e.target.value)}
                            onBlur={(e) => handleFormChange('userDoc', e.target.value)}

                        />
                    </FormRow>
                    {/*Data dataFinal*/}
                    <FormRow>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                            <StyledDatePicker
                                label="Data Final"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="date"
                                name="dtEnd"
                                error={errors.dtEnd}
                                value={values.dtEnd || null}
                                onChange={(newValue) => { handleFormChange('dtEnd', newValue); }}
                                onBlur={() => handleValidation('dtEnd')}
                            />
                        </LocalizationProvider>
                    </FormRow>
                </Column>
            </FormContainer>
            <FormContainer>
                <FormControl sx={{ mt: 1 }} component="fieldset" variant="standard">
                    <FormLabel id="status-radio" sx={{ textAlign: 'end', fontWeight: 600, mb:'10px' }} component="legend">Status</FormLabel>
                    <RadioGroup
                        aria-labelledby="status-radio"
                        name="radio-buttons-group"
                    >
                        <StyledFormControlLabel
                            control={
                                <Radio checked={values.todos || false} 
                                onChange={(e) => {
                                    values.todos = e.target.checked;
                                    handleFormChange('todos', e.target.checked);
                                }}
                                name="todos" />
                            }
                            label="Todos"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={values.ativo || false} 
                                    onChange={(e) => {
                                        values.ativo = e.target.checked;
                                        handleFormChange('ativo', e.target.checked);
                                    }}
                                name="ativo" />
                            }
                            label="Ativo"
                        />
                        <StyledFormControlLabel
                            control={
                            <Radio checked={values.inativo || false} 
                                onChange={(e) => {
                                    values.inativo = e.target.checked;
                                    handleFormChange('inativo', e.target.checked);
                                }}
                            name="inativo" />
                        }
                        label="Inativo"
                        />
                    </RadioGroup>
                </FormControl>
            </FormContainer>
            <FormContainer>
                <FormControl sx={{ mt: 1 }} component="fieldset" variant="standard">
                    <FormLabel id="status-radio" sx={{ textAlign: 'end', fontWeight: 600, mb:'10px' }} component="legend">Tipo de Agendamento</FormLabel>
                    <RadioGroup
                        aria-labelledby="status-radio"
                        name="radio-buttons-group"
                    >
                        <StyledFormControlLabel
                            control={
                                <Radio checked={values.todos || false} 
                                onChange={(e) => {
                                    values.todos = e.target.checked;
                                    handleFormChange('todos', e.target.checked);
                                }}
                                name="todos" />
                            }
                            label="Todos"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={values.ativo || false} 
                                    onChange={(e) => {
                                        values.visitanteSimples = e.target.checked;
                                        handleFormChange('visitanteSimples', e.target.checked);
                                    }}
                                name="visitanteSimples" />
                            }
                            label="Visitante Simples"
                        />
                        <StyledFormControlLabel
                            control={
                            <Radio checked={values.visitanteEspecial || false} 
                                onChange={(e) => {
                                    values.visitanteEspecial = e.target.checked;
                                    handleFormChange('visitanteEspecial', e.target.checked);
                                }}
                            name="visitanteEspecial" />
                        }
                        label="Visitante Especial"
                        />
                        <StyledFormControlLabel
                            control={
                            <Radio checked={values.prestadorServico || false} 
                                onChange={(e) => {
                                    values.prestadorServico = e.target.checked;
                                    handleFormChange('prestadorServico', e.target.checked);
                                }}
                            name="prestadorServico" />
                        }
                        label="Prestador de Serviço"
                        />
                    </RadioGroup>
                </FormControl>
            </FormContainer>
            <DialogActions sx={{ backgroundColor: '#FAFAFA', borderTop: '1px solid #CCCCCC', marginTop: 4, paddingTop: 1, justifyContent: 'space-around' }}>
                <StyledButtonSecundaryFiltro onClick={handleClose}> Cancelar </StyledButtonSecundaryFiltro>
                <StyledButtonPrimaryFiltro onClick={handleSearch}> Filtrar </StyledButtonPrimaryFiltro>
            </DialogActions>
          </StyledPaperFiltro>
        </Paper>
      </DialogContent>
      
    </Dialog>
  );
}

export default PopupDialog;