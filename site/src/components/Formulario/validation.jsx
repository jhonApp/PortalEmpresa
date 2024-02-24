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
  const fieldValidations = ValidateField(currentScreen);
  const errorTypes = {};
  
  Object.keys(fieldValidations).some(field => {
    const isFieldRequired = fieldValidations[field];
    const value = values?.[field];
    console.log(value)
    console.log(field)

    // Verificando se o campo está vazio
    const isEmpty = isFieldEmpty(value);

    if (isFieldRequired && isEmpty) {
      // Campo obrigatório vazio
      errorTypes[field] = {
        message: 'Campo obrigatório.',
        type: 'error',
        errorFound: true
      };
      return true;
    }

    if (!isEmpty) {
      switch (field) {
        case 'email':
          if (!isEmailValid(value)) {
            errorTypes[field] = {
              message: 'Email inválido.',
              type: 'error',
              errorFound: true
            };
            return true;
          }
          break;
        case 'confirmacao':
          if (value === false) {
            errorTypes[field] = {
              message: 'Checked não marcado.',
              type: 'error',
              errorFound: true
            };
            return true; // Sai da iteração se encontrar um erro
          }
          break;
        case 'rgCpf':
          if (!isRgCpfValid(value)) {
            errorTypes[field] = {
              message: 'RG ou CPF inválido.',
              type: 'error',
              errorFound: true
            };
            return true; // Sai da iteração se encontrar um erro
          }
          break;
        default:
          break;
      }
    }

    return false; // Continua para o próximo campo
  });
  console.log(errorTypes)
  return { errorTypes };
};



const screensValidations = {
  agendamento2: {
    dataInicial: true,
    dataFim: true,
    horaEntrada: true,
    horaSaida: true,
  },
  agendamento: {
    rgCpf: true,
    nomeCompleto: true,
    email: true,
    confirmacao: true,
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
const rgRegex = /^\d{9,10}$/;
const cpfRegex = /^\d{11}$/;

// Funções de validação específicas
const isEmailValid = (email) => {
  return isRegexValid(email, emailRegex);
};

const isRgCpfValid = (rgCpf) => {
  return isRegexValid(rgCpf, rgRegex) || isRegexValid(rgCpf, cpfRegex);
};

export { validateForm };
