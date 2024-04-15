import React, { useEffect, useState } from 'react';
import { StyledDatePicker, StyledTimePicker, StyledTextField, StyledPaper, FormContainer, Column, FormRow, FormSection  } from '../../../Utils/StyledForm';
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
import SelectCondomino from './Selects/SelectCondomino';
import SelectBloco from './Selects/SelectBloco';
import SelectPiso from './Selects/SelectPiso';
import SelectUnidade from './Selects/SelectUnidade';

dayjs.locale('pt-br');
const today = dayjs();

const ModalComunicado = ({ invalidFields, formData, onDataChange, screenValidation }) => {
  const [locale, setLocale] = useState('pt-br');
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [blocos, setBlocos] = useState({});
  const [pisos, setPisos] = useState({});
  const [unidades, setUnidades] = useState({});

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
    onDataChange({ ...formData, 'tipoComunicacao': 1 });
    screenValidation("comunicado");
  }, []); 

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    onDataChange({ ...formData, [fieldName]: value });
  };
  
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
  
    if (!newFiles || newFiles.length === 0) {
      showErrorToast("Nenhum arquivo selecionado.");
      return;
    }
    
    const updatedFiles = [...formData.files, ...newFiles];

    let concatenatedNames = '';
    updatedFiles.forEach((file, index) => {
      const fileName = file.name;
      const extensionIndex = fileName.lastIndexOf('.');
      const extension = fileName.substring(extensionIndex);
      let truncatedFileName = fileName.substring(0, 10);
    
      const truncatedFileNameWithExtension = truncatedFileName + extension;
  
      concatenatedNames += truncatedFileNameWithExtension;
      if (index !== updatedFiles.length - 1) {
        concatenatedNames += ', ';
      }
    });
  
    setNomeArquivo(concatenatedNames);
    onDataChange({ ...formData, files: updatedFiles }); 
    showSuccessToast(`${newFiles.length} arquivo(s) anexado(s) com sucesso.`);
  };  
  
  console.log(formData)
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
                  error={invalidFields.some(field => field.field === 'dataInicial')}
                  value={formData.dataInicial || null}
                  onChange={(newValue) => { handleFormChange('dataInicial', newValue); }}
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
                error={invalidFields.some(field => field.field === 'titulo')}
                value={formData.titulo || ''}
                onChange={(e) => handleFormChange('titulo', e.target.value)}
                onBlur={(e) => handleFormChange('titulo', e.target.value)}
              />
              {renderErrorMessage('titulo')}
            </FormRow>
            {/*Condomino*/}
            <FormRow>
                <InputLabel
                  shrink
                  sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                >
                  Condômino
                </InputLabel>
                <FormSection>
                  <SelectCondomino setBlocos={setBlocos} setPisos={setPisos} setUnidades={setUnidades} onDataChange={handleFormChange} />
                </FormSection>
             </FormRow>
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
                  error={invalidFields.some(field => field.field === 'dataFim')}
                  value={formData.dataFim || null}
                  onChange={(newValue) => { handleFormChange('dataFim', newValue); }}
                />
                {renderErrorMessage('dataFim')}
            </FormRow>
            {/* Anexos */}
            <FormRow>
              <div style={{ width: "100%" }} >
                  <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                      Anexos
                  </InputLabel>                  
                  <Input type="file" id="file-input" sx={{ display: 'none' }} onChange={handleFileChange} multiple/>
                  <label htmlFor="file-input">
                    <Button component="span" style={buttonFileStyle} variant="contained">
                      <Export size={25} color="#000"/>
                      {nomeArquivo ? nomeArquivo : 'Clique aqui para anexar um arquivo'}
                    </Button>
                  </label>
              </div>
            </FormRow>
            <FormContainer>
              {/* BLoco/Piso/Unid */}
              <Column>
                {/* Bloco/Torre */}
                <FormRow style={{display: 'flex'}}>
                  <div style={{width: '46%'}}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                    >
                      Bloco/Torre
                    </InputLabel>
                    <FormSection>
                      <SelectBloco blocos={blocos} onDataChange={handleFormChange} />
                    </FormSection>
                  </div>
                  <div style={{width: '27%', marginLeft: '10px'}}>
                      {/* Piso */}
                      <InputLabel
                        shrink
                        sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                      >
                        Piso
                      </InputLabel>
                      <FormSection>
                        <SelectPiso pisos={pisos} onDataChange={handleFormChange} />
                      </FormSection>
                  </div>
                  <div style={{width: '27%', marginLeft: '10px'}}>
                    {/* Unidade */}
                    <InputLabel
                        shrink
                        sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}
                      >
                        Unidade
                      </InputLabel>
                      <FormSection>
                        <SelectUnidade unidades={unidades} onDataChange={handleFormChange} />
                      </FormSection>
                  </div>
                </FormRow>
              </Column>
            </FormContainer>
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
            error={invalidFields.some(field => field.field === 'obs')}
            value={formData.obs || ''}
            onChange={(e) => handleFormChange('obs', e.target.value)}
          />
        </FormRow>
        <FormRow style={{ display: 'flex', alignItems: 'center', marginTop: 10}}>
          <Checkbox
            sx={{
              padding: '0px 0px 0px 0px !important',
              '& .MuiSvgIcon-root': { color: '#C4C7D4' }
            }}
            checked={formData.envioResponsavel || false}
            error={invalidFields.some(field => field.field === 'envioResponsavel')}
            onChange={(e) => {
              formData.envioResponsavel = e.target.checked;
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
            checked={formData.enviarParaTodos || false}
            error={invalidFields.some(field => field.field === 'enviarParaTodos')}
            onChange={(e) => {
              formData.enviarParaTodos = e.target.checked;
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

export default ModalComunicado;