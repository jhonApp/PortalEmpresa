import axios from 'axios';
import { getData } from '../service/storageService';

const { condominioUrl } = getData();
const API_URL = `${condominioUrl}evento`;

export const incluirEvento = async (data) => {
    try {
      if (!data) {
        throw new Error('O valor está nulo.');
      }
  
      const url = `${API_URL}/incluirEvento`;
  
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

export const obterEvento = async () => {
    try {

      const response = await axios.get(`${API_URL}/obterEvento`, {
        validateStatus: status => status < 500
      });
      
      if (response.status !== 200) {
        throw new Error(response.data);
      }
  
      return response.data;
      
    } catch (error) {
      throw error;
    }
};

export const obterEventoDoDia = async (dataEvento) => {
  try {

    const response = await axios.get(`${API_URL}/obterEventoDoDia?dataEvento=${dataEvento}`, {
      validateStatus: status => status < 500
    });
    
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    
    return response.data;
    
  } catch (error) {
    throw error;
  }
};