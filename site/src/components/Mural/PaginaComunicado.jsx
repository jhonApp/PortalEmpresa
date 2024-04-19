import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, Box, Paper, Typography, IconButton, useTheme } from '@mui/material';
import { MagnifyingGlass } from 'phosphor-react';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import { deleteCartao } from '../../../service/cartaoService';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import ComunicadoCard from '../Mural/Card';

function PaginaComunicado({ muralData, setMuralData, loading, setLoading, atualizaMural, setValid}) {
  const [digitado, setDigitado] = useState('');
  const [comunicadosFiltrados, setComunicadosFiltrados] = useState(muralData);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [comunicados, setComunicados] = useState(muralData);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [codigoCartao, setCodigoCartao] = useState(null); 

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

  const labelStyle = {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1B1A16'
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
  
    // Verifica se algum tipo de comunicado está selecionado
    const isTypeSelected = tipoSelecionado.length > 0;
  
    const filteredComunicados = muralData.filter(mural => {
      // Se algum tipo de comunicado estiver selecionado, filtrar com base no tipo
      if (isTypeSelected) {
        return (
          tipoSelecionado.includes(mural.descricaoTipoComunicado) &&
          Object.values(mural).some(attrValue => {
            if (typeof attrValue === 'string' || typeof attrValue === 'number') {
              return String(attrValue).toLowerCase().includes(value.toLowerCase());
            }
            return false;
          })
        );
      } else { // Se nenhum tipo de comunicado estiver selecionado, filtrar livremente
        return Object.values(mural).some(attrValue => {
          if (typeof attrValue === 'string' || typeof attrValue === 'number') {
            return String(attrValue).toLowerCase().includes(value.toLowerCase());
          }
          return false;
        });
      }
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

  const handleRadioChange = (event) => {
    const selectedType = event.target.value;
    setTipoSelecionado(selectedType);
  
    // Filtrar os comunicados com base no tipo selecionado
    const filteredComunicados = muralData.filter(mural => {
      return (
        selectedType === '' ||
        mural.descricaoTipoComunicado === selectedType
      );
    });
  
    setComunicadosFiltrados(filteredComunicados);
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
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
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
          <FormControl component="fieldset">
            <RadioGroup row value={tipoSelecionado} onChange={handleRadioChange}>
              <FormControlLabel value="Comunicado" control={<Radio />} label={<Typography style={labelStyle}>Comunicado</Typography>} />
              <FormControlLabel value="Encomenda" control={<Radio />} label={<Typography style={labelStyle}>Encomenda</Typography>} />
              <FormControlLabel value="Enquete" control={<Radio />} label={<Typography style={labelStyle}>Enquete</Typography>} />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          {comunicadosFiltrados.length === 0 && (
            <Typography style={{ marginTop: 15, textAlign: 'center' }}>Nenhum resultado encontrado</Typography>
          )}
          <Box sx={{ overflow:'auto', mt: 3, maxHeight:'500px', display: 'flex', width: `calc(${300 / comunicadosPorLinha}% - 0px)`, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {Array.from({ length: comunicadosPorLinhaAtual * comunicadosPorLinha }, (_, index) => (
              <Box key={index} sx={{width: '436px', height: '183px'}}>
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