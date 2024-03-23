import React, { useState, useEffect } from 'react';
import { Box, Paper, Button, useTheme } from '@mui/material';
import ListMagnifyingGlass from '../../assets/images/icones/listmagnifyinglass.svg';
import Typography from '@mui/material/Typography';
import PopupFiltro from './popupFiltro';
import Table from '../Table'

function Agendados({agendamentoData, setAgendamentoData, loading, setLoading, isValid, setValid, atualizarAgendamento}) {
  const theme = useTheme();
  const [openPopup, setOpenPopup] = useState(false);

  const columns = [
    { id: 'nome', label: 'Nome', width: 100, align: 'center' },
    { id: 'userDoc', label: 'RG', minWidth: 100, align: 'center'},
    { id: 'dtValid', label: 'Data Inicial', minWidth: 100, align: 'center', },
    { id: 'dtEnd', label: 'Data Final', minWidth: 100, align: 'center', },
    { id: 'status', label: 'Status', minWidth: 100, align: 'center', },
    { id: 'action', label: '', minWidth: 100, align: 'center', },
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
      await atualizarAgendamento(setAgendamentoData, setLoading, setValid);
    };

    fetchData();
  }, []);

  const handleOpenPopup = () => {
    setOpenPopup(true);
    atualizarAgendamento(setAgendamentoData, setLoading, setValid);
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
      paddingBottom={3}
      display="flex"
      backgroundColor="#FAFAFA"
      flexDirection="column"
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Agendados</Typography>
        <Button style={buttonStyleFiltro} onClick={handleOpenPopup} variant="contained" startIcon={<img src={ListMagnifyingGlass} style={{ width: '25px', height: '25px' }} />}>
          FILTRAR
        </Button>
      </Box>
      <Box display="flex" gap={2} marginTop={2}>
        <Table data={agendamentoData} window={"agendamento"} columns={columns} loading={loading} isValid={isValid} />
      </Box>
      <PopupFiltro open={openPopup} handleClose={handleClosePopup} data={agendamentoData} setData={setAgendamentoData} />
    </Box>
  );
}

export default Agendados;