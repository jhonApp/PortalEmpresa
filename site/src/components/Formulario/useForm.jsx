import { useState } from 'react';
import { Typography } from '@mui/material';

const useForm = (initialState, validationCallback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errorMessages, setErrorMessages] = useState({});

  // Função para realizar a validação do formulário com base em uma função de callback
  const handleValidation = () => {
    const { newErrors, errorTypes } = validationCallback(values);
    setErrors(newErrors);
    setErrorMessages(errorTypes);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
        setMessage(errorMessages[errorTypes.email || errorTypes.password || errorTypes.selectedCondominio]);
        setMessageType('error');
    }

    return !hasErrors;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (submitCallback) => {
    try {
      if (!handleValidation()) {
        setMessage('Por favor, preencha todos os campos.');
        setMessageType('error');
        return;
      }
      setErrors({});
      await submitCallback();
      setMessage('Ação bem-sucedida!');
      setMessageType('success');
    } catch (error) {
      const messageError = error.message;
      setMessage(messageError);
      setMessageType('error');
    }
  };

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
          style={{ marginTop: 3, marginLeft: '1em', textAlign: 'left' }}
        >
        {errorMessages[field]?.message}
        </Typography>
      )
    );
  };
  

  // Função para limpar as mensagens do formulário
  const clearMessage = () => {
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
    handleValidation,
    renderErrorMessage,
    clearMessage,
  };
};

export default useForm;
