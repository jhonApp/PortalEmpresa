import axios from 'axios';

const API_URL = 'https://localhost:7243';

export const obterAgendamentoEspecial = async (codigoEmpresa) => {
  try {
    if (!codigoEmpresa) {
      throw new Error('Não foi posível obter a empresa, para realização da consulta.');
    }
    const url = `${API_URL}/agendamentoEspecial/obterVisitanteEspecial?codigoEmpresa=${encodeURIComponent(codigoEmpresa)}`;

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