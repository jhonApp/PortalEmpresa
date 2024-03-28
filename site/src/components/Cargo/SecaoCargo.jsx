import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { X } from 'phosphor-react';
import { inserirSecao, inserirSecaoCargo } from '../../../service/secaoService';
import { showSuccessToast, showErrorToast, showWarningToast } from '../../Utils/Notification';

const formControlStyle = {
  padding: '10px',
  width: '300px',
  marginTop: '5px',
  borderRadius: '20px',
  backgroundColor: '#FAFAFA'
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: 600
};

function SecaoCargo({ setorData, departamentoData, cargoData, loading, setLoading, isValid, setValid }) {
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState('');
  const [setorSelecionado, setSetorSelecionado] = useState('');
  const [cargoSelecionado, setCargoSelecionado] = useState('');
  const [secoesSelecionadas, setSecoesSelecionadas] = useState([]);

  useEffect(() => {
    handleAssociacao();
  }, [departamentoSelecionado, setorSelecionado, cargoSelecionado]);

  const handleRadioChange = (event) => {
    setDepartamentoSelecionado('');
    setDepartamentoSelecionado(event.target.value);
  };

  const handleSetorChange = (event) => {
    setSetorSelecionado('');
    setSetorSelecionado(event.target.value);
  };
  
  const handleCheckboxChange = (event) => {
    setCargoSelecionado(event.target.value);
  };

  const handleAssociacao = async () => {
    try {
      if (departamentoSelecionado && setorSelecionado && cargoSelecionado) {
        const secao = { 
          codigoDepartamento: departamentoSelecionado,
          codigoSetor: setorSelecionado,
          codigoCargo: cargoSelecionado
        };

        await inserirSecaoCargo(secao);
        setSecoesSelecionadas([...secoesSelecionadas, secao]);
        setSecoesSelecionadas([]);
        showSuccessToast("Associação realizada com sucesso");
      } else if (departamentoSelecionado && !setorSelecionado) {
        showWarningToast("Por favor, selecione um setor.");
      } else if (!departamentoSelecionado && setorSelecionado) {
        showWarningToast("Por favor, selecione um departamento.");
      } else {
      }
    } catch (error) {
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
      <Box display="flex">
        {/* Departamento */}
        <Box>
          <Typography variant="h6" component="h1" style={{ fontSize: '24px', fontWeight: 'bold' }}>Departamento</Typography>
          <FormControl component={Paper} sx={formControlStyle}>
            <RadioGroup aria-labelledby="deoartamento-radio-buttons-group-label" name="departamento-radio-buttons-group" value={departamentoSelecionado} onChange={handleRadioChange}>
              {departamentoData.map((departamento, index) => (
                <FormControlLabel key={index} value={departamento.codigo} control={<Radio />} label={<Typography style={labelStyle}>{departamento.nome}</Typography>} />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <div style={{ marginTop: '120px', marginLeft: '14px' }}>
          <X size={25} />
        </div>
        {/* Setor */}
        <Box marginLeft={2}>
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Setor</Typography>
          <FormControl component={Paper} sx={formControlStyle}>
            <RadioGroup aria-labelledby="setor-radio-buttons-group-label" name="setor-radio-buttons-group" value={setorSelecionado} onChange={handleSetorChange}>
              {setorData.map((setor, index) => (
                <FormControlLabel key={index} value={setor.codigo} control={<Radio />} label={<Typography style={labelStyle}>{setor.nome}</Typography>} />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <div style={{ marginTop: '120px', marginLeft: '14px' }}>
          <X size={25} />
        </div>
        {/* Cargo */}
        <Box marginLeft={2}>
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Cargo</Typography>
          <FormControl component={Paper} sx={formControlStyle}>
            <FormGroup>
              {cargoData.map((cargo, index) => (
                <FormControlLabel
                  key={index}
                  value={cargo.codigo}
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label={<Typography style={labelStyle}>{cargo.nome}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default SecaoCargo;