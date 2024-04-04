import { XCircle, CheckCircle, Clock } from 'phosphor-react';
import { Box, Typography } from '@mui/material';

const getStatusComponent = (backgroundColor, iconElement, iconColor, labelText) => (
    <Box style={{ display: 'flex', width: 'fit-content' ,alignItems: 'center', backgroundColor, borderRadius: '50px', p: 3, justifyContent: 'center', padding: '3px 20px' }}>
        {iconElement}
        <Typography variant="body1" style={{ marginLeft: 3, fontSize: 14, color: iconColor }}>{labelText}</Typography>
    </Box>
);

export const StatusMap = {
    'Visualizado': () => getStatusComponent('#C9E3D4', <CheckCircle size={20} color="#1C843C" />, '#1C843C', 'Visualizado'),
    'Não Visualizado': () => getStatusComponent('#FBE4E4', <XCircle size={20} color="#FF0B0B" />, '#FF0B0B', 'Não Visualizado'),
    'Ativo': () => getStatusComponent('#C9E3D4', <CheckCircle size={20} color="#1C843C" />, '#1C843C', 'Ativo'),
    'Autorizado': () => getStatusComponent('#C9E3D4', <CheckCircle size={20} color="#1C843C" />, '#1C843C', 'Autorizado'),
    'Inativo': () => getStatusComponent('#FBE4E4', <XCircle size={20} color="#FF0B0B" />, '#FF0B0B', 'Inativo'),
    'Pendente': () => getStatusComponent('#F0EFE2', <Clock size={20} color="#746100" />, '#746100', 'Pendente'),
    'Cancelado': () => getStatusComponent('#FBE4E4', <XCircle size={20} color="#FF0B0B" />, '#FF0B0B', 'Cancelado'),
    'NaoAutorizado': () => getStatusComponent('#FBE4E4', <XCircle size={20} color="#FF0B0B" />, '#FF0B0B', 'Não Autorizado'),
    'AguardandoAutorizacao': () => getStatusComponent('#F0EFE2', <Clock size={20} color="#746100" />, '#746100', 'Aguardando Autorização'),
    'AcessoComPager': () => getStatusComponent('#F0EFE2', <Clock size={20} color="#746100" />, '#746100', 'Acesso Com Pager'),
    'AcessoSemPager': () => getStatusComponent('#F0EFE2', <Clock size={20} color="#746100" />, '#746100', 'Acesso Sem Pager'),
};