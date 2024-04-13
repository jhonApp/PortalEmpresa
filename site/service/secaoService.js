import { obterSecao, existeSecao, incluirSecao, desassociarSecao, ativarSecao } from "../api/secaoDepartamentoSetor";
import { getData } from './storageService';
import { incluirSecaoCargo, obterSecaoCargo, desassociarSecaoCargo, ativarSecaoCargo } from "../api/secaoCargo";

export const inserirSecao = async (dados) => {
  try {
    
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
      
    var secaoDto = {
      CodigoDepartamento: dados.codigoDepartamento,
      CodigoSetor: dados.codigoSetor,
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
    }

    const secao = await obterSecao(storage.codigoEmpresa, dados.codigoDepartamento, dados.codigoSetor);
    if (secao.codigo != 0) {
      await ativarSecao(secao.codigo);
      return 'Seção cargo associada com sucesso.';
    }

    const response = await incluirSecao(secaoDto);

    if (response.status !== 200) {
      throw new Error('Erro ao realizar associação, entre em contato com o suporte técnico.');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const inserirSecaoCargo = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos. Por favor, entre em contato com o suporte.');
    }
    
    const storage = getData();
    const secao = await obterSecao(storage.codigoEmpresa, dados.codigoDepartamento, dados.codigoSetor);
    if (secao.codigo === 0) {
        throw new Error('Não há associação entre o Departamento e o Setor.');
    }
    
    const secaoDto = {
      CodigoDepartamentoSetor: secao.codigo,
      CodigoCargo: dados.codigoCargo,
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
    };

    const existeSecaoCargo = await obterSecaoCargo(secao.codigo, dados.codigoCargo);

    if (existeSecaoCargo) {
      await ativarSecaoCargo(secaoDto)
      return 'Seção cargo ativada com sucesso.';
    }
    
    const response = await incluirSecaoCargo(secaoDto);
    
    if (response.status !== 200) {
      throw new Error('Erro ao realizar a associação. Por favor, entre em contato com o suporte técnico.');
    }
    
    return response.data;
  } catch (error) {
    throw new Error('Erro ao inserir seção cargo: ' + error.message);
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

export const deleteSecao = async (codigoDepartamento, codigoSetor) => {
  try {
    
    if (!codigoDepartamento, !codigoSetor) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    const secao = await obterSecao(storage.codigoEmpresa, codigoDepartamento, codigoSetor);
    if (secao.codigo === 0) {
        throw new Error('Não há associação entre o Departamento e o Setor.');
    }

    const response = await desassociarSecao(secao.codigo);

    if (response.status !== 200) {
      throw new Error('Erro ao realizar desassociação, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao desfazer associação: ' + error.message);
  }
};

export const deleteSecaoCargo = async (codigoCargo, codigoDepartamento, codigoSetor) => {
  try {
    
    if (!codigoCargo, !codigoDepartamento, !codigoSetor) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }
    
    const storage = getData();
    const secao = await obterSecao(storage.codigoEmpresa, codigoDepartamento, codigoSetor);
    if (secao.codigo === 0) {
        throw new Error('Não há associação entre o Departamento e o Setor.');
    }

    const response = await desassociarSecaoCargo(secao.codigo, codigoCargo);

    if (response.status !== 200) {
      throw new Error('Erro ao realizar desassociação, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao desfazer associação: ' + error.message);
  }
};
