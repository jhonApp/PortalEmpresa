import axios from 'axios';

const API_URL = 'https://localhost:7243/condomino';

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