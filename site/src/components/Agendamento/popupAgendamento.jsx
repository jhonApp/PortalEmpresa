import React from 'react';
import Typography from '@mui/material/Typography';
import Stepper from './stepper';
import { Dialog, DialogContent, DialogActions , Button, Paper, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';

function PopupDialog({ open, handleClose, atualizarAgendamento }) {
  const theme = useTheme();
  
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
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold', marginBottom: theme.spacing(0) }}>Novo Agendamento</Typography>
          <Typography variant="h3" style={{ marginBottom: theme.spacing(2), fontSize: 14 }}>Visitante Simples</Typography>
          <Stepper atualizarAgendamento={atualizarAgendamento} handleClose={handleClose} />
        </Paper>
      </DialogContent>
      
    </Dialog>
  );
}

export default PopupDialog;
