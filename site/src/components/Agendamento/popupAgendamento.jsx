import React from 'react';
import Typography from '@mui/material/Typography';
import AgendamentoVisitante from './AgendamentoVisitante';
import AgendamentoVisitanteEspecial from './AgendamentoVisitanteEspecial';
import AgendamentoPrestador from './AgendamentoPrestador';
import AgendamentoMassa from './AgendamentoMassa';
import { DialogContent, DialogActions, Button, Paper, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';
import { StyledDialog } from '../../Utils/StyledDialog';


function PopupDialog({ open, handleClose, atualizarAgendamento, title, description, type, data, action }) {
  const theme = useTheme();

  const renderContent = () => {
    switch (type) {
      case 'Visitante Simples':
        return <AgendamentoVisitante onClose={handleClose} updateTable={atualizarAgendamento} data={data} action={action}/>;
      case 'Visitante Especial':
        return <AgendamentoVisitanteEspecial onClose={handleClose} updateTable={atualizarAgendamento} data={data} action={action}/>;
      case 'Prestador de Serviço':
        return <AgendamentoPrestador onClose={handleClose} updateTable={atualizarAgendamento} data={data} action={action}/>;
      case 'Múltiplos Visitantes':
        return <AgendamentoMassa onClose={handleClose} updateTable={atualizarAgendamento} data={data} action={action}/>;
      default:
        return null;
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogActions sx={{position: 'absolute', marginRight: 0, top: 16, right: 0}}>
        <Button onClick={handleClose}><XCircle size={28} color="#FF0B0B"/></Button>
      </DialogActions>
      <DialogContent style={{ padding: '0px', width: '600px', borderRadius: '15px' }}>
        <Paper
          style={{
            backgroundColor: '#FAFAFA',
            color: theme.palette.text.primary,
            borderRadius: '13px',
            padding: '30px',
            boxShadow: 'none',
            overflowY: 'auto',
            height: 'auto'
          }}
        >
          <Typography variant="h6" component="h1" style={{ fontWeight: 'bold', fontSize: 24, marginBottom: theme.spacing(0) }}>{title}</Typography>
          <Typography variant="h3" style={{ marginBottom: theme.spacing(2), fontSize: 14 }}>{description}</Typography>
          {renderContent()}
        </Paper>
      </DialogContent>
    </StyledDialog>
  );
}

export default PopupDialog;