import { styled } from '@mui/system';
import { Dialog, Stepper, Box, Card } from '@mui/material';

const StyledCard = styled(Card)({
  backgroundColor: '#FAFAFA',
  display: 'flex',
  width: '48%',
  height: 45,
  marginTop: 2,
  borderRadius: 10
});

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: '15px !important',
    width: '710px !important',
    backgroundColor: '#FAFAFA'
  }
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  overflowY: 'scroll',
  height: '250px',
  marginTop: '10px',
  scrollbarWidth: 'thin', // Para navegadores que suportam o estilo da barra de rolagem
  scrollbarColor: '#999 #f4f4f4', // Para navegadores que suportam a cor da barra de rolagem
  '&::-webkit-scrollbar': {
    width: '8px', // Largura da barra de rolagem em navegadores WebKit
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f4f4f4', // Cor de fundo da área de rolagem em navegadores WebKit
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#999', // Cor da barra de rolagem em navegadores WebKit
    borderRadius: '4px', // Borda da barra de rolagem em navegadores WebKit
  },
  '& .css-3ekr5r': {
    maxHeight: '250px',
  },
});

const StyledStepper = styled(Stepper)`
  .MuiStepIcon-root.Mui-active {
    color: #BCC0CF;
  }
`;

export { StyledDialog, StyledStepper, StyledBox };