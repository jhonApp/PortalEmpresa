import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}acesso`;

export const listarAcessos = async (periodoInicial, periodoFinal) => {
  try {

    if (!periodoInicial && !periodoFinal) {
      throw new Error('Os períodos é obrigatório para realizar a consulta.');
    }

    // Objeto para armazenar os parâmetros da solicitação
    const params = { periodoInicial, periodoFinal};

    const response = await axios.get(`${API_URL}/obterAcessos`, {
      params,
      validateStatus: status => status < 500
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    // Retorna os dados obtidos
    debugger;
    return response.data;
  } catch (error) {
    throw error;
  }
};