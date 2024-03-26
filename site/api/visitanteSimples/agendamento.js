import axios from 'axios';

const API_URL = 'https://localhost:7243/agendamento';

export const obterAgendamento = async (codigoEmpresa) => {
  try {
    if (!codigoEmpresa) {
      throw new Error('Não foi posível obter a empresa, para realização da consulta.');
    }
    const url = `${API_URL}/obterVisitanteSimples?codigoEmpresa=${encodeURIComponent(codigoEmpresa)}`;

    const response = await axios.get(url, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const IncluirAgendamento = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirAgendamentoVisitante`;

    const response = await axios.post(url, data, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const IncluirHoraAgendamento = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirHoraAgendamento`;

    const response = await axios.post(url, data, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const excluirAgendamento = async (codigo) => {
  try {
    if (!codigo) {
      throw new Error('O código está nulo.');
    }

    const url = `${API_URL}/deleteAgendamento?codigo=${codigo}`;

    const response = await axios.delete(url);

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AlterarAgendamento = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/alterarAgendamento`;

    const response = await axios.post(url, data, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};