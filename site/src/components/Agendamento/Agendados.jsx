import React, { useState, useEffect } from 'react';
import { Box, Paper, Button, useTheme } from '@mui/material';
import ListMagnifyingGlass from '../../assets/images/icones/listmagnifyinglass.svg';
import Typography from '@mui/material/Typography';
import { excluirAgendamentos } from '../../../service/agendamentoService';
import PopupManager from '../popupManager';
import PopupFiltro from './popupFiltro';
import TemporaryDrawer from './drawerFilter';
import Table from '../Table'

function Agendados({agendamentoData, setAgendamentoData, loading, setLoading, isValid, setValid, atualizarAgendamento}) {
  const theme = useTheme();
  const [openPopup, setOpenPopup] = useState(false);

  const columns = [
    { id: 'nome', label: 'Nome', width: 200, align: 'center' },
    { id: 'rgCpf', label: 'RG', minWidth: 100, align: 'center'},
    { id: 'descricaoDataInicial', label: 'Data Inicial', minWidth: 100, align: 'center', },
    { id: 'descricaoDataFim', label: 'Data Final', minWidth: 100, align: 'center', },
    { id: 'status', label: 'Status', width: 260, align: 'center', },
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
    width: theme.spacing(16),
    height: theme.spacing(5)
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
        <Typography variant="h5" component="h1" style={{ fontWeight: 'bold' }}>Agendados</Typography>
        <Button style={buttonStyleFiltro} onClick={handleOpenPopup} variant="contained" startIcon={<img src={ListMagnifyingGlass} style={{ width: '25px', height: '25px' }} />}>
          FILTRAR
        </Button>
      </Box>
      <Box display="flex" gap={2} marginTop={2}>
        <Table data={agendamentoData} window={"agendamento"} columns={columns} loading={loading} isValid={isValid} hadleDelete={excluirAgendamentos} PopupManager={PopupManager} updateTable={atualizarAgendamento}/>
      </Box>
      <TemporaryDrawer open={openPopup} handleClose={handleClosePopup} data={agendamentoData} setData={setAgendamentoData} />
      {/* <PopupFiltro open={openPopup} handleClose={handleClosePopup} data={agendamentoData} setData={setAgendamentoData} /> */}
    </Box>
  );
}

export default Agendados;