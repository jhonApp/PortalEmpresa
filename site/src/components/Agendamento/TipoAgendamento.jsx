import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Popup from './popupAgendamento';
import { Box, Paper, Button, useTheme } from '@mui/material';
import { UserMinus, UsersThree, IdentificationCard, UsersFour } from 'phosphor-react';
import Typography from '@mui/material/Typography';

function TipoAgendamento({atualizarAgendamento}) {
  const [openPopup, setOpenPopup] = useState(false);
  const theme = useTheme();

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'lightgray',
    padding: theme.spacing(1),
    height: '20px',
    marginRight: theme.spacing(1),
  };

  const buttonStyle = {
    padding: '17px',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'none',
    width: theme.spacing(29)
  };

  const handleOpenPopup = () => {
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
      height={theme.spacing(20)}
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Novo Agendamento</Typography>
      <Typography marginTop={-1} variant="subtitle1" component="subtitle1">Selecione o tipo de agendamento que deseja realizar.</Typography>
      <Box display="flex" gap={2} marginTop={2}>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={handleOpenPopup}>
          <div style={iconContainerStyle}><UserMinus size={20} color="#000" /></div>
          Visitante Simples
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" startIcon={<div style={iconContainerStyle}><UsersThree size={20} color="#000"/></div>}>
          Visitante Especial
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" startIcon={<div style={iconContainerStyle}><IdentificationCard size={20} color="#000"/></div>}>
          Prestador de Serviço
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" startIcon={<div style={iconContainerStyle}><UsersFour size={20} color="#000"/></div>}>
          Múltiplos Visitantes
        </Button>
      </Box>
      <Popup open={openPopup} handleClose={handleClosePopup} atualizarAgendamento={atualizarAgendamento} />
    </Box>
  );
}

export default TipoAgendamento;