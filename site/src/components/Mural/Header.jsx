import React, { useState } from 'react';
import Popup from './Popup';
import PopupDialog from '../dialog';
import ExibiComunicado from './Modal/ExibiComunicado'
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import validateAndSetInvalidFields from '../Formulario/useValidation';
import ExibiEnquete from './Modal/ExibirEnquete'
import Comunicado from './Formulario/ModalComunicado'
import Encomenda from './Formulario/Encomenda'
import Enquete from './Formulario/Enquete'
import Progress from '../../Utils/LoadingProgress';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import { inserirComunicado } from '../../../service/muralService';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Box, Paper, Button, useTheme, Typography } from '@mui/material';
import { Bell, Package, ListChecks } from 'phosphor-react';

function Header({ atualizaMural }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [invalidFields, setInvalidFields] = useState([]);
  const [popupTitle, setPopupTitle] = useState('');
  const [screenValidation, setScreenValidation] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ files: [] });
  const theme = useTheme();
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleValidation,
    renderErrorMessage
  } = useForm(
    formData,
    validateForm,
    screenValidation
  );

  const iconContainerStyle = {
    ddisplay: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    backgroundColor: '#BCC0CF',
    padding: theme.spacing(1),
    height: '40px',
    width: '40px',
    marginRight: theme.spacing(1),
  };

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '17px',
    fontSize: '20px',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'none',
    width: '300px',
    height: '84px'
  };

  const handleOpenPopup = (title, description, type) => {
    setPopupTitle(title);
    setPopupType(type);
    setPopupDescription(description);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const handleSave = async () => {
    try {

      const errorMessage = validateAndSetInvalidFields(formData, screenValidation, setInvalidFields);
      if (errorMessage) { 
        setLoading(false) 
        return; 
      }

      setLoading(true);

      await handleSubmit(async () => {        
        try{
            await inserirComunicado(formData);
            showSuccessToast("Criado com sucesso!");
            atualizaMural();
            setFormData("");
            handleClosePopup();
            setOpen(true);
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
  };

  const renderContent = () => {
    switch (popupType) {
      case 'Enquete':
        return <Enquete onclose={handleClosePopup} onDataChange={handleFormChange} screenValidation={setScreenValidation} updateTable={atualizaMural}/>;
      case 'Encomenda':
        return <Encomenda invalidFields={invalidFields} formData={formData} onDataChange={handleFormChange} screenValidation={setScreenValidation} />;
      case 'Comunicado':
        return <Comunicado invalidFields={invalidFields} formData={formData} onDataChange={handleFormChange} screenValidation={setScreenValidation} />;
        default:
        return null;
    }
  };

  const renderActionButton = () => {
    switch (popupType) {
      case 'ExibirComunicado':
        return (
          <div>
            <StyledButtonPrimary onClick={handleClosePopup} sx={{ mr: 2 }}>
              Já recebi a encomenda
            </StyledButtonPrimary>
            <StyledButtonSecundary autoFocus onClick={handleClosePopup}>
              Cancelar
            </StyledButtonSecundary>
          </div>
        );
      case 'Enquete':
        return null;
      default:
        return (
          <StyledButtonPrimary autoFocus onClick={handleSave}>
            Salvar
          </StyledButtonPrimary>
        );
    }
  };
  
  return (
    <Box
      gap={1}
      marginX={1}
      margin={2}
      padding={2}
      paddingX={2}
      display="flex"
      backgroundColor="#FAFAFA"
      flexDirection="column"
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Novo Aviso</Typography>
      <Typography marginTop={-1} variant="subtitle1" style={{ fontSize: '16px' }} component="h6">Selecione o tipo de aviso</Typography>
      <Box display="flex" gap={2} marginTop={2}>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Novo Comunicado', '', 'Comunicado')}>
          <div style={iconContainerStyle}><Bell size={20} color="#72788E" /></div>
          Comunicado
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Nova Encomenda', '', 'Encomenda')}>
          <div style={iconContainerStyle}><Package size={20} color="#72788E" /></div>
          Encomenda
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Nova Enquete', '', 'Enquete')}>
          <div style={iconContainerStyle}><ListChecks size={20} color="#72788E" /></div>
          Enquete
        </Button>
      </Box>
      <PopupDialog open={openPopup} handleClose={handleClosePopup} title={popupTitle} description={popupDescription} renderContent={renderContent} renderActionButton={renderActionButton} visible={false}/>
      <Progress isVisible={loading} />
    </Box>
  );
}

export default Header;