import axios from 'axios';

const API_URL = 'https://localhost:7243/funcionario';

export const obterFuncionario = async (codigoEmpresa, status) => {
  try {
    if (!codigoEmpresa) {
      throw new Error('Código da empresa não fornecido.');
    }
    const url = `${API_URL}/obterFuncionario?codigoEmpresa=${encodeURIComponent(codigoEmpresa)}&status=${encodeURIComponent(status)}`;

    const response = await axios.get(url, {
      validateStatus: status => status < 500,
    });

    if (response.status !== 200) {
      throw new Error(response.data || 'Erro desconhecido ao obter funcionário.');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const inserirFuncionario = async (data, foto) => {
  try {
    debugger;
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

