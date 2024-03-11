import axios from 'axios';

const API_URL = 'https://localhost:7243/funcionario';

export const obterFuncionario = async (codigoEmpresa) => {
  try {
    if (!codigoEmpresa) {
      throw new Error('Não foi posível obter a empresa, para realização da consulta.');
    }
    const url = `${API_URL}/obterFuncionario?codigoEmpresa=${encodeURIComponent(codigoEmpresa)}`;

    const response = await axios.get(url, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const inserirFuncionario = async (data, foto) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const formData = new FormData();
    
    // Adicione os dados do funcionário dentro da chave "funcionario" no FormData
    formData.append('funcionario', JSON.stringify(data));

    // Adicione a imagem do funcionário
    if (foto) {
      formData.append('foto', foto);
    }

    const url = `${API_URL}/inserirFuncionario`;

    const response = await axios.post(url, formData, {
      validateStatus: status => status < 500,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

