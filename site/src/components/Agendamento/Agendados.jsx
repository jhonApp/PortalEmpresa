import React, { useState, useEffect } from 'react';
import { Box, Paper, Button, useTheme } from '@mui/material';
import ListMagnifyingGlass from '../../assets/images/icones/listmagnifyinglass.svg';
import Typography from '@mui/material/Typography';
import Table from '../Table'
import { obterAgendamento } from '../../../api/visitanteSimples/agendamento';
import { obterAgendamentoEspecial } from '../../../api/visitanteEspecial/agendamento';
import { obterAgendamentoPrestador } from '../../../api/prestadorServico/agendamento';

function Agendados() {
  const theme = useTheme();
  const [agendamentoData, setAgendamentoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);


  const columns = [
    { id: 'nome', label: 'Nome', width: 100, align: 'center' },
    { id: 'userDoc', label: 'RG', minWidth: 100, align: 'center'},
    { id: 'dtValid', label: 'Data Inicial', minWidth: 100, align: 'center', },
    { id: 'dtEnd', label: 'Data Final', minWidth: 100, align: 'center', },
    { id: 'status', label: 'Status', minWidth: 100, align: 'center', },
  ];

  const buttonStyleFiltro = {
    borderRadius: '50px',
    backgroundColor: 'transparent',
    border: '0.5px solid #000',
    fontWeight: 'bold',
    fontSize: '13px',
    color: 'black',
    textTransform: 'none',
    width: theme.spacing(15)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data2, data3] = await Promise.all([
          obterAgendamento(1),
          obterAgendamentoEspecial(1),
          obterAgendamentoPrestador(1)
        ]);

        const combinedData = [...data1, ...data2, ...data3];
        combinedData.sort((a, b) => new Date(b.dtValid) - new Date(a.dtValid));

        setAgendamentoData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter dados de agendamento:', error);
        setLoading(false);
        setValid(false);
      }
    };

    // Chama a função para obter os dados ao montar o componente
    fetchData();
  }, [1]);

  return (
    <Box
      gap={1}
      marginX={1}
      margin={2}
      padding={2}
      paddingX={2}
      paddingBottom={3}
      display="flex"
      backgroundColor="#FAFAFA"
      flexDirection="column"
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Agendados</Typography>
        <Button style={buttonStyleFiltro} variant="contained" startIcon={<img src={ListMagnifyingGlass} style={{ width: '25px', height: '25px' }} />}>
          FILTRAR
        </Button>
      </Box>
      <Box display="flex" gap={2} marginTop={2}>
        <Table data={agendamentoData} columns={columns} loading={loading} isValid={isValid} />
      </Box>
    </Box>
  );
}

export default Agendados;