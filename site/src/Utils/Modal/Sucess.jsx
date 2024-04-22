import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CheckCircle } from 'phosphor-react';
import { StyledButtonSucess } from '../../Utils/StyledButton';

export default function AlertDialogSucess({ dialogOpen, handleClose }) {
  
  const handleConfirmSucess = () => {
    handleClose();
  };
  
  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            maxWidth: 'none',
            width: '710px',
            height: '590px',
            borderRadius: '20px'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#E2F0E8', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: '130px' }}>
          <div style={{ marginBottom: '10px' }}>
            <CheckCircle size={80} color="#007423" />
          </div>
          <div style={{ fontWeight: 'bold' }}>
            <span style={{ color: '#007423', fontSize: '24px' }}>Sucesso</span>
          </div>
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: '#E2F0E8', textAlign: 'center' }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 16, color: '#474747', pb: '20px', width: '80%', margin:'0 auto' }}>
            Seu convidado(s) receberá um e-mail com as instruções para a confirmação de presença e conclusão das informações.
          </DialogContentText>
          <DialogActions sx={{ backgroundColor: '#E2F0E8', justifyContent: 'center' }}>
            <StyledButtonSucess onClick={handleConfirmSucess} autoFocus> Finalizar </StyledButtonSucess>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}