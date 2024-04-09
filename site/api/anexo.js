import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}anexo`;

export const obterAnexo = async (codigo) => {
    try {
      if (!codigo) {
        throw new Error('O valor está nulo.');
      }
  
      const response = await axios.get(`${API_URL}/obterAnexo`, {
        params: { codigo },
        validateStatus: status => status < 500
      });
  
      if (response.status !== 200) {
        throw new Error("Anexo não encontrado!");
      }
  
      // Retorna os dados obtidos
      return response.data;
    } catch (error) {
      throw error;
    }
  };