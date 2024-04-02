import axios from 'axios';

export const obterURL = async () => {
  try {
    const response = await axios.get('http://localhost:7245/url/1031');
    console.log(response);
    return response.data.url;
  } catch (error) {
    console.error('Erro ao obter URL:', error);
    throw error;
  }
};
