import React, { useState, useEffect, useRef } from 'react';
import { StyledTextField, StyledPaper, FormContainer, FormRow, BootstrapInput } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import { IconButton, Typography, InputLabel, Input, Button } from '@mui/material';
import { StyledBox } from '../../Utils/StyledDialog';
import validateAndSetInvalidFields from '../Formulario/useValidation';
import { StyledCard, StyledCardContent, StyledCardBox, StyledIconButton } from '../../Utils/StyledCard';
import TextWithEllipsis from '../../Utils/Helpers';
import { Export } from 'phosphor-react';
import { PencilSimple, TrashSimple, MagnifyingGlass, Circle } from 'phosphor-react';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import { inserirDocumento, listarDocumento, deleteDocumento } from '../../../service/documentoService';

const ModalDocumento = ({ atualizaDocumento, documentoData }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [nomeArq, setNomeArquivo] = useState('');
  const [codigoDocumento, setCodigoDocumento] = useState(null);
  const [digitado, setDigitado] = useState('');
  const [formMode, setFormMode] = useState('incluir');

  const [documentos, setDocumentos] = useState(documentoData);
  const [documentosFiltrados, setDocumentosFiltrados] = useState(documentoData);
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
    'cartao'
  );

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleClickOpen = (codigo) => {
    setOpen(true);
    setCodigoDocumento(codigo);
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    setDigitado(value);
    
    const filteredDocumentos = documentos.filter(documento => {
      return documento.nomeArquivo.toLowerCase().includes(searchValue);
    });
    setDocumentosFiltrados(filteredDocumentos);
  };  

  const handleDelete = async () => {
    try {
      handleLoadingChange(true);
      
      if (!codigoDocumento) return;
  
      await deleteDocumento(codigoDocumento);
      showSuccessToast("Documento excluído com sucesso!");
  
      const novaListaDocumentos = documentosFiltrados.filter(documento => documento.nr_arquivo !== codigoDocumento);
      setDocumentosFiltrados(novaListaDocumentos);
  
      atualizaDocumento();
      handleLoadingChange(false);
    } catch (error) {
      handleLoadingChange(false);
      showErrorToast(error.message);
    }
  };
  
  const handleAlterar = async () => {
    try {
      handleLoadingChange(true);
      const { errorTypes } = validateForm(formData, 'documento');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha o campo obrigatório ou realize a alteração conforme esperado.');
        handleLoadingChange(false);
        return;
      }

      await handleSubmit(async () => {        
        try{
            await alterarDocumento(formData);
            showSuccessToast("Alterado com sucesso!");
            values.numero = '';
            fetchData();
            setFormMode('incluir');
            atualizaDocumento();
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

  const handleSave = async () => {
    try {
      handleLoadingChange(true);

      if(nomeArq === ""){
        showErrorToast("Nenhum arquivo selecionado.");
        handleLoadingChange(false);
        return;
      }

      await handleSubmit(async () => {        
        try {
          const codigoDocumento = await inserirDocumento(formData);
          showSuccessToast("Criado com sucesso!");
          const novoDocumento = { ...formData, codigoDocumento };
          setDocumentosFiltrados([...documentosFiltrados, novoDocumento]);
          atualizaDocumento();
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
    values.numero = '';
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file == null) {
      showErrorToast("Não foi possível anexar o arquivo, tente novamente.");
      return;
    }

    const fileName = file.name;
    const extensionIndex = fileName.lastIndexOf('.');
    const extension = fileName.substring(extensionIndex);
    let truncatedFileName = fileName.substring(0, 10);

    const truncatedFileNameWithExtension = truncatedFileName + extension;
    setNomeArquivo(truncatedFileNameWithExtension);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, file: file, nomeArquivo: file.name });
    };
    reader.readAsDataURL(file);
    showSuccessToast("Anexado com sucesso.");
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
    height: '42px',
    width: '100%'
  };

  const handleSubmitButtonLabel = formMode === 'incluir' ? 'Incluir' : 'Alterar';

  return (
    <StyledPaper sx={{ background: '#FAFAFA', overflow: "hidden", minHeight: 350 }} elevation={1}>
      <FormContainer>
        <FormRow style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div>
              <InputLabel shrink sx={{ fontSize: 20, color:'#1B1A16', fontWeight: 600, textAlign: 'start'}}>
                  Anexos
              </InputLabel>                  
              <Input type="file" id="file-input" sx={{ display: 'none' }} onChange={handleFileChange} />
              <label htmlFor="file-input">
                <Button component="span" style={buttonFileStyle} variant="contained">
                  <Export size={25} color="#000"/>
                  {nomeArq ? nomeArq : 'Clique aqui para selecionar uma foto'}
                </Button>
              </label>
            </div>
          <StyledButtonPrimary variant="contained" color="primary" onClick={formMode === 'incluir' ? handleSave : handleAlterar} style={{ width: 145, height: 40, marginLeft: '10px', marginTop: '30px' }}>
            {handleSubmitButtonLabel}
          </StyledButtonPrimary>
          {formMode === 'alterar' ? (
            <StyledButtonSecundary variant="contained" color="primary" onClick={handleCancel} style={{ width: 145, height: 40, marginLeft: '10px', marginTop: '30px' }}>
              Cancelar
            </StyledButtonSecundary>
          ) : null}
        </FormRow>
      </FormContainer>
      <div>
        <Typography variant="h6" component="h2" style={{ display: 'flex', fontWeight: '600', fontSize: 24, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
          Documentos Cadastrados
        </Typography>
        <div style={{ display: 'flex' }}>
          <Search>
            <SearchIconWrapper>
              <IconButton>
                <MagnifyingGlass size={20} color="#666666" />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              value={digitado}
              placeholder="Pesquisar Documento"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Search>
        </div>
        {documentosFiltrados.length === 0 && (
          <Typography style={{ marginTop: '50px' }}>Nenhum resultado encontrado</Typography>
        )}
        <StyledBox sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>
          {documentosFiltrados.map((documento, index) => (
            <StyledCard key={index} sx={{ backgroundColor: '#fff' }}>
              <StyledCardContent>
                <TextWithEllipsis text={documento.nomeArquivo} maxLength={20} valueWeigth={600} />
              </StyledCardContent>
              <StyledCardBox>
                <StyledIconButton>
                  <IconButton onClick={() => handleClickOpen(documento.nr_arquivo)} >
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

export default ModalDocumento;
