import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}comunicado`;

export const obterMural = async () => {
  try {

    const response = await axios.get(`${API_URL}/obterComunicado`, {
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