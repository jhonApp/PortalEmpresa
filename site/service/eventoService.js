import { incluirEvento, obterEvento } from "../api/evento";
import { getData } from './storageService';

export const inserirEvento = async (dados) => {
  try {
    
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }
    const storage = getData();
    var eventoDto = {
      CodigoLocal: dados.codigoLocal,
      CodigoFuncionario: storage.codigoFuncionario,
      DataEvento: dados.dataEvento,
      HoraInicio: dados.horaInicio,
      HoraFim: dados.horaFim,
      Descricao: dados.descricao,
      MaximoPessoa: dados.maximoPessoa,
      Observacao: dados.observacao
    }

    const response = await incluirEvento(eventoDto);

    if (response.status !== 200) {
      throw new Error('Erro ao inserir evento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir cartão: ' + error.message);
  }
};
  
export const listarEvento = async () => {
    try {
      const data = await obterEvento();
      
      return data;
    } catch (error) {
      console.error('Erro ao obter dados de evento:', error);
      throw error;
    }
};

// export const getEvento = async (setEventoData, setLoading, setValid) => {
//     try {
//       setLoading(true);
  
//       const data = await listarEvento();
//       setEventoData(data);
  
//       setLoading(false);
//       setValid(true);
//     } catch (error) {
//       console.error('Erro ao obter dados do evento: ', error);
//       setLoading(false);
//       setValid(false);
//     }
// };
