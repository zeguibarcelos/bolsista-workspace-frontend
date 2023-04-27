import { Tarefa } from ".";
import Api from "..";

  

export const createTarefa = async (tarefa: any): Promise<Tarefa> => {
    try {
      const { data } = await Api.post<Tarefa>(`tarefa`, tarefa);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao criar tarefa');
    }
  };