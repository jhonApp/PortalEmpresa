import { obterVisitante, cadastrar } from '../api/visitante';
import { IncluirAgendamento } from '../api/visitanteSimples/agendamento';
import { IncluirAgendamentoEspecial } from '../api/visitanteEspecial/agendamento';
import { IncluirAgendamentoPrestador } from '../api/prestadorServico/agendamento';
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
    const visitantePromise = obterVisitante(dados.rgCpf);

    // Verifica se o visitante já existe
    let visitante = await visitantePromise;
    if (visitante.data.codigo == 0) {
      // Se não existe, cadastra o visitante
      visitante = await cadastrar(dados);
    }

    const storage = getData();
    const agendamento = {
      codigoVisitante: visitante.data.codigo,
      dataFim: dados.dataFim,
      horaEntrada: dados.horaEntrada,
      horaSaida: dados.horaSaida,
      dataInicial: dados.dataInicial,
      obs: dados.obs,
      codigoUsuario: storage.codigo,
      codigoEmpresa: storage.codigoEmpresa,
      codigoFuncionario: storage.codigoFuncionario,
      chegada: dados.chegada
    };

    // Envia a solicitação de inclusão de agendamento
    const responsePromise = IncluirAgendamento(agendamento);

    // Aguarda a conclusão de todas as promessas
    const [visitanteResponse, response] = await Promise.all([visitantePromise, responsePromise]);

    if (visitanteResponse.status !== 200) {
      throw new Error('Erro ao inserir visitante, entre em contato com o suporte técnico.');
    }

    if (response.status !== 200) {
      throw new Error('Erro ao inserir agendamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir agendamento: ' + error.message);
  }
};

export const inserirAgendamentoEspecial = async (dados) => {
  try {
    
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    // Aguarda a obtenção do visitante
    const visitantePromise = obterVisitante(dados.rgCpf);

    // Verifica se o visitante já existe
    let visitante = await visitantePromise;
    if (visitante.data.codigo == 0) {
      // Se não existe, cadastra o visitante
      visitante = await cadastrar(dados);
    }

    const storage = getData();
    const agendamento = {
      codigoVisitante: visitante.data.codigo,
      dataFim: dados.dataFim,
      horaEntrada: dados.horaEntrada,
      horaSaida: dados.horaSaida,
      dataInicial: dados.dataInicial,
      obs: dados.obs,
      codigoUsuario: storage.codigo,
      codigoEmpresa: storage.codigoEmpresa,
      codigoFuncionario: storage.codigoFuncionario,
      chegada: dados.chegada
    };

    // Envia a solicitação de inclusão de agendamento
    const responsePromise = IncluirAgendamentoEspecial(agendamento);

    // Aguarda a conclusão de todas as promessas
    const [visitanteResponse, response] = await Promise.all([visitantePromise, responsePromise]);

    if (visitanteResponse.status !== 200) {
      throw new Error('Erro ao inserir visitante, entre em contato com o suporte técnico.');
    }

    if (response.status !== 200) {
      throw new Error('Erro ao inserir agendamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir agendamento: ' + error.message);
  }
};

export const inserirAgendamentoPrestador = async (dados) => {
  try {
    
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    // Aguarda a obtenção do visitante
    const visitantePromise = obterVisitante(dados.rgCpf);

    // Verifica se o visitante já existe
    let visitante = await visitantePromise;
    if (visitante.data.codigo == 0) {
      // Se não existe, cadastra o visitante
      visitante = await cadastrar(dados);
    }

    const storage = getData();
    const agendamento = {
      codigoVisitante: visitante.data.codigo,
      dataFim: dados.dataFim,
      horaEntrada: dados.horaEntrada,
      horaSaida: dados.horaSaida,
      dataInicial: dados.dataInicial,
      obs: dados.obs,
      codigoUsuario: storage.codigo,
      codigoEmpresa: storage.codigoEmpresa,
      codigoFuncionario: storage.codigoFuncionario,
      chegada: dados.chegada
    };

    // Envia a solicitação de inclusão de agendamento
    const responsePromise = IncluirAgendamentoPrestador(agendamento);

    // Aguarda a conclusão de todas as promessas
    const [visitanteResponse, response] = await Promise.all([visitantePromise, responsePromise]);

    if (visitanteResponse.status !== 200) {
      throw new Error('Erro ao inserir visitante, entre em contato com o suporte técnico.');
    }

    if (response.status !== 200) {
      throw new Error('Erro ao inserir agendamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir agendamento: ' + error.message);
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
    combinedData.sort((a, b) => new Date(b.dtValid) - new Date(a.dtValid));

    setAgendamentoData(combinedData);
    setLoading(false);
  } catch (error) {
    console.error('Erro ao obter dados de agendamento:', error);
    setLoading(false);
    setValid(false);
  }
};
