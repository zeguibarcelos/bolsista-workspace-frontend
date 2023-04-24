import { Tarefa } from ".";
import Api from "..";




export const getTarefaByEventoId = async (id: number): Promise<Tarefa[]> => {
    try {
      const { data } = await Api.get<Tarefa[]>(`tarefa/evento/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao obter evento por ID');
    }
  };