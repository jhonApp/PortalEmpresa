import React, { useState, useEffect } from 'react';
import { StyledPaper, FormContainer, FormRow } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import validateAndSetInvalidFields from '../Formulario/useValidation';
import PopupDialog from '../dialog';
import Formulario from './ModalFormulario'
import { IconButton, Typography } from '@mui/material';
import { StyledBox } from '../../Utils/StyledDialog';
import { StyledCard, StyledCardContent, StyledCardBox, StyledIconButton } from '../../Utils/StyledCard';
import TextWithEllipsis from '../../Utils/Helpers';
import { PencilSimple, TrashSimple, PlusCircle } from 'phosphor-react';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import { inserirEspaco, listarEspaco, deleteEspaco, alterarEspaco } from '../../../service/espacoService';


const ModalEspaco = ({ onClose, espacos, atualizaEspacos, title, description }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [codigoEspaco, setCodigoEspaco] = useState(null);
  const [espacosFiltrados, setEspacoFiltrados] = useState(espacos);
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
    'espaco'
  );
  const handleOpenPopup = () => { 
    setOpen(true); 
    setOnUpdate(false);
    setFormData({});
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleClickOpen = (codigo) => {
    setOpenDelete(true);
    setCodigoEspaco(codigo);
  };

  const handleDelete = async () => {
    try {
      handleLoadingChange(true);
      
      if (!codigoEspaco){
        showErrorToast("Houve erro ao realizar a exclusão.");
        handleLoadingChange(false);
        return;
      } 
  
      await deleteEspaco(codigoEspaco);
      
      const novaLista = espacosFiltrados.filter(espaco => espaco.codigoLocal !== codigoEspaco);
      setEspacoFiltrados(novaLista);
  
      showSuccessToast("Espaço excluído com sucesso!");
      handleClosePopupDelete();
      atualizaEspacos();
      handleLoadingChange(false);
    } catch (error) {
      handleLoadingChange(false);
      showErrorToast(error.message);
    }
  };  

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const errorMessage = validateAndSetInvalidFields(formData, 'espaco', setInvalidFields);
      if (errorMessage) { 
        setLoading(false) 
        return; 
      }

      await handleSubmit(async () => {        
        try{
          if(!onUpdate){
            const codigo = await inserirEspaco(formData);
            
            showSuccessToast("Criado com sucesso!");
            setEspacoFiltrados(prevEspacos => [
              ...prevEspacos,
              { ...formData, codigoLocal: codigo }
            ]);
            atualizaEspacos();

          }else{
            await alterarEspaco(formData);

            const index = espacosFiltrados.findIndex(item => item.codigoLocal === formData.codigoLocal);
            if (index !== -1) {
              const updatedEspacosFiltrados = [...espacosFiltrados];
              updatedEspacosFiltrados[index] = formData;
              setEspacoFiltrados(updatedEspacosFiltrados); 

              showSuccessToast("Alterado com sucesso!");
            }
            atualizaEspacos();
          }
            
          handleClosePopup();
        } catch (e) {
          setLoading(false);
          showErrorToast(e.message);
        }
      });
      setLoading(false);

    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
    }
  };

  const handleUpdate = (espaco) => {
    setOpen(true);
    setOnUpdate(true);
    setFormData({ ...formData, ...espaco });
  };

  const renderContent = () => {
    return <Formulario onDataChange={handleFormChange} data={formData} invalidFields={invalidFields} />;
  };

  const renderActionButton = () => {
    return (
      <div>
        <StyledButtonSecundary autoFocus onClick={handleClosePopup}>
          Cancelar
        </StyledButtonSecundary>
        {onUpdate ? (
          <StyledButtonPrimary onClick={handleSave} sx={{ mr: 2 }}>
            Alterar
          </StyledButtonPrimary>
        ) : (
          <StyledButtonPrimary onClick={handleSave} sx={{ mr: 2 }}>
            Salvar
          </StyledButtonPrimary>
        )}
      </div>
    );
  };
  

  const handleClosePopup = () => { setOpen(false); };
  const handleClosePopupDelete = () => { setOpenDelete(false); };

  return (
    <StyledPaper sx={{ background: '#FAFAFA', overflow: "hidden", minHeight: 350 }} elevation={1}>
      <FormContainer>
        <FormRow style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <StyledButtonPrimary variant="contained" color="primary" onClick={handleOpenPopup} style={{ width: 145, height: 40, marginLeft: 0, gap: '10px', fontSize: '16px'}}>
            <PlusCircle size={24} color="#fff" />
            Novo
          </StyledButtonPrimary>
        </FormRow>
      </FormContainer>
      <div>
        <Typography variant="h6" component="h2" style={{ display: 'flex', fontWeight: '600', fontSize: 24, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
          Espaços Cadastrados
        </Typography>
        {espacosFiltrados.length === 0 && (
          <Typography style={{ marginTop: '50px' }}>Nenhum resultado encontrado</Typography>
        )}
        <StyledBox>
          {espacosFiltrados.map((espaco, index) => (
            <StyledCard key={index}>
              <StyledCardContent>
                <TextWithEllipsis text={espaco.descricao} maxLength={10} valueWeigth={600} />
              </StyledCardContent>
              <StyledCardBox>
                <StyledIconButton>
                  <IconButton onClick={() => handleUpdate(espaco)}>
                    <PencilSimple size={20} color="#676767" />
                  </IconButton>
                  <IconButton onClick={() => handleClickOpen(espaco.codigoLocal)} >
                    <TrashSimple size={20} color="#FF0B0B"/>
                  </IconButton>
                </StyledIconButton>
              </StyledCardBox>
            </StyledCard>
          ))}
        </StyledBox>
      </div>
      <AlertDialog dialogOpen={openDelete} handleClose={() => setOpenDelete(false)} handleDelete={handleDelete}/>
      <PopupDialog open={open} handleClose={handleClosePopup} title={title} description={description} renderContent={renderContent} renderActionButton={renderActionButton} visible={false}/>
      <Progress isVisible={loading} />
    </StyledPaper>
  );
};

export default ModalEspaco;
