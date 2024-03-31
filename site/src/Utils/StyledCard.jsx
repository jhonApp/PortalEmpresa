import { styled } from '@mui/system';
import { Card, CardContent, Box, IconButton } from '@mui/material';

export const StyledCard = styled(Card)({
  backgroundColor: '#FAFAFA',
  display: 'flex',
  width: '48%',
  height: 45,
  marginTop: 2,
  margin: 4,
  marginBottom: '10px',
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
});

export const StyledCardContent = styled(CardContent)({
  flex: '1 0 auto',
  p: '10px',
  pl: '20px',
  alignItems: 'center',
  display: 'flex',
  cursor: 'default',
});

export const StyledCardBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledIconButton = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: 10,
});

export const StyledCardSecao = styled(Card)({
  backgroundColor: '#FAFAFA',
  display: 'flex',
  width: '300px',
  height: '369px',
  overflowY: 'auto',
  borderRadius: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
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
  '& .css-h4y409-MuiList-root': {
    width: '100%'
  }
});