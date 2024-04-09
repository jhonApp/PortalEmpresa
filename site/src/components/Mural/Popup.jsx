import React from 'react';
import Typography from '@mui/material/Typography';
import ExibiEncomenda from './Modal/ExibiEncomenda';
import ExibiComunicado from './Modal/ExibiComunicado'
import ExibiEnquete from './Modal/ExibirEnquete'
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { Dialog, DialogContent, DialogActions , Button, Paper, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';
import { StyledDialog } from '../../Utils/StyledDialog';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';
import { registrarVisualizacao } from '../../../service/muralService';

function PopupDialog({ open, handleClose, atualizaMural, codigoComunicado, title, sub, description, type, enquetes }) {
  const theme = useTheme();

  const renderContent = () => {
    switch (type) {
      case 'ExibirEnquete':
        return <ExibiEnquete codigoComunicado={codigoComunicado} enquetes={enquetes} sub={sub} description={description} onClose={handleClose} />;
      case 'ExibirComunicado':
        return <ExibiComunicado codigoComunicado={codigoComunicado} sub={sub} description={description} onClose={handleClose} />;
      case 'ExibirEncomenda':
        return <ExibiEncomenda codigoComunicado={codigoComunicado} sub={sub} description={description} onClose={handleClose} />;
        default:
        return null;
    }
  };

  const handleVisualizacao = async () => {
    try {
      
      if (!codigoComunicado) return;
      await registrarVisualizacao(codigoComunicado);
      // showSuccessToast("Visualização alterada");
      atualizaMural();
      handleClose();
    } catch (error) {
      showErrorToast(error.message);
    }
  };
  
  const renderActionButton = () => {
    const actionButtons = {
      'ExibirEncomenda': (
        <div>
          <StyledButtonSecundary autoFocus onClick={handleVisualizacao}>Cancelar</StyledButtonSecundary>
          <StyledButtonPrimary onClick={handleVisualizacao} sx={{mr: 2, width: '230px'}}>Já recebi a encomenda</StyledButtonPrimary>
        </div>
      ),
      'ExibirEnquete': (
        <StyledButtonPrimary autoFocus onClick={handleVisualizacao}>Voltar</StyledButtonPrimary>
      ),
      default: (
        <StyledButtonPrimary autoFocus onClick={handleVisualizacao}>Fechar</StyledButtonPrimary>
      )
    };
  
    return actionButtons[type] || actionButtons.default;
  };  
  

  return (
    <StyledDialog open={open} onClose={handleClose} style={{ zIndex: '0', marginLeft: '13%', marginTop: '50px' }}>
      <DialogActions sx={{position: 'absolute', marginRight: 0, top: 16, right: 0}}>
        <Button onClick={handleClose}><XCircle size={28} color="#FF0B0B"></XCircle></Button>
      </DialogActions>
      <DialogContent style={{ padding: '0px' }} >
        <Paper
          style={{
            backgroundColor: '#FAFAFA',
            color: theme.palette.text.primary,
            borderRadius: '13px',
            padding: '30px',
            boxShadow: 'none',
            overflowY: 'auto',
            height: 'auto', 
          }}
        >
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold', marginBottom: theme.spacing(0), fontSize: '24px' }}>{title}</Typography>
          {renderContent()}
        </Paper>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#FAFAFA', m: 2}}>
        {renderActionButton()}
      </DialogActions>
    </StyledDialog>
  );
}

export default PopupDialog;