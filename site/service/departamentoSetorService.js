import { listarDepartamentos } from "./departamentoService";
import { listarSetor } from "./setorService";
import { listarCargoPorStatus } from "./cargoService";

export const listarDepartamento = async (setDepartamentoData, setLoading, setValid) => {
    try {
      setLoading(true);
  
      const dataDepartamento = await listarDepartamentos();
  
      setDepartamentoData(dataDepartamento);
  
      setLoading(false);
      setValid(true);
    } catch (error) {
      console.error('Erro ao obter dados de departamento e setor:', error);
      setLoading(false);
      setValid(false);
    }
};

export const getSetor = async (setSetorData, setLoading, setValid) => {
  try {
    setLoading(true);
    const dataSetor = await listarSetor();
    setSetorData(dataSetor);

    setLoading(false);
    setValid(true);
  } catch (error) {
    console.error('Erro ao obter dados de departamento e setor:', error);
    setLoading(false);
    setValid(false);
  }
};

export const getCargo = async (setCargoData, setLoading, setValid) => {
  try {
    setLoading(true);

    const dataCargo = await listarCargoPorStatus();

    setCargoData(dataCargo);

    setLoading(false);
    setValid(true);
  } catch (error) {
    console.error('Erro ao obter dados de cargos:', error);
    setLoading(false);
    setValid(false);
  }
};