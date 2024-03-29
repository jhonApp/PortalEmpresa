import React from 'react';
import Typography from '@mui/material/Typography';
import Cargo from './ModalCargo'
import { DialogContent, DialogActions , Button, Paper, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';
import { StyledButtonPrimary } from '../../Utils/StyledButton';
import { StyledDialog } from '../../Utils/StyledDialog';

function PopupDialog({ open, handleClose, updateCargo, title, description, type }) {
  const theme = useTheme();

  const renderContent = () => {
    switch (type) {
      case 'Cargo':
        return <Cargo onClose={handleClose} updateCargo={updateCargo} />;
      default:
        return null;
    }
  };
  
  return (
    <StyledDialog open={open} onClose={handleClose}>
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
          <Typography variant="h3" style={{ marginBottom: theme.spacing(2), fontSize: 14 }}>{description}</Typography>
          {renderContent()}
        </Paper>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#FAFAFA' }}>
        <StyledButtonPrimary autoFocus onClick={handleClose}> Fechar </StyledButtonPrimary>
      </DialogActions>
    </StyledDialog>
  );
}

export default PopupDialog;