import { obterFuncionario, inserirFuncionario } from '../api/funcionario';
import { getData } from './storageService';

export const atualizarTabela = async (setFuncionarioData, setLoading, setValid, status) => {
    try {
        const storage = getData();
        const data = await  obterFuncionario(storage.codigoEmpresa, status);
        setFuncionarioData(data.sort((a, b) => new Date(b.dtValid) - new Date(a.dtValid)));
        setLoading(false);
    } catch (error) {
        console.error('Erro ao obter dados do funcionario: ', error);
        setLoading(false);
        setValid(false);
    }
};

export const cadastrarFuncionario = async (dados) => {
  try {
    if (!dados) {
      throw new Error('Os valores estão nulos, por favor entre em contato com suporte.');
    }
    // Obtenha os dados de armazenamento necessários
    const storage = getData();

    // Crie o objeto funcionário com os dados fornecidos
    const funcionario = {
      CodigoEmpresa: storage.codigoEmpresa,
      CodigoCargo: dados.selectedCargo,
      Cartao: dados.selectedCartao,
      CodigoUsuario: storage.codigo,
      Nome: dados.nome,
      File: dados.file,
      Nascimento: dados.dataNascimento,
      RecebeVisita: dados.RecebeVisita,
      Cartao: 9450404, // Cartão fixo,  preciso verificar como obter um cartão livre
      CPF: dados.cpf,
      RG: dados.rg,
      Documento: dados.rg,
      NomePai: dados.nomePai,
      NomeMae: dados.nomeMae,
      CodigoEstadoCivil: dados.estadoCivil,
      Admissao: dados.admissao,
      Demissao: dados.demissao,
      Email: dados.email,
      FuncionarioEndereco: {
        Cep: dados.cep,
        Logradouro: dados.logradouro,
        Bairro: dados.bairro,
        UF: dados.uf,
        Cidade: dados.cidade
      },
      FuncionarioAcesso: {
        HoraEntrada: dados.horaEntrada,
        HoraSaida: dados.horaSaida,
        Segunda: dados.segunda == true? "S" : "N",
        Terca: dados.terca == true? "S" : "N",
        Quarta: dados.quarta == true? "S" : "N",
        Quinta: dados.quinta == true? "S" : "N",
        Sexta: dados.sexta == true? "S" : "N",
        Sabado: dados.sabado == true? "S" : "N",
        Domingo: dados.domingo == true? "S" : "N",
        Feriado: dados.feriados == true? "S" : "N",
      },
      FuncionarioTelefone: {
        NumeroTelefone: dados.telefone,
      }
    };
    debugger
    const foto = dados.file ? base64Valid(dados.file) : "";

    // Envia a solicitação de inserção do funcionário
    const response = await inserirFuncionario(funcionario, foto);

    if (response.status !== 200) {
      throw new Error('Erro ao inserir funcionário, entre em contato com o suporte técnico.');
    }

    return response;
  } catch (error) {
    console.log(error.message)
    throw new Error('Erro ao inserir funcionário: ' + error.message);
  }
};


export const inserirFoto = async (data) => {
  try {
    if (!data) {
      throw new Error('O valor está nulo.');
    }

    const url = `${API_URL}/inserirFoto`;

    const response = await axios.post(url, data, {
      validateStatus: status => status < 500,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

function base64Valid(base64) {
  const newBase64 = base64.split(',')[1]
  return newBase64;
}