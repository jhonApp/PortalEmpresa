import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Business } from '@mui/icons-material'; // Importa o ícone de empresa do Material-UI

const Sidebar = () => {
  const menuItems = Array.from({ length: 15 }, (_, index) => `Item ${index + 1}`);

  return (
    <Drawer variant="permanent">
      <List sx={{ background: '#242C48', borderRadius: '0px 30px 30px 0px' }}>
        {/* Ícone da empresa no meio */}
        <ListItem sx={{ justifyContent: 'center', py: 4 }}>
          <ListItemIcon>
            <Business sx={{ color: '#FFFFFF', fontSize: 40 }} /> {/* Estilo do ícone da empresa */}
          </ListItemIcon>
        </ListItem>

        {/* Itens da lista */}
        {menuItems.map((text, index) => (
          <ListItem button key={text} sx={{ background: '#FFFFFF', opacity: 0.03 }}>
            <ListItemIcon>
              {/* Ícone para cada item da lista (opcional) */}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1" sx={{ color: '#FFFFFF' }}>{text}</Typography>} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
