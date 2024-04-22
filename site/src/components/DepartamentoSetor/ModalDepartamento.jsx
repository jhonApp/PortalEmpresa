import React, { useState, useEffect, useRef } from 'react';
import { StyledTextField, StyledPaper, FormContainer, FormRow, BootstrapInput } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import validateAndSetInvalidFields from '../Formulario/useValidation';
import { Box, Card, CardContent, IconButton, Typography, InputLabel } from '@mui/material';
import { PencilSimple, TrashSimple } from 'phosphor-react';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import { StyledBox } from '../../Utils/StyledDialog';
import { StyledCard, StyledCardContent, StyledCardBox, StyledIconButton } from '../../Utils/StyledCard';
import TextWithEllipsis from '../../Utils/Helpers';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import { inserirDepartamento, listarDepartamentos, deleteDepartamento, alterarDepartamento } from '../../../service/departamentoService';

const ModalDepartamento = ({ updateDepartamento }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [codigoDepartamento, setCodigoDepartamento] = useState(null);
  const [formMode, setFormMode] = useState('incluir');
  const nomeInputRef = useRef(null);

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleClickOpen = (codigo) => {
    setOpen(true);
    setCodigoDepartamento(codigo);
  };

  const fetchData = async () => {
    try {
      handleLoadingChange(true);
      const listaDepartamentos = await listarDepartamentos();
      setDepartamentos(listaDepartamentos);
      handleLoadingChange(false);
    } catch (error) {
      handleLoadingChange(false);
      showErrorToast('Erro ao obter lista de departamentos');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      handleLoadingChange(true);

      if (!codigoDepartamento) return;

      await deleteDepartamento(codigoDepartamento);
      showSuccessToast("Departamento excluído com sucesso!");
      fetchData();
      updateDepartamento();
      handleLoadingChange(false);
    } catch (error) {

      handleLoadingChange(false);
      showErrorToast(error.message);
    }
  };

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const {
    values,
    handleSubmit,
    handleChange,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'departamento'
  );

  const handleSave = async () => {
    try {
      handleLoadingChange(true);

      const errorMessage = validateAndSetInvalidFields(formData, 'departamento', setInvalidFields);
      if (errorMessage) { 
        handleLoadingChange(false) 
        return; 
      }

      await handleSubmit(async () => {        
        try{
            await inserirDepartamento(formData);
            showSuccessToast("Criado com sucesso!");
            values.nome = '';
            fetchData();
            updateDepartamento();
        } catch (e) {
            handleLoadingChange(false);
            showErrorToast(e.message);
        }
      });
      handleLoadingChange(false);

    } catch (error) {
      handleLoadingChange(false);
      showErrorToast(error.message);
    }
  };

  const handleUpdate = (departamento) => {
    setFormMode('alterar');
    handleChange('nome', departamento.nome);
    const { nome, codigo } = departamento;
    setFormData({ ...formData, nome, codigo });
  }; 

  const handleAlterar = async () => {
    try {
      handleLoadingChange(true);

      const errorMessage = validateAndSetInvalidFields(formData, 'departamento', setInvalidFields);
      if (errorMessage) { 
        handleLoadingChange(false) 
        return; 
      }

      await handleSubmit(async () => {        
        try{
            await alterarDepartamento(formData);
            showSuccessToast("Alterado com sucesso!");
            values.nome = '';
            setFormMode('incluir');
            fetchData();
            updateDepartamento();
        } catch (e) {
            handleLoadingChange(false);
            showErrorToast(e.message);
        }
      });
      handleLoadingChange(false);

    } catch (error) {
      handleLoadingChange(false);
      showErrorToast(error.message);
    }
  };

  const handleCancel = () => {
    setFormMode('incluir');
    values.nome = '';
  };

  const handleSubmitButtonLabel = formMode === 'incluir' ? 'Incluir' : 'Alterar';

  return (
    <StyledPaper sx={{ background: 'transparent', overflow: "hidden" }} elevation={1}>
      <FormContainer>
        <FormRow style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: 20, color:'#000', fontWeight: 600, textAlign: 'start'}}>
              Nome *
            </InputLabel>
            <BootstrapInput 
              id="bootstrap-input"
              type="text"
              autoComplete="off"
              name="nome"
              inputRef={nomeInputRef}
              error={invalidFields.some(field => field.field === 'nome')}
              value={values.nome}
              onChange={(e) => {
                handleChange('nome', e.target.value);
                handleFormChange({ nome: e.target.value });
              }}
            />
            {renderErrorMessage('nome')}
          </div>
          <StyledButtonPrimary variant="contained" color="primary" onClick={formMode === 'incluir' ? handleSave : handleAlterar} style={{ width: 145, height: 40, marginLeft: '10px', marginTop: '20px' }}>
            {handleSubmitButtonLabel}
          </StyledButtonPrimary>
          {formMode === 'alterar' ? (
            <StyledButtonSecundary variant="contained" color="primary" onClick={handleCancel} style={{ width: 145, height: 40, marginLeft: '10px', marginTop: '20px' }}>
              Cancelar
            </StyledButtonSecundary>
          ) : null}
        </FormRow>
      </FormContainer>
      <div>
        <Typography variant="h7" component="h2" style={{ display: 'flex', fontWeight: '600', fontSize: 24, textAlign: 'end', alignItems: 'flex-start', marginTop: 6 }}>
          Departamentos Cadastrados
        </Typography>
        <StyledBox sx={{ background: 'transparent', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {departamentos.map((departamento, index) => (
            <StyledCard key={index}>
              <StyledCardContent>
                <TextWithEllipsis text={departamento.nome} maxLength={10} valueWeigth={600} />
              </StyledCardContent>
              <StyledCardBox>
                <StyledIconButton>
                  <IconButton onClick={() => handleUpdate(departamento)}>
                    <PencilSimple size={20} color="#676767" />
                  </IconButton>
                  <IconButton onClick={() => handleClickOpen(departamento.codigo)} >
                    <TrashSimple size={20} color="#FF0B0B"/>
                  </IconButton>
                </StyledIconButton>
              </StyledCardBox>
            </StyledCard>
          ))}
        </StyledBox>
      </div>
      <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete}/>
      <Progress isVisible={loading} />
    </StyledPaper>
  );
};

export default ModalDepartamento;