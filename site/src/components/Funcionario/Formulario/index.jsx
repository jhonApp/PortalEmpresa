import React, { useEffect, useState } from 'react';
import { Box, Paper, Button, useTheme, Input, IconButton } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../../../Utils/Notification';
import { validateForm } from '../../Formulario/validation';
import useForm from '../../Formulario/useForm';
import { CaretLeft, Camera } from 'phosphor-react';
import Typography from '@mui/material/Typography';
import AccordionSobre from '../Formulario/Sobre';
import AccordionAcesso from '../Formulario/Acesso';
import AccordionEndereco from '../Formulario/Endereco';
import AccordionAdicionais from '../Formulario/Adicionais';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import StyledLink from '../../../Utils/StyledLink';
import {StyledButtonPrimary} from '../../../Utils/StyledButton';
import { cadastrarFuncionario } from '../../../../service/funcionarioService';

// Icone para o botão de upload
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fontSize } from '@mui/system';

function FormFuncionario({ updateTable }) {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useForm();

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    console.log(formData);
  };

  const handleFieldValidationChange = (isInvalid) => {
    setInvalidFields(isInvalid);
  };

  // Função para lidar com a mudança de arquivo (imagem) selecionado
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader(); // Criando um leitor de arquivo
        
        reader.onload = (e) => {
            let base64String = e.target.result;
            
            // Verifique se a string base64 foi lida corretamente
            if (base64String.startsWith("data:image")) {
                setFormData({ ...formData, file: base64String }); // Atualizando o estado do formulário com a imagem selecionada
            } else {
                console.error("O arquivo não é uma imagem válida.");
            }
        };
    
        // Manipulador de erro para capturar problemas durante a leitura do arquivo
        reader.onerror = (error) => {
            console.error("Erro ao ler o arquivo:", error);
        };
    
        reader.readAsDataURL(file); // Lê o arquivo como um URL de dados
    }
};

  
  

  const handleSave = async () => {
    try {
      const { errorTypes } = validateForm(formData, 'funcionario');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      setLoading(true);
  
      await handleSubmit(async () => {        
        try{
            await cadastrarFuncionario(formData);
            showSuccessToast("Criado com sucesso!");
            setLoading(false);
            updateTable();
        } catch (e) {
          setLoading(false);
          showErrorToast(e.message);
        }
      });

    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
    }
  };

  return (
    <div>
      <StyledLink sx={{ mt:3, mb:3, ml:2 }} theme={theme} component={Link} variant="contained" to={'/system/funcionarios'}>
          <CaretLeft size={16} color="#fff" />
          <div display="flex">
            <Typography variant="h6" component="h1" style={{ fontSize: 14, textAlign: 'justify', marginLeft: '8px' }}>Voltar </Typography>
          </div>
      </StyledLink>
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
        <Box sx={{ width:'auto', position: 'relative' }}>
          <Avatar 
            style={{ 
              borderRadius: '50%', 
              width: theme.spacing(14), 
              height: theme.spacing(14), 
              margin: '10px'
            }} 
            src={formData.file ? formData.file : "/broken-image.jpg"} // Define a imagem do Avatar com base se um arquivo foi selecionado ou não
          />
          <label htmlFor="upload-photo" style={{ cursor: 'pointer', display: 'flex', gap: '3px' }} >
            <Input 
              id="upload-photo"
              style={{ display: 'none' }}
              type="file"
              accept='image/*'
              onChange={handleFileChange}
            />
            <Camera size={23} weight="fill" />
            <Typography variant="body2" sx={{fontSize:14, padding:'3px', borderRadius:'5px'}}>Adicione uma foto</Typography>
          </label>
        </Box>
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
        <StyledButtonPrimary sx={{marginLeft: 0}} variant="contained" onClick={handleSave}>
          <Typography variant="h6" component="h1" style={{ fontSize: 14, textAlign: 'justify'}}>SALVAR </Typography>
        </StyledButtonPrimary>
      </Box>
    </div>
    
  );
}

export default FormFuncionario;