import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { XCircle } from 'phosphor-react';
import { StyledButtonDelete } from '../../Utils/StyledButton';

export default function AlertDialogCancel({ dialogOpen, handleClose, handleFunction }) {
  
  const handleConfirmCancel = () => {
    handleClose();
    handleFunction();
  };
  
  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: '710px',
            height: '500px',
            borderRadius: '20px'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#ffe5e5', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: '90px' }}>
          <div style={{ marginBottom: '10px' }}>
            <XCircle size={80} color="#FF0B0B" />
          </div>
          <div style={{ fontWeight: 'bold', fontSize:'24px', color: '#525151' }}>
            Tem certeza que deseja <span style={{ color: '#FF0B0B' }}>cancelar</span>?
          </div>
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: '#ffe5e5', textAlign: 'center' }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 16, color: '#474747', pb: '20px', width: '80%', margin:'0 auto' }}>
            Quando cancelar a operação, todos os dados informados serão perdidos e as alterações não vão ser salvas.
          </DialogContentText>
          <DialogActions sx={{ backgroundColor: '#ffe5e5', justifyContent: 'center' }}>
            <Button sx={{ color: '#525151', borderRadius: '50px' }} onClick={handleClose}>Não</Button>
            <StyledButtonDelete onClick={handleConfirmCancel} autoFocus> Sim </StyledButtonDelete>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}