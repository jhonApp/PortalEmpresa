import React, { useState } from 'react';
import { Box, Paper, Button, useTheme } from '@mui/material';
import { UserMinus, UsersThree, IdentificationCard, UsersFour } from 'phosphor-react';
import PopupManager from '../popupManager';

import Typography from '@mui/material/Typography';

function TipoAgendamento({ atualizarAgendamento }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const [popupAction, setPopupAction] = useState('');
  const [popupData, setPopupData] = useState('');

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

  const handleOpenPopup = (type, data, action, title, description) => {
    setOpen(true);
    setPopupType(type);
    setPopupTitle(title);
    setPopupDescription(description);
    setPopupAction(action);
    setPopupData(data);
  };

  const handleClosePopup = () => {
    setOpen(false);
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
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Visitante Simples', null, 'salvar','Novo Agendamento', 'Visitante Simples')}>
          <div style={iconContainerStyle}><UserMinus size={20} color="#72788E" /></div>
          Visitante Simples
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Visitante Especial', null, 'salvar', 'Novo Agendamento', 'Visitante Especial')}>
          <div style={iconContainerStyle}><UsersThree size={20} color="#72788E" /></div>
          Visitante Especial
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Prestador de Serviço', null, 'salvar', 'Novo Agendamento', 'Prestador de Serviço')}>
          <div style={iconContainerStyle}><IdentificationCard size={20} color="#72788E" /></div>
          Prestador de Serviço
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Múltiplos Visitantes', null, 'salvar', 'Novo Agendamento', 'Múltiplos Visitantes')}>
          <div style={iconContainerStyle}><UsersFour size={20} color="#72788E" /></div>
          Múltiplos Visitantes
        </Button>
      </Box>

      <PopupManager 
        open={open}
        handleClose={handleClosePopup}
        type={popupType}
        data={popupData}
        action={popupAction}
        title={popupTitle}
        description={popupDescription}
        atualizaLista={atualizarAgendamento}
      />
    </Box>
  );
}

export default TipoAgendamento;