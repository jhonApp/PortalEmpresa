import React, { useState } from 'react';
import { Box, Step, StepLabel, Button } from '@mui/material';
import { styled } from '@mui/system';
import useForm from './Formulario/useForm';
import { validateForm } from './Formulario/validation';
import PropTypes from 'prop-types';
import { showSuccessToast, showErrorToast } from '../Utils/Notification';
import { StyledStepper } from '../Utils/StyledDialog';
import AlertDialogSucess from '../Utils/Modal/Sucess';
import AlertDialogCancel from '../Utils/Modal/Cancel';

const StyledButtonPrimary = styled(Button)({
  backgroundColor: '#171E36',
  color: 'white',
  padding: '10px',
  fontSize: '14px',
  marginLeft: 15,
  height: '50px',
  borderRadius: '50px',
  width: '180px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

const StyledButtonSecundary = styled(Button)({
  backgroundColor: '#EBEAEF',
  border: '1px solid #000',
  color: 'black',
  padding: '10px',
  fontSize: '14px',
  height: '50px',
  borderRadius: '50px',
  width: '180px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
  },
});

const HorizontalLinearStepper = ({
  steps,
  updateTable,
  createFunction,
  formData,
  handleClose,
  onLoadingChange,
  invalidFields,
  screenValidation,
  action,
  renderStepContent
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [open, setOpen] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const { handleSubmit, clearMessage } = useForm();
  console.log("Estou no stepper")
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    setOpenCancel(true);
  };

  const handleNext = () => {
    const { errorTypes } = validateForm(formData, screenValidation);
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
      const { errorTypes } = validateForm(formData, screenValidation);
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      onLoadingChange(true);
  
      await handleSubmit(async () => {        
        try{
            await createFunction(formData);
            // showSuccessToast("Criado com sucesso!");
            updateTable();
            setActiveStep(0);
            // handleClose(false);
            setOpen(true);
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

  const handleUpdate = async () => {
    try {
      const { errorTypes } = validateForm(formData, screenValidation);
      const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
      if (hasErrors) {
        showErrorToast('Por favor, preencha os campos obrigatórios');
        return;
      }

      onLoadingChange(true);
  
      await handleSubmit(async () => {        
        try{
            await createFunction(formData);
            showSuccessToast("Alterado com sucesso!");
            // updateTable();
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
      <StyledStepper alternativeLabel activeStep={activeStep}>
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
      </StyledStepper>
      <Box sx={{ width: '100%' }}>
        {renderStepContent(activeStep)}
        {activeStep === steps.length - 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
            <Button onClick={handleBack} sx={{ marginRight: '180px', color: 'black' }}>Voltar</Button>
            <StyledButtonSecundary onClick={handleCancel}>Cancelar</StyledButtonSecundary>
            {action !== 'view' && action !== 'edit' && (
              <StyledButtonPrimary onClick={handleSave}>Finalizar</StyledButtonPrimary>
            )}
            {action === 'edit' && (
              <StyledButtonPrimary onClick={handleUpdate}>Alterar</StyledButtonPrimary>
            )}
          </Box>
        )}
        {activeStep !== steps.length - 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
            <StyledButtonSecundary sx={{ marginRight: '5px' }} onClick={handleCancel}>Cancelar</StyledButtonSecundary>
            <StyledButtonPrimary onClick={handleNext}>Próximo</StyledButtonPrimary>
          </Box>
        )}
      </Box>
      <AlertDialogSucess dialogOpen={open} handleClose={() => setOpen(false)} handleFunction={() => handleClose(false)}/>
      <AlertDialogCancel dialogOpen={openCancel} handleClose={() => setOpenCancel(false)} handleFunction={() => handleClose(false)} />
    </Box>
  );
};

HorizontalLinearStepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  renderStepContent: PropTypes.func.isRequired,
};

export default HorizontalLinearStepper;