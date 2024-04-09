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
      bloco: '',
      unidade: '',
      empresa: '',
      nome: '',
      rg: '',
      dataInicial: null,
      dataFim: null,
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
        bloco: '',
        unidade: '',
        empresa: '',
        nome: '',
        rg: '',
        dataInicial: null,
        dataFim: null,
        tipo: ''
      });
    }
  }, [open]);

  const handleSearch = () => {
    let filteredData = [...data]; // Criar uma cópia dos dados originais
  
    // Filtrar pelo tipo se estiver selecionado
    if (formData.tipo && formData.tipo !== 'todos') {
      filteredData = filteredData.filter(item => item.tipo === formData.tipo);
    }
  
    // Aplicar filtros adicionais se o campo de nome estiver preenchido
    if (formData.bloco) {
      filteredData = filteredData.filter(item =>
        item.bloco.toLowerCase().includes(formData.bloco.toLowerCase())
      );
    }

    if (formData.unidade) {
      filteredData = filteredData.filter(item =>
        item.unidade.toLowerCase().includes(formData.unidade.toLowerCase())
      );
    }

    if (formData.empresa) {
      filteredData = filteredData.filter(item =>
        item.empresa.toLowerCase().includes(formData.empresa.toLowerCase())
      );
    }

    if (formData.nome) {
      filteredData = filteredData.filter(item =>
        item.nome.toLowerCase().includes(formData.nome.toLowerCase())
      );
    }

    if (formData.rg) {
      filteredData = filteredData.filter(item =>
        item.rg.toLowerCase().includes(formData.rg.toLowerCase())
      );
    }
  
    // Aplicar filtros de datas se estiverem preenchidos
    if (formData.dataInicial && formData.dataFim) {
      filteredData = filteredData.filter(item =>
        dayjs(item.dtValid).isSameOrAfter(dayjs(formData.dataInicial), 'day') &&
        dayjs(item.dtEnd).isSameOrBefore(dayjs(formData.dataFim), 'day')
      );
    } else if (formData.dataInicial) {
      filteredData = filteredData.filter(item =>
        dayjs(item.dataInicial).isSameOrAfter(dayjs(formData.dataInicial), 'day')
      );
    } else if (formData.dataFim) {
      filteredData = filteredData.filter(item =>
        dayjs(item.dataFim).isSameOrBefore(dayjs(formData.dataFim), 'day')
      );
    }
  
    setData(filteredData);
    handleClose();
  };
  

  const handleFormChange = (fieldName, value) => {
    setFormData(prevFormData => ({ ...prevFormData, [fieldName]: value }));
  };

  const DrawerList = (
    <Box sx={{p: 2, backgroundColor: '#FAFAFA' }} role="presentation" >
      <Typography variant="h5" component="h1" style={{ fontWeight: 'bold', marginBottom: 0, borderBottom: '1px solid #CCCCCC' }}>{"Filtros"}</Typography>
        <StyledPaperFiltro sx={{background:'#FAFAFA'}} elevation={1}>
            <FormContainer>
                <Column>
                    {/*Bloco/Torre*/}
                    <FormRow>
                        <InputLabel shrink htmlFor="rgCpf-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                            Bloco/Torre
                        </InputLabel>
                        <StyledTextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            value={formData.bloco}
                            onChange={(e) => handleFormChange('blovo', e.target.value)}
                        />
                    </FormRow>
                    {/*unidade*/}
                    <FormRow>
                        <InputLabel shrink htmlFor="rgCpf-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                            Unidade
                        </InputLabel>
                        <StyledTextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            autoComplete="off"
                            value={formData.unidade}
                            onChange={(e) => handleFormChange('unidade', e.target.value)}
                            onBlur={(e) => handleFormChange('unidade', e.target.value)}

                        />
                    </FormRow>
                    {/*empresa*/}
                    <FormRow>
                        <InputLabel shrink htmlFor="rgCpf-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                            Empresa
                        </InputLabel>
                        <StyledTextField
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="text"
                            autoComplete="off"
                            value={formData.empresa}
                            onChange={(e) => handleFormChange('empresa', e.target.value)}
                            onBlur={(e) => handleFormChange('empresa', e.target.value)}

                        />
                    </FormRow>
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
                            value={formData.nome}
                            onChange={(e) => handleFormChange('nome', e.target.value)}
                            onBlur={(e) => handleFormChange('nome', e.target.value)}

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
                            type="text"
                            autoComplete="off"
                            value={formData.rg}
                            onChange={(e) => handleFormChange('rg', e.target.value)}
                            onBlur={(e) => handleFormChange('rg', e.target.value)}

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
                    <FormLabel id="tipo-radio" sx={{ textAlign: 'end', fontWeight: 600, mb:'10px' }} component="legend">Tipo</FormLabel>
                    <RadioGroup
                        aria-labelledby="tipo-radio"
                        name="tipo-radio"
                    >
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.tipo === 'todos'} 
                                    onChange={() => { handleFormChange('tipo', 'todos');  }}
                                   name="todos" 
                                />
                            }
                            label="Todos"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio
                                    checked={formData.tipo === 'funcionario'}
                                    onChange={() => handleFormChange('tipo', 'funcionario')}
                                    name="funcionario"
                                />
                            }
                            label="Funcionários"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.tipo === 'visitanteSimples'} 
                                   onChange={() => handleFormChange('tipo', 'visitanteSimples')}
                                   name="visitanteSimples" 
                                />
                            }
                            label="Visitante Simples"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.tipo === 'prestadorServico'} 
                                   onChange={() => handleFormChange('tipo', 'prestadorServico')}
                                   name="prestadorServico" 
                                />
                            }
                            label="Prestador de Serviço"
                        />
                        <StyledFormControlLabel
                            control={
                                <Radio checked={formData.tipo === 'visitanteEspecial'} 
                                   onChange={() => handleFormChange('tipo', 'visitanteEspecial')}
                                   name="visitanteEspecial" 
                                />
                            }
                            label="Visitante Especial"
                        />
                    </RadioGroup>
                </FormControl>
            </FormContainer>
            <DialogActions sx={{ backgroundColor: '#FAFAFA', borderTop: '1px solid #CCCCCC', paddingTop: 3, justifyContent: 'space-around' }}>
            <StyledButtonSecundaryFiltro onClick={handleClose}> Cancelar </StyledButtonSecundaryFiltro>
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