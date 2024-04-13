import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { ListItemIcon } from '@mui/material';
import AlertDialog from '../../Utils/Modal/Delete';
import Progress from '../../Utils/LoadingProgress';

const ITEM_HEIGHT = 48;

function LongMenu({ options, data, onDelete, PopupDialogComponent, updateTable }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({ title: '', action: '' });
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action, title) => {
    let dialogTitle = '';
    switch (action) {
      case 'view':
        dialogTitle = 'Visualizar Agendamento';
        setDialogOpen(true);
        break;
      case 'edit':
        dialogTitle = 'Alterar Agendamento';
        setDialogOpen(true);
        break;
      default:
        dialogTitle = title;
        setDialogDeleteOpen(true);
        setDialogOpen(false);
    }
  
    // Configuração do diálogo
    const dialogConfig = {
      title: dialogTitle,
      action: action,
    };

    setDialogConfig(dialogConfig);
    handleClose();
  };

  const handleDelete = async (codigo) => {
    try {
      setLoading(true);

      if (!codigo){
        setLoading(false);
        showErrorToast("Falha na exclusão do agendamento!");
        return;
      }
      
      await onDelete(codigo, data.tipo);
      showSuccessToast("Excluído com sucesso!");
      updateTable();
      setLoading(false);
    } catch (error) {

      setLoading(false);
      showErrorToast(error.message);
    }
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={anchorEl ? 'long-menu' : undefined}
        aria-expanded={anchorEl ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={() => handleAction(option.action, option.label)}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      {dialogConfig.action && (
        <PopupDialogComponent
          open={dialogOpen} 
          handleClose={() => setDialogOpen(false)}
          type={data.tipo}
          data={data}
          action={dialogConfig.action}
          title={dialogConfig.title} 
          description={dialogConfig.description}
          atualizaLista={updateTable}
        />
      )}
      <AlertDialog 
        dialogOpen={dialogDeleteOpen}
        handleClose={() => setDialogDeleteOpen(false)}
        handleDelete={() => { 
          handleDelete(data.codigoAgendamento); 
        }}
      />
      <Progress isVisible={loading} />
    </div>
  );
}

export default LongMenu;
