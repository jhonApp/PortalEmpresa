import React from 'react';
import { StyledTextField, StyledPaper, FormContainer, Column, FormRow  } from '../../../Utils/StyledForm';
import { validateForm } from '../../Formulario/validation';
import { Box, Paper, Button, ToggleButton, Typography, useTheme, Input } from '@mui/material';
import { UserMinus, UsersThree, UploadSimple, FileCsv } from 'phosphor-react';
import CheckIcon from '@mui/icons-material/Check';

import useForm from '../../Formulario/useForm';
import { createExcelContent } from '../AgendamentoMassa/createExcelContent';
import * as XLSX from 'xlsx';
import InputMask from 'react-input-mask';

const Formulario = ({ onDataChange, onFieldValidationChange, formData }) => {
  const theme = useTheme();
  const [selected, setSelected] = React.useState(false);
  const [selectedButton, setSelectedButton] = React.useState(null);
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

  const handleToggleButtonChange = (value) => {
    setSelectedButton(value === selectedButton ? null : value);
    onDataChange({ ...formData, tipo: value });
  };

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'lightgray',
    padding: theme.spacing(1),
    height: '20px',
    marginRight: theme.spacing(1),
  };

  const buttonStyle = {
    padding: '17px',
    borderRadius: '13px',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'black',
    textTransform: 'none',
    width: '100%',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
  };

  const buttonFileStyle = {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#DDDCE2',
    fontSize: '13px',
    fontWeight: 'bold',
    color: 'black',
    display: 'flex',
    justifyContent: 'space-evenly',
    textTransform: 'none',
    boxShadow: 'none',
    width: '100%'
  };

  const handleDownloadExcel = () => {
    createExcelContent();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Suponha que o arquivo Excel tenha apenas uma planilha
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
      // Convertendo os dados da planilha para um array de objetos
      const visitantes = XLSX.utils.sheet_to_json(worksheet);
  
      // Processando os dados dos visitantes e adicionando ao formData
      const processedVisitors = visitantes.map(visitante => {
        return {
          visName: visitante.visName,
          visDoc: visitante.visDoc,
          visEmail: visitante.visEmail,
          visTel: visitante.visTel
        };
      });
      onDataChange({ ...formData, visitantes: processedVisitors });
      

    };
    reader.readAsArrayBuffer(file);
  };  

  const handleFormChange = (fieldName, value) => {
    handleChange(fieldName, value);
    const isValid = handleValidation(fieldName);
    onDataChange({ ...values, [fieldName]: value });
    onFieldValidationChange (isValid);
  };

  return (
    <StyledPaper sx={{background:'#FAFAFA'}} elevation={1}>
      <Typography variant="h6" component="h6" style={{ fontWeight: 'bold', fontSize: "16px", textAlign: "start" }}>Selecionar o tipo de agendamento</Typography>
      <Box display="flex" flexDirection={"row"} justifyContent={"space-between"} gap={2} marginTop={2}>
        <ToggleButton
            style={{ ...buttonStyle }}
            variant="contained"
            selected={selectedButton === 'agendamentoVisitante'}
            value="agendamentoVisitante"
            onChange={() => handleToggleButtonChange('agendamentoVisitante')}
          >          
          <div style={iconContainerStyle}><UserMinus size={20} color="#000" /></div>
          Visitante Especial
        </ToggleButton>
        <ToggleButton
            style={{ ...buttonStyle }}
            variant="contained"
            selected={selectedButton === 'agendamentoPrestador'}
            value="agendamentoPrestador"
            onChange={() => handleToggleButtonChange('agendamentoPrestador')}
          >          
          <div style={iconContainerStyle}><UsersThree size={20} color="#000" /></div>
          Prestador de Serviço
        </ToggleButton>
      </Box>
      <Box display="flex" flexDirection={"row"} gap={2} marginTop={2}>
        <div style={{ width: "100%" }} >
          <Typography variant="h6" component="h6" style={{ fontWeight: 'bold', fontSize: "15px", textAlign: "start", marginBottom: 4 }}>Baixar arquivo</Typography>
          <Button style={{ ...buttonFileStyle }} variant="contained" onClick={handleDownloadExcel} >
            <UploadSimple size={25} />
            <span>Clique aqui para baixar o excel</span>
          </Button>
        </div>
        <div style={{ width: "100%" }} >
          <Typography variant="h6" component="h6" style={{ fontWeight: 'bold', fontSize: "15px", textAlign: "start", marginBottom: 4 }}>Selecionar arquivo</Typography>
          <Input type="file" id="file-input" sx={{ display: 'none' }} onChange={handleFileChange} />
          <label htmlFor="file-input">
            <Button component="span" style={buttonFileStyle} variant="contained">
              <FileCsv size={25} color="#000" />
              Clique aqui para selecionar o excel
            </Button>
          </label>
        </div>
      </Box>
    </StyledPaper>
  );
};

export default Formulario;