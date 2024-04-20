import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}cartao`;

export const obterCartao = async (codigoEmpresa, nome) => {
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

    const response = await axios.get(`${API_URL}/obterCartao`, {
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

export const incluirCartao = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirCartao`;

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

export const excluirCartao = async (codigoCartao, codigoEmpresa) => {
  try {
    if (!codigoCartao) {
      throw new Error('O valor está nulo.');
    }

    const params = { codigoCartao, codigoEmpresa };

    const response = await axios.delete(`${API_URL}/excluirCartao`, {
      params,
      validateStatus: status => status < 500
    });

    if (response.status != 200) {
      throw new Error(response.codigoCartao);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCartao = async (data) => {
  try {
    
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/alterarCartao`;

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

export const obterContagemCartao = async (codigoEmpresa) => {
  try {
    if (!codigoEmpresa) {
      throw new Error('Código da empresa não fornecido.');
    }
    const url = `${API_URL}/obterContagemCartao?codigoEmpresa=${encodeURIComponent(codigoEmpresa)}`;

    const response = await axios.get(url, {
      validateStatus: status => status < 500,
    });

    if (response.status !== 200) {
      throw new Error(response.data || 'Erro desconhecido ao obter cartão.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};