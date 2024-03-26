import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import PopupDialog from '../Agendamento/popupAgendamento';
import AlertDialog from '../../Utils/Modal/Delete';


const ITEM_HEIGHT = 48;

export default function LongMenu({ tipo, data }) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [action, setAction] = useState('');
  const [description, setDescription] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => { 
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    switch (action) {
      case 'view':
        setTitle('Visualizar Agendamento');
        setDescription('');
        setAction(action)
        break;
      case 'edit':
        setTitle('Alterar Agendamento');
        setDescription('');
        setAction(action)
        break;
      case 'delete':
        setDialogOpen(false);
        setDialogDeleteOpen(true)
        break;
      default:
        setTitle('');
        setDescription('');
    }
    setDialogOpen(true);
    handleClose();
  };

  const options = [
    { 
      label: 'Visualizar', 
      icon: <Visibility />, 
      action: 'view'
    },
    { 
      label: 'Alterar', 
      icon: <Edit />, 
      action: 'edit'
    },
    { 
      label: 'Excluir', 
      icon: <Delete />, 
      action: 'delete'
    }
  ];

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
          <MenuItem key={option.label} onClick={() => handleAction(option.action)}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      <PopupDialog 
        open={dialogOpen} 
        handleClose={() => setDialogOpen(false)} 
        title={title} 
        description={description} 
        type={tipo}
        data={data}
        action={action}
      />
      <AlertDialog 
        dialogOpen={dialogDeleteOpen}
        handleClose={() => setDialogOpen(false)} 
        handleDelete={() => {
          onDelete(data.id);
          setDialogOpen(false);
        }}
      />
    </div>
  );
}