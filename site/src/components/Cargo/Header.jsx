import React, { useState } from 'react';
import Popup from './Popup';
import OfficeChair from '../../assets/images/icones/officechair.svg';
import { Box, Paper, Button, useTheme, Typography } from '@mui/material';
import { Briefcase } from 'phosphor-react';

function Header({ atualizarCargo }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const theme = useTheme();

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
    backgroundColor: 'lightgray',
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
      <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Configuração de Departamento ou Setor</Typography>
      <Typography marginTop={-1} variant="subtitle1" style={{ fontSize: '16px' }} component="h6">Selecione a opção que deseja configurar</Typography>
      <Box display="flex" gap={2} marginTop={2}>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Cargos', 'Insira o nome e clique no botão a seguir para incluir um novo cargo', 'Cargo')}>
          <div style={iconContainerStyle}><Briefcase size={20} color="#000" /></div>
          Cargo
        </Button>
      </Box>
      <Popup open={openPopup} handleClose={handleClosePopup} updateCargo={atualizarCargo} title={popupTitle} description={popupDescription} type={popupType} />
    </Box>
  );
}

export default Header;