import React, { useState } from 'react';
import Popup from './popupAgendamento';
import { Box, Paper, Button, useTheme } from '@mui/material';
import { UserMinus, UsersThree, IdentificationCard, UsersFour } from 'phosphor-react';
import Typography from '@mui/material/Typography';

function TipoAgendamento({ atualizarAgendamento }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupData, setPopupData] = useState();
  const [popupAction, setPopupAction] = useState();
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const theme = useTheme();

  const iconContainerStyle = {
    display: 'flex',
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
    borderRadius: '10px',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'black',
    textTransform: 'none',
    width: '300px',
    height: '84px'
  };

  const handleOpenPopup = (title, description, type, data, action) => {
    setPopupTitle(title);
    setPopupType(type);
    setPopupDescription(description);
    setPopupData(data)
    setPopupAction(data)
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
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
      height='auto'
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <Typography variant="h5" component="h1" style={{  fontWeight: 'bold' }}>Novo Agendamento</Typography>
      <Typography marginTop={-1} variant="subtitle1" component="h5">Selecione o tipo de agendamento que deseja realizar.</Typography>
      <Box display="flex" gap={2} marginTop={2}>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Novo Agendamento', 'Visitante Simples', 'Visitante Simples', null, 'salvar')}>
          <div style={iconContainerStyle}><UserMinus size={20} color="#72788E" /></div>
          Visitante Simples
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Novo Agendamento', 'Visitante Especial', 'Visitante Especial', null, 'salvar')}>
          <div style={iconContainerStyle}><UsersThree size={20} color="#72788E" /></div>
          Visitante Especial
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Novo Agendamento', 'Prestador de Serviço', 'Prestador de Serviço', null, 'salvar')}>
          <div style={iconContainerStyle}><IdentificationCard size={20} color="#72788E" /></div>
          Prestador de Serviço
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Novo Agendamento', 'Múltiplos Visitantes', 'Múltiplos Visitantes', null, 'salvar')}>
          <div style={iconContainerStyle}><UsersFour size={20} color="#72788E" /></div>
          Múltiplos Visitantes
        </Button>
      </Box>
      <Popup open={openPopup} handleClose={handleClosePopup} atualizarAgendamento={atualizarAgendamento} title={popupTitle} description={popupDescription} type={popupType} />
    </Box>
  );
}

export default TipoAgendamento;