import { useState } from 'react';
import { Typography } from '@mui/material';

const useForm = (initialState, validationCallback, currentScreen) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  
  const handleValidation = () => {
    const { errorTypes } = validationCallback(values, currentScreen);
    setErrors(errorTypes);
    setErrorMessages(errorTypes);

    const hasErrors = Object.values(errorTypes).some((error) => error.errorFound);
    if (hasErrors) {
      let errorMessage = '';
      Object.keys(errorTypes).forEach((fieldName) => {
        if (errorTypes[fieldName].errorFound) {
          errorMessage += errorTypes[fieldName].message + '\n';
        }
      });
      setMessage('Por favor, preencha os campos obrigatórios.');
      setMessageType('error');
    } else {
      setMessage('');
      setMessageType('');
    }

    return !hasErrors;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (submitCallback) => {
    try {
      await submitCallback();
      setMessage('Ação bem-sucedida!');
      setMessageType('success');

    } catch (error) {
      const messageError = error.message;
      setMessage(messageError);
      setMessageType('error');
    }
  };

  const handleNextValidation = async () => {
    if (!handleValidation()) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return ;
    }
  }

  // Função para atualizar o estado dos valores do formulário
  const handleChange = (fieldName, value) => {
    setValues((prevValues) => ({ ...prevValues, [fieldName]: value }));
  };

  // Função auxiliar para renderizar mensagens de erro com base nos erros do formulário
  const renderErrorMessage = (field) => {
    return (
      errors[field] && (
        <Typography
          variant="body2"
          color="error"
          style={{ marginLeft: '1em', textAlign: 'left', fontSize: 12}}
        >
        {errorMessages[field]?.message}
        </Typography>
      )
    );
  };

  const clearMessage = () => {
    console.log("entrei no clear")
    setMessage('');
    setMessageType('');
  };

  // Retorna um objeto contendo estados e funções necessárias para manipular formulários
  return {
    values,
    errors,
    message,
    messageType,
    handleChange,
    handleSubmit,
    handleNextValidation,
    handleValidation,
    renderErrorMessage,
    clearMessage,
  };
};

export default useForm;

