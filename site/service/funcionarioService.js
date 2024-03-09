import { obterFuncionario } from '../api/funcionario';
import { getData } from './storageService';

export const atualizarTabela = async (setFuncionarioData, setLoading, setValid) => {
    try {
        const storage = getData();
        const data = await  obterFuncionario(storage.codigoEmpresa);
        console.log(data)
        setFuncionarioData(data.sort((a, b) => new Date(b.dtValid) - new Date(a.dtValid)));
        setLoading(false);
    } catch (error) {
        console.error('Erro ao obter dados do funcionario: ', error);
        setLoading(false);
        setValid(false);
    }
};

export const inserirFuncionario = async (dados) => {
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