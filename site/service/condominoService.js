import { obterCondomino } from "../api/condomino";

export const getCondomino = async () => {
    try {
        
      const data = await obterCondomino();
      
      return data;
    } catch (error) {
      throw error;
    }
};