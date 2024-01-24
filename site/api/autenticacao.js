import axios from 'axios';

const API_URL = 'https://localhost:7243/condomino';

export const autenticacao = async (email, password) => {
  try {
    console.log(email);
    console.log(password);
    if (!email || !password) {
      throw new Error('Email e senha são campos obrigatórios.');
    }

    // Construa a URL com os parâmetros
    const url = `${API_URL}/login?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(password)}`;

    // Envie a solicitação POST
    const response = await axios.post(url, {
      withCredentials: true,
    });

    console.log(response);
    
    if (response.status === 404) {
      throw new Error('Usuário não encontrado. Verifique seu e-mail e senha.');
    }

    return response;
  } catch (error) {
    throw error;
  }
};
