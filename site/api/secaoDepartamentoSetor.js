import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}secao`;

export const existeSecao = async (codigoEmpresa, codigoDepartamento, codigoSetor) => {
  try {

    if (!codigoEmpresa) {
      throw new Error('O código da empresa é obrigatório para realizar a consulta.');
    }

    // Objeto para armazenar os parâmetros da solicitação
    const params = { codigoEmpresa, codigoDepartamento, codigoSetor };

    const response = await axios.get(`${API_URL}/existeSecao`, {
      params,
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

export const obterSecao = async (codigoEmpresa, codigoDepartamento, codigoSetor) => {
  try {

    if (!codigoEmpresa) {
      throw new Error('O código da empresa é obrigatório para realizar a consulta.');
    }

    // Objeto para armazenar os parâmetros da solicitação
    const params = { codigoEmpresa, codigoDepartamento, codigoSetor };

    const response = await axios.get(`${API_URL}/obterSecao`, {
      params,
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

export const incluirSecao = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/IncluirSecao`;

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

export const excluirSecao = async (codigoEmpresa, codigoDepartamento, codigoSetor) => {
  try {
    if (!codigoSetor) {
      throw new Error('O valor está nulo.');
    }

    const params = { codigoEmpresa, codigoDepartamento, codigoSetor };

    const response = await axios.delete(`${API_URL}/obterSecao`, {
      params,
      validateStatus: status => status < 500
    });

    if (response.status != 200) {
      throw new Error(response.codigoSetor);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const desassociarSecao = async (codigo) => {
  try {
    if (!codigo) {
      throw new Error('O valor está nulo.');
    }

    const response = await axios.put(`${API_URL}/inativarSecao?codigo=${codigo}`, {
      validateStatus: status => status < 500
    });

    if (response.status != 200) {
      throw new Error(response.codigoSetor);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const ativarSecao = async (codigo) => {
  try {
    if (!codigo) {
      throw new Error('O valor está nulo.');
    }
    
    const response = await axios.put(`${API_URL}/ativarSecao?codigo=${codigo}`, {
      validateStatus: status => status < 500
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};