import React, { useState, useEffect, useRef } from 'react';
import { StyledTextField, StyledPaper, FormContainer, FormRow } from '../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { validateForm } from '../Formulario/validation';
import useForm from '../Formulario/useForm';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { PencilSimple, TrashSimple, MagnifyingGlass, Circle } from 'phosphor-react';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import { Search, SearchIconWrapper, StyledInputBase } from '../../Utils/StyledSearch';
import Progress from '../../Utils/LoadingProgress';
import AlertDialog from '../../Utils/Modal/Delete';
import { inserirCartao, listarCartao, deleteCartao, alterarCartao } from '../../../service/cartaoService';

const ModalCargo = ({ atualizaCartao }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [cartoes, setCartoes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [codigoCartao, setCodigoCartao] = useState(null);
  const [digitado, setDigitado] = useState('');
  const [cartoesFiltrados, setCartoesFiltrados] = useState([]);
  const [formMode, setFormMode] = useState('incluir');
  const nomeInputRef = useRef(null);


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
    setFormData({ ...formData, codigoCartao });
  };

  const handleAlterar = async () => {
    try {
      handleLoadingChange(true);

      const { errorTypes } = validateForm(formData, 'cartao');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      await handleSubmit(async () => {        
        try{
            await alterarCartao(formData);
            showSuccessToast("Alterado com sucesso!");
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

  const handleSave = async () => {
    try {
      handleLoadingChange(true);

      const { errorTypes } = validateForm(formData, 'cartao');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
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
    <StyledPaper sx={{ background: '#FAFAFA' }} elevation={1}>
      <FormContainer>
        <FormRow style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50%' }}>
            <StyledTextField
              label="Número *"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              autoComplete="off"
              name="numero"
              inputRef={nomeInputRef}
              error={errors.numero}
              value={values.numero}
              onChange={(e) => {
                handleChange('numero', e.target.value);
                handleFormChange({ numero: e.target.value });
              }}
              onBlur={handleValidation}
            />
            {renderErrorMessage('numero')}
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
        <Typography variant="h6" component="h7" style={{ display: 'flex', fontWeight: '600', fontSize: 24, textAlign: 'end', alignItems: 'flex-start', marginTop: 5 }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '-10px' }}>
            <Box sx={{ background: '#E2F0E8', width: 'auto', height: 'auto', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Circle size={16} color="#007423" weight="fill" style={{ marginRight: '8px' }} />
              <Typography variant="h6" component="h7" style={{ fontSize: 14, color: '#007423' }}>
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {cartoesFiltrados.map((cartao, index) => (
            <Box key={index} sx={{ width: 'calc(50% - 10px)', mt: 2 }}>
              <Card sx={{ display: 'flex', height: 45, borderRadius: 10, backgroundColor: cartao.status === 'A' ? '#D6EADF' : '#FBE4E4', border: cartao.status === 'A' ? '1px solid #D6EADF' : '1px solid #FBE4E4' }}>
                <CardContent sx={{ flex: '1 0 auto', p: '10px' }} >
                  <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 18 }}>
                    {cartao.codigoCartao}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1}}>
                    <IconButton aria-label="play/pause" onClick={() => handleUpdate(cartao)}>
                      <PencilSimple size={20} color="#676767"  />
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick={() => handleClickOpen(cartao.codigoCartao)} >
                      <TrashSimple size={20} color="#FF0B0B"/>
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </div>
      <AlertDialog dialogOpen={open} handleClose={() => setOpen(false)} handleDelete={handleDelete}/>
      <Progress isVisible={loading} />
    </StyledPaper>
  );
};

export default ModalCargo;
