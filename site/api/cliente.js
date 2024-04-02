import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}condomino`;

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