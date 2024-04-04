import React, { useEffect, useState } from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow } from '../../../../Utils/StyledForm';
import { validateForm } from '../../../Formulario/validation';
import { StyledBoxComunicado } from '../../../../Utils/StyledDialog';
import { IconButton, Typography, InputLabel } from '@mui/material';
import { StyledCard, StyledCardContent, StyledCardBox, StyledIconButton } from '../../../../Utils/StyledCard';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../../../Utils/StyledButton';
import { showSuccessToast, showErrorToast } from '../../../../Utils/Notification';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TrashSimple } from 'phosphor-react';
import TextWithEllipsis from '../../../../Utils/Helpers';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import useForm from '../../../Formulario/useForm';

dayjs.locale('pt-br');
const today = dayjs();

const FormularioEnquete = ({ onDataChange, onFieldValidationChange, formData }) => {
  const [locale, setLocale] = useState('pt-br');
  const [formMode, setFormMode] = useState('incluir');
  const [codigoCargo, setCodigoCargo] = useState(null);
  const [opcoes, setOpcoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    values,
    errors,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'enquete'
  );
  console.log(formData)

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    handleValidation(fieldName);
    onDataChange({ ...formData, [fieldName]: value });
  };

  const handleAdd = async () => {
    try {
      setLoading(true);

      const { errorTypes } = validateForm(formData, 'opcaoEnquete');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      let updatedFormData = { ...formData };
      if (opcoes.length === 0) {
        updatedFormData.opcaoEnquete = [];
      }
      updatedFormData.opcaoEnquete.push({ descricao: values.descricao });
      onDataChange(updatedFormData);

      const newOpcao = { descricao: values.descricao };
      setOpcoes([...opcoes, newOpcao]); // Adicionando novo item à lista opcoes

      // Limpar o campo após adicionar o item à lista
      handleChange('descricao', '');
      onDataChange({ ...formData, descricao: '' });

      showSuccessToast("Criado com sucesso!");
      setLoading(false);

    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
    }
  };

  const handleDelete = (index) => {
    const updatedOpcoes = [...opcoes];
    updatedOpcoes.splice(index, 1);
    setOpcoes(updatedOpcoes);

    let updatedFormData = { ...formData };
    updatedFormData.opcaoEnquete = updatedOpcoes;
    onDataChange(updatedFormData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <StyledPaper sx={{ background: '#FAFAFA', overflow: "hidden", height: 400 }} elevation={1}>
        <FormContainer>
          <Column>
            {/* Observação */}
            <FormRow>
              <InputLabel shrink sx={{ fontSize: 20, color: '#1B1A16', fontWeight: 600, textAlign: 'start' }}>
                Explicação da enquete
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
          </Column>
        </FormContainer>
        <FormContainer>
          <FormRow style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div>
              <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: 20, color: '#000', fontWeight: 600, textAlign: 'start' }}>
                Descrição da opção *
              </InputLabel>
              <StyledTextField
                id="bootstrap-input"
                type="text"
                autoComplete="off"
                name="descricao"
                error={errors.descricao}
                value={values.descricao}
                onChange={(e) => {
                  handleChange('descricao', e.target.value);
                  handleFormChange('descricao', e.target.value);
                }}
                onBlur={handleValidation}
              />
            </div>
            <StyledButtonPrimary variant="contained" color="primary" onClick={handleAdd} style={{ width: 145, height: 40, marginLeft: '10px', marginTop: '20px' }}>
              Incluir
            </StyledButtonPrimary>
          </FormRow>
        </FormContainer>
        <Typography variant="h7" component="h2" style={{ display: 'flex', fontWeight: '600', fontSize: 24, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
          Opções
        </Typography>
        <StyledBoxComunicado>
          {opcoes.map((opcao, index) => (
            <StyledCard key={index}>
              <StyledCardContent>
                <TextWithEllipsis text={opcao.descricao} maxLength={10} valueWeigth={600}/>
              </StyledCardContent>
              <StyledCardBox>
                <StyledIconButton>
                  <IconButton onClick={() => handleDelete(index)} >
                    <TrashSimple size={20} color="#FF0B0B"/>
                  </IconButton>
                </StyledIconButton>
              </StyledCardBox>
            </StyledCard>
          ))}
        </StyledBoxComunicado>
      </StyledPaper>
    </LocalizationProvider>
  );
};

export default FormularioEnquete;