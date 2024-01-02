import React from 'react';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import houseSolidSVG from '../../assets/images/icones/house-solid.svg';
import calendarIconSVG from '../../assets/images/icones/calendar-days-solid.svg';
import gearIconSVG from '../../assets/images/icones/gear-solid.svg';
import fileIconSVG from '../../assets/images/icones/file-solid.svg';
import portalIconSVG from '../../assets/images/icones/Portal Empresa II.svg';

const CustomList = styled(List)({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
    backgroundColor: '#242C48',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#a0a0a0',
    borderRadius: '3px',
    maxHeight: '8px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#FFFFFF',
  },
});



const Sidebar = () => {
  const menuItems = [
    { text: 'Home', icon: <img src={houseSolidSVG} alt="Home Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Agendamento', icon: <img src={calendarIconSVG} alt="Calendar Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Administrativo', icon: <img src={gearIconSVG} alt="Gear Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Departamento e Setores', icon: <img src={fileIconSVG} alt="Departamento Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Cartões', icon: <img src={fileIconSVG} alt="Departamento Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Funcionários', icon: <img src={fileIconSVG} alt="Departamento Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Cargos', icon: <img src={fileIconSVG} alt="Departamento Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Locais para Eventos', icon: <img src={fileIconSVG} alt="Departamento Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Documentos', icon: <img src={fileIconSVG} alt="Documento Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Incluir Documentos', icon: <img src={fileIconSVG} alt="Departamento Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Visualizar Documentos', icon: <img src={fileIconSVG} alt="Departamento Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
    { text: 'Usuários', icon: <img src={fileIconSVG} alt="Usuário Icon" style={{ filter: 'invert(1)', width: '22px', height: '17px' }} /> },
  ];

  return (
    <Drawer variant="permanent" sx={{ backgroundColor: '#242C48'}} PaperProps={{ sx: { backgroundColor: 'transparent' } }}>
      <CustomList sx={{ background: '#242C48' , height: '100%', width: '50vh', padding: '0px 0px 0px 60px'}}>
          
          {/* Botão para alternar a visibilidade do menu */}
          {/* <ListItem sx={{ justifyContent: 'center', py: 2 }}>
            <ListItemIcon>
              <IconButton onClick={toggleMenu} size="large">
                <MenuIcon sx={{ color: '#FFFFFF' }} />
              </IconButton>
            </ListItemIcon>
          </ListItem> */}
          
          {/* Ícone da empresa no meio */}
          <ListItem sx={{ justifyContent: 'center', py: 4 }}>
            <ListItemIcon>
              <img src={portalIconSVG} alt="Portal Icon" style={{ width: '162px', height: '62px' }} />            
            </ListItemIcon>
          </ListItem>

          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                marginBottom: '5px',
                height: '43px',
                width: '90%'
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={<Typography variant="body1" sx={{ color: '#FFFFFF' }}>{item.text}</Typography>} />
            </ListItem>
          ))}
      </CustomList>
    </Drawer>
  );
};

export default Sidebar;
