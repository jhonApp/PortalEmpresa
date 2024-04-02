import axios from 'axios';
import { obterURL } from '../service/urlService';

const API_URL = `${await obterURL()}secao`;

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
    debugger;
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