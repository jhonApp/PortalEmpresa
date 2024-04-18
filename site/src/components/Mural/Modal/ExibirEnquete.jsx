import React, { useState, useEffect } from 'react';
import { StyledFormControlLabel, StyledPaper } from '../../../Utils/StyledForm';
import { RadioGroup, Typography, Link, Radio, Modal, Box, IconButton } from '@mui/material';
import { getAnexo } from '../../../../service/muralService';
import { XCircle } from 'phosphor-react';
import Carousel from '../../Carousel';

const ExibiEnquete = ({ codigoComunicado, enquetes, sub, description, opcaoEnquete }) => {
  const [attachment, setAttachment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const labelStyle = {
    fontSize: '16px',
    fontWeight: 600
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
  
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    opcaoEnquete(selectedValue);
  };

  useEffect(() => {
    const savedOption = enquetes.find(enquete => {
      console.log(enquete);
      return enquete.opcaoVoto !== 0;
    });
    
    if (savedOption) {
      setSelectedOption(savedOption.opcao);
    }
    
  }, []);

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
            value={selectedOption}
            onChange={handleOptionChange}
          >
              {enquetes.map((enquete, index) => (
                <StyledFormControlLabel 
                  key={index}
                  value={enquete.opcao}
                  control={<Radio />} 
                  label={<Typography style={labelStyle}>{enquete.descricao}</Typography>} />
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