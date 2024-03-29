import { obterCartao, incluirCartao, excluirCartao, updateCartao } from "../api/cartao";
import { getData } from './storageService';

export const inserirCartao = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    const cargo = await obterCartao(storage.codigoEmpresa, dados.numero);
    if (cargo.data != null) {
      throw new Error('Cartão já foi registrado.');
    }

    var cartaoDto = {
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
      CodigoCartao: dados.numero
    }

    const response = await incluirCartao(cartaoDto);

    if (response.status !== 200) {
      throw new Error('Erro ao inserir cartão, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir cartão: ' + error.message);
  }
};

export const deleteCartao = async (codigoCartao) => {
  try {
    if (!codigoCartao) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }
    const storage = getData();
    const response = await excluirCartao(codigoCartao, storage.codigoEmpresa);

    if (response.status !== 200) {
      throw new Error('Erro ao excluir cartão, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir cartão: ' + error.message);
  }
};
  
export const listarCartao = async () => {
    try {
      const storage = getData();
      const data = await obterCartao(storage.codigoEmpresa);
      
      return data;
    } catch (error) {
      console.error('Erro ao obter dados de cartão:', error);
      throw error;
    }
};

export const getCartao = async (setCartaoData, setLoading, setValid) => {
    try {
      setLoading(true);
  
      const dataCartao = await listarCartao();
      setCartaoData(dataCartao);
  
      setLoading(false);
      setValid(true);
    } catch (error) {
      console.error('Erro ao obter dados do cartão: ', error);
      setLoading(false);
      setValid(false);
    }
};

export const alterarCartao = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    var cartaoDto = {
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
      CodigoCartao: dados.codigoCartao
    }

    const response = await updateCartao(cartaoDto);

    if (response.status !== 200) {
      throw new Error('Erro ao alterar setor, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao alterar setor: ' + error.message);
  }
};
