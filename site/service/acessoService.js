import { listarAcessos } from '../api/acesso';

export const atualizarTabela = async (setAcessoData, setLoading, setValid, formData) => {
    try {
      
      setLoading(true);
  
      const data = await listarAcessos(formData.dataInicial, formData.dataFim);
      setAcessoData(data);
  
      setLoading(false);
      setValid(true);
    } catch (error) {
      console.error('Erro ao obter dados de acessos: ', error);
      setLoading(false);
      setValid(false);
    }
};