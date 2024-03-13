import React, { useState } from 'react';
import Popup from './Popup';
import { Box, Paper, Button, useTheme, Typography } from '@mui/material';
import { Bell, Package, ListChecks } from 'phosphor-react';

function Header({ atualizaMural }) {
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
    display: 'flex',
    justifyContent: 'flex-start',
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
      <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Novo Aviso</Typography>
      <Typography marginTop={-1} variant="subtitle1" component="h6">Selecione o tipo de aviso</Typography>
      <Box display="flex" gap={2} marginTop={2}>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Novo Comunicado', '', 'Comunicado')}>
          <div style={iconContainerStyle}><Bell size={20} color="#000" /></div>
          Comunicado
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Nova Encomenda', '', 'Encomenda')}>
          <div style={iconContainerStyle}><Package size={20} color="#000" /></div>
          Encomenda
        </Button>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Nova Enquete', '', 'Enquete')}>
          <div style={iconContainerStyle}><ListChecks size={20} color="#000" /></div>
          Enquete
        </Button>
      </Box>
      <Popup open={openPopup} handleClose={handleClosePopup} atualizaMural={atualizaMural} title={popupTitle} description={popupDescription} type={popupType} />
    </Box>
  );
}

export default Header;