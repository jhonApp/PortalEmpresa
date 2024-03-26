import { styled } from '@mui/system';
import { Paper, TextField, Select, FormControl, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const StyledTextField = styled(TextField)({
  borderRadius: '4px',
  background: '#EBEAEF',
  width: '100%',
  marginBottom: 5,
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    fontSize: '15px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.1rem',
    top: '-2px'
  },
  '& .MuiOutlinedInput-input': {
    padding: '17px',
  },
});

const StyledSelectField = styled(Select)({
    borderRadius: '4px',
    background: '#EBEAEF',
    width: '100%',
    marginBottom: 5,
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      fontSize: '15px',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.9rem',
      top: '-2px'
    },
    '& .MuiOutlinedInput-input': {
      padding: '17px',
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
        fontSize: '14px',
    }
});

const StyledPaper = styled(Paper)({
    textAlign: 'center',
    boxShadow: 'none',
    marginTop: '20px',
    width: 620,
    height: 290,
});

const StyledPaperFiltro = styled(Paper)({
    textAlign: 'center',
    boxShadow: 'none',
    marginTop: '20px',
    width: '300px',
});

const FormContainer = styled('div')({
    display: 'flex',
    width: '100%',
    gap: '20px',
});

const Column = styled('div')({ width: '100%' });

const FormRow = styled('div')({
    width: '100%',
    marginBottom: (theme) => theme.spacing(2),
});

const StyledFormControlLabel = styled(FormControlLabel)({
    marginTop:'-15px', fontWeight: 600
});

const FormControlSelect = styled(FormControl)({
    width: '100%',
    marginBottom: (theme) => theme.spacing(2),
});

const StyledDatePicker = styled(DatePicker)({
    borderRadius: '4px',
    background: '#EBEAEF',
    marginBottom: 5,
    width: '100%',
    marginTop: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '4px',
        fontSize: '15px',
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.1rem',
        top: '-2px'
    },
    '& .MuiOutlinedInput-input': {
        padding: '14px',
        width: '100%',
    },
});

const StyledTimePicker = styled(TimePicker)({
    borderRadius: '4px',
    background: '#EBEAEF',
    marginBottom: 5,
    marginTop: '16px',
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: '4px',
        fontSize: '15px',
    },
    '& .MuiInputLabel-root': {
        fontSize: '1.1rem',
        top: '-2px'
    },
    '& .MuiOutlinedInput-input': {
        width: '100%',
        padding: '14px',
    },
});

const FormColumn = styled('div')({
    width: '100%',
});
  
const FormSection = styled('div')({
    marginBottom: (theme) => theme.spacing(2),
});

export { StyledFormControlLabel, FormControlSelect, StyledPaperFiltro, StyledTextField, StyledSelectField, StyledPaper, FormContainer, Column, StyledDatePicker, FormColumn, FormSection, FormRow, StyledTimePicker };
