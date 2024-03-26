import { obterVisitante, cadastrar } from '../api/visitante';
import { IncluirAgendamento, obterAgendamento, excluirAgendamento, AlterarAgendamento } from '../api/visitanteSimples/agendamento';
import { IncluirAgendamentoEspecial, AlterarAgendamentoEspecial, obterAgendamentoEspecial, excluirAgendamentoEspecial } from '../api/visitanteEspecial/agendamento';
import { IncluirAgendamentoPrestador, AlterarAgendamentoPrestador, obterAgendamentoPrestador, excluirAgendamentoPrestador } from '../api/prestadorServico/agendamento';
import { getData } from './storageService';


// AGENDAMENTO SIMPLES
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

export const alterarAgendamento = async (dados) => {
  try {
    debugger;
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
      codigo: dados.codigo,
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
    const responsePromise = AlterarAgendamento(agendamento);

    // Aguarda a conclusão de todas as promessas
    const [visitanteResponse, response] = await Promise.all([visitantePromise, responsePromise]);

    if (visitanteResponse.status !== 200) {
      throw new Error('Erro ao alterar visitante, entre em contato com o suporte técnico.');
    }

    if (response.status !== 200) {
      throw new Error('Erro ao alterar agendamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao alterar agendamento: ' + error.message);
  }
};

export const excluirAgendamentos = async (codigo, tipo) => {
  try {
    debugger
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

// AGENDAMENTO ESPECIAL
export const alterarAgendamentoEspecial = async (dados) => {
  try {
    debugger;
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
      codigo: dados.codigo,
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
    const responsePromise = AlterarAgendamentoEspecial(agendamento);

    // Aguarda a conclusão de todas as promessas
    const [visitanteResponse, response] = await Promise.all([visitantePromise, responsePromise]);

    if (visitanteResponse.status !== 200) {
      throw new Error('Erro ao alterar visitante, entre em contato com o suporte técnico.');
    }

    if (response.status !== 200) {
      throw new Error('Erro ao alterar agendamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao alterar agendamento: ' + error.message);
  }
};

export const inserirAgendamentoEspecial = async (dados) => {
  try {
    debugger
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


//  AGENDAMENTO PRESTADOR
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

export const alterarAgendamentoPrestador = async (dados) => {
  try {
    debugger;
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
      codigo: dados.codigo,
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
    const responsePromise = AlterarAgendamentoPrestador(agendamento);

    // Aguarda a conclusão de todas as promessas
    const [visitanteResponse, response] = await Promise.all([visitantePromise, responsePromise]);

    if (visitanteResponse.status !== 200) {
      throw new Error('Erro ao alterar visitante, entre em contato com o suporte técnico.');
    }

    if (response.status !== 200) {
      throw new Error('Erro ao alterar agendamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao alterar agendamento: ' + error.message);
  }
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