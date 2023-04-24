import { Tarefa } from ".";
import Api from "..";

  

export const updateTarefa = async (tarefa: Tarefa): Promise<Tarefa> => {
    try {
      const { data } = await Api.put<Tarefa>(`tarefa`, tarefa);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar a tarefa');
    }
  };