import React from 'react';
import { ListItem, ListItemIcon, Button } from '@mui/material';
import { styled } from '@mui/system';
import portalIconSVG from '../../assets/images/icones/Portal Empresa II.svg';
import { CaretLeft, CaretRight } from 'phosphor-react';

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
});

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  right: '0px',
  transition: 'width 0.3s ease',
  '&.collapsed': {
    width: '20px',
  },
}));

const Logo = ({ headerHeight, handleCollapseClick, buttonCollapsed }) => (
  <ListItem sx={{ height: headerHeight, paddingTop: '0px', borderRight: '1px solid rgba(255, 255, 255, 0.6)' }}>
    <LogoContainer>
      <ListItemIcon>
        <img src={portalIconSVG} alt="Portal Icon" style={{ width: '13vh' }} />
      </ListItemIcon>
      <CustomButton
        className={buttonCollapsed ? 'collapsed' : ''}
        onClick={handleCollapseClick}
      >
        {buttonCollapsed ? <CaretRight size={20} /> : <CaretLeft size={20} />}
      </CustomButton>
    </LogoContainer>
  </ListItem>
);

export default Logo;