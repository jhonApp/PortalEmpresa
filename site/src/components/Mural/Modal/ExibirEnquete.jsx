import React, { useState } from 'react';
import { StyledFormControlLabel, StyledPaper } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { RadioGroup, Typography, Link, Radio, Button, Modal, Box, IconButton } from '@mui/material';
import { getAnexo } from '../../../../service/muralService';
import { XCircle } from 'phosphor-react';
import useForm from '../../Formulario/useForm';
import Carousel from '../../Carousel';
import InputMask from 'react-input-mask';

const ExibiEnquete = ({ codigoComunicado, enquetes, sub, description, onDataChange, onFieldValidationChange, formData }) => {
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

  const [attachment, setAttachment] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const labelStyle = {
    fontSize: '16px',
    fontWeight: 600
  };

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    const isValid = handleValidation(fieldName);
    onDataChange({ ...values, [fieldName]: value });
    onFieldValidationChange(isValid);
  };

  const handleAttachmentClick = async () => {
    try {
      const anexo = await getAnexo(codigoComunicado);
      console.log(anexo);

      if (anexo) {
        setAttachment(anexo);
        setOpenModal(true);
      } else {
        console.error('Erro ao obter o anexo.');
      }
    } catch (error) {
      console.error('Erro ao obter o anexo:', error);
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
        <div variant="h3" style={{ margin: 12}}>
          <RadioGroup
            aria-labelledby="status-radio"
            name="status-radio"
          >
              {enquetes.map((enquete, index) => (
                <StyledFormControlLabel key={index} value={enquete.opcao} control={<Radio />} label={<Typography style={labelStyle}>{enquete.descricao}</Typography>} />
              ))}
          </RadioGroup>
        </div>
      </StyledPaper>
      <Link variant="h6" component="h7" style={{ color: '#0000EE', fontWeight: 600, float: 'left', lineHeight: '2.6', textDecoration: 'none', cursor: 'pointer', fontSize: 16, textAlign: 'start' }} onClick={handleAttachmentClick}>
        {"Clica aqui para ver o anexo"}
      </Link>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '35%', bgcolor: 'background.paper', boxShadow: 24, p: 5, borderRadius: '20px' }}>
          <IconButton onClick={handleCloseModal} style={{ position: 'absolute', top: 0, right: 0 }}>
            <XCircle size={28} color="#FF0B0B" />
          </IconButton>
          <Carousel attachment={attachment} />
        </Box>
      </Modal>
    </StyledPaper>
  );
};

export default ExibiEnquete;