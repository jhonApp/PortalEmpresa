import React from 'react';
import { Box, Paper, Button, useTheme } from '@mui/material';
import { UserMinus, UsersThree, IdentificationCard, UsersFour } from 'phosphor-react';
import ListMagnifyingGlass from '../../assets/images/icones/listmagnifyinglass.svg';
import Typography from '@mui/material/Typography';
import Table from '../Table'

function Agendados() {
  const theme = useTheme();

  const tableHeight = 440; // Set the initial height of the Table (adjust as needed)
  const extraSpace = 0; // Extra space below the Table

  const totalHeight = tableHeight + extraSpace;

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'lightgray',
    padding: theme.spacing(1),
    height: '20px',
    marginRight: theme.spacing(1),
  };

  const buttonStyle = {
    padding: '17px',
    borderRadius: '10px',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'none',
    width: theme.spacing(29)
  };

  const buttonStyleFiltro = {
    borderRadius: '50px',
    backgroundColor: 'transparent',
    border: '0.5px solid #000',
    fontWeight: 'bold',
    fontSize: '13px',
    color: 'black',
    textTransform: 'none',
    width: theme.spacing(15)
  };

  return (
    <Box
      gap={1}
      marginX={1}
      margin={2}
      padding={2}
      paddingX={2}
      paddingBottom={3}
      display="flex"
      backgroundColor="#FAFAFA"
      flexDirection="column"
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>Agendados</Typography>
        <Button style={buttonStyleFiltro} variant="contained" startIcon={<img src={ListMagnifyingGlass} style={{ width: '25px', height: '25px' }} />}>
          FILTRAR
        </Button>
      </Box>
      <Box display="flex" gap={2} marginTop={2}>
        <Table />
      </Box>
    </Box>
  );
}

export default Agendados;