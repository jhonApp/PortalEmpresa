import React, { useState, useEffect } from 'react';
import { Box, Paper, Card, CardContent, Typography, IconButton, useTheme } from '@mui/material';
import { MagnifyingGlass } from 'phosphor-react';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import { PencilSimple, TrashSimple, CreditCard } from 'phosphor-react';
import { deleteCartao } from '../../../service/cartaoService';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';

function PaginaComunicado({ muralData, setComunicadoData, loading, setLoading, atualizaMural }) {
  const [digitado, setDigitado] = useState('');
  const [comunicadosFiltrados, setComunicadosFiltrados] = useState([]);
  const [comunicados, setComunicados] = useState([]);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '40%',
    backgroundColor: 'lightgray',
    padding: theme.spacing(1),
    height: 'auto',
    width: '20px',
    marginRight: theme.spacing(1),
  };

  const comunicadosPorLinha = 4;
  const comunicadosPorLinhaAtual = Math.min(comunicadosPorLinha, Math.ceil(comunicadosFiltrados.length / comunicadosPorLinha));

  useEffect(() => {
    async function fetchData() {
      await atualizaMural(setComunicadoData, setLoading, setValid);
      setComunicados(muralData);
      setComunicadosFiltrados(muralData);
    }
    fetchData();
  }, []);

  const handleClickOpen = (codigo) => {
    setOpen(true);
    setCodigoCartao(codigo);
  };

  const handleSearch = (value) => {
    setDigitado(value);
    
    const filteredComunicados = muralData.filter(mural => {
      return Object.values(mural).some(attrValue => {
        if (typeof attrValue === 'string' || typeof attrValue === 'number') {
          return String(attrValue).toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    });
    setComunicadosFiltrados(filteredComunicados);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (!codigoCartao) return;
      await deleteCartao(codigoCartao);
      showSuccessToast("Cartão excluído com sucesso!");
      atualizaCartao();
      setLoading(false);
    } catch (error) {

      setLoading(false);
      showErrorToast(error.message);
    }
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
      <Box display="flex" gap={2} flexDirection={'column'}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Avisos</Typography>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Search>
              <SearchIconWrapper>
                <IconButton>
                  <MagnifyingGlass size={20} color="#666666" />
                </IconButton>
              </SearchIconWrapper>
              <StyledInputBase
                value={digitado}
                placeholder="Pesquisar Comunicados"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleSearch(e.target.value)}
              />
          </Search>
        </div>
        <div>
          {comunicadosFiltrados.length === 0 && (
            <Typography style={{ marginTop: 15, textAlign: 'center' }}>Nenhum resultado encontrado</Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {Array.from({ length: comunicadosPorLinhaAtual * comunicadosPorLinha }, (_, index) => (
              <Box key={index} sx={{ width: `calc(${100 / comunicadosPorLinha}% - 10px)`, mt: 2 }}>
                {index < comunicadosFiltrados.length && (
                  <Card sx={{ display: 'flex', height: 'auto', borderRadius: 3 }}>
                    <CardContent sx={{ flex: '1 0 auto', p: '10px', display: 'flex', alignItems: 'center' }} >
                      <div style={iconContainerStyle}><CreditCard size={20} color="#000" /></div>
                      <div style={{ marginLeft: theme.spacing(1), display:'flex', flexDirection:'column' }}>
                        <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 16 }}>
                          {comunicadosFiltrados[index].idComunicado}
                        </Typography>
                        <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 12, maxWidth: 100 }}>
                          {comunicadosFiltrados[index].titulo}
                        </Typography>
                      </div>
                    </CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1}}>
                        <IconButton aria-label="play/pause" onClick={() => handleClickOpen(comunicadosFiltrados[index].idComunicado)} >
                          <TrashSimple size={20} color="#FF0B0B"/>
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                )}
              </Box>
            ))}
          </Box>
        </div>
      </Box>
      <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete}/>
      <Progress isVisible={loading} />
    </Box>
  );
}

export default PaginaComunicado;