import { Evento } from ".";
import Api from "..";

  

export const updateEvento = async (evento: Evento): Promise<Evento> => {
    try {
      const { data } = await Api.put<Evento>(`evento/${evento.id_evento}`, evento);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar o evento');
    }
  };