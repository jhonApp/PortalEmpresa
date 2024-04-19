import React, { useState, useEffect } from 'react';
import { Box, Paper, Card, CardContent, Typography, IconButton, useTheme } from '@mui/material';
import { MagnifyingGlass } from 'phosphor-react';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import { TrashSimple, CreditCard } from 'phosphor-react';
import { deleteCartao } from '../../../service/cartaoService';
import TextWithEllipsis from '../../Utils/Helpers';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';

function PaignaCartao({ cartaoData, loading, setLoading, atualizaCartao }) {
  const [digitado, setDigitado] = useState('');
  const [codigoCartao, setCodigoCartao] = useState(null);
  const [cartoesFiltrados, setCartoesFiltrados] = useState(cartaoData);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '40%',
    backgroundColor: 'lightgray',
    padding: theme.spacing(1),
    height: '40px',
    width: '40px',
    marginRight: theme.spacing(1),
  };

  // Calcula dinamicamente o número de cartões por linha
  const cartoesPorLinha = 4;
  const cartoesPorLinhaAtual = Math.min(cartoesPorLinha, Math.ceil(cartoesFiltrados.length / cartoesPorLinha));

  useEffect(() => {
    const filteredCards = cartaoData.filter(cartao => {
      return cartao.codigoCartao.toString().includes(digitado);
    });
    setCartoesFiltrados(filteredCards);
  }, [cartaoData, digitado]);

  const handleClickOpen = (codigo) => {
    setOpen(true);
    setCodigoCartao(codigo);
  };

  const handleSearch = (value) => {
    setDigitado(value);
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
          <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Cartões Vinculados</Typography>
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
            {Array.from({ length: cartoesPorLinhaAtual * cartoesPorLinha }, (_, index) => (
              <Box key={index} sx={{ width: `calc(${100 / cartoesPorLinha}% - 10px)`, mt: 2 }}>
                {index < cartoesFiltrados.length && (
                  <Card sx={{ display: 'flex', height: 'auto', borderRadius: 3 }}>
                    <CardContent sx={{ flex: '1 0 auto', p: '10px', display: 'flex', alignItems: 'center' }} >
                      <div style={iconContainerStyle}><CreditCard size={20} color="#000" /></div>
                      <div style={{ marginLeft: theme.spacing(1), display:'flex', flexDirection:'column' }}>
                        <Typography variant="h6" component="h7" style={{ fontWeight: 600, fontSize: 18 }}>
                          {cartoesFiltrados[index].codigoCartao}
                        </Typography>
                        <TextWithEllipsis text={cartoesFiltrados[index].nomeUsuario} maxLength={23} valueWeigth={400}/>
                      </div>
                    </CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1}}>
                        <IconButton aria-label="play/pause" onClick={() => handleClickOpen(cartoesFiltrados[index].codigoCartao)} >
                          <TrashSimple size={24} color="#FF0B0B"/>
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

export default PaignaCartao;