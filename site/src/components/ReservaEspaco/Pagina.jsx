import React, { useState, useEffect } from 'react';
import { Modal, Box, Paper, InputLabel, Typography, useTheme, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledButtonPrimary } from '../../Utils/StyledButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StyledTextField, StyledTextObs, StyledDatePicker, StyledTimePicker, FormSection, FormContainer, Column, FormRow } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Image, XCircle } from 'phosphor-react';
import Carousel from '../Carousel';
import Progress from '../../Utils/LoadingProgress';
import useForm from '../Formulario/useForm';
import { validateForm } from '../Formulario/validation';
import SelectLocal from './selectLocal';
import Calendario from './Calendario';
import { inserirEvento } from '../../../service/eventoService';
import { getFoto } from '../../../service/espacoService';



import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
const today = dayjs();

function Pagina({ espacos, loading, setLoading }) {
  const [maxPessoaChange, setMaxPessoa] = useState('');
  const [attachment, setAttachment] = useState([]);
  const [codigoLocal, setCodigoLocal] = useState('');
  const [locale, setLocale] = useState('pt-br');
  const [formData, setformData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    setformData({ ...values, [fieldName]: value });
    console.log(formData)
  };

  const handleSelectChange = (fieldName, newValue) => {
    handleFormChange(fieldName, newValue);
    const selectedEspaco = espacos.find((espaco) => espaco.codigoLocal === newValue);

    if (selectedEspaco) { 
      setMaxPessoa(selectedEspaco.maxPessoa); 
      setCodigoLocal(selectedEspaco.codigoLocal);
    }
  };

  const handleReserva = async () => {
    try {
      setLoading(true);
      
      const { errorTypes } = validateForm(formData, 'evento');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        setLoading(false);
        return;
      }

      await handleSubmit(async () => {        
        try{
            await inserirEvento(formData);
            showSuccessToast("Criado com sucesso!");
            // setEspacoFiltrados([...espacosFiltrados, formData]); 
            setMaxPessoa('');
            setformData({
              formData: '',
              horaInicio: '', 
              horaFim: '',
              maxPessoaChange: '',
              codigoLocal: ''
            });
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

  const handleAttachmentClick = async () => {
    try {

      if(codigoLocal == null){
        showErrorToast('Não foi possível obter a imagem.');
      }
      const foto = await getFoto(codigoLocal);

      if (foto) {
        const base64Image = `data:image/jpeg;base64,${foto}`;
        setformData({ ...formData, file: base64Image });
        setAttachment([base64Image]);
        setOpenModal(true);
        setCodigoLocal('');
      } else {
        showErrorToast('Erro ao obter a foto.');
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  console.log(formData)
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
          {/* Formulario */}
          <Box style={{width: 750}}>
            <FormContainer>
              <Column>
                {/*Local*/}
                <FormRow style={{width: '400px'}}>
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
                <FormRow style={{width: '263px'}}>
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
                  <IconButton onClick={handleAttachmentClick} color="#000" sx={{marginTop: "15px", right: "10px"}} aria-label="abrir imagem">
                    <Image size={52} />
                  </IconButton>
                </FormRow>
              </Column>
            </FormContainer>
            <FormContainer>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <Column>
                  {/*Resposável*/}
                  <FormRow style={{width: '277px'}}>
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
                      value={formData.horaInicio || null}
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
                      value={formData.horaFim || null}
                      onChange={(e) => handleFormChange('horaFim', e)}
                      onBlur={() => handleFormChange('horaFim')}
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
                    value={formData.obs || ''}
                    onChange={(e) => handleFormChange('obs', e.target.value)}
                    onBlur={(e) => handleFormChange('obs', e.target.value)}
                  />
                </FormRow>
              </Column>
            </FormContainer>
            <StyledButtonPrimary style={{top:'8px', float:'right'}} onClick={handleReserva}>RESERVAR</StyledButtonPrimary>
          </Box>
          {/* Calendário */}
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
            <Calendario formData={formData} />
          </Box>
        </div>
      </Box>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40%', height: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 1, borderRadius: '20px', overflow: 'auto' }}>
          <IconButton onClick={handleCloseModal} style={{ position: 'absolute', top: 0, right: 0 }}>
            <XCircle size={28} color="#FF0B0B" />
          </IconButton>
          <Carousel attachment={attachment} />
        </Box>
      </Modal>
      <Progress isVisible={loading} />
    </Box>
  );
}

export default Pagina;
