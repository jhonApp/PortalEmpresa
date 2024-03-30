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
    minWidth: '700px',
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
  scrollbarWidth: 'thin',
  scrollbarColor: '#999 #f4f4f4',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f4f4f4',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#999',
    borderRadius: '4px',
  },
  '& .css-3ekr5r': {
    maxHeight: '250px',
  },
});

const StyledStepper = styled(Stepper)`
  .MuiStepIcon-root.Mui-active {
    color: #BCC0CF;
  }

  .MuiStepIcon-root.Mui-completed {
    color: #BCC0CF;
  }
`;

export { StyledDialog, StyledStepper, StyledBox };