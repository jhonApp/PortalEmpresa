import axios from 'axios';
import {createDataStorage} from '../service/storageService';

const API_URL = 'https://localhost:7243/usuario';

export const autenticacao = async (email, password, condominio) => {
  try {
    if (!email || !password) {
      throw new Error('Email e senha são campos obrigatórios.');
    }
    const url = `${API_URL}/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(password)}&condominio=${encodeURIComponent(condominio)}`;

    const response = await axios.post(url, {
      withCredentials: true,
    }, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }

    createDataStorage(response);
    return response;

  } catch (error) {
    throw error;
  }
};
