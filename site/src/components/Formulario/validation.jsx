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

export const validateForm = (values, currentScreen) => {
  const selectedCondominioTrimmed = typeof values.selectedCondominio === 'string'
  ? values.selectedCondominio.trim()
  : values.selectedCondominio;
  console.log(currentScreen);

  const fieldValidations = ValidateField(currentScreen);
  console.log(fieldValidations);
  const newErrors = {
    email: fieldValidations.email ? (isFieldEmpty(values.email) || !isEmailValid(values.email)) : false,
    password: fieldValidations.password ? isFieldEmpty(values.password) : false,
    rgCpf: fieldValidations.rgCpf ? isFieldEmpty(values.rgCpf) : false,
    selectedCondominio: fieldValidations.selectedCondominio ? isFieldEmpty(selectedCondominioTrimmed) : false,
  };

  const getErrorMessage = (field) => {
    if (newErrors[field]) {
      switch (field) {
        case 'email':
          return isFieldEmpty(values.email) ? 'Campo obrigatório.' : isEmailValid(values.email) ? '' : 'Email inválido.';
        case 'password':
          return 'Campo obrigatório.';
        case 'rgCpf':
          return newErrors.rgCpf ? 'Campo obrigatório.' : '';
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
      rgCpf: {
        message: getErrorMessage('rgCpf'),
        type: newErrors.rgCpf ? 'error' : 'success',
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

const screensValidations = {
  agendamento: {
    rgCpf: true,
  },
  login: {
    password: true,
    selectedCondominio: true,
    email: true
  }
};

const ValidateField = (currentScreen) => {
  const validations = { ...screensValidations[currentScreen] };
  return validations;
};
