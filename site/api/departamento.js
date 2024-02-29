import axios from 'axios';

const API_URL = 'https://localhost:7243/departamento';

export const obterDepartamento = async (codigoEmpresa, nome) => {
  try {

    if (!codigoEmpresa) {
      throw new Error('O código da empresa é obrigatório para realizar a consulta.');
    }

    // Objeto para armazenar os parâmetros da solicitação
    const params = { codigoEmpresa };

    // Verifica se o nome foi fornecido
    if (nome) {
      params.nome = nome;
    }

    const response = await axios.get(`${API_URL}/obterDepartamento`, {
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

export const incluirDepartamento = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/IncluirDepartamento`;

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

export const excluirDepartamento = async (codigoDepartamento) => {
  try {
    if (!codigoDepartamento) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/excluirDepartamento?codigoDepartamento=${codigoDepartamento}`;
    
    const response = await axios.delete(url, codigoDepartamento, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.codigoDepartamento);
    }

    return response;
  } catch (error) {
    throw error;
  }
};