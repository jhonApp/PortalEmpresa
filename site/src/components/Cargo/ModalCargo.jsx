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
import { inserirCargo, listarCargo, deleteCargo, alterarCargo } from '../../../service/cargoService';

const ModalCargo = ({ onClose, atualizarCargo, cargos }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState([]);
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

  const handleDelete = async () => {
    try {
      handleLoadingChange(true);

      if (!codigoCargo) return;

      await deleteCargo(codigoCargo);
      showSuccessToast("Cargo excluído com sucesso!");
      atualizarCargo();
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

      const errorMessage = validateAndSetInvalidFields(formData, 'departamento', setInvalidFields);
      if (errorMessage) { 
        handleLoadingChange(false) 
        return; 
      }

      await handleSubmit(async () => {        
        try{
            await inserirCargo(formData);
            showSuccessToast("Criado com sucesso!");
            values.nome = '';
            atualizarCargo();
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

      const errorMessage = validateAndSetInvalidFields(formData, 'departamento', setInvalidFields);
      if (errorMessage) { 
        handleLoadingChange(false) 
        return; 
      }

      await handleSubmit(async () => {        
        try{
            await alterarCargo(formData);
            showSuccessToast("Alterado com sucesso!");
            values.nome = '';
            atualizarCargo();
            setFormMode('incluir');
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
      <Typography variant="h7" component="h2" style={{ display: 'flex', fontWeight: '600', fontSize: 24, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
        Cargos Cadastrados
      </Typography>
      <StyledBox>
        {cargos.map((cargo, index) => (
          <StyledCard key={index}>
            <StyledCardContent>
              <TextWithEllipsis text={cargo.nome} maxLength={10} valueWeigth={600}/>
            </StyledCardContent>
            <StyledCardBox>
              <StyledIconButton>
                <IconButton aria-label="play/pause" onClick={() => handleUpdate(cargo)}>
                  <PencilSimple size={20} color="#676767" />
                </IconButton>
                <IconButton aria-label="play/pause" onClick={() => handleClickOpen(cargo.codigo)} >
                  <TrashSimple size={20} color="#FF0B0B"/>
                </IconButton>
              </StyledIconButton>
            </StyledCardBox>
          </StyledCard>
        ))}
      </StyledBox>
      <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete}/>
      <Progress isVisible={loading} />
    </StyledPaper>
  );
};

export default ModalCargo;
