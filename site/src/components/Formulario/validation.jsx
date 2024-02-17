const isFieldEmpty = (value) => {
  if (typeof value === 'string') {
    return !value.trim(); // Verifica se o valor é uma string vazia ou contém apenas espaços em branco
  } else {
    return value === null || value === undefined; // Verifica se o valor é nulo ou indefinido
  }
};

const isRegexValid = (value, regex) => {
  return regex.test(value);
};

const validateForm = (values, currentScreen) => {
  console.log(values)
  const fieldValidations = ValidateField(currentScreen);
  const newErrors = {};
  const errorTypes = {};

  Object.keys(fieldValidations).forEach(field => {
    const isFieldRequired = fieldValidations[field];
    const value = values?.[field];

    // Verificando se o campo está vazio
    const isEmpty = isFieldEmpty(value);

    newErrors[field] = isFieldRequired && isEmpty;

    if (isFieldRequired) {
      switch (field) {
        case 'email':
          errorTypes[field] = {
            message: isEmpty ? 'Campo obrigatório.' : !isEmailValid(value) ? 'Email inválido.' : '',
            type: newErrors[field] ? 'error' : 'success',
          };
          break;
        case 'rgCpf':
          errorTypes[field] = {
            message: isEmpty ? 'Campo obrigatório.' : '',
            type: newErrors[field] ? 'error' : 'success',
          };
          break;
        case 'password':
          errorTypes[field] = {
            message: isEmpty ? 'Campo obrigatório.' : '',
            type: newErrors[field] ? 'error' : 'success',
          };
          break;
        case 'checked':
        case 'nomeCompleto':
        case 'selectedCondominio':
          errorTypes[field] = {
            message: isEmpty ? 'Campo obrigatório.' : '',
            type: newErrors[field] ? 'error' : 'success',
          };
          break;
        default:
          break;
      }
    }
  });

  return { newErrors, errorTypes };
};


const screensValidations = {
  agendamento: {
    rgCpf: true,
    nomeCompleto: true,
    email: true
  },
  login: {
    password: true,
    selectedCondominio: true,
    email: true
  }
};

const ValidateField = (currentScreen) => {
  return { ...screensValidations[currentScreen] };
};

// Expressões regulares
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rgRegex = /^\d{2}\.\d{3}\.\d{3}-\d{1,2}$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

// Funções de validação específicas
const isEmailValid = (email) => {
  return isRegexValid(email, emailRegex);
};

const isRgCpfValid = (rgCpf) => {
  return isRegexValid(rgCpf, rgRegex) || isRegexValid(rgCpf, cpfRegex);
};

export { validateForm };
