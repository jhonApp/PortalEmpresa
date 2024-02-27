import React, { useState } from 'react';
// import Popup from './popupAgendamento';
import { Box, Paper, Button, useTheme } from '@mui/material';
import { UserMinus, UsersThree } from 'phosphor-react';
import Typography from '@mui/material/Typography';

function Header({ atualizarDepartamentoSetor }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
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

  const handleOpenPopup = (title, description, type) => {
    setPopupTitle(title);
    setPopupType(type);
    setPopupDescription(description);
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
      <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Configuração de Departamento ou Setor</Typography>
      <Typography marginTop={-1} variant="subtitle1" component="h6">Selecione a opção que deseja configurar</Typography>
      <Box display="flex" gap={2} marginTop={2}>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Novo Agendamento', 'Visitante Simples', 'AgendamentoVisitante')}>
          <div style={iconContainerStyle}><UserMinus size={20} color="#000" /></div>
          Departamento
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Novo Agendamento', 'Visitante Especial', 'AgendamentoVisitanteEspecial')}>
          <div style={iconContainerStyle}><UsersThree size={20} color="#000" /></div>
          Setor
        </Button>
      </Box>
      {/* <Popup open={openPopup} handleClose={handleClosePopup} updateTable={atualizarAgendamento} title={popupTitle} description={popupDescription} type={popupType} /> */}
    </Box>
  );
}

export default Header;