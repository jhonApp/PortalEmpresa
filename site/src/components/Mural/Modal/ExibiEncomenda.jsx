import React, { useState } from 'react';
import { Modal, Box, Typography, Link, IconButton } from '@mui/material';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import { showSuccessToast, showErrorToast } from '../../../Utils/Notification';
import { getAnexo } from '../../../../service/muralService';
import { XCircle } from 'phosphor-react';
import { validateForm } from '../../Formulario/validation';
import useForm from '../../Formulario/useForm';
import InputMask from 'react-input-mask';

const ExibiEncomenda = ({ codigoComunicado, sub, description, onDataChange, onFieldValidationChange, formData }) => {
  const [attachment, setAttachment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const {
    values,
    errors,
    handleChange,
    handleValidation,
    renderErrorMessage,
  } = useForm(
    formData,
    validateForm,
    'agendamento'
  );

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAttachmentClick = async () => {
    try {
      debugger
      const anexo = await getAnexo(codigoComunicado);
      console.log(anexo);

      if (anexo) {
        setAttachment(anexo);
        setOpenModal(true);
      } else {
        showErrorToast('Erro ao obter o anexo.');
      }
    } catch (error) {
      showErrorToast(error);
    }
  };

  return (
    <StyledPaper sx={{background:'#FAFAFA' }} elevation={1} >
        <Typography variant="h6" component="h7" style={{ fontWeight: 600, fontSize: 24 }}>
            {sub}
        </Typography>
        <StyledPaper sx={{marginTop: 1, background:'#F5F5F5', border: '1px solid #ABACB2', padding:'10px', textAlign:'start'}}>
            <Typography variant="h3" style={{ marginBottom: 2, fontSize: 16 }}>
                {description}
            </Typography>
        </StyledPaper>
        <Link variant="h6" component="h7" style={{ color: '#0000EE', fontWeight: 600, float: 'left', lineHeight: '2.6', textDecoration: 'none', cursor: 'pointer', fontSize: 16, textAlign: 'start' }} onClick={handleAttachmentClick}>
          {"Clica aqui para ver o anexo"}
        </Link>
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '35%', bgcolor: 'background.paper', boxShadow: 24, p: 5, borderRadius: '20px' }}>
            <IconButton onClick={handleCloseModal} style={{ position: 'absolute', top: 0, right: 0 }}>
              <XCircle size={28} color="#FF0B0B" />
            </IconButton>
            {attachment && attachment.contentType && attachment.contentType.startsWith('image/') ? (
              <img src={`data:${attachment.contentType};base64,${attachment.data}`} alt="Anexo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
              attachment && attachment.contentType && <embed src={`data:${attachment.contentType};base64,${attachment.data}`} type={attachment.contentType} width="100%" height="600px" />
            )}
          </Box>
        </Modal>
    </StyledPaper>
  );
};

export default ExibiEncomenda;