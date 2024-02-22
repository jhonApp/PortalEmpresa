import {obterVisitante, cadastrar} from '../api/visitante';
import {IncluirAgendamento} from '../api/visitanteSimples/agendamento';
import { obterAgendamento } from '../api/visitanteSimples/agendamento';
import { obterAgendamentoEspecial } from '../api/visitanteEspecial/agendamento';
import { obterAgendamentoPrestador } from '../api/prestadorServico/agendamento';
import { getData } from './storageService';

export const inserirAgendamento = async (dados) => {
    try {
      if (!dados) {
        throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
      }

      // Aguarda a obtenção do visitante
      const visitante = await obterVisitante(dados.rgCpf);
      console.log(visitante);

      // Verifica se o visitante já existe
      if (visitante.data.codigo == 0) {
        // Se não existe, cadastra o visitante
        visitante = await cadastrar(dados);
      }

      const storage = getData();
      const agendamento = {
        codigoVisitante: visitante.data.codigo,
        dataFim: dados.dataFim,
        dataInicial: dados.dataInicial,
        obs: dados.obs,
        codigoUsuario: storage.codigo,
        codigoEmpresa: storage.codigoEmpresa
      }

      const response = await IncluirAgendamento(agendamento);
  
      if (response.status !== 200) {
        throw new Error(response.data);
      }
  
      return response;
    } catch (error) {
      throw error;
    }
};

export const atualizarTabela = async (setAgendamentoData, setLoading, setValid) => {
  try {
    const storage = getData();
    const [data1, data2, data3] = await Promise.all([
      obterAgendamento(storage.codigoEmpresa),
      obterAgendamentoEspecial(storage.codigoEmpresa),
      obterAgendamentoPrestador(storage.codigoEmpresa)
    ]);

    const combinedData = [...data1, ...data2, ...data3];
    console.log(combinedData);
    combinedData.sort((a, b) => new Date(b.dtValid) - new Date(a.dtValid));

    setAgendamentoData(combinedData);
    setLoading(false);
  } catch (error) {
    console.error('Erro ao obter dados de agendamento:', error);
    setLoading(false);
    setValid(false);
  }
};
