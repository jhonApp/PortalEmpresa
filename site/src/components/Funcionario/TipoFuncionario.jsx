import React, { useState } from 'react';
import { Box, Paper, Button, useTheme } from '@mui/material';
import { ListBullets } from 'phosphor-react';
import Typography from '@mui/material/Typography';

function BotaoTipoFuncionario({ iconContainerStyle, buttonStyle, quantidade, descricao }) {
  return (
    <Button style={{ ...buttonStyle }} variant="contained">
      <div style={iconContainerStyle}><ListBullets size={20} color="#000" /></div>
      <div display="flex">
        <Typography variant="h6" component="h1" style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'justify' }}>{quantidade}</Typography>
        <Typography variant="h6" component="h1" style={{ fontWeight: 'semi-bold', fontSize: 13, marginTop: '-6px' }}>{descricao}</Typography>
      </div>
    </Button>
  );
}

function TipoFuncionario({ atualizarFuncionario }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const theme = useTheme();

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20%',
    backgroundColor: 'lightgray',
    padding: theme.spacing(2),
    height: '20px',
    marginRight: theme.spacing(1),
  };

  const buttonStyle = {
    padding: '17px',
    borderRadius: '10px',
    backgroundColor: '#FAFAFA',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    color: 'black',
    textTransform: 'none',
    width: theme.spacing(30),
    height: theme.spacing(10)
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
      display="flex"
      backgroundColor="transparent"
      flexDirection="column"
      width={theme.spacing(130)}
    >
      <Box display="flex" gap={2} >
        <BotaoTipoFuncionario
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={10}
          descricao="Todos"
        />
        <BotaoTipoFuncionario
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={8}
          descricao="Ativos"
        />
        <BotaoTipoFuncionario
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={1}
          descricao="Pendentes"
        />
        <BotaoTipoFuncionario
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={1}
          descricao="Inativos"
        />
      </Box>
    </Box>
  );
}

export default TipoFuncionario;