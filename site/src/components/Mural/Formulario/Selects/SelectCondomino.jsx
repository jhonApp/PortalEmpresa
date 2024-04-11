import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getCondomino } from '../../../../../service/condominoService';
import { styled } from '@mui/system';

function SelectCondomino({ setBlocos, setPisos, setUnidades, onDataChange }) {
  const [value, setValue] = useState(null);
  const [condominos, setCondominos] = useState([]);

  const StyledSelectField = styled(Autocomplete)({
    background: '#EBEAEF',
    width: '100%',
    height: '45px',
    marginTop: '-3px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      fontSize: '15px',
      height: '45px'
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.9rem',
      marginTop: '-5px',
      visibility: value ? 'hidden' : 'visible',
    },
    '& .MuiOutlinedInput-input': {
      padding: '17px',
      marginTop: '-5px',
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
      fontSize: '12px',
    }
  });

  useEffect(() => {
    const atualizaCondominos = async () => {
      try {
        const listaCondominos = await getCondomino();
        setCondominos(listaCondominos);
      } catch (error) {
        console.error('Erro ao obter lista de condominos', error);
      }
    };
    atualizaCondominos();
  }, []);

  const handleSelectChange = (event, newValue) => {
    setBlocos([]);
    setPisos([]);
    setUnidades([]);

    if(!newValue){
      setValue(newValue);
      onDataChange('bloco', '');
      onDataChange('piso', '');
      onDataChange('unidade', '');
      return;
    }

    const selectedCondomino = condominos.find(condomino => condomino.codigo === newValue.value);
    debugger
    setValue(newValue);
    onDataChange('condomino', newValue.value);

    setBlocos(selectedCondomino.bloco);
    setPisos(selectedCondomino.piso);
    setUnidades(selectedCondomino.unidade);
  };
  

const condominosOptions = condominos.map((condomino) => ({ label: condomino.nome, value: condomino.codigo }));

return (
  <div>
    <StyledSelectField
      options={condominosOptions}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={handleSelectChange}
      value={value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selecione o Condômino"
          variant="outlined"
          InputLabelProps={{ shrink: false }}
        />
      )}
    />
  </div>
);


}

export default SelectCondomino;