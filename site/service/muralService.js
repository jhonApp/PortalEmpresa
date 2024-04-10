import { getData } from './storageService';
import { obterMural, incluirComunicado, obterNaoVisualizados, alterarVisualizacao, incluirRecebimento } from "../api/mural";
import { obterAnexo } from "../api/anexo";

export const getMural = async (setMuralData, setLoading, setValid) => {
    try {
      setLoading(true);
      const storage = getData();
      const data = await obterMural(storage.codigo);

      setMuralData(data);
      setLoading(false);
      setValid(true);
    } catch (error) {
      console.error('Erro ao obter dados do comunicado: ', error);
      setLoading(false);
      setValid(false);
    }
};

export const getNaoVisualizados = async (setMuralData, setLoading, setValid) => {
  try {
    setLoading(true);

    const storage = getData();
    const data = await obterMural(storage.codigo);
    const registrosFiltrados = data.filter(registro => registro.status === 'Não Visualizado');

    // Mapear os tipos de comunicado para os tipos de exibição correspondentes
    const muralAtualizado = registrosFiltrados.map(registro => {
      switch (registro.descricaoTipoComunicado) {
        case 'Enquete':
          return { ...registro, tipoExibicao: 'ExibirEnquete', tituloPopup: 'Nova Enquete!' };
        case 'Comunicado':
          return { ...registro, tipoExibicao: 'ExibirComunicado', tituloPopup: 'Novo Comunicado!' };
        case 'Encomenda':
          return { ...registro, tipoExibicao: 'ExibirEncomenda', tituloPopup: 'Nova Encomenda!' };
        default:
          return registro;
      }
    });
    
    setMuralData(muralAtualizado);
    setLoading(false);
    setValid(true);

    return muralAtualizado;
  } catch (error) {
    console.error('Erro ao obter dados do comunicado: ', error);
    setLoading(false);
    setValid(false);
  }
};

export const getAnexo = async (codigo) => {
  try {
      
    const data = await obterAnexo(codigo);
    
    return data;
  } catch (error) {
    throw error;
  }
};

const processarMural = async (dados, inserirFuncao, alterarFuncao) => {
  try {
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
    
    if (dados.files && dados.files.length > 0) {
      dados.files.forEach(file => {
        formData.append('Anexo', file);
      });
    }

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

export const registrarVisualizacao = async (codigoComunicado) => {
  try {
    const storage = getData();
    const data = await alterarVisualizacao(codigoComunicado, storage.codigo);

    return data;

  } catch (error) {
    console.error('Erro ao obter dados de cargo:', error);
    setLoading(false);
    setValid(false);
  }
};

const enqueteVoto = async (data) => {
  try {
    const storage = getData();

    const voto = {
      CodigoEnquete: data.enquete,
      CodigoOpcao: data.opcao,
      CodigoUsuario: storage.codigo
    }

    const response = await inserirVotoEnquete(voto);

  } catch (error) {
    console.error('Erro ao incluir recebimento:', error);
    setLoading(false);
    setValid(false);
  }
};
