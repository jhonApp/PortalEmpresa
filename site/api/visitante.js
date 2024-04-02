import axios from 'axios';
import { obterURL } from '../service/urlService';

const API_URL = `${await obterURL()}visitante`;

export const obterVisitante = async (documento) => {
  try {
    if (!documento) {
      throw new Error('Documento é obrigatório.');
    }
    const url = `${API_URL}/obterVisitante?documento=${encodeURIComponent(documento)}`;
    const response = await axios.get(url);
    
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const cadastrar = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }
    const url = `${API_URL}/cadastrar`;

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

export const alterar = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }
    const url = `${API_URL}/alterar`; 

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

