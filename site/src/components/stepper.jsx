import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import { styled } from '@mui/system';
import useForm from './Formulario/useForm';
import { validateForm } from './Formulario/validation';
import PropTypes from 'prop-types';
import { showSuccessToast, showErrorToast } from '../Utils/Notification';


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
    color: '#fff',
  },
});

const HorizontalLinearStepper = ({
  steps,
  renderStepContent,
  updateTable,
  createData,
  formData,
  handleClose,
  invalidFields,
  onLoadingChange
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());


  const { handleSubmit, clearMessage } = useForm();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    handleClose(false);
  };

  const handleNext = () => {
    const { errorTypes } = validateForm(formData, 'agendamento');
    const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
    if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
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

  const handleSave = async () => {
    try {
      const { errorTypes } = validateForm(formData, 'agendamento2');
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      onLoadingChange(true);
  
      await handleSubmit(async () => {        
        try{
            await createData(formData);
            showSuccessToast("Criado com sucesso!");
            updateTable();
            setActiveStep(0);
            handleClose(false);
        } catch (e) {
            onLoadingChange(false);
            showErrorToast(e.message);
        }
      });
      onLoadingChange(false);

    } catch (error) {
      onLoadingChange(false);
      showErrorToast(error.message);
    }
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
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
              <StepLabel style={{ fontSize: '0.8rem !important' }} {...labelProps}>
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
    </Box>
  );
};

HorizontalLinearStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  renderStepContent: PropTypes.func.isRequired,
};

export default HorizontalLinearStepper;