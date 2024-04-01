import { styled } from '@mui/system';
import { Paper, TextField, Autocomplete, FormControl, FormControlLabel, InputBase } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const StyledTextField = styled(TextField)({
  borderRadius: '4px',
  background: '#EBEAEF',
  width: '100%',
  marginBottom: 5,
  marginTop: 0,
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    fontSize: '15px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.1rem',
    top: '-16px',
    background: 'transparent'
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px',
  },
});

const StyledSelectField = styled(Autocomplete)({
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
      top: '-6px'
    },
    '& .MuiOutlinedInput-input': {
      padding: '17px',
    },
    '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
        fontSize: '12px',
    }
});

const StyledPaper = styled(Paper)({
    textAlign: 'center',
    boxShadow: 'none',
    marginTop: '20px',
    maxWidth: 640,
    height: 280,
});

const StyledPaperFiltro = styled(Paper)({
    textAlign: 'center',
    boxShadow: 'none',
    marginTop: '10px',
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
    marginBottom: '8px',
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

const BootstrapInput = styled(InputBase)({
    'label + &': {
      marginTop: '-5px',
      
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#EBEAEF',
      border: '1px solid',
      borderColor: '#C4C7D4',
      left: '0px',
      fontSize: '16px',
      width: '280px',
      padding: '10px 12px',
      transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s', // Defina as transições conforme necessário
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: '#007bff 0 0 0 0.06rem', // Cor da sombra quando em foco
        borderColor: '#C4C7D4', // Cor da borda quando em foco
      },
    },
  });

export { BootstrapInput, StyledFormControlLabel, FormControlSelect, StyledPaperFiltro, StyledTextField, StyledSelectField, StyledPaper, FormContainer, Column, StyledDatePicker, FormColumn, FormSection, FormRow, StyledTimePicker };
