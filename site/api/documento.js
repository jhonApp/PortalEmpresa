import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}documento`;

export const obterDocumento = async (codigoEmpresa, nome) => {
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

    const response = await axios.get(`${API_URL}/obterDocumento`, {
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

export const incluirDocumento = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirDocumento`;

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

export const excluirDocumento = async (codigoDocumento, codigoEmpresa) => {
  try {
    if (!codigoDocumento) {
      throw new Error('O valor está nulo.');
    }

    const params = { codigoDocumento, codigoEmpresa };

    const response = await axios.delete(`${API_URL}/excluirDocumento`, {
      params,
      validateStatus: status => status < 500
    });

    if (response.status != 200) {
      throw new Error(response.codigoDocumento);
    }

    return response;
  } catch (error) {
    throw error;
  }
};
