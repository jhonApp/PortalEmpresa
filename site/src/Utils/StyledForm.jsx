import { styled } from '@mui/system';
import { Paper, TextField, Select, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const StyledTextField = styled(TextField)({
  borderRadius: '12px',
  background: '#EBEAEF',
  marginBottom: 5,
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    fontSize: '12px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
    top: '-5px'
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px',
  },
});

const StyledSelectField = styled(Select)({
    borderRadius: '12px',
    background: '#EBEAEF',
    marginBottom: 5,
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      fontSize: '12px',
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.9rem',
      top: '-5px'
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px',
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
        fontSize: '14px',
    }
});

const StyledPaper = styled(Paper)({
    textAlign: 'center',
    boxShadow: 'none',
    marginTop: '20px',
    minWidth: 500,
});

const FormContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
});

const Column = styled('div')({
    width: '48%',
});

const FormRow = styled('div')({
    width: '100%',
    marginBottom: (theme) => theme.spacing(2),
});

const FormControlSelect = styled(FormControl)({
    width: '100%',
    marginBottom: (theme) => theme.spacing(2),
});

const StyledDatePicker = styled(DatePicker)({
    borderRadius: '12px',
    background: '#EBEAEF',
    marginBottom: 5,
    marginTop: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontSize: '12px',
    },
    '& .MuiInputLabel-root': {
        fontSize: '0.9rem',
        top: '-5px'
    },
    '& .MuiOutlinedInput-input': {
        width: '165px',
        padding: '12px',
    },
});

const StyledTimePicker = styled(TimePicker)({
    borderRadius: '12px',
    background: '#EBEAEF',
    marginBottom: 5,
    marginTop: '16px',
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontSize: '12px',
    },
    '& .MuiInputLabel-root': {
        fontSize: '0.9rem',
        top: '-5px'
    },
    '& .MuiOutlinedInput-input': {
        width: '165px',
        padding: '12px',
    },
});

const FormColumn = styled('div')({
    width: '100%',
});
  
const FormSection = styled('div')({
    marginBottom: (theme) => theme.spacing(2),
});

export { FormControlSelect, StyledTextField, StyledSelectField, StyledPaper, FormContainer, Column, StyledDatePicker, FormColumn, FormSection, FormRow, StyledTimePicker };
