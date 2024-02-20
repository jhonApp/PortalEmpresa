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
  const newErrors = {};
  const errorTypes = {};
  let errorFound = false; // Variável de controle para verificar se um erro foi encontrado

  Object.keys(fieldValidations).forEach(field => {
    const isFieldRequired = fieldValidations[field];
    const value = values?.[field];

    // Verificando se o campo está vazio
    const isEmpty = isFieldEmpty(value);

    newErrors[field] = isFieldRequired && isEmpty;
    //debugger;
    if (isFieldRequired && isEmpty) {
      // Campo obrigatório vazio
      errorTypes[field] = {
        message: 'Campo obrigatório.',
        type: 'error',
        errorFound: true
      };
    } else if (!isEmpty) {
      switch (field) {
        case 'email':
          if (!isEmailValid(value)) {
            errorTypes[field] = {
              message: 'Email inválido.',
              type: 'error',
              errorFound: true
            };
          }
          break;
        case 'rgCpf':
          if (!isRgCpfValid(value)) {
            errorTypes[field] = {
              message: 'RG ou CPF inválido.',
              type: 'error',
              errorFound: true
            };
          }
          break;
        default:
          break;
      }
    }
  });

  return { errorTypes };
};




const screensValidations = {
  agendamento2: {
    dataInicial: true,
    dataFim: true,
    horaEntrada: true,
    horaSaida: true
  },
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
