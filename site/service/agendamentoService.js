import { obterVisitante, cadastrar, alterar } from '../api/visitante';
import { IncluirAgendamento, obterAgendamento, excluirAgendamento, AlterarAgendamento } from '../api/visitanteSimples/agendamento';
import { IncluirAgendamentoEspecial, AlterarAgendamentoEspecial, obterAgendamentoEspecial, excluirAgendamentoEspecial } from '../api/visitanteEspecial/agendamento';
import { IncluirAgendamentoPrestador, AlterarAgendamentoPrestador, obterAgendamentoPrestador, excluirAgendamentoPrestador } from '../api/prestadorServico/agendamento';
import { getData } from './storageService';

const processarAgendamento = async (dados, inserirFuncao, alterarFuncao) => {
  try {
    
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    // Obter o visitante
    const visitanteResponse = await obterVisitante(dados.rgCpf);
    let visitante = visitanteResponse.data;

    // Verificar se o visitante já existe
    if (visitante.codigo == 0) {
      // Se não existe, cadastrar o visitante
      visitante = await cadastrar(dados);
      dados.codigoVisitante = visitante.data.codigo;
    } else {
      // Se existe, alterar o visitante
      dados.codigoVisitante = visitanteResponse.data.codigo;
      visitante = await alterar(dados);
    }

    const storage = getData();
    const agendamento = {
      codigo: dados.codigoAgendamento,
      codigoVisitante: dados.codigoVisitante,
      dataFim: dados.dataFim,
      dataInicial: dados.dataInicial,
      horaEntrada: dados.horaEntrada,
      horaSaida: dados.horaSaida,
      obs: dados.obs,
      codigoUsuario: storage.codigo,
      codigoEmpresa: storage.codigoEmpresa,
      codigoFuncionario: storage.codigoFuncionario,
      chegada: dados.chegada
    };

    // Enviar a solicitação de inclusão ou alteração de agendamento
    const responsePromise = inserirFuncao ? inserirFuncao(agendamento) : alterarFuncao(agendamento);

    // Aguardar a conclusão de todas as promessas
    const response = await responsePromise;

    if (response.status !== 200) {
      throw new Error('Erro ao processar agendamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao processar agendamento: ' + error.message);
  }
};

export const inserirAgendamento = async (dados) => {
  return processarAgendamento(dados, IncluirAgendamento, null);
};

export const alterarAgendamento = async (dados) => {
  return processarAgendamento(dados, null, AlterarAgendamento);
};

export const excluirAgendamentos = async (codigo, tipo) => {
  try {
    if (!codigo || !tipo) {
      throw new Error('Os valores estão nulos. Por favor, entre em contato com o suporte.');
    }

    const tipoParaFuncao = {
      'Visitante Simples': excluirAgendamento,
      'Prestador de Serviço': excluirAgendamentoPrestador,
      'Visitante Especial': excluirAgendamentoEspecial
    };

    const funcaoExclusao = tipoParaFuncao[tipo];

    if (!funcaoExclusao) {
      throw new Error('Tipo de agendamento desconhecido.');
    }

    const response = await funcaoExclusao(codigo);

    return response;
  } catch (error) {
    throw new Error('Erro ao excluir agendamento: ' + error.message);
  }
};

export const inserirAgendamentoEspecial = async (dados) => {
  return processarAgendamento(dados, IncluirAgendamentoEspecial, null);
};

export const alterarAgendamentoEspecial = async (dados) => {
  return processarAgendamento(dados, null, AlterarAgendamentoEspecial);
};

export const inserirAgendamentoPrestador = async (dados) => {
  return processarAgendamento(dados, IncluirAgendamentoPrestador, null);
};

export const alterarAgendamentoPrestador = async (dados) => {
  return processarAgendamento(dados, null, AlterarAgendamentoPrestador);
};

//  AGENDAMENTO MASSA
export const inserirAgendamentoEmMassa = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    // Array para armazenar todas as promessas de inserção de agendamento
    const insercoesAgendamento = [];

    for (let i = 0; i < dados.visitantes.length; i++) {
      const data = dados.visitantes[i];

      // Espera a obtenção do visitante
      const visitante = await obterEInserirVisitante(data.visDoc, data);

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

      // Adiciona a promessa de inserção de agendamento ao array
      if (dados.tipo == "agendamentoVisitante") {
        insercoesAgendamento.push(IncluirAgendamentoEspecial(agendamento));
      } else {
        insercoesAgendamento.push(IncluirAgendamentoPrestador(agendamento));
      }

      // Aguarda a conclusão da inserção do agendamento atual antes de prosseguir para o próximo
      await insercoesAgendamento[i];
    }

    // Aguarda a conclusão de todas as inserções de agendamento sequencialmente
    const resultados = await Promise.all(insercoesAgendamento);

    // Verifica se todos os agendamentos foram inseridos com sucesso
    resultados.forEach((result) => {
      if (result.status !== 200) {
        throw new Error('Erro ao inserir agendamento, entre em contato com o suporte técnico.');
      }
    });

    return resultados;
  } catch (error) {
    throw new Error('Erro ao inserir agendamento: ' + error.message);
  }
};

async function obterEInserirVisitante(visDoc, data) {
  // Espera a obtenção do visitante
  const visitante = await obterVisitante(visDoc);

  // Verifica se o visitante já existe
  if (visitante.data.codigo == 0) {
    const dataVisitante = {
      nomeCompleto: data.visName,
      rgCpf: visDoc,
      email: data.visEmail,
      telefone: data.visTel,
    };
    // Se não existe, cadastra o visitante e espera a conclusão
    const response = await cadastrar(dataVisitante);
    return response;
  }

  return visitante;
}

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
