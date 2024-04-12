import { obterSecao, existeSecao, incluirSecao, desassociarSecao } from "../api/secaoDepartamentoSetor";
import { getData } from './storageService';
import { incluirSecaoCargo, obterSecaoCargo } from "../api/secaoCargo";

export const inserirSecao = async (dados) => {
  try {
    
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    const hasSecao = await existeSecao(storage.codigoEmpresa, dados.codigoDepartamento, dados.codigoSetor);
    if (hasSecao) {
        throw new Error(`O Departamento e o Setor, já estão associados.`);
    }
      
    var secaoDto = {
      CodigoDepartamento: dados.codigoDepartamento,
      CodigoSetor: dados.codigoSetor,
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
    }

    // Aguarda a conclusão da função incluirDepartamento
    const response = await incluirSecao(secaoDto);

    if (response.status !== 200) {
      throw new Error('Erro ao inserir departamento, entre em contato com o suporte técnico.');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const inserirSecaoCargo = async (dados) => {
  try {
    
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }
    const storage = getData();
    const secao = await obterSecao(storage.codigoEmpresa, dados.codigoDepartamento, dados.codigoSetor);
    if (secao.codigo == 0) {
        throw new Error(`Não há associação entre o Departamento e o Setor.`);
    }
    
    const existeSecaoCargo = await obterSecaoCargo(secao.codigo, dados.codigoCargo);
    if(existeSecaoCargo){
      throw new Error(`As opções selecionas já estão associadas.`);
    }

    var secaoDto = {
      CodigoDepartamentoSetor: secao.codigo,
      CodigoCargo: dados.codigoCargo,
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
    }

    // Aguarda a conclusão da função incluirDepartamento
    const response = await incluirSecaoCargo(secaoDto);
    if (response.status !== 200) {
      throw new Error('Erro ao realizar associação, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteDepartamento = async (codigoDepartamento) => {
  try {
    if (!codigoDepartamento) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const response = await excluirDepartamento(codigoDepartamento);

    if (response.status !== 200) {
      throw new Error('Erro ao excluir departamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir departamento: ' + error.message);
  }
};
  
export const listarDepartamentos = async () => {
    try {
      const storage = getData();
      const data = await obterDepartamento(storage.codigoEmpresa);

      return data;

    } catch (error) {
      console.error('Erro ao obter dados de agendamento:', error);
      setLoading(false);
      setValid(false);
    }
};

export const deleteSecao = async (codigo) => {
  try {
    if (!codigo) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const response = await desassociarSecao(codigo);

    if (response.status !== 200) {
      throw new Error('Erro ao realizar desassociação, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao desfazer associação: ' + error.message);
  }
};
