import axios from 'axios';

const API_URL = 'https://localhost:7243/agendamentoEspecial';

export const obterAgendamentoEspecial = async (codigoEmpresa) => {
  try {
    if (!codigoEmpresa) {
      throw new Error('Não foi posível obter a empresa, para realização da consulta.');
    }
    const url = `${API_URL}/obterVisitanteEspecial?codigoEmpresa=${encodeURIComponent(codigoEmpresa)}`;

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

export const IncluirAgendamentoEspecial = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirAgendamentoEspecial`;

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