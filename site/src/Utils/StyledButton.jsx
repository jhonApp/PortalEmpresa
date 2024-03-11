import { styled } from '@mui/system';
import { Button } from '@mui/material';

const StyledButtonPrimary = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  padding: '10px',
  fontSize: '12px',
  marginLeft: 15,
  height: '38px',
  borderRadius: '20px',
  width: '130px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

const StyledButtonDelete = styled(Button)({
  backgroundColor: '#FF0B0B',
  color: 'white',
  padding: '10px',
  fontSize: '12px',
  marginLeft: 15,
  height: '38px',
  borderRadius: '20px',
  width: '130px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export { StyledButtonPrimary, StyledButtonDelete };