import { Localidade } from ".";
import Api from "..";


export const getAllLocalidades = async (): Promise<Localidade[]> => {
    try {
      const { data } = await Api.get<Localidade[]>(`localidade`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter todos as localidades');
    }
  };