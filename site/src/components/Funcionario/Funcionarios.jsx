import React, { useEffect, useState } from 'react';
import { Box, Paper, Button, useTheme, IconButton } from '@mui/material';
import { MagnifyingGlass, PlusCircle } from 'phosphor-react';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import Typography from '@mui/material/Typography';
import Table from '../Table'
import { Link } from 'react-router-dom';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

function Funcionarios({funcionarioData, setFuncionarioData, loading, setLoading, isValid, setValid, atualizarFuncionario}) {
  const [digitado, setDigitado] = useState('');
  const theme = useTheme();

  const columns = [
    { id: 'nome', label: 'Nome', width: 100, align: 'center' },
    { id: 'rg', label: 'RG/CPF', minWidth: 100, align: 'center'},
    { id: 'cartao', label: 'Cartão', minWidth: 100, align: 'center', },
    { id: 'email', label: 'Email', minWidth: 100, align: 'center', },
    { id: 'cargo', label: 'Cargo', minWidth: 100, align: 'center', },
    { id: 'status', label: 'Status', width: 'auto', align: 'center', }
  ];

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20%',
    backgroundColor: 'lightgray',
    padding: theme.spacing(2),
    height: '20px',
    marginRight: theme.spacing(1),
  };

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
    width: theme.spacing(15),
    height: theme.spacing(4)
  };

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

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 600,
    color: '#000'
  };

  useEffect(() => {
    const fetchData = async () => {
      await atualizarFuncionario(setFuncionarioData, setLoading, setValid);
    };

    fetchData();
  }, []);

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
        <div style={{ display:"flex", justifyContent:"space-between" }}  >
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Funcionários Cadastrados</Typography>
          <Link style={{ ...buttonStyle }} variant="contained" to={'/system/funcionarios/novo-funcionario'}>
            <PlusCircle size={20} color="#fff" />
            <div display="flex">
              <Typography variant="h6" component="h1" style={{ fontSize: 14, textAlign: 'justify', marginLeft: '8px' }}>NOVO </Typography>
            </div>
          </Link>
        </div>
        <div style={{ display:"flex", flexDirection:"row", marginTop:'20px' }} >
          <Search style={{ marginTop:'15px' }}>
            <SearchIconWrapper>
              <IconButton>
                <MagnifyingGlass size={20} color="#666666" />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              value={digitado}
              placeholder="nome, condominio, rg, cartão"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Search>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              <Typography style={labelStyle}>Status</Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="ativo" control={<Radio />} label={<Typography style={labelStyle}>Ativo</Typography>} />
              <FormControlLabel value="pendente" control={<Radio />} label={<Typography style={labelStyle}>Pendente</Typography>} />
              <FormControlLabel value="inativo" control={<Radio />} label={<Typography style={labelStyle}>Inativo</Typography>} />
            </RadioGroup>
          </FormControl>
        </div>
      </Box>
      <Box display="flex" gap={2} marginTop={2}>
        <Table data={funcionarioData} window={"funcionario"} columns={columns} loading={loading} isValid={isValid} />
      </Box>
    </Box>
  );
}

export default Funcionarios;