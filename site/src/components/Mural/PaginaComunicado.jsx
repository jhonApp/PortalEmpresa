import React, { useState, useEffect } from 'react';
import { Box, Paper, Card, CardContent, Typography, IconButton, useTheme } from '@mui/material';
import { MagnifyingGlass } from 'phosphor-react';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import { Eye, TrashSimple, CreditCard } from 'phosphor-react';
import { deleteCartao } from '../../../service/cartaoService';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import ComunicadoCard from '../Mural/Card';

function PaginaComunicado({ muralData, setMuralData, loading, setLoading, atualizaMural, setValid }) {
  const [digitado, setDigitado] = useState('');
  const [comunicadosFiltrados, setComunicadosFiltrados] = useState(muralData);
  const [comunicados, setComunicados] = useState(muralData);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [codigoCartao, setCodigoCartao] = useState(null); // Added state for codigoCartao

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

  console.log(comunicadosFiltrados);

  const comunicadosPorLinha = 3;
  const comunicadosPorLinhaAtual = Math.min(comunicadosPorLinha, Math.ceil(comunicadosFiltrados.length / comunicadosPorLinha));

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
      atualizaMural();
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
                placeholder="titulo, mensagem"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleSearch(e.target.value)}
              />
          </Search>
        </div>
        <div>
          {comunicadosFiltrados.length === 0 && (
            <Typography style={{ marginTop: 15, textAlign: 'center' }}>Nenhum resultado encontrado</Typography>
          )}
          <Box sx={{ overflow:'auto', height:200, display: 'flex', width: `calc(${300 / comunicadosPorLinha}% - 10px)`, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {Array.from({ length: comunicadosPorLinhaAtual * comunicadosPorLinha }, (_, index) => (
              <Box key={index} sx={{width: '436px', height: '153px' , mt: 2 }}>
                {index < comunicadosFiltrados.length && (
                  <ComunicadoCard
                    tipoComunicado={comunicadosFiltrados[index].descricaoTipoComunicado}
                    mensagem={comunicadosFiltrados[index].mensagem}
                    status={comunicadosFiltrados[index].status}
                    idComunicado={comunicadosFiltrados[index].idComunicado}
                    titulo={comunicadosFiltrados[index].titulo}
                    enquetes={comunicadosFiltrados[index].opcaoEnquete}
                    atualizaMural={atualizaMural}
                  />
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