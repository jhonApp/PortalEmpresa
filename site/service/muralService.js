import { getData } from './storageService';
import { obterMural } from "../api/mural";

export const getMural = async (setMuralData, setLoading, setValid) => {
    try {
      setLoading(true);
  
      const data = await obterMural();
      console.log(data)
      setMuralData(data);
  
      setLoading(false);
      setValid(true);
    } catch (error) {
      console.error('Erro ao obter dados do comunicado: ', error);
      setLoading(false);
      setValid(false);
    }
};