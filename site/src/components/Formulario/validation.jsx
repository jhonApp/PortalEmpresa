const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isFieldEmpty = (value) => {
  if (typeof value === 'string') {
    return !value.trim();
  } else {
    return value != null ? false : true;
  }
};

export const validateForm = (values) => {
  const selectedCondominioTrimmed = typeof values.selectedCondominio === 'string'
  ? values.selectedCondominio.trim()
  : values.selectedCondominio;
  
  const newErrors = {
    email: isFieldEmpty(values.email) || !isEmailValid(values.email),
    password: isFieldEmpty(values.password),
    selectedCondominio: isFieldEmpty(selectedCondominioTrimmed),
  };

  const getErrorMessage = (field) => {
      if (newErrors[field]) {
          switch (field) {
              case 'email':
                  return isFieldEmpty(values.email) ? 'Campo obrigatório.' : isEmailValid(values.email) ? '' : 'Email inválido.';
              case 'password':
                  return 'Campo obrigatório.';
              case 'selectedCondominio':
                  return 'Campo obrigatório.';
              default:
                  return '';
          }
      }
      return '';
  };

  const errorTypes = {
      email: {
          message: getErrorMessage('email'),
          type: newErrors.email ? 'error' : 'success',
      },
      password: {
          message: getErrorMessage('password'),
          type: newErrors.password ? 'error' : 'success',
      },
      selectedCondominio: {
          message: getErrorMessage('selectedCondominio'),
          type: newErrors.selectedCondominio ? 'error' : 'success',
      },
  };

  return { newErrors, errorTypes };
};