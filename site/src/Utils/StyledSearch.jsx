import { styled, alpha } from '@mui/system';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')({
    position: 'relative',
    borderRadius: 30, // Você pode definir o borderRadius diretamente
    backgroundColor: '#EBEAEF',
    marginRight: 16,
    marginTop: 5,
    border: '1px solid #CBCDD9',
    width: '100%',
    '@media (min-width: 600px)': {
      marginLeft: 0,
      width: '250px',
      height: '35px'
    },
});
  
const SearchIconWrapper = styled('div')({
    padding: '0 8px', // Você pode definir o padding diretamente
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
  
const StyledInputBase = styled(InputBase)({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '5px',
    paddingLeft: 'calc(1em + 32px)',
    transition: 'width 300ms',
    width: '100%',
    '@media (min-width: 960px)': {
      width: '200px',
    },
  },
});

export { Search, SearchIconWrapper, StyledInputBase };