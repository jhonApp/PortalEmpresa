import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import { Eye } from 'phosphor-react';
import { IconMap } from '../../Utils/IconMap';
import { StatusMap } from '../../Utils/StatusMap';
import Popup from './Popup';

const ComunicadoCard = ({ tipoComunicado, mensagem, status, idComunicado, titulo }) => {
  const theme = useTheme();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupSubTitle, setPopupSubTitle] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupDescription, setPopupDescription] = useState('');

  const handleOpenPopup = (title, sub, description, type) => {
    setPopupTitle(title);
    setPopupSubTitle(sub)
    setPopupType(type);
    setPopupDescription(description);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const renderPopup = () => {
    switch (tipoComunicado.descricao) {
      case 'Comunicado':
        return  <Button onClick={() => handleOpenPopup('Novo Comunicado', titulo, mensagem, 'ExibirComunicado')}> <Eye size={20} color="#000" /> </Button>;
      case 'Encomenda':
        return  <Button onClick={() => handleOpenPopup('Nova Encomenda', titulo, mensagem, 'ExibirEncomenda')}> <Eye size={20} color="#000" /> </Button>;
        case 'Enquete':
            return <Button onClick={() => handleOpenPopup('Nova Enquete', titulo, mensagem, 'ExibirEnquete')}> <Eye size={20} color="#000" /> </Button>;
        default:
            return null;
    }
  };

  return (
    <Card sx={{ display: 'flex', height: 'auto', borderRadius: 3, width: 'auto' }}>
      <CardContent style={{ p: '10px' }} >
        {/* Primeira Linha */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: 320}}>
          <div style={{ display: 'flex'}}>
            {IconMap[tipoComunicado.descricao](theme)}
            <Typography variant="h6" component="h7" style={{ fontWeight: 600, fontSize: 16 }}>
              {tipoComunicado.descricao}
            </Typography>
          </div>
          {renderPopup()}
        </div>
        {/* Segunda Linha */}
        <div style={{ display: 'flex' }}>
          <div style={{ marginTop: theme.spacing(1), display:'flex', width: 320, justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 13 }}>
              {titulo}
            </Typography>
            {StatusMap[status]()}
          </div>
        </div>
        {/* Terceira Linha */}
        <div style={{ display: 'flex', width: 320, overflow: 'hidden' }}>
          <div style={{ marginTop: theme.spacing(1), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 12 }}>
              {mensagem}
            </Typography>
          </div>
        </div>
      </CardContent>
      <Popup open={openPopup} handleClose={handleClosePopup} atualizaMural={null} title={popupTitle} sub={popupSubTitle} description={popupDescription} type={popupType} />
    </Card>
  );
};

export default ComunicadoCard;