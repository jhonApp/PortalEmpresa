import React, { useState } from 'react';
import { List, Box } from '@mui/material';
import { styled } from '@mui/system';
import { House, CalendarPlus, Nut, File, MagnifyingGlass, Factory, Briefcase, CreditCard, IdentificationCard, MapPin, ChatCenteredText  } from 'phosphor-react';
import Menu from './Menu';
import Logo from './Logo';

const SidebarContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#242C48',
  height: '100%',
});

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

const Sidebar = ({ headerHeight }) => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const routes = [
    { index: 0, link: 'system/', text: 'Home', icon: <House size={24} /> },
    { index: 1, link: 'system/agendamento', text: 'Agendamento', icon: <CalendarPlus size={24} /> },
    {
      link: '',
      text: 'Administrativo',
      icon: <Nut size={24} />,
      subItems: [
        { index: 2, link: 'system/departamentoSetores', text: 'Dep e Setores', icon: <Factory size={24} /> },
        { index: 3, link: 'system/cargos', text: 'Cargos', icon: <Briefcase size={24} /> },
        { index: 4, link: 'system/cartoes', text: 'Cartões', icon: <CreditCard size={24} /> },
        { index: 5, link: 'system/funcionarios', text: 'Funcionários', icon: <IdentificationCard size={24} /> },
        { index: 6, link: 'system/locaisEventos', text: 'Reserva de Espaço', icon: <MapPin size={24} /> }
      ],
    },
    { index: 7, link: 'system/documentos', text: 'Documentos', icon: <File size={24} /> },
    { index: 8, link: 'system/mural', text: 'Mural', icon: <ChatCenteredText size={24} /> },
    {
      index: 9,
      link: '',
      text: 'Pesquisas',
      icon: <MagnifyingGlass size={24} />,
      subItems: [
        { link: 'system/pesquisas', text: 'Acessos', icon: <File size={24} /> },
      ],
    },
  ];

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SidebarContainer>
      <Logo headerHeight={headerHeight} />
      <CustomList sx={{ background: '#FAFAFA', flex: 1, paddingTop: '20px' }}>
        {routes.map((route, index) => (
          <Menu 
            key={index} 
            route={route} 
            adminOpen={adminOpen} 
            handleAdminClick={handleAdminClick} 
            selectedIndex={selectedIndex} 
            handleMenuItemClick={handleMenuItemClick} 
          />
        ))}
      </CustomList>
    </SidebarContainer>
  );
};

export default Sidebar;