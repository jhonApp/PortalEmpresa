import { obterCargo, incluirCargo, excluirCargo } from "../api/cargo";
import { getData } from './storageService';

export const inserirCargo = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    const cargo = await obterCargo(storage.codigoEmpresa, dados.nome);
    if (cargo.data != null) {
      throw new Error('Cargo já foi registrado.');
    }

    var cargoDto = {
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
      Nome: dados.nome
    }

    const response = await incluirCargo(cargoDto);

    if (response.status !== 200) {
      throw new Error('Erro ao inserir cargo, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir cargo: ' + error.message);
  }
};

export const deleteCargo = async (codigoCargo) => {
  try {
    if (!codigoCargo) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const response = await excluirCargo(codigoCargo);

    if (response.status !== 200) {
      throw new Error('Erro ao excluir cargo, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir cargo: ' + error.message);
  }
};
  
export const listarCargo = async () => {
    try {
      const storage = getData();
      const data = await obterCargo(storage.codigoEmpresa);

      return data;

    } catch (error) {
      console.error('Erro ao obter dados de cargo:', error);
      setLoading(false);
      setValid(false);
    }
};
