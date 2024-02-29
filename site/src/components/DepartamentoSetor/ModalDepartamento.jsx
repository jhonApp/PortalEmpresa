import React, { useState, useEffect } from 'react';
import { StyledTextField, StyledPaper, FormContainer, FormRow } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { PencilSimple, TrashSimple } from 'phosphor-react';
import { StyledButtonPrimary } from '../../Utils/StyledButton';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import { inserirDepartamento, listarDepartamentos, deleteDepartamento } from '../../../service/departamentoService';

const ModalDepartamento = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [departamentos, setDepartamentos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [codigoDepartamento, setCodigoDepartamento] = useState(null);

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
            await inserirDepartamento(formData);
            showSuccessToast("Criado com sucesso!");
            fetchData();
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
          <StyledButtonPrimary variant="contained" color="primary" onClick={handleSave} style={{ marginLeft: '10px', marginTop: '10px' }}>
            Incluir
          </StyledButtonPrimary>
        </FormRow>
      </FormContainer>
      <div>
        <Typography variant="h6" component="h7" style={{ display: 'flex', fontWeight: '600', fontSize: 17, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
          Departamentos Cadastrados
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {departamentos.map((departamento, index) => (
            <Card key={index} sx={{ display: 'flex', width: '48%', height: 45, marginTop: 2, borderRadius: 10 }}>
              <CardContent sx={{ flex: '1 0 auto', p: '10px' }}>
                <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 16 }}>
                  {departamento.nome}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1}}>
                  <IconButton aria-label="play/pause" >
                    <PencilSimple size={20} color="#676767" />
                  </IconButton>
                  <IconButton aria-label="play/pause" onClick={() => handleClickOpen(departamento.codigo)} >
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

export default ModalDepartamento;
