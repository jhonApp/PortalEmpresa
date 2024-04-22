import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { ListBullets } from 'phosphor-react';
import Typography from '@mui/material/Typography';

function InfoAcesso({ iconContainerStyle, buttonStyle, quantidade, descricao }) {
  return (
    <Box style={{ ...buttonStyle }} variant="contained">
      <div style={iconContainerStyle}><ListBullets size={20} color="#000" /></div>
      <div display="flex">
        <Typography variant="h6" component="h1" style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'justify' }}>{quantidade}</Typography>
        <Typography variant="h6" component="h1" style={{ fontWeight: 'semi-bold', fontSize: 13, marginTop: '-6px' }}>{descricao}</Typography>
      </div>
    </Box>
  );
}

function TipoAcesso({ acessoData, atualizarAcesso, dataAtual, dataFutura }) {
  const theme = useTheme();
  
  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    backgroundColor: '#BCC0CF',
    marginTop: '-5px',
    padding: theme.spacing(2),
    height: '60px',
    width: '60px',
    marginRight: theme.spacing(1),
  };

  const buttonStyle = {
    padding: '17px',
    display: 'flex',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    backgroundColor: '#FAFAFA',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    color: 'black',
    textTransform: 'none',
    width: '246px',
    height: '84px'
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
      <Typography variant="h5" component="h1" style={{ fontSize:'24px',  fontWeight: 'bold', color: '#525252' }}>Todos os acessos</Typography>
      <Typography marginTop={-1} marginBottom={2} variant="subtitle1" style={{ fontSize:'15px', color: '#525252'}} component="h5">
        Período de 30 dias ({dataAtual.toLocaleDateString()} até {dataFutura.toLocaleDateString()})
      </Typography>
      <Box display="flex" gap={2} >
        <InfoAcesso
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={acessoData.length}
          descricao="Todos"
        />
        <InfoAcesso
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={0}
          descricao="Funcionários"
        />
        <InfoAcesso
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={0}
          descricao="Agendamentos"
        />
      </Box>
    </Box>
  );
}

export default TipoAcesso;