import axios from 'axios';

const API_URL = 'https://localhost:7243/secaoCargo';

export const obterSecaoCargo = async (codigoDepartamentoSetor, codigoCargo) => {
  try {

    if (!codigoCargo) {
      throw new Error('O código da cargo é obrigatório para realizar a consulta.');
    }

    // Objeto para armazenar os parâmetros da solicitação
    const params = { codigoDepartamentoSetor, codigoCargo };

    const response = await axios.get(`${API_URL}/obterSecao`, {
      params,
      validateStatus: status => status < 500
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const incluirSecaoCargo = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/IncluirSecao`;

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

export const excluirSecao = async (codigoEmpresa, codigoDepartamento, codigoSetor) => {
  try {
    if (!codigoSetor) {
      throw new Error('O valor está nulo.');
    }

    const params = { codigoEmpresa, codigoDepartamento, codigoSetor };

    const response = await axios.delete(`${API_URL}/obterSecao`, {
      params,
      validateStatus: status => status < 500
    });

    if (response.status != 200) {
      throw new Error(response.codigoSetor);
    }

    return response;
  } catch (error) {
    throw error;
  }
};