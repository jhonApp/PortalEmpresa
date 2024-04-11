import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';

function SelectBloco({ blocos, onDataChange }) {
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


  const handleSelectChange = (event, newValue) => {
    if(!newValue){
      setValue(newValue);
      onDataChange('bloco', '');
      return;
    }
    
    setValue(newValue);
    onDataChange('bloco', newValue.value);
  };
console.log(blocos);
const blocosOptions = blocos && blocos.length > 0 ? blocos.map((bloco) => ({ label: bloco.nome, value: bloco.codigo })) : [];

return (
    <StyledSelectField
      options={blocosOptions}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange={handleSelectChange}
      value={value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selecione o Bloco"
          variant="outlined"
          InputLabelProps={{ shrink: false }}
        />
      )}
    />
);

}

export default SelectBloco;