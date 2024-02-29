import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { XCircle } from 'phosphor-react';
import { StyledButtonDelete } from '../../Utils/StyledButton';

export default function AlertDialog({ dialogOpen, handleClose, handleDelete }) {
  
  const handleConfirmDelete = () => {
    handleDelete();
    handleClose();
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
            width: '500px',
            height: '400px',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#ffe5e5', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: '90px' }}>
          <div style={{ marginBottom: '10px' }}>
            <XCircle size={52} color="#FF0B0B" />
          </div>
          <div style={{ fontWeight: 'bold' }}>
            Tem certeza que deseja <span style={{ color: 'red' }}>excluir</span>?
          </div>
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: '#ffe5e5', textAlign: 'center' }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 14, color: '#000', pb: '20px' }}>
            Quando excluir os dados não poderá ser revertidos.
          </DialogContentText>
          <DialogActions sx={{ backgroundColor: '#ffe5e5', justifyContent: 'center' }}>
            <Button sx={{ color: '#000' }} onClick={handleClose}>Não</Button>
            <StyledButtonDelete onClick={handleConfirmDelete} autoFocus> Sim </StyledButtonDelete>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}