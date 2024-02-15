import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Formulario from './formulario';
import { styled } from '@mui/system';
import FormularioAgendamento from './formularioAgendamento';

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

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [formData, setFormData] = useState({});

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
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

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSave = () => {
    console.log('Dados enviados:', formData);
    setFormData({});
    setActiveStep(0);
  };

  const handleFormChange = (data) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...data }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Formulario onDataChange={handleFormChange} />;
      case 1:
        return <FormularioAgendamento onDataChange={handleFormChange} />;
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
            <StyledButtonSecundary onClick={handleReset}>Cancelar</StyledButtonSecundary>
            <StyledButtonPrimary onClick={handleSave}>Finalizar</StyledButtonPrimary>
          </Box>
        )}
        {activeStep !== steps.length - 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <StyledButtonPrimary onClick={handleNext}>Próximo</StyledButtonPrimary>
          </Box>
        )}
      </Box>
    </Box>
  );
}