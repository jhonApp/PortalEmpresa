import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, useTheme } from '@mui/material';
import { Eye } from 'phosphor-react';
import { IconMap } from '../../Utils/IconMap';
import { StatusMap } from '../../Utils/StatusMap';
import Popup from './Popup';

const ComunicadoCard = ({ tipoComunicado, mensagem, status, idComunicado, titulo, enquetes }) => {
  const theme = useTheme();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupSubTitle, setPopupSubTitle] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupEnquetes, setPopupEnquetes] = useState([]);
  const [popupDescription, setPopupDescription] = useState('');
  console.log(tipoComunicado)
  const handleOpenPopup = (title, sub, description, type, enquetes) => {
    console.log("visualizado")
    setPopupTitle(title);
    setPopupSubTitle(sub)
    setPopupType(type);
    setPopupDescription(description);
    setPopupEnquetes(enquetes);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const renderPopup = () => {
    switch (tipoComunicado) {
      case 'Comunicado':
        return  <Button style={{minWidth: '0px', padding: '0px'}} onClick={() => handleOpenPopup('Novo Comunicado', titulo, mensagem, 'ExibirComunicado', null)}> <Eye size={32} color="#0D1327" /> </Button>;
      case 'Encomenda':
        return  <Button style={{minWidth: '0px', padding: '0px'}} onClick={() => handleOpenPopup('Nova Encomenda', titulo, mensagem, 'ExibirEncomenda', null)}> <Eye size={32} color="#0D1327" /> </Button>;
        case 'Enquete':
            return <Button style={{minWidth: '0px', padding: '0px'}} onClick={() => handleOpenPopup('Nova Enquete', titulo, mensagem, 'ExibirEnquete', enquetes )}> <Eye size={32} color="#0D1327" /> </Button>;
        default:
            return null;
    }
  };

  return (
    <Card sx={{ display: 'flex', height: '153px', borderRadius: 3}}>
      <CardContent style={{ width:'100%' }} >
        {/* Primeira Linha */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: 'auto'}}>
          <div style={{ display: 'flex'}}>
            {IconMap[tipoComunicado](theme)}
            <Typography variant="h6" component="h7" style={{ fontWeight: 600, fontSize: 20 }}>
              {tipoComunicado}
            </Typography>
          </div>
          {renderPopup()}
        </div>
        {/* Segunda Linha */}
        <div style={{ display: 'flex' }}>
          <div style={{ marginTop: theme.spacing(2), display:'flex', width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 16 }}>
              {titulo}
            </Typography>
            {StatusMap[status]()}
          </div>
        </div>
        {/* Terceira Linha */}
        <div style={{ display: 'flex', width: '100%', overflow: 'hidden' }}>
          <div style={{ marginTop: theme.spacing(1), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <Typography variant="h6" component="h7" style={{ fontWeight: 'semi-bold', fontSize: 16 }}>
              {mensagem}
            </Typography>
          </div>
        </div>
      </CardContent>
      <Popup open={openPopup} handleClose={handleClosePopup} atualizaMural={null} title={popupTitle} sub={popupSubTitle} description={popupDescription} type={popupType} enquetes={popupEnquetes}/>
    </Card>
  );
};

export default ComunicadoCard;