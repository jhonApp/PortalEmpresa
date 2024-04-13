import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}secaoCargo`;

export const obterSecaoCargo = async (codigoDepartamentoSetor, codigoCargo) => {
  try {

    if (!codigoCargo) {
      throw new Error('O código da cargo é obrigatório para realizar a consulta.');
    }

    // Objeto para armazenar os parâmetros da solicitação
    const params = { codigoDepartamentoSetor, codigoCargo };

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

export const incluirSecaoCargo = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/IncluirSecao`;

    const response = await axios.post(url, data, {
      validateStatus: status => status < 500,
    });
    debugger
    if (response.status != 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const ativarSecaoCargo = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }
    
    const url = `${API_URL}/AtivarSecao`;

    const response = await axios.put(url, data, {
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

export const desassociarSecaoCargo = async (codigoDepartamentoSetor, codigoCargo) => {
  try {
    if (!codigoCargo || !codigoDepartamentoSetor) {
      throw new Error('Um ou mais parâmetros estão ausentes.');
    }
    
    const url = `${API_URL}/inativarSecao?codigoCargo=${codigoCargo}&codigoDepartamentoSetor=${codigoDepartamentoSetor}`;

    const response = await axios.put(url);

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

