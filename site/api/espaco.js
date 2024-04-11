import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}espaco`;

export const obterEspaco = async () => {
  try {
    
    const response = await axios.get(`${API_URL}/obterEspaco`, {
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

export const incluirEspaco = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirEspaco`;

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

export const excluirEspaco = async (codigoEspaco) => {
  try {
    if (!codigoEspaco) {
      throw new Error('O valor está nulo.');
    }

    const params = { codigoEspaco };
    
    const response = await axios.delete(`${API_URL}/excluirEspaco`, {
      params,
      validateStatus: status => status < 500
    });
    
    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateEspaco = async (data) => {
  try {
    
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/alterarEspaco`;

    const response = await axios.put(url, data, {
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

export const obterFoto = async (codigo) => {
  try {
    if (!codigo) {
      throw new Error('O Local não foi selecionado.');
    }

    const response = await axios.get(`${API_URL}/obterFoto`, {
      params: { codigo },
      validateStatus: status => status < 500
    });
    
    if (response.status !== 200) {
      throw new Error("Foto não encontrada!");
    }

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error;
  }
};