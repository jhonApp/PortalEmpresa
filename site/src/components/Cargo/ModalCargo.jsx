import React, { useState, useEffect, useRef } from 'react';
import { StyledTextField, StyledPaper, FormContainer, FormRow } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { PencilSimple, TrashSimple } from 'phosphor-react';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import { inserirCargo, listarCargo, deleteCargo, alterarCargo } from '../../../service/cargoService';

const ModalCargo = ({ updateCargo }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [cargos, setCargos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [codigoCargo, setCodigoCargo] = useState(null);
  const [formMode, setFormMode] = useState('incluir');
  const nomeInputRef = useRef(null);

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleClickOpen = (codigo) => {
    setOpen(true);
    setCodigoCargo(codigo);
  };

  const fetchData = async () => {
    try {
      handleLoadingChange(true);

      const listaCargos = await listarCargo();
      setCargos(listaCargos);
      handleLoadingChange(false);
    } catch (error) {
      handleLoadingChange(false);
      showErrorToast('Erro ao obter lista de cargos');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      handleLoadingChange(true);

      if (!codigoCargo) return;

      await deleteCargo(codigoCargo);
      showSuccessToast("Cargo excluído com sucesso!");
      fetchData();
      updateCargo();
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
    errors,
    handleSubmit,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'departamento'
  );

  const handleSave = async () => {
    try {
      handleLoadingChange(true);

      const { errorTypes } = validateForm(formData, 'departamento');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      await handleSubmit(async () => {        
        try{
            await inserirCargo(formData);
            showSuccessToast("Criado com sucesso!");
            values.nome = '';
            fetchData();
            updateCargo();
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

  const handleUpdate = (cargo) => {
    setFormMode('alterar');
    handleChange('nome', cargo.nome);
    const { nome, codigo } = cargo;
    setFormData({ ...formData, nome, codigo });
  }; 

  const handleAlterar = async () => {
    try {
      handleLoadingChange(true);

      const { errorTypes } = validateForm(formData, 'cargo');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      await handleSubmit(async () => {        
        try{
            await alterarCargo(formData);
            showSuccessToast("Alterado com sucesso!");
            values.nome = '';
            fetchData();
            updateCargo();
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
    <StyledPaper sx={{ background: '#FAFAFA' }} elevation={1}>
      <FormContainer>
        <FormRow style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50%' }}>
            <StyledTextField
              label="Nome Completo *"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              name="nome"
              inputRef={nomeInputRef}
              error={errors.nome}
              value={values.nome}
              onChange={(e) => {
                handleChange('nome', e.target.value);
                handleFormChange({ nome: e.target.value });
              }}
              onBlur={handleValidation}
            />
            {renderErrorMessage('nome')}
          </div>
          <StyledButtonPrimary variant="contained" color="primary" onClick={formMode === 'incluir' ? handleSave : handleAlterar} style={{ marginLeft: '10px', marginTop: '10px' }}>
            {handleSubmitButtonLabel}
          </StyledButtonPrimary>
          {formMode === 'alterar' ? (
            <StyledButtonSecundary variant="contained" color="primary" onClick={handleCancel} style={{ marginLeft: '10px', marginTop: '10px' }}>
              Cancelar
            </StyledButtonSecundary>
          ) : null}
        </FormRow>
      </FormContainer>
      <div>
        <Typography variant="h7" component="h2" style={{ display: 'flex', fontWeight: '600', fontSize: 24, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
          Cargos Cadastrados
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {cargos.map((cargo, index) => (
            <Card key={index} sx={{ display: 'flex', width: '48%', height: 45, marginTop: 2, borderRadius: 10 }}>
              <CardContent sx={{ flex: '1 0 auto', p: '10px' }}>
                <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 16 }}>
                  {cargo.nome}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1}}>
                  <IconButton aria-label="play/pause" onClick={() => handleUpdate(cargo)}>
                    <PencilSimple size={20} color="#676767" />
                  </IconButton>
                  <IconButton aria-label="play/pause" onClick={() => handleClickOpen(cargo.codigo)} >
                    <TrashSimple size={20} color="#FF0B0B"/>
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </div>
      <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete}/>
      <Progress isVisible={loading} />
    </StyledPaper>
  );
};

export default ModalCargo;
