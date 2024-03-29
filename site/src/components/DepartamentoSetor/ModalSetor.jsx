import React, { useState, useEffect, useRef } from 'react';
import { StyledTextField, StyledPaper, FormContainer, FormRow, BootstrapInput } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import { Box, Card, CardContent, IconButton, Typography, InputLabel} from '@mui/material';
import { PencilSimple, TrashSimple } from 'phosphor-react';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import { StyledBox } from '../../Utils/StyledDialog';
import { StyledCard, StyledCardContent, StyledCardBox, StyledIconButton } from '../../Utils/StyledCard';
import TextWithEllipsis from '../../Utils/Helpers';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import { inserirSetor, listarSetor, deleteSetor, alterarSetor } from '../../../service/setorService';

const ModalSetor = ({ updateSetor }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [setores, setSetor] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [codigoSetor, setCodigoSetor] = useState(null);
  const [formMode, setFormMode] = useState('incluir');
  const nomeInputRef = useRef(null);

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleClickOpen = (codigo) => {
    setOpen(true);
    setCodigoSetor(codigo);
  };

  const fetchData = async () => {
    try {
      handleLoadingChange(true);
      const listaSetores = await listarSetor();
      setSetor(listaSetores);
      handleLoadingChange(false);
    } catch (error) {
      handleLoadingChange(false);
      showErrorToast('Erro ao obter lista de setor');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      handleLoadingChange(true);

      if (!codigoSetor) return;

      await deleteSetor(codigoSetor);
      showSuccessToast("Setor excluído com sucesso!");
      fetchData();
      updateSetor();
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

      const { errorTypes } = validateForm(formData, 'setor');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      await handleSubmit(async () => {        
        try{
            await inserirSetor(formData);
            showSuccessToast("Criado com sucesso!");
            values.nome = '';
            fetchData();
            updateSetor();
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

  const handleUpdate = (setor) => {
    setFormMode('alterar');
    handleChange('nome', setor.nome);
    const { nome, codigo } = setor;
    setFormData({ ...formData, nome, codigo });
  }; 

  const handleAlterar = async () => {
    try {
      handleLoadingChange(true);

      const { errorTypes } = validateForm(formData, 'setor');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      await handleSubmit(async () => {        
        try{
            await alterarSetor(formData);
            showSuccessToast("Alterado com sucesso!");
            values.nome = '';
            setFormMode('incluir');
            fetchData();
            updateSetor();
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
    <StyledPaper sx={{ background: '#FAFAFA', overflow: "hidden", height: 370 }} elevation={1}>
      <FormContainer>
        <FormRow style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
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
                error={errors.nome}
                value={values.nome}
                onChange={(e) => {
                  handleChange('nome', e.target.value);
                  handleFormChange({ nome: e.target.value });
                }}
                onBlur={handleValidation}
              />
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
        <Typography variant="h6" component="h7" style={{ display: 'flex', fontWeight: '600', fontSize: 17, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
          Setores Cadastrados
        </Typography>
        <StyledBox sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {setores.map((setor, index) => (
            <StyledCard key={index}>
            <StyledCardContent>
              <TextWithEllipsis text={setor.nome} maxLength={10} valueWeigth={600} />
            </StyledCardContent>
            <StyledCardBox>
              <StyledIconButton>
                <IconButton onClick={() => handleUpdate(setor)}>
                  <PencilSimple size={20} color="#676767" />
                </IconButton>
                <IconButton onClick={() => handleClickOpen(setor.codigo)} >
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

export default ModalSetor;