import { UserMinus, UsersThree, IdentificationCard, UsersFour, ListChecks, Bell, Package } from 'phosphor-react';
import Avatar from '@mui/material/Avatar';
import {StatusColorMap} from '../Utils/StatusMap';


export const IconMap = {
  'Visitante Simples': (theme, status) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px',backgroundColor: StatusColorMap[status][0] }}><UserMinus color={StatusColorMap[status][1]} /></Avatar>,
  'Visitante Especial': (theme, status) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: StatusColorMap[status][0] }}><UsersThree color={StatusColorMap[status][1]} /></Avatar>,
  'Prestador de Serviço': (theme, status) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: StatusColorMap[status][0] }}><IdentificationCard color={StatusColorMap[status][1]} /></Avatar>,
  'Multiplos Visitantes': (theme, status) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: StatusColorMap[status][0] }}><UsersFour color={StatusColorMap[status][1]} /></Avatar>,
  'Enquete': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#BCC0CF' }}><ListChecks color="#393E51" size={20} /></Avatar>,
  'Comunicado': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#BCC0CF' }}><Bell color="#393E51" size={20} /></Avatar>,
  'Encomenda': (theme) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: '#BCC0CF' }}><Package color="#393E51" size={20} /></Avatar>
};

export const StatusMap = {
  'Ativo': (theme, status) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: StatusColorMap[status] }}><UserMinus color={StatusColorMap[status][1]} /></Avatar>,
  'Pendente': (theme, status) => <Avatar style={{ marginRight: theme.spacing(2), borderRadius: '10px', backgroundColor: StatusColorMap[status] }}><UsersThree color={StatusColorMap[status][1]} /></Avatar>,
};