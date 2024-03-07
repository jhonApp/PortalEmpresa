import React, { useState, useEffect } from 'react';
import { Box, Paper, Card, CardContent, Typography, IconButton } from '@mui/material';
import { MagnifyingGlass } from 'phosphor-react';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import { PencilSimple, TrashSimple } from 'phosphor-react';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';

function PaignaCartao({ cartaoData, loading, setLoading }) {
  const [digitado, setDigitado] = useState('');
  const [cartoesFiltrados, setCartoesFiltrados] = useState(cartaoData);

  // Atualiza os cartões filtrados sempre que os dados de cartão ou o valor digitado mudarem
  useEffect(() => {
    const filteredCards = cartaoData.filter(cartao => {
      return cartao.codigoCartao.toString().includes(digitado);
    });
    setCartoesFiltrados(filteredCards);
  }, [cartaoData, digitado]);

  const handleSearch = (value) => {
    setDigitado(value);
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
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Cartões Vinculados</Typography>
          <Search>
              <SearchIconWrapper>
                <IconButton>
                  <MagnifyingGlass size={20} color="#666666" />
                </IconButton>
              </SearchIconWrapper>
              <StyledInputBase
                value={digitado}
                placeholder="Pesquisar Cartão"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleSearch(e.target.value)}
              />
          </Search>
        </div>
        <div>
          {cartoesFiltrados.length === 0 && (
            <Typography style={{ marginTop: 15, textAlign: 'center' }}>Nenhum resultado encontrado</Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {cartoesFiltrados.map((cartao, index) => (
              <Box key={index} sx={{ width: 'calc(20% - 10px)', mt: 2 }}>
                <Card sx={{ display: 'flex', height: 45, borderRadius: 10, backgroundColor: cartao.status === 'A' ? '#D6EADF' : '#FBE4E4', border: cartao.status === 'A' ? '1px solid #D6EADF' : '1px solid #FBE4E4' }}>
                  <CardContent sx={{ flex: '1 0 auto', p: '10px' }} >
                    <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 16 }}>
                      {cartao.codigoCartao}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1}}>
                      <IconButton aria-label="play/pause" >
                        <PencilSimple size={20} color="#676767"  />
                      </IconButton>
                      <IconButton aria-label="play/pause" onClick={() => handleClickOpen(cartao.codigoCartao)} >
                        <TrashSimple size={20} color="#FF0B0B"/>
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </div>
      </Box>
      {/* <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete}/> */}
      <Progress isVisible={loading} />
    </Box>
  );
}

export default PaignaCartao;