import React, { useState } from 'react';
import { List, Box } from '@mui/material';
import { styled } from '@mui/system';
import { House, CalendarPlus, Nut, File, CaretLeft, CaretDown } from 'phosphor-react';
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
  const [buttonCollapsed, setButtonCollapsed] = useState(false);

  const menuItems = [
    { index: 0, text: 'Home', icon: <House size={24} /> },
    { index: 1, text: 'Agendamento', icon: <CalendarPlus size={24} /> },
    {
      index: 2,
      text: 'Administrativo', icon: <Nut size={24} />,
      subItems: [
        { text: 'Departamento e Setores', icon: <File size={24} /> },
        { text: 'Cartões', icon: <File size={24} /> },
        { text: 'Funcionários', icon: <File size={24} /> },
        { text: 'Cargos', icon: <File size={24} /> },
        { text: 'Locais para Eventos', icon: <File size={24} /> },
        { text: 'Incluir Documentos', icon: <File size={24} /> },
        { text: 'Visualizar Documentos', icon: <File size={24} /> },
        { text: 'Usuários', icon: <File size={24} /> },
      ],
    },
    { index: 3, text: 'Documentos', icon: <File size={24} /> },
  ];

  const handleAdminClick = () => {
    setAdminOpen(!adminOpen);
  };

  const handleCollapseClick = () => {
    setButtonCollapsed(!buttonCollapsed);
  };

  return (
    <SidebarContainer>
      <Logo headerHeight={headerHeight} handleCollapseClick={handleCollapseClick} buttonCollapsed={buttonCollapsed} />
      <CustomList sx={{ background: '#FAFAFA', flex: 1, paddingTop: '20px' }}>
        {menuItems.map((item, index) => (
          <Menu key={index} item={item} adminOpen={adminOpen} handleAdminClick={handleAdminClick} />
        ))}
      </CustomList>
    </SidebarContainer>
  );
};

export default Sidebar;
