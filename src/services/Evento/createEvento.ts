import { Evento } from ".";
import Api from "..";

  

export const createEvento = async (evento: Evento): Promise<Evento> => {
    try {
      const { data } = await Api.post<Evento>(`evento`, evento);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar evento');
    }
  };