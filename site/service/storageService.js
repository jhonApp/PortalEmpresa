
export const getData = () =>{
    const userData = localStorage.getItem('userData');

    if (userData === null) {
        return { response: { condominioUrl: '' } };
    }

    const parsedUserData = JSON.parse(userData);

    return parsedUserData;
}

export const createDataStorage = (response, condominioUrl) => {
    const userData = {
        codigo: response.data.codigo,
        userName: response.data.userName,
        codigoEmpresa: response.data.codigoEmpresa,
        codigoFuncionario: response.data.codigoFuncionario,
        condominioUrl: condominioUrl
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}

export const clearDataStorage = () => {
    localStorage.removeItem('userData');
}
  