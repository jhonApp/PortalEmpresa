import { styled } from '@mui/system';
import { Button } from '@mui/material';

const StyledButtonPrimaryFiltro = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  fontSize: '14px',
  height: '50px',
  borderRadius: '50px',
  width: '121px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

const StyledButtonSecundaryFiltro = styled(Button)({
  backgroundColor: '#EBEAEF',
  color: 'black',
  fontSize: '14px',
  height: '50px',
  borderRadius: '50px',
  width: '121px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
  },
});

const StyledButtonPrimary = styled(Button)({
  backgroundColor: '#171E36',
  color: 'white',
  padding: '10px 20px',
  fontSize: '14px',
  marginLeft: 15,
  height: '50px',
  borderRadius: '50px',
  width: '180px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

const StyledButtonSecundary = styled(Button)({
  backgroundColor: '#EBEAEF',
  border: '1px solid #000',
  color: 'black',
  padding: '10px 20px',
  fontSize: '14px',
  height: '50px',
  borderRadius: '50px',
  width: '180px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
  },
});

const StyledButtonDelete = styled(Button)({
  backgroundColor: '#FF0B0B',
  color: 'white',
  padding: '10px',
  fontSize: '14px',
  marginLeft: 15,
  height: '50px',
  borderRadius: '50px',
  width: '180px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export { StyledButtonPrimary, StyledButtonSecundary, StyledButtonDelete, StyledButtonPrimaryFiltro, StyledButtonSecundaryFiltro };