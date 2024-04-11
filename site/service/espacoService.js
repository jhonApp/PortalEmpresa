import { obterEspaco, incluirEspaco, excluirEspaco, updateEspaco, obterFoto } from "../api/espaco";

export const inserirEspaco = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }
    
    const formData = new FormData();

    // Adiciona a foto ao FormData
    formData.append('foto', dados.foto);

    const dadosSemFoto = { ...dados };
    delete dadosSemFoto.foto;

    formData.append('espaco', JSON.stringify(dadosSemFoto));

    const response = await incluirEspaco(formData);

    if (response.status !== 200) {
      throw new Error('Erro ao inserir espaço, entre em contato com o suporte técnico.');
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteEspaco = async (codigo) => {
  try {
    if (!codigo) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const response = await excluirEspaco(codigo);

    if (response.status !== 200) {
      throw new Error('Erro ao excluir espaço, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error('Erro: ' + error.response.data);
  }
};
  
export const listarEspaco = async () => {
    try {
     
      const data = await obterEspaco();
      
      return data;
    } catch (error) {
      console.error('Erro ao obter dados do espaço:', error);
      throw error;
    }
};

export const getEspaco = async (setEspacoData, setLoading, setValid) => {
    try {
      setLoading(true);
  
      const data = await listarEspaco();
      setEspacoData(data);
  
      setLoading(false);
      setValid(true);
    } catch (error) {
      console.error('Erro ao obter dados do espaço: ', error);
      setLoading(false);
      setValid(false);
    }
};

export const alterarEspaco = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }

    const formData = new FormData();

    if (dados.foto != null) {
      formData.append('foto', dados.foto);
    }

    const dadosSemFoto = { ...dados };
    delete dadosSemFoto.foto;

    // Converta o objeto em JSON e, em seguida, anexe-o ao FormData
    const jsonData = JSON.stringify(dadosSemFoto);
    formData.append('espaco', jsonData);

    const response = await updateEspaco(formData);

    if (response.status !== 200) {
      throw new Error('Erro ao alterar espaço, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getFoto = async (codigo) => {
  try {
      
    const data = await obterFoto(codigo);
    
    return data.foto;
  } catch (error) {
    throw error;
  }
};

