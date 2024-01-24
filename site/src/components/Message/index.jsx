import React from 'react';
import { Snackbar } from '@mui/material';

const Message = ({ type, message, onClose }) => {
  const getColor = () => {
    switch (type) {
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
      default:
        return 'black';
    }
  };

  const style = {
    backgroundColor: getColor(),
    color: '#fff', // Define a cor do texto para branco
    boxShadow: 'none', // Remove a sombra padrão
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!message}
      autoHideDuration={60000} // 1 minute in milliseconds
      onClose={onClose}
      message={message}
      style={style} // Use style prop instead of sx
    />
  );
};

export default Message;
