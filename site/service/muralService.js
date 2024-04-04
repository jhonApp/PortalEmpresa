import { getData } from './storageService';
import { obterMural, incluirComunicado } from "../api/mural";

export const getMural = async (setMuralData, setLoading, setValid) => {
    try {
      setLoading(true);
  
      const data = await obterMural();

      setMuralData(data);
      setLoading(false);
      setValid(true);
    } catch (error) {
      console.error('Erro ao obter dados do comunicado: ', error);
      setLoading(false);
      setValid(false);
    }
};

const processarMural = async (dados, inserirFuncao, alterarFuncao) => {
  try {
    debugger
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    const formData = new FormData();
    const comunicado = {
      TipoComunicado: dados.tipoComunicacao,
      DataFinal: dados.dataFim,
      DataInicial: dados.dataInicial,
      Prioridade: 2,
      Titulo: dados.titulo,
      Mensagem: dados.obs,
      Bloco: dados.blocoTorre,
      Piso: dados.piso,
      Unidade: dados.unidade,
      ApenasResponsaveis: dados.envioResponsavel,
      EnviarParaTodos: dados.enviarParaTodos,
      UsuarioInclusao: storage.codigo
    };

    formData.append('comunicado', JSON.stringify(comunicado));
    formData.append('Anexo', dados.file);
    formData.append('OpcaoEnquete', JSON.stringify(dados.opcaoEnquete));

    const responsePromise = inserirFuncao ? inserirFuncao(formData) : alterarFuncao(formData);

    const response = await responsePromise;

    if (response.status !== 200) {
      throw new Error('Erro ao processar comunicado, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao processar comunicado: ' + error.message);
  }
};

export const inserirComunicado = async (dados) => {
  return processarMural(dados, incluirComunicado, null);
};