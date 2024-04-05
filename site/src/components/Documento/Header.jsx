import React, { useState } from 'react';
import Documento from './Modal'
import PopupDialog from '../dialog';
import { Box, Paper, Button, useTheme, Typography } from '@mui/material';
import { File } from 'phosphor-react';

function Header({ atualizaDocumento, documentoData}) {
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

  const renderContent = () => {
    switch (popupType) {
      case 'Documento':
        return <Documento onClose={handleClosePopup} atualizaDocumento={atualizaDocumento} documentoData={documentoData}/>;
      default:
        return null;
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
      <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Configuração de Documentos</Typography>
      <Typography marginTop={-1} variant="subtitle1" style={{ fontSize: '16px' }} component="h6">Selecione a opção que deseja configurar</Typography>
      <Box display="flex" gap={2} marginTop={2}>
        <Button style={{ ...buttonStyle }} variant="contained" onClick={() => handleOpenPopup('Documentos', 'Selecione o arquivo e clique no botão a seguir para incluir', 'Documento')}>
          <div style={iconContainerStyle}><File size={20} color="#8D93A6" /></div>
          Documentos
        </Button>
      </Box>
      <PopupDialog open={openPopup} handleClose={handleClosePopup} title={popupTitle} description={popupDescription} renderContent={renderContent} visible={true}/>
    </Box>
  );
}

export default Header;