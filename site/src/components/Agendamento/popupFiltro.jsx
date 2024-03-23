import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledTextField, StyledDatePicker, StyledPaperFiltro, StyledFormControlLabel, FormContainer, Column, FormRow  } from '../../Utils/StyledForm';
import { Dialog, DialogContent, DialogActions, RadioGroup, Paper, useTheme, Radio, FormControl, FormLabel } from '@mui/material';
import { StyledButtonPrimaryFiltro, StyledButtonSecundaryFiltro } from '../../Utils/StyledButton';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
dayjs.extend(isSameOrAfter);

function PopupDialog({ open, handleClose, data, setData }) {
  const theme = useTheme();
  const [locale, setLocale] = useState('pt-br');
  const [formData, setFormData] = useState({
    userName: '',
    userDoc: '',
    dtValid: null,
    dtEnd: null,
    status: '',
    tipo: ''
  });

  const handleFormChange = (fieldName, value) => {
    setFormData(prevFormData => ({ ...prevFormData, [fieldName]: value }));
  };

  useEffect(() => {
    if (!open) {
      setFormData({
        userName: '',
        userDoc: '',
        dtValid: null,
        dtEnd: null,
        status: '',
        tipo: ''
      });
    }
  }, [open]);

  const handleSearch = () => {
    const filteredData = data.filter(item => {
      return Object.entries(formData).every(([key, value]) => {
        if (key === 'dtValid' || key === 'dtEnd') {
            return !value || dayjs(item[key]).isSameOrAfter(dayjs(value), 'day');
        } else if (key === 'status' || key === 'tipo') {
          return !value || item[key] === value;
        } else {
          return !value || item[key].toLowerCase().includes(value.toLowerCase());
        }
      });
    });

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
                            value={formData.userName}
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
                                value={formData.dtValid || null}
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
                            value={formData.userDoc}
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
                                value={formData.dtEnd || null}
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
                        name="status-radio"
                    >
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.status === 'todos'} 
                                   onChange={() => handleFormChange('tipo', 'todos')}
                                   name="todos" 
                                />
                            }
                            label="Todos"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio
                                    checked={formData.status === 'Ativo'}
                                    onChange={() => handleFormChange('status', 'Ativo')}
                                    name="ativo"
                                />
                            }
                            label="Ativo"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.status === 'Inativo'} 
                                   onChange={() => handleFormChange('status', 'Inativo')}
                                   name="inativo" 
                                />
                            }
                            label="Inativo"
                        />
                    </RadioGroup>
                </FormControl>
            </FormContainer>
            <FormContainer>
                <FormControl sx={{ mt: 1 }} component="fieldset" variant="standard">
                    <FormLabel id="tipo-radio" sx={{ textAlign: 'end', fontWeight: 600, mb:'10px' }} component="legend">Tipo de Agendamento</FormLabel>
                    <RadioGroup
                        aria-labelledby="tipo-radio"
                        name="tipo-radio"
                    >
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.tipo === 'todos'} 
                                   onChange={() => handleFormChange('tipo', 'todos')}
                                   name="todos" 
                                />
                            }
                            label="Todos"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.tipo === 'Visitante Simples'} 
                                   onChange={() => handleFormChange('tipo', 'Visitante Simples')}
                                   name="visitanteSimples" 
                                />
                            }
                            label="Visitante Simples"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.tipo === 'Visitante Especial'} 
                                    onChange={() => handleFormChange('tipo', 'Visitante Especial')}
                                    name="visitanteEspecial" 
                                />
                            }
                            label="Visitante Especial"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.tipo === 'Prestador de Serviço'} 
                                    onChange={() => handleFormChange('tipo', 'Prestador de Serviço')}
                                    name="prestadorServico" 
                                />
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