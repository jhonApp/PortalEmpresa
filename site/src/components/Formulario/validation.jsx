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
  const errors = [];

  Object.keys(fieldValidations).forEach(field => {
    const fieldValidation = fieldValidations[field];
    const isFieldRequired = fieldValidation.required;
    const value = values?.[field];

    // Verificando se o campo está vazio
    const isEmpty = isFieldEmpty(value);

    if (isFieldRequired && isEmpty) {
      errors.push({
        field,
        description: fieldValidation.description || field,
        message: 'Campo obrigatório.',
        type: 'error'
      });
    }

    if (!isEmpty) {
      switch (field) {
        case 'email':
          if (!isEmailValid(value)) {
            errors.push({
              field,
              description: fieldValidation.description || field,
              message: 'Email inválido.',
              type: 'error'
            });
          }
          break;
        case 'confirmacao':
          if (value === false) {
            errors.push({
              field,
              description: fieldValidation.description || field,
              message: 'Checked não marcado.',
              type: 'error'
            });
          }
          break;
        case 'rgCpf':
          if (!isRgCpfValid(value)) {
            errors.push({
              field,
              description: fieldValidation.description || field,
              message: 'RG ou CPF inválido.',
              type: 'error'
            });
          }
          break;
        default:
          break;
      }
    }
  });

  return errors;
};

const screensValidations = {
  evento: {
    codigoLocal: { required: true, description: "Local" },
    descricao: { required: true, description: "Descrição" },
    dataEvento: { required: true, description: "Data Evento" },
    horaInicio: { required: true, description: "Hora Inicio" },
    horaFim: { required: true, description: "Hora Fim" },
  },
  espaco: {
    descricao: { required: true, description: "Descrição" },
    descricaoResumida: { required: true, description: "Descrição Resumida" }
  },
  opcaoEnquete: {
    descricao: { required: true, description: "Descrição" },
  },
  enquete: {
    dataInicial: { required: true, description: "Data Inicial" },
    dataFim: { required: true, description: "Data Fim" },
    titulo: { required: true, description: "Título" },
  },
  comunicado: {
    dataInicial: { required: true, description: "Data Inicial" },
    dataFim: { required: true, description: "Data Fim" },
    titulo: { required: true, description: "Título" },
    obs: { required: true, description: "Observação" },
  },
  agendamentoSimples2: {
    dataInicial: { required: true, description: "Data Inicial" },
    horaEntrada: { required: true, description: "Hora Entrada" },
  },
  agendamento2: {
    dataInicial: { required: true, description: "Data Inicial" },
    dataFim: { required: true, description: "Data Fim" },
    horaEntrada: { required: true, description: "Hora Entrada" },
    horaSaida: { required: true, description: "Hora Fim" },
  },
  agendamento: {
    rgCpf: { required: true, description: "RG/CPF" },
    nomeCompleto: { required: true, description: "Nome Completo" },
    email: { required: true, description: "Email" },
    confirmacao: { required: true, description: "Confirmação" },
  },
  agendamentoEmMassa: {
    tipo: { required: true, description: "Tipo" },
  },
  funcionario: {
    nome: { required: true, description: "Nome" },
    dataNascimento: { required: true, description: "Data Nascimento" },
    cpf: { required: true, description: "CPF" },
    rg: { required: true, description: "RG" },
    email: { required: true, description: "Email" },
    telefone: { required: true, description: "Telefone" },
    horaEntrada: { required: true, description: "Hora Entrada" },
    horaSaida: { required: true, description: "Hora Saída" },
  },
  departamento: {
    nome: { required: true, description: "Nome" }
  },
  cartao: {
    numero: { required: true, description: "Cartão" },
  },
  secao: {
    checkedSecao: { required: true, description: "Sessão" },
  },
  login: {
    password: { required: true, description: "Senha" },
    email: { required: true, description: "Email" }
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
