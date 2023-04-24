import { Tecnico } from ".";
import Api from "..";

export const getAllTecnicos = async (): Promise<Tecnico[]> => {
    try {
      const { data } = await Api.get<Tecnico[]>(`tecnico`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter todos os tecnicos');
    }
  };