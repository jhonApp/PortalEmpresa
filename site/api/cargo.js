import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}cargo`;

export const obterCargo = async (codigoEmpresa, nome) => {
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

    const response = await axios.get(`${API_URL}/obterCargo`, {
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

export const obterCargoPorStatus = async (codigoEmpresa, nome) => {
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

    const response = await axios.get(`${API_URL}/obterCargoPorStatus`, {
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

export const incluirCargo = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirCargo`;

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

export const excluirCargo = async (codigoCargo) => {
  try {
    if (!codigoCargo) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/excluirCargo?codigoCargo=${codigoCargo}`;
    
    const response = await axios.delete(url, codigoCargo, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.codigoCargo);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCargo = async (data) => {
  try {
    
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/alterarCargo`;

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