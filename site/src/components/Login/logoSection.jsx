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
  marginTop: '120px'
});

const StyledImage = styled('img')({
  position:'fixed',
  marginTop: '125px',
  height: '750px',
  width: '750px',
});

const LogoSection = () => (
  <StyledImageContainer>
    <StyledImageLogo src={portalIconSVG} alt="Logo" />
    <StyledImage src={portalLogin} alt="Logo" />
  </StyledImageContainer>
);

export default LogoSection;