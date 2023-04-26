
import { Tecnico } from ".";
import Api from "..";

  

export const createTecnico = async (tecnico: Tecnico): Promise<Tecnico> => {
    try {
      const { data } = await Api.post<Tecnico>(`tecnico`, tecnico);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar tecnico');
    }
  };