import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/system';

function SelectUnidade({ unidades, onDataChange }) {
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
      onDataChange('unidade', '');
      return;
    }
    setValue(newValue);
    onDataChange('unidade', newValue.value);
  };
console.log(unidades);
const unidadesOptions = unidades && unidades.length > 0 ? unidades.map((unidade) => ({ label: unidade.codigo.toString(), value: unidade.codigo })) : [];

return (
    <StyledSelectField
      options={unidadesOptions}
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

export default SelectUnidade;