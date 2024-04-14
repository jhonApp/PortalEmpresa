import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Info } from 'phosphor-react';
import { StyledButtonConfirm } from '../../Utils/StyledButton';

export default function AlertDialogConfirm({ dialogOpen, handleClose, handleFunction }) {
  
  const handleConfirm = () => {
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
            maxWidth: 'none',
            width: '710px',
            height: '590px',
            borderRadius: '20px'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#E8F3FC', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pt: '130px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Info size={80} color="#228BE6" />
          </div>
          <div style={{ fontWeight: 'bold', fontSize:'24px', color: '#228BE6' }}>
            Tem certeza?
          </div>
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: '#E8F3FC', textAlign: 'center' }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 16, color: '#474747', pb: '20px', width: '80%', margin:'0 auto' }}>
            Confirmar a visualização do comunicado?
          </DialogContentText>
          <DialogActions sx={{ backgroundColor: '#E8F3FC', justifyContent: 'center' }}>
            <Button sx={{ color: '#525151', borderRadius: '50px', width: '180px', height: '50px'}} onClick={handleClose}>Não</Button>
            <StyledButtonConfirm onClick={handleConfirm} autoFocus> Sim </StyledButtonConfirm>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}