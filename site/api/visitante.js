import axios from 'axios';

const API_URL = 'https://localhost:7243/visitante';

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
    const url = `${API_URL}/cadastrar`; // Ajustar a URL para corresponder à rota correta no servidor

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

