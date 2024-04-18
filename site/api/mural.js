import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}comunicado`;

export const obterMural = async (codigoUsuario) => {
  try {

    const response = await axios.get(`${API_URL}/obterComunicado?codigoUsuario=${codigoUsuario}`, {
      validateStatus: status => status < 500
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const obterNaoVisualizados = async () => {
  try {

    const response = await axios.get(`${API_URL}/obterNaoVisualizado`, {
      validateStatus: status => status < 500
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const incluirComunicado = async (formData) => {
  try {
    if (!formData) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/incluirComunicado`;

    const response = await axios.post(url, formData, {
      validateStatus: status => status < 500,
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const alterarVisualizacao = async (codigoComunicado, codigoUsuario) => {
  try {
    if (!codigoComunicado || !codigoUsuario) {
      throw new Error('O código do comunicado e do usuário são obrigatórios para realizar a consulta.');
    }

    const response = await axios.post(`${API_URL}/registrarVisualizacao?codigoComunicado=${codigoComunicado}&codigoUsuario=${codigoUsuario}`);

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const alterarRecebimento = async (codigoComunicado, codigoUsuario) => {
  try {
    if (!codigoUsuario) {
      throw new Error('O código do usuário são obrigatórios para realizar a consulta.');
    }

    const response = await axios.post(`${API_URL}/registrarRecebimento?codigoComunicado=${codigoComunicado}&codigoUsuario=${codigoUsuario}`);

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const incluirRecebimento = async (codigoUsuario, codigoComunicado) => {
  try {
    const response = await axios.post(`${API_URL}/registrarVisualizacao?codigoComunicado=${codigoComunicado}&codigoUsuario=${codigoUsuario}`);

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const inserirVotoEnquete = async (codigoUsuario, codigoComunicado, opcaoEnquete) => {
  try {
    debugger
    const response = await axios.post(`${API_URL}/registrarVoto?codigoComunicado=${codigoComunicado}&codigoUsuario=${codigoUsuario}&opcaoVoto=${opcaoEnquete}`);

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    // Retorna os dados obtidos
    return response.data;
  } catch (error) {
    throw error;
  }
};