import React from 'react';
import Typography from '@mui/material/Typography';
import { DialogContent, DialogActions, Button, Paper, useTheme } from '@mui/material';
import { XCircle } from 'phosphor-react';
import { StyledDialog } from '../Utils/StyledDialog';
import { StyledButtonPrimary } from '../Utils/StyledButton';

function PopupDialog({ open, handleClose, title, description, renderContent, visible }) {
  const theme = useTheme();

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogActions sx={{ position: 'absolute', marginRight: 0, top: 16, right: 0 }}>
        <Button onClick={handleClose}><XCircle size={28} color="#FF0B0B" /></Button>
      </DialogActions>
      <DialogContent style={{ padding: '0px', borderRadius: '15px'}}>
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
      {visible && (
        <DialogActions sx={{ backgroundColor: '#FAFAFA', m: '20px' }}>
          <StyledButtonPrimary autoFocus onClick={handleClose}> Fechar </StyledButtonPrimary>
        </DialogActions>
      )}
    </StyledDialog>
  );
}

export default PopupDialog;