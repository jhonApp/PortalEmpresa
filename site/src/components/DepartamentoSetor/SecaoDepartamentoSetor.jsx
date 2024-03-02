import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { X } from 'phosphor-react';
import { inserirSecao } from '../../../service/secaoService';
import { showSuccessToast, showErrorToast, showWarningToast } from '../../Utils/Notification';

const formControlStyle = {
  padding: '10px',
  height: '200px',
  width: '200px',
  marginTop: '5px',
  borderRadius: '10px',
  backgroundColor: '#FAFAFA'
};

const labelStyle = {
  fontSize: '13px',
  fontWeight: 600
};

function SecaoDepartamentoSetor({ setorData, departamentoData, loading, setLoading, isValid, setValid }) {
  const [secaoSelecionada, setSecaoSelecionada] = useState('');
  const [setorSelecionada, setSetorSelecionada] = useState('');
  const [secoesSelecionadas, setSecoesSelecionadas] = useState([]);
  const [checkboxesHabilitados, setCheckboxesHabilitados] = useState(false);

  useEffect(() => {
    handleAssociacao();
  }, [secaoSelecionada, setorSelecionada]);

  const handleRadioChange = (event) => {
    setSecaoSelecionada('');
    setSecaoSelecionada(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setSetorSelecionada(event.target.value);
  };

  const handleAssociacao = async () => {
    try {
      if (secaoSelecionada && setorSelecionada) {
        const secao = { 
          codigoDepartamento: secaoSelecionada,
          codigoSetor: setorSelecionada,
        };

        await inserirSecao(secao);
        setSecoesSelecionadas([...secoesSelecionadas, secao]);
        showSuccessToast("Associação realizada com sucesso");
      } else if (secaoSelecionada && !setorSelecionada) {
        showWarningToast("Por favor, selecione um setor.");
      } else if (!secaoSelecionada && setorSelecionada) {
        showWarningToast("Por favor, selecione um departamento.");
      } else {
        // Nenhum departamento e setor selecionado
        // Aqui você pode lidar com isso de acordo com seus requisitos
        // Por exemplo, você pode exibir uma mensagem ou realizar alguma outra ação
        //showWarningToast("Por favor, selecione um departamento e um setor.");
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
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Departamento</Typography>
          <FormControl component={Paper} sx={formControlStyle}>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" value={secaoSelecionada} onChange={handleRadioChange}>
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
            <FormGroup>
              {setorData.map((setor, index) => (
                <FormControlLabel
                  key={index}
                  value={setor.codigo}
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label={<Typography style={labelStyle}>{setor.nome}</Typography>}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default SecaoDepartamentoSetor;