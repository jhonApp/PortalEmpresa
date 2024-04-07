import React, { useState, useEffect } from 'react';
import { StyledPaper, FormContainer, FormRow } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
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


const ModalEspaco = ({ onClose, atualizaEspaco, title, description }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [espacos, setEspacos] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [codigoEspaco, setCodigoEspaco] = useState(null);
  const [espacosFiltrados, setEspacoFiltrados] = useState([]);
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

  const fetchData = async () => {
    try {
      handleLoadingChange(true);

      const listaEspacos = await listarEspaco();
      console.log(listaEspacos)
      setEspacoFiltrados(listaEspacos);
      handleLoadingChange(false);

    } catch (error) {
      handleLoadingChange(false);
      showErrorToast('Erro ao obter lista de espaços');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenPopup = () => { setOpen(true); };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleClickOpen = (codigo) => {
    setOpen(true);
    setCodigoEspaco(codigo);
  };

  const handleDelete = async () => {
    try {
      handleLoadingChange(true);

      if (!codigoEspaco) return;

      await deleteEspaco(codigoEspaco);
      showSuccessToast("Espaço excluído com sucesso!");
      fetchData();
      atualizaEspaco();
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

      const { errorTypes } = validateForm(formData, 'espaco');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      await handleSubmit(async () => {        
        try{
            await inserirEspaco(formData);
            showSuccessToast("Criado com sucesso!");
            fetchData();
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
    setFormMode('alterar');
    handleChange('numero', espaco.codigoEspaco);
    const { codigoEspaco } = espaco;
    setFormData({ ...formData, codigoEspaco });
  };

  const renderContent = () => {
    return <Formulario onDataChange={handleFormChange} />;
  };

  const renderActionButton = () => {
    return (
      <div>
        <StyledButtonSecundary autoFocus onClick={handleClosePopup}>
          Cancelar
        </StyledButtonSecundary>
        <StyledButtonPrimary onClick={handleSave} sx={{ mr: 2 }}>
          Salvar
        </StyledButtonPrimary>
      </div>
    );
  };

  const handleClosePopup = () => { setOpen(false); };

  return (
    <StyledPaper sx={{ background: '#FAFAFA', overflow: "hidden", height: 350 }} elevation={1}>
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
        <StyledBox sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>
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
      <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete}/>
      <PopupDialog open={open} handleClose={handleClosePopup} title={title} description={description} renderContent={renderContent} renderActionButton={renderActionButton} visible={false}/>
      <Progress isVisible={loading} />
    </StyledPaper>
  );
};

export default ModalEspaco;
