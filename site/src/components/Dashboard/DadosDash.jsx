import React, { useState, useEffect } from 'react';
import { Box, Paper, Button, useTheme } from '@mui/material';
import { ListBullets } from 'phosphor-react';
import Typography from '@mui/material/Typography';
import {contagemTodosFuncionarios} from '../../../service/funcionarioService';
import {contagemCartao} from '../../../service/cartaoService';

function BotaoTipoFuncionario({ iconContainerStyle, buttonStyle, quantidade, descricao }) {
  return (
    <Box style={{ ...buttonStyle }} variant="contained">
      <div style={iconContainerStyle}><ListBullets size={20} color="#000" /></div>
      <div display="flex">
        <Typography variant="h6" component="h1" style={{ fontWeight: 'semi-bold', fontSize: 14, marginTop: '15px' }}>{descricao}</Typography>
        <Typography variant="h6" component="h1" style={{ fontWeight: 'bold', fontSize: 32, textAlign: 'justify' }}>{quantidade}</Typography>
      </div>
    </Box>
  );
}

function DadosDash({ agendamento }) {
  const [funcionarios, setFuncionarios] = useState(false);
  const [cartoes, setCartao] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const theme = useTheme();

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    backgroundColor: '#BCC0CF',
    marginTop: '15px',
    padding: theme.spacing(2),
    height: '72px',
    width: '72px',
    marginRight: theme.spacing(2),
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
    width: '278px',
    height: '139px'
  };

  useEffect(() => {
    async function fetchData() {
      await contagemTodosFuncionarios(setFuncionarios);
      await contagemCartao(setCartao);
    }
    fetchData();
  }, []);

  return (
    <Box
      gap={1}
      marginX={1}
      margin={2}
      display="flex"
      backgroundColor="transparent"
      flexDirection="column"
      width={"100%"}
    >
      <Box display="flex" gap={2} >
        <BotaoTipoFuncionario
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={agendamento.length}
          descricao="Agendamentos"
        />
        <BotaoTipoFuncionario
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={funcionarios}
          descricao="Funcionários"
        />
        <BotaoTipoFuncionario
          iconContainerStyle={iconContainerStyle}
          buttonStyle={buttonStyle}
          quantidade={cartoes}
          descricao="Cartões"
        />
      </Box>
    </Box>
  );
}

export default DadosDash;