import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, useTheme } from '@mui/material';
import Table from '../Table';
import ListMagnifyingGlass from '../../assets/images/icones/listmagnifyinglass.svg';
import TemporaryDrawer from './drawerFilter';
import Progress from '../../Utils/LoadingProgress';
import { Link } from 'react-router-dom';

function Acessos({ acessoData, setAcessoData, loading, setLoading, isValid, setValid, atualizarAcesso, setStatus }) {
  const [digitado, setDigitado] = useState('');
  const [status, setStatusLocal] = useState('ativo');
  const [acessosFiltrados, setAcessosFiltrados] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [acessos, setAcessos] = useState([]);
  const theme = useTheme();

  const columns = [
    { id: 'nome', label: 'Nome', width: 100, align: 'center' },
    { id: 'rg', label: 'RG/CPF', minWidth: 100, align: 'center' },
    { id: 'empresa', label: 'Empresa', minWidth: 100, align: 'center', },
    { id: 'dataEntrada', label: 'Data Entrada', minWidth: 100, align: 'center', },
    { id: 'dataSaida', label: 'Data Saída', minWidth: 100, align: 'center', },
    { id: 'autorizadoPor', label: 'Autorizado Por', width: 'auto', align: 'center', }
  ];

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30px',
    backgroundColor: '#171E36',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    textTransform: 'none',
    width: '215px',
    height: '50px'
  };

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

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 600,
    color: '#000'
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
    atualizarAcesso(setAcessoData, setLoading, setValid);
  };

  const handleClosePopup = () => {
    setOpenPopup(false); 
  };

  useEffect(() => {
    async function fetchData() {
      await atualizarAcesso(setAcessoData, setLoading, setValid, status);
      setAcessos(acessoData);
      setAcessosFiltrados(acessoData);
    }
    fetchData();
  }, [status]);

  const handleSearch = (value) => {
    setDigitado(value);
    
    const filteredAcessos = acessoData.filter(acesso => {
      return Object.values(acesso).some(attrValue => {
        if (typeof attrValue === 'string' || typeof attrValue === 'number') {
          return String(attrValue).toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    });
    setAcessosFiltrados(filteredAcessos);
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
      <Box display="flex" justifyContent="space-between" flexDirection="column" >
        <div style={{ display: "flex", justifyContent: "space-between" }}  >
          <div style={{ display: "flex", gap: 45 }}>
            <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Acessos</Typography>
            <Button style={buttonStyleFiltro} onClick={handleOpenPopup} variant="contained" startIcon={<img src={ListMagnifyingGlass} style={{ width: '25px', height: '25px' }} />}>
             FILTRAR
            </Button>
          </div>
          <Button style={{ ...buttonStyle }} variant="contained">
             <Typography variant="h6" component="h1" style={{ fontSize: 16, textAlign: 'justify', marginLeft: '8px' }}>Baixa Relatório </Typography>
          </Button>
        </div>
      </Box>
      <Box display="flex" gap={2} marginTop={2}>
        <Table data={digitado ? acessosFiltrados : acessoData} window={"acesso"} columns={columns} loading={loading} isValid={isValid} />
      </Box>
      <TemporaryDrawer open={openPopup} handleClose={handleClosePopup} data={acessoData} setData={setAcessoData} />
      <Progress isVisible={loading} />
    </Box>
  );
}

export default Acessos;