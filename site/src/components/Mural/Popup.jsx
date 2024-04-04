import React from 'react';
import Typography from '@mui/material/Typography';
import Comunicado from './Formulario/ModalComunicado'
import ExibiComunicado from './Modal/ExibiComunicado'
import ExibiEnquete from './Modal/ExibirEnquete'
import { Dialog, DialogContent, DialogActions , Button, Paper, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';
import { StyledDialog } from '../../Utils/StyledDialog';
import { StyledButtonPrimary, StyledButtonSecundary } from '../../Utils/StyledButton';

function PopupDialog({ open, handleClose, atualizaMural, title, sub, description, type, enquetes }) {
  const theme = useTheme();

  const renderContent = () => {
    switch (type) {
      case 'ExibirEnquete':
        return <ExibiEnquete enquetes={enquetes} sub={sub} description={description} onClose={handleClose} />;
      case 'ExibirComunicado':
        return <ExibiComunicado sub={sub} description={description} onClose={handleClose} />;
      case 'Comunicado':
        return <Comunicado onClose={handleClose} atualizaMural={atualizaMural} />;
        
        default:
        return null;
    }
  };
  
  const renderActionButton = () => {
    if (type === 'ExibirComunicado') {
      return (
        <div>
          <StyledButtonPrimary onClick={handleClose} sx={{mr: 2, width: '230px'}}>Já recebi a encomenda</StyledButtonPrimary>
          <StyledButtonSecundary autoFocus onClick={handleClose}>Cancelar</StyledButtonSecundary>
        </div>
      );
    } else {
      return (
        <StyledButtonPrimary autoFocus onClick={handleClose}>Cancelar</StyledButtonPrimary>
      );
    }
  };
  

  return (
    <StyledDialog open={open} onClose={handleClose} >
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