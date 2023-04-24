import { Evento } from ".";
import Api from "..";


export const getAllEventos = async (): Promise<Evento[]> => {
    try {
      const { data } = await Api.get<Evento[]>(`evento`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter todos os eventos');
    }
  };