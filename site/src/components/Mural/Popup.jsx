import React from 'react';
import Typography from '@mui/material/Typography';
import Comunicado from './ModalComunicado'
import { Dialog, DialogContent, DialogActions , Button, Paper, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';
import { StyledButtonPrimary } from '../../Utils/StyledButton';

function PopupDialog({ open, handleClose, atualizaMural, title, description, type }) {
  const theme = useTheme();

  const renderContent = () => {
    switch (type) {
      case 'Comunicado':
        return <Comunicado onClose={handleClose} atualizaMural={atualizaMural} />;
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={open} onClose={handleClose} >
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
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold', marginBottom: theme.spacing(0) }}>{title}</Typography>
          <Typography variant="h3" style={{ marginBottom: theme.spacing(2), fontSize: 13 }}>{description}</Typography>
          {renderContent()}
        </Paper>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#FAFAFA' }}>
        <StyledButtonPrimary autoFocus onClick={handleClose}> Cancelar </StyledButtonPrimary>
      </DialogActions>
    </Dialog>
  );
}

export default PopupDialog;