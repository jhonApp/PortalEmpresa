import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography, Collapse, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { CaretLeft, CaretDown } from 'phosphor-react';

const StyledListItem = styled(ListItem)({
  marginBottom: '5px',
  height: '43px',
  width: '90%',
  margin: '10px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
});

const ArrowIcon = styled('span')({
  marginLeft: 'auto',
});

const generateLink = (link) => `/${link.toLowerCase()}`;

const Menu = ({ route, adminOpen, handleAdminClick }) => (
  <div>
    {route.subItems ? (
      <StyledListItem button onClick={handleAdminClick} sx={{ backgroundColor: route.index === 0 ? '#BCC0CF' : '' }}>
        <ListItemIcon sx={{ minWidth: '35px' }}>
          {route.icon}
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }}>{route.text}</Typography>} />
        <ArrowIcon>
          {adminOpen ? <CaretDown size={18} /> : <CaretLeft size={18} />}
        </ArrowIcon>
      </StyledListItem>
    ) : (
      <Link to={generateLink(route.link)} style={{ textDecoration: 'none', color: '#242C48' }}>
        <StyledListItem button sx={{ backgroundColor: route.index === 0 ? '#BCC0CF' : '' }}>
          <ListItemIcon sx={{ minWidth: '35px' }}>
            {route.icon}
          </ListItemIcon>
          <ListItemText primary={<Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 500 }}>{route.text}</Typography>} />
        </StyledListItem>
      </Link>
    )}
    {route.subItems && (
      <Collapse in={adminOpen}>
        <Box paddingLeft="44px">
          {route.subItems.map((subItem, subIndex) => (
            <Link to={generateLink(subItem.link)} key={subIndex} style={{ textDecoration: 'none', color: '#242C48' }}>
              <ListItem>
                <ListItemText primary={<Typography variant="body1" sx={{ color: '#242C48', fontSize: '14px', fontWeight: 500 }}>{subItem.text}</Typography>} />
              </ListItem>
            </Link>
          ))}
        </Box>
      </Collapse>
    )}
  </div>
);

export default Menu;