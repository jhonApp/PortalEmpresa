import React from 'react';
import portalIconSVG from '../../assets/images/icones/Portal Empresa II.svg';
import portalLogin from '../../assets/images/portal_login.svg';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';


const StyledImageContainer = styled('div')({
    background: '#242c48',
    borderRadius: '50px 50px 1000px 50px',
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
    width: '23%',
    marginBottom: '5%'
  });

  const StyledImage = styled('img')({
    width: '90%',
    marginTop: '8%'
  });

const LogoSection = () => (
    <StyledImageContainer>
      <StyledLogoText>
        <StyledImageLogo src={portalIconSVG} alt="Logo" />
        <Typography variant="h4">
          Portal Empresa
        </Typography>
        <Typography variant="body1">
          Controle de acesso e mais segurança para a sua empresa.
        </Typography>
      </StyledLogoText>
      <StyledImage src={portalLogin} alt="Logo" />
    </StyledImageContainer>
  );
  
  export default LogoSection;