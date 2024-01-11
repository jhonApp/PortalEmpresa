import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography, Collapse, Box } from '@mui/material';
import { styled } from '@mui/system';
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

const Menu = ({ item, adminOpen, handleAdminClick }) => (
  <div>
    <StyledListItem button onClick={item.subItems ? handleAdminClick : undefined} sx={{ backgroundColor: item.index === 0 ? '#BCC0CF' : '' }}>
      <ListItemIcon sx={{ minWidth: '35px' }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={<Typography variant="body1" sx={{ color: '#242C48', fontSize: '14px', fontWeight: 500 }}>{item.text}</Typography>} />
      {item.subItems && (
        <ArrowIcon>
          {adminOpen ? <CaretDown size={18} /> : <CaretLeft size={18} />}
        </ArrowIcon>
      )}
    </StyledListItem>
    {item.subItems && (
      <Collapse in={adminOpen}>
        <Box paddingLeft="44px">
          {item.subItems.map((subItem, subIndex) => (
            <ListItem key={subIndex}>
              <ListItemText primary={<Typography variant="body1" sx={{ color: '#242C48', fontSize: '14px', fontWeight: 500 }}>{subItem.text}</Typography>} />
            </ListItem>
          ))}
        </Box>
      </Collapse>
    )}
  </div>
);

export default Menu;