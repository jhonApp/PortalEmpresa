import { obterSetor,incluirSetor,excluirSetor,updateSetor } from "../api/setor";
import { getData } from './storageService';

export const inserirSetor = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    const setor = await obterSetor(storage.codigoEmpresa, dados.nome);
    if (setor.data != null) {
      throw new Error('Setor já foi registrado.');
    }

    var setorDto = {
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
      Nome: dados.nome
    }

    const response = await incluirSetor(setorDto);

    if (response.status !== 200) {
      throw new Error('Erro ao inserir setor, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir setor: ' + error.message);
  }
};

export const deleteSetor = async (codigoSetor) => {
  try {
    if (!codigoSetor) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const response = await excluirSetor(codigoSetor);

    if (response.status !== 200) {
      throw new Error('Erro ao excluir setor, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir setor: ' + error.message);
  }
};
  
export const listarSetor = async () => {
    try {
      const storage = getData();
      const data = obterSetor(storage.codigoEmpresa);

      return data;

    } catch (error) {
      console.error('Erro ao obter dados de setor:', error);
      setLoading(false);
      setValid(false);
    }
};

export const alterarSetor = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    var setorDto = {
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
      Nome: dados.nome,
      Codigo: dados.codigo
    }

    const response = await updateSetor(setorDto);

    if (response.status !== 200) {
      throw new Error('Erro ao alterar setor, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao alterar setor: ' + error.message);
  }
};
