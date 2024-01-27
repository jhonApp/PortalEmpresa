import axios from 'axios';

const API_URL = 'https://localhost:7243/condomino';

export const autenticacao = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error('Email e senha são campos obrigatórios.');
    }
    const url = `${API_URL}/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(password)}`;

    const response = await axios.post(url, {
      withCredentials: true,
    }, {
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
