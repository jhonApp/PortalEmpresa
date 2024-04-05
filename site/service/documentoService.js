import { obterDocumento, incluirDocumento, excluirDocumento } from "../api/documento";
import { getData } from './storageService';

export const inserirDocumento = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }
    
    const storage = getData();
    const documento = await obterDocumento(storage.codigoEmpresa, dados.numero);
    if (documento.data != null) {
      throw new Error('Documento já foi registrado.');
    }
    const formData = new FormData();
    formData.append('arquivo', dados.file);

    const response = await incluirDocumento(formData);
    
    if (response.status !== 200) {
      throw new Error('Erro ao inserir documento, entre em contato com o suporte técnico.');
    }

    return response.data;
  } catch (error) {
    throw new Error('Erro ao inserir cartão: ' + error.message);
  }
};

export const deleteDocumento = async (codigo) => {
  try {
    if (!codigo) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }
    const storage = getData();
    const response = await excluirDocumento(codigo, storage.codigoEmpresa);

    if (response.status !== 200) {
      throw new Error('Erro ao excluir documento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao deletar documento: ' + error.message);
  }
};
  
export const listarDocumento = async () => {
    try {
        
      const storage = getData();
      const data = await obterDocumento(storage.codigoEmpresa);
      
      return data;
    } catch (error) {
      console.error('Erro ao obter dados dos documentos:', error);
      throw error;
    }
};

export const getDocumento = async (setDocumentoData, setLoading, setValid) => {
    try {
      setLoading(true);
  
      const dataDocumento = await listarDocumento();
      setDocumentoData(dataDocumento);
  
      setLoading(false);
      setValid(true);
    } catch (error) {
      console.error('Erro ao obter dados do documento: ', error);
      setLoading(false);
      setValid(false);
    }
};