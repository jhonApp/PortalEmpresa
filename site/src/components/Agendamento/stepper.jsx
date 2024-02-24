import React, { useState } from 'react';
import {Box, Stepper, Step, StepLabel, Button} from '@mui/material';
import Formulario from './formulario';
import FormularioAgendamento from './formularioAgendamento';
import { styled } from '@mui/system';
import Message from '../Message';
import useForm from '../Formulario/useForm';
import { inserirAgendamento } from '../../../service/agendamentoService';
import Progress from '../../Utils/LoadingProgress'

const steps = ['Convidado', 'Data do Agendamento'];

const StyledButtonPrimary = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  padding: '10px',
  fontSize: '12px',
  marginLeft: 15,
  height: '38px',
  borderRadius: '20px',
  width: '130px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
  },
});

const StyledButtonSecundary = styled(Button)({
  backgroundColor: '#EBEAEF',
  border: '1px solid #000',
  color: 'black',
  padding: '10px',
  fontSize: '12px',
  height: '38px',
  borderRadius: '20px',
  width: '130px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    color: '#fff'
  },
});

export default function HorizontalLinearStepper({atualizarAgendamento, handleClose}) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para atualizar o estado do formulário
  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const handleFieldValidationChange = (isInvalid) => {
    setInvalidFields(isInvalid);
  };

  const { handleSubmit, clearMessage } = useForm();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    const hasInvalidField = invalidFields;
    if (!hasInvalidField) {
      setMessage('Por favor, preencha os campos obrigatórios');
      setMessageType('error');
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    handleClose(false);
  };

  const handleSave = async () => {
    try {
      
      const hasInvalidField = invalidFields;
      if (!hasInvalidField) {
        setMessage('Por favor, preencha os campos obrigatórios');
        setMessageType('error');
        return;
      }
      setLoading(true);
  
      await handleSubmit(async () => {
        await inserirAgendamento(formData);
      });

      setMessage('Criado com sucesso!');
      setMessageType('success');
      atualizarAgendamento();
      setFormData({});
      setActiveStep(0);
      handleClose(false);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      setMessage(error.message);
      setMessageType('error');
    }
  };
  
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Formulario
              formData={formData}
              onDataChange={handleFormChange}
              onFieldValidationChange={handleFieldValidationChange}
            />
            <Progress isVisible={loading} />
          </>
        );
      case 1:
        return (
          <>
            <FormularioAgendamento
              formData={formData}
              onDataChange={handleFormChange}
              onFieldValidationChange={handleFieldValidationChange}
            />
            <Progress isVisible={loading} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', background: '#FAFAFA' }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel style={{ fontSize: '0.8rem !important'}} {...labelProps}>
                <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{label}</span>
              </StepLabel>
            </Step>
          );                    
        })}
      </Stepper>
      <Box sx={{ width: '100%' }}>
        {renderStepContent(activeStep)}
        {activeStep === steps.length - 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={handleBack} sx={{ marginRight: '150px', color: 'black' }}>Voltar</Button>
            <StyledButtonSecundary onClick={handleCancel}>Cancelar</StyledButtonSecundary>
            <StyledButtonPrimary onClick={handleSave}>Finalizar</StyledButtonPrimary>
          </Box>
        )}
        {activeStep !== steps.length - 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <StyledButtonPrimary onClick={handleNext}>Próximo</StyledButtonPrimary>
          </Box>
        )}
      </Box>
      {message && <Message type={messageType} message={message} onClose={clearMessage} />}
    </Box>
  );
}
