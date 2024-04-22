import React, { useState, useEffect, useRef } from 'react';
import { StyledTextField, StyledPaper, FormContainer, FormRow, BootstrapInput } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import validateAndSetInvalidFields from '../Formulario/useValidation';
import { Box, Card, CardContent, IconButton, Typography, InputLabel } from '@mui/material';
import { StyledBox } from '../../Utils/StyledDialog';
import { StyledCard, StyledCardContent, StyledCardBox, StyledIconButton } from '../../Utils/StyledCard';
import TextWithEllipsis from '../../Utils/Helpers';
import { PencilSimple, TrashSimple, MagnifyingGlass, Circle } from 'phosphor-react';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import { inserirCartao, listarCartao, deleteCartao, alterarCartao } from '../../../service/cartaoService';

const ModalCartao = ({ atualizaCartao }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState([]);
  const [cartoes, setCartoes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [codigoCartao, setCodigoCartao] = useState(null);
  const [digitado, setDigitado] = useState('');
  const [cartoesFiltrados, setCartoesFiltrados] = useState([]);
  const [formMode, setFormMode] = useState('incluir');
  const numeroInputRef = useRef(null);


  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleClickOpen = (codigo) => {
    setOpen(true);
    setCodigoCartao(codigo);
  };

  const fetchData = async () => {
    try {
      handleLoadingChange(true);

      const listaCartoes = await listarCartao();
      setCartoes(listaCartoes);
      setCartoesFiltrados(listaCartoes);
      handleLoadingChange(false);
    } catch (error) {
      handleLoadingChange(false);
      showErrorToast('Erro ao obter lista de cartões');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setDigitado(value);
    const filteredCartoes = cartoes.filter(cartao => {
      return cartao.codigoCartao.toString().includes(value);
    });
    setCartoesFiltrados(filteredCartoes);
  };

  const handleDelete = async () => {
    try {
      handleLoadingChange(true);

      if (!codigoCartao) return;

      await deleteCartao(codigoCartao);
      showSuccessToast("Cartão excluído com sucesso!");
      fetchData();
      atualizaCartao();
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
    'cartao'
  );

  const handleUpdate = (cartao) => {
    setFormMode('alterar');
    handleChange('numero', cartao.codigoCartao);
    const { codigoCartao } = cartao;
    setFormData({ ...formData, codigoCartao });
  };

  const handleAlterar = async () => {
    try {
      handleLoadingChange(true);

      const errorMessage = validateAndSetInvalidFields(formData, 'cartao', setInvalidFields);
      if (errorMessage) { 
        handleLoadingChange(false) 
        return; 
      }

      await handleSubmit(async () => {        
        try{
            await alterarCartao(formData);
            showSuccessToast("Alterado com sucesso!");
            values.numero = '';
            fetchData();
            setFormMode('incluir');
            atualizaCartao();
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

      const errorMessage = validateAndSetInvalidFields(formData, 'cartao', setInvalidFields);
      if (errorMessage) { 
        handleLoadingChange(false) 
        return; 
      }

      await handleSubmit(async () => {        
        try{
            await inserirCartao(formData);
            showSuccessToast("Criado com sucesso!");
            values.numero = '';
            fetchData();
            atualizaCartao();
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

  const handleSubmitButtonLabel = formMode === 'incluir' ? 'Incluir' : 'Alterar';

  return (
    <StyledPaper sx={{ background: '#FAFAFA', overflow: "hidden", minHeight: 350}} elevation={1}>
      <FormContainer>
        <FormRow style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div>
            <InputLabel shrink htmlFor="bootstrap-input" sx={{ fontSize: 20, color:'#000', fontWeight: 600, textAlign: 'start'}}>
              Numero *
            </InputLabel>
            <BootstrapInput 
              id="bootstrap-input"
              type="text"
              autoComplete="off"
              name="numero"
              inputRef={numeroInputRef}
              error={invalidFields.some(field => field.field === 'numero')}
              value={values.numero}
              onChange={(e) => {
                handleChange('numero', e.target.value);
                handleFormChange({ numero: e.target.value });
              }}
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
        <Typography variant="h6" component="h2" style={{ display: 'flex', fontWeight: '600', fontSize: 24, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
          Cartões Cadastrados
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
              placeholder="Pesquisar Cartão"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Search>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-10px' }}>
            <Box sx={{ background: '#E2F0E8', width: '100%', height: 'auto', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px' }}>
              <Circle size={16} color="#007423" weight="fill" />
              <Typography variant="h6" component="h7" style={{ fontSize: 14, color: '#007423', marginLeft: '8px', marginRight: '17px' }}>
                Cartão Livre
              </Typography>
            </Box>
            <Box sx={{ background: '#FBE4E4', width: '150px', height: 'auto', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Circle size={16} color="#FF0B0B" weight="fill" style={{ marginRight: '8px' }} />
              <Typography variant="h6" component="h7" style={{ fontSize: 14, color: '#FF0B0B' }}>
                Cartão Em uso
              </Typography>
            </Box>
          </div>

        </div>
        {cartoesFiltrados.length === 0 && (
          <Typography style={{ marginTop: '50px' }}>Nenhum resultado encontrado</Typography>
        )}
        <StyledBox sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '30px' }}>
          {cartoesFiltrados.map((cartao, index) => (
            <StyledCard key={index} sx={{ boxShadow: 'none', backgroundColor: cartao.status === 'A' ? '#D6EADF' : '#FBE4E4', border: cartao.status === 'A' ? '1px solid #D6EADF' : '1px solid #FBE4E4' }}>
              <StyledCardContent>
                <TextWithEllipsis text={cartao.codigoCartao} maxLength={10} valueWeigth={600} />
              </StyledCardContent>
              <StyledCardBox>
                <StyledIconButton>
                  <IconButton onClick={() => handleUpdate(cartao)}>
                    <PencilSimple size={20} color="#676767" />
                  </IconButton>
                  <IconButton onClick={() => handleClickOpen(cartao.codigoCartao)} >
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

export default ModalCartao;
