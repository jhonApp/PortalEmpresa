import axios from 'axios';

const API_URL = 'https://localhost:7243/setor';

export const obterSetor = async (codigoEmpresa, nome) => {
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

    const response = await axios.get(`${API_URL}/obterSetor`, {
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

export const incluirSetor = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/IncluirSetor`;

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

export const excluirSetor = async (codigoSetor) => {
  try {
    if (!codigoSetor) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/excluirSetor?codigoSetor=${codigoSetor}`;
    
    const response = await axios.delete(url, codigoSetor, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.codigoSetor);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateSetor = async (data) => {
  try {
    
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/AlterarSetor`;

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