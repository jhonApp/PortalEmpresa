import React, { useState, useEffect } from 'react';
import { Box, Paper, InputLabel, Typography, useTheme, Badge } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledButtonPrimary } from '../../Utils/StyledButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledTextField, StyledTextObs, StyledDatePicker, StyledTimePicker, FormSection, FormContainer, Column, FormRow } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Image } from 'phosphor-react';
import { deleteCartao } from '../../../service/cartaoService';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import useForm from '../Formulario/useForm';
import { validateForm } from '../Formulario/validation';
import SelectLocal from './selectLocal';
import Calendario from './Calendario';
import { inserirEvento } from '../../../service/eventoService';


import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
const today = dayjs();

function Pagina({ espacos, loading, setLoading, atualizaEspacos }) {
  const [maxPessoaChange, setMaxPessoa] = useState('');
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [locale, setLocale] = useState('pt-br');
  const [codigoCartao, setCodigoCartao] = useState(null);
  const [formData, setformData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'funcionario'
  );
  console.log(formData)
  console.log(values)

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    setformData({ ...values, [fieldName]: value });
    console.log(formData)
  };

  const handleSelectChange = (fieldName, newValue) => {
    handleFormChange(fieldName, newValue);
    const selectedEspaco = espacos.find((espaco) => espaco.codigoLocal === newValue);
    if (selectedEspaco) { setMaxPessoa(selectedEspaco.maxPessoa); }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (!codigoCartao) return;
      await deleteCartao(codigoCartao);
      showSuccessToast('Cartão excluído com sucesso!');
      atualizaCartao();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
    }
  };

  const handleReserva = async () => {
    try {
      setLoading(true);
      
      const { errorTypes } = validateForm(formData, 'evento');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      await handleSubmit(async () => {        
        try{
            await inserirEvento(formData);
            showSuccessToast("Criado com sucesso!");
            // setEspacoFiltrados([...espacosFiltrados, formData]); 
            setformData('');
        } catch (e) {
          setLoading(false);
          showErrorToast(e.message);
        }
      });
      setLoading(false);

    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
    }
  }

  return (
    <Box
      gap={1}
      marginX={1}
      margin={2}
      padding={2}
      paddingX={2}
      paddingBottom={3}
      display="flex"
      backgroundColor="#FAFAFA"
      flexDirection="column"
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <Box display="flex" gap={2} flexDirection={'column'}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Reservar Espaço
          </Typography>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Box style={{width: 750}}>
            <FormContainer>
              <Column>
                {/*Local*/}
                <FormRow style={{width: '321px'}}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                    >
                      Local *
                    </InputLabel>
                    <FormSection>
                      <SelectLocal 
                        espacos={espacos} 
                        onChange={(newValue) => {
                          handleSelectChange('codigoLocal', newValue);
                        }}
                      />
                    </FormSection>
                </FormRow>
              </Column>
              <Column>
                {/*N° Máximo*/}
                <FormRow style={{width: '260px'}}>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 20, color: '#666666', fontWeight: 600, textAlign: 'start' }}
                  >
                    N° Máximo de Pessoas
                  </InputLabel>
                  <StyledTextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    disabled
                    autoComplete="off"
                    value={maxPessoaChange || ''}
                  />
                </FormRow>
              </Column>
              <Column>
                <FormRow>
                  <Image
                    size={52}
                    style={{ marginTop: '24px' }}
                    src={formData.file ? formData.file : '/broken-image.jpg'} // Define a imagem do Avatar com base se um arquivo foi selecionado ou não
                  />
                </FormRow>
              </Column>
            </FormContainer>
            <FormContainer>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <Column>
                  {/*Resposável*/}
                  <FormRow style={{width: '280px'}}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                    >
                      Resposável *
                    </InputLabel>
                    <StyledTextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="text"
                      autoComplete="off"
                      error={errors.descricao}
                      value={formData.descricao || ''}
                      onChange={(e) => handleFormChange('descricao', e.target.value)}
                      onBlur={(e) => handleFormChange('descricao', e.target.value)}
                    />
                  </FormRow>
                </Column>
                <Column>
                  {/*Data*/}
                  <FormRow style={{width: '170px'}}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                    >
                      Data *
                    </InputLabel>
                    <StyledDatePicker
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="date"
                      name="dataEvento"
                      error={errors.dataEvento}
                      value={formData.dataEvento || null}
                      onChange={(newValue) => {
                        handleFormChange('dataEvento', newValue);
                      }}
                      onBlur={() => handleValidation('dataEvento')}
                    />
                    {renderErrorMessage('dataEvento')}
                  </FormRow>
                </Column>
                <Column>
                  {/*Hora Inicio*/}
                  <FormRow style={{width: '120px'}}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                    >
                      Hora Início *
                    </InputLabel>
                    <StyledTimePicker
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="time"
                      name="horaInicio"
                      ampm={false}
                      inputFormat="HH:mm"
                      error={errors.horaInicio}
                      value={formData.horaInicio}
                      onChange={(e) => handleFormChange('horaInicio', e)}
                      onBlur={() => handleValidation('horaInicio')}
                    />
                  </FormRow>
                </Column>
                <Column>
                  {/*Hora Fim*/}
                  <FormRow style={{width: '120px'}}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                    >
                      Hora Fim *
                    </InputLabel>
                    <StyledTimePicker
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="time"
                      name="horaFim"
                      ampm={false}
                      inputFormat="HH:mm"
                      error={errors.horaFim}
                      value={values.horaFim}
                      onChange={(e) => handleFormChange('horaFim', e)}
                      onBlur={() => handleValidation('horaFim')}
                    />
                  </FormRow>
                </Column>
              </LocalizationProvider>
            </FormContainer>
            <FormContainer>
              <Column>
                {/*Observação*/}
                <FormRow>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                  >
                    Observação
                  </InputLabel>
                  <StyledTextObs
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="text"
                    autoComplete="off"
                    error={errors.obs}
                    value={values.obs || ''}
                    onChange={(e) => handleFormChange('obs', e.target.value)}
                    onBlur={(e) => handleFormChange('obs', e.target.value)}
                  />
                </FormRow>
              </Column>
            </FormContainer>
            <StyledButtonPrimary style={{top:'8px', float:'right'}} onClick={handleReserva}>RESERVAR</StyledButtonPrimary>
          </Box>
          <Box
            component={Paper}
            style={{
              borderRadius: '20px',
              width: '360px',
              height: '382px',
              paddingTop: '20px',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
            }}
            backgroundColor="#FAFAFA"
          >
            <Calendario formData={setformData} />
          </Box>
        </div>
      </Box>
      <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete} />
      <Progress isVisible={loading} />
    </Box>
  );
}

export default Pagina;
