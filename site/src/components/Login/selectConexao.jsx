import React, { useState, useEffect } from 'react';
import { obterConexao } from '../../../service/urlService';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledSelectField = styled(Autocomplete)({
  borderRadius: '20px',
  background: 'transparent',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    fontSize: '15px',
  },
  '& .MuiOutlinedInput-input': {
    padding: '17px',
  },
  '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
    fontSize: '12px',
  }
});

function SelectConexao({ onChange }) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchCondominios = async () => {
      try {
        const response = await obterConexao();
        if (response && response.response) {
          setOptions(response.response);
        }
      } catch (error) {
        console.error('Erro ao obter condomínios:', error);
      }
    }
    fetchCondominios();
  }, []);

  return (
    <StyledSelectField
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.nome}
      onChange={(event, newValue) => {
        setValue(newValue);
        onChange(event, newValue);
      }}
      value={value} 
      renderInput={(params) => (
        <TextField
          {...params}
          label="Condomínio"
        />
      )}
    />
  );
}

export default React.memo(SelectConexao);