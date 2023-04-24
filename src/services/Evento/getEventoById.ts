import { Evento } from ".";
import Api from "..";




export const getEventoById = async (id: number): Promise<Evento> => {
    try {
      const { data } = await Api.get<Evento>(`evento/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter evento por ID');
    }
  };