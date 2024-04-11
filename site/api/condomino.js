import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}condomino`;

export const obterCondomino = async () => {
    try {
  
      const response = await axios.get(`${API_URL}/obterCondomino`, {
        validateStatus: status => status < 500
      });
  
      if (response.status !== 200) {
        throw new Error("Condomino não encontrado!");
      }
  
      // Retorna os dados obtidos
      return response.data;
    } catch (error) {
      throw error;
    }
  };