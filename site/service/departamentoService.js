import { obterDepartamento } from "../api/departamento";
import { incluirDepartamento } from "../api/departamento";
import { excluirDepartamento } from "../api/departamento";
import { getData } from './storageService';

export const inserirDepartamento = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const storage = getData();
    const departamento = await obterDepartamento(storage.codigoEmpresa, dados.nome);
    if (departamento.data != null) {
      throw new Error('Departamento já foi registrado.');
    }

    var departamentoDto = {
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoUsuario: storage.codigo,
      Nome: dados.nome
    }

    // Aguarda a conclusão da função incluirDepartamento
    const response = await incluirDepartamento(departamentoDto);

    if (response.status !== 200) {
      throw new Error('Erro ao inserir departamento, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro ao inserir departamento: ' + error.message);
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
      const data = obterDepartamento(storage.codigoEmpresa);

      return data;

    } catch (error) {
      console.error('Erro ao obter dados de agendamento:', error);
      setLoading(false);
      setValid(false);
    }
};