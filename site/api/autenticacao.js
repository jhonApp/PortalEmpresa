import axios from 'axios';
import {createDataStorage} from '../service/storageService';

export const autenticacao = async (email, password, condominioUrl) => {
  try {
    if (!email || !password) {
      throw new Error('Email e senha são campos obrigatórios.');
    }

    const url = `${condominioUrl}usuario/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(password)}`;
    
    const response = await axios.post(url, {
      withCredentials: true,
    }, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }

    createDataStorage(response, condominioUrl);
    return response;

  } catch (error) {
    throw error;
  }
};
