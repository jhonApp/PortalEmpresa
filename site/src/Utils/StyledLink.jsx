import { styled } from '@mui/system';
import { Link } from '@mui/material';

const StyledLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30px',
    backgroundColor: '#171E36',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    textTransform: 'none',
    width: theme.spacing(17),
    height: theme.spacing(5)
}));

export default StyledLink;