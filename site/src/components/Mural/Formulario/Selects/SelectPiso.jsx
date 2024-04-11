import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';

function SelectBloco({ pisos, onDataChange }) {
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
      onDataChange('piso', '');
      return;
    }
    setValue(newValue);
    onDataChange('piso', newValue.value);
  };
console.log(pisos);
const pisosOptions = pisos && pisos.length > 0 ? pisos.map((piso) => ({ label: piso.nome, value: piso.codigo })) : [];

return (
    <StyledSelectField
      options={pisosOptions}
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