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

export const incluirComunicado = async (formData) => {
  try {
    if (!formData) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirComunicado`;

    const response = await axios.post(url, formData, {
      validateStatus: status => status < 500,
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};