import React, { useState, useEffect } from 'react';
import { obterConexao } from '../../../service/urlService';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';

function SelectConexao({ label, onChange }) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  const StyledSelectField = styled(Autocomplete)({
    borderRadius: '20px',
    background: 'transparent',
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      fontSize: '15px',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.9rem',
    },
    '& .MuiOutlinedInput-input': {
      padding: '17px',
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
      fontSize: '12px',
    }
  });

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
      label={label}
      options={options.map((option) => ({ label: option.nome, value: option.conexao }))}
      onChange={(event, newValue) => {
        setValue(newValue);
        onChange('condominio', newValue ? newValue.value : '');
      }}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Condimínio"
          variant="outlined"
        />
      )}
    />
  );
}

export default SelectConexao;