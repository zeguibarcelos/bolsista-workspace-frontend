
import { Localidade } from ".";
import Api from "..";

  

export const createLocalidade = async (localidade: Localidade): Promise<Localidade> => {
    try {
      const { data } = await Api.post<Localidade>(`localidade`, localidade);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar localidade');
    }
  };