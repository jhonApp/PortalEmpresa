import React, { useEffect, useState } from 'react';
import { Box, Paper, Button, useTheme, IconButton } from '@mui/material';
import { CaretLeft } from 'phosphor-react';
import Typography from '@mui/material/Typography';
import AccordionSobre from '../Formulario/Sobre';
import AccordionAcesso from '../Formulario/Acesso';
import AccordionEndereco from '../Formulario/Endereco';
import AccordionAdicionais from '../Formulario/Adicionais';
import { Link } from 'react-router-dom';
import StyledLink from '../../../Utils/StyledLink';
import { inserirFuncionario } from '../../../../service/funcionarioService';

function FormFuncionario({ updateTable }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    console.log(formData);
  };

  const handleFieldValidationChange = (isInvalid) => {
    setInvalidFields(isInvalid);
  };

  return (
    <Box
      gap={1}
      marginX={1}
      margin={2}
      padding={2}
      paddingX={2}
      paddingBottom={3}
      display="flex"
      backgroundColor="#FAFAFA"
      flexDirection="column"
      style={{ borderRadius: '10px' }}
      component={Paper}
    >
      <StyledLink theme={theme} component={Link} variant="contained" to={'/system/funcionarios'}>
        <CaretLeft size={16} color="#fff" />
        <div display="flex">
          <Typography variant="h6" component="h1" style={{ fontSize: 14, textAlign: 'justify', marginLeft: '8px' }}>Voltar </Typography>
        </div>
      </StyledLink>
      <Box display="flex" flexDirection="row" width="100%" justifyContent="space-between" mt="20px" mb="20px">
        <Box sx={{ display:'flex', flexDirection: 'column', gap:'10px', flex: 1, marginRight: '8px' }}>
          <AccordionSobre formData={formData} onFieldValidationChange={handleFieldValidationChange} onDataChange={handleFormChange} />
          <AccordionEndereco formData={formData} onFieldValidationChange={handleFieldValidationChange} onDataChange={handleFormChange} />
        </Box>
        <Box sx={{ display:'flex', flexDirection: 'column', gap:'10px', flex: 1, marginLeft: '8px' }}>
          <AccordionAcesso formData={formData} onFieldValidationChange={handleFieldValidationChange} onDataChange={handleFormChange} />
          <AccordionAdicionais formData={formData} onFieldValidationChange={handleFieldValidationChange} onDataChange={handleFormChange} />
        </Box>
      </Box>
      <StyledLink theme={theme} component={Link} variant="contained" to={'/system/funcionarios'}>
        <Typography variant="h6" component="h1" style={{ fontSize: 14, textAlign: 'justify'}}>SALVAR </Typography>
      </StyledLink>
    </Box>
  );
}

export default FormFuncionario;