import { styled } from '@mui/system';
import { Dialog, Stepper } from '@mui/material';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 15px !important;
    width: 640px !important;
  }
`;

const StyledStepper = styled(Stepper)`
  .MuiStepIcon-root.Mui-active {
    color: #BCC0CF;
  }
`;

export { StyledDialog, StyledStepper };