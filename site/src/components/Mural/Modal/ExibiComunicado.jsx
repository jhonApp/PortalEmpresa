import React, { useState } from 'react';
import { StyledPaper } from '../../../Utils/StyledForm';
import { Checkbox, Modal, Box, Typography, Link, IconButton } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../../../Utils/Notification';
import { getAnexo } from '../../../../service/muralService';
import { XCircle } from 'phosphor-react';
import Carousel from '../../Carousel';

const ExibiComunicado = ({ codigoComunicado, sub, description, confirmCheck }) => {
  const [attachment, setAttachment] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleAttachmentClick = async () => {
    try {
      const anexo = await getAnexo(codigoComunicado);
      if (anexo.length > 0) {
        setAttachment(anexo);
        setOpenModal(true);
      } else {
        showErrorToast('Não há anexos a serem exibidos.');
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  const handleCloseModal = () => { setOpenModal(false); };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setChegada(isChecked); // Atualiza o estado interno do Checkbox
    handleFormChange('chegada', isChecked); // Atualiza o estado do formulário
  };

  return (
    <StyledPaper sx={{ background: '#FAFAFA' }} elevation={1}>
      <Typography variant="h6" component="h7" style={{ fontWeight: 600, fontSize: 24 }}>
        {sub}
      </Typography>
      <StyledPaper sx={{ marginTop: 1, background: '#F5F5F5', border: '1px solid #ABACB2', padding: '10px', textAlign: 'start' }}>
        <Typography variant="h3" style={{ marginBottom: 2, fontSize: 16 }}>
          {description}
        </Typography>
      </StyledPaper>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link variant="h6" component="h7" style={{ color: '#0000EE', fontWeight: 600, float: 'left', lineHeight: '2.6', textDecoration: 'none', cursor: 'pointer', fontSize: 16, textAlign: 'start' }} onClick={handleAttachmentClick}>
          {"Clica aqui para ver o anexo"}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            sx={{
              padding: '0px 0px 0px 0px !important',
              '& .MuiSvgIcon-root': { color: '#C4C7D4' }
            }}
            onChange={(e) => {
              confirmCheck(e.target.checked);
            }}
            value={confirmCheck}
            inputProps={{ 'aria-label': 'primary checkbox' }}   
          />
          <Typography sx={{ marginLeft: 1, fontSize: 14, fontWeight: 600 }}>
            Confirmo que li e não desejo mais receber este aviso
          </Typography>
        </div>
      </div>
      
      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '57%', transform: 'translate(-50%, -50%)', width: '40%', minHeight: '67%', bgcolor: 'background.paper', boxShadow: 24, p: 1, borderRadius: '20px', overflow: 'auto' }}>
          <IconButton onClick={handleCloseModal} style={{ position: 'absolute', top: 0, right: 0 }}>
            <XCircle size={28} color="#FF0B0B" />
          </IconButton>
          <Carousel attachment={attachment} />
        </Box>
      </Modal>
    </StyledPaper>
  );
};

export default ExibiComunicado;