import React, { useEffect, useState } from 'react';
import { StyledDatePicker, StyledTimePicker, StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { Checkbox, Typography, Input, Button } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../../../Utils/Notification';
import { Export } from 'phosphor-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { InputLabel } from '@mui/material';
import 'dayjs/locale/pt-br';
import useForm from '../../Formulario/useForm';
import InputMask from 'react-input-mask';

dayjs.locale('pt-br');
const today = dayjs();

const Encomenda = ({ onDataChange, screenValidation }) => {
  const [locale, setLocale] = useState('pt-br');
  const [formData, setFormData] = useState({});
  const {
    values,
    errors,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'agendamento'
  );

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      tipoComunicacao: 2
    }));

    screenValidation("comunicado");

  }, []); 

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    handleValidation(fieldName);
    onDataChange({ ...values, [fieldName]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file == null){
      showErrorToast("Não foi possível anexar o arquivo, tente novamente.")
    }
    const reader = new FileReader();
    onDataChange({ ...formData, file: file });
    showSuccessToast("Anexado com sucesso.")
  }; 

  const buttonFileStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #CBCDD9',
    backgroundColor: '#DDDCE2',
    fontSize: '14px',
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
      <StyledPaper sx={{ background: '#FAFAFA', overflow: "hidden", height: 445 }} elevation={1}>
        <FormContainer>
          <Column>
            {/* Data Inicial */}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Data Inicial *
              </InputLabel>
              <StyledDatePicker
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="date"
                  name="dataInicial"
                  minDate={today}
                  error={errors.dataInicial}
                  value={values.dataInicial || null}
                  onChange={(newValue) => { handleFormChange('dataInicial', newValue); }}
                  onBlur={() => handleValidation('dataInicial')}
                />
                {renderErrorMessage('dataInicial')}
            </FormRow>
            {/* Titulo */}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                Titulo *
              </InputLabel>
              <StyledTextField
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                autoComplete="off"
                error={errors.titulo}
                value={values.titulo || ''}
                onChange={(e) => handleFormChange('titulo', e.target.value)}
                onBlur={(e) => handleFormChange('titulo', e.target.value)}
              />
              {renderErrorMessage('titulo')}
            </FormRow>
            <FormContainer>
              {/* BLoco/Piso/Unid */}
              <Column>
                {/* Bloco/Torre */}
                <FormRow style={{display: 'flex'}}>
                  <div style={{width: '46%'}}>
                    <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                      Bloco/Torre
                    </InputLabel>
                    <StyledTextField
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                      autoComplete="off"
                      error={errors.blocoTorre}
                      value={values.blocoTorre || ''}
                      onChange={(e) => handleFormChange('blocoTorre', e.target.value)}
                      onBlur={(e) => handleFormChange('blocoTorre', e.target.value)}
                    />
                    {renderErrorMessage('blocoTorre')}
                  </div>
                  <div style={{width: '27%', marginLeft: '10px'}}>
                    {/* Bloco/Torre */}
                    <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                        Piso
                      </InputLabel>
                      <StyledTextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        autoComplete="off"
                        error={errors.piso}
                        value={values.piso || ''}
                        onChange={(e) => handleFormChange('piso', e.target.value)}
                        onBlur={(e) => handleFormChange('piso', e.target.value)}
                      />
                      {renderErrorMessage('piso')}
                  </div>
                  <div style={{width: '27%', marginLeft: '10px'}}>
                    {/* Bloco/Torre */}
                    <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                        Unid.
                      </InputLabel>
                      <StyledTextField
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        autoComplete="off"
                        error={errors.unidade}
                        value={values.unidade || ''}
                        onChange={(e) => handleFormChange('unidade', e.target.value)}
                        onBlur={(e) => handleFormChange('unidade', e.target.value)}
                      />
                      {renderErrorMessage('unidade')}
                  </div>
                </FormRow>
              </Column>
            </FormContainer>
          </Column>
          <Column>
            {/* Data Fim */}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Data Fim *
              </InputLabel>
              <StyledDatePicker
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="date"
                  name="dataFim"
                  minDate={today}
                  error={errors.dataFim}
                  value={values.dataFim || null}
                  onChange={(newValue) => { handleFormChange('dataFim', newValue); }}
                  onBlur={() => handleValidation('dataFim')}
                />
                {renderErrorMessage('dataFim')}
            </FormRow>
            {/* Anexos */}
            <FormRow>
              <div style={{ width: "100%" }} >
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                      Anexos
                  </InputLabel>                  
                  <Input type="file" id="file-input" sx={{ display: 'none' }} onChange={handleFileChange} />
                  <label htmlFor="file-input">
                    <Button component="span" style={buttonFileStyle} variant="contained">
                      <Export size={25} color="#000"/>
                      Clique aqui para anexar um arquivo
                    </Button>
                  </label>
              </div>
            </FormRow>
            {/* Condomino */}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                Condômino
              </InputLabel>
              <StyledTextField
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                autoComplete="off"
                error={errors.condomino}
                value={values.condomino || ''}
                onChange={(e) => handleFormChange('condomino', e.target.value)}
                onBlur={(e) => handleFormChange('condomino', e.target.value)}
              />
              {renderErrorMessage('condomino')}
            </FormRow>
          </Column>
        </FormContainer>
        {/* Observação */}
        <FormRow>
          <InputLabel shrink htmlFor="rgCpf-input" sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
            Observação *
          </InputLabel>
          <StyledTextField
            variant="outlined"
            fullWidth
            margin="normal"
            name="obs"
            style={{ width: '100%' }}
            multiline
            error={errors.obs}
            value={values.obs || ''}
            onChange={(e) => handleFormChange('obs', e.target.value)}
            onBlur={() => handleValidation('obs')}
          />
        </FormRow>
        <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10}}>
          <Checkbox
            sx={{
              padding: '0px 0px 0px 0px !important',
              '& .MuiSvgIcon-root': { color: '#C4C7D4' }
            }}
            checked={values.envioResponsavel || false}
            error={errors.envioResponsavel}
            onChange={(e) => {
              values.envioResponsavel = e.target.checked;
              handleFormChange('envioResponsavel', e.target.checked);
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}   
          />
          <Typography sx ={{marginLeft: 1, fontSize: 14}}>Enviar apenas para os responsáveis</Typography>
        </FormRow>
        <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 30 }}>
          <Checkbox
            sx={{
              padding: '0px 0px 0px 0px !important',
              '& .MuiSvgIcon-root': { color: '#C4C7D4' }
            }}
            checked={values.enviarParaTodos || false}
            error={errors.enviarParaTodos}
            onChange={(e) => {
              values.enviarParaTodos = e.target.checked;
              handleFormChange('enviarParaTodos', e.target.checked);
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}   
          />
          <Typography sx ={{marginLeft: 1, fontSize: 14}}>Todas as empresas do bloco</Typography>
        </FormRow>
      </StyledPaper>
    </LocalizationProvider>
  );
};

export default Encomenda;