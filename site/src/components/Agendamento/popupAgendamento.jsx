import React from 'react';
import Typography from '@mui/material/Typography';
import Stepper from './stepper';
import { Dialog, DialogContent, Paper, useTheme } from '@mui/material';

function PopupDialog({ open, handleClose }) {
  const theme = useTheme();
  
  return (
    <Dialog open={open} onClose={handleClose} >
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
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold', marginBottom: theme.spacing(0) }}>Novo Agendamento</Typography>
          <Typography variant="subtitle1" style={{ marginBottom: theme.spacing(2), fontSize: 14 }}>Visitante Simples</Typography>
          <Stepper />
        </Paper>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default PopupDialog;
