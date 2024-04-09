import React, { useState, useMemo } from 'react';
import { BrowserRouter as Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { CaretLeft, CaretDown, SignOut, House, CalendarPlus, Nut, File, MagnifyingGlass, Factory, Briefcase, CreditCard, IdentificationCard, MapPin, ChatCenteredText  } from 'phosphor-react';
import portalIconSVG from '../../assets/images/icones/Portal Empresa II.svg';
import { getData, clearDataStorage } from '../../../service/storageService';
const drawerWidth = 240;

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
});

const FlexDiv = styled('div')({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
}); 

const ArrowIcon = styled('span')({
  marginLeft: 'auto',
});

const routes = [
  { index: 0, link: 'system/', text: 'Home', icon: <House size={24} /> },
  { index: 1, link: 'system/agendamento', text: 'Agendamento', icon: <CalendarPlus size={24} /> },
  {
    index: 2,
    link: '',
    text: 'Administrativo',
    icon: <Nut size={24} />,
    subItems: [
      { index: 3, link: 'system/departamentoSetores', text: 'Dep e Setores', icon: <Factory size={24}/>, tipo: 'sub' },
      { index: 4, link: 'system/cargos', text: 'Cargos', icon: <Briefcase size={24} />, tipo: 'sub' },
      { index: 5, link: 'system/cartoes', text: 'Cartões', icon: <CreditCard size={24} />, tipo: 'sub' },
      { index: 6, link: 'system/funcionarios', text: 'Funcionários', icon: <IdentificationCard size={24} />, tipo: 'sub' },
      { index: 7, link: 'system/reservaEspacos', text: 'Reserva de Espaço', icon: <MapPin size={24} />, tipo: 'sub' }
    ],
  },
  { index: 8, link: 'system/documentos', text: 'Documentos', icon: <File size={24} /> },
  { index: 9, link: 'system/mural', text: 'Mural', icon: <ChatCenteredText size={24} /> },
  {
    index: 10,
    link: '',
    text: 'Pesquisas',
    icon: <MagnifyingGlass size={24} />,
    subItems: [
      { link: 'system/acessos', text: 'Acessos', icon: <File size={24} /> },
    ],
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [title, setTitle] = useState('Dashboard');
  const memoizedTitle = useMemo(() => title, [title]);
  const navigate = useNavigate();
  console.log("Index")

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const hadleDrawerTitle = (newTitle) => {
    if (title !== newTitle) {
      setTitle(newTitle);
    }
  }
  

  const handleAdminClick = (item) => {
    if (adminOpen) {
      setAdminOpen(!adminOpen);
    } else {
      setAdminOpen(true);
    }
    setSelectedIndex(item.index);
    hadleDrawerTitle(item.text);
  };
  
  const handleSubItemClick = (item) => {
    setSelectedIndex(item.index);
    hadleDrawerTitle(item.text);
  };

  const handleLogout = () => {
    clearDataStorage();
    navigate('/');
  };

  const generateLink = (link) => `/${link.toLowerCase()}`;

  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor: '#242C48', zIndex:"520"}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {memoizedTitle}
          </Typography>
          <FlexDiv>
            <Typography variant="h6" sx={{ fontFamily: 'Inter, sans-serif', color: '#fff', fontSize: '16px', textAlign: 'center', marginRight: '24px' }}>
              Olá, {getData().userName}
            </Typography>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <SignOut size={26} color='#fff' sx={{ marginTop: '-2px' }} />
            </button>
          </FlexDiv>

        </Toolbar>
      </AppBar>
      <Drawer sx={{backgroundColor: '#FAFAFA', zIndex:"320"}} variant="permanent" open={open}>
        {/* Logo */}
        <DrawerHeader sx={{backgroundColor: '#242C48'}}>
          <ListItemIcon>
              <img src={portalIconSVG} alt="Portal Icon" style={{ marginRight: '10px', width: '12vh' }} />
          </ListItemIcon>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color: '#fff'}} /> : <ChevronLeftIcon sx={{color: '#fff'}} />}
          </IconButton>
          
        </DrawerHeader>
        <Divider />
        {/* Menu */}
        <List sx={{backgroundColor: '#FAFAFA'}}>
          {routes.map((route) => (
            <React.Fragment key={route.index}>
              <ListItem disablePadding>
                {route.subItems ? (
                  <ListItemButton
                    onClick={() => handleAdminClick(route)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      m: 1,
                      borderRadius: '20px',
                      backgroundColor: selectedIndex === route.index && !adminOpen ? '#BCC0CF' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.text} sx={{ minWidth: 0, display: open ? 'block' : 'none' }} />
                    <ArrowIcon sx={{ minWidth: 0, opacity: open ? 1 : 0 }}>
                      {(selectedIndex === route.index || route.subItems.some(subItem => selectedIndex === subItem.index)) && adminOpen ? <CaretDown size={18} /> : <CaretLeft size={18} />}
                    </ArrowIcon>
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    onClick={() => handleAdminClick(route)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                      m: 1,
                      borderRadius: '20px',
                      backgroundColor: selectedIndex === route.index ? '#BCC0CF' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      }
                    }}
                    component={Link}
                    to={generateLink(route.link)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.text} sx={{ minWidth: 0, display: open ? 'block' : 'none' }} />
                  </ListItemButton>
                )}
              </ListItem>
              {route.subItems && (selectedIndex === route.index || route.subItems.some(subItem => selectedIndex === subItem.index)) && (
                <Collapse in={adminOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {route.subItems.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        button
                        sx={{width: '90%', m: 1, borderRadius: '20px', paddingLeft: open ? 3 : 2, backgroundColor: selectedIndex === subItem.index ? '#BCC0CF' : 'transparent', '&:hover': { backgroundColor: '#f0f0f0' } }}
                        component={Link}
                        to={generateLink(subItem.link)}
                        onClick={() => handleSubItemClick(subItem)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body1" sx={{ display: open ? 'block' : 'none', color: '#242C48', fontSize: '14px', fontWeight: 500 }}>{subItem.text}</Typography>} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Conteudo */}
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}