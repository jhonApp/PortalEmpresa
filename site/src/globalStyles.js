import { makeStyles } from '@mui/styles';

const globalStyles = makeStyles((theme) => ({
  body: {
    margin: 0,
    padding: 0,
    fontFamily: 'Inter, sans-serif'
  },
  header: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default globalStyles;