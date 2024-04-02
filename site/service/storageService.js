
export const getData = () =>{

    // Recuperar os dados do usuário armazenados em localStorage
    const userData = localStorage.getItem('userData');

    // Converter a string JSON de volta para um objeto JavaScript
    const parsedUserData = JSON.parse(userData);

    return parsedUserData;
}

export const createDataStorage = (response) => {
    localStorage.setItem('userData', JSON.stringify(response.data));
}

export const clearDataStorage = () => {
    localStorage.removeItem('userData');
}
  