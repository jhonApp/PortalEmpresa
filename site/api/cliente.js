import axios from 'axios';
import { obterURL } from '../service/urlService';

const API_URL = `${await obterURL()}condomino`;

export const obterCliente = async () => {
  try {

    const url = `${API_URL}/obterCondominio`;
    const response = await axios.get(url);
    
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return response;
  } catch (error) {
    throw error;
  }
};