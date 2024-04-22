import axios from 'axios';

export const obterConexao = async () => {
  try {
    const response = await axios.get('http://localhost:7245/url/');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter URL:', error);
    throw error;
  }
};
