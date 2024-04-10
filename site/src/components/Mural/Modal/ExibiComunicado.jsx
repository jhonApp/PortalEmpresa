import React, { useState } from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { Modal, Box, Typography, Link, IconButton, Paper, styled } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../../../Utils/Notification';
import { getAnexo } from '../../../../service/muralService';
import useForm from '../../Formulario/useForm';
import { XCircle } from 'phosphor-react';
import InputMask from 'react-input-mask';
import Carousel from '../../Carousel';

const ExibiComunicado = ({ codigoComunicado, sub, description, onDataChange, onFieldValidationChange, formData }) => {
  const [attachment, setAttachment] = useState([]);
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

  const handleAttachmentClick = async () => {
    try {
      const anexo = await getAnexo(codigoComunicado);
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

  const handleCloseModal = () => {
    setOpenModal(false);
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
      <Link variant="h6" component="h7" style={{ color: '#0000EE', fontWeight: 600, float: 'left', lineHeight: '2.6', textDecoration: 'none', cursor: 'pointer', fontSize: 16, textAlign: 'start' }} onClick={handleAttachmentClick}>
        {"Clica aqui para ver o anexo"}
      </Link>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40%', height: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 1, borderRadius: '20px', overflow: 'auto' }}>
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