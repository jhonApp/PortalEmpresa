import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';

const ITEM_HEIGHT = 48;

export default function LongMenu({ tipo }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => { 
    setAnchorEl(null);
  };

  const options = [
    { 
      label: 'Visualizar', 
      icon: <Visibility />, 
      action: () => {
        console.log("Visualizar")
      }
    },
    { 
      label: 'Alterar', 
      icon: <Edit />, 
      action: () => {
        console.log("Alterar")
      }
    },
    { 
      label: 'Excluir', 
      icon: <Delete />, 
      action: () => {
        console.log("Excluir")
      }
    }
  ];

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
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
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={option.action}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}