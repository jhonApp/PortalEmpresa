import React, { useEffect, useState } from 'react';
import { StyledDatePicker, StyledTimePicker, StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../Utils/StyledForm';
import { validateForm } from '../Formulario/validation';
import { Checkbox, Typography, Input, Button } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { FileJpg } from 'phosphor-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { InputLabel } from '@mui/material';
import useForm from '../Formulario/useForm';
import InputMask from 'react-input-mask';

import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');
const today = dayjs();

const Formulario = ({ onDataChange, data, invalidFields }) => {
  const [locale, setLocale] = useState('pt-br');
  const [nomeArquivo, setNomeArquivo] = useState('');
  const {
    values,
    handleChange,
  } = useForm(
    data,
    validateForm,
    'espaco'
  );

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    onDataChange({ ...values, [fieldName]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file == null) {
      showErrorToast("Não foi possível anexar o arquivo, tente novamente.");
      return;
    }
  
    const fileName = file.name;
    const extensionIndex = fileName.lastIndexOf('.');
    const extension = fileName.substring(extensionIndex);
    let truncatedFileName = fileName.substring(0, 10);
  
    // Combine o nome truncado com a extensão
    const truncatedFileNameWithExtension = truncatedFileName + extension;
  
    setNomeArquivo(truncatedFileNameWithExtension);
    onDataChange({ ...data, foto: file });
    showSuccessToast("Anexado com sucesso.");
  };
  
  const buttonFileStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #CBCDD9',
    backgroundColor: '#DDDCE2',
    fontSize: '13.5px',
    fontWeight: 'bold',
    color: 'black',
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    boxShadow: 'none',
    width: '100%'
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <StyledPaper sx={{ background: '#FAFAFA', overflow: "hidden", height: 370 }} elevation={1}>
        <FormContainer>
          <Column>
            {/* Descrição */}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                Descrição *
              </InputLabel>
              <StyledTextField
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                autoComplete="off"
                error={invalidFields.some(field => field.field === 'descricao')}
                value={values.descricao || ''}
                onChange={(e) => handleFormChange('descricao', e.target.value)}
                onBlur={(e) => handleFormChange('descricao', e.target.value)}
              />
            </FormRow>
            {/* Localização */}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                Localização
              </InputLabel>
              <StyledTextField
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                autoComplete="off"
                error={invalidFields.some(field => field.field === 'localizacao')}
                value={values.localizacao || ''}
                onChange={(e) => handleFormChange('localizacao', e.target.value)}
                onBlur={(e) => handleFormChange('localizacao', e.target.value)}
              />
            </FormRow>
            {/* Foto */}
            <FormRow>
              <div style={{ width: "100%" }} >
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                      Anexar uma foto do local
                  </InputLabel>                  
                  <Input type="file" id="file-input" sx={{ display: 'none' }} onChange={handleFileChange} />
                  <label htmlFor="file-input">
                    <Button component="span" style={buttonFileStyle} variant="contained">
                      <FileJpg size={25} color="#000"/>
                      {nomeArquivo ? nomeArquivo : 'Clique aqui para selecionar uma foto'}
                    </Button>
                  </label>
              </div>
            </FormRow>
          </Column>
          <Column>
            {/* Descrição Resumida*/}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                Descrição Resumida *
              </InputLabel>
              <StyledTextField
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                autoComplete="off"
                error={invalidFields.some(field => field.field === 'descricaoResumida')}
                value={values.descricaoResumida || ''}
                onChange={(e) => handleFormChange('descricaoResumida', e.target.value)}
                onBlur={(e) => handleFormChange('descricaoResumida', e.target.value)}
              />
            </FormRow>
            {/* Numero Maximo de Pessoas */}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                Número Máximo de Pessoas
              </InputLabel>
              <StyledTextField
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                autoComplete="off"
                error={invalidFields.some(field => field.field === 'maxPessoa')}
                value={values.maxPessoa || ''}
                onChange={(e) => handleFormChange('maxPessoa', e.target.value)}
                onBlur={(e) => handleFormChange('maxPessoa', e.target.value)}
              />
            </FormRow>
          </Column>
        </FormContainer>
      </StyledPaper>
    </LocalizationProvider>
  );
};

export default Formulario;