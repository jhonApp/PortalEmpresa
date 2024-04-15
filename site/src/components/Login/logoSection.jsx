import React from 'react';
import portalIconSVG from '../../assets/images/icones/Portal Empresa II.svg';
import portalLogin from '../../assets/images/Fortato 1.svg';
import { styled } from '@mui/system';

const StyledImageContainer = styled('div')({
    background: '#242c48',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });

const StyledLogoText = styled('div')({
  color:'#fff',
  marginRight: '18%',
  marginTop:'5%'
});

const StyledImageLogo = styled('img')({
  width: '200px',
  height: '100px',
  marginTop: '120px',
  '@media (max-width: 1000px)': {
    marginTop: '30px',
    width: '150px',
    height: '80px',
  }
});

const StyledImage = styled('img')({
  position:'fixed',
  marginTop: '13.5%',
  height: '70%',
  width: '70%',
  '@media (max-width: 1000px)': {
      display: 'none'
  }
});

const LogoSection = () => (
  <StyledImageContainer>
    <StyledImageLogo src={portalIconSVG} alt="Logo" />
    <StyledImage src={portalLogin} alt="Logo" />
  </StyledImageContainer>
);

export default LogoSection;