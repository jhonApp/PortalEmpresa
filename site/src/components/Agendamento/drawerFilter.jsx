import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledTextField, StyledDatePicker, StyledPaperFiltro, StyledFormControlLabel, FormContainer, Column, FormRow  } from '../../Utils/StyledForm';
import { Dialog, DialogContent, DialogActions, RadioGroup, Paper, useTheme, Radio, FormControl, FormLabel } from '@mui/material';
import { StyledButtonPrimaryFiltro, StyledButtonSecundaryFiltro } from '../../Utils/StyledButton';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import 'dayjs/locale/pt-br';
import { InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


dayjs.locale('pt-br');
dayjs.extend(isSameOrAfter);

export default function TemporaryDrawer({ open, handleClose, data, setData }) {
    const [openFilter, setOpen] = React.useState(open);
    const [locale, setLocale] = useState('pt-br');
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        rgCpf: '',
        dataInicial: null,
        dataFim: null,
        status: '',
        tipo: ''
    });

    React.useEffect(() => {
      setOpen(open);
    }, [open]);
    
    const toggleDrawer = (newOpen) => () => {
        if (!newOpen) {
          setOpen(newOpen);
          handleClose();
        }
    };
      

  useEffect(() => {
    if (!open) {
      setFormData({
        nomeCompleto: '',
        rgCpf: '',
        dataInicial: null,
        dataFim: null,
        status: '',
        tipo: ''
      });
    }
  }, [open]);

  const handleSearch = () => {
    let filteredData = [...data]; // Criar uma cópia dos dados originais
  
    // Filtrar pelo status se estiver selecionado
    if (formData.status && formData.status !== 'todos') {
      filteredData = filteredData.filter(item => item.status === formData.status);
    }
  
    // Filtrar pelo tipo se estiver selecionado
    if (formData.tipo && formData.tipo !== 'todos') {
      filteredData = filteredData.filter(item => item.tipo === formData.tipo);
    }
  
    // Aplicar filtros adicionais se o campo de nome estiver preenchido
    if (formData.nomeCompleto) {
      filteredData = filteredData.filter(item =>
        item.nomeCompleto.toLowerCase().includes(formData.nomeCompleto.toLowerCase())
      );
    }
  
    // Aplicar filtros de datas se estiverem preenchidos
    if (formData.dtValid && formData.dtEnd) {
      filteredData = filteredData.filter(item =>
        dayjs(item.dtValid).isSameOrAfter(dayjs(formData.dtValid), 'day') &&
        dayjs(item.dtEnd).isSameOrBefore(dayjs(formData.dtEnd), 'day')
      );
    } else if (formData.dtValid) {
      filteredData = filteredData.filter(item =>
        dayjs(item.dtValid).isSameOrAfter(dayjs(formData.dtValid), 'day')
      );
    } else if (formData.dtEnd) {
      filteredData = filteredData.filter(item =>
        dayjs(item.dtEnd).isSameOrBefore(dayjs(formData.dtEnd), 'day')
      );
    }
  
    setData(filteredData);
    handleClose();
  };
  

  const handleFormChange = (fieldName, value) => {
    setFormData(prevFormData => ({ ...prevFormData, [fieldName]: value }));
  };

  const DrawerList = (
    <Box sx={{ marginTop: 8, p: 2, backgroundColor: '#FAFAFA' }} role="presentation" >
      <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', marginBottom: 0, borderBottom: '1px solid #CCCCCC' }}>{"Filtros"}</Typography>
        <StyledPaperFiltro sx={{background:'#FAFAFA'}} elevation={1}>
            <FormContainer>
                <Column>
                    {/*Nome*/}
                    <FormRow>
                        <InputLabel shrink htmlFor="rgCpf-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                            Nome
                        </InputLabel>
                        <StyledTextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            value={formData.nomeCompleto}
                            onChange={(e) => handleFormChange('nomeCompleto', e.target.value)}
                        />
                    </FormRow>
                    {/*RG*/}
                    <FormRow>
                        <InputLabel shrink htmlFor="rgCpf-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                            RG
                        </InputLabel>
                        <StyledTextField
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
                </Column>
            </FormContainer>
            <FormContainer>
                <Column>
                    {/*Data Final*/}
                    <FormRow>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                            <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                                Data Inicial
                            </InputLabel>
                            <StyledDatePicker
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
                    {/*Data Inicial*/}
                    <FormRow>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                            <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                                Data Final
                            </InputLabel>
                            <StyledDatePicker
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
                                    onChange={() => { handleFormChange('status', 'todos');  }}
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
            <DialogActions sx={{ backgroundColor: '#FAFAFA', borderTop: '1px solid #CCCCCC', paddingTop: 3, justifyContent: 'space-around' }}>
            <StyledButtonSecundaryFiltro onClick={onclose}> Cancelar </StyledButtonSecundaryFiltro>
            <StyledButtonPrimaryFiltro onClick={handleSearch}> Filtrar </StyledButtonPrimaryFiltro>
        </DialogActions>
        </StyledPaperFiltro>
      {/* <Divider /> */}
      
    </Box>
  );

  return (
    <div>
      <Drawer open={openFilter} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}