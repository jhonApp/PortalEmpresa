import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { MarginTwoTone } from '@mui/icons-material';

function SelectLocal({ espacos, label, onChange }) {
  const [value, setValue] = useState(null);

  const StyledSelectField = styled(Autocomplete)({
    background: '#EBEAEF',
    width: '100%',
    height: '45px',
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

  return (
    <StyledSelectField
      options={espacos.map((espaco) => ({ label: espaco.descricao, value: espaco.codigoLocal }))}
      onChange={(event, newValue) => {
        setValue(newValue);
        onChange(newValue ? newValue.value : '');
      }}
      value={value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selecione o Local"
          variant="outlined"
          InputLabelProps={{ shrink: false }}
        />
      )}
    />
  );
}

export default SelectLocal;