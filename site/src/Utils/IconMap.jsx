import { UserMinus, UsersThree, IdentificationCard, UsersFour, ListChecks, Bell, Package } from 'phosphor-react';
import Avatar from '@mui/material/Avatar';

export const IconMap = {
  'Visitante Simples': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#D2E7DB' }}><UserMinus color="#1C843C" /></Avatar>,
  'Visitante Especial': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#F8D5D5' }}><UsersThree color="#FE4141" /></Avatar>,
  'Prestador de Serviço': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#E4E1CC' }}><IdentificationCard color="#AA9F63" /></Avatar>,
  'Multiplos Visitantes': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#D2E7DB' }}><UsersFour color="#1C843C" /></Avatar>,
  'Enquete': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#BCC0CF' }}><ListChecks color="#000" /></Avatar>,
  'Comunicado': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#BCC0CF' }}><Bell color="#000" /></Avatar>,
  'Encomenda': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#BCC0CF' }}><Package color="#000" /></Avatar>
};

export const StatusMap = {
  'Ativo': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#D2E7DB' }}><UserMinus color="#1C843C" /></Avatar>,
  'Pendente': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#F8D5D5' }}><UsersThree color="#FE4141" /></Avatar>,
};