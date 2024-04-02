import axios from 'axios';

// export const obterURL = async () => {
//   try {
//     const response = await axios.get('http://localhost:7245/url/');
//     console.log("chamando OBTER-URL");
//     return response.data.url;
//   } catch (error) {
//     console.error('Erro ao obter URL:', error);
//     throw error;
//   }
// };

export const obterConexao = async () => {
  try {
    const response = await axios.get('http://localhost:7245/url/');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter URL:', error);
    throw error;
  }
};
